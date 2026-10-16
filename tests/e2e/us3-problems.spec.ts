import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'

function editZoneUrba(reference: string | undefined) {
  const path = join(server.dir, ZONE_URBA)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  if (reference === undefined) delete data.columns[0].constraints.reference
  else data.columns[0].constraints.reference = reference
  writeFileSync(path, JSON.stringify(data, null, 4))
}

test.beforeEach(async () => {
  server = await serveCopy()
  editZoneUrba('INCONNUE.ID')
  writeFileSync(join(server.dir, 'cnig_PLU_2017/codes/Orpheline.csv'), 'A\n1\n')
})

test.afterEach(() => server.stop())

test('affiche les mêmes problèmes que vce check', async ({ page }) => {
  const report = JSON.parse(spawnSync('node', ['bin/vce.js', 'check', server.dir, '--format', 'json'], { encoding: 'utf8' }).stdout)
  await page.goto(server.url)
  await expect(page.getByTestId('problems-count')).toHaveText(`${report.problems.length} problèmes`)
  for (const p of report.problems) {
    await expect(page.getByTestId(`problem-${p.code}`).filter({ hasText: p.message })).toHaveCount(1)
  }
})

test('filtre par sévérité, code et modèle', async ({ page }) => {
  await page.goto(server.url)
  await page.getByTestId('filter-severity').click()
  await page.getByRole('option', { name: 'Avertissements' }).click()
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème sur 2')
  await expect(page.getByTestId('problem-WARN-UNREFERENCED-FILE')).toBeVisible()
  await page.reload()
  await page.getByRole('combobox', { name: 'Code', exact: true }).fill('ERR-REF')
  await page.getByRole('option', { name: 'ERR-REFERENCE-TARGET' }).click()
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème sur 2')
  await expect(page.getByTestId('problem-ERR-REFERENCE-TARGET')).toBeVisible()
  await page.getByRole('combobox', { name: 'Modèle', exact: true }).fill('GPU_MEC')
  await page.getByRole('option', { name: 'GPU_MEC_2025' }).click()
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème sur 2')
})

test('un clic sur un problème de colonne ouvre la table et met la colonne en évidence', async ({ page }) => {
  await page.goto(server.url)
  await expect(page.getByTestId('errors-cnig_PLU_2017')).toHaveText('1')
  await page.getByTestId('problem-ERR-REFERENCE-TARGET').click()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await expect(page.getByTestId('column-LIB_IDZONE')).toHaveClass(/highlight/)
  await expect(page.getByTestId('column-WKT')).not.toHaveClass(/highlight/)
})

test('Recharger relit le disque et relance la validation sans recharger la page', async ({ page }) => {
  await page.goto(server.url)
  await expect(page.getByTestId('problems-count')).toHaveText('2 problèmes')
  await page.evaluate(() => ((window as unknown as { marker: number }).marker = 42))
  editZoneUrba(undefined)
  await page.getByTestId('reload').click()
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème')
  await expect(page.getByTestId('problem-ERR-REFERENCE-TARGET')).toHaveCount(0)
  await expect(page.getByTestId('errors-cnig_PLU_2017')).toHaveCount(0)
  expect(await page.evaluate(() => (window as unknown as { marker: number }).marker)).toBe(42)
})
