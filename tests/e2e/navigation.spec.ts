import { lessons } from '../../content/lessons/catalog'
import { expect, markWindow, stillSameDocument, test } from './fixtures'

test('main navigation is client-side and Back/Forward work', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Linear algebra you can step through' })).toBeVisible()
  await markWindow(page)

  const nav = page.getByRole('navigation', { name: 'Main' })
  await nav.getByRole('link', { name: 'Learn' }).click()
  await expect(page).toHaveURL(/\/learn\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Linear algebra, one idea at a time')

  await nav.getByRole('link', { name: 'Tools' }).click()
  await expect(page).toHaveURL(/\/tools\/$/)
  await page.getByRole('link', { name: 'Open System solver' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('System solver')

  await nav.getByRole('link', { name: 'Practice' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Practice row reduction')
  expect(await stillSameDocument(page)).toBe(true)

  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('System solver')
  await page.goBack()
  await expect(page).toHaveURL(/\/tools\/$/)
  await page.goForward()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('System solver')
  expect(await stillSameDocument(page)).toBe(true)
})

test('every lesson opens from the course navigation with its own title', async ({ page }) => {
  await page.goto(`/learn/${lessons[0]!.slug}/`)
  const courseNav = page.getByRole('navigation', { name: 'Course' })
  for (const lesson of lessons) {
    await courseNav.getByRole('link', { name: new RegExp(`^${lesson.number}\\s`) }).click()
    await expect(page).toHaveURL(new RegExp(`/learn/${lesson.slug}/$`))
    await expect(page.getByRole('heading', { level: 1 })).toContainText(lesson.title)
  }
})

test('a lesson URL works when opened directly, with previous and next links', async ({ page }) => {
  const lesson = lessons.find((l) => l.slug === 'gauss-jordan-elimination')!
  await page.goto(`/learn/${lesson.slug}/`)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Gauss–Jordan elimination')
  await expect(page.locator('.katex').first()).toBeVisible()
  const pager = page.getByRole('navigation', { name: 'Lesson navigation' })
  await pager.getByRole('link', { name: /Next/ }).click()
  await expect(page).toHaveURL(/\/learn\/general-solutions\/$/)
  await pager.getByRole('link', { name: /Previous/ }).click()
  await expect(page).toHaveURL(/\/learn\/gauss-jordan-elimination\/$/)
})

test('unknown routes show the not-found page', async ({ page }) => {
  const response = await page.goto('/learn/vector-spaces/')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page is not in the course')
})

test('the theme toggle switches and remembers the theme', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})
