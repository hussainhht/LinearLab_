'use client'

import type { ReactNode } from 'react'
import { MatrixView } from '@/components/matrix/MatrixView'
import type { EliminationResult } from '@/lib/math/elimination'
import { type StepContext, explainStep } from '@/lib/math/explain'
import { gridKey } from '@/lib/grid'
import type { NumberFormat } from '@/lib/math/notation'
import { type FinalAnnotations, stepView } from './highlight'
import { StepControls } from './StepControls'
import { StepExplanation } from './StepExplanation'
import { StepHistory } from './StepHistory'
import { usePlayback } from './usePlayback'
import styles from './EliminationPlayer.module.css'

interface EliminationPlayerProps {
  elimination: EliminationResult
  context: StepContext
  label: string
  augmentAt?: number
  columnLabels?: readonly string[]
  format?: NumberFormat
  final?: FinalAnnotations
  intro: ReactNode
  conclusion?: ReactNode
}

/** Self-contained step-through of one elimination, used inside lessons and result panels. */
export function EliminationPlayer({
  elimination,
  context,
  label,
  augmentAt,
  columnLabels,
  format = 'fraction',
  final,
  intro,
  conclusion,
}: EliminationPlayerProps) {
  const resetKey = gridKey(elimination.input.map((r) => r.map(String)))
  const playback = usePlayback({ last: elimination.steps.length, resetKey })
  const { matrix, highlight } = stepView(elimination, playback.index, final)

  return (
    <div className={styles.player}>
      <div className={styles.stage}>
        <MatrixView
          matrix={matrix}
          label={`${label}, ${playback.index === 0 ? 'starting matrix' : `after step ${playback.index}`}`}
          augmentAt={augmentAt}
          columnLabels={columnLabels}
          highlight={highlight}
          format={format}
        />
      </div>
      <StepControls playback={playback} />
      <StepExplanation elimination={elimination} index={playback.index} context={context} intro={intro} conclusion={conclusion} />
      {elimination.steps.length > 0 ? (
        <details className={styles.history}>
          <summary>All {elimination.steps.length} steps</summary>
          <StepHistory
            current={playback.index}
            onSelect={playback.goTo}
            items={[
              { title: 'Starting matrix' },
              ...elimination.steps.map((s) => {
                const e = explainStep(s, context)
                return { title: e.title, detail: e.operation }
              }),
            ]}
          />
        </details>
      ) : null}
    </div>
  )
}
