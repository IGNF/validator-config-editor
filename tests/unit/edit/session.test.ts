import { describe, expect, it } from 'vitest'
import { setAt } from '@core/edit/pointer'
import { allFiles, changedFiles, dataOf, edit, openSession, redoEdit, reformatted, textOf, undoEdit } from '@core/edit/session'
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
