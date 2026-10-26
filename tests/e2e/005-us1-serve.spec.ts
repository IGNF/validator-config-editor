import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 005, US1 : une liste copiée est créée sur disque à l'enregistrement (vce serve).
let server: TempServer
const PLU = 'cnig_PLU_2017'
const MEC = 'GPU_MEC_2025'

test.beforeEach(async () => {
  server = await serveCopy()
})
test.afterEach(() => server.stop())

test('copie puis enregistrement : fichier créé, identique, et déclaré', async ({ page }) => {
  await page.goto(`${server.url}#/${MEC}/files.json`)
  await page.getByTestId('copy-code-list').click()
  await page.getByTestId('code-list-filter').getByRole('textbox').fill('ListeEtat')
  await page.getByTestId(`source-${PLU}-ListeEtatPLU`).click()
  await page.getByTestId('confirm-copy').click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU' })).toBeVisible()
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('2 fichiers enregistrés')
  const created = readFileSync(join(server.dir, MEC, 'codes/ListeEtatPLU.csv'))
  expect(created.equals(readFileSync(join(server.dir, PLU, 'codes/ListeEtatPLU.csv')))).toBe(true)
  const doc = JSON.parse(readFileSync(join(server.dir, MEC, 'files.json'), 'utf8'))
  expect(doc.codes.at(-1)).toMatchObject({ data: './codes/ListeEtatPLU.csv', name: 'ListeEtatPLU' })
})
