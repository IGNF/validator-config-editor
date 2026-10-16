import { stat } from 'node:fs/promises'
import { countProblems, type Problem } from '@core/validation/problems'
import { checkConfig, summarize } from '@core/validation/validate'
import { NodeConfigFs } from './fs'

export interface CheckOptions {
  format: 'text' | 'json'
  strict: boolean
}

export interface Output {
  log: (line: string) => void
  error: (line: string) => void
}

const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`

export function formatProblem(p: Problem): string {
  return `${p.file}${p.pointer !== undefined ? ':' + p.pointer : ''} ${p.code} ${p.message}`
}

/** `vce check` (contrat cli.md) ; renvoie le code de sortie. */
export async function runCheck(dir: string, options: CheckOptions, out: Output): Promise<number> {
  const isDir = await stat(dir).then((s) => s.isDirectory(), () => false)
  if (!isDir) {
    out.error(`Dossier introuvable : ${dir}`)
    return 2
  }
  const fs = await NodeConfigFs.open(dir)
  const result = await checkConfig(fs)
  if (result.project.models.size === 0) {
    out.error(`Aucun modèle dans ${fs.root} : indiquer le dossier qui contient les modèles (ex. config/).`)
    return 2
  }
  const summary = summarize(result.project, result.problems)
  if (options.format === 'json') {
    out.log(JSON.stringify({ root: fs.root, summary, problems: result.problems }, null, 2))
  } else {
    for (const p of result.problems) out.log(formatProblem(p))
    if (result.problems.length > 0) out.log('')
    out.log(
      `${plural(summary.models, 'modèle')}, ${plural(summary.tables, 'table')}, ${summary.codeLists} liste${summary.codeLists > 1 ? 's' : ''} de codes` +
        ` — ${plural(summary.errors, 'erreur')}, ${plural(summary.warnings, 'avertissement')}`,
    )
  }
  const { errors, warnings } = countProblems(result.problems)
  return errors > 0 || (options.strict && warnings > 0) ? 1 : 0
}
