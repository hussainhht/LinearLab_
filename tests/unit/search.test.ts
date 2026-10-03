import { beforeAll, describe, expect, it } from 'vitest'
import { lessons, notes } from '@/content/lessons/catalog'
import { type SearchDoc, normalize, searchDocs, tokenize } from '@/lib/course/search'
import { buildSearchDocs } from '@/lib/course/searchIndex'
import { plainTex } from '@/lib/course/tex'

describe('search ranking', () => {
  const docs: SearchDoc[] = [
    { href: '/a', kind: 'notes', page: 'A', chapter: 1, heading: 'Gauss–Jordan elimination', text: 'Row reduce to reduced row-echelon form.' },
    { href: '/b', kind: 'notes', page: 'B', chapter: 2, heading: 'Matrix inverses', text: 'Use Gauss-Jordan elimination on [A | I] to invert a matrix.' },
    { href: '/c', kind: 'lesson', page: 'C', chapter: 3, heading: 'Determinants', text: 'Cofactor expansion along a row.' },
  ]

  it('ignores case, accents and punctuation, so Gauss-Jordan finds Gauss–Jordan', () => {
    expect(normalize('Gauss–Jordan  ÉLIMINATION!')).toBe('gauss jordan elimination')
    expect(tokenize('Gauss-Jordan gauss')).toEqual(['gauss', 'jordan'])
    expect(searchDocs(docs, 'gauss-jordan').map((hit) => hit.doc.href)).toEqual(['/a', '/b'])
  })

  it('requires every word, and ranks a heading match above a text match', () => {
    expect(searchDocs(docs, 'gauss invert').map((hit) => hit.doc.href)).toEqual(['/b'])
    expect(searchDocs(docs, 'matrix').map((hit) => hit.doc.href)).toEqual(['/b'])
    expect(searchDocs(docs, 'elimination').map((hit) => hit.doc.href)).toEqual(['/a', '/b'])
    expect(searchDocs(docs, 'nothing like this')).toEqual([])
    expect(searchDocs(docs, '   ')).toEqual([])
  })

  it('marks the words found, in the heading and in a snippet, without producing HTML', () => {
    const [hit] = searchDocs(docs, 'row')
    expect(hit!.snippet.filter((segment) => segment.match).map((segment) => segment.text.toLowerCase())).toContain('row')
    expect(hit!.snippet.map((segment) => segment.text).join('')).toContain('Row reduce')
    const [byHeading] = searchDocs(docs, 'determinants')
    expect(byHeading!.heading).toEqual([{ text: 'Determinants', match: true }])
  })

  it('treats regular-expression characters in a query as plain text', () => {
    expect(() => searchDocs(docs, '(a | i) [*+?')).not.toThrow()
  })
})

describe('plain text for search and headings', () => {
  it('reads common mathematics as words and symbols', () => {
    expect(plainTex('3 \\times 4')).toBe('3 × 4')
    expect(plainTex('\\mathbb{R}^3')).toBe('ℝ^3')
    expect(plainTex('S = \\emptyset')).toBe('S = ∅')
    expect(plainTex('\\operatorname{rank}(A) \\le \\min(n, p)')).toBe('rank(A) ≤ min(n, p)')
    expect(plainTex('\\{ (x, 2x) : x \\in \\mathbb{R} \\}')).toBe('{ (x, 2x) : x ∈ ℝ }')
    expect(plainTex('\\left( \\frac{a}{b} \\right)')).toBe('( (a)/(b) )')
    expect(plainTex('\\frac{x + 1}{2}')).toBe('(x + 1)/(2)')
  })
})

describe('the course index', () => {
  let docs: SearchDoc[] = []
  beforeAll(async () => {
    docs = await buildSearchDocs()
  }, 60_000)

  const topHref = (query: string) => searchDocs(docs, query)[0]?.doc.href

  it('covers every chapter of the lecture notes and every lesson', () => {
    for (const entry of notes) expect(docs.filter((doc) => doc.href.startsWith(`/learn/${entry.slug}/`)).length, entry.slug).toBeGreaterThan(15)
    for (const lesson of lessons) expect(docs.filter((doc) => doc.href === `/learn/${lesson.slug}/`)).toHaveLength(1)
    expect(docs.filter((doc) => doc.kind === 'lesson')).toHaveLength(lessons.length)
  })

  it('links each result to its own heading', () => {
    const wronskian = searchDocs(docs, 'Wronskian determinant').find((hit) => hit.doc.href.startsWith('/learn/07-'))
    expect(wronskian!.doc.href).toMatch(/^\/learn\/07-linear-independence\/#41-the-wronskian-determinant$/)
  })

  it('finds topics from all over the course', () => {
    expect(topHref('Cauchy-Schwarz inequality')).toMatch(/^\/learn\/12-dot-product\//)
    expect(topHref('eigenspace')).toMatch(/^\/learn\/10-eigenvalues-diagonalization\//)
    expect(topHref('Invertible Matrix Theorem')).toMatch(/^\/learn\/04-matrix-inverses\//)
    expect(topHref('orthogonal complement')).toMatch(/^\/learn\/13-orthogonality\//)
    expect(topHref('Minus Theorem')).toMatch(/^\/learn\/08-bases-dimensions\//)
    expect(topHref('kernel and range')).toMatch(/^\/learn\/11-linear-transformations\//)
    expect(topHref('Sarrus')).toMatch(/^\/learn\/05-determinants\//)
    expect(topHref('polynomial space')).toMatch(/^\/learn\/06-vector-spaces-subspaces\//)
  })

  it('finds both the lecture notes and the lesson for a topic they share', () => {
    const hits = searchDocs(docs, 'Cramer').map((hit) => hit.doc.href)
    expect(hits).toContain('/learn/cramers-rule/')
    expect(hits.some((href) => href.startsWith('/learn/05-determinants/'))).toBe(true)
  })

  it('does not index the source ledgers, which only cite file names', () => {
    expect(searchDocs(docs, 'page-001-part-001')).toEqual([])
    expect(searchDocs(docs, '1_howvee')).toEqual([])
  })

  it('searches the text under a heading, not only its title', () => {
    const hit = searchDocs(docs, 'identical intercepts scalar multiple').at(0)
    expect(hit?.doc.href).toMatch(/^\/learn\/01-linear-systems\//)
  })
})
