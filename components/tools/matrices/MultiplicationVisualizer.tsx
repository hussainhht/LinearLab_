'use client'

import { MatrixView } from '@/components/matrix/MatrixView'
import { RationalText } from '@/components/matrix/RationalText'
import { StepControls } from '@/components/steps/StepControls'
import { usePlayback } from '@/components/steps/usePlayback'
import { Button } from '@/components/ui/Button'
import type { Matrix, Position } from '@/lib/math/matrix'
import { traceMultiplication } from '@/lib/math/multiplication'
import { type NumberFormat, subscript } from '@/lib/math/notation'
import styles from './matrices.module.css'

interface MultiplicationVisualizerProps {
  a: Matrix
  b: Matrix
  format: NumberFormat
  /** Changes whenever A or B change, which restarts the walkthrough. */
  inputKey: string
}

/**
 * Walks through A×B one product at a time. Everything on screen is derived
 * from a single step index, so there are no timers or DOM lookups that could
 * act on an outdated calculation.
 */
export function MultiplicationVisualizer({ a, b, format, inputKey }: MultiplicationVisualizerProps) {
  const trace = traceMultiplication(a, b)
  const k = a[0]!.length
  const total = trace.entries.length * k
  const playback = usePlayback({ last: total, resetKey: inputKey })
  const { index } = playback

  // Index i reveals i products in row-major order; index 0 shows nothing computed.
  const entryIndex = index === 0 ? -1 : Math.floor((index - 1) / k)
  const termsShown = index === 0 ? 0 : ((index - 1) % k) + 1
  const current = entryIndex >= 0 ? trace.entries[entryIndex]! : null
  const entryDone = current !== null && termsShown === k
  const completedEntries = entryIndex + (entryDone ? 1 : 0)

  const hiddenCells: Position[] = trace.entries.slice(completedEntries).map((e) => ({ row: e.row, col: e.col }))
  const term = current && termsShown > 0 ? current.terms[termsShown - 1]! : null

  return (
    <div className={styles.multiply}>
      <div className={styles.multiplyStage}>
        <MatrixView
          matrix={a}
          label="Matrix A"
          caption="A"
          format={format}
          showRowLabels={false}
          highlight={{
            focusRow: current?.row ?? null,
            focusCells: term ? [{ row: current!.row, col: term.k }] : [],
          }}
        />
        <span className={styles.operator} aria-hidden="true">
          ×
        </span>
        <MatrixView
          matrix={b}
          label="Matrix B"
          caption="B"
          format={format}
          showRowLabels={false}
          highlight={{
            focusColumn: current?.col ?? null,
            focusCells: term ? [{ row: term.k, col: current!.col }] : [],
          }}
        />
        <span className={styles.operator} aria-hidden="true">
          =
        </span>
        <MatrixView
          matrix={trace.result}
          label="Product C = AB"
          caption="C = AB"
          format={format}
          showRowLabels={false}
          highlight={{
            hiddenCells,
            activePivot: current ? { row: current.row, col: current.col } : null,
          }}
        />
      </div>

      <StepControls playback={playback} unit="product" label="Multiplication controls" />
      <div className={styles.buttonRow}>
        <Button size="sm" icon="last" onClick={playback.end} disabled={index >= total}>
          Show final result
        </Button>
        <Button size="sm" icon="reset" onClick={playback.first} disabled={index === 0}>
          Reset
        </Button>
      </div>

      <div className={styles.calculation} aria-live="polite">
        {current ? (
          <>
            <p className={styles.calcHeading}>
              c{subscript(current.row + 1)}
              {subscript(current.col + 1)} = row {current.row + 1} of A · column {current.col + 1} of B
            </p>
            <p className={`${styles.calcLine} num`}>
              {current.terms.slice(0, termsShown).map((t, i) => (
                <span key={i} className={styles.calcTerm} data-current={i === termsShown - 1 || undefined}>
                  {i > 0 ? <span className={styles.plus}>+</span> : null}
                  <span>(</span>
                  <RationalText value={t.a} format={format} />
                  <span>)(</span>
                  <RationalText value={t.b} format={format} />
                  <span>)</span>
                </span>
              ))}
              {termsShown < k ? <span className={styles.pending}> + …</span> : null}
            </p>
            <p className={`${styles.calcLine} num`}>
              <span className={styles.calcLabel}>Running sum</span>
              {current.partialSums.slice(0, termsShown).map((s, i) => (
                <span key={i} className={styles.calcTerm}>
                  {i > 0 ? <span className={styles.plus}>→</span> : null}
                  <RationalText value={s} format={format} />
                </span>
              ))}
            </p>
            {entryDone ? (
              <p className={styles.calcResult}>
                c{subscript(current.row + 1)}
                {subscript(current.col + 1)} = <RationalText value={current.value} format={format} />
                {index >= total ? ' — every entry of C is computed.' : ''}
              </p>
            ) : null}
          </>
        ) : (
          <p className={styles.muted}>
            Entry c<sub>ij</sub> of the product is row i of A times column j of B: multiply matching entries and add them up.
            Press Play or step forward to compute C one product at a time.
          </p>
        )}
      </div>
    </div>
  )
}
