import type { Csv, JsonFile, LoadedModel, Project } from '../model/types'
import { problem, type Problem } from '../validation/problems'
import { parseCsv } from './csv'
import { VARIABLES_FILE } from '../variables'
import type { ConfigFs } from './fs'
import { parseJson } from './json'

export interface LoadResult {
  project: Project
  /** Problèmes de lecture : JSON ou CSV illisible. */
  problems: Problem[]
}

/** Lit une liste de codes : entrée du modèle (CSV absent si illisible) et problèmes de lecture. */
export function readCsv(model: string, path: string, text: string): { entry: { path: string; csv?: Csv }; problems: Problem[] } {
  const r = parseCsv(text)
  if (r.ok) return { entry: { path, csv: r.csv }, problems: [] }
  return { entry: { path }, problems: r.errors.map((e) => problem(e.code, model, path, `/${e.line}`, { line: e.line, ...e.params })) }
}

function emptyModel(name: string): LoadedModel {
  return { name, tables: new Map(), csvs: new Map(), files: [] }
}

/**
 * Charge tous les modèles d'une configuration : un modèle par dossier de premier niveau.
 * À la racine, seul `variables.json` est lu (dictionnaire des variables, feature 010).
 */
export async function loadProject(fs: ConfigFs): Promise<LoadResult> {
  const all = await fs.listFiles()
  const paths = all.filter((p) => p.includes('/')).sort()
  const texts = await Promise.all(paths.map((p) => fs.readText(p)))
  const models = new Map<string, LoadedModel>()
  const problems: Problem[] = []

  paths.forEach((path, i) => {
    const text = texts[i]!
    const name = path.slice(0, path.indexOf('/'))
    const rel = path.slice(name.length + 1)
    let model = models.get(name)
    if (!model) models.set(name, (model = emptyModel(name)))
    model.files.push(path)

    if (path.endsWith('.csv')) {
      const r = readCsv(name, path, text)
      model.csvs.set(path, r.entry)
      problems.push(...r.problems)
      return
    }

    const isTable = rel.startsWith('types/') && rel.endsWith('.json')
    if (rel !== 'files.json' && !isTable) return
    const file: JsonFile = { path }
    const r = parseJson(text)
    if (r.ok) file.data = r.value
    else problems.push(problem('ERR-JSON-SYNTAX', name, path, undefined, { line: r.line, column: r.column, detail: r.detail }))
    if (rel === 'files.json') model.document = file
    else model.tables.set(path, file)
  })

  const project: Project = { models }
  if (all.includes(VARIABLES_FILE)) {
    const r = parseJson(await fs.readText(VARIABLES_FILE))
    project.variables = r.ok ? { path: VARIABLES_FILE, data: r.value } : { path: VARIABLES_FILE }
  }
  return { project, problems }
}
