import { expect, test } from '@playwright/test'

// Feature 012, US4 : le nom d'une liste est celui de son fichier, ./codes/<nom>.csv, sans choix possible.
const PLU = 'cnig_PLU_2017'

test('fichier de la liste ni affiché ni modifiable : le nom mène au CSV', async ({ page }) => {
  await page.goto(`./#/${PLU}/files.json`)
  await page.getByTestId('model-tab-codes').click()
  const etat = page.getByTestId('code-ListeEtatPLU')
  await expect(etat.getByTestId('code-name')).toHaveText('ListeEtatPLU')
  await expect(etat.getByTestId('code-name')).toHaveAttribute('href', `#/${PLU}/codes/ListeEtatPLU.csv`)
  await expect(etat).not.toContainText('./codes/')
  await expect(etat.getByRole('combobox')).toHaveCount(0)
  await expect(etat.getByRole('textbox')).toHaveCount(0)
})
