import type { ConfigFs } from '../load/fs'
import { loadProject } from '../load/project'
import type { DocumentModel, GpuFile, JsonFile, Project, TableModel } from '../model/types'
import { validateDocument, validateGpu, validateTable, type SchemaValidator } from '../schemas/generated/validate.js'
import { compareProblems, countProblems, type Problem } from './problems'
import { crossReferences, type CheckedModel } from './refs'
import { schemaProblems } from './schema'

/** Valide une configuration chargée : schémas puis références croisées. */
export function validateProject(project: Project): { checked: Map<string, CheckedModel>; problems: Problem[] } {
  const problems: Problem[] = []
  const checked = new Map<string, CheckedModel>()

  // Renvoie la donnée typée si le fichier est lisible et conforme à son schéma.
  const check = <T>(file: JsonFile | undefined, validate: SchemaValidator, model: string): T | undefined => {
    if (!file || file.data === undefined) return undefined
    const found = schemaProblems(validate, file.data, model, file.path)
    problems.push(...found)
    return found.length === 0 ? (file.data as T) : undefined
  }

  for (const model of project.models.values()) {
    const c: CheckedModel = { model, tables: new Map() }
    const document = check<DocumentModel>(model.document, validateDocument, model.name)
    if (document) c.document = document
    for (const [path, file] of model.tables) {
      const table = check<TableModel>(file, validateTable, model.name)
      if (table) c.tables.set(path, table)
    }
    const gpu = check<GpuFile>(model.gpu, validateGpu, model.name)
    if (gpu) c.gpu = gpu
    checked.set(model.name, c)
  }

  problems.push(...crossReferences(project, checked))
  return { checked, problems }
}

export interface CheckResult {
  project: Project
  checked: Map<string, CheckedModel>
  problems: Problem[]
}

/** Charge et valide une configuration ; problèmes triés (contrat problem-codes). */
export async function checkConfig(fs: ConfigFs): Promise<CheckResult> {
  const loaded = await loadProject(fs)
  const { checked, problems } = validateProject(loaded.project)
  return { project: loaded.project, checked, problems: [...loaded.problems, ...problems].sort(compareProblems) }
}

export interface Summary {
  models: number
  tables: number
  codeLists: number
  errors: number
  warnings: number
}

export function summarize(project: Project, problems: readonly Problem[]): Summary {
  let tables = 0
  let codeLists = 0
  for (const m of project.models.values()) {
    tables += m.tables.size
    codeLists += m.csvs.size
  }
  return { models: project.models.size, tables, codeLists, ...countProblems(problems) }
}
