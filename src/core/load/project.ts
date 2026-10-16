import type { JsonFile, LoadedModel, Project } from '../model/types'
import { problem, type Problem } from '../validation/problems'
import { parseCsv } from './csv'
import type { ConfigFs } from './fs'
import { parseJson } from './json'

export interface LoadResult {
  project: Project
  /** Problèmes de lecture : JSON ou CSV illisible. */
  problems: Problem[]
}

function emptyModel(name: string): LoadedModel {
  return { name, tables: new Map(), csvs: new Map(), files: [] }
}

/**
 * Charge tous les modèles d'une configuration : un modèle par dossier de premier niveau.
 * Les fichiers situés directement à la racine sont ignorés.
 */
export async function loadProject(fs: ConfigFs): Promise<LoadResult> {
  const paths = (await fs.listFiles()).filter((p) => p.includes('/')).sort()
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
      const r = parseCsv(text)
      if (r.ok) model.csvs.set(path, { path, csv: r.csv })
      else {
        model.csvs.set(path, { path })
        problems.push(problem(r.code, name, path, `/${r.line}`, { line: r.line, ...r.params }))
      }
      return
    }

    const isTable = rel.startsWith('types/') && rel.endsWith('.json')
    if (rel !== 'files.json' && rel !== 'gpu.json' && !isTable) return
    const file: JsonFile = { path }
    const r = parseJson(text)
    if (r.ok) file.data = r.value
    else problems.push(problem('ERR-JSON-SYNTAX', name, path, undefined, { line: r.line, column: r.column, detail: r.detail }))
    if (rel === 'files.json') model.document = file
    else if (rel === 'gpu.json') model.gpu = file
    else model.tables.set(path, file)
  })

  return { project: { models }, problems }
}
