import { T, LocalizedSpan } from '@/components/i18n/LanguageProvider'
import type { ReactNode } from 'react'
import type { Matrix, Position } from '@/lib/math/matrix'
import { type NumberFormat, rowLabel } from '@/lib/math/notation'
import { RationalText } from './RationalText'
import styles from './MatrixView.module.css'

export interface MatrixHighlight {
  /** Pivot positions already established (outlined ring). */
  readonly pivots?: readonly Position[]
  /** The pivot the current step works on (highlighter fill + ring). */
  readonly activePivot?: Position | null
  readonly targetRows?: readonly number[]
  readonly sourceRow?: number | null
  readonly changed?: readonly Position[]
  readonly freeColumns?: readonly number[]
  readonly inconsistentRow?: number | null
  /** Short annotations shown beside a row, e.g. "R₂ − 3R₁". */
  readonly rowNotes?: Readonly<Record<number, string>>
  /** Row and column bands, used by the multiplication visualizer. */
  readonly focusRow?: number | null
  readonly focusColumn?: number | null
  /** Individual cells to ring, e.g. the factors of the current product. */
  readonly focusCells?: readonly Position[]
  /** Cells whose value is not yet known (shown as "?"). */
  readonly hiddenCells?: readonly Position[]
}

interface MatrixViewProps {
  matrix: Matrix
  /** Accessible name, e.g. "Matrix after step 3". */
  label: string
  format?: NumberFormat
  augmentAt?: number
  columnLabels?: readonly string[]
  showRowLabels?: boolean
  highlight?: MatrixHighlight
  size?: 'sm' | 'md' | 'lg'
  /** Visible caption above the matrix. */
  caption?: ReactNode
}

const has = (list: readonly Position[] | undefined, row: number, col: number) =>
  list?.some((p) => p.row === row && p.col === col) ?? false

/** Read-only matrix with textbook brackets and step annotations. */
export function MatrixView({
  matrix,
  label,
  format = 'fraction',
  augmentAt,
  columnLabels,
  showRowLabels = true,
  highlight = {},
  size = 'md',
  caption,
}: MatrixViewProps) {
  const freeColumns = highlight.freeColumns ?? []
  const hasNotes = Boolean(highlight.rowNotes && Object.keys(highlight.rowNotes).length > 0) || highlight.inconsistentRow != null

  return (
    <figure className={`${styles.figure} ${styles[size]}`}>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      <div className={styles.scroller}>
        <table dir="ltr" className={styles.table}>
          <caption className="sr-only">{label}</caption>
          {columnLabels ? (
            <thead>
              <tr>
                {showRowLabels ? <td className={styles.corner} /> : null}
                {columnLabels.map((name, j) => (
                  <th
                    key={j}
                    scope="col"
                    className={styles.columnLabel}
                    data-augment={augmentAt === j || undefined}
                    data-free={freeColumns.includes(j) || undefined}
                  >
                    {name}
                    {freeColumns.includes(j) ? <span dir="auto" className={styles.freeTag}><T k="matrix.free" /></span> : null}
                  </th>
                ))}
                {hasNotes ? <td className={styles.corner} /> : null}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {matrix.map((row, i) => {
              const isTarget = highlight.targetRows?.includes(i) ?? false
              const isSource = highlight.sourceRow === i
              const isInconsistent = highlight.inconsistentRow === i
              const isFocusRow = highlight.focusRow === i
              const note = highlight.rowNotes?.[i]
              return (
                <tr
                  key={i}
                  className={styles.row}
                  data-target={isTarget || undefined}
                  data-source={isSource || undefined}
                  data-inconsistent={isInconsistent || undefined}
                  data-focus-row={isFocusRow || undefined}
                >
                  {showRowLabels ? (
                    <th scope="row" className={styles.rowLabel}>
                      {rowLabel(i)}
                      {isTarget ? <span className="sr-only" dir="auto"><T k="matrix.target" /></span> : null}
                      {isSource ? <span className="sr-only" dir="auto"><T k="matrix.source" /></span> : null}
                    </th>
                  ) : null}
                  {row.map((value, j) => {
                    const pivot = has(highlight.pivots, i, j)
                    const active = highlight.activePivot?.row === i && highlight.activePivot.col === j
                    const changed = has(highlight.changed, i, j)
                    const hidden = has(highlight.hiddenCells, i, j)
                    const focused = has(highlight.focusCells, i, j)
                    const first = j === 0
                    const last = j === row.length - 1
                    return (
                      <td
                        key={j}
                        className={styles.cell}
                        data-first={first || undefined}
                        data-last={last || undefined}
                        data-augment={augmentAt === j || undefined}
                        data-pivot={pivot || active || undefined}
                        data-active-pivot={active || undefined}
                        data-changed={changed || undefined}
                        data-free={freeColumns.includes(j) || undefined}
                        data-focus-col={highlight.focusColumn === j || undefined}
                        data-focus-cell={focused || undefined}
                        data-hidden={hidden || undefined}
                        data-zero={(!hidden && value.isZero()) || undefined}
                      >
                        <span className={styles.value}>
                          {hidden ? <LocalizedSpan labelKey="matrix.notComputed">?</LocalizedSpan> : <RationalText value={value} format={format} />}
                        </span>
                        {active ? <span className="sr-only" dir="auto"><T k="matrix.currentPivot" /></span> : pivot ? <span className="sr-only" dir="auto"><T k="matrix.pivot" /></span> : null}
                        {changed ? <span className="sr-only" dir="auto"><T k="matrix.changed" /></span> : null}
                      </td>
                    )
                  })}
                  {hasNotes ? (
                    <td className={styles.note}>
                      {note || isInconsistent ? (
                        <span
                          className={isInconsistent ? styles.noteDanger : isSource ? styles.noteSource : styles.noteTarget}
                        >
                          {note ?? <T k="matrix.noSolution" />}
                        </span>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
