import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy } from './support/serve'

// Feature 012, US1 et US2 : arbre réduit aux modèles, élément courant mis en évidence, listes depuis la vue du modèle.
const SUP = 'cnig_SUP_A1_2016'

test('arbre : modèles seuls, un clic ouvre la vue du modèle', async ({ page }) => {
  await page.goto(`./#/${SUP}/types/SERVITUDE.json`)
  const tree = page.getByTestId('models-panel')
  const model = page.getByTestId(`model-${SUP}`)
  await expect(model).toHaveAttribute('aria-current', 'page')
  await expect(model).toHaveClass(/current/)
  await expect(model).toBeInViewport()
  await expect(tree).not.toContainText('Fichiers (')
  await expect(tree).not.toContainText('Modèle (files.json)')
  await expect(tree.locator('[data-testid^="expected-"]')).toHaveCount(0)

  await page.getByTestId('model-cnig_PLU_2017').click()
  await expect(page).toHaveURL(/#\/cnig_PLU_2017\/files\.json$/)
  await expect(page.getByRole('heading', { name: /^Modèle / })).toBeVisible()
  await expect(page.getByTestId('model-cnig_PLU_2017')).toHaveAttribute('aria-current', 'page')
  await expect(model).not.toHaveAttribute('aria-current', 'page')
})

test('« Listes de codes (N) » mène aux listes du modèle ; modèle mis en évidence sur une liste', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/files.json')
  await expect(page.getByTestId('model-tab-codes')).toHaveText('Listes de codes (7)')
  await page.getByTestId('model-tab-codes').click()
  await expect(page.getByTestId('code-lists')).toBeVisible()
  const etat = page.getByTestId('code-ListeEtatPLU')
  await etat.getByRole('link', { name: 'ListeEtatPLU' }).click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU' })).toBeVisible()
  await expect(page.getByTestId('model-cnig_PLU_2017')).toHaveAttribute('aria-current', 'page')
})

test('table non référencée : listée dans la vue du modèle', async ({ page }) => {
  const server = await serveCopy()
  try {
    copyFileSync(join(server.dir, `${SUP}/types/SERVITUDE.json`), join(server.dir, `${SUP}/types/ANCIENNE.json`))
    await page.goto(`${server.url}#/${SUP}/files.json`)
    await page.getByTestId('model-tab-tables').click()
    const list = page.getByTestId('unreferenced-tables')
    await expect(list).toContainText('types/ANCIENNE.json')
    await list.getByRole('link', { name: 'types/ANCIENNE.json' }).click()
    await expect(page).toHaveURL(new RegExp(`#/${SUP}/types/ANCIENNE\\.json$`))
  } finally {
    server.stop()
  }
})

test('vue du modèle : fichiers attendus rangés selon l\'arborescence', async ({ page }) => {
  await page.goto(`./#/${SUP}/files.json`)
  await page.getByTestId('model-tab-files').click()
  const rows = page.locator('[data-testid^="file-"][data-depth]')
  const order = await rows.evaluateAll((els) => els.map((e) => `${e.getAttribute('data-depth')}:${e.getAttribute('data-testid')!.slice(5)}`))
  // Fichiers d'abord, puis chaque dossier suivi de son contenu, en retrait.
  expect(order.slice(0, 4)).toEqual(['0:METADONNEES', '0:Actes', '1:ACTE', '1:REGLEMENT'])
  expect(order).toContain('1:GESTIONNAIRE_SUP')
  expect(order.indexOf('1:GESTIONNAIRE_SUP')).toBeGreaterThan(order.indexOf('0:Donnees_geographiques'))
  await expect(page.getByTestId('file-Actes')).toHaveClass(/folder/)
  await expect(page.getByTestId('file-ACTE')).toHaveClass(/nested/)
  // Type donné par l'icône seule (libellé au survol), crayon pour ouvrir le formulaire.
  const meta = page.getByTestId('file-METADONNEES')
  await expect(meta.getByTestId('file-type-icon')).toHaveAttribute('aria-label', 'Fiche de métadonnées')
  await expect(meta.locator('.v-expansion-panel-title')).not.toContainText('Fiche de métadonnées')
  const [folder, child] = await Promise.all([page.getByTestId('file-Actes').boundingBox(), page.getByTestId('file-ACTE').boundingBox()])
  expect(child!.x).toBeGreaterThan(folder!.x)
  expect(Math.round(child!.x + child!.width)).toBeLessThanOrEqual(Math.round(folder!.x + folder!.width))
})

test('vue du modèle : onglets, onglet choisi par l\'adresse, tables du modèle', async ({ page }) => {
  await page.goto(`./#/${SUP}/files.json`)
  await expect(page.getByTestId('model-tab-model')).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByTestId('model-name')).toBeVisible()
  await expect(page.getByTestId('code-lists-button')).toHaveCount(0)
  // Téléchargement du fichier à côté des onglets Vue / Source.
  await expect(page.getByTestId('download-file')).toHaveText('Télécharger le JSON')

  await page.getByTestId('model-tab-tables').click()
  await expect(page.getByTestId('model-tab-tables')).toHaveAttribute('aria-selected', 'true')
  const gest = page.getByTestId('model-table-GESTIONNAIRE_SUP')
  await expect(gest).toContainText('6')
  await gest.getByRole('link', { name: 'GESTIONNAIRE_SUP' }).click()
  await expect(page.getByRole('heading', { name: 'Table GESTIONNAIRE_SUP' })).toBeVisible()

  // Lien vers un fichier attendu (arbre, problème) : onglet « Fichiers ».
  await page.goto(`./#/${SUP}/files.json?p=%2Ffiles%2F2`)
  await expect(page.getByTestId('model-tab-files')).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByTestId('file-REGLEMENT')).toBeVisible()
  await page.getByTestId('model-tab-codes').click()
  await expect(page.getByTestId('code-ListeValidegestSUP')).toBeVisible()
  await expect(page.getByTestId('code-table').locator('thead th')).toHaveText(['Liste', 'Fichier', 'Valeurs', 'Problèmes', 'Actions'])
})
