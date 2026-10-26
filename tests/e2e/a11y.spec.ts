import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Contrôle automatique d'accessibilité (WCAG 2.1 A/AA) des écrans principaux.
// @axe-core/playwright dépend de sa propre version de playwright-core : type Page converti.
type AxePage = ConstructorParameters<typeof AxeBuilder>[0]['page']

async function audit(page: Page) {
  const { violations } = await new AxeBuilder({ page: page as unknown as AxePage }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  return violations.map((v) => `${v.id} (${v.impact}) : ${v.nodes.length} élément(s) — ${v.help}`)
}

for (const [name, hash, heading] of [
  ['accueil', '', 'Configuration'],
  ['modèle', '#/cnig_PLU_2017/files.json', 'Modèle cnig_PLU_2017'],
  ['table', '#/cnig_PLU_2017/types/ZONE_URBA.json', 'Table ZONE_URBA'],
  ['liste de codes', '#/cnig_PLU_2017/codes/InformationUrbaType.csv', 'Liste de codes InformationUrbaType'],
  ['surcharges GpU', '#/cnig_SUP_A1_2016/gpu.json', 'Surcharges GpU de cnig_SUP_A1_2016'],
]) {
  test(`écran ${name}`, async ({ page }) => {
    await page.goto(`./${hash}`)
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    expect(await audit(page)).toEqual([])
  })
}

test('fenêtre de copie d\'une liste de codes', async ({ page }) => {
  await page.goto('./#/GPU_MEC_2025/files.json')
  await page.getByTestId('copy-code-list').click()
  await page.getByTestId('code-list-filter').getByRole('textbox').fill('ListeEtat')
  await page.getByTestId('source-cnig_PLU_2017-ListeEtatPLU').click()
  await expect(page.getByTestId('copy-name')).toBeVisible()
  expect(await audit(page)).toEqual([])
})

test('fenêtre de création d\'une liste de codes', async ({ page }) => {
  await page.goto('./#/GPU_MEC_2025/files.json')
  await page.getByTestId('new-code-list').click()
  await expect(page.getByTestId('new-list-name')).toBeVisible()
  expect(await audit(page)).toEqual([])
})
