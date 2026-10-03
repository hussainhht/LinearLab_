import { T } from '@/components/i18n/LanguageProvider'
import type { ReactNode } from 'react'
import type { EliminationResult } from '@/lib/math/elimination'
import { type StepContext, explainStep } from '@/lib/math/explain'
import styles from './StepExplanation.module.css'

interface StepExplanationProps {
  elimination: EliminationResult
  index: number
  context: StepContext
  /** Shown for step 0, before any operation. */
  intro: ReactNode
  /** Shown below the final step's explanation. */
  conclusion?: ReactNode
}

/** States the operation in notation, then why it is done, for the current step. */
export function StepExplanation({ elimination, index, context, intro, conclusion }: StepExplanationProps) {
  const step = index > 0 ? elimination.steps[index - 1] : undefined
  const isFinal = index >= elimination.steps.length
  return (
    <div className={styles.explanation} aria-live="polite" aria-atomic="true">
      {step ? (
        <>
          <p className={styles.kicker}>
            <T k="steps.counter" params={{ index, count: elimination.steps.length }} />
          </p>
          <ExplanationBody {...explainStep(step, context)} />
        </>
      ) : (
        <div className={styles.intro}>{intro}</div>
      )}
      {isFinal && conclusion ? <div lang="en" dir="ltr" className={styles.conclusion}>{conclusion}</div> : null}
    </div>
  )
}

function ExplanationBody({ title, operation, reason }: { title: string; operation: string; reason: string }) {
  return (
    <>
      <h3 className={styles.title} lang="en" dir="ltr">{title}</h3>
      <p className={styles.operation} dir="ltr">
        <span className="sr-only"><T k="steps.operation" /></span>
        {operation}
      </p>
      <p className={styles.reason} lang="en" dir="ltr">{reason}</p>
    </>
  )
}
