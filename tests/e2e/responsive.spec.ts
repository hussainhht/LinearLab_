import { expect, test } from './fixtures'

const pages = ['/', '/learn/', '/learn/inverse-by-row-reduction/', '/tools/rref/?example=four-by-four', '/tools/matrices/', '/tools/determinant/', '/tools/cramer/', '/practice/three-by-three/']

for (const path of pages) {
  test(`no horizontal page scroll at phone width: ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('the solver shows the matrix before the setup panel on phones, and steps work', async ({ page }) => {
  await page.goto('/tools/rref/?example=three-by-three')
  const sheetTop = await page.locator('#rref-0-0').boundingBox()
  const setupTop = await page.getByRole('heading', { name: 'Problem' }).boundingBox()
  expect(sheetTop!.y).toBeLessThan(setupTop!.y)
  await page.getByRole('button', { name: 'Solve step by step' }).click()
  await page.getByRole('button', { name: 'Next step' }).click()
  await expect(page.getByText('Step 1 of 9').first()).toBeVisible()
})
