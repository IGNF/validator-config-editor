import { describe, expect, it } from 'vitest'
import { comparePointers, parsePointer, pointer } from '@core/pointer'

describe('pointeurs JSON', () => {
  it('échappent ~ et /', () => {
    expect(pointer('a/b', 'c~d', 3)).toBe('/a~1b/c~0d/3')
    expect(parsePointer('/a~1b/c~0d/3')).toEqual(['a/b', 'c~d', '3'])
    expect(parsePointer('')).toEqual([])
  })

  it('comparent les segments numériques dans l\'ordre naturel', () => {
    expect(comparePointers('/columns/2', '/columns/10')).toBeLessThan(0)
    expect(comparePointers('/columns/10/id', '/columns/2/id')).toBeGreaterThan(0)
    expect(comparePointers('/a', '/b')).toBeLessThan(0)
    expect(comparePointers('/a', '/a/b')).toBeLessThan(0)
    expect(comparePointers('/a', '/a')).toBe(0)
  })
})
