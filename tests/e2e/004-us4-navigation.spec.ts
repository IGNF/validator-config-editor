import { cpSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  const path = join(server.dir, ZONE_URBA)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.columns[7].constraints.reference = 'INCONNUE.ID'
  writeFileSync(path, JSON.stringify(data, null, 4))
  await page.goto(server.url)
  await expect(page.getByTestId('problems-count')).toHaveText('1 problème')
})
test.afterEach(() => server.stop())

test('arbre groupé par famille, ouverte par le filtre', async ({ page }) => {
  // Deuxième modèle de la famille cnig_SUP : copie du premier.
  cpSync(join(server.dir, 'cnig_SUP_A1_2016'), join(server.dir, 'cnig_SUP_A2_2016'), { recursive: true })
  await page.reload()
  const sup = page.getByTestId('family-cnig_SUP')
  await expect(sup).toContainText('cnig_SUP (2)')
  await expect(page.getByTestId('model-cnig_SUP_A1_2016')).toBeHidden()
  await page.getByTestId('model-filter').getByRole('textbox').fill('A1')
  await expect(page.getByTestId('model-cnig_SUP_A1_2016')).toBeVisible()
  // Modèle seul dans sa famille : pas de groupe.
  await expect(page.getByTestId('family-cnig_PLU')).toHaveCount(0)
})

test('synthèse du modèle et lien vers ses problèmes', async ({ page }) => {
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  const summary = page.getByTestId('model-summary')
  await expect(summary).toContainText('1 erreur, 0 avertissement')
  await summary.getByTestId('show-model-problems').click()
  await expect(page.getByRole('combobox', { name: 'Modèle', exact: true })).toHaveValue('cnig_PLU_2017')
})

test('libellés métier et badge de problème sur la colonne', async ({ page }) => {
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  await page.getByTestId('model-tab-files').click()
  await expect(page.getByTestId('file-ZONE_URBA').getByTestId('file-type-icon')).toHaveAttribute('aria-label', 'Table')
  await expect(page.getByTestId('file-ZONE_URBA')).toContainText('Obligatoire')
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  const column = page.getByTestId('column-TYPEZONE')
  await expect(column).toContainText('String · texte')
  await expect(column.getByTestId('problem-badge')).toHaveAttribute('aria-label', /Référence vers une colonne inexistante/)
  await expect(page.getByTestId('column-WKT')).toContainText('MultiPolygon · géométrie')
  await expect(page.getByTestId('column-WKT').getByTestId('problem-badge')).toHaveCount(0)
})
