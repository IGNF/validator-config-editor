import { describe, expect, it } from 'vitest'
import { fileTypeLabel, groupByFamily, mandatoryLabel, modelFamily } from '@core/labels'

describe('libellés métier', () => {
  it('présence et type de fichier', () => {
    expect(mandatoryLabel('ERROR')).toBe('Obligatoire')
    expect(mandatoryLabel(undefined)).toBe('Recommandé')
    expect(mandatoryLabel('OPTIONAL')).toBe('Facultatif')
    expect(fileTypeLabel('multi_table')).toBe('Base multi-tables (GeoPackage…)')
    expect(fileTypeLabel('inconnu')).toBe('inconnu')
  })
})

describe('familles de modèles', () => {
  it.each([
    ['cnig_PLU_2017', 'cnig_PLU'], ['cnig_SUP_A1_2016', 'cnig_SUP'], ['cnig_SUP_XXX_2013', 'cnig_SUP'], ['GPU_MEC_2025', 'GPU_MEC'],
    ['cnig_PPR_v1.0_geopackage', 'cnig_PPR'], ['cnig_SNDD_2019', 'cnig_SNDD'], ['Canalisations', 'Canalisations'],
    ['directive_inondation_2019', 'directive_inondation'],
  ])('%s → %s', (name, family) => {
    expect(modelFamily(name)).toBe(family)
  })

  it('regroupe par famille, une famille d\'un seul modèle restant seule', () => {
    const models = ['GPU_MEC_2025', 'cnig_PLU_2013', 'cnig_PLU_2017', 'cnig_SUP_A1_2016'].map((name) => ({ name }))
    expect(groupByFamily(models)).toEqual([
      { name: 'GPU_MEC_2025' },
      { family: 'cnig_PLU', models: [{ name: 'cnig_PLU_2013' }, { name: 'cnig_PLU_2017' }] },
      { name: 'cnig_SUP_A1_2016' },
    ])
  })
})
