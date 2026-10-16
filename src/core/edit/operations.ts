// Opérations d'édition métier (plan 002, R3) : fonctions pures sur la donnée JSON d'un fichier.
// Elles s'appuient sur l'édition par pointeur, qui conserve l'ordre des clés et les propriétés
// inconnues.
import { pointer } from '../pointer'
import { newId, type RandomBytes } from './ids'
import { getAt, insertAt, moveAt, removeAt, setAt } from './pointer'

type Json = unknown
type Raw = Record<string, unknown>

/** Valeur vide : la propriété est retirée plutôt qu'écrite vide. */
const isEmpty = (v: unknown) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)

/** Écrit `value` à `ptr`, ou retire la propriété si la valeur est vide. */
export function setOrRemove<T>(data: T, ptr: string, value: unknown): T {
  return isEmpty(value) ? removeAt(data, ptr) : setAt(data, ptr, value)
}

const columns = (table: Json): Raw[] => (Array.isArray(getAt(table, '/columns')) ? (getAt(table, '/columns') as Raw[]) : [])

/** Nom libre de la forme NOUVELLE_COLONNE, NOUVELLE_COLONNE_2… */
function freeName(base: string, used: string[]): string {
  if (!used.includes(base)) return base
  for (let i = 2; ; i++) if (!used.includes(`${base}_${i}`)) return `${base}_${i}`
}

/**
 * Ajoute une colonne `String` en fin de table. Elle reçoit un `id` seulement si les colonnes
 * existantes en ont (les configurations sans `id`, comme ppr, n'en reçoivent pas).
 */
export function addColumn<T>(table: T, existingIds: ReadonlySet<string>, random?: RandomBytes): T {
  const cols = columns(table)
  const withId = cols.length === 0 ? typeof getAt(table, '/id') === 'string' : cols.some((c) => typeof c.id === 'string')
  const name = freeName('NOUVELLE_COLONNE', cols.map((c) => String(c.name)))
  const column: Raw = {
    type: 'String',
    ...(withId && { id: newId(existingIds, random) }),
    name,
    title: name,
    description: '',
    constraints: { required: false, unique: false },
  }
  return insertAt(table, '/columns', column)
}

export const removeColumn = <T>(table: T, index: number): T => removeAt(table, pointer('columns', index))
export const moveColumn = <T>(table: T, from: number, to: number): T => moveAt(table, '/columns', from, to)

/**
 * Modifie une contrainte de colonne. Les booléens sont écrits tels quels (les configurations
 * écrivent `false`) ; une autre valeur vide retire la contrainte.
 */
export function setConstraint<T>(table: T, index: number, key: string, value: unknown): T {
  const ptr = pointer('columns', index, 'constraints', key)
  return typeof value === 'boolean' ? setAt(table, ptr, value) : setOrRemove(table, ptr, value)
}

/**
 * Valeurs autorisées saisies en texte (une par ligne). Si les valeurs existantes sont des
 * nombres (ex. naviforest), les valeurs numériques restent des nombres.
 */
export function parseEnum(text: string, previous: unknown): (string | number)[] {
  const numeric = Array.isArray(previous) && previous.length > 0 && previous.every((v) => typeof v === 'number')
  return text
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => v !== '')
    .map((v) => (numeric && /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v))
}

/** Liste de textes de la table (`foreignKeys`, `conditions`) : ajout, modification, suppression. */
export type TableList = 'foreignKeys' | 'conditions'

export function addListItem<T>(table: T, list: TableList, value = ''): T {
  return insertAt(table, pointer('constraints', list), value)
}

export function setListItem<T>(table: T, list: TableList, index: number, value: string): T {
  return setAt(table, pointer('constraints', list, index), value)
}

export function removeListItem<T>(table: T, list: TableList, index: number): T {
  return removeAt(table, pointer('constraints', list, index))
}
