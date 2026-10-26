import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'
import { serveCopy, type TempServer } from './support/serve'

// Feature 008, US1 : télécharger le fichier affiché, dans vce serve.
let server: TempServer
const GPU = 'cnig_PLU_2017/gpu.json'

test.beforeEach(async () => {
  server = await serveCopy()
})
test.afterEach(() => server.stop())

test('télécharge le fichier affiché, identique à celui du disque', async ({ page }) => {
  await page.goto(`${server.url}#/${GPU}`)
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-file').click()])
  expect(download.suggestedFilename()).toBe('gpu.json')
  const out = join(server.dir, '..', 'gpu.json')
  await download.saveAs(out)
  expect(readFileSync(out).equals(readFileSync(join(server.dir, GPU)))).toBe(true)
  await expect(page.getByTestId('notice')).toContainText('Fichier téléchargé : gpu.json')
})
