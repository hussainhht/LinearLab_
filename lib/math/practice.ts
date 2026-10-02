import { type EliminationStep, gaussJordan } from './elimination'
import { isReducedRowEchelon } from './echelon'
import { type Matrix, type Position, entry, shapeOf } from './matrix'
import { formatNumber, formatRowOperation, rowLabel } from './notation'
import { type RowOperation, applyRowOperation, rowOperationIssue } from './rowOps'

/**
 * How far a matrix is along the way to reduced row echelon form.
 *
 * Columns are finished from left to right: a column is finished when it is a
 * clean pivot column (a 1 in the next pivot row, zeros elsewhere) or has no
 * possible pivot. In the first unfinished column we count partial credit: a
 * nonzero pivot candidate, a pivot equal to 1, and zeros in other rows. Any
 * valid order of operations within a column earns credit, so students are
 * not forced into one particular elimination sequence.
 */
export interface Progress {
  readonly finishedColumns: number
  readonly pivotsPlaced: number
  /** Column currently being worked on, or null when every column is finished. */
  readonly workingColumn: number | null
  readonly workingRow: number
  /** Zeros in the working column outside the pivot row, plus one if the pivot is nonzero. */
  readonly structure: number
  /** Whether the working pivot already equals 1. */
  readonly normalized: boolean
  readonly complete: boolean
}

export function measureProgress(m: Matrix, pivotColumnLimit?: number): Progress {
  const { rows, cols } = shapeOf(m)
  const limit = pivotColumnLimit ?? cols
  let pivotRow = 0

  for (let col = 0; col < limit; col++) {
    const below = (r: number) => r >= pivotRow && r < rows
    const candidates = Array.from({ length: rows }, (_, r) => r).filter((r) => below(r) && !entry(m, r, col).isZero())
    if (candidates.length === 0 || pivotRow >= rows) continue // no pivot possible here

    const pivotValue = entry(m, pivotRow, col)
    const othersZero = Array.from({ length: rows }, (_, r) => r).filter((r) => r !== pivotRow && entry(m, r, col).isZero()).length
    if (pivotValue.isOne() && othersZero === rows - 1) {
      pivotRow++
      continue
    }

    return {
      finishedColumns: col,
      pivotsPlaced: pivotRow,
      workingColumn: col,
      workingRow: pivotRow,
      structure: othersZero + (pivotValue.isZero() ? 0 : 1),
      normalized: pivotValue.isOne(),
      complete: false,
    }
  }

  return {
    finishedColumns: limit,
    pivotsPlaced: pivotRow,
    workingColumn: null,
    workingRow: pivotRow,
    structure: 0,
    normalized: true,
    complete: isReducedRowEchelon(m, { columnLimit: limit }),
  }
}

/**
 * Positive when `after` is further along than `before`, negative when work
 * was lost. Only losing finished columns or zeros counts as lost work; moving
 * a 1 out of the pivot position is neutral, because it undoes nothing.
 */
export function compareProgress(before: Progress, after: Progress): number {
  if (after.complete !== before.complete) return after.complete ? 1 : -1
  if (after.finishedColumns !== before.finishedColumns) return after.finishedColumns - before.finishedColumns
  if (after.structure !== before.structure) return after.structure - before.structure
  if (!before.normalized && after.normalized) return 1
  return 0
}

export type Verdict = 'complete' | 'progress' | 'neutral' | 'setback'

export type Assessment =
  | { readonly valid: false; readonly message: string }
  | {
      readonly valid: true
      readonly after: Matrix
      readonly verdict: Verdict
      readonly message: string
      readonly before: Progress
      readonly progress: Progress
    }

/** Checks a student's row operation: is it legal, and did it move toward RREF? */
export function assessOperation(m: Matrix, op: RowOperation, pivotColumnLimit?: number): Assessment {
  const issue = rowOperationIssue(op, m.length)
  if (issue) return { valid: false, message: issue }

  const after = applyRowOperation(m, op)
  const before = measureProgress(m, pivotColumnLimit)
  const progress = measureProgress(after, pivotColumnLimit)
  const delta = compareProgress(before, progress)
  const opText = formatRowOperation(op)

  let verdict: Verdict
  let message: string
  if (progress.complete) {
    verdict = 'complete'
    message = `${opText} finishes the reduction: the matrix is now in reduced row echelon form.`
  } else if (delta > 0) {
    verdict = 'progress'
    message =
      progress.finishedColumns > before.finishedColumns
        ? `${opText} completes column ${before.finishedColumns + 1}. Move on to the next column.`
        : `${opText} is valid and moves column ${(progress.workingColumn ?? 0) + 1} closer to a clean pivot column.`
  } else if (delta === 0) {
    verdict = 'neutral'
    message = `${opText} is a valid row operation and keeps the same solution set, but it does not advance the leftmost unfinished column.`
  } else {
    verdict = 'setback'
    message = `${opText} is valid, but it undoes earlier work: column ${(progress.workingColumn ?? progress.finishedColumns) + 1} is now further from a clean pivot column. You can undo it.`
  }
  return { valid: true, after, verdict, message, before, progress }
}

export interface Hint {
  readonly step: EliminationStep
  readonly focus: Position
  /** Increasingly specific hints: where to look, what kind of move, the exact operation. */
  readonly levels: readonly [string, string, string]
}

export function nextHint(m: Matrix, pivotColumnLimit?: number): Hint | null {
  const elimination = gaussJordan(m, pivotColumnLimit === undefined ? {} : { pivotColumnLimit })
  const step = elimination.steps[0]
  if (!step) return null
  const p = step.purpose
  const where = `Focus on column ${p.column + 1}: its pivot belongs in row ${p.pivotRow + 1}.`
  let kind: string
  switch (p.kind) {
    case 'swap':
      kind = `The pivot position holds 0. Swap in a row that has a nonzero entry in column ${p.column + 1}.`
      break
    case 'normalize':
      kind = `The pivot is ${formatNumber(p.pivotValue).text}. Scale ${rowLabel(p.pivotRow)} so it becomes 1.`
      break
    case 'eliminate':
      kind = `${rowLabel(p.row)} has ${formatNumber(p.value).text} in the pivot column. Add a multiple of ${rowLabel(p.pivotRow)} to make it 0.`
      break
  }
  return { step, focus: step.pivot, levels: [where, kind, `Try ${formatRowOperation(step.operation)}.`] }
}
