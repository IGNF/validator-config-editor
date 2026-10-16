// Session d'édition (plan 002, R2, R5) : configuration chargée, données modifiées, historique et
// résultat de validation. Toutes les fonctions sont pures.
import { loadProject, type LoadResult } from '../load/project'
import { detectStyle, isReproducible, serialize } from '../serialize'
import { checkLoaded, withData, type CheckResult } from '../validation/validate'
import type { ConfigFs } from '../load/fs'
import { emptyHistory, record, redo, undo, type History } from './history'

export interface Session {
  /** Textes d'origine, par chemin. */
  originals: ReadonlyMap<string, string>
  loaded: LoadResult
  /** Donnée courante des fichiers JSON modifiés. */
  edited: ReadonlyMap<string, unknown>
  history: History
  result: CheckResult
}

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
  return { originals, loaded, edited: new Map(), history: emptyHistory(), result: checkLoaded(loaded) }
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

// Vrai si `data` redonne exactement le fichier d'origine (même donnée, ou même texte une fois
// sérialisé : ex. colonne ajoutée puis supprimée).
function isOriginal(session: Session, path: string, data: unknown): boolean {
  if (data === originalData(session, path)) return true
  const original = session.originals.get(path)
  return original !== undefined && serialize(data, detectStyle(original)) === original
}

// Remplace la donnée d'un fichier ; revenir à l'état d'origine annule la modification.
function withFile(session: Session, path: string, data: unknown, history: History): Session {
  const edited = new Map(session.edited)
  if (isOriginal(session, path, data)) edited.delete(path)
  else edited.set(path, data)
  let project = session.loaded.project
  for (const [p, d] of edited) project = withData(project, p, d)
  return { ...session, edited, history, result: checkLoaded({ project, problems: session.loaded.problems }) }
}

/** Applique une édition pure à la donnée du fichier `path`. */
export function edit<T = unknown>(session: Session, path: string, update: (data: T) => unknown, key?: string, now = Date.now()): Session {
  const before = dataOf(session, path)
  if (before === undefined) throw new Error(`Fichier non éditable : ${path}`)
  const after = update(before as T)
  if (after === before) return session
  return withFile(session, path, after, record(session.history, { path, before, after, at: now, ...(key !== undefined && { key }) }))
}

export function undoEdit(session: Session): Session {
  const u = undo(session.history)
  return u ? withFile(session, u.step.path, u.step.before, u.history) : session
}

export function redoEdit(session: Session): Session {
  const r = redo(session.history)
  return r ? withFile(session, r.step.path, r.step.after, r.history) : session
}

/** Texte courant d'un fichier : d'origine s'il n'est pas modifié, sinon sérialisé dans son style. */
export function textOf(session: Session, path: string): string | undefined {
  const original = session.originals.get(path)
  if (!session.edited.has(path) || original === undefined) return original
  return serialize(session.edited.get(path), detectStyle(original))
}

/** Fichiers modifiés et leur nouveau texte. */
export function changedFiles(session: Session): Map<string, string> {
  return new Map([...session.edited.keys()].map((p) => [p, textOf(session, p)!]))
}

/** Fichiers modifiés qui seront réindentés (mise en forme d'origine non reproductible). */
export function reformatted(session: Session): string[] {
  return [...session.edited.keys()].filter((p) => !isReproducible(session.originals.get(p) ?? ''))
}

/** Tous les fichiers, avec leur texte courant (téléchargement ZIP). */
export function allFiles(session: Session): Map<string, string> {
  return new Map([...session.originals.keys()].map((p) => [p, textOf(session, p)!]))
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
