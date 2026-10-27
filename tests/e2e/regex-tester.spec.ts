import { expect, test } from '@playwright/test'

// Essai d'un nom contre une regex : nom du dossier, motif d'une colonne.
test('nom du dossier : accepté, ou refusé à partir de la partie fautive', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/files.json')
  const tester = page.getByTestId('regex-tester')
  await tester.getByTestId('regex-sample').getByRole('textbox').fill('44712_PLU_20240115')
  await expect(tester.getByTestId('regex-verdict')).toHaveText('accepté')
  await tester.getByTestId('regex-sample').getByRole('textbox').fill('44712_PLU_2024')
  await expect(tester.getByTestId('regex-verdict')).toContainText('refusé à partir de')
})

test('motif d\'une colonne : valeur testée', async ({ page }) => {
  await page.goto('./#/cnig_PLU_2017/types/ZONE_URBA.json')
  await page.getByTestId('column-LIB_IDZONE').click()
  const tester = page.getByTestId('column-LIB_IDZONE').getByTestId('regex-tester')
  await tester.getByTestId('regex-sample').getByRole('textbox').fill('44712_PLU_20240115_ZO1')
  await expect(tester.getByTestId('regex-verdict')).toHaveText('accepté')
  await tester.getByTestId('regex-sample').getByRole('textbox').fill('44712_PLU_20240115_ZA1')
  await expect(tester.getByTestId('regex-verdict')).toContainText('refusé')
})
