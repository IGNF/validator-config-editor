import { cpSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 006, US1 : modification en série des colonnes équivalentes. cnig_SUP_A1_2016 est copié
// en cnig_SUP_A2_2016 et cnig_SUP_A3_2016 (préfixes de table A2_, A3_).
let server: TempServer
const A1 = 'cnig_SUP_A1_2016'
const GEST = (m: string) => `${m}/types/GESTIONNAIRE_SUP.json`

test.beforeEach(async () => {
  server = await serveCopy()
  for (const suffix of ['A2', 'A3']) {
    const dir = join(server.dir, `cnig_SUP_${suffix}_2016`)
    cpSync(join(server.dir, A1), dir, { recursive: true })
    for (const name of readdirSync(join(dir, 'types'))) {
      if (name.startsWith('A1_')) renameSync(join(dir, 'types', name), join(dir, 'types', name.replace('A1_', `${suffix}_`)))
    }
    for (const file of ['files.json', ...readdirSync(join(dir, 'types')).map((n) => `types/${n}`)]) {
      const path = join(dir, file)
      writeFileSync(path, readFileSync(path, 'utf8').replaceAll('A1_', `${suffix}_`).replaceAll('_A1', `_${suffix}`))
    }
  }
})
test.afterEach(() => server.stop())

const maxLength = (m: string) => JSON.parse(readFileSync(join(server.dir, GEST(m)), 'utf8')).columns.find((c: { name: string }) => c.name === 'NOMGEST').constraints.maxLength

async function editNomgest(page: Page, value: string) {
  await page.goto(`${server.url}#/${GEST(A1)}`)
  await page.getByTestId('column-NOMGEST').click()
  await page.getByTestId('column-NOMGEST').getByTestId('column-maxLength').getByRole('spinbutton').fill(value)
  await page.getByTestId('column-NOMGEST').getByTestId('equivalents').click()
  return page.getByTestId('equivalents-dialog')
}

test('maxLength appliqué en série, enregistré, puis annulé en une fois', async ({ page }) => {
  const dialog = await editNomgest(page, '120')
  await expect(dialog.getByTestId('equivalents-property')).toContainText('Longueur maximale')
  await expect(dialog.getByTestId('equivalents-source-value')).toHaveText('120')
  await expect(dialog.getByTestId('equivalent-cnig_SUP_A2_2016')).toContainText(': 80')
  await dialog.getByTestId('equivalents-apply').click()
  await expect(page.getByTestId('notice')).toContainText('Longueur maximale appliqué à 2 éléments')
  await expect(page.getByTestId('changed-count')).toHaveText('3 fichier(s) modifié(s)')

  // Une étape d'annulation pour la série : la source garde sa valeur.
  await page.getByTestId('undo').click()
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  await page.getByTestId('redo').click()
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('3 fichiers enregistrés')
  expect([maxLength(A1), maxLength('cnig_SUP_A2_2016'), maxLength('cnig_SUP_A3_2016')]).toEqual([120, 120, 120])
})

test('élément décoché non modifié ; « déjà à jour » ; aucun équivalent hors famille', async ({ page }) => {
  const dialog = await editNomgest(page, '120')
  await dialog.getByTestId('equivalent-cnig_SUP_A3_2016').getByRole('checkbox').uncheck()
  await expect(dialog.getByTestId('equivalents-apply')).toHaveText('Appliquer à 1 élément')
  await dialog.getByTestId('equivalents-apply').click()
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('2 fichiers enregistrés')
  expect([maxLength('cnig_SUP_A2_2016'), maxLength('cnig_SUP_A3_2016')]).toEqual([120, 80])

  await page.getByTestId('column-NOMGEST').getByTestId('equivalents').click()
  await expect(dialog.getByTestId('equivalent-cnig_SUP_A2_2016')).toContainText('déjà à jour')
  await dialog.getByLabel('Toute la configuration').check()
  await expect(dialog.getByTestId('equivalents-absent')).toContainText('cnig_PLU_2017')
})

test('accessibilité de la fenêtre', async ({ page }) => {
  const dialog = await editNomgest(page, '120')
  // Fin de l'animation d'ouverture : sinon les couleurs mesurées sont celles d'un fondu.
  await expect(page.locator('.v-overlay__content').filter({ has: dialog })).toHaveCSS('opacity', '1')
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')} ${n.failureSummary}`))).toEqual([])
})

// US3 : tableau de comparaison des équivalents.
test('comparer : valeur divergente marquée, modèle absent, accessibilité', async ({ page }) => {
  const a2 = join(server.dir, GEST('cnig_SUP_A2_2016'))
  const table = JSON.parse(readFileSync(a2, 'utf8'))
  table.columns.find((c: { name: string }) => c.name === 'NOMGEST').constraints.maxLength = 33
  writeFileSync(a2, JSON.stringify(table, null, 4))
  const a3 = join(server.dir, GEST('cnig_SUP_A3_2016'))
  const other = JSON.parse(readFileSync(a3, 'utf8'))
  other.columns = other.columns.filter((c: { name: string }) => c.name !== 'NOMGEST')
  writeFileSync(a3, JSON.stringify(other, null, 4))

  await page.goto(`${server.url}#/${GEST(A1)}`)
  await page.getByTestId('column-NOMGEST').click()
  await page.getByTestId('column-NOMGEST').getByTestId('equivalents').click()
  const dialog = page.getByTestId('equivalents-dialog')
  await dialog.getByTestId('equivalents-tab-compare').click()
  await expect(dialog.getByTestId('equivalents-divergent')).toHaveText('1 élément sur 1 diffère de GESTIONNAIRE_SUP.NOMGEST (valeurs marquées « ≠ »).')
  await expect(dialog.getByTestId(`compare-row-${A1}`)).toContainText('(source)')
  await expect(dialog.getByTestId('compare-row-cnig_SUP_A2_2016')).toContainText('≠ 33')
  await expect(dialog.getByTestId('equivalents-absent')).toHaveText('Sans élément équivalent : cnig_SUP_A3_2016')
  await expect(dialog.getByTestId('equivalents-apply')).toHaveCount(0)

  await expect(page.locator('.v-overlay__content').filter({ has: dialog })).toHaveCSS('opacity', '1')
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')} ${n.failureSummary}`))).toEqual([])
})

// US2 : fichiers attendus en série.
test('REGLEMENT passé en « Obligatoire » et appliqué en série, puis annulé', async ({ page }) => {
  const mandatory = (m: string) => JSON.parse(readFileSync(join(server.dir, `${m}/files.json`), 'utf8')).files.find((f: { name: string }) => f.name === 'REGLEMENT').mandatory
  await page.goto(`${server.url}#/${A1}/files.json`)
  const reglement = page.getByTestId('file-REGLEMENT')
  await reglement.click()
  await reglement.getByTestId('file-mandatory').click()
  await page.getByRole('option', { name: 'Obligatoire (ERROR)' }).click()
  await reglement.getByTestId('equivalents').click()
  const dialog = page.getByTestId('equivalents-dialog')
  await expect(dialog.getByTestId('equivalents-property')).toContainText('Présence')
  await expect(dialog.getByTestId('equivalent-cnig_SUP_A2_2016')).toContainText(': OPTIONAL')
  await dialog.getByTestId('equivalents-apply').click()
  await expect(page.getByTestId('notice')).toContainText('Présence appliqué à 2 éléments')
  await page.getByTestId('undo').click()
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  await page.getByTestId('redo').click()
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('3 fichiers enregistrés')
  expect([A1, 'cnig_SUP_A2_2016', 'cnig_SUP_A3_2016'].map(mandatory)).toEqual(['ERROR', 'ERROR', 'ERROR'])
})

test('déclaration de liste : bouton « Équivalents » et liste des équivalents', async ({ page }) => {
  await page.goto(`${server.url}#/${A1}/files.json`)
  await page.getByTestId('code-ListeValidegestSUP').getByTestId('equivalents').click()
  const dialog = page.getByTestId('equivalents-dialog')
  await expect(dialog.getByTestId('equivalent-cnig_SUP_A2_2016')).toBeVisible()
  await expect(dialog.getByTestId('equivalent-cnig_SUP_A3_2016')).toBeVisible()
})
