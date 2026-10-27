import { expect, test } from '@playwright/test'

// Titre d'une vue : chemin du fichier au survol.
test('chemin du fichier au survol du titre', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  const title = page.getByRole('heading', { name: 'Table ZONE_URBA' })
  await expect(title).toHaveAttribute('title', 'cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByTestId('frame-file-path')).toHaveCount(0)
})
