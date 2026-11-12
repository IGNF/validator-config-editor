// Découpage d'une clé étrangère ou d'une condition (syntaxe SQL du validator) pour l'affichage :
// mots-clés connus, chaînes, nombres, identifiants et le reste, dans l'ordre du texte.
export type SqlKind = 'keyword' | 'string' | 'number' | 'identifier' | 'other'
export interface SqlToken {
  kind: SqlKind
  text: string
}

export const SQL_KEYWORDS = new Set([
  'REFERENCES', 'AND', 'OR', 'NOT', 'IS', 'NULL', 'IN', 'LIKE', 'ILIKE', 'BETWEEN', 'TRUE', 'FALSE',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'EXISTS', 'SELECT', 'FROM', 'WHERE', 'LENGTH', 'UPPER', 'LOWER', 'SUBSTRING',
])

const TOKEN = /('(?:[^']|'')*'?)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)|(\s+|[^\sA-Za-z0-9_']+)/g

export function sqlTokens(text: string): SqlToken[] {
  const out: SqlToken[] = []
  for (const [all, string, number, word] of text.matchAll(TOKEN)) {
    const kind: SqlKind = string ? 'string' : number ? 'number' : word ? (SQL_KEYWORDS.has(word.toUpperCase()) ? 'keyword' : 'identifier') : 'other'
    const last = out.at(-1)
    if (kind === 'other' && last?.kind === 'other') last.text += all
    else out.push({ kind, text: all })
  }
  return out
}

/** Condition d'une table : texte SQL seul (ancien format) ou objet `{ sql, message }`. */
export type Condition = string | { sql: string; message?: string }

export const conditionSql = (c: Condition): string => (typeof c === 'string' ? c : c.sql)
export const conditionMessage = (c: Condition): string => (typeof c === 'string' ? '' : (c.message ?? ''))
