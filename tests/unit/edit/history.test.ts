import { describe, expect, it } from 'vitest'
import { emptyHistory, record, redo, undo, type Step } from '@core/edit/history'

const step = (after: number, extra: Partial<Step> = {}): Step => ({ changes: [{ path: 'f.json', kind: 'json', before: after - 1, after }], at: after * 10_000, ...extra })
const single = (path: string, before: string, after: string, key: string | undefined, at: number): Step => ({
  changes: [{ path, kind: 'json', before, after }], ...(key !== undefined && { key }), at,
})

describe('historique', () => {
  it('annule et rétablit dans l\'ordre', () => {
    let h = record(record(emptyHistory(), step(1)), step(2))
    const u = undo(h)!
    expect(u.step.changes[0]!.before).toBe(1)
    h = u.history
    expect(undo(h)!.step.changes[0]!.before).toBe(0)
    const r = redo(h)!
    expect(r.step.changes[0]!.after).toBe(2)
    expect(redo(r.history)).toBeUndefined()
    expect(undo(emptyHistory())).toBeUndefined()
  })

  it('une nouvelle édition efface les pas à rétablir', () => {
    const h = undo(record(emptyHistory(), step(1)))!.history
    expect(record(h, step(3)).future).toEqual([])
  })

  it('fusionne les saisies d\'un même champ en moins d\'1 s', () => {
    let h = record(emptyHistory(), single('f', 'a', 'ab', 'name', 0))
    h = record(h, single('f', 'ab', 'abc', 'name', 500))
    expect(h.past).toEqual([single('f', 'a', 'abc', 'name', 500)])
    h = record(h, single('f', 'abc', 'abcd', 'name', 2000))
    h = record(h, single('f', 'abcd', 'x', 'title', 2100))
    expect(h.past).toHaveLength(3)
  })

  it('ne fusionne pas un pas à plusieurs fichiers', () => {
    const multi: Step = { changes: [{ path: 'a', kind: 'json', before: 1, after: 2 }, { path: 'b', kind: 'text', before: undefined, after: 'x' }], key: 'k', at: 0 }
    const h = record(record(emptyHistory(), multi), { ...multi, at: 10 })
    expect(h.past).toHaveLength(2)
  })

  it('limite le nombre de pas', () => {
    let h = emptyHistory()
    for (let i = 1; i <= 120; i++) h = record(h, step(i))
    expect(h.past).toHaveLength(100)
    expect(h.past[0]!.changes[0]!.after).toBe(21)
  })
})
