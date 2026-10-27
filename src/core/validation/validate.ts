import type { ConfigFs } from '../load/fs'
import { loadProject, type LoadResult } from '../load/project'
import type { DocumentModel, JsonFile, LoadedModel, Project, TableModel } from '../model/types'
import { validateDocument, validateTable, type SchemaValidator } from '../schemas/generated/validate.js'
import { compareProblems, countProblems, type Problem } from './problems'
import { crossReferences, type CheckedModel } from './refs'
import { schemaProblems } from './schema'
import { readVariables } from '../variables'
import { gpuImportProblems } from './gpu-import'

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
    checked.set(model.name, c)
  }

  // Configuration GpU (variables.json présent) : règles de l'import (010, R3-R4).
  const gpu = project.variables !== undefined
  problems.push(...crossReferences(project, checked))
  if (gpu) problems.push(...readVariables(project.variables!).problems, ...gpuImportProblems(checked))
  return { checked, problems }
}

export interface CheckResult {
  project: Project
  checked: Map<string, CheckedModel>
  problems: Problem[]
}

/** Valide une configuration déjà chargée ; problèmes triés (contrat problem-codes). */
export function checkLoaded(loaded: LoadResult): CheckResult {
  const { checked, problems } = validateProject(loaded.project)
  return { project: loaded.project, checked, problems: [...loaded.problems, ...problems].sort(compareProblems) }
}

/** Charge et valide une configuration. */
export async function checkConfig(fs: ConfigFs): Promise<CheckResult> {
  return checkLoaded(await loadProject(fs))
}

/**
 * Configuration dont le fichier JSON `path` a pour donnée `data` (édition, plan 002 R2) : seuls
 * le modèle et le fichier concernés sont recopiés, rien n'est relu.
 */
export function withData(project: Project, path: string, data: unknown): Project {
  const name = path.slice(0, path.indexOf('/'))
  const model = project.models.get(name)
  if (!model) throw new Error(`Modèle inconnu : ${name}`)
  const file = { path, data }
  const copy: LoadedModel = { ...model }
  if (model.document?.path === path) copy.document = file
  else if (model.tables.has(path)) copy.tables = new Map(model.tables).set(path, file)
  else throw new Error(`Fichier JSON inconnu : ${path}`)
  return { ...project, models: new Map(project.models).set(name, copy) }
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
