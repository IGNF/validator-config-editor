// Création et copie de listes de codes (plan 005, R1) : modifications de fichiers à appliquer
// en un seul pas (CSV créé et déclaration dans files.json).
import { isUrl, listNameOf, resolvePath } from '../model/paths'
import { parseForeignKey, rewriteForeignKey } from '../validation/foreign-key'
import type { RandomBytes } from './ids'
import { addCode } from './operations'
import { setAt } from './pointer'
import { allFiles, allIds, dataOf, textOf, type FileChange, type Session } from './session'

export { listNameOf }

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

/** Raison du refus des colonnes d'une nouvelle liste, ou undefined si elles conviennent. */
export function checkColumns(columns: readonly string[]): string | undefined {
  if (columns.length === 0) return 'Indiquez au moins une colonne.'
  if (columns.some((c) => c === '')) return 'Nom de colonne vide.'
  if (columns.some((c) => /[,"]/.test(c))) return 'Un nom de colonne ne peut contenir ni virgule ni guillemet.'
  const twice = columns.find((c, i) => columns.indexOf(c) !== i)
  if (twice) return `Colonne « ${twice} » en double.`
  return undefined
}

/** Crée une liste vide dans `model` : CSV réduit à l'en-tête, déclaré sous `name`. */
export function createCodeList(session: Session, model: string, name: string, columns: readonly string[], random?: RandomBytes): FileChange[] {
  const doc = session.result.project.models.get(model)?.document
  if (!doc) return []
  return [
    { path: csvPath(model, name), kind: 'text', text: `${columns.join(',')}\n` },
    { path: doc.path, kind: 'json', update: (d) => addCode(d, allIds(session), `./codes/${name}.csv`, name, random) },
  ]
}

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/**
 * Déclaration `index` de `model` pointée vers `data`, nommée comme son fichier (feature 012, R5) :
 * `data`, `name`, `title` s'il suivait l'ancien nom, et clés étrangères des tables du modèle vers
 * l'ancien nom, en un seul pas. Refusé si le nouveau nom est déjà déclaré dans le modèle.
 */
export function renameCodeList(session: Session, model: string, index: number, data: string): { changes: FileChange[]; refusal?: string } {
  const path = `${model}/files.json`
  const doc = dataOf(session, path)
  const codes = isObject(doc) && Array.isArray(doc.codes) ? (doc.codes as Record<string, unknown>[]) : []
  const code = codes[index]
  if (!code) return { changes: [] }
  const before = typeof code.name === 'string' ? code.name : ''
  const name = listNameOf(data)
  if (name !== before && codes.some((c, i) => i !== index && c.name === name)) return { changes: [], refusal: `La liste « ${name} » est déjà déclarée dans ce modèle.` }
  const changes: FileChange[] = [{
    path,
    kind: 'json',
    update: (d) => {
      let out = setAt(setAt(d, `/codes/${index}/data`, data), `/codes/${index}/name`, name)
      if (code.title === before && before !== name) out = setAt(out, `/codes/${index}/title`, name)
      return out
    },
  }]
  if (before && before !== name) {
    for (const table of session.result.project.models.get(model)?.tables.keys() ?? []) {
      const t = dataOf(session, table)
      const fks = isObject(t) && isObject(t.constraints) && Array.isArray(t.constraints.foreignKeys) ? (t.constraints.foreignKeys as unknown[]) : []
      const targets = fks.map((fk, i) => (typeof fk === 'string' && parseForeignKey(fk)?.target === before ? i : -1)).filter((i) => i >= 0)
      if (targets.length) {
        changes.push({
          path: table,
          kind: 'json',
          update: (d) => targets.reduce((acc, i) => setAt(acc, `/constraints/foreignKeys/${i}`, rewriteForeignKey(fks[i] as string, 'list', before, name)), d),
        })
      }
    }
  }
  return { changes }
}
