// Portée d'un téléchargement (plan 008, R1) : toute la configuration ou un fichier.
import { allFiles, type Session } from './edit/session'

export type ExportScope = { kind: 'all' } | { kind: 'file'; path: string }

/** Fichiers d'une portée, créations comprises, dans l'ordre des chemins. */
export function scopeFiles(session: Session, scope: ExportScope): string[] {
  const paths = [...allFiles(session).keys()]
  return scope.kind === 'all' ? paths : paths.filter((p) => p === scope.path)
}
