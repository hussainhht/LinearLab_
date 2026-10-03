'use client'

import { useI18n, T } from '@/components/i18n/LanguageProvider'
import { MatrixView } from '@/components/matrix/MatrixView'
import { explainStep } from '@/lib/math/explain'
import { solutionLines } from '@/lib/math/notation'
import type { SystemAnalysis } from '@/lib/math/solve'
import { variableList } from '@/lib/export'
import styles from './rref.module.css'

/** Every step on one page. Hidden on screen; shown when printing. */
export function SolutionReport({ analysis }: { analysis: SystemAnalysis }) {
  const { t, language } = useI18n()
  const n = analysis.variables
  const labels = [...variableList(n), 'b']
  return (
    <section lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} className={`print-only ${styles.report}`}>
      <h1><T k="tools.reportTitle" /></h1>
      <p>
        {t('tools.reportDescription', { equations: analysis.equations, variables: n })}
      </p>
      <MatrixView matrix={analysis.elimination.input} label={t('tools.startMatrix')} augmentAt={n} columnLabels={labels} size="sm" caption={t('tools.reportStart')} />
      <ol className={styles.reportSteps}>
        {analysis.elimination.steps.map((step) => {
          const e = explainStep(step, { kind: 'system' })
          return (
            <li key={step.number}>
              <p lang="en" dir="ltr">
                <strong>
                  <T k="steps.stepCounter" params={{ index: step.number }} />: {e.operation}
                </strong>{' '}
                {e.reason}
              </p>
              <MatrixView matrix={step.after} label={t('tools.afterStep', { step: step.number })} augmentAt={n} size="sm" />
            </li>
          )
        })}
      </ol>
      <h2><T k="tools.result" /></h2>
      <ul lang="en" dir="ltr">
        {solutionLines(analysis.solution).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  )
}
