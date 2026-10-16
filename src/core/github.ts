// Ouverture d'une configuration publiée sur GitHub (feature 003) : fonctions pures.
import { hasModel, isConfigFile } from './load/folder'

export interface RepoUrl {
  owner: string
  repo: string
  /** Ce qui suit `/tree/` : branche, puis éventuellement un dossier. */
  rest?: string
}

const NAME = '[A-Za-z0-9_.-]+'

/** Analyse `https://github.com/<org>/<dépôt>[.git][/tree/<branche>[/<dossier>]]` ou `<org>/<dépôt>`. */
export function parseRepoUrl(input: string): RepoUrl | undefined {
  const text = input.trim().replace(/\/+$/, '')
  const full = new RegExp(`^(?:https?://)?(?:www\\.)?github\\.com/(${NAME})/(${NAME})(?:/tree/(.+))?$`).exec(text)
  const m = full ?? new RegExp(`^(${NAME})/(${NAME})$`).exec(text)
  if (!m) return undefined
  const repo = m[2]!.replace(/\.git$/, '')
  return { owner: m[1]!, repo, ...(m[3] && { rest: m[3].split('/').map(decodeURIComponent).join('/') }) }
}

/**
 * Sépare branche et dossier dans « <branche>/<dossier> » : plus long préfixe qui est une branche
 * existante (les branches peuvent contenir « / ») ; sans liste, le premier segment.
 */
export function splitRef(rest: string, branches?: readonly string[]): { branch: string; path?: string } {
  const segments = rest.split('/')
  for (let i = segments.length; branches && i > 0; i--) {
    const candidate = segments.slice(0, i).join('/')
    if (branches.includes(candidate)) {
      const path = segments.slice(i).join('/')
      return path ? { branch: candidate, path } : { branch: candidate }
    }
  }
  const path = segments.slice(1).join('/')
  return path ? { branch: segments[0]!, path } : { branch: segments[0]! }
}

/**
 * Dossier de configuration d'un dépôt (plan 003, R3) : le dossier demandé, sinon `config/` s'il
 * contient un modèle, sinon la racine. Renvoie les fichiers retenus (chemin dans le dépôt →
 * chemin dans la configuration).
 */
export function selectRepoRoot(paths: readonly string[], requested?: string): { root: string; files: Map<string, string> } {
  const kept = paths.filter(isConfigFile)
  const asked = requested?.replace(/^\/+|\/+$/g, '')
  const root = asked ? `${asked}/` : hasModel(kept, 'config/') ? 'config/' : ''
  const files = new Map<string, string>()
  for (const p of kept) if (p.startsWith(root)) files.set(p, p.slice(root.length))
  return { root, files }
}

export interface KnownConfig {
  owner: string
  repo: string
  /** Branche de référence ; absente : branche par défaut du dépôt. */
  branch?: string
  description: string
}

/** Configurations IGNF/validator connues (plan 003, R6). */
export const KNOWN_CONFIGS: readonly KnownConfig[] = [
  { owner: 'IGNF', repo: 'validator-config-gpu', branch: 'json-source', description: 'Standards CNIG du Géoportail de l\'Urbanisme (PLU, CC, PSMV, SCoT, SUP…)' },
  { owner: 'IGNF', repo: 'validator-config-dgpr', description: 'Directive inondation, COVADIS, canalisations' },
  { owner: 'IGNF', repo: 'validator-config-naviforest', description: 'Dessertes forestières (SNDD)' },
  { owner: 'IGNF', repo: 'validator-config-ppr', description: 'Plans de prévention des risques (PPR)' },
]
