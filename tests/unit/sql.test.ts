import { describe, expect, it } from 'vitest'
import { sqlTokens } from '@core/sql'

describe('sqlTokens', () => {
  it('clé étrangère : REFERENCES en mot-clé, colonnes et liste en identifiants', () => {
    expect(sqlTokens('(TYPEPSC, STYPEPSC) REFERENCES PrescriptionUrbaType(TYPEPSC, STYPEPSC)').filter((t) => t.kind !== 'other')).toEqual([
      { kind: 'identifier', text: 'TYPEPSC' },
      { kind: 'identifier', text: 'STYPEPSC' },
      { kind: 'keyword', text: 'REFERENCES' },
      { kind: 'identifier', text: 'PrescriptionUrbaType' },
      { kind: 'identifier', text: 'TYPEPSC' },
      { kind: 'identifier', text: 'STYPEPSC' },
    ])
  })

  it('condition : mots-clés sans tenir compte de la casse, chaînes et nombres ; texte restitué à l\'identique', () => {
    const text = "DATEFIN IS NOT NULL or ETAT NOT IN ('04', 'l''a') AND LENGTH(X) > 2"
    const tokens = sqlTokens(text)
    expect(tokens.map((t) => t.text).join('')).toBe(text)
    expect(tokens.filter((t) => t.kind === 'keyword').map((t) => t.text)).toEqual(['IS', 'NOT', 'NULL', 'or', 'NOT', 'IN', 'AND', 'LENGTH'])
    expect(tokens.filter((t) => t.kind === 'string').map((t) => t.text)).toEqual(["'04'", "'l''a'"])
    expect(tokens.filter((t) => t.kind === 'number').map((t) => t.text)).toEqual(['2'])
  })

  it('chaîne non fermée : gardée telle quelle', () => {
    expect(sqlTokens("ETAT = 'ab").map((t) => t.text).join('')).toBe("ETAT = 'ab")
  })
})
