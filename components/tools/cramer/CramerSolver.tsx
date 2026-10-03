'use client'

import Link from 'next/link'
import { useI18n, T } from '@/components/i18n/LanguageProvider'
import { type ReactNode, useMemo, useState } from 'react'
import { MatrixEditor } from '@/components/matrix/MatrixEditor'
import { MatrixView } from '@/components/matrix/MatrixView'
import { RationalText } from '@/components/matrix/RationalText'
import { Icon } from '@/components/ui/Icon'
import { Notice } from '@/components/ui/Notice'
import { EquationPreview } from '@/components/tools/rref/EquationPreview'
import { cramer } from '@/lib/math/cramer'
import { multiplyVector, vectorsEqual, splitColumns } from '@/lib/math/matrix'
import { formatNumber, subscript, variableName } from '@/lib/math/notation'
import { parseMatrixCells } from '@/lib/math/parse'
import { setCell } from '@/lib/grid'
import { joinAugmented, splitAugmented, systemHref, toCells } from '@/lib/url/problem'
import styles from '../determinant/determinant.module.css'

type Entry = string | number

interface CramerSolverProps {
  size: 2 | 3
  initialA?: readonly (readonly Entry[])[]
  initialB?: readonly Entry[]
  id?: string
  title?: ReactNode
  /** 2 on a tool page, 3 when embedded under a lesson heading. */
  headingLevel?: 2 | 3
}

const DEFAULTS = {
  2: { a: [[2, 3], [4, -1]], b: [8, 2] },
  3: { a: [[1, 2, 1], [2, -1, 2], [3, 1, -1]], b: [9, 6, 2] },
} as const

/** Cramer's rule for one 2×2 or 3×3 system; each instance keeps its own inputs. */
export function CramerSolver({ size, initialA, initialB, id = `cramer${size}`, title, headingLevel = 3 }: CramerSolverProps) {
  const { t, language } = useI18n()
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const [cells, setCells] = useState(() =>
    joinAugmented(toCells(initialA ?? DEFAULTS[size].a), (initialB ?? DEFAULTS[size].b).map(String)),
  )
  const [touched, setTouched] = useState(false)
  const parsed = useMemo(() => parseMatrixCells(cells), [cells])
  const labels = [...Array.from({ length: size }, (_, j) => variableName(j)), 'b']

  let body: ReactNode = <p className={styles.muted}><T k="tools.fillSystem" /></p>
  if (parsed.ok) {
    const { left: a, right } = splitColumns(parsed.matrix, size)
    const b = right.map((r) => r[0]!)
    const result = cramer(a, b)
    if (!result.applicable) {
      const { a: aCells, b: bCells } = splitAugmented(cells)
      body = (
        <div lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}><Notice
          tone="warning"
          title={<T k="tools.cramerUnavailable" />}
          actions={
            <Link href={systemHref('/tools/rref/', aCells, bCells)}><T k="tools.classifySystem" /></Link>
          }
        >
          <p lang="en" dir="ltr">{result.message}</p>
        </Notice></div>
      )
    } else {
      const checked = vectorsEqual(multiplyVector(a, result.solution), b)
      body = (
        <>
          <p className="num">
            det A = <strong>{formatNumber(result.determinant).text}</strong>, which is not 0, so the rule applies.
          </p>
          <div className={styles.columns}>
            {result.columns.map((c) => (
              <div key={c.variable}>
                <MatrixView
                  matrix={c.matrix}
                  label={t('tools.replacedColumnLabel', { column: c.variable + 1 })}
                  caption={`A${subscript(c.variable + 1)}: column ${c.variable + 1} replaced by b`}
                  size="sm"
                  showRowLabels={false}
                  highlight={{ focusColumn: c.variable }}
                />
                <p className="num">
                  {variableName(c.variable)} = {formatNumber(c.determinant).text} / {formatNumber(result.determinant).text} ={' '}
                  <strong>
                    <RationalText value={c.value} />
                  </strong>
                </p>
              </div>
            ))}
          </div>
          <p className={styles.answer}>
            {result.solution.map((v, j) => (
              <span key={j}>
                {variableName(j)} = <RationalText value={v} />
                {j < result.solution.length - 1 ? ',' : ''}
              </span>
            ))}
          </p>
          <p className={styles.checkLine}>
            <Icon name={checked ? 'check' : 'alert'} size={16} />
            {checked ? 'Checked by substituting into every original equation.' : 'Substitution check failed.'}
          </p>
        </>
      )
    }
  }

  return (
    <section lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} className={styles.calculator} aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className={styles.calcTitle}>
        {title ? <span lang="en" dir="ltr">{title}</span> : t('tools.systemSize', { size })}
      </Heading>
      <div className={styles.calcBody}>
        <div className={styles.equationForm} onBlur={() => setTouched(true)}>
          <MatrixEditor
            idPrefix={id}
            label={t('tools.augmentedSystemSize', { size })}
            cells={cells}
            augmentAt={size}
            columnLabels={labels}
            errors={touched && !parsed.ok ? parsed.errors : []}
            onCellChange={(r, c, v) => setCells(setCell(cells, r, c, v))}
            describeCell={(r, c) => (c === size ? t('tools.equationConstant', { row: r + 1 }) : t('tools.equationCoefficient', { row: r + 1, variable: variableName(c) }))}
          />
          <EquationPreview cells={cells} variables={size} />
        </div>
        <div className={styles.work} lang="en" dir="ltr" aria-live="polite">
          {body}
        </div>
      </div>
    </section>
  )
}

