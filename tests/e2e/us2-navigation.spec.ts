import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'

const FIXTURES = join(import.meta.dirname, '../fixtures/config')

test.beforeEach(async ({ page }) => {
  await page.goto('./')
  await expect(page.getByTestId('summary')).toContainText('3 modèles, 22 tables, 15 listes de codes')
})

test('filtre les modèles par une partie de leur nom', async ({ page }) => {
  await page.getByTestId('model-filter').getByRole('textbox').fill('PLU_2017')
  await expect(page.getByText('1 / 3 modèles')).toBeVisible()
  await expect(page.getByTestId('model-cnig_PLU_2017')).toBeVisible()
  await expect(page.getByTestId('model-GPU_MEC_2025')).toHaveCount(0)
})

test('affiche un modèle, suit le lien vers une table puis vers une liste de codes', async ({ page }) => {
  await page.getByTestId('model-cnig_PLU_2017').click()
  await expect(page.getByRole('heading', { name: 'Modèle cnig_PLU_2017' })).toBeVisible()
  await expect(page.getByTestId('metadata-specification').getByRole('textbox')).toHaveValue('CNIG PLU v2017')
  await expect(page.getByRole('tab', { name: /^Fichiers \(\d+\)$/ })).toBeVisible()
  await expect(page.getByRole('tab', { name: /^Listes de codes \(\d+\)$/ })).toBeVisible()

  await page.getByTestId('model-tab-files').click()
  await page.getByTestId('file-ZONE_URBA').click()
  await page.getByRole('main').getByRole('link', { name: 'Ouvrir la table ./types/ZONE_URBA.json' }).click()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  const typezone = page.getByTestId('column-TYPEZONE')
  await expect(typezone).toContainText('String')
  await expect(typezone).toContainText('longueur ≤ 3')

  await page.getByRole('main').getByRole('link', { name: 'ListeTypezonePLU' }).click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeTypezonePLU' })).toBeVisible()
  await expect(page.getByRole('columnheader', { name: 'TYPEZONE' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'AUc', exact: true })).toBeVisible()

  // Retour arrière du navigateur : la sélection est dans l'URL.
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})

test('affiche le contenu exact du fichier source', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await page.getByRole('tab', { name: 'Source' }).click()
  const expected = readFileSync(join(FIXTURES, 'cnig_PLU_2017/types/ZONE_URBA.json'), 'utf8')
  expect(await page.getByTestId('source').textContent()).toBe(expected)
})
