import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const MODELS = ['GPU_MEC_2025', 'cnig_PLU_2017', 'cnig_SUP_A1_2016']

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  // Trois modèles dont le nom diffère du dossier : WARN-MODEL-NAME, correction sûre.
  for (const m of MODELS) {
    const path = join(server.dir, m, 'files.json')
    const data = JSON.parse(readFileSync(path, 'utf8'))
    data.name = `${m}_autre`
    writeFileSync(path, JSON.stringify(data, null, 4))
  }
  const ZONE = join(server.dir, 'cnig_PLU_2017/types/ZONE_URBA.json')
  const zone = JSON.parse(readFileSync(ZONE, 'utf8'))
  zone.columns[0].constraints.reference = 'DOC_URBA.IDURB'
  writeFileSync(ZONE, JSON.stringify(zone, null, 4))
  await page.goto(server.url)
  await expect(page.getByTestId('problems-count')).toHaveText('4 problèmes')
})
test.afterEach(() => server.stop())

const filterCode = async (page: import('@playwright/test').Page, code: string) => {
  await page.getByRole('combobox', { name: 'Code', exact: true }).fill(code)
  await page.getByRole('option', { name: code }).click()
}

test('corrige les 3 noms de modèles en une fois, une annulation défait tout', async ({ page }) => {
  await expect(page.getByTestId('fix-all')).toHaveCount(0)
  await filterCode(page, 'WARN-MODEL-NAME')
  await expect(page.getByTestId('fix-all')).toHaveText('Corriger les 3 problèmes')
  await expect(page.getByText('3 fichiers modifiés, en une seule étape annulable.')).toBeVisible()
  await page.getByTestId('fix-all').click()
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème sur 1')
  await page.getByTestId('undo').click()
  await expect(page.getByTestId('problems-count')).toHaveText('3 problèmes sur 4')
})

test('pas de correction groupée pour des corrections à choix', async ({ page }) => {
  await filterCode(page, 'ERR-REFERENCE-TARGET')
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème sur 4')
  await expect(page.getByTestId('fix-all')).toHaveCount(0)
})
