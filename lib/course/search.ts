/**
 * Course search: pure functions over a prebuilt list of documents, so the same code ranks results in
 * the browser and in tests. The index itself is built at export time (searchIndex.ts); no server or
 * request is needed when students search.
 */

/** One searchable unit: a heading of the lecture notes with the text under it, or an interactive lesson. */
export interface SearchDoc {
  /** Where the result links to, relative to the site: /learn/<slug>/ or /learn/<slug>/#<heading id>. */
  readonly href: string
  readonly kind: 'notes' | 'lesson'
  /** The page the unit belongs to, as a student would name it. */
  readonly page: string
  readonly chapter: number
  readonly heading: string
  readonly text: string
}

/** A piece of text and whether it is one of the words searched for, so the page can mark it without injecting HTML. */
export interface Segment {
  readonly text: string
  readonly match: boolean
}

export interface SearchHit {
  readonly doc: SearchDoc
  readonly score: number
  readonly heading: readonly Segment[]
  readonly snippet: readonly Segment[]
}

/** Lower case, accents folded, everything that is not a letter or digit turned into a space. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

/** The distinct words of a query. "Gauss-Jordan" and "gauss–jordan" give the same two words. */
export function tokenize(query: string): string[] {
  return [...new Set(normalize(query).split(' ').filter(Boolean))]
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function mark(text: string, pattern: RegExp | null): Segment[] {
  if (!pattern || text === '') return [{ text, match: false }]
  const segments: Segment[] = []
  let last = 0
  for (const found of text.matchAll(pattern)) {
    const at = found.index ?? 0
    if (at > last) segments.push({ text: text.slice(last, at), match: false })
    segments.push({ text: found[0], match: true })
    last = at + found[0].length
  }
  if (last < text.length) segments.push({ text: text.slice(last), match: false })
  return segments
}

const WINDOW = 80

function snippetOf(text: string, pattern: RegExp | null): Segment[] {
  const first = pattern ? new RegExp(pattern.source, 'iu').exec(text) : null
  if (!first) {
    const head = text.slice(0, WINDOW * 2)
    return [{ text: head + (text.length > head.length ? '…' : ''), match: false }]
  }
  const start = Math.max(0, first.index - WINDOW)
  const end = Math.min(text.length, first.index + first[0].length + WINDOW)
  const cut = text.slice(start, end)
  return mark(`${start > 0 ? '…' : ''}${cut}${end < text.length ? '…' : ''}`, pattern)
}

function count(haystack: string, needle: string, cap: number): number {
  let n = 0
  for (let at = haystack.indexOf(needle); at !== -1 && n < cap; at = haystack.indexOf(needle, at + needle.length)) n++
  return n
}

/**
 * Every document that contains all the words of the query, best first. A word in a heading counts
 * for much more than a word in the text, and the words next to each other count for more still.
 */
export function searchDocs(docs: readonly SearchDoc[], query: string, limit = 40): SearchHit[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []
  const pattern = new RegExp(tokens.map(escapeRegExp).join('|'), 'giu')
  const phrase = tokens.join(' ')

  const hits: (SearchHit & { order: number })[] = []
  docs.forEach((doc, order) => {
    const heading = ` ${normalize(doc.heading)} `
    const body = ` ${normalize(doc.text)} `
    let score = 0
    for (const token of tokens) {
      const inHeading = heading.includes(token)
      const inBody = body.includes(token)
      if (!inHeading && !inBody) return
      if (inHeading) score += heading.includes(` ${token}`) ? 16 : 12
      if (inBody) score += Math.min(count(body, token, 5), 5) + (body.includes(` ${token}`) ? 1 : 0)
    }
    if (tokens.length > 1) {
      if (heading.includes(` ${phrase} `)) score += 12
      else if (body.includes(` ${phrase} `)) score += 4
    }
    hits.push({ doc, score, order, heading: mark(doc.heading, pattern), snippet: snippetOf(doc.text, pattern) })
  })
  return hits
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map(({ order: _order, ...hit }) => hit)
}
