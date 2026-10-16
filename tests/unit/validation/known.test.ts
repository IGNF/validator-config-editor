import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkConfig } from '@core/validation/validate'
import { memoryFs, readConfig } from '../../support/fixtures'

const KNOWN = join(import.meta.dirname, '../../fixtures/known')

async function check(name: string) {
  const { problems } = await checkConfig(memoryFs(readConfig(join(KNOWN, name))))
  return problems
}

// Autres configurations IGNF/validator connues (tests/fixtures/README.md).
describe('configurations connues', () => {
  it('dgpr : colonnes sans id, seul le nom différent du dossier est signalé', async () => {
    expect((await check('dgpr')).map((p) => `${p.code} ${p.file}`)).toEqual(['WARN-MODEL-NAME Canalisations/files.json'])
  })

  it('naviforest : valeurs enum numériques acceptées', async () => {
    expect(await check('naviforest')).toEqual([])
  })

  it('ppr : modèle sans id avec multi_table, aucune erreur', async () => {
    const problems = await check('ppr')
    expect(problems.filter((p) => p.severity === 'error')).toEqual([])
    // Les modèles de table des listes de codes (types/<liste>.json) ne sont pas utilisés par le validator.
    expect(new Set(problems.map((p) => p.code))).toEqual(new Set(['WARN-MODEL-NAME', 'WARN-UNREFERENCED-FILE']))
  })
})
