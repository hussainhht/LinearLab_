import { defineConfig, devices } from '@playwright/test'
import { basePath } from './config/deployment.mjs'

const port = 4173
// Tests use relative URLs ("tools/rref/"), so the same suite runs against a root deployment and
// against a sub-path deployment such as GitHub Pages (LINEARLAB_BASE_PATH=/LinearLab_).
const siteUrl = `http://localhost:${port}${basePath}/`

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  // A lecture-notes chapter is one to three megabytes of typeset mathematics. Opening one from a link takes a
  // moment even locally (about a second on a quiet machine, several when parallel workers share the CPU), so
  // waiting for that is given more than the 5 s default. A real failure is reported 10 s later, not missed.
  expect: { timeout: 15_000 },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: siteUrl,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      testIgnore: /responsive\.spec\.ts/,
    },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /responsive\.spec\.ts/ },
  ],
  // Tests run against the production static export (`npm run build` first).
  webServer: {
    command: `node scripts/serve-static.mjs ${port}`,
    url: siteUrl,
    reuseExistingServer: !process.env.CI,
  },
})
