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
