export interface ForeignKey {
  sourceColumns: string[]
  target: string
  targetColumns: string[]
}

// Même analyse que le validator (ForeignKeyConstraint.parseForeignKey) : espaces retirés autour
// de « ( », « ) » et « , », puis « (A,B)REFERENCES Cible(C,D) » avec des listes de même longueur.
const SYNTAX = /^\((\w+(?:,\w+)*)\)REFERENCES *(\w+)\((\w+(?:,\w+)*)\)$/

export function parseForeignKey(text: string): ForeignKey | undefined {
  const compact = text.replace(/\s*([(),])\s*/g, '$1')
  const m = SYNTAX.exec(compact)
  if (!m) return undefined
  const sourceColumns = m[1]!.split(',')
  const targetColumns = m[3]!.split(',')
  if (sourceColumns.length !== targetColumns.length) return undefined
  return { sourceColumns, target: m[2]!, targetColumns }
}

// Remplace un nom de colonne dans la partie source ou cible d'une clé étrangère, ou la cible.
export function rewriteForeignKey(text: string, part: 'source' | 'target' | 'list', from: string, to: string): string {
  const index = text.search(/REFERENCES/)
  const [left, right] = [text.slice(0, index), text.slice(index)]
  const word = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
  if (part === 'source') return left.replace(word, to) + right
  if (part === 'list') return left + right.replace(word, to)
  const open = right.indexOf('(')
  return left + right.slice(0, open) + right.slice(open).replace(word, to)
}
