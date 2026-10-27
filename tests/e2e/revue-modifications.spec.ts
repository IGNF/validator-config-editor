import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Revue des modifications : diff par fichier, ouverture, rétablissement.
let server: TempServer
const ZONE = 'cnig_PLU_2017/types/ZONE_URBA.json'
test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  await page.goto(`${server.url}#/${ZONE}`)
  await page.getByTestId('column-TYPEZONE').click()
  await page.getByTestId('column-TYPEZONE').getByTestId('column-maxLength').getByRole('spinbutton').fill('7')
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
})
test.afterEach(() => server.stop())

test('diff ligne à ligne, ouverture du fichier', async ({ page }) => {
  await page.getByTestId('changed-count').click()
  const dialog = page.getByTestId('changes-dialog')
  const change = dialog.getByTestId(`change-${ZONE}`)
  await expect(change).toContainText('modifié')
  await expect(change).toContainText('+1')
  await expect(change).toContainText('−1')
  await expect(change.locator('.dl.del')).toContainText('"maxLength": 3')
  await expect(change.locator('.dl.add')).toContainText('"maxLength": 7')
  await change.getByTestId('change-open').click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})

test('annuler les modifications d\'un fichier, puis Ctrl+Z', async ({ page }) => {
  await page.getByTestId('changed-count').click()
  await page.getByTestId(`change-${ZONE}`).getByTestId('change-revert').click()
  await expect(page.getByTestId('changes-dialog')).toContainText('Aucune modification.')
  await page.keyboard.press('Escape')
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
  await page.getByTestId('undo').click()
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
})

test('accessibilité de la revue', async ({ page }) => {
  await page.getByTestId('changed-count').click()
  const dialog = page.getByTestId('changes-dialog')
  await expect(dialog.locator('.dl.add')).toBeVisible()
  await expect(page.locator('.v-overlay__content').filter({ has: dialog })).toHaveCSS('opacity', '1')
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
})
