import { describe, expect, it } from 'vitest'
import { applyChanges, openSession, undoEdit, type Session } from '@core/edit/session'
import { canFixAll, fixAll, fixesFor } from '@core/fixes/catalog'
import { distance, similar } from '@core/fixes/similar'
import { editJson, readConfig } from '../../support/fixtures'

const PLU = 'cnig_PLU_2017'
const FILES = `${PLU}/files.json`
const ZONE_URBA = `${PLU}/types/ZONE_URBA.json`

async function broken(edit: (files: Map<string, string>) => void): Promise<Session> {
  const files = readConfig()
  edit(files)
  return openSession(files)
}

/** Applique la correction d'indice `index` du premier problème `code`. */
function fix(session: Session, code: string, index = 0) {
  const problem = session.result.problems.find((p) => p.code === code)
  expect(problem, `problème ${code}`).toBeDefined()
  const fixes = fixesFor(session, problem!)
  expect(fixes.length, `corrections de ${code}`).toBeGreaterThan(index)
  return { fixes, after: applyChanges(session, fixes[index]!.changes) }
}

const codes = (s: Session) => s.result.problems.map((p) => p.code)

describe('noms proches', () => {
  it('mesure la distance d\'édition sans tenir compte de la casse', () => {
    expect(distance('TYPEZONE', 'typezone')).toBe(0)
    expect(distance('TYPEZON', 'TYPEZONE')).toBe(1)
    expect(distance('', 'abc')).toBe(3)
  })

  it('propose au plus 3 noms suffisamment proches, du plus proche au plus lointain', () => {
    expect(similar('TYPEZON', ['TYPEZONE', 'TYPEINF', 'LIBELLE', 'TYPEZONE'])).toEqual(['TYPEZONE'])
    expect(similar('A', ['B', 'AB', 'ABC'])).toEqual(['AB', 'B'])
    expect(similar('ZONE', ['ZONE'])).toEqual([])
    expect(similar('ListeA', ['ListeB', 'ListeC', 'ListeD', 'ListeE'])).toHaveLength(3)
  })
})

describe('corrections', () => {
  it('WARN-MODEL-NAME : renomme le modèle comme son dossier', async () => {
    const s = await broken((f) => editJson(f, FILES, (d) => { d.name = 'autre' }))
    const { fixes, after } = fix(s, 'WARN-MODEL-NAME')
    expect(fixes[0]).toMatchObject({ label: `Renommer le modèle « ${PLU} », comme son dossier`, safe: true })
    expect(codes(after)).toEqual([])
    expect(codes(undoEdit(after))).toEqual(['WARN-MODEL-NAME'])
  })

  it('WARN-CODE-NAME-FILE : renomme la liste comme son fichier, clés étrangères comprises', async () => {
    const s = await broken((f) => editJson(f, FILES, (d) => {
      d.codes.find((c: { name: string }) => c.name === 'ListeEtatPLU').name = 'Etat'
    }))
    // Le nom modifié à la main casse aussi la clé étrangère de DOC_URBA : la correction rétablit les deux.
    const { fixes, after } = fix(s, 'WARN-CODE-NAME-FILE')
    expect(fixes[0]).toMatchObject({ label: 'Renommer la liste en « ListeEtatPLU », comme son fichier', safe: true })
    expect(codes(after)).toEqual([])
  })

  it('ERR-ID-DUPLICATE : attribue un nouvel identifiant', async () => {
    const s = await broken((f) => editJson(f, ZONE_URBA, (d) => { d.id = JSON.parse(f.get(`${PLU}/types/DOC_URBA.json`)!).id }))
    expect(codes(fix(s, 'ERR-ID-DUPLICATE').after)).not.toContain('ERR-ID-DUPLICATE')
  })

  it('WARN-GPU-ORPHAN-ID : retire la surcharge', async () => {
    const s = await broken((f) => editJson(f, `${PLU}/gpu.json`, (d) => { d.validator_file_model['0123456789abcdef0123456789abcdef'] = { path: 'x' } }))
    const { fixes, after } = fix(s, 'WARN-GPU-ORPHAN-ID')
    expect(fixes[0]).toMatchObject({ label: 'Retirer cette surcharge de gpu.json', safe: true })
    expect(codes(after)).toEqual([])
  })

  it('WARN-UNREFERENCED-FILE : déclare une liste de codes', async () => {
    const s = await broken((f) => f.set(`${PLU}/codes/Orpheline.csv`, 'A\n1\n'))
    const { fixes, after } = fix(s, 'WARN-UNREFERENCED-FILE')
    expect(fixes[0]!.label).toBe('Déclarer la liste « Orpheline » dans files.json')
    expect(codes(after)).toEqual([])
  })

  it('WARN-UNREFERENCED-FILE : déclare un fichier table (non groupable : chemin à compléter)', async () => {
    const s = await broken((f) => f.set(`${PLU}/types/ORPHELINE.json`, '{\n    "name": "ORPHELINE",\n    "columns": []\n}'))
    const { fixes, after } = fix(s, 'WARN-UNREFERENCED-FILE')
    expect(fixes[0]).toMatchObject({ label: 'Déclarer un fichier « ORPHELINE » (table) dans files.json, chemin à compléter', safe: false })
    expect(codes(after)).toEqual([])
  })

  it('ERR-FK-TARGET-LIST : déclare la liste dont le CSV existe', async () => {
    const s = await broken((f) => editJson(f, FILES, (d) => { d.codes = d.codes.filter((c: { name: string }) => c.name !== 'ListeTypezonePLU') }))
    const { fixes, after } = fix(s, 'ERR-FK-TARGET-LIST')
    expect(fixes[0]!.label).toBe('Déclarer la liste « ListeTypezonePLU » (codes/ListeTypezonePLU.csv) dans files.json')
    // Reste la surcharge GpU de l'ancienne déclaration, devenue orpheline.
    expect(codes(after)).toEqual(['WARN-GPU-ORPHAN-ID'])
  })

  it('ERR-FK-TARGET-LIST : copie la liste depuis un autre modèle, annulable en un pas', async () => {
    const BIS = 'cnig_PLU_2017_bis'
    const s = await broken((f) => {
      for (const [path, text] of [...f]) if (path.startsWith(`${PLU}/`)) f.set(BIS + path.slice(PLU.length), text)
      editJson(f, `${BIS}/files.json`, (d) => {
        d.name = BIS
        d.codes = d.codes.filter((c: { name: string }) => c.name !== 'ListeTypezonePLU')
      })
      f.delete(`${BIS}/codes/ListeTypezonePLU.csv`)
    })
    const { fixes, after } = fix(s, 'ERR-FK-TARGET-LIST')
    expect(fixes[0]!.label).toBe(`Copier la liste « ListeTypezonePLU » depuis ${PLU} et la déclarer`)
    expect(codes(after)).toEqual(['WARN-GPU-ORPHAN-ID'])
    expect(after.texts.get(`${BIS}/codes/ListeTypezonePLU.csv`)).toBe(s.originals.get(`${PLU}/codes/ListeTypezonePLU.csv`))
    expect(codes(undoEdit(after))).toEqual(['WARN-GPU-ORPHAN-ID', 'ERR-FK-TARGET-LIST'])
  })

  it.each([
    ['ERR-FK-SOURCE-COLUMN', ZONE_URBA, '/constraints/foreignKeys/0', '(TYPEZON) REFERENCES ListeTypezonePLU(TYPEZONE)', 'Remplacer la colonne « TYPEZON » par « TYPEZONE »'],
    ['ERR-FK-TARGET-COLUMN', ZONE_URBA, '/constraints/foreignKeys/0', '(TYPEZONE) REFERENCES ListeTypezonePLU(TYPEZON)', 'Remplacer la colonne « TYPEZON » de ListeTypezonePLU par « TYPEZONE »'],
    ['ERR-FK-TARGET-LIST', ZONE_URBA, '/constraints/foreignKeys/0', '(TYPEZONE) REFERENCES ListeTypezonePL(TYPEZONE)', 'Remplacer « ListeTypezonePL » par « ListeTypezonePLU » dans la clé étrangère'],
    ['ERR-REFERENCE-TARGET', ZONE_URBA, '/columns/0/constraints/reference', 'DOC_URBA.IDURB', 'Remplacer la référence par « DOC_URBA.IDURBA »'],
  ])('%s : remplace par un nom proche', async (code, file, ptr, value, label) => {
    const s = await broken((f) => editJson(f, file, (d) => {
      const segments = ptr.slice(1).split('/')
      let o = d
      for (const k of segments.slice(0, -1)) o = o[k]
      o[segments.at(-1)!] = value
    }))
    const { fixes, after } = fix(s, code)
    expect(fixes.map((x) => x.label)).toContain(label)
    const index = fixes.findIndex((x) => x.label === label)
    expect(codes(applyChanges(s, fixes[index]!.changes))).toEqual([])
    expect(after).toBeDefined()
  })

  it('ERR-TABLE-MODEL-MISSING, ERR-CODE-DATA-MISSING : chemins et noms proches', async () => {
    let s = await broken((f) => editJson(f, FILES, (d) => {
      d.files.find((x: { name: string }) => x.name === 'ZONE_URBA').tableModel = './types/ZONE_URB.json'
      d.codes.find((x: { name: string }) => x.name === 'ListeEtatPLU').data = './codes/ListeEtatPL.csv'
    }))
    s = fix(s, 'ERR-TABLE-MODEL-MISSING').after
    s = fix(s, 'ERR-CODE-DATA-MISSING').after
    expect(codes(s)).toEqual([])
  })

  it('ERR-CSV-ROW-LENGTH : met entre guillemets la valeur qui contient des virgules', async () => {
    const LIST = `${PLU}/codes/InformationUrbaType.csv`
    const s = await broken((f) => f.set(LIST, f.get(LIST)!.replace(/\n?$/, '\n') + '42,00,Secteurs délimités, dans lesquels certaines opérations,,\n'))
    const { fixes, after } = fix(s, 'ERR-CSV-ROW-LENGTH')
    expect(fixes).toHaveLength(1)
    expect(fixes[0]).toMatchObject({ label: 'Mettre entre guillemets la valeur de LIBELLE : « Secteurs délimités, dans lesquels certaines opérations »', safe: true })
    expect(codes(after)).toEqual([])
    expect(after.texts.get(LIST)!.endsWith('42,00,"Secteurs délimités, dans lesquels certaines opérations",,\n')).toBe(true)
  })

  it('aucune correction pour un problème sans correction connue', async () => {
    const s = await broken((f) => f.set(ZONE_URBA, '{'))
    expect(fixesFor(s, s.result.problems.find((p) => p.code === 'ERR-JSON-SYNTAX')!)).toEqual([])
  })
})

describe('corrections groupées', () => {
  const ORPHANS = ['0123456789abcdef0123456789abcde1', '0123456789abcdef0123456789abcde2', '0123456789abcdef0123456789abcde3']

  it('corrige tous les problèmes d\'un code en un pas, défait par une annulation', async () => {
    const s = await broken((f) => editJson(f, `${PLU}/gpu.json`, (d) => { for (const id of ORPHANS) d.validator_file_model[id] = { path: 'x' } }))
    const problems = s.result.problems.filter((p) => p.code === 'WARN-GPU-ORPHAN-ID')
    expect(problems).toHaveLength(3)
    expect(canFixAll(s, problems)).toBe(true)
    const after = fixAll(s, problems)!
    expect(codes(after)).toEqual([])
    expect(after.history.past).toHaveLength(1)
    expect(codes(undoEdit(after))).toEqual(['WARN-GPU-ORPHAN-ID', 'WARN-GPU-ORPHAN-ID', 'WARN-GPU-ORPHAN-ID'])
  })

  it('enchaîne les corrections d\'un même texte (lignes CSV successives)', async () => {
    const LIST = `${PLU}/codes/InformationUrbaType.csv`
    const s = await broken((f) => f.set(LIST, f.get(LIST)!.replace(/\n?$/, '\n') + '42,00,Secteurs a, b,,\n43,00,Secteurs c, d,,\n'))
    const problems = s.result.problems.filter((p) => p.code === 'ERR-CSV-ROW-LENGTH')
    expect(problems).toHaveLength(2)
    const after = fixAll(s, problems)!
    expect(codes(after)).toEqual([])
    expect(after.texts.get(LIST)!.endsWith('42,00,"Secteurs a, b",,\n43,00,"Secteurs c, d",,\n')).toBe(true)
  })

  it('refuse les corrections à choix multiple', async () => {
    const s = await broken((f) => editJson(f, ZONE_URBA, (d) => {
      d.columns[0].constraints.reference = 'DOC_URBA.IDURB'
      d.columns[1].constraints = { ...d.columns[1].constraints, reference: 'DOC_URBA.IDURB' }
    }))
    const problems = s.result.problems.filter((p) => p.code === 'ERR-REFERENCE-TARGET')
    expect(problems).toHaveLength(2)
    expect(canFixAll(s, problems)).toBe(false)
    expect(fixAll(s, problems)).toBeUndefined()
  })
})
