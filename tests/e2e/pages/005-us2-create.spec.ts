import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'

// Feature 005, US2 : créer une liste de codes vide (éditeur en ligne).
const ROOT = join(import.meta.dirname, '../../..')
const MEC = 'GPU_MEC_2025'
let tmp: string
let config: string

test.beforeEach(async ({ page }) => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-create-'))
  config = join(tmp, 'config')
  cpSync(join(ROOT, 'tests/fixtures/config'), config, { recursive: true })
  await page.goto('./')
  await page.getByTestId('folder-input').setInputFiles(config)
  await expect(page.getByTestId('summary')).toBeVisible()
  await page.goto(`./#/${MEC}/files.json`)
  await page.getByTestId('new-code-list').click()
})
test.afterEach(() => rmSync(tmp, { recursive: true, force: true }))

test('crée ListeTest (CODE,LIBELLE) : en-tête seul, déclarée, sans erreur, affichée', async ({ page }) => {
  await page.getByTestId('new-list-name').getByRole('textbox').fill('ListeTest')
  await expect(page.getByTestId('new-list-columns').getByRole('textbox')).toHaveValue('CODE,LIBELLE')
  await page.getByTestId('confirm-create').click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeTest' })).toBeVisible()
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')

  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-zip').click()])
  const archive = join(tmp, 'config.zip')
  await download.saveAs(archive)
  const out = join(tmp, 'extrait')
  expect(spawnSync('python3', ['-I', '-m', 'zipfile', '-e', archive, out]).status).toBe(0)
  expect(readFileSync(join(out, 'config', MEC, 'codes/ListeTest.csv'), 'utf8')).toBe('CODE,LIBELLE\n')
  expect(JSON.parse(readFileSync(join(out, 'config', MEC, 'files.json'), 'utf8')).codes.at(-1)).toMatchObject({ data: './codes/ListeTest.csv', name: 'ListeTest' })
  expect(spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', join(out, 'config')]).status).toBe(0)
})

test('refuse un nom invalide ou des colonnes en double', async ({ page }) => {
  await page.getByTestId('new-list-name').getByRole('textbox').fill('a b')
  await expect(page.getByTestId('new-list-name')).toContainText('Nom invalide')
  await expect(page.getByTestId('confirm-create')).toBeDisabled()
  await page.getByTestId('new-list-name').getByRole('textbox').fill('ListeTest')
  await page.getByTestId('new-list-columns').getByRole('textbox').fill('CODE, CODE')
  await expect(page.getByTestId('new-list-columns')).toContainText('en double')
  await expect(page.getByTestId('confirm-create')).toBeDisabled()
})
