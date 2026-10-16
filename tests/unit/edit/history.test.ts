import { describe, expect, it } from 'vitest'
import { emptyHistory, record, redo, undo, type Step } from '@core/edit/history'

const step = (after: number, extra: Partial<Step> = {}): Step => ({ path: 'f.json', before: after - 1, after, at: after * 10_000, ...extra })

describe('historique', () => {
  it('annule et rétablit dans l\'ordre', () => {
    let h = record(record(emptyHistory(), step(1)), step(2))
    const u = undo(h)!
    expect(u.step.before).toBe(1)
    h = u.history
    expect(undo(h)!.step.before).toBe(0)
    const r = redo(h)!
    expect(r.step.after).toBe(2)
    expect(redo(r.history)).toBeUndefined()
    expect(undo(emptyHistory())).toBeUndefined()
  })

  it('une nouvelle édition efface les pas à rétablir', () => {
    const h = undo(record(emptyHistory(), step(1)))!.history
    expect(record(h, step(3)).future).toEqual([])
  })

  it('fusionne les saisies d\'un même champ en moins d\'1 s', () => {
    let h = record(emptyHistory(), { path: 'f', before: 'a', after: 'ab', key: 'name', at: 0 })
    h = record(h, { path: 'f', before: 'ab', after: 'abc', key: 'name', at: 500 })
    expect(h.past).toEqual([{ path: 'f', before: 'a', after: 'abc', key: 'name', at: 500 }])
    h = record(h, { path: 'f', before: 'abc', after: 'abcd', key: 'name', at: 2000 })
    h = record(h, { path: 'f', before: 'abcd', after: 'x', key: 'title', at: 2100 })
    expect(h.past).toHaveLength(3)
  })

  it('limite le nombre de pas', () => {
    let h = emptyHistory()
    for (let i = 1; i <= 120; i++) h = record(h, step(i))
    expect(h.past).toHaveLength(100)
    expect(h.past[0]!.after).toBe(21)
  })
})
