export type JsonParseResult = { ok: true; value: unknown } | { ok: false; line: number; column: number; detail: string }

// Position (1-based) d'un offset dans un texte.
function lineColumn(text: string, offset: number): { line: number; column: number } {
  const before = text.slice(0, offset)
  const line = before.split('\n').length
  return { line, column: offset - before.lastIndexOf('\n') }
}

class SyntaxErrorAt extends Error {
  constructor(
    readonly offset: number,
    detail: string,
  ) {
    super(detail)
  }
}

// Analyseur JSON minimal, utilisé seulement quand JSON.parse échoue, pour localiser la première
// erreur avec un message identique quel que soit le moteur (les messages de JSON.parse varient
// selon le navigateur et ne donnent pas toujours de position).
function locateError(text: string): SyntaxErrorAt {
  let i = 0
  const ws = () => {
    while (i < text.length && ' \t\n\r'.includes(text[i]!)) i++
  }
  const fail = (expected: string): never => {
    if (i >= text.length) throw new SyntaxErrorAt(i, `fin de fichier inattendue (attendu : ${expected})`)
    throw new SyntaxErrorAt(i, `caractère « ${text[i]} » inattendu (attendu : ${expected})`)
  }
  const literal = (word: string) => {
    if (text.startsWith(word, i)) i += word.length
    else fail('une valeur')
  }
  const string = () => {
    i++
    while (i < text.length && text[i] !== '"') {
      if (text[i] === '\\') {
        i++
        if (text[i] === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(text.slice(i + 1, i + 5))) fail('un échappement \\uXXXX')
          i += 4
        } else if (!'"\\/bfnrt'.includes(text[i] ?? '')) fail('un échappement valide')
      } else if (text.charCodeAt(i) < 0x20) fail('un caractère imprimable ou « " »')
      i++
    }
    if (i >= text.length) fail('« " »')
    i++
  }
  const number = () => {
    const m = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(text.slice(i))
    if (!m) fail('une valeur')
    i += m![0].length
  }
  const value = (): void => {
    ws()
    const c = text[i]
    if (c === '{') {
      i++
      ws()
      if (text[i] === '}') return void i++
      for (;;) {
        ws()
        if (text[i] !== '"') fail('« " »')
        string()
        ws()
        if (text[i] !== ':') fail('« : »')
        i++
        value()
        ws()
        if (text[i] === ',') i++
        else if (text[i] === '}') return void i++
        else fail('« , » ou « } »')
      }
    } else if (c === '[') {
      i++
      ws()
      if (text[i] === ']') return void i++
      for (;;) {
        value()
        ws()
        if (text[i] === ',') i++
        else if (text[i] === ']') return void i++
        else fail('« , » ou « ] »')
      }
    } else if (c === '"') string()
    else if (c === 't') literal('true')
    else if (c === 'f') literal('false')
    else if (c === 'n') literal('null')
    else if (c === '-' || (c !== undefined && c >= '0' && c <= '9')) number()
    else fail('une valeur')
  }
  try {
    value()
    ws()
    if (i < text.length) fail('fin de fichier')
  } catch (e) {
    if (e instanceof SyntaxErrorAt) return e
    throw e
  }
  return new SyntaxErrorAt(0, 'JSON invalide')
}

export function parseJson(text: string): JsonParseResult {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    const e = locateError(text)
    return { ok: false, ...lineColumn(text, e.offset), detail: e.message }
  }
}
