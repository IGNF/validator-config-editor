import { describe, expect, it } from 'vitest'
import { parseForeignKey } from '@core/validation/foreign-key'

describe('parseForeignKey', () => {
  it('lit une clé simple', () => {
    expect(parseForeignKey('(TYPEZONE) REFERENCES ListeTypezonePLU(TYPEZONE)')).toEqual({
      sourceColumns: ['TYPEZONE'],
      target: 'ListeTypezonePLU',
      targetColumns: ['TYPEZONE'],
    })
  })

  it('lit une clé multi-colonnes avec espaces', () => {
    expect(parseForeignKey(' ( TYPEINF , STYPEINF ) REFERENCES  InformationUrbaType ( TYPEINF, STYPEINF ) ')).toEqual({
      sourceColumns: ['TYPEINF', 'STYPEINF'],
      target: 'InformationUrbaType',
      targetColumns: ['TYPEINF', 'STYPEINF'],
    })
  })

  it.each([
    ['mot-clé mal écrit', '(TYPE) REFERENCE Liste(TYPE)'],
    ['listes de longueurs différentes', '(A, B) REFERENCES Liste(A)'],
    ['cible absente', '(A) REFERENCES (A)'],
    ['texte libre', 'TYPE doit exister'],
  ])('refuse : %s', (_label, text) => {
    expect(parseForeignKey(text)).toBeUndefined()
  })
})
