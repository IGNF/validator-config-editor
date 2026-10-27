import { describe, expect, it } from 'vitest'
import { isUrl, resolvePath, tableModelRef } from '@core/model/paths'

describe('chemins', () => {
  it('résout un chemin relatif au modèle', () => {
    expect(resolvePath('m', './types/T.json')).toBe('m/types/T.json')
    expect(resolvePath('m', 'codes//L.csv')).toBe('m/codes/L.csv')
    expect(resolvePath('m', '../autre/types/T.json')).toBe('autre/types/T.json')
    expect(resolvePath('m', '../../x.json')).toBeUndefined()
    expect(resolvePath('m', '..')).toBeUndefined()
  })

  it('détermine le modèle de table d\'un fichier comme le validator', () => {
    expect(tableModelRef('./types/A.json', 'B')).toBe('./types/A.json')
    expect(tableModelRef(undefined, 'B')).toBe('./types/B.json')
    expect(tableModelRef('AUTO', 'B')).toBeUndefined()
    expect(tableModelRef('https://example.org/B.json', 'B')).toBeUndefined()
    expect(isUrl('file:///x')).toBe(true)
    expect(isUrl('./x')).toBe(false)
  })
})

