import { type Matrix, type Position, entry, shapeOf, assertRectangular } from './matrix'
import { type RowOperation, applyRowOperation, changedCells, replaceRow, scaleRow, swapRows } from './rowOps'
import type { Rational } from './rational'

/**
 * 'gauss-jordan' produces reduced row echelon form (leading 1s, zeros above and below).
 * 'forward' only clears entries below each pivot and never scales — the
 * Gaussian elimination used for determinants.
 */
export type EliminationMode = 'gauss-jordan' | 'forward'

export interface EliminationOptions {
  readonly mode?: EliminationMode
  /**
   * Only the first `pivotColumnLimit` columns may hold pivots. For an
   * augmented matrix [A | b] this is the number of variables, so elimination
   * never pivots on the constants column.
   */
  readonly pivotColumnLimit?: number
}

/** Why a step was taken, independent of how the UI words it. */
export type StepPurpose =
  | {
      readonly kind: 'swap'
      readonly column: number
      readonly pivotRow: number
      /** Row that held the nonzero entry and moves into the pivot row. */
      readonly fromRow: number
      /** Value that was in the pivot position before the swap (always zero here). */
      readonly replacedValue: Rational
      readonly incomingValue: Rational
    }
  | {
      readonly kind: 'normalize'
      readonly column: number
      readonly pivotRow: number
      readonly pivotValue: Rational
    }
  | {
      readonly kind: 'eliminate'
      readonly column: number
      readonly pivotRow: number
      readonly row: number
      /** Entry that the step turns into zero. */
      readonly value: Rational
      readonly direction: 'below' | 'above'
    }

export interface EliminationStep {
  /** 1-based position in the step list; step 0 is the untouched input. */
  readonly number: number
  readonly operation: RowOperation
  readonly purpose: StepPurpose
  readonly before: Matrix
  readonly after: Matrix
  /** Pivot position the step is working toward. */
  readonly pivot: Position
  readonly changed: readonly Position[]
}

export interface EliminationResult {
  readonly mode: EliminationMode
  readonly input: Matrix
  readonly steps: readonly EliminationStep[]
  readonly result: Matrix
  readonly pivots: readonly Position[]
  readonly pivotColumns: readonly number[]
  /** Columns (within the pivot limit) that ended without a pivot. */
  readonly columnsWithoutPivot: readonly number[]
  readonly pivotColumnLimit: number
  readonly rank: number
}

/** The single row-reduction routine shared by every tool, lesson, and practice check. */
export function eliminate(input: Matrix, options: EliminationOptions = {}): EliminationResult {
  assertRectangular(input)
  const mode = options.mode ?? 'gauss-jordan'
  const { rows, cols } = shapeOf(input)
  const limit = Math.min(options.pivotColumnLimit ?? cols, cols)

  const steps: EliminationStep[] = []
  const pivots: Position[] = []
  const columnsWithoutPivot: number[] = []
  let current = input

  const record = (operation: RowOperation, purpose: StepPurpose, pivot: Position) => {
    const after = applyRowOperation(current, operation)
    steps.push({
      number: steps.length + 1,
      operation,
      purpose,
      before: current,
      after,
      pivot,
      changed: changedCells(current, after),
    })
    current = after
  }

  let pivotRow = 0
  for (let col = 0; col < limit; col++) {
    if (pivotRow >= rows) {
      columnsWithoutPivot.push(col)
      continue
    }

    let found = -1
    for (let r = pivotRow; r < rows; r++) {
      if (!entry(current, r, col).isZero()) {
        found = r
        break
      }
    }
    if (found === -1) {
      columnsWithoutPivot.push(col)
      continue
    }

    const pivot: Position = { row: pivotRow, col }

    if (found !== pivotRow) {
      record(
        swapRows(pivotRow, found),
        {
          kind: 'swap',
          column: col,
          pivotRow,
          fromRow: found,
          replacedValue: entry(current, pivotRow, col),
          incomingValue: entry(current, found, col),
        },
        pivot,
      )
    }

    const pivotValue = entry(current, pivotRow, col)
    if (mode === 'gauss-jordan' && !pivotValue.isOne()) {
      record(scaleRow(pivotRow, pivotValue.reciprocal()), { kind: 'normalize', column: col, pivotRow, pivotValue }, pivot)
    }

    for (let r = mode === 'forward' ? pivotRow + 1 : 0; r < rows; r++) {
      if (r === pivotRow) continue
      const value = entry(current, r, col)
      if (value.isZero()) continue
      const factor = value.div(entry(current, pivotRow, col)).neg()
      record(
        replaceRow(r, pivotRow, factor),
        { kind: 'eliminate', column: col, pivotRow, row: r, value, direction: r > pivotRow ? 'below' : 'above' },
        pivot,
      )
    }

    pivots.push(pivot)
    pivotRow++
  }

  return {
    mode,
    input,
    steps,
    result: current,
    pivots,
    pivotColumns: pivots.map((p) => p.col),
    columnsWithoutPivot,
    pivotColumnLimit: limit,
    rank: pivots.length,
  }
}

export function gaussJordan(input: Matrix, options: Omit<EliminationOptions, 'mode'> = {}): EliminationResult {
  return eliminate(input, { ...options, mode: 'gauss-jordan' })
}

export function rref(input: Matrix): Matrix {
  return gaussJordan(input).result
}

export function rank(input: Matrix): number {
  return gaussJordan(input).rank
}
