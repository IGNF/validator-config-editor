import { expect, test } from '@playwright/test'

// Clés étrangères et conditions en SQL, badges de présence colorés, boutons « semblables ».
test('conditions et clés étrangères affichées comme du SQL, mots-clés en bleu gras', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('./#/cnig_PLU_2017/types/DOC_URBA.json')
  const condition = page.getByTestId('conditions-0-sql')
  await expect(condition).toContainText('IS NOT NULL')
  const keyword = condition.locator('.keyword').first()
  await expect(keyword).toHaveCSS('color', 'rgb(26, 95, 180)')
  await expect(keyword).toHaveCSS('font-weight', '700')
  await expect(page.getByTestId('foreignKeys-0-sql').locator('.keyword')).toHaveText('REFERENCES')
})

test('fichiers attendus : présence colorée, sans « Monter » ni « Descendre », bouton « fichiers semblables »', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('./#/cnig_PLU_2017/files.json')
  await page.getByTestId('model-tab-files').click()
  const zone = page.getByTestId('file-ZONE_URBA')
  await expect(zone.getByTestId('file-presence')).toHaveText('Obligatoire')
  await expect(zone.getByTestId('file-presence')).toHaveCSS('color', 'rgb(140, 29, 24)')
  await zone.click()
  await expect(zone.getByRole('button', { name: 'Monter' })).toHaveCount(0)
  await expect(zone.getByRole('button', { name: 'Descendre' })).toHaveCount(0)
  await expect(zone.getByTestId('equivalents')).toHaveText('Appliquer aux fichiers semblables')
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await page.getByTestId('column-TYPEZONE').click()
  await expect(page.getByTestId('column-TYPEZONE').getByTestId('equivalents')).toHaveText('Appliquer aux colonnes semblables')
})
