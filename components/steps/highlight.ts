import type { MatrixHighlight } from '@/components/matrix/MatrixView'
import type { EliminationResult } from '@/lib/math/elimination'
import type { Matrix } from '@/lib/math/matrix'
import { formatRowOperation, rowLabel } from '@/lib/math/notation'
import { affectedRows, sourceRow } from '@/lib/math/rowOps'

export interface FinalAnnotations {
  readonly freeColumns?: readonly number[]
  readonly inconsistentRow?: number | null
  readonly inconsistentNote?: string
}

/** Matrix and highlight state for step `index` (0 = the untouched input). */
export function stepView(
  elimination: EliminationResult,
  index: number,
  final: FinalAnnotations = {},
): { matrix: Matrix; highlight: MatrixHighlight } {
  const last = elimination.steps.length
  const isFinal = index >= last
  const rowNotes: Record<number, string> = {}

  if (isFinal && final.inconsistentRow != null && final.inconsistentNote) {
    rowNotes[final.inconsistentRow] = final.inconsistentNote
  }
  const finalState: MatrixHighlight = isFinal
    ? { pivots: elimination.pivots, freeColumns: final.freeColumns ?? [], inconsistentRow: final.inconsistentRow ?? null }
    : {}

  if (index === 0) {
    return { matrix: elimination.input, highlight: { ...finalState, rowNotes } }
  }

  const step = elimination.steps[index - 1]!
  const op = step.operation
  if (op.kind === 'swap') {
    rowNotes[op.rowA] ??= `↔ ${rowLabel(op.rowB)}`
    rowNotes[op.rowB] ??= `↔ ${rowLabel(op.rowA)}`
  } else {
    const target = affectedRows(op)[0]!
    rowNotes[target] ??= formatRowOperation(op).split(' ← ')[1] ?? ''
    const source = sourceRow(op)
    if (source !== null) rowNotes[source] ??= 'source'
  }

  return {
    matrix: step.after,
    highlight: {
      pivots: elimination.pivots.filter((p) => p.col < step.pivot.col),
      activePivot: step.pivot,
      targetRows: affectedRows(op),
      sourceRow: sourceRow(op),
      changed: step.changed,
      ...finalState,
      rowNotes,
    },
  }
}
