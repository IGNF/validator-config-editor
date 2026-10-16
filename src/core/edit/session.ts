// Session d'édition (plan 002 R2, R5 ; plan 004 R2) : configuration chargée, modifications
// (données JSON, textes CSV, fichiers créés), historique et résultat de validation. Toutes les
// fonctions sont pures.
import { loadProject, readCsv, type LoadResult } from '../load/project'
import type { ConfigFs } from '../load/fs'
import type { Project } from '../model/types'
import { detectStyle, isReproducible, serialize } from '../serialize'
import type { Problem } from '../validation/problems'
import { checkLoaded, withData, type CheckResult } from '../validation/validate'
import { emptyHistory, record, redo, undo, type Change, type History } from './history'

export interface Session {
  /** Textes d'origine, par chemin. */
  originals: ReadonlyMap<string, string>
  loaded: LoadResult
  /** Donnée courante des fichiers JSON modifiés. */
  edited: ReadonlyMap<string, unknown>
  /** Texte courant des fichiers texte modifiés (CSV) ou créés. */
  texts: ReadonlyMap<string, string>
  history: History
  result: CheckResult
}

/** Modification demandée d'un fichier : édition pure d'une donnée JSON, ou nouveau texte. */
export type FileChange =
  | { path: string; kind: 'json'; update: (data: unknown) => unknown }
  | { path: string; kind: 'text'; text: string }

class MapFs implements ConfigFs {
  constructor(private readonly files: ReadonlyMap<string, string>) {}
  async listFiles() {
    return [...this.files.keys()]
  }
  async readText(path: string) {
    return this.files.get(path)!
  }
}

/** Ouvre une session sur les fichiers `*.json` et `*.csv` d'une configuration. */
export async function openSession(files: ReadonlyMap<string, string>): Promise<Session> {
  const originals = new Map([...files].filter(([p]) => /\.(json|csv)$/.test(p)))
  const loaded = await loadProject(new MapFs(originals))
  return { originals, loaded, edited: new Map(), texts: new Map(), history: emptyHistory(), result: checkLoaded(loaded) }
}

function originalData(session: Session, path: string): unknown {
  const model = session.loaded.project.models.get(path.slice(0, path.indexOf('/')))
  const file = model?.document?.path === path ? model.document : model?.gpu?.path === path ? model.gpu : model?.tables.get(path)
  return file?.data
}

/** Donnée courante d'un fichier JSON (modifiée ou d'origine). */
export function dataOf(session: Session, path: string): unknown {
  return session.edited.has(path) ? session.edited.get(path) : originalData(session, path)
}

/** Texte courant d'un fichier : modifié, sérialisé dans son style, ou d'origine ; undefined si absent. */
export function textOf(session: Session, path: string): string | undefined {
  if (session.texts.has(path)) return session.texts.get(path)
  const original = session.originals.get(path)
  if (!session.edited.has(path) || original === undefined) return original
  return serialize(session.edited.get(path), detectStyle(original))
}

// Remplace (ou ajoute) le texte d'une liste de codes dans le projet.
function withText(project: Project, path: string, text: string): { project: Project; problems: Problem[] } {
  const name = path.slice(0, path.indexOf('/'))
  const model = project.models.get(name)
  if (!model) throw new Error(`Modèle inconnu : ${name}`)
  if (!path.endsWith('.csv')) throw new Error(`Seules les listes de codes sont modifiables en texte : ${path}`)
  const r = readCsv(name, path, text)
  const files = model.files.includes(path) ? model.files : [...model.files, path].sort()
  return { project: { models: new Map(project.models).set(name, { ...model, csvs: new Map(model.csvs).set(path, r.entry), files }) }, problems: r.problems }
}

// Session avec ces modifications : les fichiers revenus à l'état d'origine ne sont plus modifiés.
function rebuild(session: Session, edited: Map<string, unknown>, texts: Map<string, string>, history: History): Session {
  for (const [path, data] of edited) {
    const original = session.originals.get(path)
    if (data === originalData(session, path) || (original !== undefined && serialize(data, detectStyle(original)) === original)) edited.delete(path)
  }
  for (const [path, text] of texts) if (text === session.originals.get(path)) texts.delete(path)
  let project = session.loaded.project
  let problems = session.loaded.problems.filter((p) => !texts.has(p.file))
  for (const [path, data] of edited) project = withData(project, path, data)
  // Le projet repart de l'état chargé : il suffit d'y appliquer les textes courants.
  for (const [path, text] of texts) {
    const r = withText(project, path, text)
    project = r.project
    problems = [...problems, ...r.problems]
  }
  return { ...session, edited, texts, history, result: checkLoaded({ project, problems }) }
}

// Applique l'état `after` (ou `before`) de chaque modification.
function applyStates(session: Session, changes: readonly Change[], side: 'before' | 'after', history: History): Session {
  const edited = new Map(session.edited)
  const texts = new Map(session.texts)
  for (const c of changes) {
    const value = c[side]
    if (c.kind === 'json') edited.set(c.path, value)
    else if (value === undefined) texts.delete(c.path)
    else texts.set(c.path, value as string)
  }
  return rebuild(session, edited, texts, history)
}

/**
 * Applique des modifications de fichiers en un seul pas d'historique (correction, éventuellement
 * sur plusieurs fichiers). `key` fusionne les saisies successives d'un même champ.
 */
export function applyChanges(session: Session, requested: readonly FileChange[], key?: string, now = Date.now()): Session {
  const changes: Change[] = []
  const current = new Map<string, unknown>()
  for (const r of requested) {
    if (r.kind === 'json') {
      const before = current.has(r.path) ? current.get(r.path) : dataOf(session, r.path)
      if (before === undefined) throw new Error(`Fichier non éditable : ${r.path}`)
      const after = r.update(before)
      current.set(r.path, after)
      const existing = changes.find((c) => c.path === r.path)
      if (existing) existing.after = after
      else changes.push({ path: r.path, kind: 'json', before, after })
    } else {
      changes.push({ path: r.path, kind: 'text', before: textOf(session, r.path), after: r.text })
    }
  }
  const effective = changes.filter((c) => c.before !== c.after)
  if (effective.length === 0) return session
  return applyStates(session, effective, 'after', record(session.history, { changes: effective, at: now, ...(key !== undefined && { key }) }))
}

/** Applique une édition pure à la donnée du fichier JSON `path`. */
export function edit<T = unknown>(session: Session, path: string, update: (data: T) => unknown, key?: string, now = Date.now()): Session {
  return applyChanges(session, [{ path, kind: 'json', update: update as (data: unknown) => unknown }], key, now)
}

export function undoEdit(session: Session): Session {
  const u = undo(session.history)
  return u ? applyStates(session, [...u.step.changes].reverse(), 'before', u.history) : session
}

export function redoEdit(session: Session): Session {
  const r = redo(session.history)
  return r ? applyStates(session, r.step.changes, 'after', r.history) : session
}

/** Vrai si le fichier est modifié ou créé. */
export const isChanged = (session: Session, path: string) => session.edited.has(path) || session.texts.has(path)

/** Fichiers modifiés ou créés, et leur nouveau texte. */
export function changedFiles(session: Session): Map<string, string> {
  return new Map([...session.edited.keys(), ...session.texts.keys()].map((p) => [p, textOf(session, p)!]))
}

/** Fichiers créés (absents à l'ouverture). */
export const createdFiles = (session: Session) => [...session.texts.keys()].filter((p) => !session.originals.has(p))

/** Fichiers modifiés qui seront réindentés (mise en forme d'origine non reproductible). */
export function reformatted(session: Session): string[] {
  return [...session.edited.keys()].filter((p) => !isReproducible(session.originals.get(p) ?? ''))
}

/** Tous les fichiers, avec leur texte courant (téléchargement ZIP), créations comprises. */
export function allFiles(session: Session): Map<string, string> {
  const paths = new Set([...session.originals.keys(), ...session.texts.keys()])
  return new Map([...paths].sort().map((p) => [p, textOf(session, p)!]))
}

function collectIds(data: unknown, into: Set<string>): void {
  if (Array.isArray(data)) for (const v of data) collectIds(v, into)
  else if (data !== null && typeof data === 'object') {
    for (const [k, v] of Object.entries(data)) {
      if (k === 'id' && typeof v === 'string') into.add(v)
      else collectIds(v, into)
    }
  }
}

/** Tous les `id` de la configuration courante (pour en créer de nouveaux, uniques). */
export function allIds(session: Session): Set<string> {
  const ids = new Set<string>()
  for (const model of session.result.project.models.values()) {
    collectIds(model.document?.data, ids)
    collectIds(model.gpu?.data, ids)
    for (const t of model.tables.values()) collectIds(t.data, ids)
  }
  return ids
}
