import { copyFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Édition du dictionnaire des variables (variables.json).
const ROOT = join(import.meta.dirname, '../..')
let server: TempServer
const dict = () => JSON.parse(readFileSync(join(server.dir, 'variables.json'), 'utf8'))

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  copyFileSync(join(ROOT, 'tests/fixtures/variables.json'), join(server.dir, 'variables.json'))
  await page.goto(server.url)
  await page.getByTestId('home-variables').click()
  await expect(page.getByRole('heading', { name: 'Dictionnaire des variables' })).toBeVisible()
})
test.afterEach(() => server.stop())

test('renommer une variable : affichage des regex mis à jour, alias suivis, enregistré', async ({ page }) => {
  await expect(page.getByTestId('breadcrumbs').getByRole('listitem')).toHaveText(['Configuration', 'Dictionnaire des variables'])
  const name = page.getByTestId('variable-DIGIT_9').getByTestId('variable-name')
  await name.fill('NEUF_CHIFFRES')
  await name.press('Enter')
  await expect(page.getByTestId('variable-NEUF_CHIFFRES')).toBeVisible()
  await expect(page.getByTestId('alias-cnig_SUP-NEUF_CHIFFRES')).toBeVisible()

  const part = page.getByTestId('variable-_PART_OPT').getByTestId('variable-name')
  await expect(part).toHaveClass(/optional/)
  await part.fill('_PARTIE_OPT')
  await part.press('Enter')
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  await expect(page.getByTestId('model-folderName').getByTestId('variable-optional')).toHaveText('_PARTIE')

  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('1 fichier enregistré')
  expect(dict().variables).toHaveProperty('_PARTIE_OPT', '(_[a-zA-Z])?')
  expect(dict().aliases.cnig_SUP).toEqual({ NEUF_CHIFFRES: 'IDGEST' })
})

test('nom refusé, regex en double signalée, ajout et suppression', async ({ page }) => {
  const name = page.getByTestId('variable-DATE').getByTestId('variable-name')
  await name.fill('ENTIER')
  await name.press('Enter')
  await expect(page.getByTestId('notice')).toContainText('La variable « ENTIER » existe déjà.')
  await expect(name).toHaveValue('DATE')

  const regex = page.getByTestId('variable-ENTIER_3').getByTestId('variable-regex')
  await regex.fill('[0-9]+')
  await regex.press('Enter')
  await expect(page.getByTestId('variable-ENTIER_3').getByTestId('problem-badge')).toBeVisible()
  await regex.fill('[0-9]{3}')
  await regex.press('Enter')
  await expect(page.getByTestId('variable-ENTIER_3').getByTestId('problem-badge')).toHaveCount(0)

  await page.getByTestId('new-variable-name').getByRole('textbox').fill('ANNEE')
  await page.getByTestId('new-variable-regex').getByRole('textbox').fill('[0-9]{4}')
  await page.getByTestId('confirm-add-variable').click()
  await expect(page.getByTestId('variable-ANNEE').getByTestId('variable-regex')).toHaveValue('[0-9]{4}')
  await page.getByTestId('variable-ANNEE').getByTestId('remove-variable').click()
  await expect(page.getByTestId('variable-ANNEE')).toHaveCount(0)
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
})

test('alias ajouté puis retiré', async ({ page }) => {
  await page.getByRole('combobox', { name: 'Famille' }).click()
  await page.getByRole('option', { name: 'cnig_PLU', exact: true }).click()
  await page.getByTestId('new-alias-variable').click()
  await page.getByRole('option', { name: 'INSEE_COMMUNE', exact: true }).click()
  await page.getByTestId('new-alias-name').getByRole('textbox').fill('COMMUNE')
  await page.getByTestId('confirm-add-alias').click()
  await expect(page.getByTestId('alias-cnig_PLU-INSEE_COMMUNE').getByTestId('alias-name')).toHaveValue('COMMUNE')
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  await page.getByTestId('model-tab-files').click()
  await expect(page.getByTestId('regex').filter({ hasText: 'ZONE_URBA' }).getByTestId('variable')).toHaveText('COMMUNE')
  await page.goto(`${server.url}#/variables.json`)
  await page.getByTestId('alias-cnig_PLU-INSEE_COMMUNE').getByTestId('remove-alias').click()
  await expect(page.getByTestId('alias-cnig_PLU-INSEE_COMMUNE')).toHaveCount(0)
})

for (const scheme of ['light', 'dark'] as const) {
  test(`accessibilité du dictionnaire (${scheme === 'light' ? 'clair' : 'sombre'})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.reload()
    await expect(page.getByTestId('variables')).toBeVisible()
    const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
  })
}
