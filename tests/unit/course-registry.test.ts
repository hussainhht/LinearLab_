/**
 * The course registry (content/lessons/catalog.ts) is the one list the site is built from. These
 * tests keep it honest: every supplied chapter is registered exactly once, in order, matching its own
 * frontmatter; nothing a student saved earlier can have been orphaned; and every link the registry
 * makes points at something that exists.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { TOOLS } from '@/components/tools/catalog'
import {
  chapterList,
  chapters,
  findPage,
  lessons,
  neighbors,
  notes,
  outline,
  pageHref,
  pages,
  progressIds,
} from '@/content/lessons/catalog'
import { conceptTopics, checksFor } from '@/data/examples/concepts'
import { practiceProblems } from '@/data/examples/practice'
import { type ParsedNotes, parseNotes } from '@/lib/course/markdown'
import { CHAPTERS_DIR, chapterFiles, registryProblems } from '@/lib/course/notes'

/** The lessons that existed before the lecture notes were added. Their ids key saved progress and their slugs are public URLs. */
const ORIGINAL_LESSONS: readonly (readonly [id: string, slug: string])[] = [
  ['sys-intro', 'linear-systems'],
  ['sys-solutions', 'solution-sets'],
  ['sys-homogeneous', 'homogeneous-systems'],
  ['sys-augmented', 'augmented-matrices'],
  ['red-row-ops', 'row-operations'],
  ['red-echelon', 'echelon-forms'],
  ['red-gauss-jordan', 'gauss-jordan-elimination'],
  ['red-general', 'general-solutions'],
  ['alg-basics', 'matrix-basics'],
  ['alg-add-scale', 'addition-and-scalar-multiplication'],
  ['alg-multiply', 'matrix-multiplication'],
  ['alg-mult-props', 'multiplication-properties'],
  ['alg-transpose', 'transpose-and-special-matrices'],
  ['alg-spaces', 'rank-and-null-space'],
  ['inv-meaning', 'matrix-inverse'],
  ['inv-2x2', 'inverse-2x2'],
  ['inv-gauss-jordan', 'inverse-by-row-reduction'],
  ['inv-properties', 'inverse-properties'],
  ['inv-systems', 'invertibility-and-systems'],
  ['det-compute', 'determinants'],
  ['det-properties', 'determinant-properties'],
  ['det-cramer', 'cramers-rule'],
]

/** Routes under /learn/ that are real pages of their own, so a chapter or lesson may not take their slug. */
const RESERVED_SLUGS = ['search']

const parsed = new Map<string, ParsedNotes>()

beforeAll(async () => {
  for (const entry of notes) {
    parsed.set(entry.slug, await parseNotes(readFileSync(join(process.cwd(), entry.source), 'utf8'), entry.source, { render: false }))
  }
})

describe('the supplied chapters', () => {
  it('are all registered, in order, and nothing in chapters/ is left out', () => {
    expect(chapterFiles()).toEqual(notes.map((entry) => entry.source.replace(`${CHAPTERS_DIR}/`, '')))
    expect(notes).toHaveLength(13)
    expect(chapterFiles().map((file) => file.slice(0, 2))).toEqual(
      Array.from({ length: 13 }, (_, i) => String(i + 1).padStart(2, '0')),
    )
  })

  it('have a file name, registry id, slug and progress key that agree', () => {
    for (const entry of notes) {
      expect(entry.source).toBe(`${CHAPTERS_DIR}/${entry.id}.md`)
      expect(entry.slug).toBe(entry.id)
      expect(entry.progressId).toBe(`notes-${entry.id}`)
      expect(Number(entry.id.slice(0, 2))).toBe(entry.chapterNumber)
    }
  })

  it('match their own frontmatter, headings and links, so nothing has drifted from the registry', () => {
    const problems = notes.flatMap((entry) => registryProblems(parsed.get(entry.slug)!, entry))
    expect(problems).toEqual([])
  })

  it('keep the section labels exactly as supplied, including the one that repeats', () => {
    expect(notes.map((entry) => entry.sectionLabel)).toEqual([
      '1.1',
      '1.2',
      '1.3',
      '1.4',
      '2.1',
      '4.1–4.2',
      '4.3',
      '4.4–4.5',
      '4.7–4.8',
      '5.1–5.2',
      '8.1–8.2',
      '1.2',
      null,
    ])
    // Chapters 2 and 12 both print "1.2"; the registry explains the second one instead of changing it.
    expect(notes[11]!.labelNote).toMatch(/1\.2/)
    expect(notes[1]!.labelNote).toBeUndefined()
  })
})

describe('what has been verified', () => {
  it('says that only chapter 1 was not recomputed, and carries the two disagreements that were found', () => {
    expect(notes.filter((entry) => entry.verification === 'not-checked').map((entry) => entry.slug)).toEqual(['01-linear-systems'])
    expect(notes.filter((entry) => (entry.reviewNotes ?? []).length > 0).map((entry) => entry.slug)).toEqual([
      '09-fundamental-spaces',
      '10-eigenvalues-diagonalization',
    ])
  })
})

describe('slugs, ids and routes', () => {
  it('are unique across lessons and lecture notes, and none is reserved', () => {
    const slugs = pages.map((page) => page.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs.filter((slug) => RESERVED_SLUGS.includes(slug))).toEqual([])
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    expect(new Set(progressIds).size).toBe(progressIds.length)
    expect(progressIds).toHaveLength(lessons.length + notes.length)
  })

  it('resolve every page from its URL', () => {
    for (const page of pages) {
      expect(findPage(page.slug)).toBe(page)
      expect(pageHref(page)).toBe(`/learn/${page.slug}/`)
    }
    expect(findPage('search')).toBeUndefined()
    expect(findPage('vector-spaces')).toBeUndefined()
  })
})

describe('compatibility with what students already saved', () => {
  it('keeps every earlier lesson id and public URL', () => {
    const byId = new Map(lessons.map((lesson) => [lesson.id, lesson.slug]))
    for (const [id, slug] of ORIGINAL_LESSONS) expect(byId.get(id), id).toBe(slug)
    expect(lessons).toHaveLength(ORIGINAL_LESSONS.length)
  })

  it('does not collide a new progress key with an old lesson id', () => {
    const lessonIds = new Set(lessons.map((lesson) => lesson.id))
    for (const entry of notes) expect(lessonIds.has(entry.progressId)).toBe(false)
  })

  it('keeps the first five chapters numbered as before', () => {
    expect(chapters.slice(0, 5).map((chapter) => chapter.id)).toEqual(['systems', 'reduction', 'algebra', 'inverses', 'determinants'])
    expect(lessons.filter((lesson) => lesson.chapterNumber <= 2).map((lesson) => lesson.number)).toEqual([
      '1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4',
    ])
  })

  it('moves the rank and null space lesson to the chapter on fundamental spaces, keeping its id and URL', () => {
    const lesson = lessons.find((l) => l.slug === 'rank-and-null-space')!
    expect(lesson.id).toBe('alg-spaces')
    expect(lesson.chapterId).toBe('fundamental-spaces')
    expect(lesson.number).toBe('9.1')
  })
})

describe('reading order and navigation', () => {
  it('puts each chapter’s lecture notes before its interactive lessons', () => {
    expect(pages.map((page) => page.slug).slice(0, 7)).toEqual([
      '01-linear-systems',
      'linear-systems',
      'solution-sets',
      'homogeneous-systems',
      'augmented-matrices',
      '02-gauss-jordan',
      'row-operations',
    ])
    expect(pages.map((page) => page.chapterNumber)).toEqual([...pages.map((page) => page.chapterNumber)].sort((a, b) => a - b))
  })

  it('links previous and next without gaps or loops', () => {
    expect(neighbors(pages[0]!).previous).toBeNull()
    expect(neighbors(pages.at(-1)!).next).toBeNull()
    pages.forEach((page, i) => {
      expect(neighbors(page).next).toBe(pages[i + 1] ?? null)
      expect(neighbors(page).previous).toBe(pages[i - 1] ?? null)
    })
    expect(pages.at(-1)!.slug).toBe('13-orthogonality')
  })

  it('gives the navigation outline every page exactly once', () => {
    const outlined = outline.flatMap((chapter) => chapter.items.map((item) => item.slug))
    expect(outlined).toEqual(pages.map((page) => page.slug))
    expect(outline.map((chapter) => chapter.number)).toEqual(Array.from({ length: 13 }, (_, i) => i + 1))
    expect(chapterList.every((chapter) => chapter.notes.chapterId === chapter.id)).toBe(true)
  })
})

describe('links from chapters to tools and practice', () => {
  it('point only at tools, practice problems and concept-check topics that exist', () => {
    const toolHrefs = new Set<string>(TOOLS.map((tool) => tool.href))
    const practiceHrefs = new Set<string>([
      '/practice/',
      ...practiceProblems.map((problem) => `/practice/${problem.id}/`),
      ...conceptTopics.filter((topic) => checksFor(topic.id).length > 0).map((topic) => `/practice/concepts/#${topic.id}`),
    ])
    for (const chapter of chapterList) {
      for (const tool of chapter.tools) expect(toolHrefs.has(tool.href), `${chapter.id}: ${tool.href}`).toBe(true)
      for (const item of chapter.practice) expect(practiceHrefs.has(item.href), `${chapter.id}: ${item.href}`).toBe(true)
    }
  })

  it('explain every link, and never list the same destination twice for one chapter', () => {
    for (const chapter of chapterList) {
      const links = [...chapter.tools, ...chapter.practice]
      for (const link of links) {
        expect(link.label.length).toBeGreaterThan(2)
        expect(link.why.length).toBeGreaterThan(20)
      }
      const hrefs = links.map((link) => link.href)
      expect(new Set(hrefs).size).toBe(hrefs.length)
    }
  })

  it('lists practice only for chapters whose topics the existing material covers', () => {
    expect(chapterList.filter((chapter) => chapter.practice.length > 0).map((chapter) => chapter.id)).toEqual([
      'systems',
      'reduction',
      'inverses',
      'determinants',
      'vector-spaces',
      'independence',
      'bases',
      'fundamental-spaces',
    ])
    // Nothing is offered for the chapters that no existing practice or concept check addresses.
    expect(chapterList.filter((chapter) => chapter.practice.length === 0).map((chapter) => chapter.id)).toEqual([
      'algebra',
      'eigen',
      'transformations',
      'dot-product',
      'orthogonality',
    ])
  })
})

describe('the lesson files', () => {
  it('are still exactly the registered lessons', () => {
    const files = readdirSync(join(process.cwd(), 'content/lessons'))
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
    expect(files.sort()).toEqual(lessons.map((lesson) => lesson.slug).sort())
  })
})
