// Annuler / rétablir par pas (plan 002 R5, 004 R2). Un pas regroupe les modifications d'un ou
// plusieurs fichiers (correction groupée, liste copiée et déclarée). Les données sont
// immuables : aucune copie n'est nécessaire.

/** Modification d'un fichier : donnée JSON, ou texte (`undefined` : fichier absent). */
export interface Change {
  path: string
  kind: 'json' | 'text'
  before: unknown
  after: unknown
}

export interface Step {
  changes: Change[]
  /** Champ modifié : deux saisies successives d'un même champ en moins d'1 s sont fusionnées. */
  key?: string
  at: number
}

export interface History {
  past: Step[]
  future: Step[]
}

export const MERGE_DELAY = 1000

export const emptyHistory = (): History => ({ past: [], future: [] })

export function record(history: History, step: Step, limit = 100): History {
  const last = history.past.at(-1)
  const [previous] = last?.changes ?? []
  const [current] = step.changes
  if (
    last && previous && current && last.changes.length === 1 && step.changes.length === 1 &&
    step.key !== undefined && last.key === step.key && previous.path === current.path && step.at - last.at < MERGE_DELAY
  ) {
    return { past: [...history.past.slice(0, -1), { ...last, changes: [{ ...previous, after: current.after }], at: step.at }], future: [] }
  }
  return { past: [...history.past, step].slice(-limit), future: [] }
}

/** Pas à défaire (appliquer les `before`), et historique résultant. */
export function undo(history: History): { step: Step; history: History } | undefined {
  const step = history.past.at(-1)
  if (!step) return undefined
  return { step, history: { past: history.past.slice(0, -1), future: [...history.future, step] } }
}

/** Pas à refaire (appliquer les `after`), et historique résultant. */
export function redo(history: History): { step: Step; history: History } | undefined {
  const step = history.future.at(-1)
  if (!step) return undefined
  return { step, history: { past: [...history.past, step], future: history.future.slice(0, -1) } }
}
