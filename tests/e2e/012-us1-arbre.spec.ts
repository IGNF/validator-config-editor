import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy } from './support/serve'

// Feature 012, US1 et US2 : arbre allégé, élément courant mis en évidence, listes depuis la vue du modèle.
const SUP = 'cnig_SUP_A1_2016'

test('arbre : fichiers attendus seulement, une table s\'ouvre depuis son fichier', async ({ page }) => {
  await page.goto(`./#/${SUP}/files.json`)
  const tree = page.getByTestId('models-panel')
  const model = page.getByTestId(`model-${SUP}`)
  await expect(model).toHaveAttribute('aria-current', 'true')
  await expect(model).toHaveClass(/current/)
  await expect(tree).not.toContainText('Tables (')
  await expect(tree).not.toContainText('Listes de codes (')

  await page.getByTestId(`expected-${SUP}-Donnees_geographiques`).click()
  const gest = page.getByTestId(`expected-${SUP}-GESTIONNAIRE_SUP`)
  await expect(gest).toHaveAttribute('href', `#/${SUP}/types/GESTIONNAIRE_SUP.json`)
  await gest.click()
  await expect(page.getByRole('heading', { name: 'Table GESTIONNAIRE_SUP' })).toBeVisible()
  await expect(gest).toHaveAttribute('aria-current', 'page')
  // Un fichier qui n'est pas une table s'ouvre dans la vue du modèle.
  await expect(page.getByTestId(`expected-${SUP}-REGLEMENT`)).toHaveAttribute('href', new RegExp(`#/${SUP}/files\\.json\\?p=%2Ffiles%2F\\d+$`))
})

test('adresse d\'une table : modèle et dossier dépliés, ligne visible et mise en évidence', async ({ page }) => {
  await page.goto(`./#/${SUP}/types/SERVITUDE.json`)
  const line = page.getByTestId(`expected-${SUP}-SERVITUDE`)
  await expect(line).toHaveAttribute('aria-current', 'page')
  await expect(line).toBeInViewport()
})

test('« Listes de codes (N) » mène aux listes du modèle ; modèle mis en évidence sur une liste', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/files.json')
  await expect(page.getByTestId('model-tab-codes')).toHaveText('Listes de codes (7)')
  await page.getByTestId('model-tab-codes').click()
  await expect(page.getByTestId('code-lists')).toBeVisible()
  const etat = page.getByTestId('code-ListeEtatPLU')
  await expect(etat).toContainText(/Ouvrir \(\d+ valeurs\)/)
  await etat.getByRole('link', { name: /^Ouvrir/ }).click()
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU' })).toBeVisible()
  await expect(page.getByTestId('model-cnig_PLU_2017')).toHaveAttribute('aria-current', 'true')
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

test('accordéon : un seul modèle ouvert ; bloc du modèle affiché encadré ; pas de téléchargement dans l\'arbre', async ({ page }) => {
  await page.goto(`./#/${SUP}/files.json`)
  const group = page.getByTestId(`model-group-${SUP}`)
  await expect(group).toHaveClass(/current-group/)
  await expect(group).toHaveCSS('border-top-color', 'rgb(26, 95, 180)')
  await expect(page.getByTestId('models-panel').getByText('Télécharger le modèle')).toHaveCount(0)
  await expect(page.getByTestId(`expected-${SUP}-ACTE`)).toBeAttached()

  // Ouvrir un autre modèle referme le premier.
  await page.getByTestId('model-cnig_PLU_2017').click()
  await expect(page.getByTestId('model-cnig_PLU_2017')).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId(`model-${SUP}`)).toHaveAttribute('aria-expanded', 'false')
  // Naviguer vers un autre modèle l'ouvre et referme les autres.
  await page.goto('./#/GPU_MEC_2025/files.json')
  await expect(page.getByTestId('model-GPU_MEC_2025')).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('model-cnig_PLU_2017')).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByTestId('model-group-GPU_MEC_2025')).toHaveClass(/current-group/)
  await expect(page.getByTestId(`model-group-${SUP}`)).not.toHaveClass(/current-group/)
})

test('vue du modèle : fichiers attendus rangés selon l\'arborescence', async ({ page }) => {
  await page.goto(`./#/${SUP}/files.json`)
  await page.getByTestId('model-tab-files').click()
  const rows = page.locator('[data-testid^="file-"][data-depth]')
  const order = await rows.evaluateAll((els) => els.map((e) => `${e.getAttribute('data-depth')}:${e.getAttribute('data-testid')!.slice(5)}`))
  // Chaque dossier est suivi de son contenu, en retrait.
  expect(order.slice(0, 3)).toEqual(['0:Actes', '1:ACTE', '1:REGLEMENT'])
  expect(order).toContain('1:GESTIONNAIRE_SUP')
  expect(order.indexOf('1:GESTIONNAIRE_SUP')).toBeGreaterThan(order.indexOf('0:Donnees_geographiques'))
  await expect(page.getByTestId('file-Actes')).toHaveClass(/folder/)
  await expect(page.getByTestId('file-ACTE')).toHaveClass(/nested/)
  const [folder, child] = await Promise.all([page.getByTestId('file-Actes').boundingBox(), page.getByTestId('file-ACTE').boundingBox()])
  expect(child!.x).toBeGreaterThan(folder!.x)
  expect(Math.round(child!.x + child!.width)).toBeLessThanOrEqual(Math.round(folder!.x + folder!.width))
})

test('vue du modèle : onglets, bandeau qui ouvre l\'onglet, onglet choisi par l\'adresse, tables du modèle', async ({ page }) => {
  await page.goto(`./#/${SUP}/files.json`)
  await expect(page.getByTestId('model-tab-model')).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByTestId('model-name')).toBeVisible()
  await expect(page.getByTestId('code-lists-button')).toHaveCount(0)
  // Téléchargement du fichier à côté des onglets Vue / Source.
  await expect(page.getByTestId('download-file')).toHaveText('Télécharger le JSON')

  await page.getByTestId('summary-tables').click()
  await expect(page.getByTestId('model-tab-tables')).toHaveAttribute('aria-selected', 'true')
  const gest = page.getByTestId('model-table-GESTIONNAIRE_SUP')
  await expect(gest).toContainText('6')
  await gest.getByRole('link', { name: 'GESTIONNAIRE_SUP' }).click()
  await expect(page.getByRole('heading', { name: 'Table GESTIONNAIRE_SUP' })).toBeVisible()

  // Lien vers un fichier attendu (arbre, problème) : onglet « Fichiers ».
  await page.goto(`./#/${SUP}/files.json?p=%2Ffiles%2F2`)
  await expect(page.getByTestId('model-tab-files')).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByTestId('file-REGLEMENT')).toBeVisible()
  await page.getByTestId('summary-codes').click()
  await expect(page.getByTestId('code-ListeValidegestSUP')).toBeVisible()
})
