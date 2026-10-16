import { defineConfig, devices } from '@playwright/test'

export const BASE_URL = 'http://127.0.0.1:4173/'
/** Éditeur en ligne (build « pages »), servi statiquement comme sur GitHub Pages. */
export const PAGES_URL = 'http://127.0.0.1:4174/'

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', testIgnore: 'pages/**', use: { ...devices['Desktop Chrome'], baseURL: BASE_URL } },
    { name: 'firefox', testIgnore: 'pages/**', use: { ...devices['Desktop Firefox'], baseURL: BASE_URL } },
    { name: 'pages-chromium', testMatch: 'pages/**', use: { ...devices['Desktop Chrome'], baseURL: PAGES_URL } },
    { name: 'pages-firefox', testMatch: 'pages/**', use: { ...devices['Desktop Firefox'], baseURL: PAGES_URL } },
  ],
  webServer: [
    {
      command: 'npm run build && node bin/vce.js serve tests/fixtures/config --port 4173',
      url: BASE_URL,
      // Jamais de serveur réutilisé : un serveur resté ouvert servirait une ancienne version de l'interface.
      reuseExistingServer: false,
      timeout: 180_000,
    },
    {
      command: 'npm run build:pages && npx vite preview --mode pages --host 127.0.0.1 --port 4174 --strictPort',
      url: PAGES_URL,
      // Jamais de serveur réutilisé : un serveur resté ouvert servirait une ancienne version de l'interface.
      reuseExistingServer: false,
      timeout: 180_000,
    },
  ],
})
