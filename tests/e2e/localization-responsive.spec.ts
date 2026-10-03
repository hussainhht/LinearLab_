import { expect, test } from './fixtures'

test.use({ colorScheme: 'light' })

for (const theme of ['light', 'dark'] as const) {
  test(`phone language selector and Arabic layouts work in ${theme} theme`, async ({ page }) => {
    await page.goto('tools/rref/?example=two-by-two#main')
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    const selector = page.getByRole('banner').getByRole('combobox')
    await expect(selector).toBeVisible()
    await expect(selector).toBeInViewport()
    await page.locator('#rref-0-0').fill('7/2')
    const url = page.url()
    await selector.selectOption('ar')
    await expect(page).toHaveURL(url)
    await expect(page.locator('#rref-0-0')).toHaveValue('7/2')
    await expect(selector).toHaveValue('ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('button', { name: 'الحل خطوة بخطوة' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)

    await page.getByRole('navigation', { name: 'التنقل الرئيسي' }).getByRole('link', { name: 'تدرّب' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('تدرّب على اختزال الصفوف')
    await expect(selector).toBeInViewport()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)

    await page.goto('learn/02-gauss-jordan/')
    await expect(selector).toHaveValue('ar')
    await expect(page.getByRole('heading', { level: 1 })).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1 })).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('main .katex').filter({ visible: true }).first()).toBeVisible()
    expect(await page.locator('main .katex').filter({ visible: true }).first().evaluate((element) => getComputedStyle(element).direction)).toBe('ltr')
    await page.waitForLoadState('networkidle')
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
    await page.reload()
    await expect(selector).toHaveValue('ar')
    await expect(page.getByRole('button', { name: theme === 'dark' ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن' })).toBeVisible()
    await selector.selectOption('en')
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Learn' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
  })
}

const arabicPaths = [
  './',
  'learn/',
  'learn/search/?q=matrix',
  'learn/inverse-by-row-reduction/',
  'learn/09-fundamental-spaces/',
  'tools/rref/?example=four-by-four',
  'tools/matrices/',
  'tools/determinant/',
  'tools/cramer/',
  'practice/',
  'practice/three-by-three/',
  'practice/concepts/',
  'practice/custom/?A=1,1;1,-1&b=3,1',
]

for (const theme of ['light', 'dark'] as const) {
  for (const path of arabicPaths) {
    test(`no horizontal Arabic page scroll in ${theme} theme: ${path}`, async ({ page }) => {
      await page.addInitScript((savedTheme) => {
        localStorage.setItem('linearlab:language', 'ar')
        localStorage.setItem('linearlab:theme', savedTheme)
      }, theme)
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await expect(page.getByRole('banner').getByRole('combobox')).toHaveValue('ar')
      await page.waitForLoadState('networkidle')
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
    })
  }
}
