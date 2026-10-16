// Lecture et écriture immuables par pointeur JSON, avec partage structurel (repris de
// tableschema-editor). Une clé modifiée garde sa position ; une nouvelle clé est ajoutée à la fin.
import { parsePointer, pointer as joinPointer } from '../pointer'

type Json = unknown
type Obj = Record<string, Json>

const isObject = (v: Json): v is Obj => v !== null && typeof v === 'object' && !Array.isArray(v)

function child(node: Json, token: string): Json {
  if (Array.isArray(node)) return node[Number(token)]
  return isObject(node) ? node[token] : undefined
}

export function getAt(root: Json, pointer: string): Json {
  return parsePointer(pointer).reduce<Json>((node, token) => child(node, token), root)
}

// Applique `update` au nœud désigné par `tokens`, en recopiant seulement le chemin parcouru.
function updateIn(node: Json, tokens: string[], update: (current: Json) => Json): Json {
  if (tokens.length === 0) return update(node)
  const [head, ...rest] = tokens as [string, ...string[]]
  if (Array.isArray(node)) {
    const index = head === '-' ? node.length : Number(head)
    const copy = [...node]
    copy[index] = updateIn(node[index], rest, update)
    return copy
  }
  const obj = isObject(node) ? node : {}
  return { ...obj, [head]: updateIn(obj[head], rest, update) }
}

export function setAt<T>(root: T, pointer: string, value: Json): T {
  return updateIn(root, parsePointer(pointer), () => value) as T
}

export function removeAt<T>(root: T, pointer: string): T {
  const tokens = parsePointer(pointer)
  if (tokens.length === 0) return root
  const last = tokens.pop()!
  // Chemin absent : rien à retirer (et ne pas créer d'objets intermédiaires).
  if (getAt(root, joinPointer(...tokens, last)) === undefined) return root
  return updateIn(root, tokens, (parent) => {
    if (Array.isArray(parent)) return parent.filter((_, i) => i !== Number(last))
    if (!isObject(parent) || !(last in parent)) return parent
    const { [last]: _removed, ...others } = parent
    return others
  }) as T
}

/** Insère `value` dans le tableau désigné par `arrayPointer`, à l'indice `index` (fin par défaut). */
export function insertAt<T>(root: T, arrayPointer: string, value: Json, index?: number): T {
  return updateIn(root, parsePointer(arrayPointer), (array) => {
    const list = Array.isArray(array) ? [...array] : []
    list.splice(index ?? list.length, 0, value)
    return list
  }) as T
}

/** Déplace l'élément `from` du tableau désigné vers l'indice `to`. */
export function moveAt<T>(root: T, arrayPointer: string, from: number, to: number): T {
  return updateIn(root, parsePointer(arrayPointer), (array) => {
    if (!Array.isArray(array) || from < 0 || from >= array.length || to < 0 || to >= array.length) return array
    const list = [...array]
    const [item] = list.splice(from, 1)
    list.splice(to, 0, item)
    return list
  }) as T
}
