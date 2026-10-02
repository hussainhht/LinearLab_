/**
 * Linear systems used by the solver, lessons, and practice. `expected` is
 * checked against the engine and by substitution in tests/unit/solve.test.ts.
 */
export type Entry = number | string

export interface SystemExample {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly a: readonly (readonly Entry[])[]
  readonly b: readonly Entry[]
  readonly expected:
    | { readonly kind: 'unique'; readonly values: readonly string[] }
    | { readonly kind: 'infinite' }
    | { readonly kind: 'inconsistent' }
}

export const systemExamples = [
  {
    id: 'two-by-two',
    name: 'Simple 2×2 system',
    description: 'Two equations, one intersection point.',
    a: [[2, 3], [1, -1]],
    b: [8, -1],
    expected: { kind: 'unique', values: ['1', '2'] },
  },
  {
    id: 'three-by-three',
    name: '3×3 with a unique solution',
    description: 'A standard three-variable system that needs every kind of row operation.',
    a: [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]],
    b: [8, -11, -3],
    expected: { kind: 'unique', values: ['2', '3', '-1'] },
  },
  {
    id: 'infinite-solutions',
    name: '3×3 with infinitely many solutions',
    description: 'The second equation is twice the first, so one variable is free.',
    a: [[1, 2, 3], [2, 4, 6], [1, 1, 1]],
    b: [6, 12, 3],
    expected: { kind: 'infinite' },
  },
  {
    id: 'no-solution',
    name: '3×3 with no solution',
    description: 'The left sides of two equations are proportional but their constants are not.',
    a: [[1, 2, 3], [2, 4, 6], [1, 1, 1]],
    b: [4, 9, 2],
    expected: { kind: 'inconsistent' },
  },
  {
    id: 'four-by-four',
    name: '4×4 system',
    description: 'A larger system whose solution is fractional.',
    a: [[1, 2, -1, 1], [2, 1, 1, -1], [1, -1, 2, 1], [3, 1, -1, 2]],
    b: [6, 3, 8, 5],
    expected: { kind: 'unique', values: ['-5/9', '32/9', '38/9', '11/3'] },
  },
  {
    id: 'two-constraints',
    name: 'Economics example',
    description: 'Two linear conditions, such as a supply and a demand relation, met at (100, 100).',
    a: [[2, -1], [1, 1]],
    b: [100, 200],
    expected: { kind: 'unique', values: ['100', '100'] },
  },
  {
    id: 'circuit',
    name: 'Engineering circuit',
    description: 'Kirchhoff’s junction and loop equations for three currents.',
    a: [[1, 1, -1], [2, -1, 0], [0, 3, 1]],
    b: [0, 5, 10],
    expected: { kind: 'unique', values: ['10/3', '5/3', '5'] },
  },
  {
    id: 'fraction-answer',
    name: 'Fractional answer',
    description: 'x + 2y = 5 and 3x − y = 4. The lines meet at (13/7, 11/7).',
    a: [[1, 2], [3, -1]],
    b: [5, 4],
    expected: { kind: 'unique', values: ['13/7', '11/7'] },
  },
  {
    id: 'cramer-three',
    name: 'Cramer’s rule 3×3',
    description: 'x + 2y + z = 9, 2x − y + 2z = 6, 3x + y − z = 2.',
    a: [[1, 2, 1], [2, -1, 2], [3, 1, -1]],
    b: [9, 6, 2],
    expected: { kind: 'unique', values: ['19/20', '12/5', '13/4'] },
  },
  {
    id: 'cramer-two',
    name: 'Cramer’s rule 2×2',
    description: '2x + 3y = 8 and 4x − y = 2.',
    a: [[2, 3], [4, -1]],
    b: [8, 2],
    expected: { kind: 'unique', values: ['1', '2'] },
  },
  {
    id: 'homogeneous-free',
    name: 'Homogeneous, nontrivial solutions',
    description: '2x − 3y + 4z = 0 and x − y − z = 0: more unknowns than equations.',
    a: [[2, -3, 4], [1, -1, -1]],
    b: [0, 0],
    expected: { kind: 'infinite' },
  },
  {
    id: 'homogeneous-trivial',
    name: 'Homogeneous, trivial solution only',
    description: 'x₁ + x₂ − x₃ = 0, x₁ − 2x₂ = 0, x₁ − x₃ = 0. The coefficient matrix is invertible.',
    a: [[1, 1, -1], [1, -2, 0], [1, 0, -1]],
    b: [0, 0, 0],
    expected: { kind: 'unique', values: ['0', '0', '0'] },
  },
  {
    id: 'inverse-application',
    name: 'Solve with an inverse',
    description: 'x₁ + 2x₂ + 3x₃ = 5, 2x₁ + 5x₂ + 3x₃ = 3, x₁ + 8x₃ = 17.',
    a: [[1, 2, 3], [2, 5, 3], [1, 0, 8]],
    b: [5, 3, 17],
    expected: { kind: 'unique', values: ['1', '-1', '2'] },
  },
  {
    id: 'augmented-example',
    name: 'Missing variables',
    description: '2x − 3y + 4z = 1, x − y = 2, −2y + z = 3: zeros stand in for missing variables.',
    a: [[2, -3, 4], [1, -1, 0], [0, -2, 1]],
    b: [1, 2, 3],
    expected: { kind: 'unique', values: ['-1/7', '-15/7', '-9/7'] },
  },
  {
    id: 'parallel-lines',
    name: 'Parallel lines',
    description: 'x + y = 3 and x + y = 5 never meet.',
    a: [[1, 1], [1, 1]],
    b: [3, 5],
    expected: { kind: 'inconsistent' },
  },
  {
    id: 'coincident-lines',
    name: 'Same line twice',
    description: 'x + y = 3 and 2x + 2y = 6 describe one line.',
    a: [[1, 1], [2, 2]],
    b: [3, 6],
    expected: { kind: 'infinite' },
  },
] as const satisfies readonly SystemExample[]

export type SystemExampleId = (typeof systemExamples)[number]['id']

export function findSystemExample(id: string): SystemExample | undefined {
  return systemExamples.find((e) => e.id === id)
}

/** Examples offered in the solver's example picker, in display order. */
export const solverExampleIds: readonly SystemExampleId[] = [
  'two-by-two',
  'three-by-three',
  'infinite-solutions',
  'no-solution',
  'four-by-four',
  'fraction-answer',
  'circuit',
  'two-constraints',
  'homogeneous-free',
  'parallel-lines',
]
