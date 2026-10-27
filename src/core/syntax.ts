// Découpage d'une ligne de JSON ou de CSV pour la vue « Source » : le texte est restitué à
// l'identique, chaque morceau porte son genre (clé, chaîne, nombre, littéral, séparateur…).
export type SyntaxKind = 'key' | 'string' | 'number' | 'literal' | 'punct' | 'separator' | 'header' | 'text'
export interface SyntaxToken {
  kind: SyntaxKind
  text: string
}

const JSON_TOKEN = /("(?:\\.|[^"\\])*"?)(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b|([{}[\],:])|(\s+|[^"\s{}[\],:\d-]+|.)/g

function push(out: SyntaxToken[], kind: SyntaxKind, text: string) {
  const last = out.at(-1)
  if (last && last.kind === kind && (kind === 'text' || kind === 'punct')) last.text += text
  else out.push({ kind, text })
}

export function jsonLine(line: string): SyntaxToken[] {
  const out: SyntaxToken[] = []
  for (const [, string, colon, number, literal, punct, other] of line.matchAll(JSON_TOKEN)) {
    if (string !== undefined) {
      push(out, colon ? 'key' : 'string', string)
      if (colon) push(out, 'punct', colon)
    } else if (number !== undefined) push(out, 'number', number)
    else if (literal !== undefined) push(out, 'literal', literal)
    else if (punct !== undefined) push(out, 'punct', punct)
    else push(out, 'text', other ?? '')
  }
  return out
}

/** Ligne de CSV : champs (l'en-tête à part), virgules en séparateurs, champs entre guillemets en chaînes. */
export function csvLine(line: string, header: boolean): SyntaxToken[] {
  const out: SyntaxToken[] = []
  for (const [, quoted, comma, field] of line.matchAll(/("(?:[^"]|"")*"?)|(,)|([^,"]+)/g)) {
    if (comma) push(out, 'separator', comma)
    else push(out, header ? 'header' : quoted !== undefined ? 'string' : 'text', quoted ?? field ?? '')
  }
  return out
}
