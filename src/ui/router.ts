import { ref } from 'vue'

// Sélection encodée dans le fragment d'URL (plan R12) : #/<fichier>?p=<pointeur JSON>.
// Un dossier de modèle se termine par « / ».
export interface Route {
  file: string
  pointer?: string
}

function parse(hash: string): Route {
  const [path = '', query = ''] = hash.replace(/^#\/?/, '').split('?')
  const pointer = new URLSearchParams(query).get('p') ?? undefined
  return { file: path.split('/').map(decodeURIComponent).join('/'), ...(pointer !== undefined && { pointer }) }
}

export const route = ref<Route>(parse(location.hash))
window.addEventListener('hashchange', () => (route.value = parse(location.hash)))

export function href(file: string, pointer?: string): string {
  const path = file.split('/').map(encodeURIComponent).join('/')
  return `#/${path}${pointer !== undefined ? `?p=${encodeURIComponent(pointer)}` : ''}`
}

export function go(file: string, pointer?: string): void {
  location.hash = href(file, pointer)
}

// Dépôt ouvert dans l'adresse (feature 003, US4) : ?depot=<org>/<dépôt>&branche=<b>&dossier=<d>.
export interface RepoParams {
  owner: string
  repo: string
  branch?: string
  path?: string
}

export function readRepoParams(search = location.search): RepoParams | undefined {
  const params = new URLSearchParams(search)
  const [owner, repo] = (params.get('depot') ?? '').split('/')
  if (!owner || !repo) return undefined
  const branch = params.get('branche') ?? undefined
  const path = params.get('dossier') ?? undefined
  return { owner, repo, ...(branch && { branch }), ...(path && { path }) }
}

/** Écrit (ou retire) le dépôt dans l'adresse, sans recharger la page ni toucher à la sélection. */
export function writeRepoParams(repo: RepoParams | undefined): void {
  const params = new URLSearchParams(location.search)
  for (const key of ['depot', 'branche', 'dossier']) params.delete(key)
  if (repo) {
    params.set('depot', `${repo.owner}/${repo.repo}`)
    if (repo.branch) params.set('branche', repo.branch)
    if (repo.path) params.set('dossier', repo.path)
  }
  const search = params.toString()
  history.replaceState(history.state, '', `${location.pathname}${search ? `?${search}` : ''}${location.hash}`)
}
