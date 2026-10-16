import { selectRepoRoot, splitRef } from '@core/github'
import type { ConfigSource } from './source'

const API = 'https://api.github.com'
const RAW = 'https://raw.githubusercontent.com'
const PARALLEL = 16

/** Erreur d'accès à GitHub, avec un message en français et, éventuellement, une autre source à proposer. */
export class GitHubError extends Error {
  constructor(
    message: string,
    readonly suggestion?: { label: string; spec: RepoSpec },
    /** Code HTTP de GitHub, s'il y en a un. */
    readonly status?: number,
  ) {
    super(message)
  }
}

export interface RepoSpec {
  owner: string
  repo: string
  branch?: string
  /** Dossier de configuration demandé ; à défaut config/ ou la racine. */
  path?: string
  /** « <branche>/<dossier> » d'une URL /tree/… (branche pouvant contenir « / »). */
  rest?: string
}

type Fetch = (url: string, init?: RequestInit) => Promise<Response>

const hhmm = (d: Date) => d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

/**
 * Configuration d'un dépôt GitHub public (feature 003, plan R1) : 3 requêtes à l'API au plus
 * (dépôt si la branche n'est pas donnée, branche, arbre), puis les contenus au commit.
 */
export class GitHubSource implements ConfigSource {
  readonly kind = 'github'
  label = ''
  archiveName: string
  link: string
  branch?: string
  commit?: string
  path?: string

  constructor(
    readonly spec: RepoSpec,
    private readonly fetchFn: Fetch = (url, init) => fetch(url, init),
  ) {
    this.archiveName = spec.repo
    this.link = `https://github.com/${spec.owner}/${spec.repo}`
  }

  private get name() {
    return `${this.spec.owner}/${this.spec.repo}`
  }

  private async get(url: string, notFound: string): Promise<Response> {
    let response: Response
    try {
      response = await this.fetchFn(url, { headers: { Accept: 'application/vnd.github+json' } })
    } catch {
      throw new GitHubError('Impossible de joindre GitHub : vérifier la connexion réseau.')
    }
    if (response.ok) return response
    if ((response.status === 403 || response.status === 429) && response.headers.get('X-RateLimit-Remaining') === '0') {
      const reset = Number(response.headers.get('X-RateLimit-Reset'))
      const at = reset ? ` Réessayer après ${hhmm(new Date(reset * 1000))}.` : ''
      throw new GitHubError(`Limite de requêtes anonymes à GitHub atteinte (60 par heure).${at}`)
    }
    if (response.status === 404) throw new GitHubError(notFound, undefined, 404)
    throw new GitHubError(`GitHub a répondu ${response.status} pour ${this.name}.`)
  }

  private async api<T>(path: string, notFound: string): Promise<T> {
    return (await this.get(`${API}/repos/${this.name}${path}`, notFound)).json() as Promise<T>
  }

  /** Branches du dépôt (une requête, 100 au plus). */
  async branches(): Promise<string[]> {
    const list = await this.api<{ name: string }[]>('/branches?per_page=100', `Dépôt ${this.name} introuvable ou privé.`)
    return list.map((b) => b.name)
  }

  async defaultBranch(): Promise<string> {
    return (await this.api<{ default_branch: string }>('', `Dépôt ${this.name} introuvable ou privé.`)).default_branch
  }

  // Branche (commit et arbre) ; si elle n'existe pas, propose la branche par défaut.
  private async branch_(branch: string, path?: string) {
    try {
      return await this.api<{ commit: { sha: string; commit: { tree: { sha: string } } } }>(
        `/branches/${encodeURIComponent(branch)}`,
        `Branche « ${branch} » introuvable dans ${this.name}.`,
      )
    } catch (e) {
      if (!(e instanceof GitHubError) || e.status !== 404) throw e
      // Le dépôt peut aussi être introuvable : defaultBranch() le signalera.
      const fallback = await this.defaultBranch()
      const { owner, repo } = this.spec
      throw new GitHubError(e.message, { label: `Ouvrir la branche par défaut (${fallback})`, spec: { owner, repo, branch: fallback, ...(path && { path }) } })
    }
  }

  async load(onProgress?: (done: number, total: number) => void): Promise<Map<string, string>> {
    let { branch, path } = this.spec
    if (!branch && this.spec.rest) ({ branch, path } = splitRef(this.spec.rest, this.spec.rest.includes('/') ? await this.branches() : undefined))
    branch ??= await this.defaultBranch()
    const b = await this.branch_(branch, path)
    const tree = await this.api<{ truncated: boolean; tree: { path: string; type: string }[] }>(
      `/git/trees/${b.commit.commit.tree.sha}?recursive=1`,
      `Arbre du dépôt ${this.name} introuvable.`,
    )
    if (tree.truncated) throw new GitHubError(`Le dépôt ${this.name} est trop volumineux pour être lu par l'API GitHub : cloner le dépôt et ouvrir le dossier local.`)
    const commit = b.commit.sha
    const selection = selectRepoRoot(tree.tree.filter((e) => e.type === 'blob').map((e) => e.path), path)
    this.branch = branch
    this.commit = commit
    this.path = selection.root.replace(/\/$/, '') || undefined
    this.label = `${this.name} · ${branch}${this.path ? ` · ${this.path}` : ''}`
    this.link = `https://github.com/${this.name}/tree/${commit}${this.path ? `/${this.path}` : ''}`

    // Contenus au commit (état cohérent même si la branche avance), 16 lectures à la fois.
    const entries = [...selection.files]
    const files = new Map<string, string>()
    let done = 0
    const worker = async () => {
      for (let item = entries.shift(); item; item = entries.shift()) {
        const [repoPath, configPath] = item
        const url = `${RAW}/${this.name}/${commit}/${repoPath.split('/').map(encodeURIComponent).join('/')}`
        files.set(configPath, await (await this.get(url, `Fichier ${repoPath} introuvable dans ${this.name}.`)).text())
        onProgress?.(++done, selection.files.size)
      }
    }
    await Promise.all(Array.from({ length: PARALLEL }, worker))
    return files
  }
}
