// Sérialisation fidèle au style de chaque fichier (plan 002, R4 ; contrat source-et-ecriture).

export interface JsonStyle {
  indent: string
  eol: '\n' | '\r\n'
  finalNewline: boolean
}

export function detectStyle(text: string): JsonStyle {
  const eol = text.includes('\r\n') ? '\r\n' : '\n'
  const indent = /\n([ \t]+)"/.exec(text)?.[1] ?? '    '
  return { indent, eol, finalNewline: /\r?\n$/.test(text) }
}

export function serialize(data: unknown, style: JsonStyle): string {
  const text = JSON.stringify(data, null, style.indent)
  return (style.eol === '\n' ? text : text.replace(/\n/g, '\r\n')) + (style.finalNewline ? style.eol : '')
}

/** Vrai si resérialiser le fichier sans modification redonne exactement le même texte. */
export function isReproducible(text: string): boolean {
  try {
    return serialize(JSON.parse(text), detectStyle(text)) === text
  } catch {
    return false
  }
}
