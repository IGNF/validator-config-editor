import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// CLI : un seul fichier dist/cli.js, toutes dépendances embarquées (principe VI).
export default defineConfig({
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@cli': fileURLToPath(new URL('./src/cli', import.meta.url)),
    },
  },
  ssr: { noExternal: true },
  build: {
    ssr: 'src/cli/index.ts',
    target: 'node22',
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: { output: { entryFileNames: 'cli.js', format: 'es' } },
  },
})
