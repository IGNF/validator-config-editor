import { expect, test, type Page } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  await expect(page.getByRole('heading', { name: 'Modèle cnig_PLU_2017' })).toBeVisible()
})
test.afterEach(() => server.stop())

const source = async (page: Page) => {
  await page.getByRole('tab', { name: 'Source' }).click()
  const data = JSON.parse((await page.getByTestId('source').textContent())!)
  await page.getByRole('tab', { name: 'Vue' }).click()
  return data
}
const choose = async (page: Page, field: ReturnType<Page['getByTestId']>, option: string) => {
  await field.click()
  await page.getByRole('option', { name: option, exact: true }).click()
}

test('passe un fichier de facultatif à obligatoire et ajoute un PDF sans erreur', async ({ page }) => {
  const habillage = page.getByTestId('file-HABILLAGE_TXT')
  await habillage.click()
  await choose(page, habillage.getByTestId('file-mandatory'), 'Obligatoire (ERROR)')
  await expect(habillage).toContainText('Obligatoire')

  await page.getByTestId('add-file').click()
  const added = page.getByTestId('file-NOUVEAU_FICHIER')
  await added.getByTestId('file-path').getByRole('textbox').fill('Pieces_ecrites/annexe')
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')

  const data = await source(page)
  expect(data.files.find((f: { name: string }) => f.name === 'HABILLAGE_TXT').mandatory).toBe('ERROR')
  expect(data.files.at(-1)).toMatchObject({ type: 'pdf', path: 'Pieces_ecrites/annexe', mandatory: 'ERROR', id: expect.stringMatching(/^[0-9a-f]{32}$/) })
})

test('un fichier table : choix du modèle de table, absence signalée', async ({ page }) => {
  const zone = page.getByTestId('file-ZONE_URBA')
  await zone.click()
  const tableModel = zone.getByRole('combobox', { name: /Modèle de table/ })
  await tableModel.fill('./types/INCONNUE.json')
  await tableModel.press('Enter')
  await expect(page.getByTestId('problem-ERR-TABLE-MODEL-MISSING')).toBeVisible()
  await expect(zone.getByText('Modèle de table introuvable')).toBeVisible()
  await choose(page, zone.getByTestId('file-tableModel'), './types/DOC_URBA.json')
  await expect(page.getByTestId('problem-ERR-TABLE-MODEL-MISSING')).toHaveCount(0)
  await expect(zone.getByRole('link', { name: 'Ouvrir la table ./types/DOC_URBA.json' })).toBeVisible()
})

test('déclare une liste de codes en choisissant un CSV de codes/', async ({ page }) => {
  await page.getByTestId('code-ListeEtatPLU').getByRole('button', { name: 'Supprimer la liste ListeEtatPLU' }).click()
  await expect(page.getByTestId('problem-WARN-UNREFERENCED-FILE')).toBeVisible()
  await page.getByTestId('add-code').click()
  await expect(page.getByTestId('code-ListeEtatPLU')).toBeVisible()
  await expect(page.getByTestId('problem-WARN-UNREFERENCED-FILE')).toHaveCount(0)
  // Nouvelle déclaration, nouvel id : la surcharge GpU de l'ancienne devient orpheline (cas limite de la spec).
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème')
  await expect(page.getByTestId('problem-WARN-GPU-ORPHAN-ID')).toBeVisible()
})

test('modèle hérité : le parent embarqué est en lecture seule et conservé', async ({ page }) => {
  await page.goto(`${server.url}#/cnig_SUP_A1_2016/files.json`)
  await expect(page.getByText('embarqué dans files.json, en lecture seule')).toBeVisible()
  const before = (await source(page)).parent
  await page.getByTestId('model-name').getByRole('textbox').fill('cnig_SUP_A1_2016_bis')
  const after = await source(page)
  expect(after.name).toBe('cnig_SUP_A1_2016_bis')
  expect(after.parent).toEqual(before)
  await expect(page.getByTestId('problem-WARN-MODEL-NAME')).toBeVisible()
})
