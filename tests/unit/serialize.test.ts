import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { detectStyle, isReproducible, serialize } from '@core/serialize'

const FIXTURES = join(import.meta.dirname, '../fixtures')
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : n.endsWith('.json') ? [p] : []
  })

describe('style JSON', () => {
  it.each([
    ['{\n    "a": 1\n}', { indent: '    ', eol: '\n', finalNewline: false }],
    ['{\n  "a": 1\n}\n', { indent: '  ', eol: '\n', finalNewline: true }],
    ['{\r\n\t"a": 1\r\n}\r\n', { indent: '\t', eol: '\r\n', finalNewline: true }],
    ['{}', { indent: '    ', eol: '\n', finalNewline: false }],
  ])('détecte le style de %j', (text, style) => {
    expect(detectStyle(text)).toEqual(style)
  })

  it('sérialise selon le style', () => {
    expect(serialize({ a: [1] }, { indent: '  ', eol: '\r\n', finalNewline: true })).toBe('{\r\n  "a": [\r\n    1\r\n  ]\r\n}\r\n')
  })

  it('reproduit octet pour octet les fixtures réelles, sauf celles mises en forme à la main', () => {
    const notReproducible = walk(FIXTURES).filter((f) => !isReproducible(readFileSync(f, 'utf8')))
    // dgpr/Canalisations/files.json : objet vide sur deux lignes ; ppr/…/files.json : lignes vides.
    expect(notReproducible.map((f) => f.slice(FIXTURES.length + 1)).sort()).toEqual([
      'known/dgpr/Canalisations/files.json',
      'known/ppr/cnig_PPR_v1.0_geopackage/files.json',
    ])
  })

  it('signale un JSON illisible comme non reproductible', () => {
    expect(isReproducible('{')).toBe(false)
  })
})
