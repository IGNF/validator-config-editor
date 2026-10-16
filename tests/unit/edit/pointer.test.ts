import { describe, expect, it } from 'vitest'
import { getAt, insertAt, moveAt, removeAt, setAt } from '@core/edit/pointer'

const doc = { name: 'T', columns: [{ name: 'A', constraints: { required: true } }, { name: 'B' }], 'a/b': 1 }

describe('édition par pointeur', () => {
  it('lit une valeur', () => {
    expect(getAt(doc, '/columns/0/constraints/required')).toBe(true)
    expect(getAt(doc, '/a~1b')).toBe(1)
    expect(getAt(doc, '/columns/5/name')).toBeUndefined()
    expect(getAt(doc, '')).toBe(doc)
  })

  it('modifie sans muter, en gardant la position des clés et en partageant le reste', () => {
    const out = setAt(doc, '/columns/0/name', 'Z')
    expect(out.columns[0]!.name).toBe('Z')
    expect(doc.columns[0]!.name).toBe('A')
    expect(Object.keys(out.columns[0]!)).toEqual(['name', 'constraints'])
    expect(out.columns[1]).toBe(doc.columns[1])
  })

  it('ajoute une nouvelle clé en fin d\'objet, en créant les objets intermédiaires', () => {
    const out = setAt(doc, '/columns/1/constraints/maxLength', 5)
    expect(out.columns[1]).toEqual({ name: 'B', constraints: { maxLength: 5 } })
    expect(Object.keys(setAt(doc, '/description', 'x'))).toEqual(['name', 'columns', 'a/b', 'description'])
  })

  it('retire une clé ou un élément, et ignore un chemin absent', () => {
    expect(removeAt(doc, '/columns/0/constraints/required').columns[0]!.constraints).toEqual({})
    expect(removeAt(doc, '/columns/0').columns.map((c) => c.name)).toEqual(['B'])
    expect(removeAt(doc, '/absent/x')).toBe(doc)
    expect(removeAt(doc, '/columns/9')).toBe(doc)
    expect(removeAt(doc, '')).toBe(doc)
  })

  it('insère et déplace dans un tableau', () => {
    expect(insertAt(doc, '/columns', { name: 'C' }).columns.map((c) => c.name)).toEqual(['A', 'B', 'C'])
    expect(insertAt(doc, '/columns', { name: 'C' }, 0).columns.map((c) => c.name)).toEqual(['C', 'A', 'B'])
    expect(insertAt({}, '/list', 1)).toEqual({ list: [1] })
    expect(moveAt(doc, '/columns', 0, 1).columns.map((c) => c.name)).toEqual(['B', 'A'])
    expect(moveAt(doc, '/columns', 0, 5).columns).toBe(doc.columns)
  })
})
