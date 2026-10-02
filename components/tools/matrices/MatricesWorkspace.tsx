'use client'

import { useMemo, useState } from 'react'
import { MatrixEditor } from '@/components/matrix/MatrixEditor'
import { Button } from '@/components/ui/Button'
import { Segmented, Select, Stepper, TextField } from '@/components/ui/controls'
import { Notice } from '@/components/ui/Notice'
import { useToast } from '@/components/ui/Toaster'
import { findMatrixExample, matrixExamples } from '@/data/examples/matrices'
import { copyText } from '@/lib/export'
import { gridKey, makeGrid, pasteGrid, resizeGrid, setCell } from '@/lib/grid'
import type { Matrix } from '@/lib/math/matrix'
import { matrixToLatex, matrixToText } from '@/lib/math/notation'
import { type CellError, parseMatrixCells } from '@/lib/math/parse'
import { randomMatrix } from '@/lib/math/random'
import { parseRational } from '@/lib/math/rational'
import { loadMatrices, saveMatrices, useSavedAt } from '@/lib/storage/workspace'
import { LIMITS, encodeCells, toCells } from '@/lib/url/problem'
import { useWorkspace } from '../WorkspaceProvider'
import { GROUP_LABELS, type MatrixName, OPERATIONS, type OperationId, operationInfo } from './operations'
import { OperationResult } from './OperationResult'
import styles from './matrices.module.css'

const { maxRows, maxCols } = LIMITS.matrix

export function MatricesWorkspace() {
  const { matrices, updateMatrices } = useWorkspace()
  const { notify } = useToast()
  const [attempted, setAttempted] = useState(false)
  const savedAt = useSavedAt('matrices')

  const parsedA = useMemo(() => parseMatrixCells(matrices.a), [matrices.a])
  const parsedB = useMemo(() => parseMatrixCells(matrices.b), [matrices.b])
  const parsedK = useMemo(() => parseRational(matrices.scalar), [matrices.scalar])
  const inputKey = `${gridKey(matrices.a)}|${gridKey(matrices.b)}|${matrices.scalar}|${matrices.target}`
  const run = matrices.lastRun
  const current = run && run.key === inputKey && parsedA.ok && parsedB.ok ? run : null
  const stale = run !== null && run.key !== inputKey

  const [undo, setUndo] = useState<{ name: MatrixName; cells: string[][]; label: string } | null>(null)
  const setGrid = (name: MatrixName, cells: string[][]) => updateMatrices(name === 'A' ? { a: cells } : { b: cells })
  /** Replaces a whole matrix and remembers the old one for a single undo. */
  const replaceGrid = (name: MatrixName, cells: string[][], label: string) => {
    setUndo({ name, cells: name === 'A' ? matrices.a : matrices.b, label })
    setGrid(name, cells)
  }

  const runOperation = (op: OperationId) => {
    const info = operationInfo(op)
    const needsA = info.binary || matrices.target === 'A'
    const needsB = info.binary || matrices.target === 'B'
    const bad = (needsA && !parsedA.ok) || (needsB && !parsedB.ok) || (op === 'scalar' && !parsedK.ok)
    if (bad) {
      setAttempted(true)
      notify('Fix the highlighted entries first', 'danger')
      return
    }
    setAttempted(false)
    updateMatrices({ lastRun: { op, target: matrices.target, key: inputKey } })
  }

  const onCopy = async (m: Matrix) => {
    const ok = await copyText(`${matrixToText(m)}\n\n${matrixToLatex(m)}`)
    notify(ok ? 'Copied as text and LaTeX' : 'Copying failed', ok ? 'success' : 'danger')
  }

  const onUseResult = (m: Matrix, into: MatrixName) => {
    replaceGrid(into, m.map((r) => r.map(String)), `Copied the result into ${into}`)
  }

  const shareLink = async () => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams({ A: encodeCells(matrices.a), B: encodeCells(matrices.b), k: matrices.scalar.replace(/[,;]/g, '') })
    if (run) params.set('op', run.op)
    url.search = params.toString()
    const ok = await copyText(url.toString())
    notify(ok ? 'Link copied' : 'Copying failed', ok ? 'success' : 'danger')
  }

  return (
    <div className={styles.workspace}>
      <div className={styles.inputs}>
        {(['A', 'B'] as const).map((name) => (
          <MatrixPanel
            key={name}
            name={name}
            cells={name === 'A' ? matrices.a : matrices.b}
            errors={attempted ? errorsOf(name === 'A' ? parsedA : parsedB) : []}
            onEdit={(cells) => {
              setUndo(null)
              setGrid(name, cells)
            }}
            onReplace={(cells, label) => replaceGrid(name, cells, label)}
            undoLabel={undo?.name === name ? undo.label : null}
            onUndo={() => {
              if (!undo) return
              setGrid(undo.name, undo.cells)
              setUndo(null)
            }}
            notify={notify}
          />
        ))}
      </div>

      <section className={styles.operations} aria-labelledby="ops-heading">
        <h2 id="ops-heading" className={styles.panelHeading}>
          Operation
        </h2>
        <div className={styles.opsSettings}>
          <Segmented
            label="Single-matrix operations use"
            value={matrices.target}
            onChange={(t) => updateMatrices({ target: t })}
            options={[
              { value: 'A', label: 'Matrix A' },
              { value: 'B', label: 'Matrix B' },
            ]}
          />
          <TextField
            label="Scalar k"
            value={matrices.scalar}
            onChange={(v) => updateMatrices({ scalar: v })}
            error={!parsedK.ok && attempted ? parsedK.error : null}
            className={styles.scalar}
          />
          <Segmented
            label="Numbers"
            value={matrices.format}
            onChange={(f) => updateMatrices({ format: f })}
            options={[
              { value: 'fraction', label: 'Fractions' },
              { value: 'decimal', label: 'Decimals' },
            ]}
          />
        </div>
        <div className={styles.opGroups}>
          {(Object.keys(GROUP_LABELS) as (keyof typeof GROUP_LABELS)[]).map((group) => (
            <div key={group} className={styles.opGroup} role="group" aria-label={GROUP_LABELS[group]}>
              <p className={styles.opGroupLabel}>{GROUP_LABELS[group]}</p>
              <div className={styles.opButtons}>
                {OPERATIONS.filter((o) => o.group === group).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={styles.opButton}
                    aria-pressed={current?.op === o.id}
                    onClick={() => runOperation(o.id)}
                  >
                    <span className={styles.opNotation}>{o.notation.replace('X', matrices.target)}</span>
                    <span className={styles.opLabel}>{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonRow}>
          <Button
            size="sm"
            icon="save"
            onClick={() => {
              const ok = saveMatrices(matrices.a, matrices.b, matrices.scalar)
              notify(ok ? 'Saved in this browser' : 'Saving failed: browser storage is unavailable', ok ? 'success' : 'danger')
            }}
          >
            Save
          </Button>
          <Button
            size="sm"
            icon="restore"
            disabled={!savedAt}
            onClick={() => {
              const saved = loadMatrices()
              if (!saved) return notify('Nothing saved yet', 'info')
              setUndo(null)
              updateMatrices({ a: saved.a, b: saved.b, scalar: saved.scalar, lastRun: null })
              notify('Restored your saved matrices')
            }}
          >
            Restore
          </Button>
          <Button size="sm" icon="link" onClick={shareLink}>
            Copy link
          </Button>
        </div>
      </section>

      <section className={styles.output} aria-labelledby="result-heading" aria-live="polite">
        <h2 id="result-heading" className={styles.panelHeading}>
          Result
        </h2>
        {stale ? (
          <Notice
            tone="warning"
            title="The inputs changed"
            actions={
              <Button size="sm" variant="primary" onClick={() => runOperation(run.op)}>
                Run {operationInfo(run.op).label.toLowerCase()} again
              </Button>
            }
          >
            The last result no longer matches A, B or k, so it was cleared.
          </Notice>
        ) : current && parsedA.ok && parsedB.ok && parsedK.ok ? (
          <OperationResult
            op={current.op}
            a={parsedA.matrix}
            b={parsedB.matrix}
            k={parsedK.value}
            target={current.target}
            format={matrices.format}
            inputKey={inputKey}
            onUseResult={onUseResult}
            onCopy={onCopy}
          />
        ) : (
          <p className={styles.empty}>Choose an operation. The result and an explanation of how it was found appear here.</p>
        )}
      </section>
    </div>
  )
}

function errorsOf(result: ReturnType<typeof parseMatrixCells>): readonly CellError[] {
  return result.ok ? [] : result.errors
}

interface MatrixPanelProps {
  name: MatrixName
  cells: string[][]
  errors: readonly CellError[]
  /** Small edits: typing in a cell or resizing. */
  onEdit: (cells: string[][]) => void
  /** Whole-matrix replacements, which can be undone. */
  onReplace: (cells: string[][], label: string) => void
  undoLabel: string | null
  onUndo: () => void
  notify: (message: string, tone?: 'success' | 'info' | 'danger') => void
}

function MatrixPanel({ name, cells, errors, onEdit, onReplace, undoLabel, onUndo, notify }: MatrixPanelProps) {
  const [example, setExample] = useState<string>(name === 'A' ? 'three-a' : 'three-b')
  const rows = cells.length
  const cols = cells[0]?.length ?? 1
  const fill = (kind: 'identity' | 'zero' | 'random') => {
    if (kind === 'identity') {
      const n = rows
      onReplace(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? '1' : '0'))), `Filled ${name} with I${n}`)
    } else if (kind === 'zero') onReplace(makeGrid(rows, cols), `Filled ${name} with zeros`)
    else onReplace(randomMatrix(rows, cols).map((r) => r.map(String)), `Filled ${name} with random integers`)
  }
  return (
    <section className={styles.matrixPanel} aria-labelledby={`matrix-${name}`}>
      <div className={styles.matrixHead}>
        <h2 id={`matrix-${name}`} className={styles.matrixName}>
          {name}
        </h2>
        <Stepper label="Rows" noun={`rows in ${name}`} value={rows} min={1} max={maxRows} onChange={(r) => onEdit(resizeGrid(cells, r, cols))} />
        <Stepper label="Columns" noun={`columns in ${name}`} value={cols} min={1} max={maxCols} onChange={(c) => onEdit(resizeGrid(cells, rows, c))} />
      </div>
      <MatrixEditor
        idPrefix={`m${name}`}
        label={`Matrix ${name}`}
        cells={cells}
        errors={errors}
        size="sm"
        describeCell={(r, c) => `${name} row ${r + 1}, column ${c + 1}`}
        onCellChange={(r, c, v) => onEdit(setCell(cells, r, c, v))}
        onPasteError={(m) => notify(m, 'danger')}
        onPasteGrid={(block, at) => {
          const result = pasteGrid(cells, block, at, { maxRows, maxCols })
          onReplace(result.cells, `Pasted into ${name}`)
          notify(result.clipped ? 'Pasted; entries beyond the matrix were left out' : `Pasted into ${name}`, result.clipped ? 'info' : 'success')
        }}
      />
      <div className={styles.fillRow}>
        <Button size="sm" variant="quiet" onClick={() => fill('identity')}>
          Identity
        </Button>
        <Button size="sm" variant="quiet" onClick={() => fill('zero')}>
          Zero
        </Button>
        <Button size="sm" variant="quiet" icon="shuffle" onClick={() => fill('random')}>
          Random
        </Button>
      </div>
      {undoLabel ? (
        <p className={styles.undoRow} role="status">
          {undoLabel}.{' '}
          <button type="button" className={styles.undoButton} onClick={onUndo}>
            Undo
          </button>
        </p>
      ) : null}
      <div className={styles.exampleRow}>
        <Select label={`Example for ${name}`} value={example} onChange={setExample}>
          {matrixExamples.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}: {e.description}
            </option>
          ))}
        </Select>
        <Button
          size="sm"
          onClick={() => {
            const e = findMatrixExample(example)
            if (e) onReplace(toCells(e.values), `Loaded “${e.name}” into ${name}`)
          }}
        >
          Load
        </Button>
      </div>
    </section>
  )
}
