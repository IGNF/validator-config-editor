import { copyFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 012, US4 : le nom d'une liste est celui de son fichier.
const PLU = 'cnig_PLU_2017'
let server: TempServer

test.beforeEach(async () => {
  server = await serveCopy()
  copyFileSync(join(server.dir, `${PLU}/codes/ListeEtatPLU.csv`), join(server.dir, `${PLU}/codes/Etat.csv`))
})
test.afterEach(() => server.stop())

test('choisir le fichier renomme la liste et ses clés étrangères', async ({ page }) => {
  await page.goto(`${server.url}#/${PLU}/files.json`)
  const etat = page.getByTestId('code-ListeEtatPLU')
  await expect(etat.getByTestId('code-name')).toHaveText('ListeEtatPLU')
  await expect(etat.getByRole('textbox', { name: /Nom de la liste/ })).toHaveCount(0)
  await etat.getByTestId('code-data').click()
  await page.getByRole('option', { name: './codes/Etat.csv', exact: true }).click()
  await expect(page.getByTestId('code-Etat').getByTestId('code-name')).toHaveText('Etat')
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('2 fichiers enregistrés')
  const doc = JSON.parse(readFileSync(join(server.dir, `${PLU}/files.json`), 'utf8'))
  expect(doc.codes.find((c: { data: string }) => c.data === './codes/Etat.csv').name).toBe('Etat')
  const table = readFileSync(join(server.dir, `${PLU}/types/DOC_URBA.json`), 'utf8')
  expect(table).toContain('REFERENCES Etat(ETAT)')
  expect(table).not.toContain('ListeEtatPLU')
})

test('nom déjà déclaré : refusé, rien ne change', async ({ page }) => {
  await page.goto(`${server.url}#/${PLU}/files.json`)
  await page.getByTestId('code-ListeEtatPLU').getByTestId('code-data').click()
  await page.getByRole('option', { name: './codes/ListeTypedocPLU.csv', exact: true }).click()
  await expect(page.getByTestId('notice')).toContainText('La liste « ListeTypedocPLU » est déjà déclarée dans ce modèle.')
  await expect(page.getByTestId('code-ListeEtatPLU')).toBeVisible()
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
})
