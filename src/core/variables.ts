// Variables d'affichage des regex (feature 010, plan R2) : dictionnaire `variables.json` (nom ->
// regex), partagé avec le GpU. Les configurations ne contiennent que les regex ; les variables
// ne servent qu'à l'affichage.
import type { JsonFile } from './model/types'
import { pointer } from './pointer'
import { problem, type Problem } from './validation/problems'

export const VARIABLES_FILE = 'variables.json'

/** Nom -> regex, regex toutes distinctes. */
export type Variables = ReadonlyMap<string, string>

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Lit le dictionnaire ; inutilisable (undefined) s'il est illisible, mal formé ou ambigu. */
export function readVariables(file: JsonFile): { variables?: Variables; problems: Problem[] } {
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
  return problems.length ? { problems } : { variables: new Map(entries as [string, string][]), problems }
}

/** Forme à variables d'une regex : chaque regex de variable devient <NOM>, la plus longue d'abord. */
export function toVariables(regex: string, variables: Variables): string {
  const sorted = [...variables].sort(([, a], [, b]) => b.length - a.length)
  let out = ''
  for (let i = 0; i < regex.length; ) {
    const found = sorted.find(([, value]) => regex.startsWith(value, i))
    if (found) {
      out += `<${found[0]}>`
      i += found[1].length
    } else out += regex[i++]
  }
  return out
}

/** Regex d'une forme à variables : <NOM> connu remplacé par sa regex, inconnu conservé. */
export function fromVariables(text: string, variables: Variables): string {
  return text.replace(/<([A-Z0-9_]+)>/g, (all, name: string) => variables.get(name) ?? all)
}
