import { type EliminationResult, gaussJordan } from './elimination'
import { type Matrix, type Vector, columnOf, entry, isZeroVector, shapeOf } from './matrix'
import { Rational } from './rational'

export interface NullSpaceVector {
  /** Free variable set to 1 (all other free variables are 0). */
  readonly freeVariable: number
  readonly vector: Vector
}

export interface SpaceAnalysis {
  readonly rows: number
  readonly cols: number
  readonly elimination: EliminationResult
  readonly rank: number
  readonly nullity: number
  readonly pivotColumns: readonly number[]
  readonly freeColumns: readonly number[]
  /** Pivot columns of the ORIGINAL matrix — row operations change the column space of R, not of A. */
  readonly columnSpaceBasis: readonly { readonly column: number; readonly vector: Vector }[]
  /** Nonzero rows of the reduced matrix. */
  readonly rowSpaceBasis: readonly Vector[]
  readonly nullSpaceBasis: readonly NullSpaceVector[]
}

export function analyzeSpaces(a: Matrix): SpaceAnalysis {
  const { rows, cols } = shapeOf(a)
  const elimination = gaussJordan(a)
  const reduced = elimination.result
  const pivotColumns = elimination.pivotColumns
  const freeColumns = Array.from({ length: cols }, (_, j) => j).filter((j) => !pivotColumns.includes(j))

  const nullSpaceBasis = freeColumns.map((free) => {
    const v: Rational[] = Array.from({ length: cols }, (_, j) => (j === free ? Rational.ONE : Rational.ZERO))
    elimination.pivots.forEach(({ row, col }) => {
      v[col] = entry(reduced, row, free).neg()
    })
    return { freeVariable: free, vector: v }
  })

  return {
    rows,
    cols,
    elimination,
    rank: elimination.rank,
    nullity: freeColumns.length,
    pivotColumns,
    freeColumns,
    columnSpaceBasis: pivotColumns.map((column) => ({ column, vector: columnOf(a, column) })),
    rowSpaceBasis: reduced.filter((row) => !isZeroVector(row)),
    nullSpaceBasis,
  }
}
