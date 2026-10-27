import { describe, expect, it } from 'vitest'
import { addCsvRow, csvEditable, csvField, removeCsvRow, setCsvCell } from '@core/edit/csv-edit'

const TEXT = 'TYPEPSC,STYPEPSC,LIBELLE\r\n01,00,Espace boisé\r\n"01","01","EBC, protégé"\r\n'

describe('édition d\'une liste de codes', () => {
  it('valeur modifiée : seule sa ligne change, fins de ligne conservées', () => {
    const out = setCsvCell(TEXT, 0, 2, 'Espace boisé classé')
    expect(out).toBe('TYPEPSC,STYPEPSC,LIBELLE\r\n01,00,Espace boisé classé\r\n"01","01","EBC, protégé"\r\n')
    expect(setCsvCell(TEXT, 1, 2, 'EBC "à" protéger')).toBe('TYPEPSC,STYPEPSC,LIBELLE\r\n01,00,Espace boisé\r\n01,01,"EBC ""à"" protéger"\r\n')
  })

  it('ligne ajoutée à la fin, ligne retirée', () => {
    expect(addCsvRow(TEXT, ['99', '00', 'Autre'])).toBe(`${TEXT}99,00,Autre\r\n`)
    expect(addCsvRow('A,B\n1,2')).toBe('A,B\n1,2\n,\n')
    expect(addCsvRow('ETAT\n01', ['NOUVEAU'])).toBe('ETAT\n01\nNOUVEAU\n')
    expect(removeCsvRow(TEXT, 0)).toBe('TYPEPSC,STYPEPSC,LIBELLE\r\n"01","01","EBC, protégé"\r\n')
  })

  it('éditable seulement sans champ sur plusieurs lignes', () => {
    expect(csvEditable(TEXT)).toBe(true)
    expect(csvEditable('A,B\n"1\n2",3\n')).toBe(false)
    expect(csvEditable('A,B\n"1,2\n')).toBe(false)
  })

  it('guillemets seulement si nécessaire', () => {
    expect(csvField('01')).toBe('01')
    expect(csvField('a,b')).toBe('"a,b"')
    expect(csvField(' a')).toBe('" a"')
  })
})
