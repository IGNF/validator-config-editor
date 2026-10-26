import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

// Feature 008, US2 : télécharger un modèle en ZIP (éditeur en ligne).
const ROOT = join(import.meta.dirname, '../../..')
const PLU = 'cnig_PLU_2017'
let tmp: string
let config: string

const walk = (root: string, dir = root): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(root, p) : [relative(root, p)]
  })

async function open(page: Page) {
  await page.goto('./')
  await page.getByTestId('folder-input').setInputFiles(config)
  await expect(page.getByTestId('summary')).toBeVisible()
}

test.beforeEach(() => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-model-'))
  config = join(tmp, 'config')
  cpSync(join(ROOT, 'tests/fixtures/config'), config, { recursive: true })
})
test.afterEach(() => rmSync(tmp, { recursive: true, force: true }))

// Télécharge le ZIP d'un modèle et le décompresse (lecteur indépendant : zipfile de Python).
async function downloadModel(page: Page, button: string, model: string): Promise<string> {
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId(button).click()])
  expect(download.suggestedFilename()).toBe(`${model}.zip`)
  const archive = join(tmp, `${model}.zip`)
  await download.saveAs(archive)
  const out = join(tmp, 'extrait')
  const r = spawnSync('python3', ['-I', '-m', 'zipfile', '-e', archive, out], { encoding: 'utf8' })
  expect(r.status, r.stderr).toBe(0)
  return out
}

test('le ZIP du modèle contient son seul dossier, identique, et se valide seul', async ({ page }) => {
  await open(page)
  await page.goto(`./#/${PLU}/files.json`)
  const out = await downloadModel(page, 'download-model', PLU)
  expect(readdirSync(out)).toEqual([PLU])
  const expected = walk(join(config, PLU)).filter((p) => /\.(json|csv)$/.test(p)).sort()
  expect(walk(join(out, PLU)).sort()).toEqual(expected)
  for (const p of expected) expect(readFileSync(join(out, PLU, p)).equals(readFileSync(join(config, PLU, p))), p).toBe(true)
  const check = spawnSync('node', [join(ROOT, 'bin/vce.js'), 'check', out], { encoding: 'utf8' })
  expect(check.status, check.stdout).toBe(0)
  expect(check.stdout).toContain('1 modèle,')
  await expect(page.getByTestId('notice')).toContainText(`Modèle téléchargé : ${PLU}.zip`)
})

test('depuis l\'arbre ; modification et erreurs restantes du modèle', async ({ page }) => {
  await open(page)
  await page.goto(`./#/${PLU}/types/ZONE_URBA.json`)
  await page.getByTestId('column-LIB_IDZONE').click()
  await page.getByTestId('column-LIB_IDZONE').getByTestId('column-reference').getByRole('textbox').fill('INCONNUE.ID')
  const out = await downloadModel(page, `download-model-${PLU}`, PLU)
  expect(readFileSync(join(out, PLU, 'types/ZONE_URBA.json'), 'utf8')).toContain('INCONNUE.ID')
  await expect(page.getByTestId('notice')).toContainText(`Modèle téléchargé : ${PLU}.zip (1 erreur restante)`)
  // Téléchargement partiel : la modification reste en attente.
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
})

test('référence vers un autre modèle : signalée dans le message', async ({ page }) => {
  const path = join(config, 'GPU_MEC_2025/files.json')
  const doc = JSON.parse(readFileSync(path, 'utf8'))
  doc.codes = [{ data: `../${PLU}/codes/ListeEtatPLU.csv`, name: 'ListeEtatPLU', title: 'ListeEtatPLU' }]
  writeFileSync(path, JSON.stringify(doc, null, 4))
  await open(page)
  await page.goto('./#/GPU_MEC_2025/files.json')
  await downloadModel(page, 'download-model', 'GPU_MEC_2025')
  await expect(page.getByTestId('notice')).toContainText(`Références vers d'autres modèles, absentes de l'archive : ../${PLU}/codes/ListeEtatPLU.csv`)
})
