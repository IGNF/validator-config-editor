import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/', 'coverage/', 'node_modules/', 'src/core/schemas/generated/', 'test-results/', 'playwright-report/'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
    },
  },
  {
    // Principe III : le cœur reste du TypeScript pur, sans dépendance à l'UI ni à Node.
    files: ['src/core/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['vue', 'vue/*', 'vuetify', 'vuetify/*', 'pinia', '@ui/*', '**/ui/**', '@cli/*', '**/cli/**'], message: 'src/core ne doit dépendre ni de l\'UI ni de la CLI (principe III).' },
          { group: ['node:*', 'fs', 'path', 'http', 'url', 'os'], message: 'src/core ne doit pas dépendre de Node (principe III).' },
        ],
      }],
    },
  },
)
