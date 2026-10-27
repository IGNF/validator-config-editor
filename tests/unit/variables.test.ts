import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadProject } from '@core/load/project'
import { fromVariables, namesFor, readVariables, toSegments, toVariables } from '@core/variables'
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
const dictionary = readVariables(file(DICTIONARY))
const variables = dictionary.variables!
const DATE = variables.get('DATE')!

describe('readVariables', () => {
  it('lit le dictionnaire réel', () => {
    const r = readVariables(file(DICTIONARY))
    expect(r.problems).toEqual([])
    expect(r.variables?.get('YYYYMMDD')).toBeUndefined()
    expect(r.variables?.get('DIGIT_9')).toBe('[0-9]{9}')
    expect(r.aliases?.get('cnig_SUP')?.get('DIGIT_9')).toBe('IDGEST')
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

describe('variables facultatives (_OPT)', () => {
  it('le dictionnaire réel respecte la convention', () => {
    expect(readVariables(file(DICTIONARY)).problems).toEqual([])
  })

  it('signale un écart entre le suffixe _OPT et la regex (…)?, sans refuser le dictionnaire', () => {
    const r = readVariables(file('{"variables": {"GEN": "(_gen[0-9]+)?", "X_OPT": "[0-9]", "Y_OPT": "(a)|(b)?", "Z_OPT": "(a(b)?)?", "W": "(a)(b)?"}}'))
    expect(r.variables?.size).toBe(5)
    expect(r.problems).toMatchObject([
      { code: 'WARN-VARIABLES-OPT', severity: 'warning', pointer: '/variables/GEN', message: 'La variable GEN a une regex facultative (…)? sans le suffixe _OPT' },
      { code: 'WARN-VARIABLES-OPT', pointer: '/variables/X_OPT', message: 'La variable X_OPT a le suffixe _OPT sans regex facultative (…)?' },
      { code: 'WARN-VARIABLES-OPT', pointer: '/variables/Y_OPT' },
    ])
  })

  it('découpe la forme à variables en morceaux, facultatifs selon le nom du dictionnaire', () => {
    const sup = namesFor(dictionary.aliases, 'cnig_SUP_A1_2016')
    expect(toSegments(`[0-9]{9}_A1(_[a-zA-Z])?\\.pdf`, variables, sup)).toEqual([
      { text: '<IDGEST>', variable: 'IDGEST', regex: '[0-9]{9}', optional: false },
      { text: '_A1' },
      { text: '<PART_OPT>', variable: 'PART_OPT', regex: '(_[a-zA-Z])?', optional: true },
      { text: '\\.pdf' },
    ])
    expect(toSegments('', variables)).toEqual([])
  })
})

describe('toVariables / fromVariables', () => {
  it('remplace la plus longue regex d\'abord', () => {
    expect(toVariables(`Pieces_ecrites/[AB0-9]{5}_reglement_${DATE}(_[a-zA-Z])?\\.pdf`, variables)).toBe('Pieces_ecrites/<INSEE_COMMUNE>_reglement_<DATE><PART_OPT>\\.pdf')
    // DATE contient [0-9]{4} puis des groupes : reconnue entière, pas morceau par morceau.
    expect(toVariables(DATE, variables)).toBe('<DATE>')
    // MAILLAGE_OPT contient MAILLAGE : la plus longue l'emporte.
    expect(toVariables(variables.get('MAILLAGE_OPT')!, variables)).toBe('<MAILLAGE_OPT>')
    expect(toVariables('sans variable', variables)).toBe('sans variable')
  })

  it('remplace les variables connues et garde les autres', () => {
    expect(fromVariables('<MAILLAGE>_PLU_<DATE>', variables)).toBe(`${variables.get('MAILLAGE')}_PLU_${DATE}`)
    expect(fromVariables('<INCONNUE>_[0-9]', variables)).toBe('<INCONNUE>_[0-9]')
  })

  it('aller-retour sur des formes réelles', () => {
    for (const form of ['<MAILLAGE>_PLU_<DATE><PART_OPT>', '<CATEGORIE>-<DIGIT_9>-<ENTIER>-<ENTIER>', 'Actes/<CATEGORIE>_<DIGIT_9>_<DATE>_act']) {
      expect(toVariables(fromVariables(form, variables), variables)).toBe(form)
    }
  })
})

describe('alias par famille', () => {
  it('nom affiché selon la famille du modèle (préfixe suivi de « _ »)', () => {
    const sup = namesFor(dictionary.aliases, 'cnig_SUP_A1_2016')
    expect(toVariables('[0-9]{9}', variables, sup)).toBe('<IDGEST>')
    expect(toVariables('[0-9]{9}', variables, namesFor(dictionary.aliases, 'cnig_PLUi_2024'))).toBe('<SIREN>')
    expect(toVariables('[0-9]{9}', variables, namesFor(dictionary.aliases, 'cnig_SCoT_2018'))).toBe('<SIREN>')
    // cnig_PLU n'est pas cnig_PLUi : pas d'alias.
    expect(toVariables('[0-9]{9}', variables, namesFor(dictionary.aliases, 'cnig_PLU_2017'))).toBe('<DIGIT_9>')
    expect(fromVariables('<IDGEST>_<DIGIT_9>', variables, sup)).toBe('[0-9]{9}_[0-9]{9}')
    expect(fromVariables('<IDGEST>', variables, namesFor(dictionary.aliases, 'cnig_PLU_2017'))).toBe('<IDGEST>')
  })

  it('alias mal formé ou vers une variable inconnue : dictionnaire refusé', () => {
    for (const aliases of ['[]', '{"cnig_SUP": {"INCONNUE": "X"}}', '{"cnig_SUP": {"DIGIT_9": 3}}']) {
      const r = readVariables(file(`{"variables": {"DIGIT_9": "[0-9]{9}"}, "aliases": ${aliases}}`))
      expect(r.variables).toBeUndefined()
      expect(r.problems).toMatchObject([{ code: 'ERR-VARIABLES-FORMAT', pointer: '/aliases' }])
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
