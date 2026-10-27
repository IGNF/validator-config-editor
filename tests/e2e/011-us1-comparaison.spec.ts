import { cpSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 011, US1 : comparaison de deux modèles. cnig_PLU_2022 est une copie de cnig_PLU_2017.
let server: TempServer

test.beforeEach(async () => {
  server = await serveCopy()
  cpSync(join(server.dir, 'cnig_PLU_2017'), join(server.dir, 'cnig_PLU_2022'), { recursive: true })
})
test.afterEach(() => server.stop())

function editFiles(edit: (d: Record<string, any>) => void) {
  const path = join(server.dir, 'cnig_PLU_2022/files.json')
  const data = JSON.parse(readFileSync(path, 'utf8'))
  edit(data)
  writeFileSync(path, JSON.stringify(data, null, 4))
}

test('« Comparer » ouvre la comparaison avec la version précédente ; copie identique', async ({ page }) => {
  await page.goto(`${server.url}#/cnig_PLU_2022/`)
  await page.getByTestId('compare-model-button').click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2022\/\?compare=cnig_PLU_2017$/)
  await expect(page.getByTestId('compare-total')).toHaveText('Aucune différence.')
})

test('fichiers ajoutés, retirés, modifiés ; inversion ; lien vers l\'élément', async ({ page }) => {
  editFiles((d) => {
    d.files = d.files.filter((f: { name: string }) => f.name !== 'JUGEMENT')
    d.files.find((f: { name: string }) => f.name === 'RAPPORT').mandatory = 'WARN'
  })
  await page.goto(`${server.url}#/cnig_PLU_2022/?compare=cnig_PLU_2017`)
  const files = page.getByTestId('compare-files')
  await expect(files).toContainText('Fichiers attendus (2)')
  await expect(files).toContainText('retiré JUGEMENT')
  await expect(files).toContainText('présence : ERROR → WARN')
  await expect(page.getByTestId('compare-total')).toHaveText('2 différences de cnig_PLU_2017 à cnig_PLU_2022.')

  await page.getByTestId('compare-swap').click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2017\/\?compare=cnig_PLU_2022$/)
  await expect(page.getByTestId('compare-files')).toContainText('ajouté JUGEMENT')

  await page.getByTestId('compare-files').getByRole('link', { name: 'RAPPORT' }).click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2017\/files\.json\?p=%2Ffiles%2F\d+$/)
})

test('tables et colonnes ; regex avec variables ; autre référence choisie', async ({ page }) => {
  const path = join(server.dir, 'cnig_PLU_2022/types/ZONE_URBA.json')
  const table = JSON.parse(readFileSync(path, 'utf8'))
  table.columns.find((c: { name: string }) => c.name === 'LIBELLE').constraints.maxLength = 20
  writeFileSync(path, JSON.stringify(table, null, 4))
  await page.goto(`${server.url}#/cnig_PLU_2022/?compare=`)
  await expect(page.getByTestId('compare-suggested')).toHaveText('cnig_PLU_2017')
  await page.getByTestId('compare-reference').click()
  await page.getByRole('option', { name: 'cnig_PLU_2017' }).click()
  await expect(page.getByTestId('compare-table-ZONE_URBA')).toContainText('colonne modifiée LIBELLE : longueur maximale 12 → 20')
})

test('sans version précédente : choix de la référence', async ({ page }) => {
  await page.goto(`${server.url}#/cnig_PLU_2017/?compare=`)
  await expect(page.getByTestId('compare-view')).toContainText('aucune version précédente de cnig_PLU_2017')
})

test('modification non enregistrée prise en compte', async ({ page }) => {
  await page.goto(`${server.url}#/cnig_PLU_2022/files.json`)
  await page.getByTestId('model-folderName').getByRole('textbox').fill('[0-9]{5}_PLU')
  await page.goto(`${server.url}#/cnig_PLU_2022/?compare=cnig_PLU_2017`)
  await expect(page.getByTestId('compare-document')).toContainText('nom du dossier')
  await expect(page.getByTestId('compare-document')).toContainText('[0-9]{5}_PLU')
})

test('accessibilité de la comparaison', async ({ page }) => {
  editFiles((d) => {
    d.files = d.files.filter((f: { name: string }) => f.name !== 'JUGEMENT')
  })
  await page.goto(`${server.url}#/cnig_PLU_2022/?compare=cnig_PLU_2017`)
  await expect(page.getByTestId('compare-files')).toBeVisible()
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.map((v) => `${v.id} (${v.impact}) — ${v.help}`)).toEqual([])
})

test('contenu des listes de codes : lignes ajoutées, retirées, modifiées (US2)', async ({ page }) => {
  const path = join(server.dir, 'cnig_PLU_2022/codes/PrescriptionUrbaType.csv')
  const lines = readFileSync(path, 'utf8').trimEnd().split('\n')
  lines[2] = lines[2]!.replace('Espace boisé classé à protéger', 'EBC à protéger')
  writeFileSync(path, [...lines, '98,98,Nouvelle,,'].join('\n') + '\n')
  await page.goto(`${server.url}#/cnig_PLU_2022/?compare=cnig_PLU_2017`)
  const list = page.getByTestId('compare-list-PrescriptionUrbaType')
  await expect(list).toContainText('ligne ajoutée 98,98,Nouvelle,,')
  await expect(list).toContainText('ligne modifiée 01,01 : LIBELLE')
  await expect(list).toContainText('EBC à protéger ou conserver')
})
