import type { Csv } from '../model/types'

export type CsvParseResult =
  | { ok: true; csv: Csv }
  | { ok: false; code: 'ERR-CSV-SYNTAX' | 'ERR-CSV-HEADER' | 'ERR-CSV-ROW-LENGTH'; line: number; params: Record<string, string | number> }

// Découpe un CSV RFC 4180 (séparateur virgule) en enregistrements, avec la ligne de début de
// chaque enregistrement. Gère guillemets, guillemets doublés, sauts de ligne entre guillemets,
// \r\n et BOM (plan R7).
function records(text: string): { fields: string[]; line: number }[] | { unclosedAt: number } {
  const out: { fields: string[]; line: number }[] = []
  let fields: string[] = []
  let field = ''
  let quoted = false
  let line = 1
  let start = 1
  let quoteStart = 0
  const src = text.startsWith('﻿') ? text.slice(1) : text
  for (let i = 0; i < src.length; i++) {
    const c = src[i]!
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"'
          i++
        } else quoted = false
      } else {
        if (c === '\n') line++
        field += c
      }
    } else if (c === '"' && field === '') {
      quoted = true
      quoteStart = line
    } else if (c === ',') {
      fields.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++
      fields.push(field)
      out.push({ fields, line: start })
      fields = []
      field = ''
      line++
      start = line
    } else field += c
  }
  if (quoted) return { unclosedAt: quoteStart }
  if (field !== '' || fields.length > 0) {
    fields.push(field)
    out.push({ fields, line: start })
  }
  return out
}

export function parseCsv(text: string): CsvParseResult {
  const recs = records(text)
  if (!Array.isArray(recs)) return { ok: false, code: 'ERR-CSV-SYNTAX', line: recs.unclosedAt, params: {} }
  // Les lignes entièrement vides (ex. en fin de fichier) sont ignorées.
  const nonEmpty = recs.filter((r) => !(r.fields.length === 1 && r.fields[0] === ''))
  const [first, ...rest] = nonEmpty
  if (!first) return { ok: false, code: 'ERR-CSV-HEADER', line: 1, params: { reason: 'en-tête absent' } }
  const header = first.fields
  const seen = new Set<string>()
  for (const name of header) {
    if (name.trim() === '') return { ok: false, code: 'ERR-CSV-HEADER', line: first.line, params: { reason: 'nom de colonne vide' } }
    if (seen.has(name)) return { ok: false, code: 'ERR-CSV-HEADER', line: first.line, params: { reason: `colonne « ${name} » dupliquée` } }
    seen.add(name)
  }
  for (const r of rest) {
    if (r.fields.length !== header.length) {
      return { ok: false, code: 'ERR-CSV-ROW-LENGTH', line: r.line, params: { count: r.fields.length, expected: header.length } }
    }
  }
  return { ok: true, csv: { header, rows: rest.map((r) => r.fields) } }
}
