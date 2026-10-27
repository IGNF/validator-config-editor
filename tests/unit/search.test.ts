import { describe, expect, it } from 'vitest'
import { search } from '@core/search'
import { checkConfig } from '@core/validation/validate'
import { memoryFs } from '../support/fixtures'

const result = await checkConfig(memoryFs())

describe('search', () => {
  it('colonne par son nom, dans tous les modèles, avec son pointeur', () => {
    const found = search(result, 'typezone').results.filter((r) => r.kind === 'colonne')
    expect(found[0]).toMatchObject({ model: 'cnig_PLU_2017', file: 'cnig_PLU_2017/types/ZONE_URBA.json', label: 'cnig_PLU_2017 › ZONE_URBA.TYPEZONE', field: 'nom' })
    expect(found[0]!.pointer).toMatch(/^\/columns\/\d+$/)
  })

  it('fichier attendu, liste, valeur de liste (ligne du CSV)', () => {
    expect(search(result, 'ListeEtatPLU').results.map((r) => r.kind)).toContain('liste')
    const value = search(result, 'AUc').results.find((r) => r.kind === 'valeur')
    expect(value).toMatchObject({ file: 'cnig_PLU_2017/codes/ListeTypezonePLU.csv', label: 'cnig_PLU_2017 › ListeTypezonePLU' })
    expect(value!.pointer).toMatch(/^\/\d+$/)
    expect(search(result, 'ZONE_URBA').results.some((r) => r.kind === 'fichier' && r.field === 'nom')).toBe(true)
  })

  it('motif d\'une regex, identifiant ; casse ignorée ; requête trop courte', () => {
    expect(search(result, '_ZO[0-9]+').results.some((r) => r.kind === 'colonne' && r.field === 'motif')).toBe(true)
    expect(search(result, 'a').results).toEqual([])
    expect(search(result, 'ZONE_URBA').results.length).toBe(search(result, 'zone_urba').results.length)
  })

  it('limite du nombre de résultats', () => {
    const { results, truncated } = search(result, 'ce', 5)
    expect(results).toHaveLength(5)
    expect(truncated).toBe(true)
  })
})
