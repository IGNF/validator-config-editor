import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 010, US1 : regex affichées avec les variables de variables.json (vce serve).
const ROOT = join(import.meta.dirname, '../..')
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
let server: TempServer

test.beforeEach(async () => {
  server = await serveCopy()
})
test.afterEach(() => server.stop())

const withVariables = () => copyFileSync(join(ROOT, 'tests/fixtures/variables.json'), join(server.dir, 'variables.json'))

test('motif de colonne affiché avec les variables, regex complète au survol', async ({ page }) => {
  withVariables()
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  const motif = page.getByTestId('column-LIB_IDZONE').locator('.constraint', { hasText: 'motif' })
  await expect(motif).toHaveText('motif <INSEE_COMMUNE>_PLU_[0-9]{8}_ZO<ENTIER>')
  await expect(motif).toHaveAttribute('title', '[AB0-9]{5}_PLU_[0-9]{8}_ZO[0-9]+')
})

test('chemin d\'un fichier attendu et nom du dossier affichés avec les variables', async ({ page }) => {
  withVariables()
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  await page.getByTestId('model-tab-files').click()
  const zone = page.getByTestId('regex').filter({ hasText: 'ZONE_URBA' })
  await expect(zone).toHaveText('Donnees_geographiques/<INSEE_COMMUNE>_ZONE_URBA_[0-9]{8}')
  await expect(zone).toHaveAttribute('title', 'Donnees_geographiques/[AB0-9]{5}_ZONE_URBA_[0-9]{8}')
  // Champ : regex complète, forme à variables en aide (onglet « Modèle »).
  await page.getByTestId('model-tab-model').click()
  await expect(page.getByTestId('model-folderName').getByRole('textbox')).toHaveValue('[a-zA-Z0-9]+_PLU_[0-9]{8}(_[a-zA-Z])?')
  await expect(page.getByTestId('model-folderName')).toContainText('Affichage : [a-zA-Z0-9]+_PLU_[0-9]{8}<_PART_OPT>')
})

test('variables facultatives (_OPT) en jaune, les autres en étiquette simple', async ({ page }) => {
  withVariables()
  await page.goto(`${server.url}#/cnig_PLU_2017/files.json`)
  const optional = page.getByTestId('model-folderName').getByTestId('variable-optional')
  await expect(optional).toHaveText('<_PART_OPT>')
  await expect(optional).toHaveAttribute('title', '_PART_OPT : (_[a-zA-Z])? (facultatif)')
  await expect(optional).toHaveClass(/optional/)
  await expect(optional).toHaveCSS('color', 'rgb(61, 47, 0)')
  await page.getByTestId('model-tab-files').click()
  const zone = page.getByTestId('regex').filter({ hasText: 'ZONE_URBA' })
  await expect(zone.getByTestId('variable')).toHaveText('<INSEE_COMMUNE>')
  // Variables en bleu, facultatives en jaune, regex encadrée.
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(zone.getByTestId('variable')).toHaveCSS('color', 'rgb(26, 95, 180)')
  await expect(zone).toHaveClass(/regex/)
  await expect(zone.getByTestId('variable-optional')).toHaveCount(0)
})

test('saisie d\'une variable : la regex complète est enregistrée', async ({ page }) => {
  withVariables()
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  await page.getByTestId('column-DATVALID').click()
  await page.getByTestId('column-DATVALID').getByTestId('column-pattern').getByRole('textbox').fill('<DATE>')
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('1 fichier enregistré')
  const saved = JSON.parse(readFileSync(join(server.dir, ZONE_URBA), 'utf8'))
  const column = saved.columns.find((c: { name: string }) => c.name === 'DATVALID')
  expect(column.constraints.pattern).toBe('([0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])|00000000)')
})

test('alias de la famille : <IDGEST> pour un modèle SUP, saisie de l\'alias acceptée', async ({ page }) => {
  withVariables()
  await page.goto(`${server.url}#/cnig_SUP_A1_2016/files.json`)
  await expect(page.getByTestId('model-folderName')).toContainText('Affichage : <IDGEST>_A1_[a-zA-Z0-9]+_[0-9]{8}')
  await page.getByTestId('model-folderName').getByRole('textbox').fill('<IDGEST>_A1_<MAILLAGE>_<DATE>')
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('1 fichier enregistré')
  const saved = JSON.parse(readFileSync(join(server.dir, 'cnig_SUP_A1_2016/files.json'), 'utf8'))
  expect(saved.constraints.folderName).toMatch(/^\[0-9\]\{9\}_A1_\(FR\|/)
  expect(saved.constraints.folderName).not.toContain('<')
})

test('sans variables.json : regex affichées telles quelles', async ({ page }) => {
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  await expect(page.getByTestId('column-LIB_IDZONE').locator('.constraint', { hasText: 'motif' })).toHaveText('motif [AB0-9]{5}_PLU_[0-9]{8}_ZO[0-9]+')
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')
})

test('variables.json invalide : problème signalé, regex telles quelles', async ({ page }) => {
  writeFileSync(join(server.dir, 'variables.json'), '{ "validator_file_model": {} }')
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  await expect(page.getByTestId('problem-ERR-VARIABLES-FORMAT')).toBeVisible()
  await expect(page.getByTestId('column-LIB_IDZONE').locator('.constraint', { hasText: 'motif' })).toHaveText('motif [AB0-9]{5}_PLU_[0-9]{8}_ZO[0-9]+')
})
