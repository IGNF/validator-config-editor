// Portée d'un téléchargement (plan 008, R1) : toute la configuration, un modèle ou un fichier.
import { allFiles, type Session } from './edit/session'
import { isUrl, resolvePath, tableModelRef } from './model/paths'

export type ExportScope = { kind: 'all' } | { kind: 'model'; model: string } | { kind: 'file'; path: string }

/** Fichiers d'une portée, créations comprises, dans l'ordre des chemins. */
export function scopeFiles(session: Session, scope: ExportScope): string[] {
  const paths = [...allFiles(session).keys()]
  if (scope.kind === 'all') return paths
  if (scope.kind === 'file') return paths.filter((p) => p === scope.path)
  return paths.filter((p) => p.startsWith(`${scope.model}/`))
}

/**
 * Références de `files.json` qui sortent du dossier du modèle (modèles de table, listes de
 * codes) : le modèle téléchargé seul ne suffit pas à les valider. URL et `auto` ignorés.
 */
export function outgoingRefs(session: Session, model: string): string[] {
  const doc = session.result.checked.get(model)?.document
  if (!doc) return []
  const refs = [
    ...doc.files.flatMap((f) =>
      f.type === 'table' ? [tableModelRef(f.tableModel, f.name)] : f.type === 'multi_table' ? (f.tables ?? []).map((t) => tableModelRef(t.tableModel, t.name)) : [],
    ),
    ...(doc.codes ?? []).map((c) => (isUrl(c.data) ? undefined : c.data)),
  ]
  const outside = (ref: string) => !resolvePath(model, ref)?.startsWith(`${model}/`)
  return [...new Set(refs.filter((r): r is string => r !== undefined && outside(r)))].sort()
}
