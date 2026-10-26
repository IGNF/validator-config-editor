// Variables d'affichage des regex (feature 010, plan R2) : dictionnaire `variables.json` (nom ->
// regex), partagé avec le GpU. Les configurations ne contiennent que les regex ; les variables
// ne servent qu'à l'affichage.
import type { JsonFile } from './model/types'
import { pointer } from './pointer'
import { problem, type Problem } from './validation/problems'

export const VARIABLES_FILE = 'variables.json'

/** Nom -> regex, regex toutes distinctes. */
export type Variables = ReadonlyMap<string, string>
/** Famille de modèles (préfixe du nom) -> (variable -> nom affiché), ex. cnig_SUP : DIGIT_9 -> IDGEST. */
export type Aliases = ReadonlyMap<string, ReadonlyMap<string, string>>

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Lit le dictionnaire ; inutilisable (undefined) s'il est illisible, mal formé ou ambigu. */
export function readVariables(file: JsonFile): { variables?: Variables; aliases?: Aliases; problems: Problem[] } {
  const entries = isObject(file.data) && isObject(file.data.variables) ? Object.entries(file.data.variables) : undefined
  if (!entries || entries.length === 0 || entries.some(([, v]) => typeof v !== 'string' || v === '')) {
    return { problems: [problem('ERR-VARIABLES-FORMAT', null, file.path, undefined)] }
  }
  const byRegex = new Map<string, string>()
  const problems: Problem[] = []
  for (const [name, regex] of entries as [string, string][]) {
    const other = byRegex.get(regex)
    if (other !== undefined) problems.push(problem('ERR-VARIABLES-DUPLICATE', null, file.path, pointer('variables', name), { name, other }))
    else byRegex.set(regex, name)
  }
  if (problems.length) return { problems }
  const variables = new Map(entries as [string, string][])
  // Alias facultatifs : objet famille -> (variable connue -> nom affiché).
  const raw = isObject(file.data) ? file.data.aliases : undefined
  const aliases = new Map<string, Map<string, string>>()
  if (raw !== undefined) {
    const ok = isObject(raw) && Object.values(raw).every((names) => isObject(names) && Object.entries(names).every(([v, alias]) => variables.has(v) && typeof alias === 'string' && alias !== ''))
    if (!ok) return { problems: [problem('ERR-VARIABLES-FORMAT', null, file.path, '/aliases')] }
    for (const [family, names] of Object.entries(raw as Record<string, Record<string, string>>)) aliases.set(family, new Map(Object.entries(names)))
  }
  return { variables, aliases, problems }
}

/** Noms affichés pour un modèle : alias de la famille la plus précise dont le nom du modèle commence par `famille_`. */
export function namesFor(aliases: Aliases | undefined, model: string | undefined): ReadonlyMap<string, string> {
  let best = ''
  for (const family of aliases?.keys() ?? []) {
    if ((model === family || model?.startsWith(`${family}_`)) && family.length > best.length) best = family
  }
  return aliases?.get(best) ?? new Map()
}

/** Forme à variables d'une regex : chaque regex de variable devient <NOM> (ou son alias), la plus longue d'abord. */
export function toVariables(regex: string, variables: Variables, names: ReadonlyMap<string, string> = new Map()): string {
  const sorted = [...variables].sort(([, a], [, b]) => b.length - a.length)
  let out = ''
  for (let i = 0; i < regex.length; ) {
    const found = sorted.find(([, value]) => regex.startsWith(value, i))
    if (found) {
      out += `<${names.get(found[0]) ?? found[0]}>`
      i += found[1].length
    } else out += regex[i++]
  }
  return out
}

/** Regex d'une forme à variables : <NOM> connu (ou alias) remplacé par sa regex, inconnu conservé. */
export function fromVariables(text: string, variables: Variables, names: ReadonlyMap<string, string> = new Map()): string {
  const byAlias = new Map([...names].map(([variable, alias]) => [alias, variable]))
  return text.replace(/<([A-Z0-9_]+)>/g, (all, name: string) => variables.get(byAlias.get(name) ?? name) ?? all)
}
