import { appAlert, editorValues, expect, test } from './fixtures'

test.describe('system solver', () => {
  test('loads an example, solves it and steps forward and back', async ({ page }) => {
    await page.goto('/tools/rref/')
    await page.getByLabel('Example').selectOption('fraction-answer')
    await page.getByRole('button', { name: 'Load', exact: true }).click()
    expect(await editorValues(page, 'rref', 2, 3)).toEqual([['1', '2', '5'], ['3', '-1', '4']])

    await page.getByRole('button', { name: 'Solve step by step' }).click()
    const controls = page.getByRole('group', { name: 'Step controls' })
    await expect(controls.getByText('Start')).toBeVisible()
    await controls.getByRole('button', { name: 'Next step' }).click()
    await expect(page.getByRole('heading', { name: 'Eliminate x₁ from R₂' })).toBeVisible()
    await expect(page.getByText('R₂ ← R₂ − 3R₁').first()).toBeVisible()
    await controls.getByRole('button', { name: 'Previous step' }).click()
    await expect(controls.getByText('Start')).toBeVisible()

    await controls.getByRole('button', { name: 'Go to the end' }).click()
    const solution = page.locator('section[aria-labelledby="solution-heading"]')
    await expect(solution.getByRole('heading', { name: 'Unique solution' })).toBeVisible()
    await expect(solution).toContainText('13/7')
    await expect(solution).toContainText('11/7')
    await expect(solution).toContainText('Checked: substituting these values')
  })

  test('jumps to a step from the history and supports arrow keys', async ({ page }) => {
    await page.goto('/tools/rref/?example=three-by-three')
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    await page.getByRole('navigation', { name: 'Step history' }).getByRole('button', { name: /^5 / }).click()
    const counter = page.getByRole('group', { name: 'Step controls' }).locator('p')
    await expect(counter).toHaveText('Step 5 of 9')
    await page.getByRole('group', { name: /Step viewer/ }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(counter).toHaveText('Step 6 of 9')
    await page.keyboard.press('Home')
    await expect(page.getByRole('group', { name: 'Step controls' }).getByText('Start')).toBeVisible()
  })

  test('plays, pauses, changes speed and stops at the end', async ({ page }) => {
    await page.goto('/tools/rref/?example=two-by-two')
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    const controls = page.getByRole('group', { name: 'Step controls' })
    await controls.getByText('Fast').click()
    await controls.getByRole('button', { name: 'Play' }).click()
    await expect(controls.getByRole('button', { name: 'Pause' })).toBeVisible()
    const counter = controls.locator('p')
    await expect(counter).toHaveText('Step 2 of 4', { timeout: 5000 })
    await controls.getByRole('button', { name: 'Pause' }).click()
    const paused = await counter.textContent()
    await page.waitForTimeout(1500)
    expect(await counter.textContent()).toBe(paused)
    await controls.getByRole('button', { name: 'Play' }).click()
    await expect(page.getByRole('heading', { name: 'Unique solution' })).toBeVisible({ timeout: 8000 })
    await expect(controls.getByRole('button', { name: 'Play' })).toBeVisible()
  })

  test('classifies inconsistent and infinite systems', async ({ page }) => {
    await page.goto('/tools/rref/?example=no-solution')
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    await page.getByRole('button', { name: 'Go to the end' }).click()
    await expect(page.getByRole('heading', { name: 'No solution' })).toBeVisible()
    await expect(page.getByText('0 = 1').first()).toBeVisible()

    await page.goto('/tools/rref/?example=infinite-solutions')
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    await page.getByRole('button', { name: 'Go to the end' }).click()
    await expect(page.getByRole('heading', { name: 'Infinitely many solutions' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Explanation' }).getByText('x₂ = 3 − 2x₃')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: /free/ })).toBeVisible()
  })

  test('editing after solving invalidates the old steps', async ({ page }) => {
    await page.goto('/tools/rref/?example=two-by-two')
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    await page.getByText('Edit input').click()
    await page.locator('#rref-0-0').fill('5')
    await expect(page.getByText('The previous solution was cleared')).toBeVisible()
    await expect(page.getByRole('radio', { name: 'Step through' })).toBeDisabled()
  })

  test('rejects invalid entries instead of treating them as zero', async ({ page }) => {
    await page.goto('/tools/rref/?example=two-by-two')
    await page.locator('#rref-1-1').fill('abc')
    await page.locator('#rref-0-2').fill('')
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    const alert = appAlert(page)
    await expect(alert).toContainText('Fix 2 entries to continue')
    await expect(alert).toContainText('is not a number')
    await expect(page.locator('#rref-1-1')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByRole('radio', { name: 'Step through' })).toBeDisabled()
  })

  test('keeps work when navigating away and back, and restores a saved workspace', async ({ page }) => {
    await page.goto('/tools/rref/')
    await page.locator('#rref-0-0').fill('7/2')
    await page.getByText('Save and share').click()
    await page.getByRole('button', { name: 'Save', exact: true }).click()
    await expect(page.getByText('Saved in this browser')).toBeVisible()

    await page.getByRole('navigation', { name: 'Tools' }).getByRole('link', { name: 'Matrix operations' }).click()
    await page.getByRole('navigation', { name: 'Tools' }).getByRole('link', { name: 'System solver' }).click()
    await expect(page.locator('#rref-0-0')).toHaveValue('7/2')

    await page.getByRole('button', { name: 'Clear' }).click()
    await expect(page.locator('#rref-0-0')).toHaveValue('0')
    await page.getByRole('button', { name: 'Undo' }).click()
    await expect(page.locator('#rref-0-0')).toHaveValue('7/2')

    await page.reload()
    await page.getByText('Save and share').click()
    await page.getByRole('button', { name: 'Restore' }).click()
    await expect(page.locator('#rref-0-0')).toHaveValue('7/2')
  })

  test('accepts a pasted block and moves between entries with the keyboard', async ({ page }) => {
    await page.goto('/tools/rref/')
    await page.locator('#rref-0-0').focus()
    await page.evaluate(() => {
      const data = new DataTransfer()
      data.setData('text', '1\t1\t3\n1\t-1\t1')
      document.activeElement?.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }))
    })
    expect(await editorValues(page, 'rref', 2, 3)).toEqual([['1', '1', '3'], ['1', '-1', '1']])
    await expect(page.getByRole('group', { name: 'Equations' })).toContainText('2')

    await page.locator('#rref-0-0').focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#rref-1-0')).toBeFocused()
    await page.keyboard.press('End')
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('#rref-1-1')).toBeFocused()
  })

  test('loads a system from the URL', async ({ page }) => {
    await page.goto('/tools/rref/?A=1,1;1,-1&b=3,1')
    // The URL is applied after hydration; wait until the 2×2 system has replaced the default 3×3.
    await expect(page.locator('#rref-2-0')).toHaveCount(0)
    await expect(page.locator('#rref-0-0')).toHaveValue('1')
    expect(await editorValues(page, 'rref', 2, 3)).toEqual([['1', '1', '3'], ['1', '-1', '1']])
    await page.getByRole('button', { name: 'Solve step by step' }).click()
    await page.getByRole('button', { name: 'Go to the end' }).click()
    await expect(page.getByRole('img', { name: /meet at one point, \(2, 1\)/ })).toBeVisible()
  })
})
