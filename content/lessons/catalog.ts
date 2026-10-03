/**
 * The course outline: the one registry the whole course is built from. Navigation, the overview
 * page, previous/next links, static route generation, search and progress tracking are all derived
 * from this list, so there is no second list to fall out of sync.
 *
 * Each chapter has two kinds of page:
 *  - its lecture notes, a Markdown file in chapters/ rendered at build time (lib/course), and
 *  - zero or more interactive lessons, MDX files in this directory (see bodies.ts).
 * Both live at /learn/<slug>/ and share one namespace of slugs; a unit test keeps them unique.
 *
 * Adding or changing a chapter is described in docs/course-content.md.
 */
import type { TOOLS } from '@/components/tools/catalog'

/** An interactive lesson (MDX in this directory). */
interface LessonEntry {
  /** Stable identifier used for saved progress; never reuse or rename. */
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly objective: string
}

/** A pointer to a tool that is useful for this chapter, with the reason, so the link teaches something. */
interface ToolLink {
  readonly href: (typeof TOOLS)[number]['href']
  readonly label: string
  readonly why: string
}

/** A pointer to existing practice material. Only material that exists is listed; nothing is made up to fill a chapter. */
interface PracticeLink {
  /** /practice/, /practice/<problem id>/ or /practice/concepts/#<topic> (each checked against the data by a test). */
  readonly href: string
  readonly label: string
  readonly why: string
}

/** The lecture notes of a chapter: one Markdown file in chapters/. */
interface NotesEntry {
  /** Equal to the `id` in the file's frontmatter (checked at build time). Also the slug: the notes live at /learn/<id>/. */
  readonly id: string
  readonly slug: string
  /** Repository-relative path. chapters/ is the single place these files live; nothing copies them elsewhere. */
  readonly source: string
  /** The section number the document prints for itself ("2.1", "4.1–4.2"), exactly as supplied; null when it has none. */
  readonly sectionLabel: string | null
  /** A note on the label above, shown with the sources, when the supplied label needs explaining. */
  readonly labelNote?: string
  /** Introductory context shown above the notes. Describes what the document covers; adds no mathematics. */
  readonly intro: string
  /**
   * What this site has independently checked in the chapter's mathematics:
   *  - 'numbers-recomputed': the numerical results of the worked examples and exercises, and their key
   *    intermediate matrices, were recomputed with exact arithmetic (tests/unit/notes-math.test.ts). Every
   *    printed intermediate step, the proofs and the prose were not checked.
   *  - 'not-checked': nothing was recomputed (the chapter states definitions and conversions, not computed results).
   * Neither says anything about whether the transcription matches the original scans, which are not available.
   */
  readonly verification: 'numbers-recomputed' | 'not-checked'
  /**
   * Disagreements found by that checking, each demonstrated by a test in tests/unit/notes-math.test.ts.
   * The Markdown itself is never edited; these are shown with the chapter's sources.
   */
  readonly reviewNotes?: readonly string[]
  /**
   * In-document links that the source writes to headings that do not exist, mapped to the heading the
   * link evidently means. The Markdown is left exactly as supplied; a test fails if an alias is
   * unnecessary or its target is missing.
   */
  readonly anchorAliases?: Readonly<Record<string, string>>
}

interface ChapterEntry {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly notes: NotesEntry
  readonly lessons: readonly LessonEntry[]
  readonly tools: readonly ToolLink[]
  readonly practice: readonly PracticeLink[]
}

const SOLVER = '/tools/rref/' as const
const MATRICES = '/tools/matrices/' as const
const DETERMINANT = '/tools/determinant/' as const
const CRAMER = '/tools/cramer/' as const

export const chapters = [
  {
    id: 'systems',
    title: 'Systems of linear equations',
    summary: 'What a linear system is, what its solution set can look like, and how to write it as a matrix.',
    notes: {
      id: '01-linear-systems',
      slug: '01-linear-systems',
      source: 'chapters/01-linear-systems.md',
      sectionLabel: '1.1',
      intro:
        'The general form of a linear system, how to tell a linear equation from a nonlinear one, the three possible kinds of solution set, homogeneous systems, and the coefficient and augmented matrices, with the two-variable case drawn as lines. The lecture handout exists in two source versions, and both are transcribed in full.',
      verification: 'not-checked',
    },
    lessons: [
      {
        id: 'sys-intro',
        slug: 'linear-systems',
        title: 'Linear equations and systems',
        objective: 'Recognize linear equations and describe a system by its numbers of equations and variables.',
      },
      {
        id: 'sys-solutions',
        slug: 'solution-sets',
        title: 'Solution sets and their geometry',
        objective: 'Classify a system as having one solution, infinitely many, or none, and picture each case as lines.',
      },
      {
        id: 'sys-homogeneous',
        slug: 'homogeneous-systems',
        title: 'Homogeneous systems',
        objective: 'Explain why Ax = 0 is always consistent and predict when it has nontrivial solutions.',
      },
      {
        id: 'sys-augmented',
        slug: 'augmented-matrices',
        title: 'Coefficient and augmented matrices',
        objective: 'Translate between a system of equations and its augmented matrix in both directions.',
      },
    ],
    tools: [
      {
        href: SOLVER,
        label: 'System solver',
        why: 'Enter any system, or one from the notes, and see it classified as one solution, infinitely many, or none.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#systems',
        label: 'Concept checks: systems and ranks',
        why: 'Short questions on what the ranks of A and [A | b] say about the solutions of a system.',
      },
    ],
  },
  {
    id: 'reduction',
    title: 'Row reduction',
    summary: 'The three row operations, echelon forms, and the Gauss–Jordan algorithm that solves any linear system.',
    notes: {
      id: '02-gauss-jordan',
      slug: '02-gauss-jordan',
      source: 'chapters/02-gauss-jordan.md',
      sectionLabel: '1.2',
      intro:
        'Row-echelon and reduced row-echelon form, the three elementary row operations, and the Gaussian and Gauss–Jordan algorithms, followed by six worked examples with every row operation shown: reducing a matrix, a unique solution, an inconsistent system, systems with one and with two free parameters, and a system that depends on a parameter.',
      verification: 'numbers-recomputed',
      anchorAliases: {
        // The ledger links to "#reduced-rref-form", but that text is a bold line inside Example 5, not a heading.
        'reduced-rref-form': 'example-5-underdetermined-system-with-2-free-parameters',
      },
    },
    lessons: [
      {
        id: 'red-row-ops',
        slug: 'row-operations',
        title: 'Elementary row operations',
        objective: 'Apply swaps, scalings and replacements, and explain why none of them changes the solution set.',
      },
      {
        id: 'red-echelon',
        slug: 'echelon-forms',
        title: 'Row echelon and reduced row echelon form',
        objective: 'Decide whether a matrix is in row echelon form, reduced row echelon form, or neither.',
      },
      {
        id: 'red-gauss-jordan',
        slug: 'gauss-jordan-elimination',
        title: 'Gauss–Jordan elimination',
        objective: 'Carry out Gauss–Jordan elimination on an augmented matrix and read off a unique solution.',
      },
      {
        id: 'red-general',
        slug: 'general-solutions',
        title: 'Free variables and general solutions',
        objective: 'Identify pivot and free variables, write a general solution, and recognize an inconsistent row.',
      },
    ],
    tools: [
      {
        href: SOLVER,
        label: 'System solver',
        why: 'Watch every row operation of a Gauss–Jordan elimination, with the reason for each step.',
      },
    ],
    practice: [
      {
        href: '/practice/',
        label: 'Practice row reduction',
        why: 'Choose each row operation yourself and get feedback and hints; any valid route to the reduced form counts.',
      },
          {
        href: '/practice/concepts/#row-reduction',
        label: 'Concept checks: row reduction',
        why: 'Short questions on the elementary row operations and the shape of an echelon form.',
      },
],
  },
  {
    id: 'algebra',
    title: 'Matrix algebra',
    summary: 'Matrices as objects of their own: arithmetic, multiplication and transposes.',
    notes: {
      id: '03-matrix-operations',
      slug: '03-matrix-operations',
      source: 'chapters/03-matrix-operations.md',
      sectionLabel: '1.3',
      intro:
        'Matrix notation and the special types (row, column, square, identity, diagonal, triangular, zero), equality, addition, scalar multiples, multiplication, transpose and trace, the algebraic rules each operation obeys, and five worked exercises.',
      verification: 'numbers-recomputed',
    },
    lessons: [
      {
        id: 'alg-basics',
        slug: 'matrix-basics',
        title: 'Matrices, notation and equality',
        objective: 'Name the size and entries of a matrix and decide when two matrices are equal.',
      },
      {
        id: 'alg-add-scale',
        slug: 'addition-and-scalar-multiplication',
        title: 'Addition, subtraction and scalar multiples',
        objective: 'Add, subtract and scale matrices, and use the properties these operations share with numbers.',
      },
      {
        id: 'alg-multiply',
        slug: 'matrix-multiplication',
        title: 'Matrix multiplication',
        objective: 'Decide when AB is defined, predict its size, and compute each entry as a row-times-column sum.',
      },
      {
        id: 'alg-mult-props',
        slug: 'multiplication-properties',
        title: 'Properties of multiplication',
        objective: 'Use the rules that matrix multiplication obeys, and avoid the ones it breaks.',
      },
      {
        id: 'alg-transpose',
        slug: 'transpose-and-special-matrices',
        title: 'Transposes and special matrices',
        objective: 'Transpose a matrix, apply the transpose rules, and recognize common special matrices.',
      },
    ],
    tools: [
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'Add, scale, transpose and multiply matrices, with a walkthrough that fills the product entry by entry.',
      },
    ],
    practice: [],
  },
  {
    id: 'inverses',
    title: 'Inverses',
    summary: 'When a matrix can be undone, how to find its inverse, and how inverses solve systems.',
    notes: {
      id: '04-matrix-inverses',
      slug: '04-matrix-inverses',
      source: 'chapters/04-matrix-inverses.md',
      sectionLabel: '1.4',
      intro:
        'Invertible and singular matrices, the 2×2 inverse formula, the algebraic rules for inverses, finding an inverse by Gauss–Jordan elimination, solving systems with an inverse, consistency conditions when the coefficient matrix is singular, and the Invertible Matrix Theorem.',
      verification: 'numbers-recomputed',
    },
    lessons: [
      {
        id: 'inv-meaning',
        slug: 'matrix-inverse',
        title: 'What an inverse is',
        objective: 'State the definition of an inverse and verify a proposed inverse by multiplication.',
      },
      {
        id: 'inv-2x2',
        slug: 'inverse-2x2',
        title: 'Inverting a 2×2 matrix',
        objective: 'Use ad − bc to decide invertibility and the 2×2 formula to write the inverse.',
      },
      {
        id: 'inv-gauss-jordan',
        slug: 'inverse-by-row-reduction',
        title: 'Inverses by row reduction',
        objective: 'Find A⁻¹ by reducing [A | I] to [I | A⁻¹], or show that A has no inverse.',
      },
      {
        id: 'inv-properties',
        slug: 'inverse-properties',
        title: 'Properties of inverses',
        objective: 'Apply the inverse rules, including (AB)⁻¹ = B⁻¹A⁻¹, to simplify and solve matrix equations.',
      },
      {
        id: 'inv-systems',
        slug: 'invertibility-and-systems',
        title: 'Inverses and linear systems',
        objective: 'Solve AX = B as X = A⁻¹B and connect invertibility to the solutions of a system.',
      },
    ],
    tools: [
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'Invert a matrix through [A | I] → [I | A⁻¹] and see A·A⁻¹ and A⁻¹·A actually multiplied out.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#inverses',
        label: 'Concept checks: inverses',
        why: 'Short questions on when an inverse exists, the rules for inverses and finding one.',
      },
    ],
  },
  {
    id: 'determinants',
    title: 'Determinants',
    summary: 'A single number that decides invertibility, how to compute it, and how it solves small systems.',
    notes: {
      id: '05-determinants',
      slug: '05-determinants',
      source: 'chapters/05-determinants.md',
      sectionLabel: '2.1',
      intro:
        'Determinants of 2×2 and 3×3 matrices, cofactor expansion along a row or column, Sarrus’ rule, a 4×4 example, the algebraic properties of determinants, and six exercises including parameter problems and the circulant determinant.',
      verification: 'numbers-recomputed',
    },
    lessons: [
      {
        id: 'det-compute',
        slug: 'determinants',
        title: 'Computing determinants',
        objective: 'Compute 2×2 and 3×3 determinants by formula and cofactor expansion.',
      },
      {
        id: 'det-properties',
        slug: 'determinant-properties',
        title: 'Properties of determinants',
        objective: 'Predict how row operations, products and transposes change a determinant.',
      },
      {
        id: 'det-cramer',
        slug: 'cramers-rule',
        title: 'Cramer’s rule',
        objective: 'Solve a square system with determinants and explain when the method cannot be used.',
      },
    ],
    tools: [
      {
        href: DETERMINANT,
        label: 'Determinant calculators',
        why: 'Work out 2×2 and 3×3 determinants the way you would on paper, by formula, cofactors and the diagonal rule.',
      },
      {
        href: CRAMER,
        label: 'Cramer’s rule',
        why: 'Solve small systems with determinants, and see why the rule fails when det(A) = 0.',
      },
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'Compute a determinant of any size up to 6×6 by elimination, with the effect of each row swap.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#determinants',
        label: 'Concept checks: determinants',
        why: 'Short questions on how determinants behave under row operations, scaling and products.',
      },
    ],
  },
  {
    id: 'vector-spaces',
    title: 'Vector spaces and subspaces',
    summary: 'The axioms of a vector space, the standard examples, subspaces, linear combinations and spanning sets.',
    notes: {
      id: '06-vector-spaces-subspaces',
      slug: '06-vector-spaces-subspaces',
      source: 'chapters/06-vector-spaces-subspaces.md',
      sectionLabel: '4.1–4.2',
      intro:
        'The ten axioms of a real vector space, the standard examples (matrices, ℝⁿ, polynomials, functions), the subspace test with worked examples and counterexamples, linear combinations, and spanning sets. The lecture handout exists in three source versions, all transcribed.',
      verification: 'numbers-recomputed',
    },
    lessons: [],
    tools: [
      {
        href: SOLVER,
        label: 'System solver',
        why: 'Asking whether a vector is a linear combination of others is a linear system: enter the vectors as columns and solve.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#subspaces',
        label: 'Concept checks: subspaces',
        why: 'Subspace tests on a plane, two axes and a set of matrices, with the reasoning shown.',
      },
    ],
  },
  {
    id: 'independence',
    title: 'Linear independence',
    summary: 'Independent and dependent sets, how to test them, and the theorems that follow.',
    notes: {
      id: '07-linear-independence',
      slug: '07-linear-independence',
      source: 'chapters/07-linear-independence.md',
      sectionLabel: '4.3',
      intro:
        'Linearly independent and dependent sets, testing them with a linear system, with a determinant when the number of vectors matches the dimension, and with the Wronskian for functions, the basic theorems with proofs, and two proof exercises.',
      verification: 'numbers-recomputed',
    },
    lessons: [],
    tools: [
      {
        href: SOLVER,
        label: 'System solver',
        why: 'A set is dependent exactly when the homogeneous system has a nontrivial solution; row reduce it and look for a free variable.',
      },
      {
        href: DETERMINANT,
        label: 'Determinant calculators',
        why: 'For n vectors in ℝⁿ, the determinant criterion needs a 2×2 or 3×3 determinant.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#subspaces',
        label: 'Concept checks: dependent vectors',
        why: 'A set of three vectors to decide on, with the dependency relation worked out.',
      },
    ],
  },
  {
    id: 'bases',
    title: 'Bases and dimension',
    summary: 'Bases, dimension, coordinates relative to a basis, and how many vectors a basis can have.',
    notes: {
      id: '08-bases-dimensions',
      slug: '08-bases-dimensions',
      source: 'chapters/08-bases-dimensions.md',
      sectionLabel: '4.4–4.5',
      intro:
        'Bases and standard bases, the dimension of a vector space and of subspaces, the theorems comparing the size of a set with the dimension, coordinates relative to a basis, the Minus Theorem, and why the function space is infinite-dimensional.',
      verification: 'numbers-recomputed',
    },
    lessons: [],
    tools: [
      {
        href: SOLVER,
        label: 'System solver',
        why: 'Coordinates relative to a basis are the solution of a linear system; the solver finds them exactly.',
      },
      {
        href: DETERMINANT,
        label: 'Determinant calculators',
        why: 'When the number of vectors equals the dimension, a nonzero determinant shows the set is a basis.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#subspaces',
        label: 'Concept checks: dimension',
        why: 'Finding the dimension of a subspace of ℝ⁴ defined by two equations.',
      },
    ],
  },
  {
    id: 'fundamental-spaces',
    title: 'Fundamental spaces of a matrix',
    summary: 'Null space, row space and column space, rank and nullity, and the Rank–Nullity Theorem.',
    notes: {
      id: '09-fundamental-spaces',
      slug: '09-fundamental-spaces',
      source: 'chapters/09-fundamental-spaces.md',
      sectionLabel: '4.7–4.8',
      intro:
        'The null space, row space and column space of a matrix and how to find a basis for each from an echelon form, rank and nullity, the Rank–Nullity Theorem and the other rules for rank, parameter-dependent rank problems, and applications to spanning sets.',
      verification: 'numbers-recomputed',
      reviewNotes: [
        'In the example “Basis of C(A) for a 4×6 matrix”, the echelon matrix A′ is printed with +3 in row 1, column 2. Row 1 of A is (1, −3, 4, −2, 5, 4) and the row operations used do not change it, so that entry should be −3. The pivot columns (1, 3, 5) and the basis {c₁, c₃, c₅} given there are correct.',
      ],
    },
    lessons: [
      {
        id: 'alg-spaces',
        slug: 'rank-and-null-space',
        title: 'Rank, column space and null space',
        objective: 'Find the rank of a matrix and bases for its column space and null space from its RREF.',
      },
    ],
    tools: [
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'The “Rank and spaces” operation gives the rank and bases for the column space and null space of any matrix, with the null-space vectors checked against A·v = 0.',
      },
      {
        href: SOLVER,
        label: 'System solver',
        why: 'Reduce a matrix to RREF to read off pivot columns and free variables.',
      },
    ],
    practice: [
      {
        href: '/practice/concepts/#rank',
        label: 'Concept checks: rank and nullity',
        why: 'Short questions on rank, the rank–nullity theorem and what full rank means.',
      },
    ],
  },
  {
    id: 'eigen',
    title: 'Eigenvalues and diagonalization',
    summary: 'Eigenvalues, eigenvectors and eigenspaces, the characteristic polynomial, and diagonalizing a matrix.',
    notes: {
      id: '10-eigenvalues-diagonalization',
      slug: '10-eigenvalues-diagonalization',
      source: 'chapters/10-eigenvalues-diagonalization.md',
      sectionLabel: '5.1–5.2',
      intro:
        'Eigenvalues, eigenvectors, the characteristic polynomial and eigenspaces, properties such as the eigenvalues of a triangular matrix and of powers, diagonalization P⁻¹AP = D, the role of algebraic and geometric multiplicity, and computing powers Aⁿ.',
      verification: 'numbers-recomputed',
      reviewNotes: [
        'In the example with eigenvalues 1, 2 and −2, the eigenvector for λ = −2 is correctly found as x = −z/4, y = −3z/4, and the text gives (−1, −3, 4) for z = 4. But for z = 1 it prints (−1/4, 3/4, 1), and the third column of P uses that vector. The vector is (−1/4, −3/4, 1); with the printed column, P⁻¹AP is not D.',
      ],
    },
    lessons: [],
    tools: [
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'For a given eigenvalue λ, enter λI − A and compute its null space to get the eigenspace; invert P to compute P⁻¹AP or Aⁿ.',
      },
    ],
    practice: [],
  },
  {
    id: 'transformations',
    title: 'Linear transformations',
    summary: 'Linear maps between vector spaces, their kernel and range, and the Rank–Nullity Theorem for maps.',
    notes: {
      id: '11-linear-transformations',
      slug: '11-linear-transformations',
      source: 'chapters/11-linear-transformations.md',
      sectionLabel: '8.1–8.2',
      intro:
        'The definition of a linear transformation and how to verify it, its basic properties, how a transformation is determined by its values on a basis, the kernel and range with nullity and rank, and the Rank–Nullity Theorem for linear transformations.',
      verification: 'numbers-recomputed',
    },
    lessons: [],
    tools: [
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'For a map T(x) = Ax, the kernel is the null space of A and the range is its column space; “Rank and spaces” computes both.',
      },
    ],
    practice: [],
  },
  {
    id: 'dot-product',
    title: 'The dot product',
    summary: 'Dot product, norm, angle and distance in ℝⁿ, the Cauchy–Schwarz inequality, and orthogonal projections.',
    notes: {
      id: '12-dot-product',
      slug: '12-dot-product',
      source: 'chapters/12-dot-product.md',
      sectionLabel: '1.2',
      labelNote:
        'The supplied document labels this section 1.2, which is also the label of the Gaussian and Gauss–Jordan elimination chapter. The label is shown as supplied; the course position (chapter 12) is what distinguishes them here.',
      intro:
        'The dot product and its properties, the norm, the Cauchy–Schwarz and triangle inequalities, unit vectors, distance, the angle between vectors, orthogonality and the Pythagorean theorem, orthogonal projections, and a set of textbook and review exercises with solutions.',
      verification: 'numbers-recomputed',
    },
    lessons: [],
    tools: [],
    practice: [],
  },
  {
    id: 'orthogonality',
    title: 'Orthogonality',
    summary: 'Orthogonal and orthonormal bases, orthogonal matrices, and orthogonal complements.',
    notes: {
      id: '13-orthogonality',
      slug: '13-orthogonality',
      source: 'chapters/13-orthogonality.md',
      sectionLabel: null,
      intro:
        'Orthogonal sets and why they are independent, orthogonal and orthonormal bases and coordinates relative to them, orthogonal matrices and their characterization, the orthogonal complement of a subspace, and the theorem R(A)^⊥ = N(A).',
      verification: 'numbers-recomputed',
    },
    lessons: [],
    tools: [
      {
        href: MATRICES,
        label: 'Matrix operations',
        why: 'To find W^⊥ for a subspace spanned by given vectors, put them in the rows of A and compute the null space; multiplying AᵀA tests whether A is orthogonal.',
      },
    ],
    practice: [],
  },
] as const satisfies readonly ChapterEntry[]

type Chapters = typeof chapters
export type LessonSlug = Chapters[number]['lessons'][number]['slug']
export type NotesSlug = Chapters[number]['notes']['slug']

interface Placement {
  readonly chapterId: string
  readonly chapterTitle: string
  readonly chapterNumber: number
}

export interface Lesson extends LessonEntry, Placement {
  readonly kind: 'lesson'
  readonly slug: LessonSlug
  /** "2.3" style label: the chapter's number and the lesson's position in it. */
  readonly number: string
  /** Position among all interactive lessons. */
  readonly index: number
}

export interface Notes extends NotesEntry, Placement {
  readonly kind: 'notes'
  readonly slug: NotesSlug
  /** The chapter's title (the document prints its own title, which is shown as the page heading). */
  readonly title: string
  /** Key under which "marked complete" is stored. */
  readonly progressId: string
}

/** Any page under /learn/<slug>/. */
export type CoursePage = Lesson | Notes

export interface Chapter {
  readonly id: string
  readonly number: number
  readonly title: string
  readonly summary: string
  readonly notes: Notes
  readonly lessons: readonly Lesson[]
  readonly tools: readonly ToolLink[]
  readonly practice: readonly PracticeLink[]
}

export const notesProgressId = (notesId: string) => `notes-${notesId}`

const placement = (chapter: Chapters[number], c: number): Placement => ({
  chapterId: chapter.id,
  chapterTitle: chapter.title,
  chapterNumber: c + 1,
})

/** Every interactive lesson, in course order. */
export const lessons: readonly Lesson[] = chapters
  .flatMap((chapter, c) =>
    chapter.lessons.map((lesson, l) => ({
      ...lesson,
      ...placement(chapter, c),
      kind: 'lesson' as const,
      number: `${c + 1}.${l + 1}`,
      index: 0,
    })),
  )
  .map((lesson, index) => ({ ...lesson, index }))

/** Every chapter's lecture notes, in course order. */
export const notes: readonly Notes[] = chapters.map((chapter, c) => ({
  ...chapter.notes,
  ...placement(chapter, c),
  kind: 'notes' as const,
  title: chapter.title,
  progressId: notesProgressId(chapter.notes.id),
}))

/** The chapters with their pages resolved. */
export const chapterList: readonly Chapter[] = chapters.map((chapter, c) => ({
  id: chapter.id,
  number: c + 1,
  title: chapter.title,
  summary: chapter.summary,
  notes: notes[c]!,
  lessons: lessons.filter((lesson) => lesson.chapterId === chapter.id),
  tools: chapter.tools,
  practice: chapter.practice,
}))

/** Reading order: each chapter's lecture notes, then its interactive lessons. */
export const pages: readonly CoursePage[] = chapterList.flatMap((chapter) => [chapter.notes, ...chapter.lessons])

/** Everything that can be marked complete. */
export const progressIds: readonly string[] = pages.map((page) => (page.kind === 'notes' ? page.progressId : page.id))

export const pageHref = (page: { readonly slug: string }) => `/learn/${page.slug}/`

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug)
}

export function findNotes(slug: string): Notes | undefined {
  return notes.find((n) => n.slug === slug)
}

export function findPage(slug: string): CoursePage | undefined {
  return pages.find((p) => p.slug === slug)
}

export function neighbors(page: CoursePage): { previous: CoursePage | null; next: CoursePage | null } {
  const at = pages.indexOf(page)
  return { previous: pages[at - 1] ?? null, next: pages[at + 1] ?? null }
}

/** Serializable outline for client components (navigation, progress). */
export interface OutlineItem {
  readonly kind: 'notes' | 'lesson'
  /** The key under which completion is stored. */
  readonly id: string
  readonly slug: string
  readonly title: string
  /** "2.3" for lessons; notes have none (they are the chapter's own page). */
  readonly number: string | null
}

export interface OutlineChapter {
  readonly id: string
  readonly number: number
  readonly title: string
  readonly items: readonly OutlineItem[]
}

export const outline: readonly OutlineChapter[] = chapterList.map((chapter) => ({
  id: chapter.id,
  number: chapter.number,
  title: chapter.title,
  items: [
    { kind: 'notes', id: chapter.notes.progressId, slug: chapter.notes.slug, title: 'Lecture notes', number: null },
    ...chapter.lessons.map(({ id, slug, title, number }) => ({ kind: 'lesson' as const, id, slug, title, number })),
  ],
}))
