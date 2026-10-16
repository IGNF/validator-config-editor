import { describe, expect, it } from 'vitest'
import { loadProject } from '@core/load/project'
import { indexObjects } from '@core/model/objects'
import { isUrl, resolvePath, tableModelRef } from '@core/model/paths'
import { editJson, memoryFs, readConfig } from '../support/fixtures'

describe('chemins', () => {
  it('résout un chemin relatif au modèle', () => {
    expect(resolvePath('m', './types/T.json')).toBe('m/types/T.json')
    expect(resolvePath('m', 'codes//L.csv')).toBe('m/codes/L.csv')
    expect(resolvePath('m', '../autre/types/T.json')).toBe('autre/types/T.json')
    expect(resolvePath('m', '../../x.json')).toBeUndefined()
    expect(resolvePath('m', '..')).toBeUndefined()
  })

  it('détermine le modèle de table d\'un fichier comme le validator', () => {
    expect(tableModelRef('./types/A.json', 'B')).toBe('./types/A.json')
    expect(tableModelRef(undefined, 'B')).toBe('./types/B.json')
    expect(tableModelRef('AUTO', 'B')).toBeUndefined()
    expect(tableModelRef('https://example.org/B.json', 'B')).toBeUndefined()
    expect(isUrl('file:///x')).toBe(true)
    expect(isUrl('./x')).toBe(false)
  })
})

describe('indexObjects', () => {
  it('indexe modèle, parent, fichiers, codes, tables et colonnes par id', async () => {
    const { project } = await loadProject(memoryFs())
    const plu = indexObjects(project.models.get('cnig_PLU_2017')!)
    const zone = [...plu.values()].find((o) => o.kind === 'table' && o.label === 'ZONE_URBA')!
    expect(zone).toMatchObject({ file: 'cnig_PLU_2017/types/ZONE_URBA.json', pointer: '' })
    expect([...plu.values()].find((o) => o.label === 'ZONE_URBA.TYPEZONE')).toMatchObject({ kind: 'colonne', pointer: expect.stringMatching(/^\/columns\/\d+$/) })
    expect([...plu.values()].find((o) => o.kind === 'liste de codes' && o.label === 'ListeEtatPLU')).toMatchObject({ pointer: expect.stringMatching(/^\/codes\/\d+$/) })
    expect([...plu.values()].filter((o) => o.kind === 'modèle')).toMatchObject([{ label: 'cnig_PLU_2017', pointer: '' }])
    const a1 = indexObjects(project.models.get('cnig_SUP_A1_2016')!)
    expect([...a1.values()].find((o) => o.kind === 'modèle parent')).toMatchObject({ label: 'cnig_SUP_XXX_2016', pointer: '/parent' })
  })

  it('tolère des données non conformes', async () => {
    const files = readConfig()
    editJson(files, 'cnig_PLU_2017/types/ZONE_URBA.json', (d) => {
      d.columns = [null, { id: 'x' }]
      delete d.name
    })
    files.set('cnig_PLU_2017/types/CASSEE.json', '[')
    const { project } = await loadProject(memoryFs(files))
    const index = indexObjects(project.models.get('cnig_PLU_2017')!)
    expect(index.get('x')).toMatchObject({ kind: 'colonne', label: 'ZONE_URBA.2', pointer: '/columns/1' })
  })
})
