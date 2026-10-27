import { expect, test } from '@playwright/test'

// Recherche dans toute la configuration.
test('touche « / », colonne trouvée, ouverture de l\'élément', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByTestId('config-home')).toBeVisible()
  await page.keyboard.press('/')
  const dialog = page.getByTestId('search-dialog')
  await dialog.getByTestId('search-input').getByRole('textbox').fill('TYPEZONE')
  await expect(dialog.getByTestId('search-count')).toContainText('résultat')
  await dialog.getByTestId('search-result').filter({ hasText: 'ZONE_URBA.TYPEZONE' }).first().click()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await expect(page).toHaveURL(/ZONE_URBA\.json\?p=%2Fcolumns%2F\d+$/)
})

test('valeur d\'une liste de codes : ouvre la liste sur la ligne', async ({ page }) => {
  await page.goto('./')
  await page.getByTestId('search-open').click()
  const dialog = page.getByTestId('search-dialog')
  await dialog.getByTestId('search-input').getByRole('textbox').fill('AUc')
  await dialog.getByTestId('search-result').filter({ hasText: 'valeur' }).first().click()
  await expect(page.getByRole('heading', { name: /Liste de codes/ })).toBeVisible()
  await expect(page.locator('tr.highlight')).toContainText('AUc')
})

test('accessibilité de la recherche', async ({ page }) => {
  const { default: AxeBuilder } = await import('@axe-core/playwright')
  await page.goto('./')
  await page.getByTestId('search-open').click()
  const dialog = page.getByTestId('search-dialog')
  await dialog.getByTestId('search-input').getByRole('textbox').fill('ZONE')
  await expect(dialog.getByTestId('search-result').first()).toBeVisible()
  await expect(page.locator('.v-overlay__content').filter({ has: dialog })).toHaveCSS('opacity', '1')
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
})
