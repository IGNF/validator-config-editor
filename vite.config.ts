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

// Interface : servie par `vce serve` depuis dist/ui, ou publiée sur GitHub Pages (mode « pages »).
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [vue(), vuetify({ autoImport: true }), ...(mode === 'pages' ? [cspMeta()] : [])],
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
