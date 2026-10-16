import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const PLU = 'cnig_PLU_2017'
const BIS = 'cnig_PLU_2017_bis'

function editJson(path: string, edit: (d: any) => void) {
  const file = join(server.dir, path)
  const data = JSON.parse(readFileSync(file, 'utf8'))
  edit(data)
  writeFileSync(file, JSON.stringify(data, null, 4))
}

async function fix(page: Page, code: string, option: string | RegExp) {
  await page.getByTestId(`problem-${code}`).locator('..').getByTestId('fix').click()
  await page.getByTestId('fix-option').filter({ hasText: option }).click()
}

test.afterEach(() => server.stop())

test('retire une surcharge orpheline, puis annule', async ({ page }) => {
  server = await serveCopy()
  editJson(`${PLU}/gpu.json`, (d) => { d.validator_file_model['0123456789abcdef0123456789abcdef'] = { path: 'x' } })
  await page.goto(server.url)
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème')
  await fix(page, 'WARN-GPU-ORPHAN-ID', 'Retirer cette surcharge de gpu.json')
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  await page.getByTestId('undo').click()
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème')
})

test('copie une liste manquante depuis un autre modèle et l\'enregistre sur disque', async ({ page }) => {
  server = await serveCopy()
  cpSync(join(server.dir, PLU), join(server.dir, BIS), { recursive: true })
  editJson(`${BIS}/files.json`, (d) => {
    d.name = BIS
    d.codes = d.codes.filter((c: { name: string }) => c.name !== 'ListeTypezonePLU')
  })
  rmSync(join(server.dir, `${BIS}/codes/ListeTypezonePLU.csv`))
  await page.goto(server.url)
  await fix(page, 'ERR-FK-TARGET-LIST', `Copier la liste « ListeTypezonePLU » depuis ${PLU} et la déclarer`)
  await expect(page.getByTestId('problem-ERR-FK-TARGET-LIST')).toHaveCount(0)
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('2 fichiers enregistrés')
  const created = join(server.dir, `${BIS}/codes/ListeTypezonePLU.csv`)
  expect(existsSync(created)).toBe(true)
  expect(readFileSync(created, 'utf8')).toBe(readFileSync(join(server.dir, `${PLU}/codes/ListeTypezonePLU.csv`), 'utf8'))
  expect(JSON.parse(readFileSync(join(server.dir, `${BIS}/files.json`), 'utf8')).codes.at(-1)).toMatchObject({ data: './codes/ListeTypezonePLU.csv', name: 'ListeTypezonePLU' })
})

test('met entre guillemets une valeur CSV qui contient une virgule', async ({ page }) => {
  server = await serveCopy()
  const list = join(server.dir, `${PLU}/codes/InformationUrbaType.csv`)
  writeFileSync(list, readFileSync(list, 'utf8') + '\r\n42,00,Secteurs délimités, dans lesquels certaines opérations,,')
  await page.goto(server.url)
  await fix(page, 'ERR-CSV-ROW-LENGTH', /Mettre entre guillemets la valeur de LIBELLE/)
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')
  await page.keyboard.press('Control+s')
  await expect(page.getByTestId('notice')).toContainText('1 fichier enregistré')
  expect(readFileSync(list, 'utf8').endsWith('\r\n42,00,"Secteurs délimités, dans lesquels certaines opérations",,')).toBe(true)
})

test('remplace un nom mal saisi par le nom proche', async ({ page }) => {
  server = await serveCopy()
  editJson(`${PLU}/types/ZONE_URBA.json`, (d) => { d.columns[0].constraints.reference = 'DOC_URBA.IDURB' })
  await page.goto(server.url)
  await fix(page, 'ERR-REFERENCE-TARGET', 'Remplacer la référence par « DOC_URBA.IDURBA »')
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')
})

test('pas de bouton « Corriger » pour un problème sans correction', async ({ page }) => {
  server = await serveCopy()
  writeFileSync(join(server.dir, `${PLU}/types/DOC_URBA.json`), '{')
  await page.goto(server.url)
  await expect(page.getByTestId('problem-ERR-JSON-SYNTAX')).toBeVisible()
  await expect(page.getByTestId('problem-ERR-JSON-SYNTAX').locator('..').getByTestId('fix')).toHaveCount(0)
})
