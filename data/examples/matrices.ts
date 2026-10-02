import type { Entry } from './systems'

export interface MatrixExample {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly values: readonly (readonly Entry[])[]
}

export const matrixExamples = [
  { id: 'two-a', name: '2×2', description: 'det = −2', values: [[1, 2], [3, 4]] },
  { id: 'two-b', name: '2×2', description: 'Pairs with the first 2×2', values: [[5, 6], [7, 8]] },
  { id: 'three-a', name: '3×3, det 1', description: 'Invertible with an integer inverse', values: [[1, 2, 3], [0, 1, 4], [5, 6, 0]] },
  { id: 'three-b', name: '3×3', description: 'A second 3×3 to multiply with', values: [[2, 0, 1], [1, 3, 0], [0, 1, 2]] },
  { id: 'det-22', name: '3×3, det 22', description: 'The determinant lesson’s example', values: [[1, 2, 3], [0, 4, 5], [1, 0, 6]] },
  { id: 'singular', name: 'Singular 3×3', description: 'Row 3 is row 1 plus row 2', values: [[1, 2, 3], [4, 5, 6], [5, 7, 9]] },
  { id: 'rectangular', name: '3×4, rank 2', description: 'Two free columns for the null space', values: [[1, 2, 0, 3], [2, 4, 1, 4], [3, 6, 1, 7]] },
  { id: 'two-by-three', name: '2×3', description: 'From the multiplication lesson', values: [[2, 0, 1], [3, 1, 2]] },
  { id: 'three-by-two', name: '3×2', description: 'Multiplies the 2×3 example', values: [[1, 3], [0, 2], [4, -1]] },
  { id: 'tiny-scale', name: 'Tiny but invertible', description: '10⁻⁶ on the diagonal', values: [['0.000001', 0], [0, '0.000001']] },
] as const satisfies readonly MatrixExample[]

export function findMatrixExample(id: string): MatrixExample | undefined {
  return matrixExamples.find((e) => e.id === id)
}
