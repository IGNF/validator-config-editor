import { comparePointers } from '../pointer'
import { CATALOG, type ProblemCode } from './messages'

export type Severity = 'error' | 'warning'

export interface Problem {
  code: ProblemCode
  severity: Severity
  /** Nom du dossier du modèle, null si global. */
  model: string | null
  /** Chemin relatif à la configuration. */
  file: string
  /** Pointeur JSON dans le fichier, ou '/<ligne>' pour un CSV. */
  pointer?: string
  message: string
}

export type Params = Record<string, string | number>

export function problem(code: ProblemCode, model: string | null, file: string, pointer: string | undefined, params: Params = {}): Problem {
  const entry = CATALOG[code]
  const p: Problem = { code, severity: entry.severity, model, file, message: entry.message(params) }
  if (pointer !== undefined) p.pointer = pointer
  return p
}

export function compareProblems(a: Problem, b: Problem): number {
  return (
    (a.model ?? '').localeCompare(b.model ?? '') ||
    a.file.localeCompare(b.file) ||
    comparePointers(a.pointer ?? '', b.pointer ?? '') ||
    a.code.localeCompare(b.code)
  )
}

export interface ProblemCounts {
  errors: number
  warnings: number
}

export function countProblems(problems: readonly Problem[]): ProblemCounts {
  let errors = 0
  for (const p of problems) if (p.severity === 'error') errors++
  return { errors, warnings: problems.length - errors }
}

export interface ProblemFilter {
  severity?: Severity
  code?: string
  model?: string
}

export function filterProblems(problems: readonly Problem[], filter: ProblemFilter): Problem[] {
  return problems.filter(
    (p) =>
      (!filter.severity || p.severity === filter.severity) &&
      (!filter.code || p.code === filter.code) &&
      (filter.model === undefined || p.model === filter.model),
  )
}

/** Problèmes groupés par modèle (null → ''), avec leurs nombres d'erreurs et d'avertissements. */
export function countByModel(problems: readonly Problem[]): Map<string, ProblemCounts> {
  const counts = new Map<string, ProblemCounts>()
  for (const p of problems) {
    const c = counts.get(p.model ?? '') ?? { errors: 0, warnings: 0 }
    if (p.severity === 'error') c.errors++
    else c.warnings++
    counts.set(p.model ?? '', c)
  }
  return counts
}

/** Plus long préfixe de `pointer` parmi `candidates` (segment par segment), ou undefined. */
export function closestPointer(pointer: string, candidates: Iterable<string>): string | undefined {
  let best: string | undefined
  for (const c of candidates) {
    const isPrefix = c === '' || pointer === c || pointer.startsWith(c + '/')
    if (isPrefix && (best === undefined || c.length > best.length)) best = c
  }
  return best
}
