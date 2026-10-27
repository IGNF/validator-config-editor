import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Édition du contenu d'une liste de codes : valeur, ligne ajoutée, ligne retirée.
let server: TempServer
const ETAT = 'cnig_PLU_2017/codes/ListeEtatPLU.csv'
test.beforeEach(async ({ page }) => {
  server = await serveCopy()
  await page.goto(`${server.url}#/${ETAT}`)
  await expect(page.getByRole('heading', { name: 'Liste de codes ListeEtatPLU' })).toBeVisible()
})
test.afterEach(() => server.stop())

test('valeur modifiée et ligne ajoutée, enregistrées ; seule la ligne touchée change', async ({ page }) => {
  const original = readFileSync(join(server.dir, ETAT), 'utf8')
  const first = page.getByTestId('cell-0-0')
  await first.fill('10')
  await first.press('Enter')
  await expect(page.getByTestId('changed-count')).toHaveText('1 fichier(s) modifié(s)')
  await page.getByTestId('add-row').click()
  const last = page.locator('[data-testid="code-values"] tbody tr:last-child input').first()
  await expect(last).toBeFocused()
  await last.fill('99')
  await last.press('Enter')
  await page.getByTestId('save').click()
  await expect(page.getByTestId('notice')).toContainText('1 fichier enregistré')
  const saved = readFileSync(join(server.dir, ETAT), 'utf8').split('\n')
  const before = original.split('\n')
  expect(saved[1]).toBe('10')
  expect(saved.slice(2, before.length - 1)).toEqual(before.slice(2, before.length - 1))
  expect(saved.at(-2)).toBe('99')
})

test('ligne retirée', async ({ page }) => {
  const rows = page.locator('[data-testid="code-values"] tbody tr')
  const count = await rows.count()
  await page.getByTestId('remove-row-0').click()
  await expect(rows).toHaveCount(count - 1)
})

test('accessibilité de la liste modifiable', async ({ page }) => {
  const { violations } = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`))).toEqual([])
})

test('liste à une colonne : valeur vide refusée', async ({ page }) => {
  const first = page.getByTestId('cell-0-0')
  const before = await first.inputValue()
  await first.fill('')
  await first.press('Enter')
  await expect(page.getByTestId('notice')).toContainText('ne peut pas avoir de valeur vide')
  await expect(first).toHaveValue(before)
  await expect(page.getByTestId('changed-count')).toHaveCount(0)
})
