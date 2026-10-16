import type { LoadedModel } from './types'
import { pointer } from '../pointer'

export type ObjectKind = 'modèle' | 'modèle parent' | 'fichier' | 'liste de codes' | 'table' | 'colonne'

/** Objet identifié d'un modèle, pour l'affichage et la navigation. */
export interface ObjectRef {
  id: string
  kind: ObjectKind
  label: string
  file: string
  /** Pointeur JSON de l'objet dans son fichier. */
  pointer: string
}

type Raw = Record<string, unknown>
const isObject = (v: unknown): v is Raw => v !== null && typeof v === 'object' && !Array.isArray(v)
// Éléments objets d'un tableau, avec leur indice d'origine (pour les pointeurs).
const list = (v: unknown): [Raw, number][] => (Array.isArray(v) ? v.flatMap((x, i): [Raw, number][] => (isObject(x) ? [[x, i]] : [])) : [])
const text = (v: unknown, fallback: string) => (typeof v === 'string' ? v : fallback)

/** Index des objets du modèle par `id`, à partir des données brutes (même non conformes). */
export function indexObjects(model: LoadedModel): Map<string, ObjectRef> {
  const index = new Map<string, ObjectRef>()
  const add = (data: Raw, kind: ObjectKind, label: string, file: string, at: string) => {
    if (typeof data.id === 'string' && !index.has(data.id)) index.set(data.id, { id: data.id, kind, label, file, pointer: at })
  }
  const document = (data: Raw, kind: ObjectKind, file: string, base: string[]) => {
    add(data, kind, text(data.name, model.name), file, pointer(...base))
    list(data.files).forEach(([f, i]) => add(f, 'fichier', text(f.name, `fichier ${i + 1}`), file, pointer(...base, 'files', i)))
    list(data.codes).forEach(([c, i]) => add(c, 'liste de codes', text(c.name, `liste ${i + 1}`), file, pointer(...base, 'codes', i)))
  }
  const doc = model.document
  if (doc && isObject(doc.data)) {
    document(doc.data, 'modèle', doc.path, [])
    if (isObject(doc.data.parent)) document(doc.data.parent, 'modèle parent', doc.path, ['parent'])
  }
  for (const [path, file] of model.tables) {
    if (!isObject(file.data)) continue
    const table = text(file.data.name, path.slice(path.lastIndexOf('/') + 1, -'.json'.length))
    add(file.data, 'table', table, path, '')
    list(file.data.columns).forEach(([c, i]) => add(c, 'colonne', `${table}.${text(c.name, String(i + 1))}`, path, pointer('columns', i)))
  }
  return index
}
