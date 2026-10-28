import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { addVariable, aliasRows, checkVariableName, removeVariable, renameVariable, setAlias, setVariableRegex } from '@core/edit/variables-edit'
import { applyChanges, dataOf, isChanged, openSession, textOf } from '@core/edit/session'
import { VARIABLES_FILE } from '@core/variables'
import { readConfig } from '../../support/fixtures'

const DICT = {
  description: 'd',
  variables: { DATE: '[0-9]{8}', DIGIT_9: '[0-9]{9}', _PART_OPT: '(_[a-z])?' },
  aliases: { cnig_SUP: { DIGIT_9: 'IDGEST' }, cnig_PLUi: { DIGIT_9: 'SIREN', DATE: 'JOUR' } },
}

describe('édition du dictionnaire des variables', () => {
  it('renomme à sa place, alias compris', () => {
    const d = renameVariable(DICT, 'DIGIT_9', 'NEUF') as typeof DICT
    expect(Object.keys(d.variables)).toEqual(['DATE', 'NEUF', '_PART_OPT'])
    expect(d.aliases).toEqual({ cnig_SUP: { NEUF: 'IDGEST' }, cnig_PLUi: { NEUF: 'SIREN', DATE: 'JOUR' } })
    expect(DICT.variables).toHaveProperty('DIGIT_9')
  })

  it('refuse un nom invalide ou déjà pris', () => {
    expect(checkVariableName(DICT, 'date')).toMatch(/majuscules/)
    expect(checkVariableName(DICT, 'DATE')).toBe('La variable « DATE » existe déjà.')
    expect(checkVariableName(DICT, 'DATE', 'DATE')).toBeUndefined()
    expect(checkVariableName(DICT, '_NUM_OPT')).toBeUndefined()
  })

  it('modifie une regex, ajoute en fin, retire avec ses alias', () => {
    expect((setVariableRegex(DICT, 'DATE', '[0-9]{6}') as typeof DICT).variables.DATE).toBe('[0-9]{6}')
    expect(Object.keys((addVariable(DICT, 'ENTIER', '[0-9]+') as typeof DICT).variables).at(-1)).toBe('ENTIER')
    const d = removeVariable(DICT, 'DIGIT_9') as typeof DICT
    expect(Object.keys(d.variables)).toEqual(['DATE', '_PART_OPT'])
    expect(d.aliases).toEqual({ cnig_PLUi: { DATE: 'JOUR' } })
  })

  it('ajoute, modifie et retire un alias ; une famille vide disparaît', () => {
    expect(aliasRows(setAlias(DICT, 'cnig_PSMV', 'DATE', 'JOUR'))).toContainEqual({ family: 'cnig_PSMV', variable: 'DATE', alias: 'JOUR' })
    expect((setAlias(DICT, 'cnig_SUP', 'DIGIT_9', 'GEST') as typeof DICT).aliases.cnig_SUP).toEqual({ DIGIT_9: 'GEST' })
    expect((setAlias(DICT, 'cnig_SUP', 'DIGIT_9', '') as typeof DICT).aliases).not.toHaveProperty('cnig_SUP')
  })
})

describe('variables.json dans la session', () => {
  it('modifiable, revalidé, écrit dans son style', async () => {
    const files = readConfig()
    files.set(VARIABLES_FILE, readFileSync(join(import.meta.dirname, '../../fixtures/variables.json'), 'utf8'))
    const s = await openSession(files)
    expect(dataOf(s, VARIABLES_FILE)).toHaveProperty('variables.DATE')
    const t = applyChanges(s, [{ path: VARIABLES_FILE, kind: 'json', update: (d) => renameVariable(d, 'DATE', 'JOUR') }])
    expect(isChanged(t, VARIABLES_FILE)).toBe(true)
    expect(t.result.project.variables?.data).toHaveProperty('variables.JOUR')
    expect(textOf(t, VARIABLES_FILE)).toContain('"JOUR": ')
    // Regex en double : problème signalé.
    const u = applyChanges(t, [{ path: VARIABLES_FILE, kind: 'json', update: (d) => setVariableRegex(d, 'ENTIER', '[0-9]{9}') }])
    expect(u.result.problems.map((p) => p.code)).toContain('ERR-VARIABLES-DUPLICATE')
  })
})
