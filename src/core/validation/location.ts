// Localisation lisible d'un problème (004, R8) : nom du fichier et de l'élément, déduits de la
// donnée plutôt qu'un pointeur JSON.
import { indexObjects } from '../model/objects'
import type { Project } from '../model/types'
import { parsePointer } from '../pointer'
import type { Problem } from './problems'

export interface Location {
  /** Ex. « Table ZONE_URBA ». */
  file: string
  /** Ex. « Colonne TYPEZONE · référence » ; absent si le problème porte sur tout le fichier. */
  element?: string
}

const PROPERTIES: Record<string, string> = {
  id: 'identifiant', name: 'nom', title: 'titre', description: 'description', type: 'type', path: 'chemin',
  mandatory: 'présence', tableModel: 'modèle de table', data: 'fichier', tables: 'tables', abstract: 'abstrait',
  folderName: 'nom de dossier', metadataSpecification: 'spécification des métadonnées', required: 'valeur obligatoire',
  presenceRequired: 'colonne obligatoire', unique: 'unicité', pattern: 'motif', minLength: 'longueur minimale',
  maxLength: 'longueur maximale', enum: 'valeurs autorisées', reference: 'référence', columns: 'colonnes', files: 'fichiers',
  codes: 'listes de codes', constraints: 'contraintes', foreignKeys: 'clés étrangères', conditions: 'conditions',
}
const SECTIONS: Record<string, string> = {
  validator_document_model: 'du modèle', validator_file_model: 'de fichier', validator_feature_type: 'de table',
  validator_attribute_type: 'de colonne', validator_static_table: 'de liste de codes',
}

type Raw = Record<string, unknown>
const at = (data: unknown, key: string | number): unknown =>
  data !== null && typeof data === 'object' ? (data as Raw)[key as string] : undefined
const nameOf = (data: unknown, fallback: string) => (typeof at(data, 'name') === 'string' ? (at(data, 'name') as string) : fallback)
const property = (key: string | undefined) => (key === undefined ? undefined : (PROPERTIES[key] ?? key))
const join = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(' · ') || undefined

function fileLabel(project: Project, problem: Problem): { label: string; data?: unknown } {
  const { file } = problem
  const model = file.slice(0, file.indexOf('/'))
  const rel = file.slice(model.length + 1)
  const loaded = project.models.get(model)
  const base = rel.slice(rel.lastIndexOf('/') + 1)
  if (rel === '' || rel === 'files.json') return { label: `Modèle ${model}`, data: loaded?.document?.data }
  if (rel === 'gpu.json') return { label: `Surcharges GpU de ${model}`, data: loaded?.gpu?.data }
  if (rel.startsWith('types/') && rel.endsWith('.json')) {
    const data = loaded?.tables.get(file)?.data
    return { label: `Table ${nameOf(data, base.replace(/\.json$/, ''))}`, data }
  }
  if (rel.endsWith('.csv')) return { label: `Liste ${base.replace(/\.csv$/i, '')}` }
  return { label: file }
}

function element(project: Project, problem: Problem, data: unknown): string | undefined {
  if (problem.pointer === undefined) return undefined
  const s = parsePointer(problem.pointer)
  const rel = problem.file.slice(problem.file.indexOf('/') + 1)
  if (s.length === 0) return undefined
  if (rel.endsWith('.csv')) return `Ligne ${s[0]}`
  if (rel === 'gpu.json') {
    const [section, id] = s
    const model = project.models.get(problem.model ?? '')
    const object = model && id !== undefined ? indexObjects(model).get(id) : undefined
    const what = object ? `${object.kind} ${object.label}` : `${(id ?? '').slice(0, 8)}…`
    return `Surcharge ${SECTIONS[section ?? ''] ?? ''} ${what}`.replace(/\s+/g, ' ')
  }
  const [head, index, ...rest] = s
  const i = Number(index)
  if (head === 'columns' && !Number.isNaN(i)) {
    const column = at(at(data, 'columns'), i)
    const key = rest[0] === 'constraints' ? rest[1] : rest[0]
    return join(`Colonne ${nameOf(column, String(i + 1))}`, property(key))
  }
  if ((head === 'files' || head === 'codes') && !Number.isNaN(i)) {
    const item = at(at(data, head), i)
    return join(`${head === 'files' ? 'Fichier' : 'Liste'} ${nameOf(item, String(i + 1))}`, property(rest[0] === 'tables' ? undefined : rest[0]))
  }
  if (head === 'constraints' && (index === 'foreignKeys' || index === 'conditions') && rest[0] !== undefined) {
    return `${index === 'foreignKeys' ? 'Clé étrangère' : 'Condition'} ${Number(rest[0]) + 1}`
  }
  return property(s.at(-1))!.replace(/^./, (c) => c.toUpperCase())
}

export function describeLocation(project: Project, problem: Problem): Location {
  const { label, data } = fileLabel(project, problem)
  const el = element(project, problem, data)
  return el ? { file: label, element: el } : { file: label }
}
