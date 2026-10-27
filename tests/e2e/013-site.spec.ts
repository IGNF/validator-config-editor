import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'
import { tmpdir } from 'node:os'
import { extname, join, normalize } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Feature 013, US1 et US2 : site produit par `vce site`, servi statiquement sous un sous-chemin
// (comme https://ignf.github.io/<dépôt>/), en lecture seule.
const ROOT = join(import.meta.dirname, '../..')
const TYPES: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.txt': 'text/plain' }
let dir: string
let server: Server
let url: string

test.beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), 'vce-site-e2e-'))
  execFileSync('node', [join(ROOT, 'bin/vce.js'), 'site', join(ROOT, 'tests/fixtures/config'), join(dir, '_site'), '--title', 'Fixtures (test)'])
  server = createServer((req, res) => {
    const path = decodeURIComponent((req.url ?? '/').split('?')[0]!)
    if (!path.startsWith('/depot/')) return void res.writeHead(404).end()
    let file = normalize(join(dir, '_site', path.slice('/depot/'.length)))
    if (statSync(file, { throwIfNoEntry: false })?.isDirectory()) file = join(file, 'index.html')
    try {
      const body = readFileSync(file)
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(body)
    } catch {
      res.writeHead(404).end()
    }
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/depot/`
})
test.afterAll(() => {
  server.close()
  rmSync(dir, { recursive: true, force: true })
})

const EDIT_CONTROLS = ['save', 'add-file', 'remove-file', 'add-code', 'new-code-list', 'copy-code-list', 'add-column', 'remove-column', 'add-conditions', 'add-foreignKeys', 'fix-all', 'fix-menu']
async function noEditing(page: Page) {
  for (const id of EDIT_CONTROLS) await expect(page.getByTestId(id), id).toHaveCount(0)
  // Champs du panneau principal : tous en lecture seule (les filtres des panneaux restent utilisables).
  // Les cases à cocher n'ont pas d'attribut readonly : vérifiées par un clic sans effet.
  // Le champ « Tester un nom » reste utilisable : il ne modifie rien.
  const editable = page.locator('main').locator('input:not([readonly]):not([type="hidden"]):not([type="checkbox"]), textarea:not([readonly])')
  expect(await editable.evaluateAll((els) => els.filter((e) => !e.closest('[data-testid="regex-tester"]')).length)).toBe(0)
}

test('modèle, table, liste : lecture seule, bandeau, titre, aucune ressource distante', async ({ page }) => {
  const outside: string[] = []
  page.on('request', (r) => { if (!r.url().startsWith(url)) outside.push(r.url()) })
  await page.goto(`${url}#/cnig_PLU_2017/files.json`)
  await expect(page.getByRole('heading', { name: 'Modèle cnig_PLU_2017' })).toBeVisible()
  await expect(page.getByTestId('read-only-banner')).toContainText('Lecture seule')
  await expect(page.getByTestId('config-source')).toHaveCount(0)
  await noEditing(page)

  await page.getByTestId('model-tab-files').click()
  await page.getByTestId('file-ZONE_URBA').click()
  await page.getByRole('main').getByRole('link', { name: /Ouvrir la table/ }).click()
  await expect(page.getByRole('heading', { name: 'Table ZONE_URBA' })).toBeVisible()
  await page.getByTestId('column-TYPEZONE').click()
  await noEditing(page)
  const unique = page.getByTestId('column-TYPEZONE').getByRole('checkbox', { name: 'Unique' })
  const before = await unique.isChecked()
  await unique.click({ force: true })
  expect(await unique.isChecked()).toBe(before)
  await expect(page.getByTestId('changed-count')).toHaveCount(0)

  await page.goto(`${url}#/cnig_PLU_2017/codes/ListeEtatPLU.csv`)
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU' })).toBeVisible()
  await noEditing(page)
  expect(outside).toEqual([])
})

test('comparaison en lecture, pas d\'« Appliquer aux semblables » ; téléchargement disponible', async ({ page }) => {
  await page.goto(`${url}#/cnig_PLU_2017/?compare=GPU_MEC_2025`)
  await expect(page.getByTestId('compare-total')).toBeVisible()
  await page.goto(`${url}#/cnig_SUP_A1_2016/types/GESTIONNAIRE_SUP.json`)
  await page.getByTestId('column-NOMGEST').click()
  await expect(page.getByTestId('column-NOMGEST').getByTestId('equivalents')).toHaveCount(0)
  await expect(page.getByTestId('download-zip')).toBeVisible()
})

for (const scheme of ['light', 'dark'] as const) {
  test(`accessibilité du site (${scheme === 'light' ? 'clair' : 'sombre'})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto(`${url}#/cnig_PLU_2017/files.json`)
    await expect(page.getByTestId('read-only-banner')).toBeVisible()
    const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
  })
}
