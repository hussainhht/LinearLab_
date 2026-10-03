/**
 * Renders every supplied chapter and checks the result against the source: every heading is reachable,
 * every formula, table and diagram that the Markdown contains is on the page, and the document is
 * shown through its final section rather than truncated. Mathematics must come out typeset, never as
 * raw LaTeX or dollar signs.
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeAll, describe, expect, it } from 'vitest'
import { basePath } from '@/config/deployment.mjs'
import { lessons, notes } from '@/content/lessons/catalog'
import { type ParsedNotes, isSourceNote, parseNotes, sectionKind } from '@/lib/course/markdown'
import { ledgerNote, registryProblems, scanHref } from '@/lib/course/notes'
import { parseFrontmatter } from '@/lib/course/frontmatter'
import { createSlugger, texForSlug } from '@/lib/course/slug'
import { plainTex } from '@/lib/course/tex'
import { type NoteRenderContext, renderInline, renderNotes } from '@/components/learning/notes/noteComponents'

const context = (anchorAliases: Record<string, string> = {}): NoteRenderContext => ({
  lessonSlugs: new Set(lessons.map((lesson) => lesson.slug)),
  anchorAliases,
  scanHref,
  ledgerNote: 'ledger note',
})

interface Rendered {
  readonly parsed: ParsedNotes
  readonly source: string
  readonly html: string
}

const rendered = new Map<string, Rendered>()

beforeAll(async () => {
  for (const entry of notes) {
    const source = readFileSync(join(process.cwd(), entry.source), 'utf8')
    const parsed = await parseNotes(source, entry.source)
    rendered.set(entry.slug, { parsed, source, html: renderToStaticMarkup(renderNotes(parsed.hast, context(entry.anchorAliases))) })
  }
}, 120_000)

/** The page's own text: no scripts, and without the TeX that MathML keeps in its <annotation> for assistive technology. */
const visible = (html: string) => html.replace(/<annotation[^>]*>[\s\S]*?<\/annotation>/g, '').replace(/<script[\s\S]*?<\/script>/g, '')

describe('heading ids', () => {
  it('follow GitHub’s algorithm, as the chapters’ own links expect', () => {
    const slug = createSlugger()
    expect(slug('1.1 — Systems of Linear Equations')).toBe('11--systems-of-linear-equations')
    expect(slug('Example 1: Reducing a 3 times 4 Matrix to REF and RREF')).toBe('example-1-reducing-a-3-times-4-matrix-to-ref-and-rref')
    expect(slug('Augmented Matrix and Reduction')).toBe('augmented-matrix-and-reduction')
    expect(slug('Augmented Matrix and Reduction')).toBe('augmented-matrix-and-reduction-1')
    expect(slug('Augmented Matrix and Reduction')).toBe('augmented-matrix-and-reduction-2')
  })

  it('turn mathematics in a heading into the words the chapters’ anchors use', () => {
    // `\mathbb{R}` loses its command name; the braces then fall away when the slug is made.
    expect(texForSlug('\\mathbb{R}^3')).toBe('{R}^3')
    expect(texForSlug('3 \\times 4')).toBe('3 \\times 4')
    expect(createSlugger()(`Example 1: Line Through the Origin in ${texForSlug('\\mathbb{R}^2')}`)).toBe(
      'example-1-line-through-the-origin-in-r2',
    )
    expect(createSlugger()(`Example 3: Inconsistent Linear System (${texForSlug('S = \\emptyset')})`)).toBe(
      'example-3-inconsistent-linear-system-s--emptyset',
    )
  })

  it('are unique within every chapter', () => {
    for (const { parsed } of rendered.values()) {
      const ids = parsed.headings.map((heading) => heading.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('reach the page: every heading in the Markdown has its id on exactly one element', () => {
    for (const [slug, { parsed, html }] of rendered) {
      for (const heading of parsed.headings.filter((h) => h.depth > 1)) {
        const found = html.split(`id="${heading.id}"`).length - 1
        expect(found, `${slug}#${heading.id}`).toBe(1)
      }
    }
  })
})

describe('every chapter, rendered', () => {
  it.each(notes.map((entry) => entry.slug))('%s has one title and registry problems of none', (slug) => {
    const { parsed } = rendered.get(slug)!
    const entry = notes.find((n) => n.slug === slug)!
    expect(parsed.title.length).toBeGreaterThan(3)
    expect(parsed.headings.filter((heading) => heading.depth === 1)).toHaveLength(1)
    expect(registryProblems(parsed, entry)).toEqual([])
  })

  it('shows every formula typeset, and none as raw LaTeX or dollar signs', () => {
    for (const [slug, { parsed, html }] of rendered) {
      const formulas = parsed.stats.displayMath + parsed.stats.inlineMath
      expect(formulas, slug).toBeGreaterThan(50)
      expect(html.split('class="katex"').length - 1, slug).toBe(formulas)
      expect(html.split('class="katex-display"').length - 1, slug).toBe(parsed.stats.displayMath)
      expect(html, slug).not.toContain('katex-error')
      expect(html, slug).toContain('<math')
      const text = visible(html)
      expect(text, slug).not.toMatch(/\$/)
      expect(text, slug).not.toMatch(/\\(?:begin|end|frac|mathbb|left|right|times|text|operatorname)\b/)
    }
  })

  it('shows every table, every diagram and every text drawing the Markdown contains', () => {
    for (const [slug, { parsed, html }] of rendered) {
      expect(html.split('<table').length - 1, `${slug} tables`).toBe(parsed.stats.tables)
      expect(html.split('data:image/svg+xml,').length - 1, `${slug} diagrams`).toBe(parsed.stats.diagrams)
      expect(html.split('<pre').length - 1, `${slug} text drawings`).toBe(parsed.stats.textBlocks)
    }
    const total = (key: 'tables' | 'diagrams' | 'textBlocks') => [...rendered.values()].reduce((sum, r) => sum + r.parsed.stats[key], 0)
    expect(total('diagrams')).toBe(7)
    expect(total('textBlocks')).toBe(4)
    expect(total('tables')).toBe(12)
  })

  it('never shows an SVG diagram or the whole document as code', () => {
    for (const [slug, { html }] of rendered) {
      expect(html, slug).not.toContain('&lt;svg')
      expect(html, slug).not.toContain('language-xml')
      expect(html, slug).not.toContain('language-math')
      expect(html, slug).not.toMatch(/<pre[^>]*>\s*<code[^>]*>\s*#/)
    }
  })

  it('does not show the frontmatter as text', () => {
    for (const [slug, { parsed, html }] of rendered) {
      const text = visible(html)
      expect(text, slug).not.toContain('source_ids')
      expect(text, slug).not.toContain('content_format')
      expect(text, slug).not.toContain(parsed.frontmatter.sourceIds[0]!.slice(0, 12) + '"')
    }
  })

  it('reaches the final section: the last heading of the Markdown is on the page and in the contents', () => {
    for (const [slug, { parsed, html, source }] of rendered) {
      const lastHeading = [...source.matchAll(/^(#{2,3}) (.+)$/gm)].at(-1)!
      const last = parsed.headings.filter((heading) => heading.depth <= 3).at(-1)!
      expect(parsed.toc.at(-1)!.id, slug).toBe(last.id)
      expect(visible(html), slug).toContain(plainTex(lastHeading[2]!.replace(/\$/g, '')).slice(0, 12))
      // the last line of the source's own text is also there
      const lastLine = source.trimEnd().split('\n').at(-1)!
      expect(lastLine.length, slug).toBeGreaterThan(0)
    }
  })

  it('lists every section and subsection in the contents, in document order, with working targets', () => {
    for (const [slug, { parsed, html }] of rendered) {
      const expected = parsed.headings.filter((heading) => heading.depth === 2 || heading.depth === 3).map((heading) => heading.id)
      expect(parsed.toc.map((entry) => entry.id), slug).toEqual(expected)
      for (const id of expected) expect(html, `${slug}#${id}`).toContain(`id="${id}"`)
    }
  })

  it('resolves every link a chapter makes to itself, through its explicit aliases only', () => {
    for (const [slug, { parsed, html }] of rendered) {
      const entry = notes.find((n) => n.slug === slug)!
      const ids = new Set(parsed.headings.map((heading) => heading.id))
      const aliases = entry.anchorAliases ?? {}
      for (const link of parsed.internalLinks) {
        const target = ids.has(link) ? link : aliases[link]
        expect(target, `${slug}: #${link}`).toBeDefined()
        expect(ids.has(target!), `${slug}: #${link} → #${target}`).toBe(true)
        expect(html, `${slug}: #${link}`).toContain(`href="#${target}"`)
      }
    }
    expect(notes[1]!.anchorAliases).toEqual({ 'reduced-rref-form': 'example-5-underdetermined-system-with-2-free-parameters' })
  })

  it('links the lesson files named in the reconciled sections to their lessons', () => {
    const html = rendered.get('02-gauss-jordan')!.html
    for (const slug of ['row-operations', 'echelon-forms', 'gauss-jordan-elimination', 'general-solutions']) {
      // next/link adds the trailing slash itself in a real build (trailingSlash: true); outside one it does not.
      expect(html).toMatch(new RegExp(`href="/learn/${slug}/?"`))
    }
  })

  it('draws the figures through <img>, with the words of the figure as their text alternative', () => {
    const html = rendered.get('01-linear-systems')!.html
    expect(html).toContain('<figure')
    expect(html).toMatch(/alt="Case 1: Unique Solution; /)
    expect(html).toContain('Case 3: Infinite Solutions')
    // The supplied SVG source is never inlined (KaTeX draws its own stretchy brackets and arrows as <svg>, so a bare "<svg" proves nothing).
    expect(html).not.toContain('style="background: #ffffff')
    expect(html).not.toContain('Case 1: Unique Solution</text>')
  })
})

describe('notes about the source', () => {
  it('are recognized by what they say, and nothing else is', () => {
    for (const note of [
      '(Version 2 variant: A = [[1,2],[4,5]].)',
      '(In Version 2, specific coefficients are used).',
      '(For Version 2: T(x,y) = x).',
      '(Note: In the handwritten note on part 8, evaluating (2, 2) gives T).',
      'Source file: 1.1_Introduction.pdf (Parts 1–6)',
      'Source annotation: In the second equation, missing variables have coefficient zero.',
    ]) {
      expect(isSourceNote(note), note).toBe(true)
    }
    for (const text of [
      '(Note: If the columns of P are permuted, the diagonal entries of D must be permuted in the exact same order).',
      '(Note: contains 1, x, …, x^n, which is n+1 elements)',
      'Version 2 of the theorem is stronger.',
      'The source of this is classical.',
    ]) {
      expect(isSourceNote(text), text).toBe(false)
    }
  })

  it('are marked where the supplied chapters have them, and carry the marker to the page', () => {
    const counts = Object.fromEntries([...rendered].map(([slug, { parsed }]) => [slug.slice(0, 2), parsed.stats.sourceNotes]))
    expect(counts).toEqual({ '01': 3, '02': 0, '03': 0, '04': 0, '05': 1, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 7, '12': 0, '13': 0 })
    for (const [slug, { parsed, html }] of rendered) expect(html.split('data-note="source"').length - 1, slug).toBe(parsed.stats.sourceNotes)
    expect(rendered.get('11-linear-transformations')!.html).toMatch(/<p data-note="source"[^>]*><em>\(In Version 2, specific coefficients/)
  })
})

describe('section kinds', () => {
  it('classify the headings the chapters use', () => {
    expect(sectionKind('2. Complete Source Transcription — Version 1')).toBe('source-version')
    expect(sectionKind('5. Supplementary Course Insights & Reconciled Content')).toBe('supplementary')
    expect(sectionKind('6. Archival Source Reference & Verification Ledger')).toBe('ledger')
    expect(sectionKind('6. Source Verification Appendix')).toBe('ledger')
    expect(sectionKind('4. Complete Worked Examples from Course Sources')).toBe('core')
    expect(sectionKind('1. Definition of a Linear Transformation')).toBe('core')
  })

  it('give every chapter exactly one source ledger, last, and keep the two source versions of chapter 1 apart', () => {
    for (const [slug, { parsed }] of rendered) {
      const kinds = parsed.toc.filter((entry) => entry.depth === 2).map((entry) => entry.kind)
      expect(kinds.filter((kind) => kind === 'ledger'), slug).toHaveLength(1)
      expect(kinds.at(-1), slug).toBe('ledger')
    }
    const kinds = rendered.get('01-linear-systems')!.parsed.toc.filter((entry) => entry.depth === 2).map((entry) => entry.kind)
    expect(kinds.filter((kind) => kind === 'source-version')).toHaveLength(2)
  })

  it('show the ledger collapsed, with the scans’ availability stated, and the other kinds labelled', () => {
    const html = rendered.get('01-linear-systems')!.html
    expect(html).toMatch(/<details[^>]*><summary><h2[^>]*>6\. Archival Source Reference/)
    expect(html).toContain('ledger note')
    expect(html).toContain('Source version, transcribed as supplied')
    expect(html).toContain('Supplementary: reconciled with the LinearLab lessons')
  })
})

describe('source scans', () => {
  it('are reported as unavailable, because the supplied material includes none', () => {
    expect(scanHref('../assets/01-linear-systems-1/page-001-part-001.webp')).toBeNull()
    expect(scanHref('not a scan')).toBeNull()
    for (const { parsed } of rendered.values()) {
      expect(parsed.scans.length).toBeGreaterThan(0)
      expect(ledgerNote(parsed.scans)).toMatch(/not included in this repository/)
    }
    expect(ledgerNote([])).toBe('')
  })

  it('link to the files that exist, and say so, if scans are ever supplied (checked with a temporary folder)', async () => {
    const root = mkdtempSync(join(tmpdir(), 'linearlab-scans-'))
    try {
      const { parsed, source } = rendered.get('01-linear-systems')!
      const present = '../assets/01-linear-systems-1/page-001-part-001.webp'
      const missing = '../assets/01-linear-systems-1/page-001-part-002.webp'
      mkdirSync(join(root, 'public/source-scans/01-linear-systems-1'), { recursive: true })
      writeFileSync(join(root, 'public/source-scans/01-linear-systems-1/page-001-part-001.webp'), 'not really an image')

      expect(scanHref(present, root)).toBe(`${basePath}/source-scans/01-linear-systems-1/page-001-part-001.webp`)
      expect(scanHref(missing, root)).toBeNull()
      expect(scanHref('../assets/../../etc/passwd.webp', root)).toBeNull()
      expect(ledgerNote(parsed.scans, root)).toBe(
        `1 of the ${parsed.scans.length} scan files cited by path here are included in this repository and linked below; the rest are not available.`,
      )

      // The ledger row for that file becomes a link, and every other row stays plain text.
      const entry = notes.find((n) => n.slug === '01-linear-systems')!
      const again = await parseNotes(source, entry.source)
      const html = renderToStaticMarkup(
        renderNotes(again.hast, { ...context(entry.anchorAliases), scanHref: (reference) => scanHref(reference, root) }),
      )
      expect(html.split(`href="${basePath}/source-scans/`).length - 1).toBe(1)
      expect(html).toContain(`<a href="${basePath}/source-scans/01-linear-systems-1/page-001-part-001.webp"><code>${present}</code></a>`)
      expect(html).toContain(`<code>${missing}</code>`)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 30_000)

  it('cite exactly the files the ledgers list', () => {
    const counts = Object.fromEntries([...rendered].map(([slug, { parsed }]) => [slug.slice(0, 2), parsed.scans.length]))
    // Chapters 1–8 list every scan in a table; chapters 9–13 name the first and last of a range.
    expect(counts).toEqual({ '01': 13, '02': 30, '03': 33, '04': 23, '05': 24, '06': 43, '07': 21, '08': 23, '09': 2, '10': 2, '11': 2, '12': 1, '13': 1 })
  })
})

describe('contents entries', () => {
  it('render headings that contain mathematics as typeset mathematics', () => {
    const { parsed } = rendered.get('02-gauss-jordan')!
    const entry = parsed.toc.find((e) => e.id === 'example-1-reducing-a-3-times-4-matrix-to-ref-and-rref')!
    expect(renderToStaticMarkup(renderInline(entry.content))).toContain('class="katex"')
  })
})

describe('frontmatter', () => {
  it('reads both schemas the supplied files use', () => {
    const first = parseFrontmatter(
      'id: "01-x"\ntitle: "1.1 — X"\ncourse: "C"\norder: 1\nsource_ids: ["a", "b"]\nsource_page_count: 2\ntranscribed_source_ids: ["a", "b"]\neditable_transcription: "all"',
      'x.md',
    )
    expect(first.sourceIds).toEqual(['a', 'b'])
    expect(first.transcribedSourceIds).toEqual(['a', 'b'])
    expect(first.editableTranscription).toBe('all')
    const later = parseFrontmatter(
      'id: "09-x"\ntitle: "4.7 — X"\norder: 9\nsource_ids: ["a", "b"]\ntranscribed_source_id: "a, b"\ntranscribed_source_parts: [1, 2, 3]',
      'y.md',
    )
    expect(later.transcribedSourceIds).toEqual(['a', 'b'])
    expect(later.transcribedSourceParts).toEqual([1, 2, 3])
    expect(later.raw.order).toBe(9)
  })

  it('refuses a file without an id, a title or a numeric order', () => {
    expect(() => parseFrontmatter('title: "T"\norder: 1', 'a.md')).toThrow(/no "id"/)
    expect(() => parseFrontmatter('id: "a"\norder: 1', 'a.md')).toThrow(/no "title"/)
    expect(() => parseFrontmatter('id: "a"\ntitle: "T"\norder: "one"', 'a.md')).toThrow(/order/)
    expect(() => parseFrontmatter('- just\n- a list', 'a.md')).toThrow(/mapping/)
  })

  it('records what the supplied files actually say about their sources, without interpreting it', () => {
    const { parsed } = rendered.get('04-matrix-inverses')!
    // As supplied: this file lists the sources of chapter 3 but transcribes those of chapter 2. It is shown, not corrected.
    expect(parsed.frontmatter.sourceIds).toEqual(['1shHnNllATjHF2PwBuQfxxA3ishTX7fUx', '1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ'])
    expect(parsed.frontmatter.transcribedSourceIds).toEqual(['1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg', '1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4'])
    expect(rendered.get('09-fundamental-spaces')!.parsed.frontmatter.transcribedSourceParts).toHaveLength(14)
  })
})
