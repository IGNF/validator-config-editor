import { expect, test } from '@playwright/test'

// Panneaux latéraux rétractables et redimensionnables ; retrait réduit de l'arbre des modèles.
test.beforeEach(async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})

// Un panneau masqué est poussé hors de l'écran (Vuetify) : il n'est plus dans la zone visible.
test('masquer et réafficher les panneaux ; l\'arbre garde son état au rechargement', async ({ page }) => {
  await page.getByTestId('toggle-models').click()
  await expect(page.getByTestId('models-panel')).not.toBeInViewport()
  await expect(page.getByTestId('toggle-models')).toHaveAttribute('aria-pressed', 'false')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await expect(page.getByTestId('models-panel')).not.toBeInViewport()
  await page.getByTestId('toggle-models').click()
  await expect(page.getByTestId('models-panel')).toBeInViewport()
})

test('problèmes : panneau replié sans problème, ouvert à la demande et quand un problème apparaît', async ({ page }) => {
  await expect(page.getByTestId('problems-panel')).not.toBeInViewport()
  await page.getByTestId('toggle-problems').click()
  await expect(page.getByTestId('problems-panel')).toBeInViewport()
  await page.getByTestId('toggle-problems').click()
  await expect(page.getByTestId('problems-panel')).not.toBeInViewport()
  // Une modification qui crée un problème rouvre le panneau.
  await page.getByTestId('column-LIB_IDZONE').click()
  await page.getByTestId('column-LIB_IDZONE').getByTestId('column-reference').getByRole('textbox').fill('INCONNUE.ID')
  await expect(page.getByTestId('problems-panel')).toBeInViewport()
  await expect(page.getByTestId('problem-ERR-REFERENCE-TARGET')).toBeVisible()
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
  // Panneau de droite (replié sans problème) : la flèche gauche l'élargit.
  await page.getByTestId('toggle-problems').click()
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
