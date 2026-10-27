import { expect, test } from '@playwright/test'
import pkg from '../../package.json' with { type: 'json' }

// En-tête (version, lien GitHub) et accueil d'une configuration chargée.
test('en-tête : version et lien vers le dépôt GitHub', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByTestId('app-version')).toHaveText(`v${pkg.version}`)
  const github = page.getByTestId('app-github')
  await expect(github).toHaveAttribute('href', 'https://github.com/IGNF/validator-config-editor')
  await expect(github).toHaveAttribute('target', '_blank')
  await expect(github).toHaveAccessibleName('validator-config-editor sur GitHub (nouvel onglet)')
})

test('accueil : chiffres clés, familles, liens vers les modèles et la comparaison', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByTestId('stat-models')).toContainText('3')
  await expect(page.getByTestId('stat-models')).toContainText('modèles')
  await expect(page.getByTestId('stat-errors')).toContainText('0')
  await expect(page.getByTestId('summary')).toContainText('3 modèles')
  const plu = page.getByTestId('home-family-cnig_PLU_2017')
  await plu.getByRole('link', { name: 'cnig_PLU_2017' }).click()
  await expect(page.getByRole('heading', { name: 'Modèle cnig_PLU_2017' })).toBeVisible()
})
