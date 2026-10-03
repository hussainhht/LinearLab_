/**
 * Turns one lecture-notes Markdown file into everything the site needs, in a single pass:
 * the typeset document, stable heading ids, the table of contents, searchable text, the links the
 * document makes to itself, and the source scans it cites.
 *
 * Pure: no React, no file access. It runs at build time (or in tests); nothing here ships to the
 * browser. Mathematics is rendered by KaTeX with the shared options in config/math.mjs, so a
 * formula KaTeX cannot parse fails the build instead of showing students raw LaTeX.
 */
import type { Element, ElementContent, Root as HastRoot, RootContent as HastRootContent } from 'hast'
import type { Nodes, Root as MdastRoot, RootContent } from 'mdast'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { katexOptions } from '@/config/math.mjs'
import { type NotesFrontmatter, parseFrontmatter } from './frontmatter'
import { createSlugger, texForSlug } from './slug'
import { plainTex } from './tex'

/**
 * How a top-level section relates to the lecture itself. The supplied chapters mix the teaching
 * text with transcriptions of individual source versions, material reconciled from the earlier
 * LinearLab lessons, and an archival ledger of source scans; the page labels each so they are not
 * mistaken for one another.
 */
export type SectionKind = 'core' | 'source-version' | 'supplementary' | 'ledger'

export function sectionKind(heading: string): SectionKind {
  if (/archival source reference|verification ledger|source verification appendix/i.test(heading)) return 'ledger'
  if (/complete source transcription/i.test(heading)) return 'source-version'
  if (/supplementary course insights|reconciled content/i.test(heading)) return 'supplementary'
  return 'core'
}

export interface NotesHeading {
  readonly id: string
  readonly depth: number
  /** Plain text; mathematics appears as its TeX source (the text the id was made from). */
  readonly text: string
}

export interface TocEntry {
  readonly id: string
  readonly depth: 2 | 3
  readonly kind: SectionKind
  /** The heading's typeset content (KaTeX already applied), for rendering inside a link. */
  readonly content: readonly ElementContent[]
}

/** The text under one heading, for search. Source ledgers are left out: they are references, not teaching. */
export interface NotesBlock {
  readonly id: string
  readonly heading: string
  readonly depth: number
  readonly kind: SectionKind
  readonly text: string
}

export interface NotesStats {
  readonly headings: number
  readonly displayMath: number
  readonly inlineMath: number
  readonly tables: number
  /** SVG figures written as fenced `xml` blocks, shown as images. */
  readonly diagrams: number
  /** Other fenced blocks (text drawings), shown verbatim. */
  readonly textBlocks: number
  /** Paragraphs that are notes about the source rather than the mathematics (see isSourceNote). */
  readonly sourceNotes: number
}

export interface ParsedNotes {
  readonly frontmatter: NotesFrontmatter
  /** Plain text of the document's own title (its single level-1 heading). */
  readonly title: string
  readonly headings: readonly NotesHeading[]
  readonly toc: readonly TocEntry[]
  readonly blocks: readonly NotesBlock[]
  /** Every in-document link target ("#anchor" without the "#"), as written. */
  readonly internalLinks: readonly string[]
  /** Source scans cited as inline code, as written (for example `../assets/01-x-1/page-001-part-001.webp`). */
  readonly scans: readonly string[]
  readonly stats: NotesStats
  /** The document body: title removed, split into top-level sections. */
  readonly hast: HastRoot
}

/** A path into the scans folder, as the chapters write it: `../assets/<set>/<file>` or `assets/<set>/<file>`. */
export const SCAN_PATTERN = /^(?:\.\.\/|\.\/)?assets\/([^/\s]+)\/([^/\s]+\.(?:webp|png|jpe?g|gif))$/

const parser = unified().use(remarkParse).use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMath)
const typesetter = unified().use(remarkRehype).use(rehypeKatex, katexOptions)
/** Same document structure without KaTeX: for callers that only need headings, links and text. */
const plainTypesetter = unified().use(remarkRehype)

function isElement(node: HastRootContent | ElementContent): node is Element {
  return node.type === 'element'
}

/** Text of a heading: for ids, math contributes its TeX with `\\cmd{` unwrapped; for display, readable text. */
function textOf(node: Nodes, mode: 'id' | 'plain'): string {
  switch (node.type) {
    case 'inlineMath':
      return mode === 'id' ? texForSlug(node.value) : plainTex(node.value)
    case 'math':
    case 'code':
    case 'html':
    case 'yaml':
    case 'thematicBreak':
      return ''
    default:
      if ('value' in node && typeof node.value === 'string') return node.value
      if ('children' in node) return (node.children as Nodes[]).map((child) => textOf(child, mode)).join(mode === 'id' ? '' : ' ')
      return ''
  }
}

/** Search text: inline math becomes readable text, display math and code are left out. */
function searchTextOf(node: Nodes): string {
  switch (node.type) {
    case 'inlineMath':
      return ` ${plainTex(node.value)} `
    case 'math':
    case 'code':
    case 'html':
    case 'yaml':
    case 'thematicBreak':
      return ' '
    default:
      if ('value' in node && typeof node.value === 'string') return node.value
      if ('children' in node) return ` ${(node.children as Nodes[]).map(searchTextOf).join(' ')} `
      return ' '
  }
}

const collapse = (text: string) => text.replace(/\s+/g, ' ').trim()

function elementText(node: ElementContent | HastRootContent): string {
  if (node.type === 'text') return node.value
  if (node.type === 'element') return node.children.map(elementText).join('')
  return ''
}

/** Plain text of the fenced block inside a `<pre>`, or null when it is not one. */
export function preText(pre: Element): string | null {
  const code = pre.children.find((child): child is Element => isElement(child) && child.tagName === 'code')
  return code ? elementText(code).replace(/\n$/, '') : null
}

export function isSvgSource(text: string): boolean {
  return /^<svg[\s>]/.test(text.trim()) && /<\/svg>\s*$/.test(text.trim())
}

/**
 * A paragraph that is about the source rather than the mathematics: where a transcribed version differs
 * ("(Version 2 variant: …)", "(In Version 2: …)"), which file a version is ("Source file: …"), an annotation
 * ("Source annotation: …") or a remark on a handwritten note. They stay where the source puts them and are
 * marked so the page can set them apart from the working.
 */
export function isSourceNote(paragraph: string): boolean {
  return /^\(\s*(?:In |For )?Version \d|^\(Note: In the handwritten note|^Source (?:file|annotation):/.test(paragraph.trim())
}

/** Wraps everything from each level-2 heading to the next one in a `<section>` that records its kind. */
function wrapSections(children: HastRootContent[]): HastRootContent[] {
  const result: HastRootContent[] = []
  let section: Element | null = null
  for (const node of children) {
    if (isElement(node) && node.tagName === 'h2') {
      const id = String(node.properties.id ?? '')
      section = {
        type: 'element',
        tagName: 'section',
        properties: { dataKind: sectionKind(elementText(node)), dataSection: id },
        children: [node],
      }
      result.push(section)
    } else if (section) {
      section.children.push(node as ElementContent)
    } else {
      result.push(node)
    }
  }
  // The source separates sections with `---`; the layout already does, so a rule that merely ends a section goes.
  const dropTrailingRule = (list: { type: string; tagName?: string }[]) => {
    for (let i = list.length - 1; i >= 0; i--) {
      const last = list[i]!
      if (last.type === 'text') continue
      if (last.type === 'element' && last.tagName === 'hr') list.splice(i, 1)
      break
    }
  }
  for (const node of result) if (isElement(node) && node.tagName === 'section') dropTrailingRule(node.children)
  dropTrailingRule(result)
  return result
}

export interface ParseOptions {
  /** Typeset the mathematics (the slow part). Search indexing and structural checks pass false. */
  readonly render?: boolean
}

export async function parseNotes(source: string, file: string, { render = true }: ParseOptions = {}): Promise<ParsedNotes> {
  const tree = parser.parse(source) as MdastRoot
  const yamlNode = tree.children.find((node) => (node.type as string) === 'yaml') as { value: string } | undefined
  if (!yamlNode) throw new Error(`${file}: the file has no YAML frontmatter`)
  const frontmatter = parseFrontmatter(yamlNode.value, file)
  tree.children = tree.children.filter((node) => (node.type as string) !== 'yaml')

  // Ids, headings and search blocks come from one walk so they cannot disagree.
  const slug = createSlugger()
  const headings: NotesHeading[] = []
  const blocks: NotesBlock[] = []
  const stats = { headings: 0, displayMath: 0, inlineMath: 0, tables: 0, diagrams: 0, textBlocks: 0, sourceNotes: 0 }
  let kind: SectionKind = 'core'
  let block: { heading: NotesHeading; kind: SectionKind; parts: string[] } | null = null
  const flush = () => {
    if (block && block.kind !== 'ledger') {
      const text = collapse(block.parts.join(' '))
      blocks.push({ id: block.heading.id, heading: collapse(block.heading.text), depth: block.heading.depth, kind: block.kind, text })
    }
    block = null
  }
  for (const node of tree.children as RootContent[]) {
    if (node.type === 'heading') {
      flush()
      const heading: NotesHeading = { id: slug(textOf(node, 'id')), depth: node.depth, text: collapse(textOf(node, 'plain')) }
      // remark-rehype copies hProperties onto the element, so the id reaches the HTML without a rehype plugin.
      const data = (node.data ??= {}) as { hProperties?: Record<string, unknown> }
      data.hProperties = { ...data.hProperties, id: heading.id }
      headings.push(heading)
      if (node.depth === 1) kind = 'core'
      else if (node.depth === 2) kind = sectionKind(heading.text)
      block = { heading, kind, parts: [] }
    } else if (block) {
      block.parts.push(searchTextOf(node))
    }
  }
  flush()
  stats.headings = headings.length

  const internalLinks: string[] = []
  const scans = new Set<string>()
  visit(tree, (node) => {
    if (node.type === 'link' && node.url.startsWith('#')) internalLinks.push(decodeURIComponent(node.url.slice(1)))
    else if (node.type === 'inlineCode' && SCAN_PATTERN.test(node.value)) scans.add(node.value)
    else if (node.type === 'math') stats.displayMath++
    else if (node.type === 'inlineMath') stats.inlineMath++
    else if (node.type === 'table') stats.tables++
    else if (node.type === 'code') {
      if (isSvgSource(node.value)) stats.diagrams++
      else stats.textBlocks++
    }
  })

  const hast = render ? ((await typesetter.run(tree)) as HastRoot) : ((await plainTypesetter.run(tree)) as HastRoot)

  // The document's own title is the page heading, so it leaves the body.
  const titleIndex = hast.children.findIndex((node) => isElement(node) && node.tagName === 'h1')
  if (titleIndex < 0) throw new Error(`${file}: the document has no level-1 heading`)
  const titleElement = hast.children[titleIndex] as Element
  if (hast.children.some((node, i) => i !== titleIndex && isElement(node) && node.tagName === 'h1')) {
    throw new Error(`${file}: the document has more than one level-1 heading`)
  }
  hast.children.splice(titleIndex, 1)
  const body: HastRoot = { type: 'root', children: wrapSections(hast.children) }
  let sourceNotes = 0
  visit(body, 'element', (node) => {
    if (node.tagName === 'p' && isSourceNote(elementText(node))) {
      node.properties.dataNote = 'source'
      sourceNotes++
    }
  })

  const toc: TocEntry[] = []
  let tocKind: SectionKind = 'core'
  visit(body, 'element', (node) => {
    if (node.tagName !== 'h2' && node.tagName !== 'h3') return
    const id = String(node.properties.id ?? '')
    if (node.tagName === 'h2') tocKind = sectionKind(elementText(node))
    toc.push({ id, depth: node.tagName === 'h2' ? 2 : 3, kind: tocKind, content: node.children })
  })

  return {
    frontmatter,
    title: collapse(elementText(titleElement)),
    headings,
    toc,
    blocks,
    internalLinks,
    scans: [...scans],
    stats: { ...stats, sourceNotes },
    hast: body,
  }
}
