import { describe, expect, it } from 'vitest'
import { validateDocument, validateGpu, validateTable } from '@core/schemas/generated/validate.js'
import { schemaProblems } from '@core/validation/schema'
import { countProblems } from '@core/validation/problems'

const id = '7833f9f88c20ca7b5a63cc0ad198a9a2'
const messages = (validate: Parameters<typeof schemaProblems>[0], data: unknown) =>
  schemaProblems(validate, data, 'm', 'm/f.json').map((p) => `${p.pointer} ${p.message}`)

describe('schemaProblems', () => {
  it('ne signale rien pour un fichier conforme', () => {
    expect(messages(validateTable, { id, name: 'T', columns: [] })).toEqual([])
  })

  it('traduit les erreurs en français, localisées par pointeur', () => {
    expect(messages(validateTable, { id, name: 'T' })).toEqual([' / : propriété obligatoire « columns » absente'])
    expect(messages(validateTable, { id, name: 'T', columns: [{ id, name: 'C', type: 'Texte' }] })[0]).toMatch(
      /^\/columns\/0\/type \/columns\/0\/type : valeur « Texte » non autorisée \(attendu : Boolean, Date/,
    )
    expect(messages(validateTable, { id, name: '', columns: 'x' })).toEqual([
      '/name /name : valeur vide non autorisée',
      '/columns /columns : type attendu : array',
    ])
    expect(messages(validateDocument, { id: 'abc', name: 'D', files: [] })).toEqual([
      '/id /id : valeur « abc » non conforme au motif ^[0-9A-Za-z]{32}$',
    ])
    expect(messages(validateTable, { id, name: 'T', columns: [{ id, name: 'C', type: 'String', constraints: { maxLength: -2 } }] })).toEqual([
      '/columns/0/constraints/maxLength /columns/0/constraints/maxLength : valeur minimale : -1',
    ])
  })

  it('signale une section ou une clé gpu.json invalide', () => {
    expect(messages(validateGpu, { inconnue: {} })).toEqual([' / : propriété « inconnue » non autorisée'])
    expect(messages(validateGpu, { validator_file_model: { 'a/b': {} } })).toEqual([
      '/validator_file_model/a~1b /validator_file_model/a~1b : clé « a/b » invalide (identifiant de 32 caractères alphanumériques attendu)',
    ])
  })
})

describe('countProblems', () => {
  it('compte erreurs et avertissements', () => {
    const p = schemaProblems(validateTable, { id, name: '' }, 'm', 'f')
    expect(countProblems(p)).toEqual({ errors: 2, warnings: 0 })
  })
})
