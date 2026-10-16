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
    // Les tests modifient librement des fixtures JSON.
    files: ['tests/**/*.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
  {
    // Principe III : le cœur reste du TypeScript pur, sans dépendance à l'UI ni à Node.
    files: ['src/core/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        paths: ['fs', 'fs/promises', 'path', 'http', 'url', 'os', 'child_process'].map((name) => ({ name, message: 'src/core ne doit pas dépendre de Node (principe III).' })),
        patterns: [
          { group: ['vue', 'vue/*', 'vuetify', 'vuetify/*', 'pinia', '@ui/*', '**/ui/**', '@cli/*', '**/cli/**'], message: 'src/core ne doit dépendre ni de l\'UI ni de la CLI (principe III).' },
          { group: ['node:*'], message: 'src/core ne doit pas dépendre de Node (principe III).' },
        ],
      }],
    },
  },
)
