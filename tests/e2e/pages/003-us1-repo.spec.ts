import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { PAGES_URL } from '../../../playwright.config'
import { asRepo } from '../../support/github-fake'
import { readConfig } from '../../support/fixtures'
import { mockGitHub } from '../support/github-mock'

const config = readConfig()
const REPOS = {
  'IGNF/validator-config-test': { defaultBranch: 'main', branches: { main: asRepo(config), dev: asRepo(config, 'autre/') } },
}

async function openRepo(page: Page, url: string) {
  await page.getByTestId('home-open-repo').click()
  await page.getByTestId('repo-url').getByRole('textbox').fill(url)
  await page.getByTestId('repo-submit').click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('ouvre un dépôt par son URL : config/ détecté, source affichée, mêmes résultats que vce check', async ({ page }) => {
  const fake = await mockGitHub(page, REPOS)
  await openRepo(page, 'https://github.com/IGNF/validator-config-test')
  await expect(page.getByTestId('summary')).toContainText('4 modèles, 22 tables, 15 listes de codes')
  await expect(page.getByTestId('source')).toHaveText('IGNF/validator-config-test · main · config')
  await expect(page.getByTestId('source')).toHaveAttribute('href', 'https://github.com/IGNF/validator-config-test/tree/commit-main/config')
  await expect(page.getByTestId('problems-count')).toHaveText('0 problème')
  expect(fake.calls.filter((c) => c.startsWith('https://api.github.com'))).toHaveLength(3)
})

test('ouvre un sous-dossier d\'une branche (/tree/<branche>/<dossier>)', async ({ page }) => {
  await mockGitHub(page, REPOS)
  await openRepo(page, 'https://github.com/IGNF/validator-config-test/tree/dev/autre')
  await expect(page.getByTestId('source')).toHaveText('IGNF/validator-config-test · dev · autre')
  await expect(page.getByTestId('summary')).toContainText('4 modèles')
})

test.describe('erreurs explicites, accueil conservé', () => {
  test('dépôt introuvable ou privé', async ({ page }) => {
    await mockGitHub(page, REPOS)
    await openRepo(page, 'IGNF/inconnu')
    await expect(page.getByTestId('repo-error')).toHaveText('Dépôt IGNF/inconnu introuvable ou privé.')
  })

  test('URL invalide', async ({ page }) => {
    await page.getByTestId('home-open-repo').click()
    await page.getByTestId('repo-url').getByRole('textbox').fill('https://gitlab.com/o/r')
    await expect(page.getByText('Formes acceptées')).toBeVisible()
    await expect(page.getByTestId('repo-submit')).toBeDisabled()
  })

  test('limite de requêtes atteinte', async ({ page }) => {
    const fake = await mockGitHub(page, REPOS)
    fake.rateLimitResetAt = Math.floor(Date.now() / 1000) + 3600
    await openRepo(page, 'IGNF/validator-config-test')
    await expect(page.getByTestId('repo-error')).toContainText('Limite de requêtes anonymes à GitHub atteinte')
    await expect(page.getByTestId('repo-error')).toContainText('Réessayer après')
  })
})

test('édite et télécharge en ZIP, nommé d\'après le dépôt ; seul GitHub est contacté', async ({ page }) => {
  await mockGitHub(page, REPOS)
  const others: string[] = []
  page.on('request', (r) => {
    const url = r.url()
    if (![PAGES_URL, 'https://api.github.com/', 'https://raw.githubusercontent.com/', 'data:'].some((o) => url.startsWith(o))) others.push(url)
  })
  await openRepo(page, 'IGNF/validator-config-test')
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  // La navigation par fragment ne recharge pas la page : la configuration reste ouverte.
  await page.getByTestId('column-TYPEZONE').click()
  await page.getByTestId('column-TYPEZONE').getByTestId('column-maxLength').getByRole('spinbutton').fill('5')
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-zip').click()])
  expect(download.suggestedFilename()).toBe('validator-config-test.zip')
  const tmp = mkdtempSync(join(tmpdir(), 'vce-repo-zip-'))
  try {
    await download.saveAs(join(tmp, 'a.zip'))
    expect(spawnSync('python3', ['-I', '-m', 'zipfile', '-e', join(tmp, 'a.zip'), tmp]).status).toBe(0)
    expect(readFileSync(join(tmp, 'validator-config-test/cnig_PLU_2017/types/ZONE_URBA.json'), 'utf8')).toContain('"maxLength": 5')
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
  expect(others).toEqual([])
})
