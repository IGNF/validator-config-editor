import { spawnSync } from 'node:child_process'
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 010, US2 : règles de l'import GpU sur une configuration avec variables.json.
const ROOT = join(import.meta.dirname, '../..')
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
const MEC = 'GPU_MEC_2025/types/MEC.json'
let server: TempServer

test.beforeEach(async () => {
  server = await serveCopy()
  copyFileSync(join(ROOT, 'tests/fixtures/variables.json'), join(server.dir, 'variables.json'))
  // Une colonne de GPU_MEC_2025 reprend l'id d'une colonne de cnig_PLU_2017.
  const zone = JSON.parse(readFileSync(join(server.dir, ZONE_URBA), 'utf8'))
  const mec = JSON.parse(readFileSync(join(server.dir, MEC), 'utf8'))
  mec.columns[0].id = zone.columns[0].id
  writeFileSync(join(server.dir, MEC), JSON.stringify(mec, null, 4))
})
test.afterEach(() => server.stop())

test('doublon d\'id entre deux modèles : erreur dans l\'interface et code 1 pour vce check', async ({ page }) => {
  await page.goto(server.url)
  await expect(page.getByTestId('problem-ERR-ID-DUPLICATE')).toBeVisible()
  await expect(page.getByTestId('problem-ERR-ID-DUPLICATE')).toContainText(MEC)
  const check = spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', server.dir], { encoding: 'utf8' })
  expect(check.status).toBe(1)
  expect(check.stdout).toContain('ERR-ID-DUPLICATE')
})
