import { type EliminationResult, gaussJordan } from './elimination'
import { type Matrix, type Vector, augment, columnVector, entry, shapeOf, MatrixDimensionError } from './matrix'
import { Rational } from './rational'

export interface ParametricDirection {
  /** Index of the free variable this direction belongs to. */
  readonly variable: number
  readonly vector: Vector
}

export type SystemSolution =
  | { readonly kind: 'unique'; readonly values: Vector }
  | {
      readonly kind: 'infinite'
      /** The solution obtained by setting every free variable to 0. */
      readonly particular: Vector
      readonly freeVariables: readonly number[]
      /** x = particular + Σ tₖ · directionₖ, one direction per free variable. */
      readonly directions: readonly ParametricDirection[]
    }
  | {
      readonly kind: 'inconsistent'
      /** Row of the reduced matrix that reads 0 = value. */
      readonly row: number
      readonly value: Rational
    }

export interface SystemAnalysis {
  readonly variables: number
  readonly equations: number
  readonly elimination: EliminationResult
  readonly pivotColumns: readonly number[]
  readonly freeVariables: readonly number[]
  readonly rankA: number
  readonly rankAugmented: number
  readonly solution: SystemSolution
}

/** Solves the system whose augmented matrix is [A | b], with `variables` coefficient columns. */
export function solveAugmented(augmented: Matrix, variables: number): SystemAnalysis {
  const { rows, cols } = shapeOf(augmented)
  if (cols !== variables + 1) {
    throw new MatrixDimensionError(`An augmented matrix for ${variables} variables needs ${variables + 1} columns.`)
  }
  const elimination = gaussJordan(augmented, { pivotColumnLimit: variables })
  const reduced = elimination.result
  const pivotColumns = elimination.pivotColumns
  const freeVariables = Array.from({ length: variables }, (_, j) => j).filter((j) => !pivotColumns.includes(j))
  const rankA = elimination.rank

  let contradiction: { row: number; value: Rational } | null = null
  for (let r = rankA; r < rows; r++) {
    const value = entry(reduced, r, variables)
    if (!value.isZero()) {
      contradiction = { row: r, value }
      break
    }
  }

  const base = {
    variables,
    equations: rows,
    elimination,
    pivotColumns,
    freeVariables,
    rankA,
    rankAugmented: contradiction ? rankA + 1 : rankA,
  }

  if (contradiction) {
    return { ...base, solution: { kind: 'inconsistent', ...contradiction } }
  }

  // With free variables at 0, each pivot variable equals its row's constant.
  const particular: Rational[] = Array.from({ length: variables }, () => Rational.ZERO)
  elimination.pivots.forEach(({ row, col }) => {
    particular[col] = entry(reduced, row, variables)
  })

  if (freeVariables.length === 0) {
    return { ...base, solution: { kind: 'unique', values: particular } }
  }

  const directions = freeVariables.map((free) => {
    const direction: Rational[] = Array.from({ length: variables }, (_, j) => (j === free ? Rational.ONE : Rational.ZERO))
    elimination.pivots.forEach(({ row, col }) => {
      direction[col] = entry(reduced, row, free).neg()
    })
    return { variable: free, vector: direction }
  })

  return { ...base, solution: { kind: 'infinite', particular, freeVariables, directions } }
}

export function solveSystem(a: Matrix, b: Vector): SystemAnalysis {
  const { rows, cols } = shapeOf(a)
  if (b.length !== rows) {
    throw new MatrixDimensionError(`b needs one entry per equation: A has ${rows} rows but b has ${b.length} entries.`)
  }
  return solveAugmented(augment(a, columnVector(b)), cols)
}
