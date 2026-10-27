import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { codeLists, copyCodeList, createCodeList } from '@core/edit/codelists'
import { addCode, addColumn, addFile } from '@core/edit/operations'
import { allIds, applyChanges, edit, openSession, type Session } from '@core/edit/session'
import { fixesFor } from '@core/fixes/catalog'
import { checkConfig } from '@core/validation/validate'
import { editJson, FIXTURES, memoryFs, readConfig } from '../../support/fixtures'

// Feature 010, US2 : règles de l'import GpU, sur une configuration avec variables.json.
const DICTIONARY = readFileSync(join(import.meta.dirname, '../../fixtures/variables.json'), 'utf8')
const PLU = 'cnig_PLU_2017'
const MEC = 'GPU_MEC_2025'
const ZONE_URBA = `${PLU}/types/ZONE_URBA.json`
const DOC_URBA = `${PLU}/types/DOC_URBA.json`
const MEC_TABLE = `${MEC}/types/MEC.json`

const gpuConfig = (edit: (files: Map<string, string>) => void = () => {}, withVariables = true) => {
  const files = readConfig()
  if (withVariables) files.set('variables.json', DICTIONARY)
  edit(files)
  return files
}
const problems = async (files: Map<string, string>) => (await checkConfig(memoryFs(files))).problems
const codes = async (files: Map<string, string>) => (await problems(files)).map((p) => p.code)
const json = (files: Map<string, string>, path: string) => JSON.parse(files.get(path)!) as Record<string, any>

describe('configuration GpU (variables.json)', () => {
  it('les fixtures respectent les règles de l\'import', async () => {
    expect(await problems(gpuConfig())).toEqual([])
  })

  it('id de colonne déjà utilisé dans un autre modèle : erreur sur l\'une des deux occurrences, l\'autre nommée', async () => {
    const found = await problems(gpuConfig((f) => editJson(f, MEC_TABLE, (d) => { d.columns[0].id = json(f, ZONE_URBA).columns[0].id })))
    // Modèles parcourus dans l'ordre des dossiers : GPU_MEC_2025 avant cnig_PLU_2017.
    expect(found).toMatchObject([{ code: 'ERR-ID-DUPLICATE', file: ZONE_URBA, pointer: '/columns/0/id' }])
    expect(found[0]!.message).toContain(`${MEC_TABLE}#/columns/0/id`)
  })

  it('id de colonne partagé par deux tables du même modèle : erreur (acceptée hors GpU)', async () => {
    const edit = (f: Map<string, string>) => editJson(f, ZONE_URBA, (d) => { d.columns[0].id = json(f, DOC_URBA).columns[0].id })
    expect(await codes(gpuConfig(edit))).toEqual(['ERR-ID-DUPLICATE'])
    expect(await codes(gpuConfig(edit, false))).toEqual([])
  })

  it('doublon dans un même modèle : signalé une seule fois (règle existante)', async () => {
    expect(await codes(gpuConfig((f) => editJson(f, `${PLU}/files.json`, (d) => { d.files[1].id = d.files[0].id })))).toEqual(['ERR-ID-DUPLICATE'])
  })

  it('id manquant : erreur, corrigée par un nouvel identifiant (annulable)', async () => {
    const files = gpuConfig((f) => editJson(f, `${PLU}/files.json`, (d) => { delete d.files[2].id }))
    const missing = (await problems(files)).filter((p) => p.code === 'ERR-GPU-ID-MISSING')
    expect(missing).toMatchObject([{ file: `${PLU}/files.json`, pointer: '/files/2' }])
    const s = await openSession(files)
    const fix = fixesFor(s, s.result.problems.find((p) => p.code === 'ERR-GPU-ID-MISSING')!)
    expect(fix).toHaveLength(1)
    const after = applyChanges(s, fix[0]!.changes)
    expect(after.result.problems.filter((p) => p.code === 'ERR-GPU-ID-MISSING')).toEqual([])
    expect((after.result.project.models.get(PLU)!.document!.data as any).files[2].id).toMatch(/^[0-9a-f]{32}$/)
  })

  it('id manquant sur le modèle, une liste, une table, une colonne', async () => {
    const found = await problems(gpuConfig((f) => {
      editJson(f, `${PLU}/files.json`, (d) => { delete d.id; delete d.codes[0].id })
      editJson(f, ZONE_URBA, (d) => { delete d.id; delete d.columns[3].id })
    }))
    expect(found.filter((p) => p.code === 'ERR-GPU-ID-MISSING').map((p) => `${p.file} ${p.pointer}`).sort()).toEqual(
      [`${PLU}/files.json `, `${PLU}/files.json /codes/0`, `${ZONE_URBA} `, `${ZONE_URBA} /columns/3`].sort(),
    )
  })

  it('sans variables.json : id facultatifs', async () => {
    expect(await codes(gpuConfig((f) => editJson(f, `${PLU}/files.json`, (d) => { delete d.files[2].id }), false))).toEqual([])
  })

  it('configurations connues sans variables.json (dgpr, naviforest, ppr) : inchangées', async () => {
    for (const name of ['dgpr', 'naviforest', 'ppr']) {
      expect((await problems(readConfig(join(FIXTURES, '../known', name)))).filter((p) => p.severity === 'error')).toEqual([])
    }
  })
})

// US3 : les créations de l'éditeur ont un id absent de toute la configuration (FR-004).
describe('identifiants des créations sur une configuration GpU', () => {
  const created = (before: Set<string>, after: Session) => [...allIds(after)].filter((id) => !before.has(id))

  it.each([
    ['copie de liste depuis un autre modèle', (s: Session) => applyChanges(s, copyCodeList(s, codeLists(s).find((l) => l.model === PLU)!, MEC, 'ListeCopiee'))],
    ['création de liste', (s: Session) => applyChanges(s, createCodeList(s, PLU, 'ListeNouvelle', ['CODE', 'LIBELLE']))],
    ['ajout d\'un fichier attendu', (s: Session) => edit(s, `${PLU}/files.json`, (d) => addFile(d, allIds(s)))],
    ['ajout d\'une colonne', (s: Session) => edit(s, ZONE_URBA, (d) => addColumn(d, allIds(s)))],
    ['déclaration d\'une liste existante', (s: Session) => edit(s, `${MEC}/files.json`, (d) => addCode(d, allIds(s), '../cnig_PLU_2017/codes/ListeEtatPLU.csv', 'ListeEtat'))],
  ])('%s : nouvel id unique, aucune erreur de l\'import', async (_, create) => {
    const s = await openSession(gpuConfig())
    const before = allIds(s)
    const after = create(s)
    const ids = created(before, after)
    expect(ids).toHaveLength(1)
    expect(ids[0]).toMatch(/^[0-9a-f]{32}$/)
    expect(after.result.problems.filter((p) => p.code === 'ERR-ID-DUPLICATE' || p.code.startsWith('ERR-GPU-'))).toEqual([])
  })
})
