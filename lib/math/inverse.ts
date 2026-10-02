import { type EliminationResult, gaussJordan } from './elimination'
import {
  type Matrix,
  augment,
  formatShape,
  identity,
  isIdentity,
  isSquare,
  multiply,
  shapeOf,
  splitColumns,
  MatrixDimensionError,
} from './matrix'

export type InverseResult =
  | {
      readonly invertible: true
      readonly augmented: Matrix
      readonly elimination: EliminationResult
      readonly inverse: Matrix
      /** Products actually computed to confirm the result. */
      readonly check: {
        readonly left: Matrix // A⁻¹·A
        readonly right: Matrix // A·A⁻¹
        readonly passed: boolean
      }
    }
  | {
      readonly invertible: false
      readonly augmented: Matrix
      readonly elimination: EliminationResult
      readonly rank: number
      /** First column of A that has no pivot. */
      readonly missingPivotColumn: number
    }

/** Inverts A by row reducing [A | I] to [I | A⁻¹]. */
export function invert(a: Matrix): InverseResult {
  if (!isSquare(a)) {
    throw new MatrixDimensionError(`Only square matrices can have an inverse; this one is ${formatShape(shapeOf(a))}.`)
  }
  const n = a.length
  const augmented = augment(a, identity(n))
  const elimination = gaussJordan(augmented, { pivotColumnLimit: n })

  if (elimination.rank < n) {
    return {
      invertible: false,
      augmented,
      elimination,
      rank: elimination.rank,
      missingPivotColumn: elimination.columnsWithoutPivot[0] ?? n - 1,
    }
  }

  const { right: inverse } = splitColumns(elimination.result, n)
  const left = multiply(inverse, a)
  const right = multiply(a, inverse)
  return {
    invertible: true,
    augmented,
    elimination,
    inverse,
    check: { left, right, passed: isIdentity(left) && isIdentity(right) },
  }
}
