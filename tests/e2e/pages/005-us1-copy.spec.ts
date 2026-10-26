import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

// Feature 005, US1 : copier une liste de codes existante (éditeur en ligne).
const ROOT = join(import.meta.dirname, '../../..')
const PLU = 'cnig_PLU_2017'
const MEC = 'GPU_MEC_2025'
let tmp: string
let config: string

test.beforeEach(async ({ page }) => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-copy-'))
  config = join(tmp, 'config')
  cpSync(join(ROOT, 'tests/fixtures/config'), config, { recursive: true })
  await page.goto('./')
  await page.getByTestId('folder-input').setInputFiles(config)
  await expect(page.getByTestId('summary')).toBeVisible()
})
test.afterEach(() => rmSync(tmp, { recursive: true, force: true }))

async function pick(page: Page, model: string, filter: string, source: string) {
  await page.goto(`./#/${model}/files.json`)
  await page.getByTestId('copy-code-list').click()
  await page.getByTestId('code-list-filter').getByRole('textbox').fill(filter)
  await page.getByTestId(source).click()
}

test('copie une liste d\'un autre modèle : CSV identique dans le ZIP, déclarée, sans problème', async ({ page }) => {
  await pick(page, MEC, 'ListeEtat', `source-${PLU}-ListeEtatPLU`)
  await expect(page.getByTestId('copy-preview')).toContainText('colonnes : ETAT')
  await expect(page.getByTestId('copy-name').getByRole('textbox')).toHaveValue('ListeEtatPLU')
  await page.getByTestId('confirm-copy').click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU' })).toBeVisible()
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')
  await page.goto(`./#/${MEC}/files.json`)
  await expect(page.getByTestId('code-ListeEtatPLU')).toBeVisible()

  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-zip').click()])
  const archive = join(tmp, 'config.zip')
  await download.saveAs(archive)
  const out = join(tmp, 'extrait')
  expect(spawnSync('python3', ['-I', '-m', 'zipfile', '-e', archive, out]).status).toBe(0)
  const copied = readFileSync(join(out, 'config', MEC, 'codes/ListeEtatPLU.csv'))
  expect(copied.equals(readFileSync(join(config, PLU, 'codes/ListeEtatPLU.csv')))).toBe(true)
  expect(spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', join(out, 'config')]).status).toBe(0)
})

test('duplication dans le même modèle : nom _COPIE proposé, nom existant refusé', async ({ page }) => {
  await pick(page, PLU, 'ListeEtat', `source-${PLU}-ListeEtatPLU`)
  const name = page.getByTestId('copy-name').getByRole('textbox')
  await expect(name).toHaveValue('ListeEtatPLU_COPIE')
  await name.fill('ListeEtatPLU')
  await expect(page.getByTestId('copy-name')).toContainText('déjà déclarée')
  await expect(page.getByTestId('confirm-copy')).toBeDisabled()
  await name.fill('ListeEtatPLU_bis')
  await page.getByTestId('confirm-copy').click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU_bis' })).toBeVisible()
})

test('Ctrl+Z retire la copie en un pas', async ({ page }) => {
  await pick(page, MEC, 'ListeEtat', `source-${PLU}-ListeEtatPLU`)
  await page.getByTestId('confirm-copy').click()
  await expect(page.getByTestId('changed-count')).toHaveText('2 fichier(s) modifié(s)')
  await page.getByTestId('undo').click()
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
  await page.goto(`./#/${MEC}/files.json`)
  await expect(page.getByTestId('code-ListeEtatPLU')).toHaveCount(0)
})
