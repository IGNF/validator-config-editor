import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const alias = {
  '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
  '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
  '@cli': fileURLToPath(new URL('./src/cli', import.meta.url)),
}

// GitHub Pages n'envoie pas d'en-têtes : la CSP est mise en <meta> (plan 002, R10).
const CSP = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"
const cspMeta = (): Plugin => ({
  name: 'csp-meta',
  transformIndexHtml: (html) => html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
})

// Licences des polices embarquées (OFL-1.1, 012 R4) : livrées avec le build, à côté des polices.
const fontLicences = (): Plugin => ({
  name: 'font-licences',
  generateBundle() {
    for (const font of ['open-sans', 'fira-sans']) {
      this.emitFile({ type: 'asset', fileName: `licences/${font}.txt`, source: readFileSync(fileURLToPath(new URL(`./node_modules/@fontsource/${font}/LICENSE`, import.meta.url)), 'utf8') })
    }
  },
})

// Interface : servie par `vce serve` depuis dist/ui, ou publiée sur GitHub Pages (mode « pages »).
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [vue(), vuetify({ autoImport: true }), fontLicences(), ...(mode === 'pages' ? [cspMeta()] : [])],
  resolve: { alias },
  build: { outDir: mode === 'pages' ? 'dist/pages' : 'dist/ui', emptyOutDir: true },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/core/**/*.ts'],
      exclude: ['src/core/schemas/generated/**'],
      thresholds: { lines: 90 },
    },
  },
}))
