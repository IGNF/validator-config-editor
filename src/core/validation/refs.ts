import type { DocumentModel, GpuFile, LoadedModel, Project, TableModel } from '../model/types'
import { isUrl, resolvePath, tableModelRef } from '../model/paths'
import { pointer } from '../pointer'
import { parseForeignKey } from './foreign-key'
import { problem, type Problem } from './problems'

/** Modèle dont les fichiers conformes à leur schéma sont disponibles typés. */
export interface CheckedModel {
  model: LoadedModel
  document?: DocumentModel
  /** Tables conformes, indexées par chemin. */
  tables: Map<string, TableModel>
  gpu?: GpuFile
}

// Tous les `id` (chaînes) portés par des objets, à toute profondeur.
function collectIds(data: unknown, into: Set<string>): Set<string> {
  if (Array.isArray(data)) for (const v of data) collectIds(v, into)
  else if (data !== null && typeof data === 'object') {
    for (const [k, v] of Object.entries(data)) {
      if (k === 'id' && typeof v === 'string') into.add(v)
      else collectIds(v, into)
    }
  }
  return into
}

// Entrées de gpu.json qui définissent un objet propre au GpU (plan R10).
function gpuDefinitions(gpu: GpuFile | undefined): string[] {
  const out: string[] = []
  for (const section of Object.values(gpu ?? {})) {
    for (const [id, entry] of Object.entries(section ?? {})) {
      if ('name' in entry || 'feature_type_id' in entry || 'document_model_id' in entry) out.push(id)
    }
  }
  return out
}

class Checker {
  readonly out: Problem[] = []
  private readonly files: Set<string>
  private readonly parentNames = new Set<string>()
  private readonly known = new Map<string, Set<string>>()

  constructor(
    private readonly project: Project,
    private readonly checked: Map<string, CheckedModel>,
  ) {
    this.files = new Set([...project.models.values()].flatMap((m) => m.files))
    for (const c of checked.values()) if (c.document?.parent) this.parentNames.add(c.document.parent.name)
  }

  run(): Problem[] {
    for (const c of this.checked.values()) this.model(c)
    return this.out
  }

  private model(c: CheckedModel) {
    const name = c.model.name
    if (!c.model.document && !this.parentNames.has(name)) this.out.push(problem('WARN-MODEL-NO-DOCUMENT', name, `${name}/`, undefined))
    const referenced = this.document(c)
    this.ids(c)
    for (const [path, table] of c.tables) this.table(c, path, table)
    if (c.document) {
      for (const path of c.model.files) {
        const rel = path.slice(name.length + 1)
        const candidate = (rel.startsWith('types/') && rel.endsWith('.json')) || (rel.startsWith('codes/') && rel.endsWith('.csv'))
        if (candidate && !referenced.has(path)) this.out.push(problem('WARN-UNREFERENCED-FILE', name, path, undefined))
      }
    }
    this.gpu(c)
  }

  // Références de files.json ; renvoie les fichiers référencés.
  private document(c: CheckedModel): Set<string> {
    const referenced = new Set<string>()
    const doc = c.document
    if (!doc) return referenced
    const name = c.model.name
    const file = `${name}/files.json`
    if (doc.name !== name) this.out.push(problem('WARN-MODEL-NAME', name, file, '/name', { name: doc.name, folder: name }))
    if (doc.parent && !this.project.models.has(doc.parent.name)) {
      this.out.push(problem('ERR-PARENT-MISSING', name, file, '/parent/name', { name: doc.parent.name }))
    }
    const tableRef = (ref: string | undefined, tableName: string, at: string) => {
      const target = tableModelRef(ref, tableName)
      if (target === undefined) return
      const path = resolvePath(name, target)
      if (path && this.files.has(path)) referenced.add(path)
      else this.out.push(problem('ERR-TABLE-MODEL-MISSING', name, file, ref !== undefined ? `${at}/tableModel` : at, { ref: target }))
    }
    doc.files.forEach((f, i) => {
      if (f.type === 'table') tableRef(f.tableModel, f.name, pointer('files', i))
      else if (f.type === 'multi_table') f.tables?.forEach((t, j) => tableRef(t.tableModel, t.name, pointer('files', i, 'tables', j)))
    })
    doc.codes?.forEach((code, i) => {
      if (isUrl(code.data)) return
      const path = resolvePath(name, code.data)
      if (path && this.files.has(path)) referenced.add(path)
      else this.out.push(problem('ERR-CODE-DATA-MISSING', name, file, pointer('codes', i, 'data'), { ref: code.data }))
    })
    return referenced
  }

  // Unicité des `id` : modèle, fichiers, codes et tables dans le modèle (hors parent embarqué,
  // ignoré par le validator) ; colonnes dans leur table, car les tables concrètes d'un modèle
  // hérité reprennent les colonnes, et leurs `id`, d'une même table abstraite.
  private ids(c: CheckedModel) {
    const name = c.model.name
    const unique = () => {
      const seen = new Map<string, string>()
      return (id: string | undefined, file: string, at: string) => {
        if (id === undefined) return
        const first = seen.get(id)
        if (first) this.out.push(problem('ERR-ID-DUPLICATE', name, file, at, { id, first }))
        else seen.set(id, `${file.slice(name.length + 1)}#${at}`)
      }
    }
    const add = unique()
    const doc = c.document
    if (doc) {
      const file = `${name}/files.json`
      add(doc.id, file, '/id')
      doc.files.forEach((f, i) => add(f.id, file, pointer('files', i, 'id')))
      doc.codes?.forEach((code, i) => add(code.id, file, pointer('codes', i, 'id')))
    }
    for (const [path, t] of c.tables) {
      add(t.id, path, '/id')
      const addColumn = unique()
      t.columns.forEach((col, i) => addColumn(col.id, path, pointer('columns', i, 'id')))
    }
  }

  private table(c: CheckedModel, path: string, table: TableModel) {
    const name = c.model.name
    const columns = new Set(table.columns.map((col) => col.name))
    const tablesByName = new Map([...c.tables.values()].map((t) => [t.name, t]))

    table.constraints?.foreignKeys?.forEach((text, i) => {
      const at = pointer('constraints', 'foreignKeys', i)
      const fk = parseForeignKey(text)
      if (!fk) {
        this.out.push(problem('ERR-FK-SYNTAX', name, path, at, { fk: text }))
        return
      }
      for (const column of fk.sourceColumns) {
        if (!columns.has(column)) this.out.push(problem('ERR-FK-SOURCE-COLUMN', name, path, at, { column }))
      }
      if (!c.document) return
      const code = c.document.codes?.find((x) => x.name === fk.target)
      let targetColumns: string[] | undefined
      if (code) {
        const csvPath = isUrl(code.data) ? undefined : resolvePath(name, code.data)
        targetColumns = csvPath ? this.csvHeader(csvPath) : undefined
      } else {
        const target = tablesByName.get(fk.target)
        if (!target) {
          this.out.push(problem('ERR-FK-TARGET-LIST', name, path, at, { list: fk.target }))
          return
        }
        targetColumns = target.columns.map((col) => col.name)
      }
      // Liste illisible ou absente : déjà signalé par ailleurs.
      if (!targetColumns) return
      for (const column of fk.targetColumns) {
        if (!targetColumns.includes(column)) this.out.push(problem('ERR-FK-TARGET-COLUMN', name, path, at, { column, list: fk.target }))
      }
    })

    table.columns.forEach((col, i) => {
      const ref = col.constraints?.reference
      if (ref === undefined) return
      const dot = ref.indexOf('.')
      const target = dot > 0 ? tablesByName.get(ref.slice(0, dot)) : undefined
      if (!target?.columns.some((x) => x.name === ref.slice(dot + 1))) {
        this.out.push(problem('ERR-REFERENCE-TARGET', name, path, pointer('columns', i, 'constraints', 'reference'), { ref }))
      }
    })
  }

  private csvHeader(path: string): string[] | undefined {
    const model = this.project.models.get(path.slice(0, path.indexOf('/')))
    return model?.csvs.get(path)?.csv?.header
  }

  // `id` connus d'un modèle (plan R10) : objets du modèle (parent embarqué compris), définitions
  // de son gpu.json, `id` connus de son parent ; pour un modèle abstrait, objets des modèles qui
  // en héritent (son gpu.json surcharge des colonnes héritées par leurs tables).
  private knownIds(name: string, visiting = new Set<string>()): Set<string> {
    const cached = this.known.get(name)
    if (cached) return cached
    const known = new Set<string>()
    const c = this.checked.get(name)
    if (!c || visiting.has(name)) return known
    visiting.add(name)
    // Données brutes : une table non conforme à son schéma ne rend pas ses `id` orphelins.
    collectIds(c.model.document?.data, known)
    for (const t of c.model.tables.values()) collectIds(t.data, known)
    for (const id of gpuDefinitions(c.gpu)) known.add(id)
    if (c.document?.parent) for (const id of this.knownIds(c.document.parent.name, visiting)) known.add(id)
    if (!c.model.document) {
      for (const child of this.checked.values()) {
        if (child.document?.parent?.name !== name) continue
        collectIds(child.model.document?.data, known)
        for (const t of child.model.tables.values()) collectIds(t.data, known)
      }
    }
    this.known.set(name, known)
    return known
  }

  private gpu(c: CheckedModel) {
    if (!c.gpu) return
    const name = c.model.name
    const known = this.knownIds(name)
    for (const [section, entries] of Object.entries(c.gpu)) {
      for (const id of Object.keys(entries ?? {})) {
        if (!known.has(id)) this.out.push(problem('WARN-GPU-ORPHAN-ID', name, `${name}/gpu.json`, pointer(section, id), { id }))
      }
    }
  }
}

export function crossReferences(project: Project, checked: Map<string, CheckedModel>): Problem[] {
  return new Checker(project, checked).run()
}
