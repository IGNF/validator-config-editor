import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { validateDocument, validateTable, type SchemaValidator } from '@core/schemas/generated/validate.js'

const fixtures = join(import.meta.dirname, '../../fixtures/config')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

// Associe chaque fichier JSON de configuration au validateur de son schéma.
function validatorFor(path: string): SchemaValidator | undefined {
  if (path.endsWith('/files.json')) return validateDocument
  if (/\/types\/[^/]+\.json$/.test(path)) return validateTable
  return undefined
}

function nonConformant(root: string): string[] {
  const failures: string[] = []
  for (const path of walk(root)) {
    const validate = validatorFor(path)
    if (!validate) continue
    if (!validate(JSON.parse(readFileSync(path, 'utf8')))) {
      failures.push(`${relative(root, path)} ${JSON.stringify(validate.errors?.slice(0, 3))}`)
    }
  }
  return failures
}

const id = '7833f9f88c20ca7b5a63cc0ad198a9a2'
const column = { id, name: 'TYPEZONE', type: 'String', constraints: { required: true } }
const table = { id, name: 'ZONE_URBA', columns: [column] }
const file = { id, name: 'ZONE_URBA', type: 'table', path: 'x', mandatory: 'ERROR' }
const document = { id, name: 'cnig_PLU_2017', files: [file], codes: [{ id, name: 'Liste', data: './codes/Liste.csv' }] }

describe('JSON Schema', () => {
  it('acceptent tous les fichiers des fixtures réelles', () => {
    expect(nonConformant(fixtures)).toEqual([])
  })

  it.skipIf(!process.env.VCE_CONFIG_DIR)('acceptent toute la configuration de VCE_CONFIG_DIR', () => {
    expect(nonConformant(process.env.VCE_CONFIG_DIR!)).toEqual([])
  })

  it('acceptent les cas minimaux valides', () => {
    expect(validateDocument(document)).toBe(true)
    expect(validateTable(table)).toBe(true)
  })

  it('acceptent maxLength = -1 (pas de limite pour le validator)', () => {
    expect(validateTable({ ...table, columns: [{ ...column, constraints: { maxLength: -1 } }] })).toBe(true)
  })

  it('acceptent l\'absence d\'id et des valeurs enum numériques (configurations ppr, naviforest)', () => {
    const { id: _id, ...noId } = column
    expect(validateTable({ name: 'T', columns: [{ ...noId, constraints: { enum: [0, 1, -1] } }] })).toBe(true)
    expect(validateDocument({ name: 'D', files: [{ name: 'F', type: 'pdf', path: 'x' }], codes: [{ name: 'L', data: './codes/L.csv' }] })).toBe(true)
  })

  it('acceptent les propriétés inconnues (principe II)', () => {
    expect(validateDocument({ ...document, extension: 1 })).toBe(true)
    expect(validateTable({ ...table, columns: [{ ...column, extension: true }] })).toBe(true)
  })

  it.each([
    ['type de colonne inconnu', validateTable, { ...table, columns: [{ ...column, type: 'Texte' }] }, '/columns/0/type'],
    ['type URL du schéma historique', validateTable, { ...table, columns: [{ ...column, type: 'URL' }] }, '/columns/0/type'],
    ['columns absent', validateTable, { id, name: 'T' }, ''],
    ['enum objet', validateTable, { ...table, columns: [{ ...column, constraints: { enum: [{}] } }] }, '/columns/0/constraints/enum/0'],
    ['maxLength inférieur à -1', validateTable, { ...table, columns: [{ ...column, constraints: { maxLength: -2 } }] }, '/columns/0/constraints/maxLength'],
    ['mandatory inconnu', validateDocument, { ...document, files: [{ ...file, mandatory: 'YES' }] }, '/files/0/mandatory'],
    ['type de fichier inconnu', validateDocument, { ...document, files: [{ ...file, type: 'zip' }] }, '/files/0/type'],
    ['id mal formé', validateDocument, { ...document, id: 'abc' }, '/id'],
    ['code sans data', validateDocument, { ...document, codes: [{ id, name: 'Liste' }] }, '/codes/0'],
    ['fichier sans chemin', validateDocument, { ...document, files: [{ name: 'F', type: 'pdf' }] }, '/files/0'],
  ] as const)('refusent : %s', (_label, validate, data, instancePath) => {
    expect(validate(data)).toBe(false)
    expect(validate.errors?.map((e) => e.instancePath)).toContain(instancePath)
  })
})
