import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadProject } from '@core/load/project'
import { checkConfig } from '@core/validation/validate'
import type { Problem } from '@core/validation/problems'
import { editJson, memoryFs, readConfig } from '../../support/fixtures'

const PLU = 'cnig_PLU_2017'
const ZONE_URBA = `${PLU}/types/ZONE_URBA.json`
const FILES = `${PLU}/files.json`
const VARIABLES = readFileSync(join(import.meta.dirname, '../../fixtures/variables.json'), 'utf8')

const key = (p: Pick<Problem, 'code' | 'file' | 'pointer'>) => `${p.code} ${p.file} ${p.pointer ?? ''}`

async function problemsOf(files: Map<string, string>) {
  return (await checkConfig(memoryFs(files))).problems
}

// Problèmes ajoutés par une modification des fixtures réelles.
async function added(edit: (files: Map<string, string>) => void): Promise<Problem[]> {
  const baseline = new Set((await problemsOf(readConfig())).map(key))
  const files = readConfig()
  edit(files)
  return (await problemsOf(files)).filter((p) => !baseline.has(key(p)))
}

function indexOf(files: Map<string, string>, path: string, list: string, name: string): number {
  return (JSON.parse(files.get(path)!) as Record<string, { name: string }[]>)[list]!.findIndex((x) => x.name === name)
}

describe('chargement', () => {
  it('charge les modèles, tables, listes de codes et gpu.json des fixtures', async () => {
    const { project, problems } = await loadProject(memoryFs())
    expect(problems).toEqual([])
    expect([...project.models.keys()].sort()).toEqual(['GPU_MEC_2025', 'cnig_PLU_2017', 'cnig_SUP_A1_2016'])
    const plu = project.models.get(PLU)!
    expect(plu.document?.data).toMatchObject({ name: PLU })
    expect(plu.gpu?.data).toBeDefined()
    expect(plu.tables.has(ZONE_URBA)).toBe(true)
    expect(plu.csvs.get(`${PLU}/codes/ListeEtatPLU.csv`)?.csv?.header).toEqual(['ETAT'])
  })

  it('ignore les fichiers à la racine de la configuration', async () => {
    const files = readConfig()
    files.set('package.json', '{}')
    const { project } = await loadProject(memoryFs(files))
    expect(project.models.size).toBe(3)
  })
})

describe('validation des fixtures réelles', () => {
  it('ne produit aucun problème', async () => {
    expect(await problemsOf(readConfig())).toEqual([])
  })
})

describe('codes de problème', () => {
  const cases: [string, (files: Map<string, string>) => void, Partial<Problem>][] = [
    ['ERR-JSON-SYNTAX', (f) => f.set(ZONE_URBA, '{\n  "id": \n}'), { file: ZONE_URBA }],
    ['ERR-CSV-SYNTAX', (f) => f.set(`${PLU}/codes/ListeEtatPLU.csv`, 'ETAT\n"01\n'), { file: `${PLU}/codes/ListeEtatPLU.csv`, pointer: '/2' }],
    ['ERR-CSV-HEADER', (f) => f.set(`${PLU}/codes/ListeEtatPLU.csv`, 'ETAT,ETAT\n01,02\n'), { pointer: '/1' }],
    ['ERR-CSV-ROW-LENGTH', (f) => f.set(`${PLU}/codes/ListeEtatPLU.csv`, 'ETAT\n01\n02,03\n'), { pointer: '/3' }],
    ['WARN-MODEL-NO-DOCUMENT', (f) => f.set('orphelin/gpu.json', '{}'), { model: 'orphelin', file: 'orphelin/' }],
    ['ERR-VARIABLES-FORMAT', (f) => f.set('variables.json', '{"variables": []}'), { model: null, file: 'variables.json' }],
    ['ERR-VARIABLES-DUPLICATE', (f) => f.set('variables.json', '{"variables": {"A": "[0-9]", "B": "[0-9]"}}'), { model: null, file: 'variables.json', pointer: '/variables/B' }],
    ['ERR-SCHEMA', (f) => editJson(f, ZONE_URBA, (d) => { d.columns[0].type = 'Texte' }), { file: ZONE_URBA, pointer: '/columns/0/type' }],
    ['WARN-MODEL-NAME', (f) => editJson(f, FILES, (d) => { d.name = 'cnig_PLU_2016' }), { file: FILES, pointer: '/name' }],
    ['ERR-TABLE-MODEL-MISSING', (f) => f.delete(ZONE_URBA), { file: FILES, pointer: `/files/${indexOf(readConfig(), FILES, 'files', 'ZONE_URBA')}/tableModel` }],
    ['ERR-CODE-DATA-MISSING', (f) => f.delete(`${PLU}/codes/ListeEtatPLU.csv`), { file: FILES, pointer: `/codes/${indexOf(readConfig(), FILES, 'codes', 'ListeEtatPLU')}/data` }],
    ['ERR-FK-SYNTAX', (f) => editJson(f, ZONE_URBA, (d) => { d.constraints.foreignKeys = ['(TYPEZONE) REFERENCE ListeTypezonePLU(TYPEZONE)'] }), { pointer: '/constraints/foreignKeys/0' }],
    ['ERR-FK-SOURCE-COLUMN', (f) => editJson(f, ZONE_URBA, (d) => { d.constraints.foreignKeys = ['(INCONNUE) REFERENCES ListeTypezonePLU(TYPEZONE)'] }), { pointer: '/constraints/foreignKeys/0' }],
    ['ERR-FK-TARGET-LIST', (f) => editJson(f, ZONE_URBA, (d) => { d.constraints.foreignKeys = ['(TYPEZONE) REFERENCES Inconnue(TYPEZONE)'] }), { pointer: '/constraints/foreignKeys/0' }],
    ['ERR-FK-TARGET-COLUMN', (f) => editJson(f, ZONE_URBA, (d) => { d.constraints.foreignKeys = ['(TYPEZONE) REFERENCES ListeTypezonePLU(INCONNUE)'] }), { pointer: '/constraints/foreignKeys/0' }],
    ['ERR-REFERENCE-TARGET', (f) => editJson(f, ZONE_URBA, (d) => { d.columns[0].constraints.reference = 'INCONNUE.ID' }), { pointer: '/columns/0/constraints/reference' }],
    ['ERR-ID-DUPLICATE', (f) => editJson(f, ZONE_URBA, (d) => { d.id = JSON.parse(f.get(`${PLU}/types/DOC_URBA.json`)!).id }), { pointer: '/id' }],
    ['ERR-GPU-ID-MISSING', (f) => { f.set('variables.json', VARIABLES); editJson(f, FILES, (d) => { delete d.codes[0].id }) }, { file: FILES, pointer: '/codes/0' }],
    ['ERR-GPU-INHERITANCE', (f) => { f.set('variables.json', VARIABLES); editJson(f, FILES, (d) => { d.parent = { name: 'X' } }) }, { file: FILES, pointer: '/parent' }],
    ['ERR-GPU-ORPHAN-ID', (f) => { f.set('variables.json', VARIABLES); editJson(f, `${PLU}/gpu.json`, (d) => { d.validator_file_model['0123456789abcdef0123456789abcdef'] = { path: 'x' } }) }, { pointer: '/validator_file_model/0123456789abcdef0123456789abcdef' }],
    ['WARN-GPU-ORPHAN-ID', (f) => editJson(f, `${PLU}/gpu.json`, (d) => { d.validator_file_model['0123456789abcdef0123456789abcdef'] = { path: 'x' } }), { pointer: '/validator_file_model/0123456789abcdef0123456789abcdef' }],
    ['WARN-UNREFERENCED-FILE', (f) => f.set(`${PLU}/types/ORPHELINE.json`, f.get(ZONE_URBA)!.replace(/"ZONE_URBA"/g, '"ORPHELINE"')), { file: `${PLU}/types/ORPHELINE.json` }],
  ]

  it.each(cases)('%s', async (code, edit, expected) => {
    const found = await added(edit)
    expect(found.map((p) => p.code)).toContain(code)
    expect(found.find((p) => p.code === code)).toMatchObject({ code, ...expected })
    expect(found.find((p) => p.code === code)!.message).not.toBe('')
  })

  it('couvrent tout le catalogue', async () => {
    const { CATALOG } = await import('@core/validation/messages')
    expect(cases.map(([code]) => code).sort()).toEqual(Object.keys(CATALOG).sort())
  })
})

describe('règles propres au format', () => {
  it('résout le modèle de table par convention ./types/<name>.json quand tableModel est absent', async () => {
    const found = await added((f) => editJson(f, FILES, (d) => { delete d.files.find((x: { name: string }) => x.name === 'ZONE_URBA').tableModel }))
    expect(found).toEqual([])
  })

  it('ne vérifie pas tableModel « auto » ni une URL', async () => {
    const found = await added((f) => {
      f.delete(ZONE_URBA)
      f.delete(`${PLU}/types/DOC_URBA.json`)
      editJson(f, FILES, (d) => {
        d.files.find((x: { name: string }) => x.name === 'ZONE_URBA').tableModel = 'auto'
        d.files.find((x: { name: string }) => x.name === 'DOC_URBA').tableModel = 'https://example.org/DOC_URBA.json'
      })
    })
    expect(found.filter((p) => p.code === 'ERR-TABLE-MODEL-MISSING')).toEqual([])
  })

  it('accepte des colonnes de même id dans deux tables (colonnes communes)', async () => {
    const found = await added((f) => editJson(f, ZONE_URBA, (d) => { d.columns[0].id = JSON.parse(f.get(`${PLU}/types/DOC_URBA.json`)!).columns[0].id }))
    expect(found.filter((p) => p.code === 'ERR-ID-DUPLICATE')).toEqual([])
  })

  it('refuse deux colonnes de même id dans une table', async () => {
    const found = await added((f) => editJson(f, ZONE_URBA, (d) => { d.columns[1].id = d.columns[0].id }))
    expect(found).toMatchObject([{ code: 'ERR-ID-DUPLICATE', pointer: '/columns/1/id' }])
  })

  it('résout une clé étrangère vers une table du modèle', async () => {
    const found = await added((f) => editJson(f, ZONE_URBA, (d) => { d.constraints.foreignKeys = ['(IDURBA) REFERENCES DOC_URBA(IDURBA)'] }))
    expect(found).toEqual([])
  })

  it('n\'enchaîne pas d\'erreurs de références sur un fichier non conforme', async () => {
    const found = await added((f) => editJson(f, ZONE_URBA, (d) => {
      d.columns[0].type = 'Texte'
      d.constraints.foreignKeys = ['(INCONNUE) REFERENCES Inconnue(X)']
    }))
    expect(found.map((p) => p.code)).toEqual(['ERR-SCHEMA'])
  })

  it('trie par modèle, fichier, pointeur (ordre naturel) puis code', async () => {
    const found = await added((f) => editJson(f, ZONE_URBA, (d) => {
      d.columns[10] = { ...d.columns[0], type: 'X' }
      d.columns[2] = { ...d.columns[2], type: 'X' }
    }))
    const pointers = found.filter((p) => p.file === ZONE_URBA).map((p) => p.pointer)
    expect(pointers).toEqual([...pointers].sort((a, b) => Number(a!.split('/')[2]) - Number(b!.split('/')[2])))
  })
})

describe.skipIf(!process.env.VCE_CONFIG_DIR)('configuration complète (VCE_CONFIG_DIR)', () => {
  it('se valide en moins de 5 s (SC-001)', async () => {
    const start = performance.now()
    const result = await checkConfig(memoryFs(readConfig(process.env.VCE_CONFIG_DIR)))
    expect(result.project.models.size).toBeGreaterThan(100)
    expect(performance.now() - start).toBeLessThan(5000)
  })
})
