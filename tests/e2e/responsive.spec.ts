import { notes } from '../../content/lessons/catalog'
import { expect, test } from './fixtures'

const pages = ['./', 'learn/', 'learn/search/?q=matrix', 'learn/inverse-by-row-reduction/', ...notes.map((entry) => `learn/${entry.slug}/`), 'tools/rref/?example=four-by-four', 'tools/matrices/', 'tools/determinant/', 'tools/cramer/', 'practice/three-by-three/', 'practice/concepts/']

for (const path of pages) {
  test(`no horizontal page scroll at phone width: ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('the solver shows the matrix before the setup panel on phones, and steps work', async ({ page }) => {
  await page.goto('tools/rref/?example=three-by-three')
  const sheetTop = await page.locator('#rref-0-0').boundingBox()
  const setupTop = await page.getByRole('heading', { name: 'Problem' }).boundingBox()
  expect(sheetTop!.y).toBeLessThan(setupTop!.y)
  await page.getByRole('button', { name: 'Solve step by step' }).click()
  await page.getByRole('button', { name: 'Next step' }).click()
  await expect(page.getByText('Step 1 of 9').first()).toBeVisible()
})

test.describe('lecture notes on a phone', () => {
  test('wide formulas scroll inside their own box instead of widening the page', async ({ page }) => {
    await page.goto('learn/09-fundamental-spaces/')
    await page.waitForLoadState('networkidle')
    const wide = await page.locator('.katex-display').evaluateAll((elements) =>
      elements
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => ({ overflowX: getComputedStyle(el).overflowX, canScroll: (() => { el.scrollLeft = 40; return el.scrollLeft > 0 })() })),
    )
    expect(wide.length, 'formulas wider than the screen').toBeGreaterThan(3)
    for (const formula of wide) {
      expect(['auto', 'scroll']).toContain(formula.overflowX)
      expect(formula.canScroll).toBe(true)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
  })

  test('tables, including matrices in their cells, scroll inside their wrapper', async ({ page }) => {
    await page.goto('learn/02-gauss-jordan/')
    await page.waitForLoadState('networkidle')
    const wrapper = page.getByRole('group', { name: /Table\. Scrolls sideways/ }).first()
    await expect(wrapper).toBeVisible()
    const result = await wrapper.evaluate((el) => {
      const scrollable = el.scrollWidth > el.clientWidth + 1
      el.scrollLeft = 80
      return { scrollable, moved: el.scrollLeft > 0, overflowX: getComputedStyle(el).overflowX, pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }
    })
    expect(result).toEqual({ scrollable: true, moved: true, overflowX: 'auto', pageOverflow: 0 })
  })

  test('a wide diagram scrolls inside its frame and stays readable', async ({ page }) => {
    await page.goto('learn/01-linear-systems/#visual-representation-of-the-three-cases')
    await page.waitForLoadState('networkidle')
    const frame = page.getByRole('group', { name: /Diagram\. Scrolls sideways/ }).first()
    const sizes = await frame.evaluate((el) => ({ scrollable: el.scrollWidth > el.clientWidth, image: el.querySelector('img')!.getBoundingClientRect().width, frame: el.clientWidth }))
    expect(sizes.scrollable).toBe(true)
    // Not squeezed into the phone width, where its labels would be unreadably small.
    expect(sizes.image).toBeGreaterThan(sizes.frame)
    expect(sizes.image).toBeGreaterThanOrEqual(500)
  })

  test('the course list and the contents list start collapsed, and open on demand', async ({ page }) => {
    await page.goto('learn/05-determinants/')
    const nav = page.getByRole('navigation', { name: 'Course' })
    const toc = page.getByRole('navigation', { name: 'On this page' })
    await expect(nav.getByRole('link', { name: /Computing determinants/ })).toBeHidden()
    await expect(toc.getByRole('link').first()).toBeHidden()
    // The title is not pushed far down the page by two long lists.
    const title = await page.getByRole('heading', { level: 1 }).boundingBox()
    expect(title!.y).toBeLessThan(500)
    await nav.getByText('Course contents').first().click()
    await expect(nav.getByRole('link', { name: /Computing determinants/ })).toBeVisible()
    await toc.getByText('On this page').click()
    await expect(toc.getByRole('link').first()).toBeVisible()
    await toc.getByRole('link', { name: /Algebraic Properties of Determinants/ }).click()
    await expect(page).toHaveURL(/#3-algebraic-properties-of-determinants$/)
    await expect(page.locator('[id="3-algebraic-properties-of-determinants"]')).toBeInViewport()
  })
})
