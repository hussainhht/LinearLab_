/**
 * Loads a chapter's lecture notes from chapters/ at build time and checks it against the registry
 * (content/lessons/catalog.ts). Used by Server Components while `next build` prerenders the site and
 * by tests; nothing here runs in the browser, and nothing needs a server at runtime.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { basePath } from '@/config/deployment.mjs'
import { type Notes, notes as registeredNotes } from '@/content/lessons/catalog'
import { type ParsedNotes, SCAN_PATTERN, parseNotes } from './markdown'

export const CHAPTERS_DIR = 'chapters'
/** Where scanned source pages go, if they are ever added: public/source-scans/<set>/<file>. */
export const SCANS_DIR = 'public/source-scans'

const root = () => process.cwd()

/** The Markdown files in chapters/, as file names. */
export function chapterFiles(): string[] {
  return readdirSync(join(root(), CHAPTERS_DIR))
    .filter((name) => name.endsWith('.md'))
    .sort()
}

/**
 * Everything that must hold between a chapter file and its registry entry. Returned as messages so a
 * test can show all of them at once and the build can refuse to continue on any.
 */
export function registryProblems(parsed: ParsedNotes, entry: Notes): string[] {
  const problems: string[] = []
  const where = entry.source
  const { frontmatter } = parsed
  if (frontmatter.id !== entry.id) problems.push(`${where}: frontmatter id "${frontmatter.id}" is not the registered id "${entry.id}"`)
  if (frontmatter.order !== entry.chapterNumber) {
    problems.push(`${where}: frontmatter order ${frontmatter.order} is not the chapter's position ${entry.chapterNumber}`)
  }
  if (entry.sectionLabel !== null) {
    if (!frontmatter.title.startsWith(entry.sectionLabel)) {
      problems.push(`${where}: frontmatter title "${frontmatter.title}" does not start with the registered section label "${entry.sectionLabel}"`)
    }
    if (!parsed.title.startsWith(entry.sectionLabel)) {
      problems.push(`${where}: the document heading "${parsed.title}" does not start with the registered section label "${entry.sectionLabel}"`)
    }
  } else if (/^\d/.test(frontmatter.title) || /^\d/.test(parsed.title)) {
    problems.push(`${where}: the title starts with a number but the registry gives no section label`)
  }

  const ids = new Set(parsed.headings.map((heading) => heading.id))
  const aliases = entry.anchorAliases ?? {}
  const used = new Set<string>()
  for (const link of parsed.internalLinks) {
    if (ids.has(link)) continue
    const target = aliases[link]
    if (target === undefined) problems.push(`${where}: the link "#${link}" points at no heading and has no alias`)
    else used.add(link)
  }
  for (const [from, target] of Object.entries(aliases)) {
    if (ids.has(from)) problems.push(`${where}: the alias "${from}" is unnecessary, that heading exists`)
    else if (!used.has(from)) problems.push(`${where}: the alias "${from}" is not used by any link`)
    if (!ids.has(target)) problems.push(`${where}: the alias "${from}" points at "${target}", which is not a heading`)
  }
  return problems
}

const cache = new Map<string, { stamp: string; parsed: Promise<ParsedNotes> }>()

/**
 * Parses a chapter, once per build process (and again in `next dev` whenever the file changes).
 * Throws, naming the file, when the document and the registry disagree or KaTeX cannot parse a formula.
 */
export function loadNotes(entry: Notes): Promise<ParsedNotes> {
  const path = join(root(), entry.source)
  const info = statSync(path)
  const stamp = `${info.mtimeMs}:${info.size}`
  const cached = cache.get(path)
  if (cached?.stamp === stamp) return cached.parsed

  const parsed = parseNotes(readFileSync(path, 'utf8'), entry.source).then((result) => {
    const problems = registryProblems(result, entry)
    if (problems.length > 0) throw new Error(`Lecture notes do not match the course registry:\n${problems.join('\n')}`)
    return result
  })
  cache.set(path, { stamp, parsed })
  return parsed
}

/** The registered chapter for every file, so a missing or unregistered file is reported once. */
export function registeredSources(): string[] {
  return registeredNotes.map((entry) => entry.source)
}

/**
 * The public URL of a source scan the chapters cite (`../assets/<set>/<file>`), or null when that file
 * is not in this repository. Scans are not part of the supplied material; if they are added under
 * public/source-scans/, the ledger links to them automatically. `root` is the project folder (tests pass a temporary one).
 */
export function scanHref(reference: string, root: string = process.cwd()): string | null {
  const match = SCAN_PATTERN.exec(reference)
  if (!match) return null
  const [, set, file] = match
  return existsSync(join(root, SCANS_DIR, set!, file!)) ? `${basePath}/source-scans/${set}/${file}` : null
}

/** One sentence on whether the scans a chapter cites are available, shown with its source ledger. */
export function ledgerNote(scans: readonly string[], root: string = process.cwd()): string {
  const available = scans.filter((scan) => scanHref(scan, root) !== null).length
  if (scans.length === 0) return ''
  if (available === 0) {
    return 'The scanned pages this section cites are not included in this repository, so the file names below do not link to anything. The transcription is shown as supplied; this site has not been able to check it against the scans.'
  }
  return `${available} of the ${scans.length} scan files cited by path here are included in this repository and linked below; the rest are not available.`
}
