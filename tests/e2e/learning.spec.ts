import { progressIds } from '../../content/lessons/catalog'
import { appAlert, editorValues, expect, test } from './fixtures'

test.describe('course and calculators', () => {
  test('the 3×3 determinant calculator uses its own inputs (22, not 20)', async ({ page }) => {
    await page.goto('tools/determinant/')
    const three = page.locator('section[aria-labelledby="det3-title"]')
    await expect(three.getByText('det A = 22')).toBeVisible()
    // Editing the 2×2 calculator must not change the 3×3 one.
    await page.locator('#det2-0-0').fill('9')
    await expect(three.getByText('det A = 22')).toBeVisible()
    await page.locator('#det3-2-2').fill('7')
    await expect(three.getByText('det A = 26')).toBeVisible()
  })

  test('Cramer’s rule explains a singular system and offers the solver', async ({ page }) => {
    await page.goto('tools/cramer/?A=6,-4;3,-2&b=2,1')
    await expect(page.getByText('Cramer’s rule does not apply').first()).toBeVisible()
    await page.getByRole('link', { name: 'Classify this system with the system solver' }).first().click()
    await expect(page).toHaveURL(/\/tools\/rref\//)
    // The tool applies the problem from the address in an effect, a moment after the URL changes.
    await expect.poll(() => editorValues(page, 'rref', 2, 3)).toEqual([['6', '-4', '2'], ['3', '-2', '1']])
  })

  test('a lesson’s example opens the exact problem in the solver', async ({ page }) => {
    await page.goto('learn/gauss-jordan-elimination/')
    await page.getByRole('link', { name: 'Open this system in the solver' }).click()
    await expect(page).toHaveURL(/\/tools\/rref\/\?A=/)
    await expect.poll(() => editorValues(page, 'rref', 2, 3)).toEqual([['1', '2', '5'], ['3', '-1', '4']])
  })

  test('quick checks and numeric checks give feedback', async ({ page }) => {
    await page.goto('learn/gauss-jordan-elimination/')
    await page.getByRole('textbox', { name: 'x =' }).fill('1')
    await page.getByRole('textbox', { name: 'y =' }).fill('3')
    await page.getByRole('button', { name: 'Check answer' }).click()
    await expect(page.getByText(/Not yet: y is off/)).toBeVisible()
    await page.getByRole('textbox', { name: 'y =' }).fill('2')
    await page.getByRole('button', { name: 'Check answer' }).click()
    await expect(page.getByText('Correct, exactly.')).toBeVisible()

    await page.goto('learn/linear-systems/')
    await page.getByText('2x − 3y = √5').click()
    await page.getByRole('button', { name: 'Check answer' }).click()
    await expect(page.getByText('Correct.')).toBeVisible()
  })

  test('marks lessons complete and resets progress', async ({ page }) => {
    await page.goto('learn/linear-systems/')
    await page.getByRole('button', { name: 'Mark lesson complete' }).click()
    await expect(page.getByRole('button', { name: 'Completed' })).toBeVisible()
    // Lessons and chapters' lecture notes are all counted, so the total is the registry's, not a literal.
    // (shown once: in the disclosure on phones, in the heading on wide screens)
    await expect(page.getByText(`1 of ${progressIds.length} complete`).filter({ visible: true })).toBeVisible()

    await page.goto('learn/')
    await expect(page.getByText(`of ${progressIds.length} chapters and lessons complete`)).toContainText('1')
    await page.getByRole('button', { name: 'Reset progress' }).click()
    await page.getByRole('group', { name: 'Confirm reset' }).getByRole('button', { name: 'Reset progress' }).click()
    await expect(page.getByText(`of ${progressIds.length} chapters and lessons complete`)).toContainText('0')
  })

  test('the lines explorer reacts to parallel lines', async ({ page }) => {
    await page.goto('learn/solution-sets/')
    await expect(page.getByText('One solution: the lines cross once.')).toBeVisible()
    await page.locator('#lines-1-1').fill('1')
    await page.locator('#lines-1-2').fill('5')
    await expect(page.getByText('No solution: the lines are parallel.')).toBeVisible()
  })
})

test.describe('practice', () => {
  test('accepts chosen and typed operations, judges them, and reaches RREF', async ({ page }) => {
    await page.goto('practice/two-by-two/')
    // Invalid: scaling by zero.
    await page.getByText('Scale', { exact: true }).click()
    await page.getByLabel('by the factor').fill('0')
    await page.getByRole('button', { name: 'Apply operation' }).click()
    await expect(appAlert(page)).toContainText('Not an elementary row operation')

    // A valid swap, then type the rest.
    await page.getByText('Swap', { exact: true }).click()
    await page.getByRole('button', { name: 'Apply operation' }).click()
    await expect(page.getByRole('list', { name: 'Operations so far' })).toContainText('R₁ ↔ R₂')
    await page.getByText('Typing').click()
    const field = page.getByLabel('Row operation')
    for (const op of ['R2 <- R2 - 2R1', 'R2 <- (1/5)R2', 'R1 <- R1 + R2']) {
      await field.fill(op)
      await page.getByRole('button', { name: 'Apply operation' }).click()
    }
    await expect(page.getByText('The matrix is in reduced row echelon form')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Unique solution' })).toBeVisible()
  })

  test('offers progressively specific hints and undo', async ({ page }) => {
    await page.goto('practice/needs-a-swap/')
    await page.getByRole('button', { name: 'Get a hint' }).click()
    await page.getByRole('button', { name: 'More specific hint' }).click()
    await page.getByRole('button', { name: 'More specific hint' }).click()
    await expect(page.getByText('Try R₁ ↔ R₂.')).toBeVisible()
    await page.getByText('Typing').click()
    await page.getByLabel('Row operation').fill('R1 <-> R2')
    await page.getByRole('button', { name: 'Apply operation' }).click()
    await expect(page.getByRole('region', { name: 'Next operation' }).getByText('Good move')).toBeVisible()
    await page.getByRole('button', { name: 'Undo' }).click()
    await expect(page.getByRole('heading', { name: 'Your matrix' })).toBeVisible()
  })
})
