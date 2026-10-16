// Faux GitHub (API et raw) servant des dépôts en mémoire, pour tester sans réseau (plan 003, R8).
export interface FakeRepo {
  defaultBranch: string
  /** Branche → fichiers (chemin dans le dépôt → contenu). */
  branches: Record<string, Map<string, string>>
}

export interface FakeResponse {
  status: number
  body: string
  headers: Record<string, string>
}

export interface FakeGitHub {
  handle(url: string): FakeResponse
  /** URL appelées (API seulement, ou toutes). */
  calls: string[]
  /** Si défini, l'API répond « limite atteinte » avec cette heure (secondes epoch). */
  rateLimitResetAt?: number
  truncated?: boolean
}

const json = (status: number, body: unknown, headers: Record<string, string> = {}): FakeResponse => ({
  status, body: JSON.stringify(body), headers: { 'content-type': 'application/json', ...headers },
})

export function fakeGitHub(repos: Record<string, FakeRepo>): FakeGitHub {
  const fake: FakeGitHub = {
    calls: [],
    handle(url) {
      fake.calls.push(url)
      const u = new URL(url)
      if (u.host === 'api.github.com') {
        if (fake.rateLimitResetAt) return json(403, { message: 'rate limit' }, { 'X-RateLimit-Remaining': '0', 'X-RateLimit-Reset': String(fake.rateLimitResetAt) })
        const m = /^\/repos\/([^/]+\/[^/]+)(.*)$/.exec(decodeURIComponent(u.pathname))
        const repo = m && repos[m[1]!]
        if (!m || !repo) return json(404, { message: 'Not Found' })
        const rest = m[2]!
        if (rest === '') return json(200, { default_branch: repo.defaultBranch })
        if (rest === '/branches') return json(200, Object.keys(repo.branches).map((name) => ({ name })))
        const branch = /^\/branches\/(.+)$/.exec(rest)?.[1]
        if (branch !== undefined) {
          if (!repo.branches[branch]) return json(404, { message: 'Branch not found' })
          return json(200, { name: branch, commit: { sha: `commit-${branch.replace(/\//g, '-')}`, commit: { tree: { sha: `tree-${branch.replace(/\//g, '-')}` } } } })
        }
        const tree = /^\/git\/trees\/tree-(.+)$/.exec(rest)?.[1]
        const files = tree !== undefined ? Object.entries(repo.branches).find(([b]) => b.replace(/\//g, '-') === tree)?.[1] : undefined
        if (files) return json(200, { truncated: !!fake.truncated, tree: [...files.keys()].map((path) => ({ path, type: 'blob' })) })
        return json(404, { message: 'Not Found' })
      }
      if (u.host === 'raw.githubusercontent.com') {
        const [, owner, name, commit, ...path] = decodeURIComponent(u.pathname).split('/')
        const repo = repos[`${owner}/${name}`]
        const files = repo && Object.entries(repo.branches).find(([b]) => `commit-${b.replace(/\//g, '-')}` === commit)?.[1]
        const text = files?.get(path.join('/'))
        return text === undefined ? { status: 404, body: '404: Not Found', headers: {} } : { status: 200, body: text, headers: { 'content-type': 'text/plain; charset=utf-8' } }
      }
      return { status: 404, body: '', headers: {} }
    },
  }
  return fake
}

/** `fetch` branché sur le faux GitHub (tests unitaires). */
export const fakeFetch = (fake: FakeGitHub) => async (url: string) => {
  const r = fake.handle(url)
  return new Response(r.body, { status: r.status, headers: r.headers })
}

/** Fichiers d'une configuration placés sous un préfixe de dépôt (ex. « config/ »). */
export const asRepo = (files: Map<string, string>, prefix = 'config/', extra: Record<string, string> = { 'README.md': '# dépôt' }) =>
  new Map([...Object.entries(extra), ...[...files].map(([p, t]) => [prefix + p, t] as const)])
