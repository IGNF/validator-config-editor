import { describe, expect, it } from 'vitest'
import { parseCsv } from '@core/load/csv'

describe('parseCsv', () => {
  it('lit un en-tête et des lignes', () => {
    expect(parseCsv('ETAT\n01\n02\n')).toEqual({ ok: true, csv: { header: ['ETAT'], rows: [['01'], ['02']] } })
  })

  it('lit plusieurs colonnes, valeurs vides comprises', () => {
    const r = parseCsv('TYPEINF,STYPEINF,LIBELLE\n00,00,\n02,00,Zone\n')
    expect(r).toEqual({ ok: true, csv: { header: ['TYPEINF', 'STYPEINF', 'LIBELLE'], rows: [['00', '00', ''], ['02', '00', 'Zone']] } })
  })

  it('gère guillemets, virgules, guillemets doublés et sauts de ligne entre guillemets', () => {
    const r = parseCsv('A,B\n"x, y","il dit ""oui"""\n"ligne 1\nligne 2",z\n')
    expect(r).toEqual({ ok: true, csv: { header: ['A', 'B'], rows: [['x, y', 'il dit "oui"'], ['ligne 1\nligne 2', 'z']] } })
  })

  it('gère \\r\\n, le BOM et l\'absence de saut de ligne final', () => {
    expect(parseCsv('\uFEFFA,B\r\n1,2\r\n3,4')).toEqual({ ok: true, csv: { header: ['A', 'B'], rows: [['1', '2'], ['3', '4']] } })
  })

  it('signale un guillemet non fermé à sa ligne', () => {
    expect(parseCsv('A\n1\n"2\n3\n')).toMatchObject({ ok: false, errors: [{ code: 'ERR-CSV-SYNTAX', line: 3 }] })
  })

  it.each([
    ['vide', '', 'en-tête absent'],
    ['avec un nom vide', 'A,,C\n1,2,3\n', 'nom de colonne vide'],
    ['avec un nom dupliqué', 'A,A\n1,2\n', 'colonne « A » dupliquée'],
  ])('signale un en-tête %s', (_label, text, reason) => {
    expect(parseCsv(text)).toMatchObject({ ok: false, errors: [{ code: 'ERR-CSV-HEADER', params: { reason } }] })
  })

  it('signale chaque ligne de longueur différente, avec son numéro', () => {
    expect(parseCsv('A,B\n1,2\n3,4,5\n6\n')).toEqual({
      ok: false,
      errors: [
        { code: 'ERR-CSV-ROW-LENGTH', line: 3, params: { count: 3, expected: 2 } },
        { code: 'ERR-CSV-ROW-LENGTH', line: 4, params: { count: 1, expected: 2 } },
      ],
    })
  })
})
