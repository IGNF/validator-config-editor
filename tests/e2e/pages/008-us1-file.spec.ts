import { cpSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

// Feature 008, US1 : télécharger le fichier affiché (éditeur en ligne).
const ROOT = join(import.meta.dirname, '../../..')
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
const LIST = 'cnig_PLU_2017/codes/ListeEtatPLU.csv'
let tmp: string
let config: string

test.beforeEach(async ({ page }) => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-file-'))
  config = join(tmp, 'config')
  cpSync(join(ROOT, 'tests/fixtures/config'), config, { recursive: true })
  await page.goto('./')
  await page.getByTestId('folder-input').setInputFiles(config)
  await expect(page.getByTestId('summary')).toBeVisible()
})
test.afterEach(() => rmSync(tmp, { recursive: true, force: true }))

async function downloadFile(page: Page, expectedName: string): Promise<Buffer> {
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-file').click()])
  expect(download.suggestedFilename()).toBe(expectedName)
  const out = join(tmp, expectedName)
  await download.saveAs(out)
  return readFileSync(out)
}

async function editMaxLength(page: Page, value: string) {
  await page.getByTestId('column-TYPEZONE').click()
  await page.getByTestId('column-TYPEZONE').getByTestId('column-maxLength').getByRole('spinbutton').fill(value)
}

test('fichier non modifié : identique octet pour octet (table et liste de codes)', async ({ page }) => {
  await page.goto(`./#/${ZONE_URBA}`)
  expect((await downloadFile(page, 'ZONE_URBA.json')).equals(readFileSync(join(config, ZONE_URBA)))).toBe(true)
  await page.goto(`./#/${LIST}`)
  expect((await downloadFile(page, 'ListeEtatPLU.csv')).equals(readFileSync(join(config, LIST)))).toBe(true)
  await expect(page.getByTestId('notice')).toContainText('Fichier téléchargé : ListeEtatPLU.csv')
})

test('fichier modifié : seule la ligne modifiée diffère, et la modification reste en attente', async ({ page }) => {
  await page.goto(`./#/${ZONE_URBA}`)
  await editMaxLength(page, '5')
  const before = readFileSync(join(config, ZONE_URBA), 'utf8').split('\n')
  const after = (await downloadFile(page, 'ZONE_URBA.json')).toString().split('\n')
  expect(after.filter((l, i) => l !== before[i])).toEqual(['                "maxLength": 5'])
  // FR-005 : un téléchargement partiel ne vaut pas téléchargement de la configuration.
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  await expect(page.getByTestId('edited')).toBeVisible()
  const dialog = page.waitForEvent('dialog')
  await page.close({ runBeforeUnload: true })
  expect((await dialog).type()).toBe('beforeunload')
})

test('fichier avec erreurs : téléchargé, nombre d\'erreurs rappelé', async ({ page }) => {
  await page.goto(`./#/${ZONE_URBA}`)
  await page.getByTestId('column-LIB_IDZONE').click()
  await page.getByTestId('column-LIB_IDZONE').getByTestId('column-reference').getByRole('textbox').fill('INCONNUE.ID')
  const data = JSON.parse((await downloadFile(page, 'ZONE_URBA.json')).toString())
  expect(JSON.stringify(data)).toContain('INCONNUE.ID')
  await expect(page.getByTestId('notice')).toContainText('Fichier téléchargé : ZONE_URBA.json (1 erreur restante)')
})
