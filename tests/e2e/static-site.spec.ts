import { TOOLS } from '../../components/tools/catalog'
import { basePath } from '../../config/deployment.mjs'
import { lessons } from '../../content/lessons/catalog'
import { practiceProblems } from '../../data/examples/practice'
import { expect, test } from './fixtures'

/**
 * Behaviour that only matters for a static host such as GitHub Pages: every generated route can be
 * opened directly, nothing is requested outside the base path, and no asset is missing.
 * Routes come from the same data the site is generated from.
 */
const routes = [
  './',
  'learn/',
  'tools/',
  'practice/',
  ...TOOLS.map((tool) => tool.href.slice(1)),
  ...lessons.map((lesson) => `learn/${lesson.slug}/`),
  ...practiceProblems.map((problem) => `practice/${problem.id}/`),
]

for (const route of routes) {
  test(`loads ${route} with every asset under the base path`, async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin
    const requests: { url: string; status: number }[] = []
    page.on('response', (response) => requests.push({ url: response.url(), status: response.status() }))

    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()

    const own = requests.filter((r) => r.url.startsWith(origin))
    expect(own.length).toBeGreaterThan(3)
    expect(
      own.filter((r) => r.status >= 400),
      'failed requests',
    ).toEqual([])
    expect(
      own.filter((r) => !new URL(r.url).pathname.startsWith(`${basePath}/`)).map((r) => r.url),
      'requests outside the base path',
    ).toEqual([])
    // The page's own favicon comes from the app, so it must resolve under the base path too.
    await expect(page.locator('link[rel~="icon"]').first()).toHaveAttribute('href', new RegExp(`^${basePath}/icon`))
  })
}

test('stylesheets, scripts and fonts all load on the home page', async ({ page }) => {
  const types = new Set<string>()
  page.on('response', (response) => {
    if (response.ok()) types.add(response.request().resourceType())
  })
  await page.goto('./')
  await page.waitForLoadState('networkidle')
  expect([...types]).toEqual(expect.arrayContaining(['document', 'stylesheet', 'script', 'font']))
})

test('a generated lesson route survives a refresh and renders its math', async ({ page }) => {
  await page.goto('learn/inverse-2x2/')
  await expect(page.locator('.katex').first()).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Inverting a 2×2 matrix')
  await expect(page.locator('.katex').first()).toBeVisible()
})

test('a tool with a problem in the URL survives a refresh', async ({ page }) => {
  await page.goto('tools/rref/?A=1,1;1,-1&b=3,1')
  await expect(page.locator('#rref-0-2')).toHaveValue('3')
  await page.reload()
  await expect(page.locator('#rref-0-2')).toHaveValue('3')
  await expect(page.locator('#rref-2-0')).toHaveCount(0)
})

test('the practice route generated from data opens directly and works', async ({ page }) => {
  const problem = practiceProblems[0]!
  await page.goto(`practice/${problem.id}/`)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(problem.title)
  await page.getByText('Typing').click()
  await page.getByLabel('Row operation').fill('R1 <-> R2')
  await page.getByRole('button', { name: 'Apply operation' }).click()
  await expect(page.getByRole('list', { name: 'Operations so far' })).toContainText('R₁ ↔ R₂')
})
