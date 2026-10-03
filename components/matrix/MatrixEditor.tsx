'use client'

import { type ClipboardEvent, type KeyboardEvent, useRef } from 'react'
import type { CellError } from '@/lib/math/parse'
import { splitPastedMatrix } from '@/lib/math/parse'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { Icon } from '@/components/ui/Icon'
import styles from './MatrixEditor.module.css'

export interface MatrixEditorProps {
  cells: readonly (readonly string[])[]
  onCellChange: (row: number, col: number, value: string) => void
  /** Called when a multi-entry block is pasted into a cell. */
  onPasteGrid?: (grid: string[][], at: { row: number; col: number }) => void
  onPasteError?: (message: string) => void
  errors?: readonly CellError[]
  augmentAt?: number
  columnLabels?: readonly string[]
  /** Accessible name for the whole grid. */
  label: string
  /** Name for an individual entry; defaults to "Row i, column j". */
  describeCell?: (row: number, col: number) => string
  idPrefix: string
  size?: 'md' | 'sm'
}

/**
 * Editable matrix. Arrow keys move between entries (left/right at the edges
 * of the text), Enter moves down, and pasting a block of numbers fills the
 * grid from the focused entry.
 */
export function MatrixEditor({
  cells,
  onCellChange,
  onPasteGrid,
  onPasteError,
  errors = [],
  augmentAt,
  columnLabels,
  label,
  describeCell,
  idPrefix,
  size = 'md',
}: MatrixEditorProps) {
  const { t, error: localizeError } = useI18n()
  const inputs = useRef(new Map<string, HTMLInputElement>())
  const rows = cells.length
  const cols = cells[0]?.length ?? 0
  const errorAt = (r: number, c: number) => errors.find((e) => e.row === r && e.col === c)
  const name = (r: number, c: number) => describeCell?.(r, c) ?? t('matrix.cell', { row: r + 1, col: c + 1 })

  const focusCell = (r: number, c: number) => {
    const el = inputs.current.get(`${r}:${c}`)
    if (el) {
      el.focus()
      el.select()
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>, r: number, c: number) => {
    const el = event.currentTarget
    const atStart = el.selectionStart === 0 && el.selectionEnd === 0
    const atEnd = el.selectionStart === el.value.length && el.selectionEnd === el.value.length
    let next: [number, number] | null = null
    if (event.key === 'ArrowUp') next = [r - 1, c]
    else if (event.key === 'ArrowDown' || (event.key === 'Enter' && !event.shiftKey)) next = [r + 1, c]
    else if (event.key === 'Enter' && event.shiftKey) next = [r - 1, c]
    else if (event.key === 'ArrowLeft' && atStart) next = c > 0 ? [r, c - 1] : [r - 1, cols - 1]
    else if (event.key === 'ArrowRight' && atEnd) next = c < cols - 1 ? [r, c + 1] : [r + 1, 0]
    if (!next) return
    const [nr, nc] = next
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return
    event.preventDefault()
    focusCell(nr, nc)
  }

  const onPaste = (event: ClipboardEvent<HTMLInputElement>, r: number, c: number) => {
    if (!onPasteGrid) return
    const text = event.clipboardData.getData('text')
    if (!/[\t\n;,]|\S\s+\S|\[/.test(text.trim())) return // a single value: let the browser paste it
    event.preventDefault()
    const result = splitPastedMatrix(text)
    if (result.ok) onPasteGrid(result.cells, { row: r, col: c })
    else onPasteError?.(result.error)
  }

  return (
    <div className={`${styles.editor} ${size === 'sm' ? styles.sm : ''}`}>
      <div className={styles.scroller}>
        <table dir="ltr" className={styles.table} aria-label={label}>
          {columnLabels ? (
            <thead>
              <tr>
                {columnLabels.map((l, j) => (
                  <th key={j} scope="col" className={styles.columnLabel} data-augment={augmentAt === j || undefined}>
                    {l}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {cells.map((row, r) => (
              <tr key={r} className={styles.row}>
                {row.map((value, c) => {
                  const error = errorAt(r, c)
                  const id = `${idPrefix}-${r}-${c}`
                  return (
                    <td
                      key={c}
                      className={styles.cell}
                      data-first={c === 0 || undefined}
                      data-last={c === cols - 1 || undefined}
                      data-augment={augmentAt === c || undefined}
                    >
                      <input
                        id={id}
                        dir="ltr"
                        ref={(el) => {
                          if (el) inputs.current.set(`${r}:${c}`, el)
                          else inputs.current.delete(`${r}:${c}`)
                        }}
                        className={`${styles.input} num`}
                        value={value}
                        onChange={(e) => onCellChange(r, c, e.target.value)}
                        onKeyDown={(e) => onKeyDown(e, r, c)}
                        onPaste={(e) => onPaste(e, r, c)}
                        onFocus={(e) => e.currentTarget.select()}
                        aria-label={name(r, c)}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? `${id}-error` : undefined}
                        inputMode="text"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        enterKeyHint="next"
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errors.length > 0 ? (
        <div className={styles.errors} role="alert">
          <p className={styles.errorsTitle}>
            <Icon name="alert" size={16} />
            {t(errors.length === 1 ? 'matrix.fixOne' : 'matrix.fixMany', { count: errors.length })}
          </p>
          <ul>
            {errors.map((e) => (
              <li key={`${e.row}-${e.col}`} id={`${idPrefix}-${e.row}-${e.col}-error`}>
                <button type="button" className={styles.errorLink} onClick={() => focusCell(e.row, e.col)}>
                  {name(e.row, e.col)}
                </button>
                : {localizeError(e.message)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
