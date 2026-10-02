import type { EliminationStep } from './elimination'
import { entry } from './matrix'
import { formatNumber, formatRowOperation, rowLabel, variableName } from './notation'

export interface StepContext {
  /**
   * 'system' — columns before the bar are variables of a linear system.
   * 'inverse' — the matrix is [A | I].
   * 'matrix' — plain row reduction or determinant work.
   */
  readonly kind: 'system' | 'inverse' | 'matrix'
  readonly mode?: 'gauss-jordan' | 'forward'
}

export interface StepExplanation {
  readonly title: string
  readonly operation: string
  readonly reason: string
}

const n = (r: Parameters<typeof formatNumber>[0]) => formatNumber(r).text

function columnName(col: number, context: StepContext): string {
  return context.kind === 'system' ? variableName(col) : `column ${col + 1}`
}

/** Plain-language description of what a step does and why, derived from the step data itself. */
export function explainStep(step: EliminationStep, context: StepContext): StepExplanation {
  const operation = formatRowOperation(step.operation)
  const purpose = step.purpose
  const pivotText = `row ${purpose.pivotRow + 1}, column ${purpose.column + 1}`

  switch (purpose.kind) {
    case 'swap':
      return {
        title: `Swap ${rowLabel(purpose.pivotRow)} and ${rowLabel(purpose.fromRow)}`,
        operation,
        reason:
          `The pivot position (${pivotText}) holds ${n(purpose.replacedValue)}, which cannot be a pivot. ` +
          `${rowLabel(purpose.fromRow)} has ${n(purpose.incomingValue)} in that column, so swapping the rows moves a nonzero entry into the pivot position. ` +
          'Reordering equations does not change the solutions.',
      }
    case 'normalize': {
      const factor = purpose.pivotValue.reciprocal()
      return {
        title: `Scale ${rowLabel(purpose.pivotRow)} to get a leading 1`,
        operation,
        reason:
          `The pivot in ${pivotText} is ${n(purpose.pivotValue)}. Multiplying ${rowLabel(purpose.pivotRow)} by ${n(factor)} ` +
          'makes it 1, so every other entry in its column can be cleared with a single multiple of this row.',
      }
    }
    case 'eliminate': {
      const pivotValue = entry(step.before, purpose.pivotRow, purpose.column)
      if (step.operation.kind !== 'replace') throw new Error('Elimination steps are always row replacements')
      const factor = step.operation.factor
      const magnitude = factor.abs()
      const verb = factor.isNegative() ? 'Subtracting' : 'Adding'
      const sign = factor.isNegative() ? '−' : '+'
      const multiple = magnitude.isOne() ? rowLabel(purpose.pivotRow) : `${n(magnitude)} times ${rowLabel(purpose.pivotRow)}`
      const arithmetic = `${n(purpose.value)} ${sign} ${wrap(n(magnitude))}·${wrap(n(pivotValue))} = 0`
      const where = purpose.direction === 'below' ? 'below' : 'above'
      const subject =
        context.kind === 'system'
          ? `Eliminate ${columnName(purpose.column, context)} from ${rowLabel(purpose.row)}`
          : `Clear ${columnName(purpose.column, context)} in ${rowLabel(purpose.row)}`
      return {
        title: subject,
        operation,
        reason:
          `${rowLabel(purpose.row)} has ${n(purpose.value)} ${where} the pivot. ` +
          `${verb} ${multiple} turns that entry into 0, because ${arithmetic}. ` +
          (context.kind === 'system'
            ? 'Adding a multiple of one equation to another keeps the same solution set.'
            : context.mode === 'forward'
              ? 'This kind of replacement leaves the determinant unchanged.'
              : 'Replacements like this never change the row space.'),
      }
    }
  }
}

function wrap(text: string): string {
  return text.startsWith('−') || text.includes('/') ? `(${text})` : text
}
