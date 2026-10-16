import { expect, test, type Page } from '@playwright/test'
import { asRepo } from '../../support/github-fake'
import { readConfig } from '../../support/fixtures'
import { mockGitHub } from '../support/github-mock'

const config = readConfig()
const reduced = new Map([...config].filter(([p]) => p.startsWith('cnig_PLU_2017/')))
const REPOS = {
  'IGNF/validator-config-test': { defaultBranch: 'main', branches: { main: asRepo(config), 'json-source': asRepo(reduced) } },
}

async function openRepo(page: Page, url: string) {
  await page.getByTestId('home-open-repo').click()
  await page.getByTestId('repo-url').getByRole('textbox').fill(url)
  await page.getByTestId('repo-submit').click()
}

test.beforeEach(async ({ page }) => {
  await mockGitHub(page, REPOS)
  await page.goto('./')
})

test('ouvre la branche donnée par /tree/<branche>', async ({ page }) => {
  await openRepo(page, 'https://github.com/IGNF/validator-config-test/tree/json-source')
  await expect(page.getByTestId('branches')).toContainText('json-source')
  await expect(page.getByTestId('summary')).toContainText('1 modèle,')
})

test('change de branche depuis la barre, avec confirmation s\'il y a des modifications', async ({ page }) => {
  await openRepo(page, 'IGNF/validator-config-test')
  await expect(page.getByTestId('summary')).toContainText('4 modèles')
  // Changement de fragment seulement : l'adresse garde ?depot=… (pas de rechargement).
  await page.evaluate(() => (location.hash = '#/cnig_PLU_2017/types/ZONE_URBA.json'))
  await page.getByTestId('table-name').getByRole('textbox').fill('ZONE')
  await page.getByTestId('branches').click()
  await expect(page.getByTestId('branch-option')).toHaveText(['main', 'json-source'])
  page.once('dialog', (d) => d.dismiss())
  await page.getByTestId('branch-option').filter({ hasText: 'json-source' }).click()
  await expect(page.getByTestId('branches')).toContainText('main')
  await page.getByTestId('branches').click()
  page.once('dialog', (d) => d.accept())
  await page.getByTestId('branch-option').filter({ hasText: 'json-source' }).click()
  await expect(page.getByTestId('branches')).toContainText('json-source')
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
})

test('branche inexistante : message et branche par défaut proposée', async ({ page }) => {
  await openRepo(page, 'https://github.com/IGNF/validator-config-test/tree/absente')
  await expect(page.getByTestId('repo-error')).toContainText('Branche « absente » introuvable dans IGNF/validator-config-test.')
  await page.getByTestId('repo-suggestion').click()
  await expect(page.getByTestId('branches')).toContainText('main')
  await expect(page.getByTestId('summary')).toContainText('4 modèles')
})
