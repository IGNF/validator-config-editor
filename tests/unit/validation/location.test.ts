import { describe, expect, it } from 'vitest'
import { loadProject } from '@core/load/project'
import { describeLocation } from '@core/validation/location'
import { CATALOG } from '@core/validation/messages'
import { problem } from '@core/validation/problems'
import { memoryFs } from '../../support/fixtures'

const PLU = 'cnig_PLU_2017'
const at = async (file: string, pointer?: string, model = PLU) => {
  const { project } = await loadProject(memoryFs())
  return describeLocation(project, problem('ERR-SCHEMA', model, file, pointer))
}

describe('textes en clair', () => {
  it('chaque code a un titre et un conseil', () => {
    for (const [code, entry] of Object.entries(CATALOG)) {
      expect(entry.title, code).not.toBe('')
      expect(entry.hint, code).not.toBe('')
    }
  })
})

describe('describeLocation', () => {
  it.each([
    [`${PLU}/files.json`, undefined, { file: `Modèle ${PLU}` }],
    [`${PLU}/files.json`, '/name', { file: `Modèle ${PLU}`, element: 'Nom' }],
    [`${PLU}/files.json`, '/constraints/folderName', { file: `Modèle ${PLU}`, element: 'Nom de dossier' }],
    [`${PLU}/files.json`, '/files/0', { file: `Modèle ${PLU}`, element: 'Fichier Donnees_geographiques' }],
    [`${PLU}/files.json`, '/codes/0/data', { file: `Modèle ${PLU}`, element: 'Liste ListeTypedocPLU · fichier' }],
    [`${PLU}/types/ZONE_URBA.json`, '/columns/7/constraints/reference', { file: 'Table ZONE_URBA', element: 'Colonne TYPEZONE · référence' }],
    [`${PLU}/types/ZONE_URBA.json`, '/columns/7/type', { file: 'Table ZONE_URBA', element: 'Colonne TYPEZONE · type' }],
    [`${PLU}/types/ZONE_URBA.json`, '/columns/7', { file: 'Table ZONE_URBA', element: 'Colonne TYPEZONE' }],
    [`${PLU}/types/ZONE_URBA.json`, '/constraints/foreignKeys/0', { file: 'Table ZONE_URBA', element: 'Clé étrangère 1' }],
    [`${PLU}/types/ZONE_URBA.json`, '/id', { file: 'Table ZONE_URBA', element: 'Identifiant' }],
    [`${PLU}/codes/ListeEtatPLU.csv`, '/39', { file: 'Liste ListeEtatPLU', element: 'Ligne 39' }],
    [`${PLU}/codes/ListeEtatPLU.csv`, undefined, { file: 'Liste ListeEtatPLU' }],
    [`${PLU}/gpu.json`, '/validator_feature_type/7833f9f88c20ca7b5a63cc0ad198a9a2', { file: `Surcharges GpU de ${PLU}`, element: 'Surcharge de table table ZONE_URBA' }],
    [`${PLU}/gpu.json`, '/validator_file_model/0123456789abcdef0123456789abcdef', { file: `Surcharges GpU de ${PLU}`, element: 'Surcharge de fichier 01234567…' }],
    ['orphelin/', undefined, { file: 'Modèle orphelin' }],
  ])('%s %s', async (file, pointer, expected) => {
    expect(await at(file, pointer, file.slice(0, file.indexOf('/')))).toEqual(expected)
  })
})
