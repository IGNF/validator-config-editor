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
