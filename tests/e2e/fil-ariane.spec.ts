import { expect, test } from '@playwright/test'

// Fil d'Ariane : configuration › famille › modèle › table ou liste › élément du pointeur.
test('table et colonne désignée : chaque niveau mène à sa vue', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json?p=%2Fcolumns%2F7')
  const crumbs = page.getByTestId('breadcrumbs')
  await expect(crumbs.getByRole('listitem')).toHaveText(['Configuration', 'cnig_PLU_2017', 'Table ZONE_URBA', 'Colonne TYPEZONE'])
  await expect(crumbs.locator('[aria-current="page"]')).toHaveText('Colonne TYPEZONE')
  await crumbs.getByRole('link', { name: 'Table ZONE_URBA' }).click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2017\/types\/ZONE_URBA\.json$/)
  await page.getByTestId('breadcrumbs').getByRole('link', { name: 'cnig_PLU_2017' }).click()
  await expect(page.getByRole('heading', { name: 'Modèle cnig_PLU_2017' })).toBeVisible()
  await page.getByTestId('breadcrumbs').getByRole('link', { name: 'Configuration' }).click()
  await expect(page.getByTestId('config-home')).toBeVisible()
})

test('liste de codes et comparaison', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/codes/ListeEtatPLU.csv')
  await expect(page.getByTestId('breadcrumbs')).toContainText('Liste ListeEtatPLU')
  await page.goto('./#/cnig_PLU_2017/?compare=GPU_MEC_2025')
  await expect(page.getByTestId('breadcrumbs').getByRole('link', { name: 'cnig_PLU_2017' })).toBeVisible()
})
