/**
 * Concept checks: short questions on the ideas behind the tools and chapters.
 *
 * They come from the original static site (web/data/practice-bank.json and the practice problems in
 * web/examples_vector.json), which is not part of the app. The wording is the original's, verbatim.
 * Every item was reviewed before it was kept: the answers are re-derived independently in
 * tests/unit/concepts.test.ts, and each change is recorded on the item (`change`) and in
 * `droppedLegacyItems`. Nothing here was written to fill a gap.
 */

export type ConceptTopic = 'systems' | 'row-reduction' | 'determinants' | 'inverses' | 'rank' | 'subspaces'

interface ConceptBase {
  /** Stable id on this site. */
  readonly id: string
  readonly topic: ConceptTopic
  readonly question: string
  readonly explanation: string
  /** Where it came from: the id in web/data/practice-bank.json, or "vector-N" for web/examples_vector.json. */
  readonly legacyId: string
  /** What was changed from the original, if anything. */
  readonly change?: { readonly kind: 'corrected' | 'adapted'; readonly note: string }
}

export interface ChoiceConcept extends ConceptBase {
  readonly kind: 'choice'
  readonly choices: readonly string[]
  /** Index of the correct choice. */
  readonly answer: number
}

export interface NumberConcept extends ConceptBase {
  readonly kind: 'number'
  /** Short name shown before the "=" of the answer box. */
  readonly label: string
  /** Compared exactly as a fraction, so 1/5 and 0.2 are the same answer. */
  readonly answer: string
}

export type ConceptCheck = ChoiceConcept | NumberConcept

export const conceptTopics: readonly { readonly id: ConceptTopic; readonly title: string; readonly description: string }[] = [
  { id: 'systems', title: 'Systems and ranks', description: 'What the ranks of A and [A | b] say about the solutions of a system.' },
  { id: 'row-reduction', title: 'Row reduction', description: 'Elementary row operations and the shape of an echelon form.' },
  { id: 'determinants', title: 'Determinants', description: 'How determinants behave under row operations, scaling and products.' },
  { id: 'inverses', title: 'Inverses', description: 'When an inverse exists, the rules for inverses, and how to find one.' },
  { id: 'rank', title: 'Rank and nullity', description: 'Rank, the rank–nullity theorem and what full rank means.' },
  { id: 'subspaces', title: 'Subspaces, independence and dimension', description: 'Subspace tests, dependent vectors and dimension, with the reasoning shown.' },
]

export const conceptChecks: readonly ConceptCheck[] = [
  {
    id: 'systems-1',
    legacyId: 'sys_1',
    topic: 'systems',
    kind: 'number',
    label: 'solutions',
    question: 'For a system with augmented matrix [A|b], if rank(A) = 2, rank([A|b]) = 3, and there are 3 variables, how many solutions exist?',
    answer: '0',
    explanation: 'rank(A) < rank([A|b]) means the system is inconsistent, so there are no solutions.',
    change: { kind: 'adapted', note: 'The original expected the word “none”; it is asked as a number (0) so that it can be checked exactly.' },
  },
  {
    id: 'systems-2',
    legacyId: 'sys_2',
    topic: 'systems',
    kind: 'choice',
    question: 'A consistent system with rank(A) = rank([A|b]) = 3 and 3 variables has:',
    choices: ['Exactly one unique solution', 'Infinitely many solutions', 'No solution', 'Cannot determine'],
    answer: 0,
    explanation: 'When rank equals the number of variables, the system has a unique solution.',
  },
  {
    id: 'systems-3',
    legacyId: 'sys_3',
    topic: 'systems',
    kind: 'number',
    label: 'free variables',
    question: 'For a system with rank(A) = rank([A|b]) = 2 and 4 variables, how many free variables are there?',
    answer: '2',
    explanation: 'Free variables = n - rank(A) = 4 - 2 = 2.',
  },
  {
    id: 'systems-4',
    legacyId: 'sys_4',
    topic: 'systems',
    kind: 'choice',
    question: 'If the coefficient matrix A is 3×4 and rank(A) = rank([A|b]) = 3, the system has:',
    choices: ['Infinitely many solutions (1 free variable)', 'No solution', 'Unique solution', 'Exactly 3 solutions'],
    answer: 0,
    explanation: 'rank(A) = rank([A|b]) < n (3 < 4), so the system has infinite solutions with n - r = 1 free variable.',
    change: {
      kind: 'corrected',
      note: 'The original said “a 3×4 augmented matrix has rank 3 for both A and [A|b]”. A 3×4 [A|b] has a 3×3 coefficient matrix A, whose rank 3 would give a unique solution and contradict the answer given. The intended A is 3×4, as asked here.',
    },
  },
  {
    id: 'systems-5',
    legacyId: 'sys_5',
    topic: 'systems',
    kind: 'number',
    label: 'solutions',
    question: 'A homogeneous system Ax = 0 always has at least how many solutions?',
    answer: '1',
    explanation: 'The zero vector x = 0 is always a solution (trivial solution).',
  },
  {
    id: 'systems-6',
    legacyId: 'sys_6',
    topic: 'systems',
    kind: 'choice',
    question: 'Which statement guarantees infinitely many solutions?',
    choices: ['rank(A) = rank([A|b]) < n', 'rank(A) < rank([A|b])', 'rank(A) = n', 'The matrix is square'],
    answer: 0,
    explanation: 'When rank(A) = rank([A|b]) < n, there are free variables, leading to infinite solutions.',
  },
  {
    id: 'row-reduction-1',
    legacyId: 'gj_1',
    topic: 'row-reduction',
    kind: 'choice',
    question: 'In Reduced Row Echelon Form (RREF), a pivot column must:',
    choices: ['Contain exactly one 1 (pivot) and all other entries are 0', 'Have any non-zero pivot', 'Contain two pivots', 'Be all zeros'],
    answer: 0,
    explanation: 'RREF requires pivot = 1 and all other entries in that column must be 0.',
  },
  {
    id: 'row-reduction-2',
    legacyId: 'gj_2',
    topic: 'row-reduction',
    kind: 'number',
    label: 'types',
    question: 'How many elementary row operations are there in Gaussian elimination?',
    answer: '3',
    explanation: 'Three types: swap rows, multiply row by scalar, add multiple of one row to another.',
  },
  {
    id: 'row-reduction-3',
    legacyId: 'gj_3',
    topic: 'row-reduction',
    kind: 'choice',
    question: 'Which is NOT an elementary row operation?',
    choices: ['Swap two rows', 'Multiply a row by 0', 'Multiply a row by non-zero scalar', 'Add a multiple of one row to another'],
    answer: 1,
    explanation: 'Multiplying a row by 0 is not allowed as it loses information and is not reversible.',
  },
  {
    id: 'row-reduction-4',
    legacyId: 'gj_4',
    topic: 'row-reduction',
    kind: 'choice',
    question: 'After Gauss-Jordan elimination to RREF, the leading entry in each non-zero row is:',
    choices: ['Always 1', 'Can be any non-zero number', 'Always 0', 'The largest number in that row'],
    answer: 0,
    explanation: 'In RREF, all leading entries (pivots) must be 1.',
  },
  {
    id: 'row-reduction-5',
    legacyId: 'gj_5',
    topic: 'row-reduction',
    kind: 'number',
    label: 'rank',
    question: 'If a 3×5 matrix in RREF has 2 pivot columns, what is its rank?',
    answer: '2',
    explanation: 'The rank equals the number of pivot positions (non-zero rows).',
  },
  {
    id: 'row-reduction-6',
    legacyId: 'gj_6',
    topic: 'row-reduction',
    kind: 'choice',
    question: 'In RREF, each pivot is to the right of pivots in:',
    choices: ['Rows above it', 'Rows below it', 'The same row', 'All rows'],
    answer: 0,
    explanation: 'Pivots form a staircase pattern - each pivot is to the right of the one above.',
  },
  {
    id: 'determinants-1',
    legacyId: 'det_1',
    topic: 'determinants',
    kind: 'number',
    label: 'det',
    question: 'What is the determinant of a 3×3 identity matrix?',
    answer: '1',
    explanation: 'The determinant of any identity matrix is always 1.',
  },
  {
    id: 'determinants-2',
    legacyId: 'det_2',
    topic: 'determinants',
    kind: 'choice',
    question: 'If you swap two rows of a matrix, the determinant:',
    choices: ['Changes sign (multiplied by -1)', 'Stays the same', 'Becomes 0', 'Doubles'],
    answer: 0,
    explanation: 'Swapping rows changes the sign of the determinant.',
  },
  {
    id: 'determinants-3',
    legacyId: 'det_3',
    topic: 'determinants',
    kind: 'number',
    label: 'det(2A)',
    question: 'If det(A) = 5, what is det(2A) for a 3×3 matrix?',
    answer: '40',
    explanation: 'det(kA) = k^n × det(A) for n×n matrix. So det(2A) = 2³ × 5 = 8 × 5 = 40.',
  },
  {
    id: 'determinants-4',
    legacyId: 'det_4',
    topic: 'determinants',
    kind: 'choice',
    question: 'A square matrix is invertible if and only if:',
    choices: ['Its determinant is non-zero', 'Its determinant is zero', 'Its determinant is 1', 'Its determinant is positive'],
    answer: 0,
    explanation: 'A matrix is invertible ⟺ det(A) ≠ 0.',
  },
  {
    id: 'determinants-5',
    legacyId: 'det_5',
    topic: 'determinants',
    kind: 'number',
    label: 'det',
    question: 'What is the determinant of a matrix with a row of all zeros?',
    answer: '0',
    explanation: 'If any row (or column) is all zeros, the determinant is 0.',
  },
  {
    id: 'determinants-6',
    legacyId: 'det_6',
    topic: 'determinants',
    kind: 'choice',
    question: 'If det(A) = 4 and det(B) = 3, what is det(AB)?',
    choices: ['12', '7', '1', 'Cannot be determined'],
    answer: 0,
    explanation: 'det(AB) = det(A) × det(B) = 4 × 3 = 12.',
  },
  {
    id: 'inverses-1',
    legacyId: 'inv_1',
    topic: 'inverses',
    kind: 'choice',
    question: 'A matrix A is invertible if and only if:',
    choices: ['det(A) ≠ 0', 'det(A) = 0', 'A is symmetric', 'A is triangular'],
    answer: 0,
    explanation: 'Invertibility requires non-zero determinant.',
  },
  {
    id: 'inverses-2',
    legacyId: 'inv_2',
    topic: 'inverses',
    kind: 'choice',
    question: 'If A is invertible, what is (A⁻¹)⁻¹?',
    choices: ['A', 'I', '0', 'A²'],
    answer: 0,
    explanation: 'The inverse of the inverse returns the original matrix: (A⁻¹)⁻¹ = A.',
  },
  {
    id: 'inverses-3',
    legacyId: 'inv_3',
    topic: 'inverses',
    kind: 'choice',
    question: 'For invertible matrices A and B, what is (AB)⁻¹?',
    choices: ['B⁻¹A⁻¹', 'A⁻¹B⁻¹', 'AB', 'BA'],
    answer: 0,
    explanation: 'The inverse of a product reverses the order: (AB)⁻¹ = B⁻¹A⁻¹.',
  },
  {
    id: 'inverses-4',
    legacyId: 'inv_4',
    topic: 'inverses',
    kind: 'number',
    label: 'det(A⁻¹)',
    question: 'If det(A) = 5, what is det(A⁻¹)?',
    answer: '0.2',
    explanation: 'det(A⁻¹) = 1/det(A) = 1/5 = 0.2.',
  },
  {
    id: 'inverses-5',
    legacyId: 'inv_5',
    topic: 'inverses',
    kind: 'choice',
    question: 'To find A⁻¹ using Gauss-Jordan, you augment A with what and row reduce to [I | ?]?',
    choices: ['The identity matrix I', 'The zero matrix', 'Matrix A itself', 'A column of ones'],
    answer: 0,
    explanation: 'Augment [A | I] and row reduce to [I | A⁻¹].',
  },
  {
    id: 'inverses-6',
    legacyId: 'inv_6',
    topic: 'inverses',
    kind: 'choice',
    question: 'If A is a 3×3 matrix with rank 2, is A invertible?',
    choices: ['No, rank must equal n for invertibility', 'Yes, any matrix is invertible', 'Only if det(A) = 1', 'Cannot determine'],
    answer: 0,
    explanation: 'A matrix is invertible only if it has full rank (rank = n). Here rank 2 < 3, so not invertible.',
  },
  {
    id: 'rank-1',
    legacyId: 'rank_1',
    topic: 'rank',
    kind: 'number',
    label: 'max rank',
    question: 'What is the maximum possible rank of a 3×5 matrix?',
    answer: '3',
    explanation: 'rank ≤ min(m, n) = min(3, 5) = 3.',
  },
  {
    id: 'rank-2',
    legacyId: 'rank_2',
    topic: 'rank',
    kind: 'choice',
    question: 'The rank of a matrix equals:',
    choices: ['The number of pivot positions in RREF', 'The number of rows', 'The number of columns', 'The determinant'],
    answer: 0,
    explanation: 'Rank = number of leading 1\'s (pivots) in RREF = number of non-zero rows in RREF.',
  },
  {
    id: 'rank-3',
    legacyId: 'rank_3',
    topic: 'rank',
    kind: 'number',
    label: 'nullity',
    question: 'For a 4×4 matrix A with rank 3, what is the nullity (dimension of null space)?',
    answer: '1',
    explanation: 'Rank-Nullity Theorem: rank + nullity = n. So 3 + nullity = 4 ⇒ nullity = 1.',
  },
  {
    id: 'rank-4',
    legacyId: 'rank_4',
    topic: 'rank',
    kind: 'choice',
    question: 'If A is a 5×5 matrix with rank 5, then A is:',
    choices: ['Invertible (full rank)', 'Singular (not invertible)', 'Not square', 'Has infinite null space'],
    answer: 0,
    explanation: 'Full rank square matrix ⇒ invertible.',
  },
  {
    id: 'rank-5',
    legacyId: 'rank_6',
    topic: 'rank',
    kind: 'choice',
    question: 'A matrix with rank 0 must be:',
    choices: ['The zero matrix', 'The identity matrix', 'Invertible', 'Square'],
    answer: 0,
    explanation: 'Rank 0 means all entries are zero.',
  },
  {
    id: 'rank-6',
    legacyId: 'rank_7',
    topic: 'rank',
    kind: 'choice',
    question: 'If the column space of A has dimension 3, what is rank(A)?',
    choices: ['3', '0', 'Cannot determine', 'Equal to number of columns'],
    answer: 0,
    explanation: 'The rank equals the dimension of the column space.',
  },
  {
    id: 'subspaces-1',
    legacyId: 'vector-1',
    topic: 'subspaces',
    kind: 'choice',
    question: 'Is W = { (x, y, z) | x + 2y - z = 0 } a subspace of ℝ³?',
    choices: ['Yes', 'No'],
    answer: 0,
    explanation: '1. Zero vector: 0 + 2(0) - 0 = 0 ✓ 2. Closed under addition: If two vectors satisfy the equation, their sum does too ✓ 3. Closed under scalar multiplication: If a vector satisfies the equation, any scalar multiple does too ✓ This is a plane through the origin, which is a 2D subspace of ℝ³.',
  },
  {
    id: 'subspaces-2',
    legacyId: 'vector-2',
    topic: 'subspaces',
    kind: 'choice',
    question: 'Is W = { (x, y) | xy = 0 } a subspace of ℝ²?',
    choices: ['Yes', 'No'],
    answer: 1,
    explanation: 'This set consists of the union of the x-axis and y-axis. 1. Zero vector: (0,0) ∈ W ✓ 2. But (1,0) ∈ W and (0,1) ∈ W, yet (1,0) + (0,1) = (1,1) ∉ W ✗ Fails closure under addition, so NOT a subspace.',
  },
  {
    id: 'subspaces-3',
    legacyId: 'vector-3',
    topic: 'subspaces',
    kind: 'choice',
    question: 'Are the vectors v₁=(1,2,3), v₂=(2,3,4), v₃=(3,4,5) linearly independent?',
    choices: ['Yes', 'No'],
    answer: 1,
    explanation: 'Notice that v₃ - v₂ = (1,1,1) and v₂ - v₁ = (1,1,1), so v₃ = 2v₂ - v₁. This means: -v₁ + 2v₂ - v₃ = 0 with non-zero coefficients. Therefore, they are linearly DEPENDENT.',
  },
  {
    id: 'subspaces-4',
    legacyId: 'vector-4',
    topic: 'subspaces',
    kind: 'number',
    label: 'dim W',
    question: 'What is the dimension of W = { (x, y, z, w) | x + y = 0, z - w = 0 }?',
    answer: '2',
    explanation: 'We have 2 constraints in ℝ⁴: - x + y = 0 → y = -x (1 constraint reduces dimension by 1) - z - w = 0 → w = z (another constraint reduces dimension by 1) So we have 2 free variables (x and z), meaning dim(W) = 4 - 2 = 2. W is a 2-dimensional subspace of ℝ⁴.',
  },
  {
    id: 'subspaces-5',
    legacyId: 'vector-5',
    topic: 'subspaces',
    kind: 'choice',
    question: 'Is the set of all 2×2 matrices with determinant 0 a subspace of M₂ₓ₂?',
    choices: ['Yes', 'No'],
    answer: 1,
    explanation: 'Let A = [[1,0],[0,0]] and B = [[0,0],[0,1]]. Both have determinant 0. But A + B = [[1,0],[0,1]] has determinant 1 ≠ 0. Fails closure under addition, so NOT a subspace.',
  },
]

/**
 * Items of the original practice bank that were reviewed and left out. Both have a free-text answer
 * ("diagonal entries", "n"), which cannot be checked fairly without guessing synonyms, and inventing
 * multiple-choice options would change the question.
 */
export const droppedLegacyItems: readonly { readonly legacyId: string; readonly reason: string }[] = [
  { legacyId: 'det_7', reason: 'Free-text answer (“diagonal entries”).' },
  { legacyId: 'rank_5', reason: 'Free-text answer (“n”).' },
]

export function checksFor(topic: ConceptTopic): readonly ConceptCheck[] {
  return conceptChecks.filter((check) => check.topic === topic)
}
