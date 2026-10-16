// Dossier choisi dans le navigateur (plan 002, R9) : les fichiers arrivent avec un chemin relatif
// commençant par le nom du dossier choisi (`webkitRelativePath`).

export interface FolderSelection {
  /** Préfixe retiré des chemins : « dossier/ » ou « dossier/config/ ». */
  root: string
  /** Fichiers retenus : chemin d'origine → chemin relatif à la configuration. */
  files: Map<string, string>
}

const ignored = (segment: string) => segment.startsWith('.') || segment === 'node_modules'

/** Fichier de configuration lisible : `*.json` ou `*.csv`, hors dossiers cachés et `node_modules/`. */
export const isConfigFile = (path: string) => /\.(json|csv)$/i.test(path) && !path.split('/').some(ignored)

/** Vrai si un modèle existe sous `prefix` : <prefix><modèle>/files.json ou gpu.json. */
export const hasModel = (paths: readonly string[], prefix: string) =>
  paths.some((p) => p.startsWith(prefix) && /^[^/]+\/(files|gpu)\.json$/.test(p.slice(prefix.length)))

/**
 * Retient les `*.json` et `*.csv` hors dossiers cachés et `node_modules/`, et choisit la racine :
 * `config/` si le dossier choisi est un dépôt de configuration, sinon le dossier lui-même.
 */
export function selectFolder(paths: readonly string[]): FolderSelection {
  const kept = paths.filter(isConfigFile)
  const top = kept[0]?.split('/')[0] ?? ''
  const root = hasModel(kept, `${top}/config/`) ? `${top}/config/` : `${top}/`
  const files = new Map<string, string>()
  for (const p of kept) if (p.startsWith(root)) files.set(p, p.slice(root.length))
  return { root, files }
}
