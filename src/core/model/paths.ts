// Résolution des chemins de la configuration, comme le validator (AbstractModelReader).

export const isUrl = (ref: string) => /^[a-z][a-z0-9+.-]*:/i.test(ref)

/** Résout un chemin relatif au dossier d'un modèle ; undefined s'il sort de la configuration. */
export function resolvePath(model: string, ref: string): string | undefined {
  const segments = [model]
  for (const s of ref.split('/')) {
    if (s === '' || s === '.') continue
    if (s === '..') {
      if (segments.length === 0) return undefined
      segments.pop()
    } else segments.push(s)
  }
  return segments.length > 0 ? segments.join('/') : undefined
}

/**
 * Modèle de table d'un fichier : `tableModel`, sinon `./types/<name>.json` (convention du
 * validator). `undefined` pour `auto` ou une URL, qui ne désignent pas un fichier local.
 */
export function tableModelRef(tableModel: string | undefined, name: string): string | undefined {
  if (tableModel !== undefined && (tableModel.toLowerCase() === 'auto' || isUrl(tableModel))) return undefined
  return tableModel ?? `./types/${name}.json`
}
