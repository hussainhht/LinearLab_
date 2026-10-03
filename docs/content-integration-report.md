# Content integration report

What was supplied, where each part now lives on the site, what state it is in, and what is not done or not known. Written when the thirteen chapters in `chapters/` were integrated (2026-10-03). The working tree is uncommitted. How the course is built and extended is in [course-content.md](course-content.md).

## Summary

- **13 of 13 supplied chapters are integrated**, each at `/learn/<id>/`, typeset in full from `chapters/` at build time, reachable from the course overview, the sidebar, previous/next links and search, and counted by progress tracking.
- **No other course documents were found.** There are no exam or revision documents, no indexes and no image assets anywhere in the repository or in any branch's history. The scans the chapters cite (314 files) are not in the repository.
- **The 22 existing lessons, the tools, practice and saved progress are kept.** No URL and no progress id changed. One lesson moved to a different chapter and was renumbered.
- **From the original site's legacy folder**, the practice bank and subspace problems were reviewed and migrated as 35 concept checks (two items changed, two left out, all recorded). Nothing else there is course content.
- **The mathematics is not fully verified.** The numerical results of the worked examples and exercises in chapters 2–13 were recomputed independently; two printed errors were found and are shown on their chapter pages. Proofs, prose, every printed intermediate step and chapter 1 were not checked, and no transcription could be compared with its scans.

## 1. Source-to-route coverage

Every file in `chapters/`. "Section label" is exactly what the document prints; the page heading is the document's own title. "Content" is what the Markdown contains and what the page therefore shows: display formulas / inline formulas, tables, SVG diagrams, text drawings. Status for all thirteen: **integrated in full** (checked by `tests/unit/notes.test.ts` and `tests/export/export.test.ts`: every heading, formula, table and diagram of the source is on the exported page, the last section included, with no raw LaTeX).

| # | Source file | Route | Section label | Document title (page heading) | Content | Other structure |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `chapters/01-linear-systems.md` | `/learn/01-linear-systems/` | 1.1 | 1.1 — Systems of Linear Equations | 37 / 54, 2 tables, 1 diagram | Two source-version transcriptions, a supplementary section, a ledger of 13 scans |
| 2 | `chapters/02-gauss-jordan.md` | `/learn/02-gauss-jordan/` | 1.2 | 1.2 — Gaussian and Gauss–Jordan Elimination | 49 / 100, 2 tables | Supplementary section, ledger of 30 scans, one repaired link |
| 3 | `chapters/03-matrix-operations.md` | `/learn/03-matrix-operations/` | 1.3 | 1.3 — Matrix Operations | 38 / 222, 3 tables, 1 diagram | Supplementary section, ledger of 33 scans |
| 4 | `chapters/04-matrix-inverses.md` | `/learn/04-matrix-inverses/` | 1.4 | 1.4 — Inverses of Matrices | 56 / 154, 1 table, 1 diagram | Supplementary section, ledger of 23 scans |
| 5 | `chapters/05-determinants.md` | `/learn/05-determinants/` | 2.1 | 2.1 — Determinants | 37 / 116, 1 table, 1 diagram | Supplementary section, ledger of 24 scans |
| 6 | `chapters/06-vector-spaces-subspaces.md` | `/learn/06-vector-spaces-subspaces/` | 4.1–4.2 | 4.1–4.2 — Vector Spaces and Subspaces | 23 / 231, 1 table, 2 diagrams | Ledger of 43 scans (three source versions) |
| 7 | `chapters/07-linear-independence.md` | `/learn/07-linear-independence/` | 4.3 | 4.3 — Linear Independence | 36 / 167, 1 table | Ledger of 21 scans |
| 8 | `chapters/08-bases-dimensions.md` | `/learn/08-bases-dimensions/` | 4.4–4.5 | 4.4–4.5 — Bases and Dimensions | 28 / 206, 1 table, 1 diagram | Ledger of 23 scans |
| 9 | `chapters/09-fundamental-spaces.md` | `/learn/09-fundamental-spaces/` | 4.7–4.8 | 4.7–4.8 — Fundamental Spaces of a Matrix | 75 / 215 | Appendix citing 27 scans by range; **review note** |
| 10 | `chapters/10-eigenvalues-diagonalization.md` | `/learn/10-eigenvalues-diagonalization/` | 5.1–5.2 | 5.1–5.2 — Eigenvalues and Diagonalization | 61 / 205 | Appendix citing 22 scans by range; **review note** |
| 11 | `chapters/11-linear-transformations.md` | `/learn/11-linear-transformations/` | 8.1–8.2 | 8.1–8.2 — Linear Transformations | 67 / 185, 3 text drawings | Appendix citing 30 scans by range; seven inline notes on "Version 2" |
| 12 | `chapters/12-dot-product.md` | `/learn/12-dot-product/` | 1.2 *(as supplied; see below)* | 1.2 — The Dot Product, Norm, and Orthogonality | 75 / 196 | Appendix citing 11 scans by range |
| 13 | `chapters/13-orthogonality.md` | `/learn/13-orthogonality/` | none | Orthogonality in R^n — Orthogonal Sets, Bases, Matrices, and Complements | 61 / 219, 1 text drawing | Appendix citing 14 scans by range |

Totals: 2,913 formulas (643 display, 2,270 inline), 12 tables, 7 SVG diagrams, 4 text drawings, 7,094 source lines. The order is the file numbering `01`–`13`, which equals the frontmatter `order` and the position in the registry.

What the integration did not change: the Markdown files. They are byte-for-byte as supplied; every correction, alias and note lives in the registry or in code.

## 2. Everything else that was looked at

| Item | Where | Decision |
| --- | --- | --- |
| Exam or revision documents | nowhere | **None exist** in the working tree or in any local or remote branch (the names of every file in the history of every branch were searched for exam, revision, past-paper, quiz, midterm, final, asset, `.webp` and `.pdf`; the working tree was searched for images, PDFs and Office files). The ledgers' "(root)", "(Test1)" and "(Test2)" appear to name the folders the scanned handouts came from; they are not exam documents. Nothing was invented to fill the gap. |
| Index or table-of-contents documents | nowhere | None supplied. The course overview, sidebar and per-chapter contents list are generated from the registry and the headings. |
| Image assets (`../assets/…`, `assets/…`) | nowhere | **Not supplied.** See [section 3](#3-source-scans). |
| 22 interactive lessons (`content/lessons/*.mdx`) | kept | Unchanged, cross-linked both ways with their chapter's notes. Nothing was removed as a duplicate: they teach the same topics in a different form, with interactive checks and tool links the notes do not have. |
| `web/data/practice-bank.json` (32 questions) | migrated | 30 kept as concept checks (one answer adapted, one question corrected), 2 left out (free-text answers). Wording is verbatim. |
| `web/examples_vector.json`: `practiceProblems` (5) | migrated | All five, as the subspaces concept checks. |
| `web/examples_vector.json`: `equationExamples` (7), `vectorExamples` (7) | not migrated | They are inputs of the original vector-space analyzer, a tool that is not in the app and was not rebuilt; the subject is covered by chapters 6–9. |
| `web/js/*`, `web/style/*`, `web/temp/*.html` | not migrated | The original site's implementation and slides. The rebuilt lessons replaced them and corrected their errors (README lists them). Importing them would reintroduce those errors. |
| `nots/*.md` (11 files, one empty) | not migrated | Development notes about the original site's features, not course content. |
| `../LinearLab_pre-clean-backup/` (outside the repository) | not used | Git bundles and logs from an earlier cleanup. |
| `docs/screenshots/` | kept, two added | `notes.png`, `notes-mobile.png`. |

## 3. Source scans

Each chapter cites its scans by path and says how many there are: a ledger table of one row per scan in chapters 1–8 (210 files), and an appendix naming the first and last file of each range in chapters 9–13 (104 more). None of the 314 files is in the repository.

What the site does about it: every chapter's ledger is kept, in full, collapsed at the end of the chapter, with a note saying the cited scans are not included and the transcription could not be checked against them. The file names are plain text (they do not link to anything). The chapter's "About these notes" panel says the same. If the scans are supplied under `public/source-scans/<set>/<file>`, the ledger links to each file that exists, the note changes to report how many, and the export includes them under the base path; that path is tested with a temporary folder of stand-in files, but no real scan has been through it.

## 4. Findings about the supplied material

1. **Two printed errors**, found by recomputation and shown on the chapter pages as review notes. The text is not edited.
   - Chapter 9, "Basis of C(A) for a 4×6 matrix": the echelon matrix A′ is printed with +3 in row 1, column 2; row 1 of A is (1, −3, 4, −2, 5, 4) and the operations used leave it unchanged, so it should be −3. The pivot columns (1, 3, 5) and the basis {c₁, c₃, c₅} are right.
   - Chapter 10, diagonalization with eigenvalues 1, 2, −2: the eigenvector for λ = −2 is (−1/4, −3/4, 1) (the text correctly gives (−1, −3, 4) for z = 4), but for z = 1 it prints (−1/4, 3/4, 1) and uses that as the third column of P. With the printed column, P⁻¹AP is not D.
2. **One in-document link points at nothing.** Chapter 2's ledger links to `#reduced-rref-form`, which is a bold line inside Example 5, not a heading. It is repaired with an explicit alias to the Example 5 heading (a test fails if the alias becomes unnecessary or its target disappears). The other 209 of the 210 in-document links resolve.
3. **Section labels.** Chapter 12 prints "1.2", the same label as chapter 2; the registry keeps both as printed and says why on chapter 12's page. Chapter 13 prints none. The labels present are 1.1–1.4, 2.1, 4.1–4.2, 4.3, 4.4–4.5, 4.7–4.8, 5.1–5.2, 8.1–8.2: nothing labelled 3.x, 4.6, 6.x or 7.x was supplied.
4. **Source metadata is inconsistent**, and is shown as supplied rather than corrected. Chapter 4's frontmatter lists chapter 3's source ids under `source_ids` but chapter 2's under `transcribed_source_ids`, and its ledger uses chapter 2's. The same two identifiers (`1_howvee-…`, `1n8MA2s…`) appear in the ledgers of chapters 2, 4 and 5 against three different pairs of PDF names. Chapters 1–8 use `transcribed_source_ids` and `editable_transcription`; chapters 9–13 use `transcribed_source_id` (one comma-separated string) and `transcribed_source_parts`. Both shapes are read.
5. **The chapters claim to be complete.** `content_format` is `complete_transcription` (with archival references in chapters 1–8) and `source_coverage` is "all pages of every listed source version". No chapter contains an uncertainty marker ("unclear", "illegible", "TODO" and similar were searched for). This is what the files say; the site cannot confirm it without the scans.
6. **Source versions.** Chapter 1 transcribes two versions in sections of their own; chapters 2, 5 and 11 note where a second version differs ("Version 2 formulation", "(Version 2 variant: …)", seven notes in chapter 11); chapter 6 lists three versions in its metadata and ledger but presents one text. All of it is kept; sections and notes about the source are labelled and set apart from the working.
7. **SVG diagrams are written as fenced `xml` code, not as images.** They are drawn as figures. Their last labels sit on the edge of their viewBox, so a little padding is added when drawing.

## 5. What changed for existing visitors and data

- **URLs.** None removed or renamed. `/learn/<lesson slug>/` all work. New: `/learn/<chapter id>/` (13), `/learn/search/`, `/practice/concepts/`.
- **Progress.** Storage key and format are unchanged; no migration is needed or performed. Lesson ids are the same, including `alg-spaces`. Each chapter's notes add `notes-<id>`. Progress saved before this work still counts (browser test).
- **The rank and null space lesson** keeps its URL and id but now sits in chapter 9 (Fundamental spaces) and is numbered 9.1, not 3.6. Matrix algebra has five lessons instead of six.
- **Wording.** "N of 22 lessons complete" became "N of 35 chapters and lessons complete"; the home page counts are derived from the registry; "Start the course" opens chapter 1's lecture notes.
- **Sidebar.** Lists all thirteen chapters; collapsed on phones, open beside the page on wide screens.
- **Dependencies added** (most were already installed through MDX; they are now declared): `unified`, `remark-parse`, `remark-rehype`, `remark-frontmatter`, `hast-util-to-jsx-runtime`, `unist-util-visit`, `github-slugger`, `yaml`, and the type packages `@types/hast` and `@types/mdast`. `npm audit` reports the same 5 high-severity advisories before and after (the first listed is in `braces`, a development-tool dependency); none comes from these packages, and they were not touched.
- **KaTeX settings** moved to `config/math.mjs` (same values) so the lessons and the notes cannot diverge.
- **An existing browser test was made reliable.** Two assertions read the solver's inputs immediately after the URL changed, before the page had applied them; under load they failed intermittently. They now poll.
- **A defect in this work's sidebar was found through an intermittent test failure, and fixed.** The sidebar scrolls inside itself on wide screens, and the first version re-centred it on the current page when React finished loading. That undid any scrolling a student had done in the meantime and moved links from under the pointer: in the failing test, Playwright scrolled the list to reach a chapter's link, React finished loading, the list jumped back, and the click landed between two links. In an experiment on a device six times slower than this machine, scrolling the list to a link and clicking it within 0.15 s of the page loading (a lesson), 0.3 s (chapter 5) or 0.6 s (chapter 9) did not follow the link; at every delay tried, from 0 ms to 4 s, it now does. The sidebar is now centred by a small inline script as the browser reads the HTML, before the first paint, and nothing moves it again once React has loaded; a sidebar made by a client-side navigation is centred before it is painted. Two browser tests cover this (centred before React has loaded; not moved, including after the student scrolled it, when React loads), an export test runs the script from every built page, and the navigation test now waits for the page to load fully and checks that it never loaded a new document. Both browser tests fail when the script, or the "leave it alone" rule, is removed.

## 6. Validation

All run on this working tree, at the root and under the GitHub Pages sub-path `/LinearLab_`.

| Check | Root | `/LinearLab_` |
| --- | --- | --- |
| `npm run typecheck` | pass | (same code) |
| `npm run lint` | pass | (same code) |
| `npm test` (11 files) | 289 tests pass | (same code) |
| `npm run build` | static export, 57 pages | 57 pages |
| `npm run verify:export` | 63 checks pass | 63 checks pass |
| `npm run test:e2e` (desktop and phone) | 152 tests pass | 152 tests pass |

What those cover, against the brief:

1. **All 13 files integrated**: the registry test (every file registered once, in order, matching its frontmatter), the export test (every route exists), the browser test (every chapter loads directly and shows its title).
2. **Every other discovered document accounted for**: section 2 above; the concept-check test accounts for all 37 legacy questions.
3. **Reachable from the interface**: the sidebar lists all 13 in order (browser test), the overview lists every chapter and lesson, previous/next walk the whole reading order (unit test).
4. **Every URL loads directly, and refreshes**: browser tests load all 13 chapters, all lessons, search, the concept checks and every tool, then reload; the export test lists exactly the expected routes.
5. **Final section reached**: the last heading of each Markdown file is on the exported page and in its contents list (unit, export and browser tests); a deliberately broken renderer that drops the last section is caught by seven tests.
6. **Mathematics typeset**: the formula count on each page equals the formula count in the Markdown; no `katex-error`, no `$`, no raw `\begin`/`\frac`/`\mathbb` in the text a reader sees; matrices, systems, aligned derivations, `\xrightarrow`, `\boxed` and the rest render (KaTeX with `strict` and `throwOnError` on; all 2,913 formulas pass).
7. **Tables, diagrams, local links**: 12 tables, 7 diagrams and 4 text drawings are all on the pages; no SVG source is shown as code; every in-page link and every contents entry leads to an element on the page; ids are unique on every page.
8. **Old content and tools**: all 78 browser tests that existed before still pass, including the lessons' checks, tools and practice, with only the edits listed in section 5 (counts, two polled assertions, longer route lists); every lesson URL is loaded.
9. **Progress and saved work**: marking, reset, remembered completion, counts, and the old storage format (browser tests).
10. **Mobile and desktop**: no horizontal page scroll on any chapter at phone width (browser test) and at 320, 360, 412 and 768 px (swept by hand); wide formulas, tables and diagrams scroll inside their own boxes; the sidebar and contents list collapse; text, links, labels and tables keep WCAG AA contrast in both themes (browser test); the pages were also read by eye, in both themes, at desktop and phone size. A check over every paragraph and list item that holds a formula (1,061 of them) found no painted pixel outside its box, so the local scrolling cuts nothing off.
11. **Static export succeeds** at both base paths, with every root-relative URL under the base path and resolving to a file, search and the form action prefixed correctly, and no request outside the base path or failing.

Stability: the whole browser suite ran five times in a row at each base path, and the sidebar and navigation tests ran ten times over with twelve parallel workers at each, with no failure.

Also checked by hand: `next dev` serves every new route and re-reads an edited chapter on reload (the edit was reverted and the file confirmed identical).

### What the numerical verification covered

`tests/unit/notes-math.test.ts` (67 tests): in chapters 2–13, reduced forms and solution sets (including the parameter cases), products and inverses (including each inverse worked in chapter 4), determinants, linear combinations, spanning and independence, bases and coordinates, ranks and nullities, eigenvectors and diagonalizations with Aⁿ, kernels and ranges, norms, angles, projections, orthogonal sets and complements, plus the chapter 3 size-compatibility exercises and classification drill and the chapter 2 REF/RREF table. It found the two errors in section 4. Not covered: printed intermediate steps (only key ones), proofs, prose, chapter 1.

### Page weights (root build)

| Page | HTML | gzip |
| --- | --- | --- |
| `01-linear-systems` | 1,232 KB | 73 KB |
| `02-gauss-jordan` | 2,364 KB | 117 KB |
| `03-matrix-operations` | 2,469 KB | 127 KB |
| `04-matrix-inverses` | 2,459 KB | 121 KB |
| `05-determinants` | 1,831 KB | 96 KB |
| `06-vector-spaces-subspaces` | 2,112 KB | 121 KB |
| `07-linear-independence` | 1,881 KB | 104 KB |
| `08-bases-dimensions` | 1,899 KB | 109 KB |
| `09-fundamental-spaces` | 2,836 KB | 147 KB |
| `10-eigenvalues-diagonalization` | 2,253 KB | 118 KB |
| `11-linear-transformations` | 2,167 KB | 120 KB |
| `12-dot-product` | 2,485 KB | 157 KB |
| `13-orthogonality` | 2,760 KB | 153 KB |

Time until the page responds to a first tap (served from localhost, so no network time; the CPU throttling is Chrome's, standing in for slower devices):

| Page | normal CPU | 4× slower | 6× slower |
| --- | --- | --- | --- |
| Interactive lesson | 0.39 s | 1.1 s | 1.7 s |
| Chapter 1 notes (smallest) | 0.62 s | 2.1 s | 3.1 s |
| Chapter 5 notes | 0.77 s | 2.5 s | 3.8 s |
| Chapter 9 notes (largest) | 0.87 s | 3.4 s | 5.6 s |

The text is on screen before that, because the HTML is complete; the wait is the browser parsing and laying out KaTeX's dense markup, not React: a prototype that delivered the same chapter 9 body as one static HTML block (so React skips it) was only 5–15% faster, so it was not adopted.

For comparison, an interactive lesson is 281 KB (21 KB gzipped), the search page 211 KB (46 KB), the course overview 90 KB (13 KB). The whole export is about 98 MB, mostly the per-page data files Next.js writes beside each page. The weight is KaTeX's markup plus MathML for every formula (kept for screen readers); it is paid once per chapter opened, because links to chapters do not prefetch.

## 7. Not done, not known, and worth doing next

- **Compare the transcriptions with the scans.** The scans are not here, so nothing could be checked against them, and 314 files are cited. This is the main open question about correctness.
- **Decide the two review notes.** Fix the source Markdown (chapter 9, one sign; chapter 10, one vector); then delete the notes and update the two tests. Likewise decide what chapter 12's label should be.
- **Verify what is not verified**: chapter 1, the printed intermediate steps, and the proofs.
- **No exam or revision material exists** because none was supplied; if it arrives it can go in as chapters or as a new section of the practice area. Questions should be entered by hand, not parsed from mathematical notation.
- **Interactive lessons exist for the first five chapters and the rank lesson.** Chapters 6–13 have lecture notes, tool links, and concept checks only where questions covered the topic. Chapter 12 has neither tool nor practice links, because nothing existing fits.
- **Search covers lessons by title, objective and section headings**, not their full text, and needs JavaScript.
- **Not built**: a scroll-position indicator in the contents list, a print stylesheet for the notes, and a port of the original site's vector-space analyzer.
- **Page size and speed.** Opening a chapter costs two to three times a lesson, about 3 s to first interaction for the largest on a phone four times slower than this machine. If that needs to improve, the levers are splitting a chapter into one page per section, or `content-visibility: auto` on sections (which skips layout for what is off screen, at some cost to anchor jumps); dropping MathML would halve the markup but remove the screen-reader rendering of every formula.
