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

test('fichiers attendus : présence colorée, sans « Monter » ni « Descendre », bouton « fichiers semblables » après modification', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('./#/cnig_PLU_2017/files.json')
  await page.getByTestId('model-tab-files').click()
  const zone = page.getByTestId('file-ZONE_URBA')
  await expect(zone.getByTestId('file-presence')).toHaveText('Obligatoire')
  await expect(zone.getByTestId('file-presence')).toHaveCSS('color', 'rgb(140, 29, 24)')
  await zone.click()
  await expect(zone.getByRole('button', { name: 'Monter' })).toHaveCount(0)
  await expect(zone.getByRole('button', { name: 'Descendre' })).toHaveCount(0)
  // « Appliquer aux … semblables » n'apparaît qu'une fois l'élément modifié.
  await expect(zone.getByTestId('equivalents')).toHaveCount(0)
  await zone.getByTestId('file-mandatory').click()
  await page.getByRole('option', { name: 'Facultatif (OPTIONAL)' }).click()
  await expect(zone.getByTestId('equivalents')).toHaveText('Appliquer aux fichiers semblables')
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  const typezone = page.getByTestId('column-TYPEZONE')
  await typezone.click()
  await expect(typezone.getByTestId('equivalents')).toHaveCount(0)
  await typezone.getByTestId('column-maxLength').getByRole('spinbutton').fill('99')
  await expect(typezone.getByTestId('equivalents')).toHaveText('Appliquer aux colonnes semblables')
})
