/**
 * Checks the static export in out/ (run `npm run build` first, then `npm run verify:export`).
 *
 * Everything is derived from the same data the site is generated from, so a route that exists in
 * the course or practice data but not in the export, or an asset URL that forgot the base path,
 * fails here rather than on the live site.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { TOOLS } from '@/components/tools/catalog'
import { lessons, notes, pages } from '@/content/lessons/catalog'
import { conceptChecks } from '@/data/examples/concepts'
import { practiceProblems } from '@/data/examples/practice'
import { parseNotes } from '@/lib/course/markdown'
import { basePath } from '../../config/deployment.mjs'

const out = resolve(process.env.OUT_DIR ?? 'out')

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  )
}

const pageFile = (route: string) => join(out, route, 'index.html')
const subdirectories = (dir: string) =>
  readdirSync(join(out, dir), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

/** Root-relative URLs (not protocol-relative) found in the given attributes or CSS url() values. */
function rootRelativeUrls(source: string, kind: 'html' | 'css'): string[] {
  const pattern = kind === 'html' ? /\b(?:href|src|action)="(\/(?!\/)[^"]*)"/g : /url\(\s*["']?(\/(?!\/)[^)"']*)["']?\s*\)/g
  return [...source.matchAll(pattern)].map((match) => match[1]!)
}

/** Maps a URL on the site to the file a static host would serve for it, or null. */
function fileFor(url: string): string | null {
  const pathname = url.split(/[?#]/)[0]!
  const local = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname
  const target = join(out, decodeURIComponent(local))
  if (existsSync(target) && statSync(target).isFile()) return target
  if (existsSync(join(target, 'index.html'))) return join(target, 'index.html')
  return null
}

let htmlFiles: string[] = []
let cssFiles: string[] = []

beforeAll(() => {
  if (!existsSync(out)) throw new Error(`No static export at ${out}. Run \`npm run build\` first.`)
  const files = walk(out)
  htmlFiles = files.filter((file) => file.endsWith('.html'))
  cssFiles = files.filter((file) => file.endsWith('.css'))
})

describe('static export routes', () => {
  const staticRoutes = ['', 'learn', 'learn/search', 'tools', 'practice', 'practice/custom', 'practice/concepts']
  const toolRoutes = TOOLS.map((tool) => tool.href.replace(/^\/|\/$/g, ''))

  it.each([...staticRoutes, ...toolRoutes])('has /%s', (route) => {
    expect(existsSync(pageFile(route))).toBe(true)
  })

  it.each(lessons.map((lesson) => lesson.slug))('has lesson %s, with its math rendered at build time', (slug) => {
    const file = pageFile(`learn/${slug}`)
    expect(existsSync(file)).toBe(true)
    const html = readFileSync(file, 'utf8')
    expect(html).toContain('class="katex"')
    expect(html).not.toContain('katex-error')
  })

  it.each(practiceProblems.map((problem) => problem.id))('has practice problem %s', (id) => {
    expect(existsSync(pageFile(`practice/${id}`))).toBe(true)
  })

  it('generates exactly the lecture notes, lessons and practice problems in the data, no more and no fewer', () => {
    expect(subdirectories('learn').sort()).toEqual([...pages.map((page) => page.slug), 'search'].sort())
    expect(subdirectories('practice').filter((name) => name !== 'custom' && name !== 'concepts').sort()).toEqual(
      practiceProblems.map((problem) => problem.id).sort(),
    )
  })

  it('has every concept check on its page, each with its own answer form', () => {
    const html = readFileSync(pageFile('practice/concepts'), 'utf8')
    expect(html.split('<form').length - 1).toBe(conceptChecks.length)
    expect(html.split('Check answer').length - 1).toBe(conceptChecks.length)
    expect(html).toContain('Changed from the original question')
  })

  it('has a 404 page for unknown URLs and a favicon', () => {
    expect(existsSync(join(out, '404.html'))).toBe(true)
    expect(existsSync(join(out, 'icon.svg'))).toBe(true)
  })
})

/**
 * The text a student reads: no scripts, no comments (React marks Suspense boundaries as `<!--$-->`), and
 * without the TeX that MathML keeps in <annotation> for assistive technology.
 */
const readable = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<annotation[^>]*>[\s\S]*?<\/annotation>/g, '')

describe('lecture notes in the export', () => {
  it('has all 13 supplied chapters, each at /learn/<id>/', () => {
    expect(notes).toHaveLength(13)
    for (const entry of notes) expect(existsSync(pageFile(`learn/${entry.slug}`)), entry.slug).toBe(true)
    expect(existsSync(join(out, 'learn', 'search', 'index.html'))).toBe(true)
  })

  it.each(notes.map((entry) => [entry.slug, entry.source] as const))(
    '%s shows its source through the final section, typeset, with working in-page links',
    async (slug, source) => {
      const html = readFileSync(pageFile(`learn/${slug}`), 'utf8')
      const text = readable(html)
      const parsed = await parseNotes(readFileSync(join(process.cwd(), source), 'utf8'), source, { render: false })

      // One title, taken from the document itself.
      expect(html.split('<h1').length - 1).toBe(1)
      expect(text).toContain(parsed.title.replace(/&/g, '&amp;'))

      // Every formula is typeset; nothing is left as LaTeX or dollar signs.
      expect(html).toContain('class="katex"')
      expect(html).not.toContain('katex-error')
      expect(html.split('class="katex-display"').length - 1).toBeGreaterThanOrEqual(parsed.stats.displayMath)
      expect(text).not.toMatch(/\$/)
      expect(text).not.toMatch(/\\(?:begin|end|frac|mathbb|left|right|times|operatorname)\b/)

      // Every heading of the source is on the page, including the last one, and listed in the contents.
      const allIds = [...text.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]!)
      expect(allIds.length, `${slug}: duplicate ids`).toBe(new Set(allIds).size)
      const ids = new Set(allIds)
      for (const heading of parsed.headings.filter((h) => h.depth > 1)) expect(ids.has(heading.id), `${slug}#${heading.id}`).toBe(true)
      const sections = parsed.headings.filter((h) => h.depth === 2 || h.depth === 3)
      const contents = /<nav aria-label="On this page"[\s\S]*?<\/nav>/.exec(text)![0]
      for (const heading of sections) expect(contents, `${slug} contents: ${heading.id}`).toContain(`href="#${heading.id}"`)

      // Every link within the page leads to something on the page.
      for (const [, target] of text.matchAll(/\bhref="#([^"]+)"/g)) expect(ids.has(decodeURIComponent(target!)), `${slug}: #${target}`).toBe(true)

      // The diagrams and tables in the source are all there, and the source's own SVG text is not.
      expect(html.split('data:image/svg+xml,').length - 1).toBeGreaterThanOrEqual(parsed.stats.diagrams)
      expect(text.split('<table').length - 1).toBe(parsed.stats.tables)
      expect(text).not.toContain('&lt;svg')

      // The source ledger is present, collapsed, and does not pretend the scans exist.
      expect(text).toMatch(/<details[^>]*><summary><h2[^>]*>[^<]*(?:Archival Source Reference|Source Verification Appendix)/)
      expect(text).toContain('not included in this repository')
      expect(text).not.toMatch(/href="[^"]*assets\//)
    },
  )

  it('states, on each page, what was and was not verified, and shows the review notes where there are any', () => {
    for (const entry of notes) {
      const text = readable(readFileSync(pageFile(`learn/${entry.slug}`), 'utf8'))
      expect(text, entry.slug).toContain('Integrated exactly as supplied')
      expect(text, entry.slug).toContain(
        entry.verification === 'numbers-recomputed' ? 'recomputed independently with exact arithmetic' : 'has not independently checked the mathematics',
      )
      for (const note of entry.reviewNotes ?? []) expect(text, entry.slug).toContain(note.slice(0, 40).replace(/&/g, '&amp;'))
      expect(text.includes('Review notes'), entry.slug).toBe((entry.reviewNotes ?? []).length > 0)
    }
  })

  it('offers search from the course navigation, and the search page ships its index', () => {
    const page = readFileSync(pageFile('learn/05-determinants'), 'utf8')
    expect(page).toMatch(/<form[^>]*role="search"[^>]*action="[^"]*\/learn\/search\/"/)
    // The page is prerendered with a fallback (the box needs the browser's query string); the index travels with it.
    const search = readFileSync(pageFile('learn/search'), 'utf8')
    expect(search).toContain('Loading search')
    expect(search).toContain('needs JavaScript')
    expect(search).toContain('Wronskian')
    expect(search).toContain('Invertible Matrix Theorem')
  })
})

describe('course sidebar in the export', () => {
  it('opens at the current page through an inline script that needs nothing from the app bundle', () => {
    for (const page of pages) {
      const html = readFileSync(pageFile(`learn/${page.slug}`), 'utf8')
      // The last thing in the sidebar, so it runs once the whole list has been parsed.
      const script = /<script>(\(function[^<]*data-centered[^<]*)<\/script><\/nav>/.exec(html)?.[1]
      expect(script, `${page.slug}: sidebar script`).toBeDefined()

      // Run it against a stand-in for the sidebar: a free variable left behind by the bundler would throw.
      const link = { offsetTop: 1000, offsetHeight: 30 }
      const attributes: string[] = []
      const nav = {
        scrollTop: 0,
        scrollHeight: 2000,
        clientHeight: 800,
        querySelector: (selector: string) => (selector === '[aria-current="page"]' ? link : null),
        setAttribute: (name: string) => attributes.push(name),
      }
      new Function('document', script!)({ currentScript: { parentElement: nav } })
      expect(nav.scrollTop, page.slug).toBe(1000 - (800 - 30) / 2)
      expect(attributes, page.slug).toEqual(['data-centered'])
    }
  })
})

describe('base path', () => {
  it(`prefixes every root-relative URL in every page with "${basePath}" and each one resolves to a file`, () => {
    const problems: string[] = []
    for (const file of htmlFiles) {
      for (const url of rootRelativeUrls(readFileSync(file, 'utf8'), 'html')) {
        const pathname = url.split(/[?#]/)[0]!
        const inside = basePath === '' || pathname === basePath || pathname.startsWith(`${basePath}/`)
        if (!inside) problems.push(`${file.slice(out.length)}: ${url} is outside the base path`)
        else if (!fileFor(url)) problems.push(`${file.slice(out.length)}: ${url} does not exist in the export`)
      }
    }
    expect(problems).toEqual([])
  })

  it('also prefixes root-relative url() references in stylesheets (fonts, images)', () => {
    const problems: string[] = []
    for (const file of cssFiles) {
      for (const url of rootRelativeUrls(readFileSync(file, 'utf8'), 'css')) {
        const pathname = url.split(/[?#]/)[0]!
        const inside = basePath === '' || pathname.startsWith(`${basePath}/`)
        if (!inside) problems.push(`${file.slice(out.length)}: ${url} is outside the base path`)
        else if (!fileFor(url)) problems.push(`${file.slice(out.length)}: ${url} does not exist in the export`)
      }
    }
    expect(problems).toEqual([])
  })
})
