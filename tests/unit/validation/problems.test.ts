import { describe, expect, it } from 'vitest'
import { closestPointer, countByModel, filterProblems, problem } from '@core/validation/problems'

const problems = [
  problem('ERR-SCHEMA', 'a', 'a/files.json', '/id', { detail: 'x' }),
  problem('WARN-UNREFERENCED-FILE', 'a', 'a/types/T.json', undefined),
  problem('ERR-FK-SYNTAX', 'b', 'b/types/T.json', '/constraints/foreignKeys/0', { fk: 'x' }),
  problem('WARN-MODEL-NO-DOCUMENT', null, 'c/', undefined),
]

describe('filterProblems', () => {
  it('filtre par sévérité, code et modèle', () => {
    expect(filterProblems(problems, {})).toHaveLength(4)
    expect(filterProblems(problems, { severity: 'error' }).map((p) => p.code)).toEqual(['ERR-SCHEMA', 'ERR-FK-SYNTAX'])
    expect(filterProblems(problems, { code: 'ERR-FK-SYNTAX' })).toHaveLength(1)
    expect(filterProblems(problems, { model: 'a' })).toHaveLength(2)
    expect(filterProblems(problems, { model: 'a', severity: 'warning' }).map((p) => p.code)).toEqual(['WARN-UNREFERENCED-FILE'])
  })
})

describe('countByModel', () => {
  it('compte erreurs et avertissements par modèle', () => {
    const counts = countByModel(problems)
    expect(counts.get('a')).toEqual({ errors: 1, warnings: 1 })
    expect(counts.get('b')).toEqual({ errors: 1, warnings: 0 })
    expect(counts.get('')).toEqual({ errors: 0, warnings: 1 })
  })
})

describe('closestPointer', () => {
  const candidates = ['', '/columns/1', '/columns/10', '/constraints/foreignKeys/0']
  it('trouve l\'élément affiché le plus proche', () => {
    expect(closestPointer('/columns/1/constraints/maxLength', candidates)).toBe('/columns/1')
    expect(closestPointer('/columns/10', candidates)).toBe('/columns/10')
    expect(closestPointer('/columns/12/type', candidates)).toBe('')
    expect(closestPointer('/constraints/foreignKeys/0', candidates)).toBe('/constraints/foreignKeys/0')
    expect(closestPointer('/x', ['/columns/1'])).toBeUndefined()
  })
})
