'use client'

import Link from 'next/link'
import { useI18n } from '@/components/i18n/LanguageProvider'
import type { ToolMessage, ToolTranslationKey } from '@/lib/i18n/tools'
import { type KeyboardEvent, useCallback, useMemo, useState } from 'react'
import { MatrixEditor } from '@/components/matrix/MatrixEditor'
import { MatrixView } from '@/components/matrix/MatrixView'
import { stepView } from '@/components/steps/highlight'
import { StepControls } from '@/components/steps/StepControls'
import { StepExplanation } from '@/components/steps/StepExplanation'
import { StepHistory } from '@/components/steps/StepHistory'
import { usePlayback } from '@/components/steps/usePlayback'
import { Button } from '@/components/ui/Button'
import { Segmented, Select, Stepper } from '@/components/ui/controls'
import { Notice } from '@/components/ui/Notice'
import { useToast } from '@/components/ui/Toaster'
import { findSystemExample, solverExampleIds } from '@/data/examples/systems'
import { copyText, reducedLatex, solutionLatex, systemReportText, variableList } from '@/lib/export'
import { gridKey, makeGrid, pasteGrid, setCell } from '@/lib/grid'
import { explainStep } from '@/lib/math/explain'
import { formatNumber, variableName } from '@/lib/math/notation'
import { parseMatrixCells } from '@/lib/math/parse'
import { randomMatrix, randomSolvableSystem } from '@/lib/math/random'
import { solveAugmented } from '@/lib/math/solve'
import { loadSystem, saveSystem, useSavedAt } from '@/lib/storage/workspace'
import { LIMITS, encodeCells, joinAugmented, splitAugmented, systemHref, toCells } from '@/lib/url/problem'
import { useWorkspace } from '../WorkspaceProvider'
import { EquationPreview } from './EquationPreview'
import { SolutionReport } from './SolutionReport'
import { SolutionSummary } from './SolutionSummary'
import styles from './rref.module.css'

const { maxRows, maxCols } = LIMITS.rref

export function RrefWorkspace() {
  const { t, language } = useI18n()
  const { rref, updateRref } = useWorkspace()
  const { notify } = useToast()
  const [attempted, setAttempted] = useState(false)
  // The picker follows the loaded example (including one loaded from the URL) until the learner picks another.
  const [picked, setPicked] = useState({ base: rref.exampleId, value: rref.exampleId })
  const exampleChoice = picked.base === rref.exampleId ? picked.value : rref.exampleId
  const setExampleChoice = (value: string) => setPicked({ base: rref.exampleId, value })
  const savedAt = useSavedAt('rref')
  const report = (ok: boolean, success: ToolTranslationKey, failure: ToolTranslationKey) => notify({ key: ok ? success : failure }, ok ? 'success' : 'danger')

  const { cells, variables } = rref
  const equations = cells.length
  const key = `${variables}|${gridKey(cells)}`
  const parsed = useMemo(() => parseMatrixCells(cells), [cells])
  const analysis = useMemo(
    () => (rref.solvedKey === key && parsed.ok ? solveAugmented(parsed.matrix, variables) : null),
    [rref.solvedKey, key, parsed, variables],
  )
  const stale = rref.solvedKey !== null && rref.solvedKey !== key
  const mode = analysis ? rref.mode : 'edit'
  const labels = [...variableList(variables), 'b']

  const onIndexChange = useCallback((index: number) => updateRref({ stepIndex: index }), [updateRref])
  const playback = usePlayback({
    last: analysis?.elimination.steps.length ?? 0,
    resetKey: rref.solvedKey ?? 'unsolved',
    index: rref.stepIndex,
    onIndexChange,
  })

  // One level of undo for every action that replaces the input wholesale.
  const [undo, setUndo] = useState<{ cells: string[][]; variables: number; label: ToolMessage } | null>(null)

  const replaceInput = (next: string[][], nextVariables: number, label: ToolMessage, extra: Partial<typeof rref> = {}) => {
    setUndo({ cells, variables, label })
    setAttempted(false)
    updateRref({ cells: next, variables: nextVariables, solvedKey: null, stepIndex: 0, mode: 'edit', ...extra })
  }

  const resize = (rows: number, vars: number) => {
    const { a, b } = splitAugmented(cells)
    const resizedA = Array.from({ length: rows }, (_, i) => Array.from({ length: vars }, (_, j) => a[i]?.[j] ?? '0'))
    const resizedB = Array.from({ length: rows }, (_, i) => b[i] ?? '0')
    replaceInput(joinAugmented(resizedA, resizedB), vars, { key: 'tools.resizedSystem' })
  }

  const solve = () => {
    if (!parsed.ok) {
      setAttempted(true)
      const first = parsed.errors[0]
      if (first) document.getElementById(`rref-${first.row}-${first.col}`)?.focus()
      return
    }
    setAttempted(false)
    updateRref({ solvedKey: key, stepIndex: 0, mode: 'steps' })
  }

  const loadExample = () => {
    const example = findSystemExample(exampleChoice)
    if (!example) return
    replaceInput(joinAugmented(toCells(example.a), example.b.map(String)), example.a[0]!.length, { key: 'tools.loadedExample', params: { name: example.name } }, { exampleId: example.id })
  }

  const randomize = () => {
    if (equations === variables) {
      const { a, b } = randomSolvableSystem(variables)
      replaceInput(joinAugmented(toCells(a.map((r) => r.map(String))), b.map(String)), variables, { key: 'tools.generatedSystem' })
      notify({ key: 'tools.randomWhole' })
    } else {
      const m = randomMatrix(equations, variables + 1, Math.random, 6)
      replaceInput(m.map((r) => r.map(String)), variables, { key: 'tools.generatedSystem' })
      notify({ key: 'tools.randomSystem' })
    }
  }

  const share = async () => {
    const { a, b } = splitAugmented(cells)
    const url = new URL(window.location.href)
    url.search = new URLSearchParams({ A: encodeCells(a), b: b.join(',') }).toString()
    url.hash = ''
    report(await copyText(url.toString()), 'tools.linkCopied', 'tools.clipboardBlocked')
  }

  const save = () => {
    report(saveSystem(cells, variables), 'tools.savedBrowser', 'tools.storageUnavailable')
  }

  const restore = () => {
    const saved = loadSystem()
    if (!saved) return notify({ key: 'tools.nothingSaved' }, 'info')
    replaceInput(saved.cells, saved.variables, { key: 'tools.restoredSystemUndo' })
    notify({ key: 'tools.restoredSystem' })
  }

  const onStageKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (mode !== 'steps' || event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return
    const actions: Record<string, () => void> = {
      ArrowLeft: language === 'ar' ? playback.next : playback.previous,
      ArrowRight: language === 'ar' ? playback.previous : playback.next,
      Home: playback.first,
      End: playback.end,
    }
    const action = actions[event.key]
    if (action) {
      event.preventDefault()
      action()
    }
  }

  const solution = analysis?.solution
  const view = analysis
    ? stepView(analysis.elimination, playback.index, {
        freeColumns: solution?.kind === 'infinite' ? solution.freeVariables : [],
        inconsistentRow: solution?.kind === 'inconsistent' ? solution.row : null,
        inconsistentNote: solution?.kind === 'inconsistent' ? `0 = ${formatNumber(solution.value).text}` : undefined,
      })
    : null
  const atEnd = analysis !== null && playback.index >= playback.last
  const { a: aCells, b: bCells } = splitAugmented(cells)

  return (
    <>
      <div className={`${styles.workspace} no-print`}>
        <aside className={styles.setup} aria-labelledby="setup-heading">
          <h2 id="setup-heading" className={styles.panelHeading}>
            {t('tools.problem')}
          </h2>
          <div className={styles.sizeRow}>
            <Stepper label={t('tools.equations')} noun={t('tools.equationsNoun')} value={equations} min={1} max={maxRows} onChange={(r) => resize(r, variables)} />
            <Stepper label={t('tools.variables')} noun={t('tools.variablesNoun')} value={variables} min={1} max={maxCols} onChange={(v) => resize(equations, v)} />
          </div>
          <div className={styles.exampleRow}>
            <Select label={t('tools.example')} value={exampleChoice} onChange={setExampleChoice}>
              {solverExampleIds.map((id) => {
                const example = findSystemExample(id)!
                return (
                  <option key={id} value={id} lang="en" dir="ltr">
                    {example.name}
                  </option>
                )
              })}
            </Select>
            <Button onClick={loadExample}>{t('tools.load')}</Button>
          </div>
          <p className={styles.muted} lang="en" dir="ltr">{findSystemExample(exampleChoice)?.description}</p>
          <div className={styles.buttonRow}>
            <Button icon="shuffle" size="sm" onClick={randomize}>
              {t('tools.random')}
            </Button>
            <Button icon="reset" size="sm" onClick={() => replaceInput(makeGrid(equations, variables + 1), variables, { key: 'tools.clearedMatrix' })}>
              {t('tools.clear')}
            </Button>
          </div>
          {undo ? (
            <p className={styles.undoRow} role="status">
              {t(undo.label.key, undo.label.params)}.{' '}
              <button
                type="button"
                className={styles.undoButton}
                onClick={() => {
                  updateRref({ cells: undo.cells, variables: undo.variables, solvedKey: null, stepIndex: 0, mode: 'edit' })
                  setUndo(null)
                }}
              >
                {t('tools.undo')}
              </button>
            </p>
          ) : null}
          <details className={styles.more}>
            <summary>{t('tools.saveShare')}</summary>
            <div className={styles.buttonRow}>
              <Button icon="save" size="sm" onClick={save}>
                {t('tools.save')}
              </Button>
              <Button icon="restore" size="sm" onClick={restore} disabled={!savedAt}>
                {t('tools.restore')}
              </Button>
              <Button icon="link" size="sm" onClick={share}>
                {t('tools.copyLink')}
              </Button>
            </div>
            <p className={styles.muted}>
              {savedAt ? t('tools.lastSaved', { date: new Date(savedAt).toLocaleString(language) }) : t('tools.saveSystemHelp')}
            </p>
          </details>
        </aside>

        <section className={styles.stage} aria-labelledby="stage-heading">
          <div className={styles.stageBar}>
            <h2 id="stage-heading" className="sr-only">
              {t('tools.augmentedMatrix')}
            </h2>
            <Segmented
              label={t('tools.view')}
              hideLabel
              value={mode}
              onChange={(m) => updateRref({ mode: m })}
              options={[
                { value: 'edit', label: t('tools.editInput') },
                { value: 'steps', label: t('tools.stepThrough'), disabled: !analysis },
              ]}
            />
            <Segmented
              label={t('tools.numbers')}
              hideLabel
              size="sm"
              value={rref.format}
              onChange={(f) => updateRref({ format: f })}
              options={[
                { value: 'fraction', label: t('tools.fractions') },
                { value: 'decimal', label: t('tools.decimals') },
              ]}
            />
          </div>

          <div
            className={styles.sheet}
            onKeyDown={onStageKey}
            tabIndex={mode === 'steps' ? 0 : undefined}
            aria-keyshortcuts={mode === 'steps' ? 'ArrowLeft ArrowRight Home End' : undefined}
            aria-label={mode === 'steps' ? t('tools.stepViewer') : undefined}
            role={mode === 'steps' ? 'group' : undefined}
          >
            {mode === 'edit' ? (
              <MatrixEditor
                idPrefix="rref"
                label={t('tools.augmentedMatrixLabel')}
                cells={cells}
                augmentAt={variables}
                columnLabels={labels}
                errors={attempted && !parsed.ok ? parsed.errors : []}
                describeCell={(r, c) => (c === variables ? t('tools.equationRhs', { row: r + 1 }) : t('tools.equationCoefficient', { row: r + 1, variable: variableName(c) }))}
                onCellChange={(r, c, value) => {
                  setUndo(null)
                  updateRref({ cells: setCell(cells, r, c, value) })
                }}
                onPasteError={(message) => notify(message, 'danger')}
                onPasteGrid={(block, at) => {
                  const adopt = at.row === 0 && at.col === 0 && (block[0]?.length ?? 0) >= 2
                  const result = pasteGrid(cells, block, at, { maxRows, maxCols: maxCols + 1 })
                  const nextVars = adopt ? (result.cells[0]?.length ?? 2) - 1 : variables
                  replaceInput(result.cells, nextVars, { key: 'tools.pastedMatrix' })
                  notify({ key: result.clipped ? 'tools.pasteClipped' : 'tools.pastedMatrix' }, result.clipped ? 'info' : 'success')
                }}
              />
            ) : view ? (
              <MatrixView
                matrix={view.matrix}
                label={playback.index === 0 ? t('tools.startAugmented') : t('tools.afterAugmented', { step: playback.index })}
                augmentAt={variables}
                columnLabels={labels}
                highlight={view.highlight}
                format={rref.format}
                size="lg"
              />
            ) : null}
          </div>

          {mode === 'edit' ? (
            <div className={styles.solveRow}>
              <Button variant="primary" icon="steps" onClick={solve}>
                {t('tools.solveSteps')}
              </Button>
              <p className={styles.muted}>
                {t('tools.entryHelp')}
              </p>
            </div>
          ) : (
            <StepControls playback={playback} />
          )}
        </section>

        <section className={styles.explain} aria-labelledby="explain-heading">
          <h2 id="explain-heading" className={styles.panelHeading}>
            {t(mode === 'edit' ? 'tools.system' : 'tools.explanation')}
          </h2>
          {mode === 'edit' ? (
            <>
              {stale ? (
                <Notice tone="warning" title={t('tools.solutionCleared')}>
                  {t('tools.solutionClearedHelp')}
                </Notice>
              ) : null}
              <EquationPreview cells={cells} variables={variables} />
              <p className={styles.muted} lang="en" dir="ltr">
                Each row of [A | b] is one equation. The bar separates the coefficients from the constants.
              </p>
            </>
          ) : analysis ? (
            <>
              <StepExplanation
                elimination={analysis.elimination}
                index={playback.index}
                context={{ kind: 'system' }}
                intro={
                  <>
                    <p lang="en" dir="ltr">
                      This is the augmented matrix [A | b]. Gauss–Jordan elimination works column by column: get a nonzero
                      pivot, scale it to 1, then clear every other entry in its column.
                    </p>
                    <p>
                      {t('tools.stepCountInstruction', { count: analysis.elimination.steps.length, unit: t(analysis.elimination.steps.length === 1 ? 'tools.stepOne' : 'tools.stepMany') })}
                    </p>
                  </>
                }
              />
              {atEnd ? (
                <>
                  <SolutionSummary analysis={analysis} format={rref.format} />
                  <div className={styles.buttonRow}>
                    <Button
                      size="sm"
                      icon="copy"
                      onClick={async () => report(await copyText(systemReportText(analysis)), 'tools.stepsCopied', 'tools.clipboardBlocked')}
                    >
                      {t('tools.copySteps')}
                    </Button>
                    <Button
                      size="sm"
                      icon="copy"
                      onClick={async () =>
                        report(await copyText(`${reducedLatex(analysis)}\n${solutionLatex(analysis)}`), 'tools.latexCopied', 'tools.clipboardBlocked')
                      }
                    >
                      {t('tools.copyLatex')}
                    </Button>
                    <Button size="sm" icon="print" onClick={() => window.print()}>
                      {t('tools.printReport')}
                    </Button>
                  </div>
                  <p className={styles.links}>
                    <Link href={systemHref('/practice/custom/', aCells, bCells)}>{t('tools.practiceSystem')}</Link>
                    {equations === variables ? (
                      <Link href={systemHref('/tools/cramer/', aCells, bCells)}>{t('tools.tryCramer')}</Link>
                    ) : null}
                  </p>
                </>
              ) : (
                <p className={styles.muted}>{t('tools.keepStepping')}</p>
              )}
              <details className={styles.more} open>
                <summary>{t('tools.allSteps')}</summary>
                <StepHistory
                  current={playback.index}
                  onSelect={playback.goTo}
                  items={[
                    { title: t('tools.startMatrix') },
                    ...analysis.elimination.steps.map((s) => {
                      const e = explainStep(s, { kind: 'system' })
                      return { title: e.title, detail: e.operation }
                    }),
                  ]}
                />
              </details>
            </>
          ) : null}
        </section>
      </div>
      {analysis ? <SolutionReport analysis={analysis} /> : null}
    </>
  )
}
