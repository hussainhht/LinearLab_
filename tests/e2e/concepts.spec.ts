import { chapterList } from '../../content/lessons/catalog'
import { conceptChecks, conceptTopics } from '../../data/examples/concepts'
import { expect, test } from './fixtures'

test.describe('concept checks', () => {
  test('are reached from the practice page and list every topic', async ({ page }) => {
    await page.goto('practice/')
    await page.getByRole('link', { name: 'Open the concept checks' }).click()
    await expect(page).toHaveURL(/\/practice\/concepts\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Concept checks')
    for (const topic of conceptTopics) {
      await expect(page.getByRole('heading', { level: 2, name: topic.title })).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Topics' }).getByRole('link', { name: topic.title })).toBeVisible()
    }
    await expect(page.getByRole('button', { name: 'Check answer' })).toHaveCount(conceptChecks.length)
  })

  test('give feedback on a choice question, right and wrong', async ({ page }) => {
    await page.goto('practice/concepts/')
    const question = page.locator('form', { hasText: 'If you swap two rows of a matrix' })
    await question.getByText('Stays the same').click()
    await question.getByRole('button', { name: 'Check answer' }).click()
    await expect(question.getByText('Not quite.')).toBeVisible()
    await question.getByText('Changes sign (multiplied by -1)').click()
    await question.getByRole('button', { name: 'Check answer' }).click()
    await expect(question.getByText('Correct.')).toBeVisible()
    await expect(question.getByText('Swapping rows changes the sign of the determinant.')).toBeVisible()
  })

  test('check a numeric answer exactly, so 1/5 and 0.2 are the same answer', async ({ page }) => {
    await page.goto('practice/concepts/')
    const question = page.locator('form', { hasText: 'If det(A) = 5, what is det(A⁻¹)?' })
    const answer = question.getByRole('textbox', { name: 'det(A⁻¹) =' })
    for (const typed of ['1/5', '0.2', '2/10']) {
      await answer.fill(typed)
      await question.getByRole('button', { name: 'Check answer' }).click()
      await expect(question.getByText('Correct, exactly.')).toBeVisible()
    }
    await answer.fill('5')
    await question.getByRole('button', { name: 'Check answer' }).click()
    await expect(question.getByText(/Not yet/)).toBeVisible()
  })

  test('say where the two changed questions differ from the original', async ({ page }) => {
    await page.goto('practice/concepts/')
    await expect(page.getByText(/Changed from the original question: The original said “a 3×4 augmented matrix/)).toBeVisible()
    await expect(page.getByText(/asked as a number \(0\)/)).toBeVisible()
    await expect(page.getByText(/were left out because their answers are free text/)).toBeVisible()
  })

  test('are linked from the chapters they belong to, straight to the right topic', async ({ page }) => {
    const chapter = chapterList.find((c) => c.id === 'inverses')!
    await page.goto(`learn/${chapter.notes.slug}/`)
    await page.getByRole('complementary', { name: 'Study this chapter' }).getByRole('link', { name: 'Concept checks: inverses' }).click()
    await expect(page).toHaveURL(/\/practice\/concepts\/#inverses$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Inverses' })).toBeInViewport()
  })
})
