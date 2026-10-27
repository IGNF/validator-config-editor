// Éléments équivalents de plusieurs modèles et modification en série (feature 006, plan R1–R5) :
// colonnes de même nom dans des tables équivalentes, fichiers attendus et déclarations de listes
// de même nom. Seule la propriété choisie est recopiée ; ni `id` ni `parent` ne sont touchés.
import { getAt } from './edit/pointer'
import { setOrRemove } from './edit/operations'
import { dataOf, type FileChange, type Session } from './edit/session'
import { modelFamily } from './labels'

export type Kind = 'column' | 'file' | 'code'

/** Élément de départ : fichier (modèle de table ou files.json) et pointeur de l'élément. */
export interface Source {
  kind: Kind
  file: string
  pointer: string
}

export interface Equivalent {
  model: string
  file: string
  pointer: string
  /** Donnée courante de l'élément, modifications de la session comprises. */
  data: unknown
  /** Faux si le fichier n'est pas conforme à son schéma : l'élément n'est pas modifié (FR-004). */
  editable: boolean
}

export interface Equivalents {
  items: Equivalent[]
  /** Modèles de la portée sans élément équivalent. */
  absent: string[]
}

/** Propriétés recopiables, en pointeurs relatifs à l'élément (plan R4). */
export const PROPERTIES: Record<Kind, readonly string[]> = {
  column: ['/type', '/title', '/description', '/constraints/required', '/constraints/presenceRequired', '/constraints/unique',
    '/constraints/minLength', '/constraints/maxLength', '/constraints/pattern', '/constraints/enum', '/constraints/reference'],
  file: ['/type', '/mandatory', '/path', '/title', '/description', '/tableModel'],
  code: ['/data', '/title'],
}

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)
const modelOf = (file: string) => file.slice(0, file.indexOf('/'))
const nameOf = (v: unknown) => (isObject(v) && typeof v.name === 'string' ? v.name : undefined)

/** Nom de base d'une table : sans son premier segment s'il est un segment du nom du modèle (A1_ASSIETTE_SUP_S → ASSIETTE_SUP_S). */
export function baseTableName(model: string, table: string): string {
  const i = table.indexOf('_')
  return i > 0 && model.split('_').includes(table.slice(0, i)) ? table.slice(i + 1) : table
}

/** Éléments équivalents de `source`, dans la famille de son modèle ou dans toute la configuration. */
export function findEquivalents(session: Session, source: Source, scope: 'family' | 'all'): Equivalents {
  const { project, checked } = session.result
  const model = modelOf(source.file)
  const name = nameOf(getAt(dataOf(session, source.file), source.pointer))
  const items: Equivalent[] = []
  const absent: string[] = []
  if (name === undefined) return { items, absent }
  const table = source.kind === 'column' ? nameOf(dataOf(session, source.file)) : undefined
  const base = table === undefined ? undefined : baseTableName(model, table)
  const list = source.kind === 'file' ? 'files' : 'codes'

  const models = [...project.models.values()]
    .filter((m) => m.name !== model && (scope === 'all' || modelFamily(m.name) === modelFamily(model)))
    .sort((a, b) => a.name.localeCompare(b.name))
  for (const m of models) {
    const found: Equivalent[] = []
    if (source.kind === 'column') {
      for (const path of [...m.tables.keys()].sort()) {
        const data = dataOf(session, path)
        const tableName = nameOf(data)
        if (tableName === undefined || base === undefined || baseTableName(m.name, tableName) !== base) continue
        const columns = isObject(data) && Array.isArray(data.columns) ? data.columns : []
        const i = columns.findIndex((c) => nameOf(c) === name)
        if (i >= 0) found.push({ model: m.name, file: path, pointer: `/columns/${i}`, data: columns[i], editable: !!checked.get(m.name)?.tables.has(path) })
      }
    } else if (m.document) {
      const data = dataOf(session, m.document.path)
      const elements = isObject(data) && Array.isArray(data[list]) ? data[list] : []
      const i = elements.findIndex((e) => nameOf(e) === name)
      if (i >= 0) found.push({ model: m.name, file: m.document.path, pointer: `/${list}/${i}`, data: elements[i], editable: !!checked.get(m.name)?.document })
    }
    if (found.length) items.push(...found)
    else absent.push(m.name)
  }
  return { items, absent }
}

/**
 * Changements qui recopient la propriété `property` de la source vers les cibles modifiables (une
 * propriété absente ou vide est retirée), un par fichier ; à passer à `applyChanges` en une étape.
 */
export function applyToEquivalents(session: Session, source: Source, targets: readonly Equivalent[], property: string): FileChange[] {
  const value = getAt(dataOf(session, source.file), `${source.pointer}${property}`)
  const byFile = new Map<string, string[]>()
  for (const t of targets) if (t.editable) byFile.set(t.file, [...(byFile.get(t.file) ?? []), t.pointer])
  return [...byFile].map(([path, pointers]) => ({
    path,
    kind: 'json' as const,
    update: (data: unknown) => pointers.reduce((d, p) => setOrRemove(d, `${p}${property}`, structuredClone(value)), data),
  }))
}
