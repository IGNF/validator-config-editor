import { describe, expect, it } from 'vitest'
import { outgoingRefs, scopeFiles } from '@core/export'
import { applyChanges, openSession } from '@core/edit/session'
import { editJson, readConfig } from '../support/fixtures'

const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'

describe('scopeFiles', () => {
  it('toute la configuration : tous les fichiers *.json et *.csv, triés', async () => {
    const files = readConfig()
    const s = await openSession(files)
    expect(scopeFiles(s, { kind: 'all' })).toEqual([...files.keys()].filter((p) => /\.(json|csv)$/.test(p)).sort())
  })

  it('un fichier : ce fichier seul, s\'il existe', async () => {
    const s = await openSession(readConfig())
    expect(scopeFiles(s, { kind: 'file', path: ZONE_URBA })).toEqual([ZONE_URBA])
    expect(scopeFiles(s, { kind: 'file', path: 'cnig_PLU_2017/types/INCONNU.json' })).toEqual([])
  })

  it('inclut les fichiers créés dans la session', async () => {
    const created = 'GPU_MEC_2025/codes/ListeTest.csv'
    const s = applyChanges(await openSession(readConfig()), [{ path: created, kind: 'text', text: 'CODE\n' }])
    expect(scopeFiles(s, { kind: 'all' })).toContain(created)
    expect(scopeFiles(s, { kind: 'file', path: created })).toEqual([created])
  })
})

describe('scopeFiles, portée modèle', () => {
  it('tous les fichiers du dossier du modèle, et rien d\'autre', async () => {
    const files = readConfig()
    const s = await openSession(files)
    const expected = [...files.keys()].filter((p) => p.startsWith('cnig_PLU_2017/') && /\.(json|csv)$/.test(p)).sort()
    expect(scopeFiles(s, { kind: 'model', model: 'cnig_PLU_2017' })).toEqual(expected)
    // Pas de confusion avec un modèle dont le nom commence pareil.
    const bis = new Map(files)
    bis.set('cnig_PLU_2017_bis/gpu.json', '{}')
    expect(scopeFiles(await openSession(bis), { kind: 'model', model: 'cnig_PLU_2017' })).toEqual(expected)
  })

  it('dossier sans files.json : ses fichiers', async () => {
    const files = readConfig()
    files.set('orphelin/gpu.json', '{}')
    expect(scopeFiles(await openSession(files), { kind: 'model', model: 'orphelin' })).toEqual(['orphelin/gpu.json'])
  })
})

describe('outgoingRefs', () => {
  it('aucune référence sortante dans les fixtures', async () => {
    const s = await openSession(readConfig())
    for (const model of s.result.project.models.keys()) expect(outgoingRefs(s, model)).toEqual([])
  })

  it('modèles de table et listes de codes hors du dossier ; URL et auto ignorés', async () => {
    const files = readConfig()
    editJson(files, 'GPU_MEC_2025/files.json', (d) => {
      d.codes = [
        { data: '../cnig_PLU_2017/codes/ListeEtatPLU.csv', name: 'ListeEtatPLU' },
        { data: 'https://example.org/liste.csv', name: 'Distante' },
      ]
      d.files.push({ type: 'table', path: 'X', name: 'ZONE_URBA', tableModel: '../cnig_PLU_2017/types/ZONE_URBA.json' })
      d.files.push({ type: 'table', path: 'Y', name: 'AUTO', tableModel: 'auto' })
    })
    const s = await openSession(files)
    expect(outgoingRefs(s, 'GPU_MEC_2025')).toEqual(['../cnig_PLU_2017/codes/ListeEtatPLU.csv', '../cnig_PLU_2017/types/ZONE_URBA.json'])
  })
})
