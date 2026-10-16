import { describe, expect, it } from 'vitest'
import { setAt } from '@core/edit/pointer'
import {
  allFiles, allIds, applyChanges, changedFiles, createdFiles, dataOf, edit, isChanged, openSession, redoEdit, reformatted, textOf, undoEdit,
} from '@core/edit/session'
import { readConfig } from '../../support/fixtures'

const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
const setMaxLength = (n: number) => (d: unknown) => setAt(d, '/columns/7/constraints/maxLength', n)

describe('session d\'édition', () => {
  it('s\'ouvre sans modification ni problème sur les fixtures', async () => {
    const s = await openSession(readConfig())
    expect(s.edited.size).toBe(0)
    expect(s.result.problems).toEqual([])
    expect(changedFiles(s).size).toBe(0)
  })

  it('applique une édition, revalide, et ne change que la ligne modifiée', async () => {
    const originals = readConfig()
    let s = await openSession(originals)
    s = edit(s, ZONE_URBA, (d) => setAt(d, '/columns/0/constraints/reference', 'INCONNUE.ID'))
    expect(s.result.problems.map((p) => p.code)).toEqual(['ERR-REFERENCE-TARGET'])
    s = edit(undoEdit(s), ZONE_URBA, setMaxLength(5))
    const before = originals.get(ZONE_URBA)!.split('\n')
    const after = textOf(s, ZONE_URBA)!.split('\n')
    expect(after.length).toBe(before.length)
    expect(after.filter((l, i) => l !== before[i])).toEqual(['                "maxLength": 5'])
    expect([...changedFiles(s).keys()]).toEqual([ZONE_URBA])
  })

  it('annule et rétablit ; revenir à l\'état d\'origine retire la modification', async () => {
    let s = await openSession(readConfig())
    const original = dataOf(s, ZONE_URBA)
    s = edit(s, ZONE_URBA, setMaxLength(5), 'max', 0)
    s = edit(s, ZONE_URBA, setMaxLength(6), 'max', 100)
    expect(s.history.past).toHaveLength(1)
    s = undoEdit(s)
    expect(dataOf(s, ZONE_URBA)).toBe(original)
    expect(s.edited.size).toBe(0)
    s = redoEdit(s)
    expect((dataOf(s, ZONE_URBA) as any).columns[7].constraints.maxLength).toBe(6)
    expect(undoEdit(undoEdit(s)).edited.size).toBe(0)
    expect(redoEdit(redoEdit(s))).toBe(redoEdit(s))
  })

  it('considère comme non modifié un fichier revenu au même texte par une autre voie', async () => {
    let s = await openSession(readConfig())
    s = edit(s, ZONE_URBA, setMaxLength(5))
    s = edit(s, ZONE_URBA, setMaxLength(3))
    expect(s.edited.size).toBe(0)
    expect(s.history.past).toHaveLength(2)
  })

  it('ignore une édition sans effet et refuse un fichier non éditable', async () => {
    const s = await openSession(readConfig())
    expect(edit(s, ZONE_URBA, (d) => d)).toBe(s)
    expect(() => edit(s, 'cnig_PLU_2017/codes/ListeEtatPLU.csv', (d) => d)).toThrow('non éditable')
  })

  it('fournit tous les fichiers, d\'origine octet pour octet sauf ceux modifiés', async () => {
    const originals = readConfig()
    const s = edit(await openSession(originals), ZONE_URBA, setMaxLength(5))
    const all = allFiles(s)
    expect([...all.keys()].sort()).toEqual([...originals.keys()].filter((p) => /\.(json|csv)$/.test(p)).sort())
    for (const [p, t] of all) if (p !== ZONE_URBA) expect(t).toBe(originals.get(p))
  })

  it('signale les fichiers modifiés qui seront réindentés', async () => {
    const originals = readConfig()
    originals.set(ZONE_URBA, originals.get(ZONE_URBA)!.replace('{', '{\n'))
    const s = edit(await openSession(originals), ZONE_URBA, setMaxLength(5))
    expect(reformatted(s)).toEqual([ZONE_URBA])
  })
})

describe('allIds', () => {
  it('rassemble les id de toute la configuration, modifications comprises', async () => {
    let s = await openSession(readConfig())
    const ids = allIds(s)
    expect(ids.has('7833f9f88c20ca7b5a63cc0ad198a9a2')).toBe(true)
    s = edit(s, ZONE_URBA, (d) => setAt(d, '/columns/0/id', 'f'.repeat(32)))
    expect(allIds(s).has('f'.repeat(32))).toBe(true)
  })
})

describe('modifications de textes et créations (004)', () => {
  const ETAT = 'cnig_PLU_2017/codes/ListeEtatPLU.csv'
  const NEW = 'cnig_PLU_2017/codes/ListeNouvelle.csv'

  it('modifie le texte d\'une liste, revalide, et annule', async () => {
    let s = await openSession(readConfig())
    s = applyChanges(s, [{ path: ETAT, kind: 'text', text: 'ETAT\n01\n02,03\n' }])
    expect(s.result.problems.map((p) => `${p.code} ${p.pointer}`)).toEqual(['ERR-CSV-ROW-LENGTH /3'])
    expect(isChanged(s, ETAT)).toBe(true)
    expect(textOf(s, ETAT)).toBe('ETAT\n01\n02,03\n')
    s = undoEdit(s)
    expect(s.result.problems).toEqual([])
    expect(isChanged(s, ETAT)).toBe(false)
  })

  it('crée un fichier et déclare la liste en un seul pas, annulable', async () => {
    const files = readConfig()
    let s = await openSession(files)
    s = applyChanges(s, [
      { path: NEW, kind: 'text', text: 'CODE\nA\n' },
      { path: 'cnig_PLU_2017/files.json', kind: 'json', update: (d) => setAt(d, '/codes/-', { data: './codes/ListeNouvelle.csv', name: 'ListeNouvelle' }) },
    ])
    expect(s.history.past).toHaveLength(1)
    expect(createdFiles(s)).toEqual([NEW])
    expect(s.result.problems).toEqual([])
    expect(s.result.project.models.get('cnig_PLU_2017')!.csvs.get(NEW)?.csv?.header).toEqual(['CODE'])
    expect(allFiles(s).get(NEW)).toBe('CODE\nA\n')
    expect([...changedFiles(s).keys()].sort()).toEqual([NEW, 'cnig_PLU_2017/files.json'])

    s = undoEdit(s)
    expect(createdFiles(s)).toEqual([])
    expect(allFiles(s).has(NEW)).toBe(false)
    expect(s.result.project.models.get('cnig_PLU_2017')!.csvs.has(NEW)).toBe(false)
    s = redoEdit(s)
    expect(createdFiles(s)).toEqual([NEW])
  })

  it('enchaîne deux éditions d\'un même fichier dans un pas', async () => {
    let s = await openSession(readConfig())
    s = applyChanges(s, [
      { path: ZONE_URBA, kind: 'json', update: setMaxLength(5) },
      { path: ZONE_URBA, kind: 'json', update: (d) => setAt(d, '/title', 'Zones') },
    ])
    expect(s.history.past[0]!.changes).toHaveLength(1)
    expect((dataOf(s, ZONE_URBA) as any).title).toBe('Zones')
  })
})
