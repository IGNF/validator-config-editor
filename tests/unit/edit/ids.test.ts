import { describe, expect, it } from 'vitest'
import { newId } from '@core/edit/ids'

describe('newId', () => {
  it('produit 32 caractères hexadécimaux', () => {
    expect(newId(new Set())).toMatch(/^[0-9a-f]{32}$/)
  })

  it('évite les identifiants existants', () => {
    let n = 0
    const random = (bytes: Uint8Array) => bytes.fill(n++ < 2 ? 0 : 1)
    expect(newId(new Set(['0'.repeat(32)]), random)).toBe('01'.repeat(16))
    expect(n).toBe(3)
  })
})
