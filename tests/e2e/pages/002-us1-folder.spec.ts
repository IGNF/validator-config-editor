import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { PAGES_URL } from '../../../playwright.config'

const ROOT = join(import.meta.dirname, '../../..')
const FIXTURES = join(ROOT, 'tests/fixtures/config')
let tmp: string

test.beforeEach(async ({ page }) => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-pages-'))
  await page.goto('./')
})
test.afterEach(() => rmSync(tmp, { recursive: true, force: true }))

const open = (page: Page, dir: string) => page.getByTestId('folder-input').setInputFiles(dir)

test('accueil : ouvrir un dossier, fichiers restant sur le poste', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Éditeur de configuration validator' })).toBeVisible()
  await expect(page.getByTestId('open-folder')).toBeVisible()
  await expect(page.getByText('rien n\'est envoyé sur le réseau')).toBeVisible()
})

test('ouvre un dossier de modèles : mêmes résultats que vce check', async ({ page }) => {
  const dir = join(tmp, 'config')
  cpSync(FIXTURES, dir, { recursive: true })
  writeFileSync(join(dir, 'cnig_PLU_2017/codes/Orpheline.csv'), 'A\n1\n')
  const report = JSON.parse(spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', dir, '--format', 'json'], { encoding: 'utf8' }).stdout)
  await open(page, dir)
  await expect(page.getByTestId('summary')).toContainText(`${report.summary.models} modèles, ${report.summary.tables} tables`)
  await expect(page.getByTestId('problems-count')).toHaveText(`${report.problems.length} problème`)
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})

test('utilise config/ quand on choisit la racine d\'un dépôt', async ({ page }) => {
  const repo = join(tmp, 'validator-config-test')
  cpSync(FIXTURES, join(repo, 'config'), { recursive: true })
  writeFileSync(join(repo, 'package.json'), '{}')
  mkdirSync(join(repo, '.git'))
  writeFileSync(join(repo, '.git/x.json'), '{}')
  await open(page, repo)
  await expect(page.getByTestId('summary')).toContainText('3 modèles')
  await expect(page.getByTestId('config-source')).toHaveText('validator-config-test/config')
})

test('dossier sans modèle : message explicite, accueil conservé', async ({ page }) => {
  mkdirSync(join(tmp, 'vide'))
  writeFileSync(join(tmp, 'vide/notes.json'), '{}')
  await open(page, join(tmp, 'vide'))
  await expect(page.getByText('Aucun modèle trouvé')).toBeVisible()
  await expect(page.getByTestId('open-folder')).toBeVisible()
})

test('aucune requête vers une autre origine', async ({ page }) => {
  const remote: string[] = []
  page.on('request', (r) => {
    if (!r.url().startsWith(PAGES_URL) && !r.url().startsWith('data:')) remote.push(r.url())
  })
  await open(page, FIXTURES)
  await expect(page.getByTestId('summary')).toBeVisible()
  await page.goto('./#/cnig_PLU_2017/gpu.json')
  expect(remote).toEqual([])
})

test('accessibilité de l\'accueil et de la configuration ouverte', async ({ page }) => {
  const { default: AxeBuilder } = await import('@axe-core/playwright')
  const audit = async () => {
    const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    return violations.map((v) => `${v.id} (${v.impact}) — ${v.help}`)
  }
  expect(await audit()).toEqual([])
  await open(page, FIXTURES)
  await expect(page.getByTestId('summary')).toBeVisible()
  expect(await audit()).toEqual([])
})
