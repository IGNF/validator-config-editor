import type { SchemaError, SchemaValidator } from '../schemas/generated/validate.js'
import { escapeSegment, parsePointer } from '../pointer'
import { problem, type Problem } from './problems'

function valueAt(data: unknown, ptr: string): unknown {
  let v = data
  for (const s of parsePointer(ptr)) v = v !== null && typeof v === 'object' ? (v as Record<string, unknown>)[s] : undefined
  return v
}

function describe(e: SchemaError, data: unknown): string {
  const p = e.params
  switch (e.keyword) {
    case 'required':
      return `propriété obligatoire « ${String(p.missingProperty)} » absente`
    case 'enum':
      return `valeur « ${String(valueAt(data, e.instancePath))} » non autorisée (attendu : ${(p.allowedValues as unknown[]).join(', ')})`
    case 'type':
      return `type attendu : ${String(p.type)}`
    case 'pattern':
      return `valeur « ${String(valueAt(data, e.instancePath))} » non conforme au motif ${String(p.pattern)}`
    case 'minLength':
      return 'valeur vide non autorisée'
    case 'minimum':
      return `valeur minimale : ${String(p.limit)}`
    case 'additionalProperties':
      return `propriété « ${String(p.additionalProperty)} » non autorisée`
    case 'propertyNames':
      return `clé « ${String(p.propertyName)} » invalide (identifiant de 32 caractères alphanumériques attendu)`
    default:
      return e.message ?? e.keyword
  }
}

/** Valide `data` et convertit les erreurs du schéma en problèmes ERR-SCHEMA. */
export function schemaProblems(validate: SchemaValidator, data: unknown, model: string, file: string): Problem[] {
  if (validate(data)) return []
  const out: Problem[] = []
  const seen = new Set<string>()
  for (const e of validate.errors ?? []) {
    // Ajv double une erreur propertyNames par l'erreur du sous-schéma, portant propertyName.
    if ('propertyName' in e && e.keyword !== 'propertyNames') continue
    const at = e.keyword === 'propertyNames' ? `${e.instancePath}/${escapeSegment(String(e.params.propertyName))}` : e.instancePath
    const detail = describe(e, data)
    const key = `${at} ${detail}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(problem('ERR-SCHEMA', model, file, at, { at, detail }))
  }
  return out
}
