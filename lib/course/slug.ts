import GithubSlugger from 'github-slugger'

/**
 * Heading ids for the lecture notes follow GitHub's algorithm (github-slugger), because the supplied
 * chapters link to their own headings with GitHub-style anchors, for example
 * `#example-1-reducing-a-3-times-4-matrix-to-ref-and-rref`, and repeated headings are numbered
 * `-1`, `-2`, ... in document order.
 *
 * Mathematics inside a heading contributes its TeX source with every `\command{` unwrapped, which is
 * how those anchors were written: `$3 \times 4$` becomes "3 times 4" and `$\mathbb{R}^3$` becomes
 * "r3". Checked against every anchor in the supplied chapters by tests/unit/notes.test.ts.
 */
export function texForSlug(tex: string): string {
  return tex.replace(/\\[A-Za-z]+(?=\{)/g, '')
}

/** A slugger for one document: call it once per heading, in document order. */
export function createSlugger(): (text: string) => string {
  const slugger = new GithubSlugger()
  return (text) => slugger.slug(text)
}
