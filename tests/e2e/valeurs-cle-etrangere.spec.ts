import { expect, test } from '@playwright/test'

// Colonne visée par une clé étrangère : valeurs autorisées de la liste de codes.
test('TYPEZONE : codes de ListeTypezonePLU, lien vers la liste', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await page.getByTestId('column-TYPEZONE').click()
  const values = page.getByTestId('allowed-values-TYPEZONE')
  await expect(values).toContainText('Valeurs autorisées par ListeTypezonePLU')
  await expect(values.getByRole('cell', { name: 'AUc', exact: true })).toBeVisible()
  await values.getByRole('link', { name: 'ListeTypezonePLU' }).first().click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeTypezonePLU' })).toBeVisible()
})

test('colonne sans clé étrangère : pas de valeurs', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await page.getByTestId('column-LIBELLE').click()
  await expect(page.getByTestId('allowed-values-LIBELLE')).toHaveCount(0)
})
