# Course content

How the course is stored, built and checked, and how to add or change a chapter. The status of the material that is currently in the course (what was supplied, what is missing, what has and has not been verified) is in [content-integration-report.md](content-integration-report.md).

## Where things live

| What | Where | Notes |
| --- | --- | --- |
| Lecture notes, one Markdown file per chapter | `chapters/NN-name.md` | **The only copy.** Nothing duplicates these files; the site reads them at build time. Edit them here. |
| The course registry | `content/lessons/catalog.ts` | Chapters, their order, titles, section labels, sources, routes, related tools and practice. Everything else is derived from it. |
| Interactive lessons (MDX) | `content/lessons/<slug>.mdx`, mapped in `content/lessons/bodies.ts` | Unchanged by the lecture notes; each belongs to a chapter in the registry. |
| Concept checks | `data/examples/concepts.ts` | Short questions migrated from the original site; see below. |
| Markdown pipeline | `lib/course/` | `markdown.ts` (parse and typeset), `notes.ts` (load from disk, check against the registry), `slug.ts`, `tex.ts`, `frontmatter.ts`, `search.ts`, `searchIndex.ts`. No React, no browser code. |
| Rendering | `components/learning/notes/` and `components/learning/NotesView.tsx` | Server Components; the page is built once, at export time. |
| KaTeX settings | `config/math.mjs` | One definition, used by the MDX lessons and the Markdown notes. |
| Source scans (optional) | `public/source-scans/<set>/<file>` | None are supplied; see [Source scans](#source-scans). |

## The registry

`content/lessons/catalog.ts` is a typed list of chapters. Each chapter has:

```ts
{
  id: 'determinants',                 // stable; used for the chapter's identity, never reused
  title: 'Determinants',              // short name for navigation and cards
  summary: '…',                       // one sentence for the overview and home page
  notes: {
    id: '05-determinants',            // equals the `id` in the file's frontmatter, and is the URL slug
    slug: '05-determinants',
    source: 'chapters/05-determinants.md',
    sectionLabel: '2.1',              // the label the document prints for itself; null if it has none
    intro: '…',                       // introductory context shown above the notes (no mathematics)
    verification: 'numbers-recomputed',   // or 'not-checked'; see Verification
    reviewNotes: ['…'],               // optional: disagreements found by verification
    labelNote: '…',                   // optional: explains an odd section label
    anchorAliases: { 'wrong-anchor': 'real-heading-id' },   // optional; see Anchors
  },
  lessons: [ /* interactive lessons, as before */ ],
  tools: [ { href, label, why } ],    // tools useful for this chapter, with the reason
  practice: [ { href, label, why } ], // existing practice material only
}
```

From that list the code derives the lesson and notes pages, the reading order (each chapter's notes, then its lessons), previous/next links, the sidebar, the overview and home pages, progress ids, `generateStaticParams`, and the search index. Types make a lesson without an MDX body a compile error, and `tests/unit/course-registry.test.ts` checks everything a type cannot: that every file in `chapters/` is registered exactly once, that slugs and progress ids are unique, and that the registry agrees with each file's frontmatter.

## Adding a chapter

1. Put the Markdown file in `chapters/`, named `NN-short-name.md` where `NN` is its position (`14-…`). It needs YAML frontmatter with at least `id` (the file name without `.md`), `title` and `order` (its position). The other keys the supplied files use (`course`, `source_ids`, `content_format`, …) are shown on the page as supplied; both frontmatter shapes found in the supplied files are understood.
2. Add an entry to `chapters` in `content/lessons/catalog.ts` as above. Put it where it belongs in the reading order; `order` in the file must equal its position in the list.
3. If the title starts with a number (`2.1 — Determinants`), set `sectionLabel` to that number exactly as printed. Do not "fix" labels; if two chapters print the same one, add a `labelNote` instead.
4. Write the `intro` from what the document covers. Do not claim more than the document contains.
5. List the tools and practice that really help, each with a reason; leave the arrays empty otherwise.
6. Run `npm run check`. A missing or unregistered file, a title that does not match its label, an unparseable formula, or a link to a heading that does not exist all fail here, naming the file.

To add an interactive lesson, add its MDX file and put an entry in the chapter's `lessons`, then add the import to `bodies.ts` (the compiler will insist).

## Updating a chapter

Replace the file in `chapters/` and rebuild. In `npm run dev` the file is re-read when it changes; reload the page.

Things that can fail, and what they mean:

- **A formula KaTeX cannot parse** fails the build (`strict` and `throwOnError` are on). Fix the formula in the Markdown.
- **"the link `#x` points at no heading"**: the document links to a heading that does not exist. Fix the link, or, if the source is wrong and cannot be edited, add an entry to `anchorAliases` (see below). The check also fails if an alias is no longer needed.
- **Frontmatter `id`, `order` or title disagree with the registry**: change whichever is wrong; they must agree.
- **`tests/unit/notes.test.ts` counts**: it asserts the total numbers of diagrams, tables and text drawings in the supplied chapters, and the number of source scans each ledger cites. If you change the content, update those counts deliberately.

## How routes and navigation are generated

There is one dynamic route, `app/learn/[slug]/page.tsx`. `generateStaticParams()` returns the slug of every page in the registry (lecture notes and lessons together) and `dynamicParams = false`, so every page is a static file (`/learn/05-determinants/index.html`) and anything else is a 404. A unit test guarantees the slugs never collide, and that none takes the slug of a page that has its own route (`search`).

| URL | Page |
| --- | --- |
| `/learn/` | Overview: every chapter with its notes and lessons, overall progress, search box |
| `/learn/<chapter id>/` | Lecture notes, for example `/learn/05-determinants/` |
| `/learn/<lesson slug>/` | Interactive lesson (unchanged URLs) |
| `/learn/search/?q=…` | Search results |
| `/practice/concepts/` | Concept checks |

The sidebar (`CourseNav`) is generated from `outline`, which is derived from the registry. It is a collapsed disclosure on phones and always open beside the page on wide screens (CSS only, using `::details-content`; where that is unsupported it stays an ordinary disclosure). On wide screens it scrolls inside itself and opens centred on the current page. A small inline script, `centerCurrentPage` written into the page, does that while the browser reads the HTML, so the list does not jump when React loads (a jump moves links from under the pointer and undoes scrolling the student has done); a client-side navigation, which makes a new sidebar, centres it before it is painted. Nothing moves the list once it is in place.

## How the Markdown is rendered

`parseNotes()` (`lib/course/markdown.ts`) runs one pipeline, `remark-parse` → `remark-frontmatter` → `remark-gfm` → `remark-math` → `remark-rehype` → `rehype-katex`, and reads headings, links and text from the same tree so the table of contents, the ids and the search text cannot disagree. It handles everything the supplied chapters use:

- **YAML frontmatter** is parsed and removed; it is never shown as text. Its source metadata appears in the "About these notes" panel exactly as supplied.
- **Headings** get stable ids (below), a hover-only `#` link, and entries in the "On this page" contents list (levels 2 and 3).
- **Mathematics**: inline `$…$` and display `$$…$$`, including matrices, systems, `array` with column rules, `aligned`, `\xrightarrow`, `\boxed`, `\operatorname`. KaTeX output includes MathML for screen readers. Display formulas scroll sideways inside their own box; inline formulas cannot wrap, so a paragraph or list item that holds one wider than the screen scrolls on its own (never the page).
- **Tables** (GFM) scroll sideways inside a focusable wrapper.
- **SVG diagrams** written as fenced `xml` blocks are shown as figures: through `<img>` with a `data:` URI (so they cannot run script), with the figure's own labels as the text alternative, and a little padding because the supplied drawings put their last labels on the edge of their viewBox.
- **Other fenced blocks** (the ASCII drawings in chapters 11 and 13) stay as preformatted text.
- **Raw HTML** in the Markdown (`<div align="center">` around the diagrams) is dropped; the figures are centred by the layout.
- **Section kinds.** The chapters mix teaching text with transcriptions of individual source versions, material reconciled from the earlier lessons, and an archival ledger. Top-level (`##`) sections are classified by their heading (`sectionKind()`): *source version* and *supplementary* sections carry a label and a coloured rule; the *source ledger* is shown collapsed, with a note saying whether the scans it cites exist. Nothing is removed or reordered.
- **Notes about the source** (`(Version 2 variant: …)`, `(In Version 2: …)`, `Source file: …`, `Source annotation: …`, and the remark on a handwritten note in chapter 11) are recognised by their wording (`isSourceNote()`) and set apart from the working with a rule and smaller type. They stay exactly where the source puts them.
- **Lesson file names** written as inline code (`row-operations.mdx`) link to that lesson.

### Anchors and aliases

Heading ids follow GitHub's algorithm (`github-slugger`), with the TeX of a math heading contributing its text after unwrapping `\command{…}`: `$\mathbb{R}^3$` gives `r3`, `$3 \times 4$` gives `3-times-4`. That is how the supplied chapters wrote their own in-document links (`#example-1-reducing-a-3-times-4-matrix-to-ref-and-rref`), and repeated headings are numbered `-1`, `-2`, … in document order. All of the supplied links resolve this way except one: chapter 2's ledger links to `#reduced-rref-form`, which is a bold line inside Example 5, not a heading. It is repaired with an explicit alias in the registry (`anchorAliases`), not by editing the Markdown.

Heading ids can start with a digit. That is valid in HTML and for `#fragment` links, but a CSS `#id` selector cannot express it; use `[id="…"]` in tests.

## Source scans

The chapters cite their original scans by path (`../assets/01-linear-systems-1/page-001-part-001.webp`, 314 files in all). The supplied material does not include them, so nothing links to them and every chapter says so. If the scans are ever supplied, put them in `public/source-scans/<set>/<file>` (for example `public/source-scans/01-linear-systems-1/page-001-part-001.webp`): the ledger links to each file that exists, the note on the page changes to say how many, and Next.js copies the folder into the export under the base path.

## Verification

The chapters are transcriptions integrated as supplied. `tests/unit/notes-math.test.ts` recomputes, with the exact rational engine in `lib/math`, the numerical results and key intermediate matrices of the worked examples and exercises in chapters 2–13: reduced forms and solution sets, products, inverses, determinants (including parameter cases), spanning and independence claims, bases and coordinates, ranks and nullities, eigenvectors and diagonalizations, kernels and ranges, norms, angles, projections, and orthogonal complements. It does not check every printed intermediate step, the proofs or the prose, and it cannot check a transcription against scans that are not here.

Each chapter says which of these applies (`verification` in the registry, shown on the page). Where the check disagrees with the printed text, the test states the correct value and shows the printed one failing, and the chapter carries a `reviewNotes` entry saying what is wrong and what is unaffected. Two exist today (chapters 9 and 10). To add one, write the test first, then the note; a unit test ties them together.

## Search

`/learn/search/` ranks, in the browser, an index built while the site is exported (`lib/course/searchIndex.ts`): every heading of every chapter with the text under it (source ledgers excluded), and each lesson's title, objective and section headings. Results link to the heading. It needs JavaScript and says so without it. The index is a few hundred kilobytes in that one page only; no other page pays for it.

## Concept checks

`data/examples/concepts.ts` holds 35 short questions migrated from the original site's practice bank and its subspace problems (`web/data/practice-bank.json`, `web/examples_vector.json`). The wording is verbatim. Two items changed (`sys_1`: its answer, the word "none", is asked as the number 0; `sys_4`: it described a "3×4 augmented matrix" with rank 3, which would give a unique solution, contradicting its own answer, so it now says a 3×4 coefficient matrix) and two were left out (`det_7`, `rank_5`: free-text answers that cannot be checked fairly). All of it is recorded on the items and tested.

## Progress and saved work

Progress is stored in `localStorage` under `linearlab:progress:v1` as a list of completed ids. No existing id changed: lessons keep theirs (`sys-intro`, …, `alg-spaces`), and each chapter's notes add `notes-<chapter id>`. Progress saved before the lecture notes existed keeps counting (a browser test seeds the old format and checks it). The totals are derived from the registry, so adding a chapter changes the denominator without touching saved data.

## Performance and static hosting

- Nothing needs a server at run time: pages, the search index and the registry are all produced by `next build`; the browser only reads static files. The base path comes from `LINEARLAB_BASE_PATH` as before, and `next/link` and `next/form` apply it themselves.
- A chapter is one to three megabytes of HTML (KaTeX markup plus MathML for every formula), roughly the same again in the page's data, and compresses well. To keep the sidebar from fetching all of that in the background, links to lecture notes are `prefetch={false}` (`PageLink`); lessons keep Next.js's default.
- Page weights and measured time to first interaction are in [content-integration-report.md](content-integration-report.md). The cost is the browser parsing and laying out KaTeX's markup; delivering the body as one static HTML block (so React does not hydrate it) was tried and gained only 5–15%, so chapters are rendered as ordinary React elements.
