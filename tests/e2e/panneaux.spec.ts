import { expect, test } from '@playwright/test'

// Panneaux latéraux rétractables et redimensionnables ; retrait réduit de l'arbre des modèles.
test.beforeEach(async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})

// Un panneau masqué est poussé hors de l'écran (Vuetify) : il n'est plus dans la zone visible.
test('masquer et réafficher les panneaux ; l\'état est conservé au rechargement', async ({ page }) => {
  await page.getByTestId('toggle-models').click()
  await expect(page.getByTestId('models-panel')).not.toBeInViewport()
  await expect(page.getByTestId('toggle-models')).toHaveAttribute('aria-pressed', 'false')
  await page.getByTestId('toggle-problems').click()
  await expect(page.getByTestId('problems-panel')).not.toBeInViewport()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await expect(page.getByTestId('models-panel')).not.toBeInViewport()
  await expect(page.getByTestId('problems-panel')).not.toBeInViewport()
  await page.getByTestId('toggle-models').click()
  await page.getByTestId('toggle-problems').click()
  await expect(page.getByTestId('models-panel')).toBeInViewport()
  await expect(page.getByTestId('problems-panel')).toBeInViewport()
})

test('largeur réglable au clavier, bornée, conservée au rechargement', async ({ page }) => {
  const handle = page.getByRole('separator', { name: 'Largeur du panneau des modèles' })
  await expect(handle).toHaveAttribute('aria-valuenow', '340')
  await handle.focus()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(handle).toHaveAttribute('aria-valuenow', '380')
  // La largeur du panneau suit, après l'animation de Vuetify.
  await expect.poll(async () => Math.round((await page.getByTestId('models-panel').boundingBox())!.width)).toBe(380)
  for (let i = 0; i < 40; i++) await page.keyboard.press('ArrowLeft')
  await expect(handle).toHaveAttribute('aria-valuenow', '220')
  await page.keyboard.press('ArrowRight')
  await page.reload()
  await expect(page.getByRole('separator', { name: 'Largeur du panneau des modèles' })).toHaveAttribute('aria-valuenow', '240')
  // Panneau de droite : la flèche gauche l'élargit.
  const right = page.getByRole('separator', { name: 'Largeur du panneau des problèmes' })
  await right.focus()
  await page.keyboard.press('ArrowLeft')
  await expect(right).toHaveAttribute('aria-valuenow', '440')
})

test('largeur réglable à la souris', async ({ page }) => {
  const box = (await page.getByRole('separator', { name: 'Largeur du panneau des modèles' }).boundingBox())!
  const y = box.y + box.height / 2
  await page.mouse.move(box.x + box.width / 2, y)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width / 2 + 100, y, { steps: 5 })
  await page.mouse.up()
  await expect(page.getByRole('separator', { name: 'Largeur du panneau des modèles' })).toHaveAttribute('aria-valuenow', '440')
})

test('arbre : retrait réduit entre le modèle et ses fichiers', async ({ page }) => {
  const model = (await page.getByTestId('model-cnig_PLU_2017').locator('.v-list-item-title').boundingBox())!
  const table = (await page.getByRole('link', { name: 'DOC_URBA', exact: true }).locator('.v-list-item-title').boundingBox())!
  // Avant : 56 px de retrait plus 32 px entre l'icône et le texte.
  expect(table.x - model.x).toBeLessThan(50)
})
