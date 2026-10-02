/**
 * The course outline. Navigation, the overview page, previous/next links,
 * static route generation and progress tracking are all derived from this
 * list, so there is no second list to fall out of sync.
 */

interface LessonEntry {
  /** Stable identifier used for saved progress; never reuse or rename. */
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly objective: string
}

interface ChapterEntry {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly lessons: readonly LessonEntry[]
}

export const chapters = [
  {
    id: 'systems',
    title: 'Systems of linear equations',
    summary: 'What a linear system is, what its solution set can look like, and how to write it as a matrix.',
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
  },
  {
    id: 'reduction',
    title: 'Row reduction',
    summary: 'The three row operations, echelon forms, and the Gauss–Jordan algorithm that solves any linear system.',
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
  },
  {
    id: 'algebra',
    title: 'Matrix algebra',
    summary: 'Matrices as objects of their own: arithmetic, multiplication, transposes, and the spaces a matrix defines.',
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
      {
        id: 'alg-spaces',
        slug: 'rank-and-null-space',
        title: 'Rank, column space and null space',
        objective: 'Find the rank of a matrix and bases for its column space and null space from its RREF.',
      },
    ],
  },
  {
    id: 'inverses',
    title: 'Inverses',
    summary: 'When a matrix can be undone, how to find its inverse, and how inverses solve systems.',
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
  },
  {
    id: 'determinants',
    title: 'Determinants',
    summary: 'A single number that decides invertibility, how to compute it, and how it solves small systems.',
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
  },
] as const satisfies readonly ChapterEntry[]

type Chapters = typeof chapters
export type LessonSlug = Chapters[number]['lessons'][number]['slug']

export interface Lesson extends LessonEntry {
  readonly slug: LessonSlug
  readonly chapterId: string
  readonly chapterTitle: string
  readonly chapterNumber: number
  /** "2.3" style label, derived from the position in the outline. */
  readonly number: string
  readonly index: number
}

export const lessons: readonly Lesson[] = chapters.flatMap((chapter, c) =>
  chapter.lessons.map((lesson, l) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterNumber: c + 1,
    number: `${c + 1}.${l + 1}`,
    index: 0,
  })),
).map((lesson, index) => ({ ...lesson, index }))

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug)
}

export function neighbors(lesson: Lesson): { previous: Lesson | null; next: Lesson | null } {
  return { previous: lessons[lesson.index - 1] ?? null, next: lessons[lesson.index + 1] ?? null }
}

/** Serializable outline for client components (navigation, progress). */
export interface OutlineChapter {
  readonly id: string
  readonly number: number
  readonly title: string
  readonly lessons: readonly { readonly id: string; readonly slug: string; readonly title: string; readonly number: string }[]
}

export const outline: readonly OutlineChapter[] = chapters.map((chapter, c) => ({
  id: chapter.id,
  number: c + 1,
  title: chapter.title,
  lessons: lessons
    .filter((l) => l.chapterId === chapter.id)
    .map(({ id, slug, title, number }) => ({ id, slug, title, number })),
}))
