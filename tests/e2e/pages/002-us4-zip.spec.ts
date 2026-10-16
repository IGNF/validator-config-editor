import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const ROOT = join(import.meta.dirname, '../../..')
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'
let tmp: string
let config: string

const walk = (root: string, dir = root): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(root, p) : [relative(root, p)]
  })

test.beforeEach(async ({ page }) => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-zip-'))
  config = join(tmp, 'config')
  cpSync(join(ROOT, 'tests/fixtures/config'), config, { recursive: true })
  await page.goto('./')
  await page.getByTestId('folder-input').setInputFiles(config)
  await expect(page.getByTestId('summary')).toBeVisible()
})
test.afterEach(() => rmSync(tmp, { recursive: true, force: true }))

async function editMaxLength(page: Page, value: string) {
  await page.goto(`./#/${ZONE_URBA}`)
  await page.getByTestId('column-TYPEZONE').click()
  await page.getByTestId('column-TYPEZONE').getByTestId('column-maxLength').getByRole('spinbutton').fill(value)
}

// Télécharge le ZIP et le décompresse (lecteur indépendant : zipfile de Python).
async function downloadAndExtract(page: Page): Promise<string> {
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-zip').click()])
  expect(download.suggestedFilename()).toBe('config.zip')
  const archive = join(tmp, 'config.zip')
  await download.saveAs(archive)
  const out = join(tmp, 'extrait')
  const r = spawnSync('python3', ['-I', '-m', 'zipfile', '-e', archive, out], { encoding: 'utf8' })
  expect(r.status, r.stderr).toBe(0)
  return join(out, 'config')
}

test('télécharge toute la configuration : seul le fichier modifié diffère, d\'une ligne', async ({ page }) => {
  await editMaxLength(page, '5')
  const extracted = await downloadAndExtract(page)
  const expected = walk(config).filter((p) => /\.(json|csv)$/.test(p)).sort()
  expect(walk(extracted).sort()).toEqual(expected)
  for (const p of expected) {
    const before = readFileSync(join(config, p))
    const after = readFileSync(join(extracted, p))
    if (p === ZONE_URBA) {
      const a = before.toString().split('\n')
      expect(after.toString().split('\n').filter((l, i) => l !== a[i])).toEqual(['                "maxLength": 5'])
    } else expect(after.equals(before), p).toBe(true)
  }
  const check = spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', extracted], { encoding: 'utf8' })
  expect(check.status).toBe(0)
  await expect(page.getByTestId('notice')).toContainText('Configuration téléchargée : config.zip')
})

test('téléchargement permis avec des erreurs, nombre rappelé', async ({ page }) => {
  await page.goto(`./#/${ZONE_URBA}`)
  await page.getByTestId('column-LIB_IDZONE').click()
  await page.getByTestId('column-LIB_IDZONE').getByTestId('column-reference').getByRole('textbox').fill('INCONNUE.ID')
  const extracted = await downloadAndExtract(page)
  await expect(page.getByTestId('notice')).toContainText('1 erreur restante')
  const check = spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', extracted], { encoding: 'utf8' })
  expect(check.status).toBe(1)
  expect(check.stdout).toContain('ERR-REFERENCE-TARGET')
})
