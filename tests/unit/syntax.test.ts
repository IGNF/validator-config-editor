import { describe, expect, it } from 'vitest'
import { csvLine, jsonLine } from '@core/syntax'

const kinds = (tokens: { kind: string; text: string }[]) => tokens.filter((t) => t.kind !== 'text' && t.kind !== 'punct').map((t) => `${t.kind}:${t.text}`)

describe('jsonLine', () => {
  it('clés, chaînes, nombres et littéraux ; texte restitué à l\'identique', () => {
    const line = '    "maxLength": 80, "required": true, "name": "LIB \\"A\\"", "x": null, "n": -1.5e3'
    const tokens = jsonLine(line)
    expect(tokens.map((t) => t.text).join('')).toBe(line)
    expect(kinds(tokens)).toEqual(['key:"maxLength"', 'number:80', 'key:"required"', 'literal:true', 'key:"name"', 'string:"LIB \\"A\\""', 'key:"x"', 'literal:null', 'key:"n"', 'number:-1.5e3'])
  })

  it('ligne mal formée : restituée telle quelle', () => {
    const line = '  "a": [1, tru'
    expect(jsonLine(line).map((t) => t.text).join('')).toBe(line)
  })
})

describe('csvLine', () => {
  it('en-tête, séparateurs, champs entre guillemets', () => {
    expect(kinds(csvLine('TYPEPSC,STYPEPSC,LIBELLE', true))).toEqual(['header:TYPEPSC', 'separator:,', 'header:STYPEPSC', 'separator:,', 'header:LIBELLE'])
    const line = '01,00,"Espace, boisé ""classé"""'
    const tokens = csvLine(line, false)
    expect(tokens.map((t) => t.text).join('')).toBe(line)
    expect(tokens.filter((t) => t.kind === 'string').map((t) => t.text)).toEqual(['"Espace, boisé ""classé"""'])
  })
})
