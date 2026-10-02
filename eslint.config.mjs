import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // web/ holds the original static site's browser scripts. They are classic <script>s whose
    // top-level functions are called from inline HTML handlers (onclick="..."), which ESLint cannot
    // see, so "defined but never used" is expected for top-level functions. Everything else
    // (syntax errors, unused locals, unreachable code, ...) is still checked.
    files: ['web/**/*.js'],
    languageOptions: { sourceType: 'script', parserOptions: { sourceType: 'script' } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'local', args: 'after-used', caughtErrors: 'none' }],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'test-results/**', 'playwright-report/**']),
])
