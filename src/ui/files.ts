import { VARIABLES_FILE } from '@core/variables'

export type FileKind = 'model' | 'table' | 'codes' | 'variables' | 'other'

// Fichier à la racine (variables.json) : aucun modèle.
export const modelOf = (file: string) => (file.includes('/') ? file.slice(0, file.indexOf('/')) : '')

export function kindOf(file: string): FileKind {
  if (file === VARIABLES_FILE) return 'variables'
  const rel = file.slice(file.indexOf('/') + 1)
  if (rel === '' || rel === 'files.json') return 'model'
  if (rel.startsWith('types/') && rel.endsWith('.json')) return 'table'
  if (rel.endsWith('.csv')) return 'codes'
  return 'other'
}

export const baseName = (file: string) => file.slice(file.lastIndexOf('/') + 1)
