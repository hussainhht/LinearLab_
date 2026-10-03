'use client'

import { useMemo, useState } from 'react'
import { MatrixEditor } from '@/components/matrix/MatrixEditor'
import { EliminationPlayer } from '@/components/steps/EliminationPlayer'
import { LinePlot } from '@/components/visual/LinePlot'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { gaussJordan } from '@/lib/math/elimination'
import { augment, identity, matrix, splitColumns, vector } from '@/lib/math/matrix'
import { formatNumber, variableName } from '@/lib/math/notation'
import { parseMatrixCells } from '@/lib/math/parse'
import { solveAugmented, solveSystem } from '@/lib/math/solve'
import { setCell } from '@/lib/grid'
import { joinAugmented, toCells } from '@/lib/url/problem'
import styles from './learning.module.css'

type Entry = string | number

interface EliminationDemoProps {
  a: readonly (readonly Entry[])[]
  /** Right-hand side for a system; omit to row reduce A itself. */
  b?: readonly Entry[]
  /** Reduce [A | I] to find an inverse. */
  inverse?: boolean
}

/** A stepped Gauss–Jordan walkthrough embedded in a lesson, computed by the same engine as the tools. */
export function EliminationDemo({ a, b, inverse }: EliminationDemoProps) {
  const { language, t } = useI18n()
  const A = matrix(a)
  const n = A[0]!.length
  if (b) {
    const analysis = solveSystem(A, vector(b))
    const s = analysis.solution
    return (
      <div className={styles.widget} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <EliminationPlayer
          elimination={analysis.elimination}
          context={{ kind: 'system' }}
          label={t('learning.widget.example')}
          augmentAt={n}
          columnLabels={[...Array.from({ length: n }, (_, j) => variableName(j)), 'b']}
          final={{
            freeColumns: s.kind === 'infinite' ? s.freeVariables : [],
            inconsistentRow: s.kind === 'inconsistent' ? s.row : null,
            inconsistentNote: s.kind === 'inconsistent' ? `0 = ${formatNumber(s.value).text}` : undefined,
          }}
          intro={<p lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('learning.widget.augmentedIntro')}</p>}
        />
      </div>
    )
  }
  const input = inverse ? augment(A, identity(A.length)) : A
  const elimination = gaussJordan(input, inverse ? { pivotColumnLimit: n } : {})
  return (
    <div className={styles.widget} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <EliminationPlayer
        elimination={elimination}
        context={{ kind: inverse ? 'inverse' : 'matrix' }}
        label={t('learning.widget.example')}
        augmentAt={inverse ? n : undefined}
        intro={<p lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(inverse ? 'learning.widget.inverseIntro' : 'learning.widget.matrixIntro', { matrix: '[A | I]' })}</p>}
      />
    </div>
  )
}

/** Edit two equations in two unknowns and see the lines and the classification update together. */
export function LinesExplorer({ a = [[1, 1], [1, -1]], b = [3, 1] }: { a?: readonly (readonly Entry[])[]; b?: readonly Entry[] }) {
  const { language, t } = useI18n()
  const [cells, setCells] = useState(() => joinAugmented(toCells(a), b.map(String)))
  const parsed = useMemo(() => parseMatrixCells(cells), [cells])
  const analysis = parsed.ok ? solveAugmented(parsed.matrix, 2) : null
  const labels = { unique: 'One solution: the lines cross once.', infinite: 'Infinitely many solutions: the lines coincide.', inconsistent: 'No solution: the lines are parallel.' }
  return (
    <div className={`${styles.widget} ${styles.linesExplorer}`} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <MatrixEditor
          idPrefix="lines"
          label={t('learning.widget.equations', { first: 'x₁', second: 'x₂' })}
          cells={cells}
          augmentAt={2}
          columnLabels={['x₁', 'x₂', 'b']}
          size="sm"
          errors={parsed.ok ? [] : parsed.errors}
          onCellChange={(r, c, v) => setCells(setCell(cells, r, c, v))}
          describeCell={(r, c) => t(c === 2 ? 'learning.widget.constant' : 'learning.widget.coefficient', { number: r + 1, variable: variableName(c) })}
        />
        <p className={styles.widgetHint}>{t('learning.widget.linesHint')}</p>
      </div>
      {analysis && parsed.ok ? (
        <div aria-live="polite">
          <p className={styles.widgetResult} lang="en" dir="ltr">{labels[analysis.solution.kind]}</p>
          <LinePlot
            a={splitColumns(parsed.matrix, 2).left}
            b={splitColumns(parsed.matrix, 2).right.map((r) => r[0]!)}
            solution={analysis.solution}
          />
        </div>
      ) : null}
    </div>
  )
}
