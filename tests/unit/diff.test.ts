import { describe, expect, it } from 'vitest'
import { hunks, lineDiff } from '@core/diff'
import { setAt } from '@core/edit/pointer'
import { applyChanges, changedFiles, edit, isChanged, openSession, revertFile, textOf, undoEdit } from '@core/edit/session'
import { readConfig } from '../support/fixtures'

const kinds = (a: string, b: string) => lineDiff(a, b).map((l) => `${l.kind[0]}${l.before ?? '-'}${l.after ?? '-'} ${l.text}`)

describe('lineDiff', () => {
  it('ligne modifiée, ajoutée, retirée ; numéros avant et après', () => {
    expect(kinds('a\nb\nc\nd\n', 'a\nB\nc\nd\ne\n')).toEqual(['s11 a', 'd2- b', 'a-2 B', 's33 c', 's44 d', 'a-5 e'])
    expect(kinds('a\nb\n', 'b\n')).toEqual(['d1- a', 's21 b'])
    expect(kinds('', 'x\n')).toEqual(['a-1 x'])
    expect(kinds('x\n', 'x\n')).toEqual(['s11 x'])
  })

  it('blocs avec contexte', () => {
    const before = Array.from({ length: 20 }, (_, i) => `l${i + 1}`).join('\n')
    const after = before.replace('l3', 'L3').replace('l18', 'L18')
    const blocks = hunks(lineDiff(before, after), 2)
    expect(blocks).toHaveLength(2)
    expect(blocks[0]!.lines.map((l) => l.text)).toEqual(['l1', 'l2', 'l3', 'L3', 'l4', 'l5'])
  })
})

describe('revertFile', () => {
  const ZONE = 'cnig_PLU_2017/types/ZONE_URBA.json'
  const CSV = 'cnig_PLU_2017/codes/ListeEtatPLU.csv'

  it('JSON et CSV modifiés : texte d\'origine, un pas annulable', async () => {
    let s = await openSession(readConfig())
    const original = textOf(s, ZONE)
    s = edit(s, ZONE, (d) => setAt(d, '/columns/0/constraints/maxLength', 5))
    s = applyChanges(s, [{ path: CSV, kind: 'text', text: 'ETAT\n01\n' }])
    expect([...changedFiles(s).keys()].sort()).toEqual([CSV, ZONE])
    const reverted = revertFile(s, ZONE)
    expect(isChanged(reverted, ZONE)).toBe(false)
    expect(textOf(reverted, ZONE)).toBe(original)
    expect(isChanged(reverted, CSV)).toBe(true)
    expect(isChanged(undoEdit(reverted), ZONE)).toBe(true)
    expect(isChanged(revertFile(reverted, CSV), CSV)).toBe(false)
  })

  it('fichier créé : retiré', async () => {
    let s = await openSession(readConfig())
    s = applyChanges(s, [{ path: 'cnig_PLU_2017/codes/Nouvelle.csv', kind: 'text', text: 'A\n' }])
    const reverted = revertFile(s, 'cnig_PLU_2017/codes/Nouvelle.csv')
    expect(textOf(reverted, 'cnig_PLU_2017/codes/Nouvelle.csv')).toBeUndefined()
    expect(changedFiles(reverted).size).toBe(0)
  })
})
