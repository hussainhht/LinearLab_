'use client'

import { useI18n } from '@/components/i18n/LanguageProvider'
import type { ToolMessage } from '@/lib/i18n/tools'
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
  const { t, error } = useI18n()
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

  const [undo, setUndo] = useState<{ name: MatrixName; cells: string[][]; label: ToolMessage } | null>(null)
  const setGrid = (name: MatrixName, cells: string[][]) => updateMatrices(name === 'A' ? { a: cells } : { b: cells })
  /** Replaces a whole matrix and remembers the old one for a single undo. */
  const replaceGrid = (name: MatrixName, cells: string[][], label: ToolMessage) => {
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
      notify({ key: 'tools.fixEntries' }, 'danger')
      return
    }
    setAttempted(false)
    updateMatrices({ lastRun: { op, target: matrices.target, key: inputKey } })
  }

  const onCopy = async (m: Matrix) => {
    const ok = await copyText(`${matrixToText(m)}\n\n${matrixToLatex(m)}`)
    notify({ key: ok ? 'tools.copiedTextLatex' : 'tools.copyFailed' }, ok ? 'success' : 'danger')
  }

  const onUseResult = (m: Matrix, into: MatrixName) => {
    replaceGrid(into, m.map((r) => r.map(String)), { key: 'tools.resultInto', params: { name: into } })
  }

  const shareLink = async () => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams({ A: encodeCells(matrices.a), B: encodeCells(matrices.b), k: matrices.scalar.replace(/[,;]/g, '') })
    if (run) params.set('op', run.op)
    url.search = params.toString()
    const ok = await copyText(url.toString())
    notify({ key: ok ? 'tools.linkCopied' : 'tools.copyFailed' }, ok ? 'success' : 'danger')
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
          {t('tools.operation')}
        </h2>
        <div className={styles.opsSettings}>
          <Segmented
            label={t('tools.singleMatrix')}
            value={matrices.target}
            onChange={(t) => updateMatrices({ target: t })}
            options={[
              { value: 'A', label: t('tools.matrixNamed', { name: 'A' }) },
              { value: 'B', label: t('tools.matrixNamed', { name: 'B' }) },
            ]}
          />
          <TextField
            label={t('tools.scalar')}
            value={matrices.scalar}
            onChange={(v) => updateMatrices({ scalar: v })}
            error={!parsedK.ok && attempted ? error(parsedK.error) : null}
            className={styles.scalar}
          />
          <Segmented
            label={t('tools.numbers')}
            value={matrices.format}
            onChange={(f) => updateMatrices({ format: f })}
            options={[
              { value: 'fraction', label: t('tools.fractions') },
              { value: 'decimal', label: t('tools.decimals') },
            ]}
          />
        </div>
        <div className={styles.opGroups}>
          {(Object.keys(GROUP_LABELS) as (keyof typeof GROUP_LABELS)[]).map((group) => (
            <div key={group} className={styles.opGroup} role="group" aria-label={t(`tools.group.${group}`)}>
              <p className={styles.opGroupLabel}>{t(`tools.group.${group}`)}</p>
              <div className={styles.opButtons}>
                {OPERATIONS.filter((o) => o.group === group).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={styles.opButton}
                    aria-pressed={current?.op === o.id}
                    onClick={() => runOperation(o.id)}
                  >
                    <span className={styles.opNotation} lang="en" dir="ltr">{o.notation.replace('X', matrices.target)}</span>
                    <span className={styles.opLabel}>{t(`tools.op.${o.id}`)}</span>
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
              notify({ key: ok ? 'tools.savedBrowser' : 'tools.storageUnavailable' }, ok ? 'success' : 'danger')
            }}
          >
            {t('tools.save')}
          </Button>
          <Button
            size="sm"
            icon="restore"
            disabled={!savedAt}
            onClick={() => {
              const saved = loadMatrices()
              if (!saved) return notify({ key: 'tools.nothingSaved' }, 'info')
              setUndo(null)
              updateMatrices({ a: saved.a, b: saved.b, scalar: saved.scalar, lastRun: null })
              notify({ key: 'tools.restoredMatrices' })
            }}
          >
            {t('tools.restore')}
          </Button>
          <Button size="sm" icon="link" onClick={shareLink}>
            {t('tools.copyLink')}
          </Button>
        </div>
      </section>

      <section className={styles.output} aria-labelledby="result-heading" aria-live="polite">
        <h2 id="result-heading" className={styles.panelHeading}>
          {t('tools.result')}
        </h2>
        {stale ? (
          <Notice
            tone="warning"
            title={t('tools.inputsChanged')}
            actions={
              <Button size="sm" variant="primary" onClick={() => runOperation(run.op)}>
                {t('tools.runAgain', { operation: t(`tools.op.${run.op}`).toLocaleLowerCase() })}
              </Button>
            }
          >
            {t('tools.resultClearedHelp')}
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
          <p className={styles.empty}>{t('tools.chooseOperation')}</p>
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
  onReplace: (cells: string[][], label: ToolMessage) => void
  undoLabel: ToolMessage | null
  onUndo: () => void
  notify: ReturnType<typeof useToast>['notify']
}

function MatrixPanel({ name, cells, errors, onEdit, onReplace, undoLabel, onUndo, notify }: MatrixPanelProps) {
  const { t } = useI18n()
  const [example, setExample] = useState<string>(name === 'A' ? 'three-a' : 'three-b')
  const rows = cells.length
  const cols = cells[0]?.length ?? 1
  const fill = (kind: 'identity' | 'zero' | 'random') => {
    if (kind === 'identity') {
      const n = rows
      onReplace(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? '1' : '0'))), { key: 'tools.filledIdentity', params: { name, size: n } })
    } else if (kind === 'zero') onReplace(makeGrid(rows, cols), { key: 'tools.filledZero', params: { name } })
    else onReplace(randomMatrix(rows, cols).map((r) => r.map(String)), { key: 'tools.filledRandom', params: { name } })
  }
  return (
    <section className={styles.matrixPanel} aria-labelledby={`matrix-${name}`}>
      <div className={styles.matrixHead}>
        <h2 id={`matrix-${name}`} className={styles.matrixName}>
          <bdi lang="en" dir="ltr">{name}</bdi>
        </h2>
        <Stepper label={t('tools.rows')} noun={t('tools.rowsIn', { name })} value={rows} min={1} max={maxRows} onChange={(r) => onEdit(resizeGrid(cells, r, cols))} />
        <Stepper label={t('tools.columns')} noun={t('tools.columnsIn', { name })} value={cols} min={1} max={maxCols} onChange={(c) => onEdit(resizeGrid(cells, rows, c))} />
      </div>
      <MatrixEditor
        idPrefix={`m${name}`}
        label={t('tools.matrixNamed', { name })}
        cells={cells}
        errors={errors}
        size="sm"
        describeCell={(r, c) => t('tools.matrixCell', { name, row: r + 1, col: c + 1 })}
        onCellChange={(r, c, v) => onEdit(setCell(cells, r, c, v))}
        onPasteError={(m) => notify(m, 'danger')}
        onPasteGrid={(block, at) => {
          const result = pasteGrid(cells, block, at, { maxRows, maxCols })
          onReplace(result.cells, { key: 'tools.pastedNamed', params: { name } })
          notify({ key: result.clipped ? 'tools.pasteBeyond' : 'tools.pastedNamed', params: { name } }, result.clipped ? 'info' : 'success')
        }}
      />
      <div className={styles.fillRow}>
        <Button size="sm" variant="quiet" onClick={() => fill('identity')}>
          {t('tools.identity')}
        </Button>
        <Button size="sm" variant="quiet" onClick={() => fill('zero')}>
          {t('tools.zero')}
        </Button>
        <Button size="sm" variant="quiet" icon="shuffle" onClick={() => fill('random')}>
          {t('tools.random')}
        </Button>
      </div>
      {undoLabel ? (
        <p className={styles.undoRow} role="status">
          {t(undoLabel.key, undoLabel.params)}.{' '}
          <button type="button" className={styles.undoButton} onClick={onUndo}>
            {t('tools.undo')}
          </button>
        </p>
      ) : null}
      <div className={styles.exampleRow}>
        <Select label={t('tools.exampleFor', { name })} value={example} onChange={setExample}>
          {matrixExamples.map((e) => (
            <option key={e.id} value={e.id} lang="en" dir="ltr">
              {e.name}: {e.description}
            </option>
          ))}
        </Select>
        <Button
          size="sm"
          onClick={() => {
            const e = findMatrixExample(example)
            if (e) onReplace(toCells(e.values), { key: 'tools.loadedInto', params: { example: e.name, name } })
          }}
        >
          {t('tools.load')}
        </Button>
      </div>
    </section>
  )
}
