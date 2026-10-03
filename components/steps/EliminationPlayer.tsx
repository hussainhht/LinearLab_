'use client'

import { useI18n } from '@/components/i18n/LanguageProvider'
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
  const { t, language } = useI18n()
  const resetKey = gridKey(elimination.input.map((r) => r.map(String)))
  const playback = usePlayback({ last: elimination.steps.length, resetKey })
  const { matrix, highlight } = stepView(elimination, playback.index, final)

  return (
    <div className={styles.player} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className={styles.stage}>
        <MatrixView
          matrix={matrix}
          label={t('steps.matrixAt', { label, stage: playback.index === 0 ? t('steps.startingMatrix') : t('steps.after', { step: playback.index }) })}
          augmentAt={augmentAt}
          columnLabels={columnLabels}
          highlight={highlight}
          format={format}
        />
      </div>
      <StepControls playback={playback} />
      <StepExplanation elimination={elimination} index={playback.index} context={context} intro={<div lang="en" dir="ltr">{intro}</div>} conclusion={conclusion} />
      {elimination.steps.length > 0 ? (
        <details className={styles.history}>
          <summary>{t('steps.all', { count: elimination.steps.length })}</summary>
          <StepHistory
            current={playback.index}
            onSelect={playback.goTo}
            items={[
              { title: t('tools.startMatrix') },
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
