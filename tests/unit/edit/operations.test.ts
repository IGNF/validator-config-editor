import { describe, expect, it } from 'vitest'
import {
  addColumn, addListItem, moveColumn, parseEnum, removeColumn, removeListItem, setConstraint, setListItem, setOrRemove,
} from '@core/edit/operations'

const table = {
  id: 'a'.repeat(32),
  name: 'ZONE_URBA',
  columns: [
    { type: 'String', id: 'b'.repeat(32), name: 'A', constraints: { required: true, maxLength: 3 }, extension: 'x' },
    { type: 'Integer', id: 'c'.repeat(32), name: 'B', constraints: { enum: [0, 1] } },
  ],
  constraints: { conditions: [], foreignKeys: ['(A) REFERENCES L(A)'] },
}
const fixed = (bytes: Uint8Array) => bytes.fill(0xab)

describe('opérations sur une table', () => {
  it('écrit ou retire une propriété selon qu\'elle est vide', () => {
    expect(setOrRemove<Record<string, unknown>>(table, '/description', 'Zones').description).toBe('Zones')
    expect('description' in setOrRemove({ ...table, description: 'x' }, '/description', '')).toBe(false)
  })

  it('ajoute une colonne String avec un id unique et un nom libre', () => {
    const once = addColumn(table, new Set(), fixed)
    expect(once.columns.at(-1)).toEqual({
      type: 'String', id: 'ab'.repeat(16), name: 'NOUVELLE_COLONNE', title: 'NOUVELLE_COLONNE', description: '',
      constraints: { required: false, unique: false },
    })
    expect(addColumn(once, new Set()).columns.at(-1)!.name).toBe('NOUVELLE_COLONNE_2')
  })

  it('n\'ajoute pas d\'id si le modèle n\'en utilise pas (ppr)', () => {
    const noIds = { name: 'T', columns: [{ name: 'A', type: 'String' }] }
    expect('id' in addColumn(noIds, new Set()).columns.at(-1)!).toBe(false)
  })

  it('supprime et déplace une colonne en conservant les autres', () => {
    expect(removeColumn(table, 0).columns).toEqual([table.columns[1]])
    expect(moveColumn(table, 1, 0).columns.map((c) => c.name)).toEqual(['B', 'A'])
  })

  it('modifie une contrainte en conservant les propriétés inconnues', () => {
    const out = setConstraint(table, 0, 'maxLength', 5)
    expect(out.columns[0]).toEqual({ ...table.columns[0], constraints: { required: true, maxLength: 5 } })
    expect(setConstraint(table, 0, 'required', false).columns[0]!.constraints).toEqual({ required: false, maxLength: 3 })
    expect(setConstraint(table, 0, 'maxLength', '').columns[0]!.constraints).toEqual({ required: true })
    expect(setConstraint(table, 0, 'pattern', '[0-9]+').columns[0]!.constraints).toEqual({ required: true, maxLength: 3, pattern: '[0-9]+' })
  })

  it('lit des valeurs autorisées en gardant les nombres', () => {
    expect(parseEnum('0\n1\n -1 \n', [0, 1])).toEqual([0, 1, -1])
    expect(parseEnum('01\n02', ['01'])).toEqual(['01', '02'])
    expect(parseEnum('a\n\nb', undefined)).toEqual(['a', 'b'])
    expect(setConstraint(table, 1, 'enum', parseEnum('', [0]))).toEqual({ ...table, columns: [table.columns[0], { ...table.columns[1], constraints: {} }] })
  })

  it('ajoute, modifie et supprime clés étrangères et conditions', () => {
    expect(addListItem(table, 'conditions', 'A IS NOT NULL').constraints.conditions).toEqual(['A IS NOT NULL'])
    expect(setListItem(table, 'foreignKeys', 0, '(B) REFERENCES L(B)').constraints.foreignKeys).toEqual(['(B) REFERENCES L(B)'])
    expect(removeListItem(table, 'foreignKeys', 0).constraints.foreignKeys).toEqual([])
    expect(addListItem({ name: 'T', columns: [] }, 'foreignKeys')).toEqual({ name: 'T', columns: [], constraints: { foreignKeys: [''] } })
  })
})
