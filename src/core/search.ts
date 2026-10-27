// Recherche dans toute la configuration (sans tenir compte de la casse) : modèles, fichiers
// attendus, tables, colonnes, listes de codes et leurs valeurs, identifiants. Chaque résultat
// désigne un fichier et un pointeur (ou une ligne de CSV).
import { resolvePath } from './model/paths'
import { pointer } from './pointer'
import type { CheckResult } from './validation/validate'

export type SearchKind = 'modèle' | 'fichier' | 'table' | 'colonne' | 'liste' | 'valeur'
export interface SearchResult {
  kind: SearchKind
  model: string
  file: string
  /** Pointeur JSON, ou « /<ligne> » pour une valeur de liste de codes (ligne du CSV). */
  pointer?: string
  /** Nom de l'élément, ex. « ZONE_URBA.TYPEZONE ». */
  label: string
  /** Propriété où le texte a été trouvé, et sa valeur. */
  field: string
  value: string
}

export function search(result: CheckResult, query: string, limit = 200): { results: SearchResult[]; truncated: boolean } {
  const q = query.trim().toLowerCase()
  const results: SearchResult[] = []
  if (q.length < 2) return { results, truncated: false }
  let truncated = false
  const add = (r: SearchResult) => {
    if (results.length >= limit) truncated = true
    else results.push(r)
  }
  const test = (value: unknown) => typeof value === 'string' && value.toLowerCase().includes(q)
  const fields = (base: Omit<SearchResult, 'field' | 'value'>, values: Record<string, unknown>) => {
    for (const [field, value] of Object.entries(values)) {
      if (test(value)) {
        add({ ...base, field, value: value as string })
        return
      }
    }
  }

  for (const [name, c] of [...result.checked].sort(([a], [b]) => a.localeCompare(b))) {
    const doc = c.document
    const docPath = c.model.document?.path
    if (doc && docPath) {
      fields({ kind: 'modèle', model: name, file: docPath, label: name }, { nom: doc.name, titre: doc.title, description: doc.description, identifiant: doc.id, 'nom du dossier': doc.constraints?.folderName })
      doc.files.forEach((f, i) =>
        fields({ kind: 'fichier', model: name, file: docPath, pointer: pointer('files', i), label: `${name} › ${f.name}` }, { nom: f.name, titre: f.title, chemin: f.path, description: f.description, identifiant: f.id }))
      doc.codes?.forEach((code, i) => {
        fields({ kind: 'liste', model: name, file: docPath, pointer: pointer('codes', i), label: `${name} › ${code.name}` }, { nom: code.name, titre: code.title, fichier: code.data, identifiant: code.id })
        // Valeurs de la liste : une ligne de CSV trouvée par liste au plus (première occurrence).
        const path = resolvePath(name, code.data)
        const csv = path ? c.model.csvs.get(path)?.csv : undefined
        const row = csv?.rows.findIndex((r) => r.some(test)) ?? -1
        if (path && csv && row >= 0) add({ kind: 'valeur', model: name, file: path, pointer: `/${row + 2}`, label: `${name} › ${code.name}`, field: 'valeur', value: csv.rows[row]!.join(', ') })
      })
    }
    for (const [path, t] of [...c.tables].sort(([a], [b]) => a.localeCompare(b))) {
      fields({ kind: 'table', model: name, file: path, label: `${name} › ${t.name}` }, { nom: t.name, titre: t.title, description: t.description, identifiant: t.id })
      t.columns.forEach((col, i) =>
        fields({ kind: 'colonne', model: name, file: path, pointer: pointer('columns', i), label: `${name} › ${t.name}.${col.name}` }, {
          nom: col.name, titre: col.title, description: col.description, motif: col.constraints?.pattern, identifiant: col.id,
        }))
    }
  }
  return { results, truncated }
}
