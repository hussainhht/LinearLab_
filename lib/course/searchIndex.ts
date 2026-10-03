/**
 * Builds the course search index while the site is exported: every heading of every lecture-notes
 * chapter with the text under it, plus each interactive lesson's title, objective and section
 * headings. Reads files, so it is only ever called from Server Components at build time.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { lessons, notes } from '@/content/lessons/catalog'
import { parseNotes } from './markdown'
import type { SearchDoc } from './search'
import { plainTex } from './tex'

/** A heading from an MDX lesson as plain words: emphasis marks and inline math reduced to readable text. */
function lessonHeading(raw: string): string {
  return raw
    .replace(/\$([^$]+)\$/g, (_, tex: string) => plainTex(tex))
    .replace(/[*_`]/g, '')
    .trim()
}

export async function buildSearchDocs(): Promise<SearchDoc[]> {
  const root = process.cwd()
  const docs: SearchDoc[] = []

  for (const chapter of notes) {
    const parsed = await parseNotes(readFileSync(join(root, chapter.source), 'utf8'), chapter.source, { render: false })
    const page = `Chapter ${chapter.chapterNumber}: ${chapter.title}, lecture notes`
    const [title, ...rest] = parsed.blocks
    docs.push({
      href: `/learn/${chapter.slug}/`,
      kind: 'notes',
      page,
      chapter: chapter.chapterNumber,
      heading: parsed.title,
      text: [chapter.intro, title?.text ?? ''].join(' ').trim(),
    })
    for (const block of rest) {
      docs.push({
        href: `/learn/${chapter.slug}/#${block.id}`,
        kind: 'notes',
        page,
        chapter: chapter.chapterNumber,
        heading: block.heading,
        text: block.text,
      })
    }
  }

  for (const lesson of lessons) {
    const source = readFileSync(join(root, 'content/lessons', `${lesson.slug}.mdx`), 'utf8')
    const headings = [...source.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => lessonHeading(match[1]!))
    docs.push({
      href: `/learn/${lesson.slug}/`,
      kind: 'lesson',
      page: `${lesson.number} ${lesson.title}`,
      chapter: lesson.chapterNumber,
      heading: lesson.title,
      text: [lesson.objective, ...headings].join('. '),
    })
  }
  return docs
}
