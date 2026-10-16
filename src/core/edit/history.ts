// Annuler / rétablir par pas (plan 002, R5) : chaque pas garde la donnée d'un seul fichier,
// avant et après. Les données sont immuables : aucune copie n'est nécessaire.

export interface Step {
  path: string
  before: unknown
  after: unknown
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
  if (last && step.key !== undefined && last.key === step.key && last.path === step.path && step.at - last.at < MERGE_DELAY) {
    return { past: [...history.past.slice(0, -1), { ...last, after: step.after, at: step.at }], future: [] }
  }
  return { past: [...history.past, step].slice(-limit), future: [] }
}

/** Pas à défaire (appliquer `before` à `path`), et historique résultant. */
export function undo(history: History): { step: Step; history: History } | undefined {
  const step = history.past.at(-1)
  if (!step) return undefined
  return { step, history: { past: history.past.slice(0, -1), future: [...history.future, step] } }
}

/** Pas à refaire (appliquer `after` à `path`), et historique résultant. */
export function redo(history: History): { step: Step; history: History } | undefined {
  const step = history.future.at(-1)
  if (!step) return undefined
  return { step, history: { past: [...history.past, step], future: history.future.slice(0, -1) } }
}
