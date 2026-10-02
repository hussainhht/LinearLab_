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
import { lessons } from '@/content/lessons/catalog'
import { practiceProblems } from '@/data/examples/practice'
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
  const pattern = kind === 'html' ? /\b(?:href|src)="(\/(?!\/)[^"]*)"/g : /url\(\s*["']?(\/(?!\/)[^)"']*)["']?\s*\)/g
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
  const staticRoutes = ['', 'learn', 'tools', 'practice', 'practice/custom']
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

  it('generates exactly the lessons and practice problems in the data, no more and no fewer', () => {
    expect(subdirectories('learn').sort()).toEqual(lessons.map((lesson) => lesson.slug).sort())
    expect(subdirectories('practice').filter((name) => name !== 'custom').sort()).toEqual(
      practiceProblems.map((problem) => problem.id).sort(),
    )
  })

  it('has a 404 page for unknown URLs and a favicon', () => {
    expect(existsSync(join(out, '404.html'))).toBe(true)
    expect(existsSync(join(out, 'icon.svg'))).toBe(true)
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
