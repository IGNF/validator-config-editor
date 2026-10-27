import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 008, US1 : télécharger le fichier affiché, dans vce serve.
let server: TempServer
const FILES = 'cnig_PLU_2017/files.json'

test.beforeEach(async () => {
  server = await serveCopy()
})
test.afterEach(() => server.stop())

test('télécharge le fichier affiché, identique à celui du disque', async ({ page }) => {
  await page.goto(`${server.url}#/${FILES}`)
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-file').click()])
  expect(download.suggestedFilename()).toBe('files.json')
  const out = join(server.dir, '..', 'files.json')
  await download.saveAs(out)
  expect(readFileSync(out).equals(readFileSync(join(server.dir, FILES)))).toBe(true)
  await expect(page.getByTestId('notice')).toContainText('Fichier téléchargé : files.json')
})
