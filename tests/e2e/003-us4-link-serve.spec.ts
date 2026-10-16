import { expect, test } from '@playwright/test'
import { asRepo } from '../support/github-fake'
import { readConfig } from '../support/fixtures'
import { mockGitHub } from './support/github-mock'

test('vce serve : un lien ?depot=… ouvre le dépôt au lieu du dossier local', async ({ page }) => {
  await mockGitHub(page, { 'IGNF/validator-config-test': { defaultBranch: 'main', branches: { main: asRepo(new Map([...readConfig()].filter(([p]) => p.startsWith('GPU_MEC_2025/')))) } } })
  await page.goto('./?depot=IGNF/validator-config-test')
  await expect(page.getByTestId('branches')).toContainText('main')
  await expect(page.getByTestId('summary')).toContainText('1 modèle,')
})
