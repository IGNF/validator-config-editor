import { describe, expect, it } from 'vitest'
import { testName } from '@core/regex-test'

const variables = new Map([
  ['INSEE_COMMUNE', '[AB0-9]{5}'],
  ['DATE', '[0-9]{8}'],
  ['_PART_OPT', '(_[a-zA-Z])?'],
])

describe('testName', () => {
  const regex = 'Pieces_ecrites/[AB0-9]{5}_reglement_[0-9]{8}(_[a-zA-Z])?'
  it('nom accepté en entier', () => {
    expect(testName(regex, 'Pieces_ecrites/44712_reglement_20240115', variables)).toEqual({ kind: 'match' })
    expect(testName(regex, 'Pieces_ecrites/44712_reglement_20240115_A', variables)).toEqual({ kind: 'match' })
  })

  it('refus : première partie qui ne correspond plus', () => {
    expect(testName(regex, 'Pieces_ecrites/44712_reglement_2024', variables)).toEqual({ kind: 'mismatch', failedAt: '<DATE>' })
    expect(testName(regex, 'Pieces_ecrites/4471_reglement_20240115', variables)).toEqual({ kind: 'mismatch', failedAt: '<INSEE_COMMUNE>' })
    expect(testName(regex, 'Pieces/44712_reglement_20240115', variables)).toEqual({ kind: 'mismatch', failedAt: 'Pieces_ecrites/' })
    // Texte en trop après une regex complète.
    expect(testName(regex, 'Pieces_ecrites/44712_reglement_20240115_AB', variables)).toEqual({ kind: 'mismatch' })
  })

  it('sans dictionnaire : morceaux de texte de la regex', () => {
    expect(testName('[0-9]{3}_X', '12_X')).toMatchObject({ kind: 'mismatch' })
    expect(testName('[0-9]{3}_X', '123_X')).toEqual({ kind: 'match' })
  })

  it('regex invalide : signalée', () => {
    expect(testName('([0-9]', 'x')).toMatchObject({ kind: 'invalid' })
  })
})
