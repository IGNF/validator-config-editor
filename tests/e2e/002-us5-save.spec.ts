import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
const DOC_URBA = 'cnig_PLU_2017/types/DOC_URBA.json'

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  await page.goto(`${server.url}#/${ZONE_URBA}`)
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
})
test.afterEach(() => server.stop())

async function editMaxLength(page: Page, value: string) {
  await page.getByTestId('column-TYPEZONE').click()
  await page.getByTestId('column-TYPEZONE').getByTestId('column-maxLength').getByRole('spinbutton').fill(value)
  await expect(page.getByTestId('changed-count')).toBeVisible()
}

test('enregistre seulement les fichiers modifiés (Ctrl+S)', async ({ page }) => {
  const before = readFileSync(join(server.dir, ZONE_URBA), 'utf8')
  const other = readFileSync(join(server.dir, DOC_URBA), 'utf8')
  await editMaxLength(page, '5')
  await page.keyboard.press('Control+s')
  await expect(page.getByTestId('notice')).toContainText('1 fichier enregistré')
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
  const after = readFileSync(join(server.dir, ZONE_URBA), 'utf8')
  const lines = before.split('\n')
  expect(after.split('\n').filter((l, i) => l !== lines[i])).toEqual(['                "maxLength": 5'])
  expect(readFileSync(join(server.dir, DOC_URBA), 'utf8')).toBe(other)
  // Rechargé depuis le disque : la modification est bien là.
  await page.getByTestId('reload').click()
  await page.getByTestId('column-TYPEZONE').click()
  await expect(page.getByTestId('column-TYPEZONE')).toContainText('longueur ≤ 5')
})

test('refuse d\'écraser un fichier modifié sur disque, sans perdre les modifications', async ({ page }) => {
  await editMaxLength(page, '5')
  writeFileSync(join(server.dir, ZONE_URBA), readFileSync(join(server.dir, ZONE_URBA), 'utf8').replace('ZONE_URBA', 'ZONE_URBA_AUTRE'))
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText(`Non enregistré : ${ZONE_URBA}`)
  await expect(page.getByTestId('notice')).toContainText('modifié sur disque')
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  expect(readFileSync(join(server.dir, ZONE_URBA), 'utf8')).toContain('ZONE_URBA_AUTRE')
})
