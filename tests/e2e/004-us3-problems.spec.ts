import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

let server: TempServer
const ZONE_URBA = 'cnig_PLU_2017/types/ZONE_URBA.json'

test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  const path = join(server.dir, ZONE_URBA)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.columns[7].constraints.reference = 'INCONNUE.ID'
  writeFileSync(path, JSON.stringify(data, null, 4))
  writeFileSync(join(server.dir, 'cnig_PLU_2017/codes/Orpheline.csv'), 'A\n1\n')
  await page.goto(server.url)
  await expect(page.getByTestId('problems-count')).toHaveText('2 problèmes')
})
test.afterEach(() => server.stop())

test('problèmes groupés par fichier, en clair, localisés par noms', async ({ page }) => {
  const table = page.getByTestId(`group-${ZONE_URBA}`)
  await expect(table).toContainText('Table ZONE_URBA')
  await expect(table).toContainText('cnig_PLU_2017 · 1 erreur')
  const problem = table.getByTestId('problem-ERR-REFERENCE-TARGET')
  await expect(problem).toContainText('Erreur')
  await expect(problem).toContainText('Référence vers une colonne inexistante')
  await expect(problem).toContainText('Colonne TYPEZONE · référence')
  await expect(table).toContainText('ERR-REFERENCE-TARGET')
  await expect(table).not.toContainText('/columns/7')

  const list = page.getByTestId('group-cnig_PLU_2017/codes/Orpheline.csv')
  await expect(list).toContainText('Liste Orpheline')
  await expect(list.getByTestId('problem-WARN-UNREFERENCED-FILE')).toContainText('Avertissement')
  await expect(list).toContainText('Fichier non utilisé')
})

test('groupes repliables', async ({ page }) => {
  const table = page.getByTestId(`group-${ZONE_URBA}`)
  await table.getByRole('button', { name: /Table ZONE_URBA/ }).click()
  await expect(table.getByTestId('problem-ERR-REFERENCE-TARGET')).toBeHidden()
})

test('accessibilité du panneau avec des problèmes', async ({ page }) => {
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.map((v) => `${v.id} (${v.impact}) — ${v.help}`)).toEqual([])
})
