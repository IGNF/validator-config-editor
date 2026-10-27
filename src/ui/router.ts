import { ref } from 'vue'

// Sélection encodée dans le fragment d'URL (plan R12) : #/<fichier>?p=<pointeur JSON>.
// Un dossier de modèle se termine par « / ». Comparaison (011, R6) : #/<modèle>/?compare=<référence>.
export interface Route {
  file: string
  pointer?: string
  /** Référence de la comparaison du modèle (vide : à choisir). */
  compare?: string
  /** Ligne du texte à montrer dans l'onglet « Source » (erreur de syntaxe). */
  line?: number
}

function parse(hash: string): Route {
  const [path = '', query = ''] = hash.replace(/^#\/?/, '').split('?')
  const params = new URLSearchParams(query)
  const pointer = params.get('p') ?? undefined
  const compare = params.get('compare') ?? undefined
  const line = Number(params.get('l')) || undefined
  return { file: path.split('/').map(decodeURIComponent).join('/'), ...(pointer !== undefined && { pointer }), ...(compare !== undefined && { compare }), ...(line !== undefined && { line }) }
}

export const route = ref<Route>(parse(location.hash))
window.addEventListener('hashchange', () => (route.value = parse(location.hash)))

export function href(file: string, pointer?: string, line?: number): string {
  const path = file.split('/').map(encodeURIComponent).join('/')
  const query = [...(pointer !== undefined ? [`p=${encodeURIComponent(pointer)}`] : []), ...(line !== undefined ? [`l=${line}`] : [])]
  return `#/${path}${query.length ? `?${query.join('&')}` : ''}`
}

export function go(file: string, pointer?: string): void {
  location.hash = href(file, pointer)
}

/** Adresse de la comparaison du modèle `model` avec la référence `reference` (vide : à choisir). */
export function compareHref(model: string, reference = ''): string {
  return `#/${encodeURIComponent(model)}/?compare=${encodeURIComponent(reference)}`
}
