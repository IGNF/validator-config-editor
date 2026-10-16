export type FileKind = 'model' | 'table' | 'codes' | 'gpu' | 'other'

export const modelOf = (file: string) => file.slice(0, file.indexOf('/'))

export function kindOf(file: string): FileKind {
  const rel = file.slice(file.indexOf('/') + 1)
  if (rel === '' || rel === 'files.json') return 'model'
  if (rel === 'gpu.json') return 'gpu'
  if (rel.startsWith('types/') && rel.endsWith('.json')) return 'table'
  if (rel.endsWith('.csv')) return 'codes'
  return 'other'
}

export const baseName = (file: string) => file.slice(file.lastIndexOf('/') + 1)
