'use client'

import { useMemo, useState } from 'react'
import { MatrixEditor } from '@/components/matrix/MatrixEditor'
import { EliminationPlayer } from '@/components/steps/EliminationPlayer'
import { LinePlot } from '@/components/visual/LinePlot'
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
  const A = matrix(a)
  const n = A[0]!.length
  if (b) {
    const analysis = solveSystem(A, vector(b))
    const s = analysis.solution
    return (
      <div className={styles.widget}>
        <EliminationPlayer
          elimination={analysis.elimination}
          context={{ kind: 'system' }}
          label="Lesson example"
          augmentAt={n}
          columnLabels={[...Array.from({ length: n }, (_, j) => variableName(j)), 'b']}
          final={{
            freeColumns: s.kind === 'infinite' ? s.freeVariables : [],
            inconsistentRow: s.kind === 'inconsistent' ? s.row : null,
            inconsistentNote: s.kind === 'inconsistent' ? `0 = ${formatNumber(s.value).text}` : undefined,
          }}
          intro={<p>The augmented matrix of the example. Step forward to follow each row operation.</p>}
        />
      </div>
    )
  }
  const input = inverse ? augment(A, identity(A.length)) : A
  const elimination = gaussJordan(input, inverse ? { pivotColumnLimit: n } : {})
  return (
    <div className={styles.widget}>
      <EliminationPlayer
        elimination={elimination}
        context={{ kind: inverse ? 'inverse' : 'matrix' }}
        label="Lesson example"
        augmentAt={inverse ? n : undefined}
        intro={<p>{inverse ? 'Start from [A | I].' : 'Start from the matrix.'} Step forward to follow each row operation.</p>}
      />
    </div>
  )
}

/** Edit two equations in two unknowns and see the lines and the classification update together. */
export function LinesExplorer({ a = [[1, 1], [1, -1]], b = [3, 1] }: { a?: readonly (readonly Entry[])[]; b?: readonly Entry[] }) {
  const [cells, setCells] = useState(() => joinAugmented(toCells(a), b.map(String)))
  const parsed = useMemo(() => parseMatrixCells(cells), [cells])
  const analysis = parsed.ok ? solveAugmented(parsed.matrix, 2) : null
  const labels = { unique: 'One solution: the lines cross once.', infinite: 'Infinitely many solutions: the lines coincide.', inconsistent: 'No solution: the lines are parallel.' }
  return (
    <div className={`${styles.widget} ${styles.linesExplorer}`}>
      <div>
        <MatrixEditor
          idPrefix="lines"
          label="Two equations in x₁ and x₂"
          cells={cells}
          augmentAt={2}
          columnLabels={['x₁', 'x₂', 'b']}
          size="sm"
          errors={parsed.ok ? [] : parsed.errors}
          onCellChange={(r, c, v) => setCells(setCell(cells, r, c, v))}
          describeCell={(r, c) => (c === 2 ? `Equation ${r + 1}, constant` : `Equation ${r + 1}, coefficient of ${variableName(c)}`)}
        />
        <p className={styles.widgetHint}>Try making the second row a multiple of the first, then change only its constant.</p>
      </div>
      {analysis && parsed.ok ? (
        <div aria-live="polite">
          <p className={styles.widgetResult}>{labels[analysis.solution.kind]}</p>
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
