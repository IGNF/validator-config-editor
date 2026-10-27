// Comparaison de deux modèles d'une configuration (feature 011, plan R1–R5, contrat compare.md) :
// éléments rapprochés par nom, comme StandardComparator (GpU) ; lignes des listes de codes par
// clé. Ni les `id`, ni les titres, ni l'ordre ne sont comparés.
import { resolvePath } from './model/paths'
import type { Column, Csv, DocumentModel, FileModel, TableModel } from './model/types'
import { parseForeignKey } from './validation/foreign-key'
import type { CheckResult } from './validation/validate'

export type Value = string | number | boolean | null

/** Changement d'un champ : ancienne et nouvelle valeur, ou éléments retirés et ajoutés (champ liste). */
export interface Change {
  field: string
  old?: Value
  new?: Value
  removed?: string[]
  added?: string[]
}

export interface Changed {
  name: string
  changes: Change[]
}

export interface Section {
  added: string[]
  removed: string[]
  changed: Changed[]
}

export interface TableChanged extends Changed {
  columns: Section
}

/** Ligne de liste de codes modifiée : clé, puis cellules changées (`field` : nom de la colonne). */
export interface RowChange {
  key: string
  changes: Change[]
}

/** Contenu d'une liste de codes présente des deux côtés (US2) ; lignes en valeurs jointes par « , ». */
export interface CodeListContent {
  name: string
  columns: { added: string[]; removed: string[] }
  rows: { added: string[]; removed: string[]; changed: RowChange[] }
}

export interface Comparison {
  from: string
  to: string
  document: Change[]
  files: Section
  tables: { added: string[]; removed: string[]; changed: TableChanged[] }
  codes: { added: string[]; removed: string[]; content: CodeListContent[] }
  /** Tables et listes illisibles ou non conformes d'un des deux modèles, laissées de côté. */
  unreadable: string[]
  total: number
}

type Getter<T> = (item: T) => unknown
type Fields<T> = [field: string, get: Getter<T>, list?: boolean][]

const FILE_FIELDS: Fields<FileModel> = [
  ['type', (f) => f.type],
  ['mandatory', (f) => f.mandatory ?? 'WARN'],
  ['path', (f) => f.path],
  ['tableModel', (f) => f.tableModel],
]
const TABLE_FIELDS: Fields<TableModel> = [
  ['conditions', (t) => t.constraints?.conditions, true],
  ['foreignKeys', (t) => t.constraints?.foreignKeys, true],
]
const COLUMN_FIELDS: Fields<Column> = [
  ['description', (c) => c.description],
  ['type', (c) => c.type],
  ['minLength', (c) => c.constraints?.minLength],
  ['maxLength', (c) => c.constraints?.maxLength],
  ['required', (c) => c.constraints?.required],
  ['presenceRequired', (c) => c.constraints?.presenceRequired],
  ['unique', (c) => c.constraints?.unique],
  ['enum', (c) => c.constraints?.enum, true],
  ['pattern', (c) => c.constraints?.pattern],
]
const DOCUMENT_FIELDS: Fields<DocumentModel> = [
  ['folderName', (d) => d.constraints?.folderName],
  ['metadataSpecification', (d) => d.constraints?.metadataSpecification],
]

const value = (v: unknown): Value => (v === undefined ? null : (v as Value))
const sorted = (values: Iterable<string>) => [...values].sort((a, b) => a.localeCompare(b))

function compareFields<T>(from: T, to: T, fields: Fields<T>): Change[] {
  const changes: Change[] = []
  for (const [field, get, list] of fields) {
    if (list) {
      const a = new Set(((get(from) as unknown[] | null | undefined) ?? []).map(String))
      const b = new Set(((get(to) as unknown[] | null | undefined) ?? []).map(String))
      const removed = sorted([...a].filter((x) => !b.has(x)))
      const added = sorted([...b].filter((x) => !a.has(x)))
      if (removed.length || added.length) changes.push({ field, removed, added })
    } else {
      const [a, b] = [value(get(from)), value(get(to))]
      if (a !== b) changes.push({ field, old: a, new: b })
    }
  }
  return changes
}

// Premier élément de chaque nom.
function byName<T extends { name: string }>(items: readonly T[]): Map<string, T> {
  const out = new Map<string, T>()
  for (const item of items) if (!out.has(item.name)) out.set(item.name, item)
  return out
}

function compareItems<T extends { name: string }>(from: readonly T[], to: readonly T[], fields: Fields<T>): Section {
  const [a, b] = [byName(from), byName(to)]
  return {
    added: sorted([...b.keys()].filter((n) => !a.has(n))),
    removed: sorted([...a.keys()].filter((n) => !b.has(n))),
    changed: sorted([...a.keys()].filter((n) => b.has(n)))
      .map((name) => ({ name, changes: compareFields(a.get(name)!, b.get(name)!, fields) }))
      .filter((c) => c.changes.length > 0),
  }
}

const count = (s: { added: unknown[]; removed: unknown[]; changed: unknown[] }) => s.added.length + s.removed.length + s.changed.length

/** Version précédente d'un modèle : même nom sans l'année finale (_AAAA), année la plus proche en dessous. */
export function previousVersion(name: string, names: Iterable<string>): string | undefined {
  const match = /^(.*)_(\d{4})$/.exec(name)
  if (!match) return undefined
  const [, base, year] = match
  let best: [string, number] | undefined
  for (const other of names) {
    const m = /^(.*)_(\d{4})$/.exec(other)
    if (!m || m[1] !== base) continue
    const y = Number(m[2])
    if (y < Number(year) && (!best || y > best[1])) best = [other, y]
  }
  return best?.[0]
}

/** Colonnes de rapprochement des lignes d'une liste : celles de la première clé étrangère qui la vise. */
function keyColumns(list: string, tables: readonly TableModel[][]): string[] | undefined {
  for (const side of tables) {
    for (const table of side) {
      for (const text of table.constraints?.foreignKeys ?? []) {
        const fk = parseForeignKey(text)
        if (fk?.target === list) return fk.targetColumns
      }
    }
  }
  return undefined
}

/**
 * Contenu de deux versions d'une liste (plan R5) : lignes rapprochées par la clé (colonnes de la clé
 * étrangère, sinon la première colonne), sur les colonnes communes. Clés en double : rapprochement
 * par ligne entière. `undefined` si rien ne change.
 */
function compareCsv(name: string, from: Csv, to: Csv, fkColumns: string[] | undefined): CodeListContent | undefined {
  const common = to.header.filter((c) => from.header.includes(c))
  const columns = {
    added: to.header.filter((c) => !from.header.includes(c)),
    removed: from.header.filter((c) => !to.header.includes(c)),
  }
  const key = fkColumns?.every((c) => common.includes(c)) ? fkColumns : common.slice(0, 1)
  const project = (csv: Csv) => csv.rows.map((row) => common.map((c) => row[csv.header.indexOf(c)] ?? ''))
  const [ra, rb] = [project(from), project(to)]
  const keyOf = (row: string[]) => key.map((c) => row[common.indexOf(c)]).join(',')
  const unique = (rows: string[][]) => new Set(rows.map(keyOf)).size === rows.length
  const rows: CodeListContent['rows'] = { added: [], removed: [], changed: [] }
  if (key.length && unique(ra) && unique(rb)) {
    const [ma, mb] = [new Map(ra.map((r) => [keyOf(r), r])), new Map(rb.map((r) => [keyOf(r), r]))]
    for (const [k, r] of mb) if (!ma.has(k)) rows.added.push(r.join(','))
    for (const [k, r] of ma) {
      const other = mb.get(k)
      if (!other) rows.removed.push(r.join(','))
      else {
        const changes = common.flatMap((c, i) => (r[i] !== other[i] ? [{ field: c, old: r[i]!, new: other[i]! }] : []))
        if (changes.length) rows.changed.push({ key: k, changes })
      }
    }
  } else {
    // Multiensembles de lignes entières.
    const remaining = new Map<string, number>()
    for (const r of ra.map((x) => x.join(','))) remaining.set(r, (remaining.get(r) ?? 0) + 1)
    for (const r of rb.map((x) => x.join(','))) {
      const n = remaining.get(r) ?? 0
      if (n > 0) remaining.set(r, n - 1)
      else rows.added.push(r)
    }
    for (const [r, n] of remaining) for (let i = 0; i < n; i++) rows.removed.push(r)
  }
  rows.added = sorted(rows.added)
  rows.removed = sorted(rows.removed)
  rows.changed.sort((x, y) => x.key.localeCompare(y.key))
  const size = columns.added.length + columns.removed.length + rows.added.length + rows.removed.length + rows.changed.length
  return size ? { name, columns, rows } : undefined
}

/** Compare le modèle `to` à la référence `from`, dans l'état courant de la configuration. */
export function compareModels(result: CheckResult, from: string, to: string): Comparison {
  const unreadable: string[] = []
  // Chemins relatifs au modèle des tables illisibles de chaque côté : leurs homologues ne sont ni
  // ajoutés ni retirés.
  const side = (name: string) => {
    const checked = result.checked.get(name)
    const loaded = result.project.models.get(name)
    const relative = (path: string) => path.slice(name.length + 1)
    const skipped = new Set<string>()
    if (loaded?.document && !checked?.document) unreadable.push(loaded.document.path)
    for (const path of loaded?.tables.keys() ?? []) {
      if (!checked?.tables.has(path)) {
        unreadable.push(path)
        skipped.add(relative(path))
      }
    }
    const tables = [...(checked?.tables ?? [])].map(([path, table]) => ({ path: relative(path), table }))
    return { document: checked?.document, tables, skipped }
  }
  const a = side(from)
  const b = side(to)

  const document = a.document && b.document ? compareFields(a.document, b.document, DOCUMENT_FIELDS) : []
  const files = compareItems(a.document?.files ?? [], b.document?.files ?? [], FILE_FIELDS)

  const [ta, tb] = [byName(a.tables.filter((t) => !b.skipped.has(t.path)).map((t) => t.table)), byName(b.tables.filter((t) => !a.skipped.has(t.path)).map((t) => t.table))]
  const tables = {
    added: sorted([...tb.keys()].filter((n) => !ta.has(n))),
    removed: sorted([...ta.keys()].filter((n) => !tb.has(n))),
    changed: sorted([...ta.keys()].filter((n) => tb.has(n)))
      .map((name) => {
        const [x, y] = [ta.get(name)!, tb.get(name)!]
        return { name, changes: compareFields(x, y, TABLE_FIELDS), columns: compareItems(x.columns, y.columns, COLUMN_FIELDS) }
      })
      .filter((t) => t.changes.length > 0 || count(t.columns) > 0),
  }

  const [ca, cb] = [byName(a.document?.codes ?? []), byName(b.document?.codes ?? [])]
  // Contenu des listes présentes des deux côtés ; une liste illisible est laissée de côté.
  const csv = (model: string, data: string) => {
    const path = resolvePath(model, data)
    const entry = path === undefined ? undefined : result.project.models.get(model)?.csvs.get(path)
    if (entry && !entry.csv) unreadable.push(entry.path)
    return entry?.csv
  }
  const content: CodeListContent[] = []
  for (const name of sorted([...ca.keys()].filter((n) => cb.has(n)))) {
    const [x, y] = [csv(from, ca.get(name)!.data), csv(to, cb.get(name)!.data)]
    const diff = x && y && compareCsv(name, x, y, keyColumns(name, [b.tables.map((t) => t.table), a.tables.map((t) => t.table)]))
    if (diff) content.push(diff)
  }
  const codes = {
    added: sorted([...cb.keys()].filter((n) => !ca.has(n))),
    removed: sorted([...ca.keys()].filter((n) => !cb.has(n))),
    content,
  }

  // Une table compte si ses propres champs changent ; ses colonnes comptent à part.
  const total = document.length + count(files) + tables.added.length + tables.removed.length
    + tables.changed.reduce((n, t) => n + (t.changes.length > 0 ? 1 : 0) + count(t.columns), 0)
    + codes.added.length + codes.removed.length
    + content.reduce((n, c) => n + c.columns.added.length + c.columns.removed.length + c.rows.added.length + c.rows.removed.length + c.rows.changed.length, 0)
  return { from, to, document, files, tables, codes, unreadable: sorted(new Set(unreadable)), total }
}
