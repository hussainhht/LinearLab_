import {
  type Matrix,
  type ProductTerm,
  multiplicationIssue,
  multiply,
  productTerms,
  shapeOf,
  MatrixDimensionError,
} from './matrix'
import { Rational } from './rational'

export interface ProductEntryTrace {
  readonly row: number
  readonly col: number
  readonly terms: readonly ProductTerm[]
  /** Running totals after each term; the last one equals `value`. */
  readonly partialSums: readonly Rational[]
  readonly value: Rational
}

export interface MultiplicationTrace {
  readonly a: Matrix
  readonly b: Matrix
  readonly result: Matrix
  /** Entries of A×B in row-major order. */
  readonly entries: readonly ProductEntryTrace[]
}

/** Every dot product behind A×B, in the order a student would compute them. */
export function traceMultiplication(a: Matrix, b: Matrix): MultiplicationTrace {
  const issue = multiplicationIssue(a, b)
  if (issue) throw new MatrixDimensionError(issue)
  const { rows } = shapeOf(a)
  const { cols } = shapeOf(b)
  const entries: ProductEntryTrace[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const terms = productTerms(a, b, row, col)
      const partialSums: Rational[] = []
      terms.reduce((acc, t) => {
        const next = acc.add(t.product)
        partialSums.push(next)
        return next
      }, Rational.ZERO)
      entries.push({ row, col, terms, partialSums, value: partialSums[partialSums.length - 1] ?? Rational.ZERO })
    }
  }
  return { a, b, result: multiply(a, b), entries }
}
