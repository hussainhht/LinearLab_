'use client'

import dynamic from 'next/dynamic'
import { RationalText } from '@/components/matrix/RationalText'
import { Icon } from '@/components/ui/Icon'
import { verifySolution, coefficientPart } from '@/lib/export'
import type { NumberFormat } from '@/lib/math/notation'
import { formatAffine, formatNumber, variableName } from '@/lib/math/notation'
import type { SystemAnalysis } from '@/lib/math/solve'
import type { Rational } from '@/lib/math/rational'
import { splitColumns } from '@/lib/math/matrix'
import styles from './rref.module.css'

// The plot is only needed for two-variable systems, so it loads on demand.
const LinePlot = dynamic(() => import('@/components/visual/LinePlot').then((m) => m.LinePlot), {
  loading: () => <p className={styles.muted}>Loading the graph…</p>,
})

const LABELS = {
  unique: { text: 'Unique solution', icon: 'check' },
  infinite: { text: 'Infinitely many solutions', icon: 'info' },
  inconsistent: { text: 'No solution', icon: 'alert' },
} as const

export function SolutionSummary({ analysis, format }: { analysis: SystemAnalysis; format: NumberFormat }) {
  const s = analysis.solution
  const verified = verifySolution(analysis)
  const label = LABELS[s.kind]

  return (
    <section className={styles.solution} data-kind={s.kind} aria-labelledby="solution-heading">
      <h3 id="solution-heading" className={styles.solutionBadge}>
        <Icon name={label.icon} size={18} />
        {label.text}
      </h3>

      {s.kind === 'unique' ? (
        <dl className={styles.values}>
          {s.values.map((v, j) => (
            <div key={j} className={styles.valueRow}>
              <dt>{variableName(j)}</dt>
              <dd>
                <RationalText value={v} format={format} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {s.kind === 'infinite' ? (
        <>
          <p>
            {s.freeVariables.length === 1 ? 'Free variable: ' : 'Free variables: '}
            <strong>{s.freeVariables.map((j) => variableName(j)).join(', ')}</strong>. Each one can be any number; the
            pivot variables then follow.
          </p>
          <ul className={`${styles.general} num`}>
            {s.particular.map((p, j) =>
              s.freeVariables.includes(j) ? (
                <li key={j}>
                  {variableName(j)} is free
                </li>
              ) : (
                <li key={j}>
                  {variableName(j)} ={' '}
                  {formatAffine(
                    p,
                    s.directions.map((d) => ({ coefficient: d.vector[j] as Rational, variable: d.variable })),
                  )}
                </li>
              ),
            )}
          </ul>
          <p className={styles.muted}>In vector form:</p>
          <div className={styles.vectorForm}>
            <span className={styles.vectorName}>x =</span>
            <ColumnVector values={s.particular} format={format} />
            {s.directions.map((d) => (
              <span key={d.variable} className={styles.vectorTerm}>
                <span>+ {variableName(d.variable)}</span>
                <ColumnVector values={d.vector} format={format} />
              </span>
            ))}
          </div>
        </>
      ) : null}

      {s.kind === 'inconsistent' ? (
        <p>
          Row {s.row + 1} of the reduced matrix reads 0{variableName(0)} + … + 0{variableName(analysis.variables - 1)} ={' '}
          {formatNumber(s.value).text}. No choice of values can make 0 equal {formatNumber(s.value).text}, so the
          equations contradict each other.
        </p>
      ) : null}

      <p className={styles.ranks}>
        rank A = {analysis.rankA}, rank [A | b] = {analysis.rankAugmented}, {analysis.variables}{' '}
        {analysis.variables === 1 ? 'variable' : 'variables'}.
      </p>

      {verified !== null ? (
        <p className={styles.check} data-ok={verified}>
          <Icon name={verified ? 'check' : 'alert'} size={16} />
          {verified
            ? s.kind === 'unique'
              ? 'Checked: substituting these values into the original equations reproduces b.'
              : 'Checked: the particular solution satisfies Ax = b and each direction satisfies Ax = 0.'
            : 'The substitution check failed. Please report this system.'}
        </p>
      ) : null}

      {analysis.variables === 2 ? (
        <LinePlot
          a={coefficientPart(analysis)}
          b={splitColumns(analysis.elimination.input, 2).right.map((r) => r[0]!)}
          solution={s}
        />
      ) : null}
    </section>
  )
}

function ColumnVector({ values, format }: { values: readonly Rational[]; format: NumberFormat }) {
  return (
    <span className={styles.columnVector}>
      {values.map((v, i) => (
        <span key={i}>
          <RationalText value={v} format={format} />
        </span>
      ))}
    </span>
  )
}
