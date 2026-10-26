// Règles de l'import GpU (feature 010, plan R4), appliquées à une configuration GpU
// (variables.json présent) : celles de JsonConfigReader, qui charge la configuration en base.
import { tableModelRef, resolvePath } from '../model/paths'
import { pointer } from '../pointer'
import { problem, type Problem } from './problems'
import type { CheckedModel } from './refs'

type Kind = 'modèle' | 'fichier' | 'liste' | 'table' | 'colonne'
interface Occurrence {
  model: string
  file: string
  at: string
}

export function gpuImportProblems(checked: Map<string, CheckedModel>): Problem[] {
  const out: Problem[] = []
  // Premier objet de chaque type portant un id, dans toute la configuration (clé : type + id).
  const seen = new Map<string, Occurrence>()

  const check = (kind: Kind, id: string | undefined, o: Occurrence, objectAt: string) => {
    if (id === undefined) {
      out.push(problem('ERR-GPU-ID-MISSING', o.model, o.file, objectAt, { kind }))
      return
    }
    const first = seen.get(`${kind} ${id}`)
    if (!first) {
      seen.set(`${kind} ${id}`, o)
      return
    }
    // Doublons d'un même modèle (hors colonnes de tables différentes) : déjà signalés par refs.ts.
    const sameScope = first.model === o.model && (kind !== 'colonne' || first.file === o.file)
    if (!sameScope) out.push(problem('ERR-ID-DUPLICATE', o.model, o.file, o.at, { id, first: `${first.file}#${first.at}` }))
  }

  for (const c of checked.values()) {
    const name = c.model.name
    const doc = c.document
    if (doc) {
      const file = `${name}/files.json`
      if (doc.parent !== undefined) out.push(problem('ERR-GPU-INHERITANCE', name, file, '/parent', { where: 'files.json' }))
      check('modèle', doc.id, { model: name, file, at: '/id' }, '')
      doc.files.forEach((f, i) => check('fichier', f.id, { model: name, file, at: pointer('files', i, 'id') }, pointer('files', i)))
      doc.codes?.forEach((code, i) => check('liste', code.id, { model: name, file, at: pointer('codes', i, 'id') }, pointer('codes', i)))
      // Comme l'import : tables des fichiers de type table.
      for (const f of doc.files) {
        if (f.type !== 'table') continue
        const ref = tableModelRef(f.tableModel, f.name)
        const path = ref === undefined ? undefined : resolvePath(name, ref)
        const table = path === undefined ? undefined : c.tables.get(path)
        if (!path || !table) continue
        check('table', table.id, { model: name, file: path, at: '/id' }, '')
        table.columns.forEach((col, i) => check('colonne', col.id, { model: name, file: path, at: pointer('columns', i, 'id') }, pointer('columns', i)))
      }
    }
    for (const [section, entries] of Object.entries(c.gpu ?? {})) {
      for (const [id, values] of Object.entries(entries ?? {})) {
        if ((values.parent_id ?? null) !== null || values.abstract === 't') {
          out.push(problem('ERR-GPU-INHERITANCE', name, `${name}/gpu.json`, pointer(section, id), { where: 'gpu.json' }))
        }
      }
    }
  }
  return out
}
