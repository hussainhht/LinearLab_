import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  resolve: { alias: { '@': root } },
  test: {
    projects: [
      // Pure logic and content checks; no build needed. `npm test`.
      { extends: true, test: { name: 'unit', include: ['tests/unit/**/*.test.ts'], environment: 'node' } },
      // Inspects the static export in out/; run after `npm run build`. `npm run verify:export`.
      { extends: true, test: { name: 'export', include: ['tests/export/**/*.test.ts'], environment: 'node' } },
    ],
  },
})
