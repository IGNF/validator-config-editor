import { expect, test } from '@playwright/test'

// Arbre : catégorie « Fichiers » (fichiers attendus autres que les tables) ; chemin discret.
test('catégorie Fichiers dans l\'arbre, qui ouvre le fichier attendu dans la vue du modèle', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/files.json')
  await expect(page.getByRole('navigation', { name: 'Modèles' }).getByText('Fichiers (19)')).toBeVisible()
  await page.getByTestId('expected-cnig_PLU_2017-JUGEMENT').click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2017\/files\.json\?p=%2Ffiles%2F\d+$/)
  await expect(page.locator('.highlight')).toContainText('JUGEMENT')
})

test('chemin du fichier en bas de la vue et au survol du titre', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  const title = page.getByRole('heading', { name: 'Table ZONE_URBA' })
  await expect(title).toHaveAttribute('title', 'cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByTestId('frame-file-path')).toHaveText('Fichier : cnig_PLU_2017/types/ZONE_URBA.json')
})
