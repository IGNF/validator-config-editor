import { expect, test } from '@playwright/test'

// Arbre : catégorie « Fichiers » (fichiers attendus autres que les tables) ; chemin discret.
test('catégorie Fichiers rangée par dossier, qui ouvre le fichier attendu dans la vue du modèle', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/files.json')
  const tree = page.getByRole('navigation', { name: 'Modèles' })
  await expect(tree.getByText('Fichiers (33)')).toBeVisible()
  // Dossiers repliés : leurs fichiers n'apparaissent qu'une fois dépliés.
  await expect(page.getByTestId('expected-cnig_PLU_2017-JUGEMENT')).toBeHidden()
  await expect(page.getByTestId('expected-cnig_PLU_2017-DOC_URBA')).toBeVisible()
  await page.getByTestId('expected-cnig_PLU_2017-Pieces_ecrites').click()
  await expect(page.getByTestId('expected-cnig_PLU_2017-Pieces_ecrites')).toHaveAttribute('aria-expanded', 'true')
  await page.getByTestId('expected-cnig_PLU_2017-0_Procedure').click()
  await page.getByTestId('expected-cnig_PLU_2017-JUGEMENT').click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2017\/files\.json\?p=%2Ffiles%2F\d+$/)
  await expect(page.locator('.highlight')).toContainText('JUGEMENT')
  await page.getByTestId('expected-cnig_PLU_2017-Donnees_geographiques').click()
  await expect(page.getByTestId('expected-cnig_PLU_2017-ZONE_URBA')).toBeVisible()
})

test('chemin du fichier en bas de la vue et au survol du titre', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  const title = page.getByRole('heading', { name: 'Table ZONE_URBA' })
  await expect(title).toHaveAttribute('title', 'cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByTestId('frame-file-path')).toHaveText('Fichier : cnig_PLU_2017/types/ZONE_URBA.json')
})
