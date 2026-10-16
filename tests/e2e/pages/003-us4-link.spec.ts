import { expect, test } from '@playwright/test'
import { asRepo } from '../../support/github-fake'
import { readConfig } from '../../support/fixtures'
import { mockGitHub } from '../support/github-mock'

const REPOS = { 'IGNF/validator-config-test': { defaultBranch: 'main', branches: { main: asRepo(readConfig()), 'feat/x': asRepo(readConfig(), 'autre/') } } }

test('l\'adresse donne le dépôt, la branche, le dossier et l\'élément ; la recharger rouvre la même vue', async ({ page }) => {
  await mockGitHub(page, REPOS)
  await page.goto('./')
  await page.getByTestId('home-open-repo').click()
  await page.getByTestId('repo-url').getByRole('textbox').fill('https://github.com/IGNF/validator-config-test/tree/feat/x/autre')
  await page.getByTestId('repo-submit').click()
  await expect(page.getByTestId('summary')).toBeVisible()
  await page.goto(`${page.url()}#/cnig_PLU_2017/types/ZONE_URBA.json?p=${encodeURIComponent('/columns/7')}`)
  const url = new URL(page.url())
  expect(url.searchParams.get('depot')).toBe('IGNF/validator-config-test')
  expect(url.searchParams.get('branche')).toBe('feat/x')
  expect(url.searchParams.get('dossier')).toBe('autre')

  // Un autre utilisateur ouvre le même lien.
  const other = await page.context().newPage()
  await mockGitHub(other, REPOS)
  await other.goto(url.toString())
  await expect(other.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await expect(other.getByTestId('column-TYPEZONE')).toHaveClass(/highlight/)
  await expect(other.getByTestId('branches')).toContainText('feat/x')
})

test('un dossier local retire le dépôt de l\'adresse', async ({ page }) => {
  await mockGitHub(page, REPOS)
  await page.goto('./?depot=IGNF/validator-config-test&branche=main')
  await expect(page.getByTestId('branches')).toContainText('main')
  await page.getByTestId('other-folder').click()
  await page.getByTestId('folder-input').setInputFiles('tests/fixtures/config')
  await expect(page.getByTestId('branches')).toHaveCount(0)
  expect(new URL(page.url()).searchParams.has('depot')).toBe(false)
})
