'use client'

import { type FormEvent, useMemo, useState } from 'react'
import { useI18n } from '@/components/i18n/LanguageProvider'
import type { practiceEn } from '@/lib/i18n/practice'
import { MatrixView } from '@/components/matrix/MatrixView'
import { EliminationPlayer } from '@/components/steps/EliminationPlayer'
import { SolutionSummary } from '@/components/tools/rref/SolutionSummary'
import { Button } from '@/components/ui/Button'
import { Segmented, Select, TextField } from '@/components/ui/controls'
import { Notice, type Tone } from '@/components/ui/Notice'
import { gaussJordan } from '@/lib/math/elimination'
import type { Matrix } from '@/lib/math/matrix'
import { formatRowOperation, rowLabel, variableName } from '@/lib/math/notation'
import { type Verdict, assessOperation, measureProgress, nextHint } from '@/lib/math/practice'
import { parseRational } from '@/lib/math/rational'
import { type RowOperation, affectedRows, changedCells, replaceRow, scaleRow, sourceRow, swapRows } from '@/lib/math/rowOps'
import { parseRowOperation } from '@/lib/math/rowOpNotation'
import { solveAugmented } from '@/lib/math/solve'
import styles from './practice.module.css'

interface Move {
  readonly op: RowOperation
  readonly before: Matrix
  readonly after: Matrix
  readonly verdict: Verdict
}

interface Feedback {
  readonly tone: Tone
  readonly title: keyof typeof practiceEn
  readonly message: string
  readonly messageKind?: 'validation' | 'undo'
}

const VERDICT_FEEDBACK: Record<Verdict, { tone: Tone; title: keyof typeof practiceEn }> = {
  complete: { tone: 'success', title: 'practice.verdictComplete' },
  progress: { tone: 'success', title: 'practice.verdictProgress' },
  neutral: { tone: 'info', title: 'practice.verdictNeutral' },
  setback: { tone: 'warning', title: 'practice.verdictSetback' },
}

type Kind = 'swap' | 'scale' | 'replace'

/**
 * Guided row reduction. Any valid elementary operation is accepted; progress
 * is judged mathematically against the matrix's reduced form, so there is no
 * single required sequence.
 */
export function PracticeSession({ start, variables }: { start: Matrix; variables: number }) {
  const { t, error } = useI18n()
  const rows = start.length
  const [moves, setMoves] = useState<Move[]>([])
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [hintLevel, setHintLevel] = useState(0)
  const [inputMode, setInputMode] = useState<'choose' | 'type'>('choose')
  const [kind, setKind] = useState<Kind>('replace')
  const [rowA, setRowA] = useState(0)
  const [rowB, setRowB] = useState(Math.min(1, rows - 1))
  const [factor, setFactor] = useState('')
  const [notation, setNotation] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const current = moves.at(-1)?.after ?? start
  const progress = useMemo(() => measureProgress(current, variables), [current, variables])
  const hint = useMemo(() => (progress.complete ? null : nextHint(current, variables)), [current, variables, progress.complete])
  const lastMove = moves.at(-1)
  const labels = [...Array.from({ length: variables }, (_, j) => variableName(j)), 'b']
  const renderedFormError = formError ? (formError.startsWith('Factor: ') ? t('practice.factorError', { message: error(formError.slice(8)) }) : error(formError)) : null

  const buildOperation = (): { op: RowOperation } | { error: string } => {
    if (inputMode === 'type') {
      const parsed = parseRowOperation(notation, rows)
      return parsed.ok ? { op: parsed.value } : { error: parsed.error }
    }
    if (kind === 'swap') return { op: swapRows(rowA, rowB) }
    const k = parseRational(factor)
    if (!k.ok) return { error: `Factor: ${k.error}` }
    return { op: kind === 'scale' ? scaleRow(rowA, k.value) : replaceRow(rowA, rowB, k.value) }
  }

  const apply = (event: FormEvent) => {
    event.preventDefault()
    const built = buildOperation()
    if ('error' in built) {
      setFormError(built.error)
      return
    }
    setFormError(null)
    const result = assessOperation(current, built.op, variables)
    if (!result.valid) {
      setFeedback({ tone: 'danger', title: 'practice.invalidOperation', message: result.message, messageKind: 'validation' })
      return
    }
    setMoves([...moves, { op: built.op, before: current, after: result.after, verdict: result.verdict }])
    setFeedback({ ...VERDICT_FEEDBACK[result.verdict], message: result.message })
    setHintLevel(0)
    setNotation('')
  }

  const undo = () => {
    setMoves(moves.slice(0, -1))
    setFeedback({ tone: 'info', title: 'practice.undone', message: lastMove ? formatRowOperation(lastMove.op) : '', messageKind: 'undo' })
    setHintLevel(0)
  }

  const restart = () => {
    setMoves([])
    setFeedback(null)
    setHintLevel(0)
  }

  const highlight = lastMove
    ? {
        targetRows: affectedRows(lastMove.op),
        sourceRow: sourceRow(lastMove.op),
        changed: changedCells(lastMove.before, lastMove.after),
        rowNotes: moveNotes(lastMove.op, t('practice.sourceRow')),
        pivots: progress.complete ? gaussJordan(current, { pivotColumnLimit: variables }).pivots : [],
      }
    : {}

  const rowOptions = Array.from({ length: rows }, (_, i) => (
    <option key={i} value={i}>
      {rowLabel(i)}
    </option>
  ))

  return (
    <div className={styles.session}>
      <section className={styles.board} aria-labelledby="practice-matrix">
        <h2 id="practice-matrix" className={styles.heading}>
          {t('practice.matrix')} {moves.length > 0 ? <span className={styles.muted}>{t(moves.length === 1 ? 'practice.afterOne' : 'practice.afterMany', { count: moves.length })}</span> : null}
        </h2>
        <div className={styles.sheet}>
          <MatrixView matrix={current} label={t('practice.currentMatrix')} augmentAt={variables} columnLabels={labels} highlight={highlight} size="lg" />
        </div>
        <div className={styles.buttonRow}>
          <Button icon="undo" size="sm" onClick={undo} disabled={moves.length === 0}>
            {t('practice.undo')}
          </Button>
          <Button icon="reset" size="sm" variant="quiet" onClick={restart} disabled={moves.length === 0}>
            {t('practice.restart')}
          </Button>
        </div>
        {moves.length > 0 ? (
          <ol className={styles.log} aria-label={t('practice.operationsSoFar')}>
            {moves.map((m, i) => (
              <li key={i} data-verdict={m.verdict}>
                <span className="num" dir="ltr">{formatRowOperation(m.op)}</span>
                <span className={styles.logVerdict}>{t(VERDICT_FEEDBACK[m.verdict].title)}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </section>

      <section className={styles.controls} aria-labelledby="practice-controls">
        <h2 id="practice-controls" className={styles.heading}>
          {t(progress.complete ? 'practice.done' : 'practice.nextOperation')}
        </h2>

        {progress.complete ? (
          <>
            <Notice tone="success" title={t('practice.matrixComplete')}>
              <span lang="en" dir="ltr" className={styles.studyText}>Every pivot is a leading 1 with zeros above and below it. Here is what it says about the system.</span>
            </Notice>
            <SolutionSummary analysis={solveAugmented(start, variables)} format="fraction" />
          </>
        ) : (
          <form className={styles.form} onSubmit={apply}>
            <Segmented
              label={t('practice.enterBy')}
              value={inputMode}
              onChange={(m) => {
                setInputMode(m)
                setFormError(null)
              }}
              options={[
                { value: 'choose', label: t('practice.choosing') },
                { value: 'type', label: t('practice.typing') },
              ]}
            />
            {inputMode === 'type' ? (
              <TextField
                label={t('practice.rowOperation')}
                value={notation}
                onChange={setNotation}
                placeholder="R2 <- R2 - 3R1"
                hint={<>{t('practice.notationExamples')} <bdi dir="ltr">R1 &lt;-&gt; R2, R2 &lt;- R2 - 3R1, R1 &lt;- (1/2)R1, R3 + 2R1 -&gt; R3</bdi></>}
                error={renderedFormError}
              />
            ) : (
              <>
                <Segmented
                  label={t('practice.operation')}
                  value={kind}
                  onChange={(k) => {
                    setKind(k)
                    setFormError(null)
                  }}
                  options={[
                    { value: 'swap', label: t('practice.swap') },
                    { value: 'scale', label: t('practice.scale') },
                    { value: 'replace', label: t('practice.addMultiple') },
                  ]}
                />
                <div className={styles.opFields}>
                  <Select label={t(kind === 'swap' ? 'practice.swapRow' : kind === 'scale' ? 'practice.scaleRow' : 'practice.changeRow')} value={String(rowA)} onChange={(v) => setRowA(Number(v))}>
                    {rowOptions}
                  </Select>
                  {kind === 'swap' ? (
                    <Select label={t('practice.withRow')} value={String(rowB)} onChange={(v) => setRowB(Number(v))}>
                      {rowOptions}
                    </Select>
                  ) : (
                    <TextField label={t(kind === 'scale' ? 'practice.byFactor' : 'practice.byAdding')} value={factor} onChange={setFactor} placeholder={t('practice.factorPlaceholder')} error={renderedFormError} className={styles.factor} />
                  )}
                  {kind === 'replace' ? (
                    <Select label={t('practice.timesRow')} value={String(rowB)} onChange={(v) => setRowB(Number(v))}>
                      {rowOptions}
                    </Select>
                  ) : null}
                </div>
                <p className={`${styles.preview} num`} dir="ltr" aria-live="polite">
                  {previewText(kind, rowA, rowB, factor, t('practice.nonzeroFactor'))}
                </p>
              </>
            )}
            <Button type="submit" variant="primary">
              {t('practice.apply')}
            </Button>
          </form>
        )}

        <div aria-live="polite">
          {feedback ? (
            <Notice tone={feedback.tone} title={t(feedback.title)} role={feedback.tone === 'danger' ? 'alert' : undefined}>
              {feedback.messageKind === 'validation' ? error(feedback.message) : feedback.messageKind === 'undo' ? t('practice.removed', { operation: feedback.message }) : <span lang="en" dir="ltr" className={styles.studyText}>{feedback.message}</span>}
            </Notice>
          ) : null}
        </div>

        {hint ? (
          <div className={styles.hints}>
            <div className={styles.buttonRow}>
              <Button size="sm" icon="lightbulb" onClick={() => setHintLevel((h) => Math.min(3, h + 1))} disabled={hintLevel >= 3}>
                {t(hintLevel === 0 ? 'practice.getHint' : hintLevel < 3 ? 'practice.moreHint' : 'practice.allHints')}
              </Button>
            </div>
            {hintLevel > 0 ? (
              <ol className={styles.hintList} lang="en" dir="ltr">
                {hint.levels.slice(0, hintLevel).map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : null}

        {!progress.complete ? (
          <details className={styles.solution}>
            <summary>{t('practice.showSolution')}</summary>
            <EliminationPlayer
              elimination={gaussJordan(current, { pivotColumnLimit: variables })}
              context={{ kind: 'system' }}
              label={t('practice.solutionMatrix')}
              augmentAt={variables}
              columnLabels={labels}
              intro={<p lang="en" dir="ltr">This is one way to finish from your current matrix. Other valid orders reach the same reduced matrix.</p>}
            />
          </details>
        ) : null}
      </section>
    </div>
  )
}

function previewText(kind: Kind, a: number, b: number, factor: string, nonzeroFactor: string): string {
  const parsed = parseRational(factor)
  if (kind === 'swap') return formatRowOperation(swapRows(a, b))
  if (!parsed.ok) return kind === 'scale' ? `${rowLabel(a)} ← k·${rowLabel(a)}` : `${rowLabel(a)} ← ${rowLabel(a)} + k·${rowLabel(b)}`
  if (parsed.value.isZero()) return nonzeroFactor
  return formatRowOperation(kind === 'scale' ? scaleRow(a, parsed.value) : replaceRow(a, b, parsed.value))
}

function moveNotes(op: RowOperation, sourceLabel: string): Record<number, string> {
  if (op.kind === 'swap') return { [op.rowA]: `↔ ${rowLabel(op.rowB)}`, [op.rowB]: `↔ ${rowLabel(op.rowA)}` }
  const notes: Record<number, string> = { [affectedRows(op)[0]!]: formatRowOperation(op).split(' ← ')[1] ?? '' }
  const source = sourceRow(op)
  if (source !== null) notes[source] = sourceLabel
  return notes
}
