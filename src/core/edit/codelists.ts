// Création et copie de listes de codes (plan 005, R1) : modifications de fichiers à appliquer
// en un seul pas (CSV créé et déclaration dans files.json).
import { isUrl, resolvePath } from '../model/paths'
import type { RandomBytes } from './ids'
import { addCode } from './operations'
import { allFiles, allIds, textOf, type FileChange, type Session } from './session'

/** Liste de codes CSV déclarée et lisible, proposée à la copie. */
export interface CodeListRef {
  model: string
  name: string
  path: string
  title?: string
  columns: string[]
  rows: number
}

/** Listes de codes CSV déclarées et lisibles de la configuration, par modèle puis par nom. */
export function codeLists(session: Session): CodeListRef[] {
  const lists: CodeListRef[] = []
  for (const [model, checked] of session.result.checked) {
    for (const code of checked.document?.codes ?? []) {
      if (isUrl(code.data)) continue
      const path = resolvePath(model, code.data)
      const csv = path && session.result.project.models.get(path.slice(0, path.indexOf('/')))?.csvs.get(path)?.csv
      if (!path || !csv) continue
      lists.push({ model, name: code.name, path, ...(code.title !== undefined && { title: code.title }), columns: csv.header, rows: csv.rows.length })
    }
  }
  const key = (l: CodeListRef) => `${l.model}/${l.name}`
  return lists.sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0))
}

const csvPath = (model: string, name: string) => `${model}/codes/${name}.csv`

/** Raison du refus d'un nouveau nom de liste dans `model`, ou undefined s'il est libre. */
export function checkNewName(session: Session, model: string, name: string): string | undefined {
  if (!/^[A-Za-z0-9_.-]+$/.test(name)) return 'Nom invalide : lettres sans accent, chiffres, « _ », « - » et « . » seulement.'
  const doc = session.result.checked.get(model)?.document
  if (!session.result.project.models.get(model)?.document || !doc) return 'Ce dossier n\'a pas de files.json conforme : la liste ne peut pas y être déclarée.'
  if ((doc.codes ?? []).some((c) => c.name === name)) return `La liste « ${name} » est déjà déclarée dans ce modèle.`
  if (allFiles(session).has(csvPath(model, name))) return `Le fichier codes/${name}.csv existe déjà : déclarez-le avec « Déclarer une liste ».`
  return undefined
}

/** Nom proposé pour une copie : le même vers un autre modèle, <nom>_COPIE dans le même. */
export function defaultCopyName(session: Session, from: CodeListRef, model: string): string {
  if (from.model !== model) return from.name
  const base = `${from.name}_COPIE`
  if (!checkNewName(session, model, base)) return base
  for (let i = 2; ; i++) if (!checkNewName(session, model, `${base}_${i}`)) return `${base}_${i}`
}

/** Copie une liste dans `model` sous `name` : texte courant de la liste, titre d'origine. */
export function copyCodeList(session: Session, from: CodeListRef, model: string, name: string, random?: RandomBytes): FileChange[] {
  const text = textOf(session, from.path)
  const doc = session.result.project.models.get(model)?.document
  if (text === undefined || !doc) return []
  return [
    { path: csvPath(model, name), kind: 'text', text },
    { path: doc.path, kind: 'json', update: (d) => addCode(d, allIds(session), `./codes/${name}.csv`, name, random, from.title ?? name) },
  ]
}
