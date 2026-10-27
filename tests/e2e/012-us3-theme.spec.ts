import { expect, test } from '@playwright/test'

// Feature 012, US3 : polices et zones de validator-api-client.
test('texte en Open Sans, titres en Fira Sans, polices chargées localement', async ({ page }) => {
  const remote: string[] = []
  page.on('request', (r) => { if (!r.url().startsWith('http://127.0.0.1')) remote.push(r.url()) })
  await page.goto('./#/cnig_PLU_2017/files.json')
  const heading = page.getByRole('heading', { name: 'Modèle cnig_PLU_2017' })
  await expect(heading).toBeVisible()
  await expect(page.getByTestId('metadata-specification').getByRole('textbox')).toHaveCSS('font-family', /^"?Open Sans"?/)
  await expect(heading).toHaveCSS('font-family', /^"?Fira Sans"?/)
  expect(await page.evaluate(async () => {
    await document.fonts.ready
    return [document.fonts.check('16px "Open Sans"'), document.fonts.check('600 16px "Fira Sans"')]
  })).toEqual([true, true])
  expect(remote).toEqual([])
})

test('arbre et problèmes sur fond clair, panneau principal blanc, en-tête blanc', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('./#/cnig_PLU_2017/files.json')
  await expect(page.getByTestId('models-panel')).toHaveCSS('background-color', 'rgb(244, 246, 248)')
  await expect(page.getByTestId('problems-panel')).toHaveCSS('background-color', 'rgb(244, 246, 248)')
  await expect(page.locator('.v-app-bar')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(page.locator('.v-app-bar')).toHaveCSS('border-bottom-color', 'rgb(184, 192, 202)')
  await expect(page.locator('.v-main')).toHaveCSS('background-color', /rgba?\(255, 255, 255|rgba\(0, 0, 0, 0\)/)
})
