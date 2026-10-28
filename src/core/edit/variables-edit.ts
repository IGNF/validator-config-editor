// Édition du dictionnaire `variables.json` (feature 010) : variables (nom -> regex) et alias par
// famille. Fonctions pures sur la donnée JSON ; seul le dictionnaire change, les regex des modèles
// restent telles quelles (elles ne contiennent jamais de nom de variable).

type Dictionary = Record<string, unknown> & { variables?: Record<string, string>; aliases?: Record<string, Record<string, string>> }

/** Nom de variable valide : lettres majuscules, chiffres et « _ » (forme <NOM> à la saisie). */
export const isVariableName = (name: string) => /^[A-Z0-9_]+$/.test(name)

/** Refus d'un nom (vide, invalide, déjà pris) ; undefined s'il convient. */
export function checkVariableName(data: unknown, name: string, current?: string): string | undefined {
  if (!isVariableName(name)) return 'Nom de variable : lettres majuscules, chiffres et « _ » seulement.'
  const variables = (data as Dictionary).variables ?? {}
  if (name !== current && name in variables) return `La variable « ${name} » existe déjà.`
  return undefined
}

// Objet `variables` reconstruit dans le même ordre, avec `fn` appliquée à chaque entrée.
function mapVariables(data: Dictionary, fn: (name: string, regex: string) => [string, string][]): Dictionary {
  const entries = Object.entries(data.variables ?? {}).flatMap(([n, r]) => fn(n, r))
  return { ...data, variables: Object.fromEntries(entries) }
}

// Alias réécrits : `fn` renvoie le nouveau nom de variable, ou undefined pour retirer l'alias ;
// une famille sans alias disparaît.
function mapAliases(data: Dictionary, fn: (variable: string) => string | undefined): Dictionary {
  if (data.aliases === undefined) return data
  const aliases = Object.fromEntries(Object.entries(data.aliases).map(([family, names]) => [family, Object.fromEntries(
    Object.entries(names).flatMap(([v, alias]) => { const next = fn(v); return next === undefined ? [] : [[next, alias]] }),
  )]).filter(([, names]) => Object.keys(names as object).length > 0))
  return { ...data, aliases }
}

/** Renomme une variable, à sa place, ses alias compris. */
export function renameVariable(data: unknown, name: string, next: string): unknown {
  const d = mapVariables(data as Dictionary, (n, r) => [[n === name ? next : n, r]])
  return mapAliases(d, (v) => (v === name ? next : v))
}

export function setVariableRegex(data: unknown, name: string, regex: string): unknown {
  return mapVariables(data as Dictionary, (n, r) => [[n, n === name ? regex : r]])
}

/** Ajoute une variable en fin de dictionnaire. */
export function addVariable(data: unknown, name: string, regex: string): unknown {
  const d = data as Dictionary
  return { ...d, variables: { ...(d.variables ?? {}), [name]: regex } }
}

/** Retire une variable et ses alias. */
export function removeVariable(data: unknown, name: string): unknown {
  return mapAliases(mapVariables(data as Dictionary, (n, r) => (n === name ? [] : [[n, r]])), (v) => (v === name ? undefined : v))
}

/** Alias d'une variable pour une famille ; vide : retiré (famille comprise si c'était le dernier). */
export function setAlias(data: unknown, family: string, variable: string, alias: string): unknown {
  const d = data as Dictionary
  const names = { ...(d.aliases?.[family] ?? {}) }
  if (alias) names[variable] = alias
  else delete names[variable]
  const aliases = { ...(d.aliases ?? {}), [family]: names }
  if (!alias && Object.keys(names).length === 0) delete aliases[family]
  return { ...d, aliases }
}

/** Alias à plat, par famille puis variable, pour l'affichage. */
export function aliasRows(data: unknown): { family: string; variable: string; alias: string }[] {
  return Object.entries((data as Dictionary).aliases ?? {}).flatMap(([family, names]) =>
    Object.entries(names).map(([variable, alias]) => ({ family, variable, alias })))
}
