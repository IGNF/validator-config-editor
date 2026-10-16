import { expect, test } from '@playwright/test'
import { BASE_URL } from '../../playwright.config'

// Principe V : l'interface ne charge aucune ressource distante.
test('aucune requête vers une autre origine', async ({ page }) => {
  const remote: string[] = []
  page.on('request', (r) => {
    if (!r.url().startsWith(BASE_URL) && !r.url().startsWith('data:')) remote.push(r.url())
  })
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await page.goto('./#/cnig_PLU_2017/gpu.json')
  await expect(page.getByRole('heading', { name: 'Surcharges GpU de cnig_PLU_2017' })).toBeVisible()
  expect(remote).toEqual([])
})
