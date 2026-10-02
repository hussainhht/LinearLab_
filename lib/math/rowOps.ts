import { type Matrix, type Position, entry, rowOf } from './matrix'
import { Rational } from './rational'

/**
 * The three elementary row operations. Row indices are zero-based here; the
 * notation layer converts them to the 1-based labels students see (R₁, R₂, …).
 */
export type RowOperation =
  | { readonly kind: 'swap'; readonly rowA: number; readonly rowB: number }
  | { readonly kind: 'scale'; readonly row: number; readonly factor: Rational }
  /** R_target ← R_target + factor · R_source */
  | { readonly kind: 'replace'; readonly target: number; readonly source: number; readonly factor: Rational }

export const swapRows = (rowA: number, rowB: number): RowOperation => ({ kind: 'swap', rowA, rowB })
export const scaleRow = (row: number, factor: Rational): RowOperation => ({ kind: 'scale', row, factor })
export const replaceRow = (target: number, source: number, factor: Rational): RowOperation => ({
  kind: 'replace',
  target,
  source,
  factor,
})

/** Returns a reason the operation is not an elementary row operation on an m-row matrix, or null. */
export function rowOperationIssue(op: RowOperation, rows: number): string | null {
  const inRange = (r: number) => Number.isInteger(r) && r >= 0 && r < rows
  switch (op.kind) {
    case 'swap':
      if (!inRange(op.rowA) || !inRange(op.rowB)) return `Choose rows between 1 and ${rows}.`
      if (op.rowA === op.rowB) return 'Swapping a row with itself does nothing. Pick two different rows.'
      return null
    case 'scale':
      if (!inRange(op.row)) return `Choose a row between 1 and ${rows}.`
      if (op.factor.isZero()) {
        return 'Multiplying a row by 0 erases an equation, so it is not allowed. Use a nonzero factor.'
      }
      return null
    case 'replace':
      if (!inRange(op.target) || !inRange(op.source)) return `Choose rows between 1 and ${rows}.`
      if (op.target === op.source) {
        return 'Add a multiple of a different row. Adding a row to itself is really a scaling.'
      }
      if (op.factor.isZero()) return 'Adding 0 times a row changes nothing. Use a nonzero multiple.'
      return null
  }
}

export function applyRowOperation(m: Matrix, op: RowOperation): Matrix {
  const issue = rowOperationIssue(op, m.length)
  if (issue) throw new RangeError(issue)
  switch (op.kind) {
    case 'swap':
      return m.map((row, i) => (i === op.rowA ? rowOf(m, op.rowB) : i === op.rowB ? rowOf(m, op.rowA) : row))
    case 'scale':
      return m.map((row, i) => (i === op.row ? row.map((v) => v.mul(op.factor)) : row))
    case 'replace': {
      const source = rowOf(m, op.source)
      return m.map((row, i) =>
        i === op.target ? row.map((v, j) => v.add(op.factor.mul(source[j] as Rational))) : row,
      )
    }
  }
}

/** Rows whose contents the operation rewrites. */
export function affectedRows(op: RowOperation): number[] {
  switch (op.kind) {
    case 'swap':
      return [op.rowA, op.rowB]
    case 'scale':
      return [op.row]
    case 'replace':
      return [op.target]
  }
}

/** The row that is read but not modified (only replacement has one). */
export function sourceRow(op: RowOperation): number | null {
  return op.kind === 'replace' ? op.source : null
}

/** Factor by which the operation multiplies the determinant of a square matrix. */
export function determinantFactor(op: RowOperation): Rational {
  switch (op.kind) {
    case 'swap':
      return Rational.MINUS_ONE
    case 'scale':
      return op.factor
    case 'replace':
      return Rational.ONE
  }
}

export function changedCells(before: Matrix, after: Matrix): Position[] {
  const cells: Position[] = []
  before.forEach((row, i) =>
    row.forEach((v, j) => {
      if (!v.equals(entry(after, i, j))) cells.push({ row: i, col: j })
    }),
  )
  return cells
}
