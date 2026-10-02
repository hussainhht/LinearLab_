import { appAlert, expect, test } from './fixtures'

test.describe('matrix operations', () => {
  test('runs every operation on the default matrices', async ({ page }) => {
    await page.goto('/tools/matrices/')
    const result = page.locator('section[aria-labelledby="result-heading"]')
    const run = (label: string) => page.getByRole('button', { name: new RegExp(label) }).click()

    await run('A \\+ B')
    await expect(result.getByRole('heading', { name: 'A + B' })).toBeVisible()
    await expect(result.getByRole('table', { name: 'Result A + B' })).toContainText('12')

    await run('A − B')
    await expect(result.getByRole('table', { name: 'Result A − B' })).toContainText('−4')

    await run('kA')
    await expect(result.getByRole('heading', { name: '2 · A' })).toBeVisible()

    await run('Aᵀ')
    await expect(result.getByRole('heading', { name: 'Aᵀ' })).toBeVisible()

    await run('det A')
    await expect(result.getByRole('heading', { name: /det A = −2/ })).toBeVisible()
    await expect(result.getByText('A is invertible')).toBeVisible()

    await run('A⁻¹')
    await expect(result.getByText(/Verified by multiplication/)).toBeVisible()

    await run('rank A')
    await expect(result.getByRole('heading', { name: 'rank A = 2, nullity = 0' })).toBeVisible()

    await page.getByText('Matrix B', { exact: true }).click()
    await run('det B')
    await expect(result.getByRole('heading', { name: /det B = −2/ })).toBeVisible()
  })

  test('steps through the multiplication visualizer without errors', async ({ page }) => {
    await page.goto('/tools/matrices/?A=2,0,1;3,1,2&B=1,3;0,2;4,-1&op=multiply')
    const controls = page.getByRole('group', { name: 'Multiplication controls' })
    await expect(controls.getByText('of 12')).toBeVisible()
    await controls.getByRole('button', { name: 'Next product' }).click()
    await expect(page.getByText('c₁₁ = row 1 of A · column 1 of B')).toBeVisible()
    await controls.getByRole('button', { name: 'Next product' }).click()
    await controls.getByRole('button', { name: 'Next product' }).click()
    await expect(page.getByText(/c₁₁ = 6/)).toBeVisible()
    await page.getByRole('button', { name: 'Show final result' }).click()
    await expect(page.getByText(/every entry of C is computed/)).toBeVisible()
    await expect(page.getByRole('table', { name: 'Product C = AB' })).not.toContainText('?')
    await page.getByRole('button', { name: 'Reset' }).click()
    await expect(controls.getByText('Start')).toBeVisible()
    // Autoplay, then change the input mid-animation: the stale run must not touch the new one.
    await controls.getByText('Fast').click()
    await controls.getByRole('button', { name: 'Play' }).click()
    await page.waitForTimeout(800)
    await page.locator('#mA-0-0').fill('5')
    await expect(page.getByText('The inputs changed')).toBeVisible()
    await page.getByRole('button', { name: 'Run multiply again' }).click()
    await expect(controls.getByText('Start')).toBeVisible()
  })

  test('explains incompatible sizes and non-square matrices', async ({ page }) => {
    await page.goto('/tools/matrices/?A=1,2,3&B=1,2;3,4')
    await page.getByRole('button', { name: /A × B/ }).click()
    await expect(appAlert(page)).toContainText('A is 1×3 (3 columns) and B is 2×2 (2 rows)')
    await page.getByRole('button', { name: /A \+ B/ }).click()
    await expect(appAlert(page)).toContainText('cannot be added')
    await page.getByRole('button', { name: /det A/ }).click()
    await expect(appAlert(page)).toContainText('needs a square matrix')
  })

  test('inverts a tiny but invertible matrix and finds a null space', async ({ page }) => {
    await page.goto('/tools/matrices/?A=0.000001,0;0,0.000001&op=inverse')
    await expect(page.getByRole('table', { name: 'Inverse of A' })).toContainText('1000000')
    await expect(page.getByText(/Verified by multiplication/)).toBeVisible()

    await page.goto('/tools/matrices/?A=1,2,0,3;2,4,1,4;3,6,1,7&op=spaces')
    await expect(page.getByRole('heading', { name: 'rank A = 2, nullity = 2' })).toBeVisible()
    await expect(page.getByText('Checked: A·v = 0 for every vector above.')).toBeVisible()
  })

  test('fills special matrices, undoes the fill and feeds a result back in', async ({ page }) => {
    await page.goto('/tools/matrices/')
    const panelA = page.locator('section[aria-labelledby="matrix-A"]')
    await panelA.getByRole('button', { name: 'Identity' }).click()
    await expect(page.locator('#mA-0-1')).toHaveValue('0')
    await expect(page.locator('#mA-1-1')).toHaveValue('1')
    await panelA.getByRole('button', { name: 'Undo' }).click()
    await expect(page.locator('#mA-0-1')).toHaveValue('2')
    await page.getByRole('button', { name: /A \+ B/ }).click()
    await page.getByRole('button', { name: 'Use as A' }).click()
    await expect(page.locator('#mA-1-1')).toHaveValue('12')
  })
})
