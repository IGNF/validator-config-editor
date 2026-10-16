import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { defineConfig } from 'vitest/config'

const alias = {
  '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
  '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
  '@cli': fileURLToPath(new URL('./src/cli', import.meta.url)),
}

// Interface : site statique servi par `vce serve` depuis dist/ui.
export default defineConfig({
  base: './',
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: { alias },
  build: { outDir: 'dist/ui', emptyOutDir: true },
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
})
