import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { asRepo } from '../../support/github-fake'
import { readConfig, FIXTURES } from '../../support/fixtures'
import { mockGitHub } from '../support/github-mock'
import { join } from 'node:path'

const known = (dir: string) => asRepo(readConfig(join(FIXTURES, '..', dir)))

test.beforeEach(async ({ page }) => {
  await mockGitHub(page, {
    'IGNF/validator-config-gpu': { defaultBranch: 'main', branches: { 'json-source': asRepo(readConfig()), main: new Map() } },
    'IGNF/validator-config-ppr': { defaultBranch: 'main', branches: { main: known('known/ppr') } },
  })
  await page.goto('./')
})

test('l\'accueil liste les configurations connues avec leur branche de référence', async ({ page }) => {
  await expect(page.getByTestId('known-validator-config-gpu')).toContainText('branche json-source')
  for (const repo of ['dgpr', 'naviforest', 'ppr']) await expect(page.getByTestId(`known-validator-config-${repo}`)).toContainText('branche par défaut')
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.map((v) => `${v.id} — ${v.help}`)).toEqual([])
})

test('un clic ouvre la configuration (branche par défaut)', async ({ page }) => {
  await page.getByTestId('known-validator-config-ppr').click()
  await expect(page.getByTestId('branches')).toContainText('main')
  await expect(page.getByTestId('summary')).toContainText('1 modèle,')
})

test('gpu s\'ouvre sur json-source, aussi depuis la fenêtre « Ouvrir un dépôt »', async ({ page }) => {
  await page.getByTestId('home-open-repo').click()
  await page.getByRole('dialog').getByTestId('known-validator-config-gpu').click()
  await expect(page.getByTestId('branches')).toContainText('json-source')
  await expect(page.getByTestId('summary')).toContainText('4 modèles')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})
