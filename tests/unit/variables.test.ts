import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadProject } from '@core/load/project'
import { fromVariables, readVariables, toVariables } from '@core/variables'
import { checkConfig } from '@core/validation/validate'
import { allFiles, applyChanges, edit, openSession } from '@core/edit/session'
import { setAt } from '@core/edit/pointer'
import { memoryFs, readConfig } from '../support/fixtures'

const DICTIONARY = readFileSync(join(import.meta.dirname, '../fixtures/variables.json'), 'utf8')
const file = (text: string) => {
  try {
    return { path: 'variables.json', data: JSON.parse(text) as unknown }
  } catch {
    return { path: 'variables.json' }
  }
}
const variables = readVariables(file(DICTIONARY)).variables!

describe('readVariables', () => {
  it('lit le dictionnaire réel', () => {
    const r = readVariables(file(DICTIONARY))
    expect(r.problems).toEqual([])
    expect(r.variables?.get('YYYYMMDD')).toBe('[0-9]{8}')
    expect(r.variables?.get('DIGIT_9')).toBe('[0-9]{9}')
  })

  it('signale un format inattendu', () => {
    for (const text of ['[]', '{}', '{"variables": []}', '{"variables": {"A": 1}}']) {
      const r = readVariables(file(text))
      expect(r.variables).toBeUndefined()
      expect(r.problems.map((p) => p.code)).toEqual(['ERR-VARIABLES-FORMAT'])
    }
  })

  it('signale deux variables de même regex', () => {
    const r = readVariables(file('{"variables": {"IDGEST": "[0-9]{9}", "SIREN": "[0-9]{9}"}}'))
    expect(r.variables).toBeUndefined()
    expect(r.problems).toMatchObject([{ code: 'ERR-VARIABLES-DUPLICATE', file: 'variables.json', pointer: '/variables/SIREN' }])
  })
})

describe('toVariables / fromVariables', () => {
  it('remplace la plus longue regex d\'abord', () => {
    expect(toVariables('Pieces_ecrites/[AB0-9]{5}_reglement_[0-9]{8}.pdf', variables)).toBe('Pieces_ecrites/<INSEE_COMMUNE>_reglement_<YYYYMMDD>.pdf')
    // DATE contient [0-9]{4} puis des groupes : reconnue entière, pas morceau par morceau.
    expect(toVariables(variables.get('DATE')!, variables)).toBe('<DATE>')
    expect(toVariables('sans variable', variables)).toBe('sans variable')
  })

  it('remplace les variables connues et garde les autres', () => {
    expect(fromVariables('<MAILLAGE>_PLU_<YYYYMMDD>', variables)).toBe(`${variables.get('MAILLAGE')}_PLU_[0-9]{8}`)
    expect(fromVariables('<INCONNUE>_[0-9]', variables)).toBe('<INCONNUE>_[0-9]')
  })

  it('aller-retour sur des formes réelles', () => {
    for (const form of ['<MAILLAGE>_PLU_<YYYYMMDD>(_<CHAR>)?', '<CATEGORIE>-<DIGIT_9>-<ENTIER>-<ENTIER>', 'Actes/<CATEGORIE>_<DIGIT_9>_<YYYYMMDD>_act']) {
      expect(toVariables(fromVariables(form, variables), variables)).toBe(form)
    }
  })
})

describe('chargement de variables.json', () => {
  it('retient variables.json à la racine, ignore les autres fichiers de la racine', async () => {
    const files = readConfig()
    files.set('variables.json', DICTIONARY)
    files.set('autre.json', '{}')
    const { project, problems } = await loadProject(memoryFs(files))
    expect(problems).toEqual([])
    expect(project.variables?.path).toBe('variables.json')
    expect(project.models.has('autre.json')).toBe(false)
  })

  it('signale un variables.json illisible, sans erreur sur les modèles', async () => {
    const files = readConfig()
    files.set('variables.json', '{')
    const result = await checkConfig(memoryFs(files))
    expect(result.problems.map((p) => p.code)).toEqual(['ERR-VARIABLES-FORMAT'])
    expect(result.problems[0]).toMatchObject({ model: null, file: 'variables.json' })
  })

  it('reste dans la session après une édition et dans les fichiers téléchargés', async () => {
    const files = readConfig()
    files.set('variables.json', DICTIONARY)
    let s = await openSession(files)
    s = edit(s, 'cnig_PLU_2017/types/ZONE_URBA.json', (d) => setAt(d, '/columns/7/constraints/maxLength', 5))
    s = applyChanges(s, [{ path: 'cnig_PLU_2017/codes/ListeEtatPLU.csv', kind: 'text', text: 'ETAT\n01\n' }])
    expect(s.result.project.variables?.path).toBe('variables.json')
    expect(allFiles(s).get('variables.json')).toBe(DICTIONARY)
  })
})
