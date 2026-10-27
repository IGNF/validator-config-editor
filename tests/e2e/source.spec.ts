import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { serveCopy } from './support/serve'

// Vue « Source » : lignes numérotées, JSON et CSV colorés, ligne d'une erreur de syntaxe.
test('JSON coloré, numéros de ligne en liens', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json?l=3')
  const source = page.getByTestId('source')
  await expect(source).toBeVisible()
  await expect(source.locator('[data-line="3"]')).toHaveClass(/current/)
  await expect(source.locator('.key').first()).toHaveCSS('color', 'rgb(26, 95, 180)')
  await source.locator('[data-line="5"] .ln').click()
  await expect(page).toHaveURL(/\?l=5$/)
  await expect(source.locator('[data-line="5"]')).toHaveClass(/current/)
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
})

test('CSV : en-tête et séparateurs', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/codes/PrescriptionUrbaType.csv?l=1')
  await expect(page.getByTestId('source').locator('[data-line="1"] .header').first()).toHaveText('TYPEPSC')
})

test('erreur de syntaxe : le problème ouvre la source à la ligne fautive', async ({ page }) => {
  const server = await serveCopy()
  try {
    writeFileSync(join(server.dir, 'cnig_PLU_2017/types/ZONE_URBA.json'), '{\n  "name": "ZONE_URBA",\n  "columns": [\n    oups\n  ]\n}\n')
    await page.goto(server.url)
    await page.getByTestId('problem-ERR-JSON-SYNTAX').click()
    await expect(page).toHaveURL(/ZONE_URBA\.json\?l=4$/)
    await expect(page.getByTestId('source').locator('[data-line="4"]')).toHaveClass(/current/)
    await expect(page.getByTestId('source').locator('[data-line="4"]')).toContainText('oups')
  } finally {
    server.stop()
  }
})

test('accessibilité de la source en thème sombre', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('./#/cnig_PLU_2017/codes/PrescriptionUrbaType.csv?l=2')
  await expect(page.getByTestId('source')).toBeVisible()
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
  await page.goto('./#/cnig_PLU_2017/types/DOC_URBA.json?l=2')
  await expect(page.getByTestId('source')).toBeVisible()
  const json = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(json.violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
})
