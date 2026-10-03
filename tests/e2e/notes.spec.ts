import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { type Page } from '@playwright/test'
import { chapterList, lessons, notes, progressIds } from '../../content/lessons/catalog'
import { expect, hydrated, markWindow, stillSameDocument, test } from './fixtures'

/** The document's own title and its last heading, read from the Markdown the site is built from. */
function sourceFacts(source: string) {
  const text = readFileSync(join(process.cwd(), source), 'utf8')
  const title = /^# (.+)$/m.exec(text)![1]!
  const last = [...text.matchAll(/^#{2,3} (.+)$/gm)].at(-1)![1]!
  return { title, last, text }
}

const courseNav = (page: Page) => page.getByRole('navigation', { name: 'Course' })
/** How far the scrolling sidebar is scrolled, and whether the link to a page lies inside its visible part. */
const sidebarView = (page: Page, slug: string) =>
  courseNav(page).evaluate((nav, href) => {
    const link = nav.querySelector(`a[href$="${href}"]`)!.getBoundingClientRect()
    const box = nav.getBoundingClientRect()
    return {
      scrollTop: nav.scrollTop,
      // The last link sits flush with the bottom edge of the list; allow for sub-pixel rounding.
      visible: link.top >= box.top - 1 && link.bottom <= box.bottom + 1,
      offCenter: Math.abs((link.top + link.bottom) / 2 - (box.top + box.bottom) / 2),
    }
  }, `/learn/${slug}/`)
/** Heading ids such as "4-complete-worked-examples" start with a digit, which a CSS #selector cannot express. */
const byId = (page: Page, id: string) => page.locator(`[id="${id}"]`)
/** The course count appears in the phone disclosure and in the wide-screen heading; only one is ever shown. */
const shown = (page: Page, text: string) => page.getByText(text).filter({ visible: true })

test.describe('lecture notes', () => {
  test('the course navigation lists every chapter’s lecture notes in order, by name', async ({ page }) => {
    await page.goto('learn/')
    await page.goto(`learn/${notes[0]!.slug}/`)
    const links = courseNav(page).locator('a[href*="/learn/"][href$="/"]').filter({ hasText: 'Lecture notes' })
    await expect(links).toHaveCount(13)
    for (const [i, entry] of notes.entries()) {
      await expect(links.nth(i)).toHaveAttribute('href', new RegExp(`/learn/${entry.slug}/$`))
      await expect(links.nth(i)).toHaveAccessibleName(new RegExp(`^Lecture notes for ${chapterList[i]!.title}`))
    }
  })

  // The pages are large, so a few client-side navigations are enough; every chapter is also loaded directly below.
  test('chapters open from the course navigation by client-side navigation, with their own titles', async ({ page }) => {
    test.slow()
    await page.goto(`learn/${notes[0]!.slug}/`)
    await hydrated(page)
    await markWindow(page)
    for (const entry of [notes[6]!, notes[12]!, notes[1]!]) {
      const { title } = sourceFacts(entry.source)
      await courseNav(page).locator(`a[href$="/learn/${entry.slug}/"]`).click()
      await expect(page).toHaveURL(new RegExp(`/learn/${entry.slug}/$`))
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
      await expect(courseNav(page).locator(`a[href$="/learn/${entry.slug}/"]`)).toHaveAttribute('aria-current', 'page')
      // The sidebar made for the new page opens at it too.
      expect((await sidebarView(page, entry.slug)).visible).toBe(true)
    }
    expect(await stillSameDocument(page), 'the browser loaded a new document instead of navigating within the app').toBe(true)
  })

  for (const entry of notes) {
    test(`chapter ${entry.chapterNumber} loads directly and shows its mathematics through the final section`, async ({ page }) => {
      const { title, last } = sourceFacts(entry.source)
      await page.goto(`learn/${entry.slug}/`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
      await expect(page.locator('.katex').first()).toBeVisible()
      // No raw LaTeX or dollar delimiters in what is shown.
      const shown = await page.locator('article').innerText()
      expect(shown).not.toMatch(/\$|\\begin|\\frac|\\mathbb/)
      // The last heading of the Markdown is on the page.
      await expect(page.getByRole('heading', { name: new RegExp(last.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\$[^$]*\\\$/g, '.*')) }).last()).toBeAttached()
      await page.reload()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    })
  }

  test('the contents list jumps to a section, and stays beside the article on wide screens', async ({ page }) => {
    await page.goto('learn/02-gauss-jordan/')
    const toc = page.getByRole('navigation', { name: 'On this page' })
    await expect(toc).toBeVisible()
    await toc.getByRole('link', { name: /Complete Worked Examples from Course Sources/ }).click()
    await expect(page).toHaveURL(/#4-complete-worked-examples-from-course-sources$/)
    await expect(byId(page, '4-complete-worked-examples-from-course-sources')).toBeInViewport()
    // Deep entries, inside long sections, work too.
    await toc.getByRole('link', { name: /Example 6: System Depending on a Parameter/ }).click()
    await expect(page).toHaveURL(/#example-6-system-depending-on-a-parameter-a$/)
    await expect(byId(page, 'example-6-system-depending-on-a-parameter-a')).toBeInViewport()
  })

  test('headings carry stable anchors that load directly', async ({ page }) => {
    await page.goto('learn/05-determinants/#2-sarrus-rule-3-times-3-matrices-only')
    await expect(byId(page, '22-sarrus-rule-3-times-3-matrices-only')).toBeVisible()
    await page.goto('learn/05-determinants/#22-sarrus-rule-3-times-3-matrices-only')
    await expect(byId(page, '22-sarrus-rule-3-times-3-matrices-only')).toBeInViewport()
  })

  test('the source ledger is collapsed, says the scans are missing, and its links still work', async ({ page }) => {
    await page.goto('learn/02-gauss-jordan/')
    const summary = page.locator('summary', { hasText: 'Archival Source Reference' })
    const ledger = page.locator('details', { has: summary })
    await expect(ledger).not.toHaveAttribute('open', '')
    await summary.click()
    await expect(ledger.getByText(/not included in this repository/).first()).toBeVisible()
    // An ordinary coverage link, and the one the source gets wrong (repaired by an explicit alias).
    await ledger.getByRole('link', { name: '§ 1.1', exact: true }).first().click()
    await expect(page).toHaveURL(/#11-row-echelon-form-ref$/)
    await expect(ledger).toHaveAttribute('open', '')
    await ledger.getByRole('link', { name: '§ 4 Example 5 Gauss-Jordan RREF' }).click()
    await expect(page).toHaveURL(/#example-5-underdetermined-system-with-2-free-parameters$/)
    await expect(byId(page, 'example-5-underdetermined-system-with-2-free-parameters')).toBeInViewport()
  })

  test('source versions and reconciled material are labelled, and the metadata is shown as supplied', async ({ page }) => {
    await page.goto('learn/01-linear-systems/')
    await expect(page.getByText('Source version, transcribed as supplied')).toHaveCount(2)
    await expect(page.getByText('Supplementary: reconciled with the LinearLab lessons')).toHaveCount(1)
    await page.getByText('About these notes: sources and verification status').click()
    // The same source ids also appear, once per row, in the collapsed ledger; the panel is the one that is open.
    const panel = page.locator('details', { hasText: 'About these notes' }).first()
    await expect(panel.getByText('Integrated exactly as supplied')).toBeVisible()
    await expect(panel.getByText('1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR')).toBeVisible()
    await expect(panel.getByText('1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6')).toBeVisible()
    await expect(panel.getByText('complete_transcription_with_archival_references')).toBeVisible()
  })

  test('an SVG diagram written in the Markdown is drawn, not shown as code', async ({ page }) => {
    await page.goto('learn/01-linear-systems/#visual-representation-of-the-three-cases')
    const figure = page.locator('figure img').first()
    await expect(figure).toBeVisible()
    await expect(figure).toHaveAttribute('alt', /Case 1: Unique Solution; .*Case 3: Infinite Solutions/)
    expect(await figure.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(100)
    await expect(page.getByText('<svg')).toHaveCount(0)
    // Text drawings stay text.
    await page.goto('learn/11-linear-transformations/')
    await expect(page.locator('pre', { hasText: '0_W' }).first()).toBeAttached()
  })

  test('tables show their math and the lesson files named in reconciled sections link to the lessons', async ({ page }) => {
    await page.goto('learn/02-gauss-jordan/')
    const table = page.locator('table').first()
    await expect(table.locator('.katex').first()).toBeVisible()
    await page.getByRole('link', { name: 'row-operations.mdx' }).click()
    await expect(page).toHaveURL(/\/learn\/row-operations\/$/)
  })

  test('previous and next follow the course: notes, then that chapter’s lessons', async ({ page }) => {
    await page.goto('learn/02-gauss-jordan/')
    const pager = page.getByRole('navigation', { name: 'Chapter navigation' })
    await expect(pager.getByRole('link', { name: /Previous: .*augmented|Previous: 1\.4/ })).toBeVisible()
    await pager.getByRole('link', { name: /Next/ }).click()
    await expect(page).toHaveURL(/\/learn\/row-operations\/$/)
    await page.getByRole('navigation', { name: 'Lesson navigation' }).getByRole('link', { name: /Previous/ }).click()
    await expect(page).toHaveURL(/\/learn\/02-gauss-jordan\/$/)
    // The very last page leads out of the course; the very first has no previous.
    await page.goto(`learn/${notes.at(-1)!.slug}/`)
    await expect(page.getByRole('navigation', { name: 'Chapter navigation' }).getByRole('link', { name: /Course finished/ })).toBeVisible()
    await page.goto(`learn/${notes[0]!.slug}/`)
    await expect(page.getByRole('navigation', { name: 'Chapter navigation' }).getByRole('link', { name: /Previous/ })).toHaveCount(0)
  })

  test('related lessons, tools and practice are linked, and only where they exist', async ({ page }) => {
    await page.goto('learn/09-fundamental-spaces/')
    const panel = page.getByRole('complementary', { name: 'Study this chapter' })
    await expect(panel.getByRole('link', { name: 'Rank, column space and null space' })).toBeVisible()
    await panel.getByRole('link', { name: 'Matrix operations' }).click()
    await expect(page).toHaveURL(/\/tools\/matrices\/$/)
    await page.goto('learn/12-dot-product/')
    await expect(page.getByRole('complementary', { name: 'Study this chapter' })).toHaveCount(0)
    await page.goto('learn/02-gauss-jordan/')
    await page.getByRole('link', { name: 'Practice row reduction' }).click()
    await expect(page).toHaveURL(/\/practice\/$/)
  })

  test('a lesson points back to its chapter’s lecture notes', async ({ page }) => {
    await page.goto('learn/determinants/')
    await page.getByRole('link', { name: 'lecture notes for this chapter' }).click()
    await expect(page).toHaveURL(/\/learn\/05-determinants\/$/)
  })

  test('rank and null space is now in the chapter on fundamental spaces, at the same address', async ({ page }) => {
    await page.goto('learn/rank-and-null-space/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('9.1')
    await expect(page.getByText('Chapter 9: Fundamental spaces of a matrix')).toBeVisible()
  })
})

test.describe('progress', () => {
  test('marking a chapter complete is remembered and counted', async ({ page }) => {
    await page.goto('learn/05-determinants/')
    await page.getByRole('button', { name: 'Mark chapter complete' }).click()
    await expect(page.getByRole('button', { name: 'Completed' })).toBeVisible()
    await expect(shown(page, `1 of ${progressIds.length} complete`)).toBeVisible()
    await page.reload()
    await expect(page.getByRole('button', { name: 'Completed' })).toBeVisible()
    await expect(courseNav(page).locator('a[href$="/learn/05-determinants/"]').getByText('(completed)')).toBeAttached()
    await page.goto('learn/')
    await expect(page.getByText(`of ${progressIds.length} chapters and lessons complete`)).toContainText('1')
  })

  test('progress saved before the lecture notes existed still counts', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('linearlab:progress:v1', JSON.stringify({ version: 1, completed: ['sys-intro', 'det-cramer', 'alg-spaces'] }))
    })
    await page.goto('learn/')
    await expect(page.getByText(`of ${progressIds.length} chapters and lessons complete`)).toContainText('3')
    await page.goto('learn/rank-and-null-space/')
    await expect(page.getByRole('button', { name: 'Completed' })).toBeVisible()
    // Completing a chapter keeps the old entries.
    await page.goto('learn/01-linear-systems/')
    await page.getByRole('button', { name: 'Mark chapter complete' }).click()
    const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem('linearlab:progress:v1')!))
    expect(stored.completed.sort()).toEqual(['alg-spaces', 'det-cramer', 'notes-01-linear-systems', 'sys-intro'])
  })

  test('the overview lists every chapter with its notes and lessons', async ({ page }) => {
    await page.goto('learn/')
    for (const chapter of chapterList) {
      await expect(page.getByRole('heading', { level: 2, name: new RegExp(chapter.title) })).toBeVisible()
      await expect(page.locator(`a[href$="/learn/${chapter.notes.slug}/"]`)).toBeVisible()
    }
    for (const lesson of lessons) await expect(page.locator(`a[href$="/learn/${lesson.slug}/"]`)).toBeVisible()
  })
})

test.describe('search', () => {
  test('finds a topic in the lecture notes and opens its heading', async ({ page }) => {
    await page.goto('learn/search/')
    await page.getByRole('searchbox', { name: 'Search the course' }).fill('Wronskian')
    const result = page.getByRole('link', { name: /Wronskian/i }).first()
    await expect(result).toBeVisible()
    await expect(page).toHaveURL(/\?q=Wronskian$/)
    await result.click()
    await expect(page).toHaveURL(/\/learn\/07-linear-independence\/#/)
    await expect(byId(page, new URL(page.url()).hash.slice(1))).toBeInViewport()
  })

  test('is reachable from the course navigation, keeps the query in the address, and finds lessons too', async ({ page }) => {
    await page.goto('learn/05-determinants/')
    await courseNav(page).getByRole('searchbox', { name: 'Search the course' }).fill('cramer')
    await courseNav(page).getByRole('button', { name: 'Search' }).click()
    await expect(page).toHaveURL(/\/learn\/search\/\?q=cramer$/)
    await expect(page.getByRole('link', { name: 'Cramer’s rule', exact: true })).toBeVisible()
    await expect(page.getByText(/Chapter 5: Determinants, lecture notes/).first()).toBeVisible()
    // Reloading restores the search; Back returns to the page we came from.
    await page.reload()
    await expect(page.getByRole('searchbox', { name: 'Search the course' })).toHaveValue('cramer')
    await page.goBack()
    await expect(page).toHaveURL(/\/learn\/05-determinants\/$/)
  })

  test('says so when nothing matches', async ({ page }) => {
    await page.goto('learn/search/?q=zzzxqj')
    await expect(page.getByText(/No results for “zzzxqj”/)).toBeVisible()
  })
})

/** Contrast of a rendered element's text against whatever it sits on, as WCAG defines it. */
async function contrast(page: Page, selector: string): Promise<number> {
  return page.locator(selector).first().evaluate((el) => {
    const parse = (value: string) => (value.match(/[\d.]+/g) ?? []).map(Number)
    const luminance = ([r, g, b]: number[]) => {
      const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
      return 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!)
    }
    const blend = (top: number[], bottom: number[]) => {
      const a = top[3] ?? 1
      return [0, 1, 2].map((i) => top[i]! * a + bottom[i]! * (1 - a))
    }
    // Paint backgrounds from the root down so translucent layers (the intro box) combine correctly.
    const chain: Element[] = []
    for (let node: Element | null = el; node; node = node.parentElement) chain.unshift(node)
    let background = [255, 255, 255]
    for (const node of chain) {
      const paint = parse(getComputedStyle(node).backgroundColor)
      if (paint.length >= 3 && (paint[3] ?? 1) > 0) background = blend(paint, background)
    }
    const text = blend(parse(getComputedStyle(el).color), background)
    const [light, dark] = [luminance(text), luminance(background)].sort((x, y) => y - x)
    return (light! + 0.05) / (dark! + 0.05)
  })
}

test.describe('the course sidebar', () => {
  // Without the site's scripts the page is what the browser makes of the HTML alone.
  test('is already open at the current page when the HTML is first shown, before React has loaded', async ({ page }) => {
    await page.route(/\/_next\/static\/.*\.js/, (route) => route.fulfill({ contentType: 'text/javascript', body: '' }))
    await page.goto('learn/09-fundamental-spaces/')
    expect(await page.evaluate(() => window.history.state), 'React must not have run').toBeNull()
    const middle = await sidebarView(page, '09-fundamental-spaces')
    expect(middle.scrollTop).toBeGreaterThan(0)
    expect(middle.offCenter).toBeLessThan(2)

    // Near the end the list cannot centre the link, but must still show it.
    for (const slug of ['13-orthogonality', 'cramers-rule']) {
      await page.goto(`learn/${slug}/`)
      expect(await sidebarView(page, slug), slug).toMatchObject({ visible: true })
    }
    // At the start there is nothing to scroll.
    await page.goto('learn/01-linear-systems/')
    expect(await sidebarView(page, '01-linear-systems')).toMatchObject({ scrollTop: 0, visible: true })
  })

  // A sidebar that moves when React takes over puts the link under the pointer somewhere else (it once
  // made the click in the navigation test above land on a different link), and must not undo the student's own scrolling.
  test('stays where it is when React takes over, including where the student scrolled it', async ({ page }) => {
    let release = () => {}
    const gate = new Promise<void>((resolve) => (release = resolve))
    await page.route(/\/_next\/static\/.*\.js/, async (route) => {
      await gate
      await route.continue()
    })
    await page.goto('learn/09-fundamental-spaces/', { waitUntil: 'domcontentloaded' })
    const nav = courseNav(page)
    const scrollTop = () => nav.evaluate((element) => element.scrollTop)
    const opened = await scrollTop()
    expect(opened).toBeGreaterThan(0)

    // The student scrolls the list to the top while the page is still loading.
    await nav.evaluate((element) => (element.scrollTop = 0))
    release()
    await hydrated(page)
    expect(await scrollTop()).toBe(0)

    // The same holds elsewhere in the list, and when the sidebar is drawn again (here, with a completion mark).
    await nav.evaluate((element, to) => (element.scrollTop = to), opened - 150)
    await page.getByRole('button', { name: 'Mark chapter complete' }).click()
    await expect(courseNav(page).getByText('(completed)')).toBeAttached()
    expect(await scrollTop()).toBe(opened - 150)
  })
})

test.describe('legibility in both themes', () => {
  for (const theme of ['light', 'dark'] as const) {
    test(`text, links, labels and tables keep WCAG AA contrast in the ${theme} theme`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme })
      await page.goto('learn/01-linear-systems/')
      await page.getByText('About these notes: sources and verification status').click()
      const checks: [string, string][] = [
        ['article p', 'body text'],
        ['article h2', 'section heading'],
        ['article [class*="intro"] p:last-child', 'introduction'],
        ['article [class*="kindLabel"]', 'source-version label'],
        ['article [class*="chip"]', 'chip'],
        ['article [class*="status"]', 'status notice'],
        ['article table thead th', 'table header'],
        ['article table tbody td', 'table cell'],
        ['article blockquote p', 'callout'],
        ['nav[aria-label="On this page"] a', 'contents link'],
        ['nav[aria-label="Course"] a', 'course link'],
      ]
      const ledger = page.locator('summary', { hasText: 'Archival Source Reference' })
      await ledger.click()
      checks.push(['article details [class*="ledgerNote"]', 'ledger notice'])
      for (const [selector, what] of checks) {
        const ratio = await contrast(page, selector)
        expect(ratio, `${what} (${selector}) in ${theme}`).toBeGreaterThanOrEqual(4.5)
      }
    })
  }
})
