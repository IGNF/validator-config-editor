import { stat } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { compareModels, type Change, type Comparison, type Section } from '@core/compare'
import { checkConfig, type CheckResult } from '@core/validation/validate'
import type { Output } from './check'
import { NodeConfigFs } from './fs'

export interface CompareOptions {
  format: 'text' | 'json'
}

const LABELS: Record<string, string> = {
  folderName: 'nom du dossier', metadataSpecification: 'spécification des métadonnées', type: 'type', mandatory: 'présence',
  path: 'chemin', tableModel: 'modèle de table', conditions: 'conditions', foreignKeys: 'clés étrangères', description: 'description',
  minLength: 'longueur minimale', maxLength: 'longueur maximale', required: 'valeur obligatoire', presenceRequired: 'colonne obligatoire',
  unique: 'unique', enum: 'valeurs possibles', pattern: 'motif',
}

const value = (v: Change['old']) => (v === null || v === undefined ? '(absent)' : typeof v === 'boolean' ? (v ? 'Oui' : 'Non') : String(v))

function change(c: Change): string {
  const label = LABELS[c.field] ?? c.field
  if (c.removed || c.added) return `${label} : ${[...(c.removed ?? []).map((x) => `- ${x}`), ...(c.added ?? []).map((x) => `+ ${x}`)].join(' ; ')}`
  return `${label} : ${value(c.old)} → ${value(c.new)}`
}

function section(lines: string[], title: string, s: Section, prefix = '') {
  if (!s.added.length && !s.removed.length && !s.changed.length) return
  if (title) lines.push(title)
  for (const n of s.added) lines.push(`  + ${prefix}${n}`)
  for (const n of s.removed) lines.push(`  - ${prefix}${n}`)
  for (const c of s.changed) lines.push(`  ~ ${prefix}${c.name} : ${c.changes.map(change).join(', ')}`)
}

/** Comparaison en texte : une section par type d'objet, « + », « - », « ~ », puis le total. */
export function formatComparison(c: Comparison): string[] {
  const lines = [`Comparaison de ${c.from} à ${c.to}`]
  if (c.document.length) lines.push('Dossier', ...c.document.map((x) => `  ~ ${change(x)}`))
  section(lines, 'Fichiers attendus', c.files)
  if (c.tables.added.length || c.tables.removed.length || c.tables.changed.length) {
    lines.push('Tables')
    for (const n of c.tables.added) lines.push(`  + ${n}`)
    for (const n of c.tables.removed) lines.push(`  - ${n}`)
    for (const t of c.tables.changed) {
      lines.push(`  ~ ${t.name}`, ...t.changes.map((x) => `      ${change(x)}`))
      const columns: string[] = []
      section(columns, '', t.columns, 'colonne ')
      lines.push(...columns.map((l) => `    ${l}`))
    }
  }
  section(lines, 'Listes de codes', { ...c.codes, changed: [] })
  if (c.codes.content.length) {
    lines.push('Contenu des listes de codes')
    for (const l of c.codes.content) {
      lines.push(`  ~ ${l.name}`)
      for (const x of l.columns.added) lines.push(`      + colonne ${x}`)
      for (const x of l.columns.removed) lines.push(`      - colonne ${x}`)
      for (const x of l.rows.added) lines.push(`      + ${x}`)
      for (const x of l.rows.removed) lines.push(`      - ${x}`)
      for (const r of l.rows.changed) lines.push(`      ~ ${r.key} : ${r.changes.map((x) => `${x.field} : ${value(x.old)} → ${value(x.new)}`).join(', ')}`)
    }
  }
  if (c.unreadable.length) lines.push(`Illisibles, laissés de côté : ${c.unreadable.join(', ')}`)
  lines.push('', c.total === 0 ? 'Aucune différence' : `${c.total} différence${c.total > 1 ? 's' : ''}`)
  return lines
}

/** `vce compare` (contrat contracts/compare.md) ; renvoie le code de sortie. */
export async function runCompare(reference: string, model: string, options: CompareOptions, out: Output): Promise<number> {
  const dirs = [resolve(reference), resolve(model)]
  for (const dir of dirs) {
    if (!(await stat(dir).then((s) => s.isDirectory(), () => false))) {
      out.error(`Dossier introuvable : ${dir}`)
      return 2
    }
    if (!(await stat(resolve(dir, 'files.json')).then((s) => s.isFile(), () => false))) {
      out.error(`Pas de files.json dans ${dir} : indiquer le dossier d'un modèle (ex. config/cnig_PLU_2024).`)
      return 2
    }
  }
  const [from, to] = dirs.map((d) => basename(d)) as [string, string]
  const [parentA, parentB] = dirs.map((d) => dirname(d)) as [string, string]
  if (parentA !== parentB && from === to) {
    out.error(`Deux modèles de même nom (${from}) dans deux configurations : comparaison hors périmètre.`)
    return 2
  }
  // Chaque configuration est chargée et validée une fois ; deux configurations sont réunies.
  const results = await Promise.all([...new Set([parentA, parentB])].map(async (p) => checkConfig(await NodeConfigFs.open(p))))
  const result: CheckResult = results.length === 1 ? results[0]! : {
    project: { models: new Map(results.flatMap((r) => [...r.project.models])) },
    checked: new Map(results.flatMap((r) => [...r.checked])),
    problems: results.flatMap((r) => r.problems),
  }
  const comparison = compareModels(result, from, to)
  if (options.format === 'json') out.log(JSON.stringify(comparison, null, 2))
  else for (const line of formatComparison(comparison)) out.log(line)
  return 0
}
