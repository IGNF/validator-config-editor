import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})
test.afterEach(() => server.stop())

const column = (page: Page, name: string) => page.getByTestId(`column-${name}`)
const source = async (page: Page) => {
  await page.getByRole('tab', { name: 'Source' }).click()
  const text = await page.getByTestId('source').textContent()
  await page.getByRole('tab', { name: 'Vue' }).click()
  return text!
}

test('modifie une contrainte : vue, source et marque de modification', async ({ page }) => {
  await column(page, 'TYPEZONE').click()
  await column(page, 'TYPEZONE').getByTestId('column-maxLength').getByRole('spinbutton').fill('5')
  await expect(column(page, 'TYPEZONE')).toContainText('longueur ≤ 5')
  await expect(page.getByTestId('edited')).toBeVisible()
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  const original = readFileSync(join(server.dir, ZONE_URBA), 'utf8').split('\n')
  const edited = (await source(page)).split('\n')
  expect(edited.filter((l, i) => l !== original[i])).toEqual(['                "maxLength": 5'])
})

test('ajoute une colonne avec un nouvel id, puis la supprime', async ({ page }) => {
  await page.getByTestId('add-column').click()
  await expect(column(page, 'NOUVELLE_COLONNE')).toContainText('String')
  const data = JSON.parse(await source(page))
  expect(data.columns.at(-1)).toMatchObject({ name: 'NOUVELLE_COLONNE', type: 'String', id: expect.stringMatching(/^[0-9a-f]{32}$/) })
  await column(page, 'NOUVELLE_COLONNE').getByTestId('remove-column').click()
  await expect(column(page, 'NOUVELLE_COLONNE')).toHaveCount(0)
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
})

test('colonne : ni « Monter » ni « Descendre »', async ({ page }) => {
  await column(page, 'WKT').click()
  await expect(column(page, 'WKT').getByRole('button', { name: 'Monter' })).toHaveCount(0)
  await expect(column(page, 'WKT').getByRole('button', { name: 'Descendre' })).toHaveCount(0)
})

test('un problème créé apparaît puis disparaît une fois corrigé', async ({ page }) => {
  await column(page, 'LIB_IDZONE').click()
  const reference = column(page, 'LIB_IDZONE').getByTestId('column-reference').getByRole('textbox')
  await reference.fill('INCONNUE.ID')
  await expect(page.getByTestId('problem-ERR-REFERENCE-TARGET')).toBeVisible({ timeout: 1000 })
  await reference.fill('')
  await expect(page.getByTestId('problem-ERR-REFERENCE-TARGET')).toHaveCount(0, { timeout: 1000 })
})

test('annule et rétablit, aux boutons et au clavier', async ({ page }) => {
  await page.getByTestId('table-name').getByRole('textbox').fill('ZONE')
  await expect(page.getByRole('heading', { name: 'Table ZONE', exact: true })).toBeVisible()
  await page.getByTestId('undo').click()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
  await page.getByTestId('redo').click()
  await expect(page.getByRole('heading', { name: 'Table ZONE', exact: true })).toBeVisible()
  await page.locator('body').click()
  await page.keyboard.press('Control+z')
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})

test('modifie une clé étrangère et conserve les propriétés inconnues', async ({ page }) => {
  // Affichage SQL (REFERENCES en mot-clé), puis saisie par le crayon.
  await expect(page.getByTestId('foreignKeys-0-sql').locator('.keyword')).toHaveText('REFERENCES')
  await page.getByTestId('foreignKeys-0-edit').click()
  const fk = page.getByTestId('foreignKeys-0').getByRole('textbox')
  await fk.fill('(TYPEZONE) REFERENCES Inconnue(TYPEZONE)')
  await expect(page.getByTestId('problem-ERR-FK-TARGET-LIST')).toBeVisible()
  await fk.fill('(TYPEZONE) REFERENCES ListeTypezonePLU(TYPEZONE)')
  await expect(page.getByTestId('problem-ERR-FK-TARGET-LIST')).toHaveCount(0)
  // Revenu à l'identique : aucune modification.
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
})
