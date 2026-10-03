import { type Page, expect, test as base } from '@playwright/test'

/** Every test fails if the page logs a console error or throws. */
export const test = base.extend<{ errors: string[] }>({
  errors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on('console', (message) => {
        if (message.type() !== 'error') return
        // A deliberate visit to a missing page logs the document's own 404; that is expected.
        const documentNotFound = /status of 404/.test(message.text()) && message.location().url === page.url()
        if (!documentNotFound) errors.push(`console: ${message.text()}`)
      })
      page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
      await use(errors)
      expect(errors, 'browser errors').toEqual([])
    },
    { auto: true },
  ],
})

export { expect }

/** Error and warning notices rendered by the app (excludes Next's route announcer). */
export function appAlert(page: Page) {
  return page.locator('[role="alert"]:not(#__next-route-announcer__)')
}

/** Values currently typed into a matrix editor, row by row. */
export async function editorValues(page: Page, prefix: string, rows: number, cols: number): Promise<string[][]> {
  const values: string[][] = []
  for (let r = 0; r < rows; r++) {
    const row: string[] = []
    for (let c = 0; c < cols; c++) row.push(await page.locator(`#${prefix}-${r}-${c}`).inputValue())
    values.push(row)
  }
  return values
}

/**
 * Waits until React has taken over the page. Before then a click on a link is the browser's own (a full
 * page load) and a list or a field can still change under the pointer. Next.js stores its router state
 * on the history entry when it hydrates, which is the one signal in a production build.
 */
export async function hydrated(page: Page) {
  await page.waitForFunction(() => (window.history.state as { __NA?: boolean } | null)?.__NA === true)
}

/** Marks the window so a full page reload (which would drop the marker) can be detected. */
export async function markWindow(page: Page) {
  await page.evaluate(() => ((window as unknown as { __spa: boolean }).__spa = true))
}

export async function stillSameDocument(page: Page) {
  return page.evaluate(() => (window as unknown as { __spa?: boolean }).__spa === true)
}
