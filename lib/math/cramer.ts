import { determinant } from './determinant'
import { type Matrix, type Vector, formatShape, isSquare, shapeOf, MatrixDimensionError } from './matrix'
import type { Rational } from './rational'

export interface CramerColumn {
  readonly variable: number
  /** A with column `variable` replaced by b. */
  readonly matrix: Matrix
  readonly determinant: Rational
  readonly value: Rational
}

export type CramerResult =
  | { readonly applicable: true; readonly determinant: Rational; readonly columns: readonly CramerColumn[]; readonly solution: Vector }
  | { readonly applicable: false; readonly reason: 'not-square'; readonly message: string }
  | { readonly applicable: false; readonly reason: 'singular'; readonly determinant: Rational; readonly message: string }

export function replaceColumn(a: Matrix, col: number, b: Vector): Matrix {
  return a.map((row, i) => row.map((v, j) => (j === col ? (b[i] as Rational) : v)))
}

export function cramer(a: Matrix, b: Vector): CramerResult {
  const shape = shapeOf(a)
  if (b.length !== shape.rows) {
    throw new MatrixDimensionError(`b needs ${shape.rows} entries to match A, but has ${b.length}.`)
  }
  if (!isSquare(a)) {
    return {
      applicable: false,
      reason: 'not-square',
      message: `Cramer’s rule needs as many equations as unknowns, but A is ${formatShape(shape)}.`,
    }
  }
  const det = determinant(a)
  if (det.isZero()) {
    return {
      applicable: false,
      reason: 'singular',
      determinant: det,
      message:
        'det(A) = 0, so Cramer’s rule would divide by zero. The system has either no solution or infinitely many; row reduction tells you which.',
    }
  }
  const columns = Array.from({ length: shape.cols }, (_, variable) => {
    const matrix = replaceColumn(a, variable, b)
    const d = determinant(matrix)
    return { variable, matrix, determinant: d, value: d.div(det) }
  })
  return { applicable: true, determinant: det, columns, solution: columns.map((c) => c.value) }
}
