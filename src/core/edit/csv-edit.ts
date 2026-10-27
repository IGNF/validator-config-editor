// Édition du contenu d'une liste de codes (CSV) ligne à ligne : seule la ligne touchée est
// réécrite, le reste du texte (fins de ligne, guillemets, dernière fin de ligne) est conservé.
import { parseCsv } from '../load/csv'

/** Champ CSV : entre guillemets s'il contient une virgule, un guillemet, une fin de ligne ou des espaces au bord. */
export const csvField = (value: string) => (/[",\r\n]|^\s|\s$/.test(value) ? `"${value.replace(/"/g, '""')}"` : value)

interface Lines {
  lines: string[]
  eol: string
  final: boolean
}
function split(text: string): Lines {
  const eol = text.includes('\r\n') ? '\r\n' : '\n'
  const final = text.endsWith('\n')
  const body = final ? text.slice(0, text.endsWith('\r\n') ? -2 : -1) : text
  return { lines: body === '' ? [] : body.split(/\r?\n/), eol, final }
}
const line = (fields: readonly string[]) => fields.map(csvField).join(',')
const join = ({ lines, eol, final }: Lines) => lines.join(eol) + (final || lines.length === 0 ? eol : '')

/** Éditable ligne à ligne : CSV lisible, une ligne de texte par ligne de données (pas de champ sur plusieurs lignes). */
export function csvEditable(text: string): boolean {
  const parsed = parseCsv(text)
  if (!parsed.ok) return false
  return split(text).lines.length === parsed.csv.rows.length + 1
}

function rows(text: string) {
  const parsed = parseCsv(text)
  if (!parsed.ok) throw new Error('CSV illisible')
  return parsed.csv
}

/** Valeur de la ligne de données `row` (0 pour la première après l'en-tête), colonne `column`. */
export function setCsvCell(text: string, row: number, column: number, value: string): string {
  const csv = rows(text)
  const fields = [...(csv.rows[row] ?? [])]
  while (fields.length < csv.header.length) fields.push('')
  fields[column] = value
  const l = split(text)
  l.lines[row + 1] = line(fields)
  return join(l)
}

/** Ligne de données ajoutée à la fin. */
export function addCsvRow(text: string, values?: readonly string[]): string {
  const csv = rows(text)
  const l = split(text)
  l.lines.push(line(csv.header.map((_, i) => values?.[i] ?? '')))
  if (!l.final) l.final = true
  return join(l)
}

/** Ligne de données retirée. */
export function removeCsvRow(text: string, row: number): string {
  const l = split(text)
  l.lines.splice(row + 1, 1)
  return join(l)
}
