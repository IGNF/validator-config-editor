import { describe, expect, it } from 'vitest'
import { setAt } from '@core/edit/pointer'
import { loadProject } from '@core/load/project'
import { detectStyle, serialize } from '@core/serialize'
import { checkConfig, checkLoaded, withData } from '@core/validation/validate'
import { memoryFs, readConfig } from '../../support/fixtures'

const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
const FILES = 'cnig_PLU_2017/files.json'

describe('revalidation après édition', () => {
  it('donne le même résultat que la validation de la configuration modifiée sur disque', async () => {
    const files = readConfig()
    const loaded = await loadProject(memoryFs(files))
    const original = JSON.parse(files.get(ZONE_URBA)!)
    const edited = setAt(original, '/columns/0/constraints/reference', 'INCONNUE.ID')
    const project = withData(loaded.project, ZONE_URBA, edited)
    const incremental = checkLoaded({ project, problems: loaded.problems })

    files.set(ZONE_URBA, serialize(edited, detectStyle(files.get(ZONE_URBA)!)))
    const full = await checkConfig(memoryFs(files))
    expect(incremental.problems).toEqual(full.problems)
    expect(incremental.problems.map((p) => p.code)).toEqual(['ERR-REFERENCE-TARGET'])
  })

  it('ne modifie pas la configuration d\'origine', async () => {
    const loaded = await loadProject(memoryFs())
    const before = loaded.project.models.get('cnig_PLU_2017')!.document!.data
    withData(loaded.project, FILES, { name: 'x' })
    expect(loaded.project.models.get('cnig_PLU_2017')!.document!.data).toBe(before)
  })

  it.skipIf(!process.env.VCE_CONFIG_DIR)('revalide la configuration complète en moins d\'1 s', async () => {
    const files = readConfig(process.env.VCE_CONFIG_DIR)
    const loaded = await loadProject(memoryFs(files))
    const path = [...files.keys()].find((p) => p.endsWith('/types/ZONE_URBA.json'))!
    const start = performance.now()
    checkLoaded({ project: withData(loaded.project, path, JSON.parse(files.get(path)!)), problems: loaded.problems })
    expect(performance.now() - start).toBeLessThan(1000)
  })
})
