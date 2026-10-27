// Corrections proposées pour un problème (004, R1, R4) : calculées sur l'état courant de la
// session, appliquées par `applyChanges` en un seul pas d'historique.
import { allIds, applyInOneStep, dataOf, textOf, type FileChange, type Session } from '../edit/session'
import { addCode, addTableFile, codeName } from '../edit/operations'
import { getAt, removeAt, setAt } from '../edit/pointer'
import { newId } from '../edit/ids'
import { listNameOf, resolvePath } from '../model/paths'
import { renameCodeList } from '../edit/codelists'
import type { DocumentModel, TableModel } from '../model/types'
import { parsePointer } from '../pointer'
import { parseForeignKey, rewriteForeignKey } from '../validation/foreign-key'
import type { Problem } from '../validation/problems'
import { similar } from './similar'

export interface Fix {
  /** Ce que fait la correction, en clair. */
  label: string
  changes: FileChange[]
  /** Correction sûre, applicable en groupe (US2). */
  safe: boolean
}

const json = (path: string, update: (data: never) => unknown): FileChange => ({ path, kind: 'json', update: update as (data: unknown) => unknown })
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)
const short = (s: string, n = 60) => (s.length > n ? s.slice(0, n - 1) + '…' : s)
/** Premier nom cité entre « » dans le message du problème (ex. colonne, chemin). */
const quoted = (p: Problem) => p.message.match(/« (.+?) »/)?.[1] ?? ''

/** Modèle de document de `model`, s'il est éditable (lisible, avec une liste de fichiers). */
function documentOf(session: Session, model: string): { path: string; doc: DocumentModel } | undefined {
  const path = `${model}/files.json`
  const doc = dataOf(session, path) as DocumentModel | undefined
  return isObject(doc) && Array.isArray(doc.files) ? { path, doc } : undefined
}

const tablesOf = (session: Session, model: string) => [...(session.result.checked.get(model)?.tables ?? [])]

type Builder = (session: Session, p: Problem) => Fix[]

const replacements = (candidates: string[], label: (c: string) => string, change: (c: string) => FileChange): Fix[] =>
  candidates.map((c) => ({ label: label(c), changes: [change(c)], safe: false }))

const BUILDERS: Partial<Record<Problem['code'], Builder>> = {
  'WARN-MODEL-NAME': (_s, p) => [
    { label: `Renommer le modèle « ${p.model} », comme son dossier`, changes: [json(p.file, (d) => setAt(d, '/name', p.model))], safe: true },
  ],

  'WARN-CODE-NAME-FILE': (s, p) => {
    const index = Number(parsePointer(p.pointer!)[1])
    const data = (documentOf(s, p.model!)?.doc.codes?.[index])?.data
    if (data === undefined) return []
    const { changes, refusal } = renameCodeList(s, p.model!, index, data)
    return refusal || !changes.length ? [] : [{ label: `Renommer la liste en « ${listNameOf(data)} », comme son fichier`, changes, safe: true }]
  },

  'ERR-ID-DUPLICATE': (s, p) => [
    { label: 'Attribuer un nouvel identifiant à cet objet', changes: [json(p.file, (d) => setAt(d, p.pointer!, newId(allIds(s))))], safe: true },
  ],

  'WARN-GPU-ORPHAN-ID': (_s, p) => [{ label: 'Retirer cette surcharge de gpu.json', changes: [json(p.file, (d) => removeAt(d, p.pointer!))], safe: true }],
  'ERR-GPU-ORPHAN-ID': (_s, p) => [{ label: 'Retirer cette surcharge de gpu.json', changes: [json(p.file, (d) => removeAt(d, p.pointer!))], safe: true }],

  'ERR-GPU-ID-MISSING': (s, p) => [
    { label: 'Attribuer un identifiant', changes: [json(p.file, (d) => setAt(d, `${p.pointer ?? ''}/id`, newId(allIds(s))))], safe: true },
  ],

  'WARN-UNREFERENCED-FILE': (s, p) => {
    const model = p.model!
    const target = documentOf(s, model)
    if (!target) return []
    const rel = './' + p.file.slice(model.length + 1)
    const base = p.file.slice(p.file.lastIndexOf('/') + 1)
    if (p.file.endsWith('.csv')) {
      const name = codeName(rel)
      return [{ label: `Déclarer la liste « ${name} » dans files.json`, changes: [json(target.path, (d) => addCode(d, allIds(s), rel, name))], safe: true }]
    }
    const table = dataOf(s, p.file) as TableModel | undefined
    const name = isObject(table) && typeof table.name === 'string' ? table.name : base.replace(/\.json$/, '')
    return [
      {
        label: `Déclarer un fichier « ${name} » (table) dans files.json, chemin à compléter`,
        changes: [json(target.path, (d) => addTableFile(d, allIds(s), name, rel))],
        safe: false,
      },
    ]
  },

  'ERR-FK-TARGET-LIST': (s, p) => {
    const model = p.model!
    const target = documentOf(s, model)
    const fkText = getAt(dataOf(s, p.file), p.pointer!) as string
    const fk = parseForeignKey(fkText)
    if (!target || !fk) return []
    const list = fk.target
    const csv = `${model}/codes/${list}.csv`
    const declare = (data: string) => json(target.path, (d) => addCode(d, allIds(s), data, list))
    const fixes: Fix[] = []
    if (s.originals.has(csv) || s.texts.has(csv)) {
      fixes.push({ label: `Déclarer la liste « ${list} » (codes/${list}.csv) dans files.json`, changes: [declare(`./codes/${list}.csv`)], safe: true })
    } else {
      // Copie depuis le premier modèle qui déclare cette liste avec un CSV lisible.
      for (const [name, checked] of [...s.result.checked].sort(([a], [b]) => a.localeCompare(b))) {
        const code = checked.document?.codes?.find((c) => c.name === list)
        const source = code && resolvePath(name, code.data)
        const text = source && textOf(s, source)
        if (name === model || !source || text === undefined || !s.result.project.models.get(name)?.csvs.get(source)?.csv) continue
        fixes.push({
          label: `Copier la liste « ${list} » depuis ${name} et la déclarer`,
          changes: [{ path: csv, kind: 'text', text }, declare(`./codes/${list}.csv`)],
          safe: true,
        })
        break
      }
    }
    const declared = (target.doc.codes ?? []).map((c) => c.name)
    const tables = tablesOf(s, model).map(([, t]) => t.name)
    fixes.push(
      ...replacements(
        similar(list, [...declared, ...tables]),
        (c) => `Remplacer « ${list} » par « ${c} » dans la clé étrangère`,
        (c) => json(p.file, (d) => setAt(d, p.pointer!, rewriteForeignKey(fkText, 'list', list, c))),
      ),
    )
    return fixes.length === 1 ? fixes : fixes.map((f) => ({ ...f, safe: false }))
  },

  'ERR-FK-SOURCE-COLUMN': (s, p) => {
    const table = dataOf(s, p.file) as TableModel
    const fkText = getAt(table, p.pointer!) as string
    const column = quoted(p)
    return replacements(
      similar(column, (table.columns ?? []).map((c) => c.name)),
      (c) => `Remplacer la colonne « ${column} » par « ${c} »`,
      (c) => json(p.file, (d) => setAt(d, p.pointer!, rewriteForeignKey(fkText, 'source', column, c))),
    )
  },

  'ERR-FK-TARGET-COLUMN': (s, p) => {
    const fkText = getAt(dataOf(s, p.file), p.pointer!) as string
    const fk = parseForeignKey(fkText)
    const column = quoted(p)
    if (!fk || !column) return []
    const model = p.model!
    const code = s.result.checked.get(model)?.document?.codes?.find((c) => c.name === fk.target)
    const csvPath = code && resolvePath(model, code.data)
    const header = csvPath ? s.result.project.models.get(model)?.csvs.get(csvPath)?.csv?.header : undefined
    const columns = header ?? tablesOf(s, model).find(([, t]) => t.name === fk.target)?.[1].columns.map((c) => c.name) ?? []
    return replacements(
      similar(column, columns),
      (c) => `Remplacer la colonne « ${column} » de ${fk.target} par « ${c} »`,
      (c) => json(p.file, (d) => setAt(d, p.pointer!, rewriteForeignKey(fkText, 'target', column, c))),
    )
  },

  'ERR-REFERENCE-TARGET': (s, p) => {
    const ref = getAt(dataOf(s, p.file), p.pointer!) as string
    const all = tablesOf(s, p.model!).flatMap(([, t]) => t.columns.map((c) => `${t.name}.${c.name}`))
    return replacements(similar(ref, all), (c) => `Remplacer la référence par « ${c} »`, (c) => json(p.file, (d) => setAt(d, p.pointer!, c)))
  },

  'ERR-TABLE-MODEL-MISSING': (s, p) => {
    const model = p.model!
    const ref = quoted(p)
    const segments = parsePointer(p.pointer!)
    const at = segments.at(-1) === 'tableModel' ? p.pointer! : `${p.pointer}/tableModel`
    const candidates = [...(s.result.project.models.get(model)?.tables.keys() ?? [])].map((t) => './' + t.slice(model.length + 1))
    return replacements(similar(ref, candidates), (c) => `Utiliser le modèle de table « ${c} »`, (c) => json(p.file, (d) => setAt(d, at, c)))
  },

  'ERR-CODE-DATA-MISSING': (s, p) => {
    const model = p.model!
    const ref = getAt(dataOf(s, p.file), p.pointer!) as string
    const candidates = [...(s.result.project.models.get(model)?.csvs.keys() ?? [])].map((c) => './' + c.slice(model.length + 1))
    return replacements(similar(ref, candidates), (c) => `Utiliser le fichier « ${c} »`, (c) => json(p.file, (d) => setAt(d, p.pointer!, c)))
  },

  'ERR-CSV-ROW-LENGTH': (s, p) => {
    const text = textOf(s, p.file)
    const line = Number(p.pointer?.slice(1))
    if (text === undefined || !line) return []
    // Découpage qui garde chaque fin de ligne (LF, CRLF, voire mélangées) pour les restituer.
    const pieces = text.split(/(\r?\n)/)
    const row = pieces[2 * (line - 1)]
    const header = pieces[0]?.replace(/^\uFEFF/, '').split(',')
    if (row === undefined || !header || row.includes('"')) return []
    const fields = row.split(',')
    const extra = fields.length - header.length
    if (extra <= 0) return []
    const fixes: Fix[] = []
    for (let k = 0; k < header.length; k++) {
      // Valeur coupée par ses virgules : chaque morceau est du texte (pas un code ni une case vide).
      const parts = fields.slice(k, k + extra + 1)
      if (!parts.every((part) => /\p{L}/u.test(part))) continue
      const value = parts.join(',')
      const fixed = [...fields.slice(0, k), `"${value}"`, ...fields.slice(k + extra + 1)].join(',')
      fixes.push({
        label: `Mettre entre guillemets la valeur de ${header[k]} : « ${short(value)} »`,
        changes: [{ path: p.file, kind: 'text', text: pieces.map((piece, i) => (i === 2 * (line - 1) ? fixed : piece)).join('') }],
        safe: false,
      })
    }
    return fixes.length === 1 ? fixes.map((f) => ({ ...f, safe: true })) : fixes
  },
}

/** Corrections possibles d'un problème, dans l'état courant de la session. */
export function fixesFor(session: Session, problem: Problem): Fix[] {
  const builder = BUILDERS[problem.code]
  if (!builder) return []
  try {
    return builder(session, problem)
  } catch {
    // Donnée inattendue (fichier non conforme) : pas de correction proposée.
    return []
  }
}

/** Chaque problème a exactement une correction, et elle est sûre : correction groupée possible. */
export function canFixAll(session: Session, problems: readonly Problem[]): boolean {
  return problems.length > 1 && problems.every((p) => {
    const fixes = fixesFor(session, p)
    return fixes.length === 1 && fixes[0]!.safe
  })
}

/** Applique la correction de chaque problème en un seul pas (004 US2) ; undefined si impossible. */
export function fixAll(session: Session, problems: readonly Problem[], now = Date.now()): Session | undefined {
  if (!canFixAll(session, problems)) return undefined
  return applyInOneStep(
    session,
    problems.map((p) => (s: Session) => {
      const fixes = fixesFor(s, p)
      return fixes.length === 1 && fixes[0]!.safe ? fixes[0]!.changes : undefined
    }),
    now,
  )
}
