'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { MatrixEditor } from '@/components/matrix/MatrixEditor'
import { MatrixView } from '@/components/matrix/MatrixView'
import { RationalText } from '@/components/matrix/RationalText'
import { Notice } from '@/components/ui/Notice'
import { cofactorExpansion, determinant2x2, sarrus } from '@/lib/math/determinant'
import { type Matrix } from '@/lib/math/matrix'
import { formatNumber, subscript } from '@/lib/math/notation'
import { parseMatrixCells } from '@/lib/math/parse'
import { Rational } from '@/lib/math/rational'
import { matrixHref, toCells } from '@/lib/url/problem'
import { setCell } from '@/lib/grid'
import styles from './determinant.module.css'

type Entry = string | number

/** Shared input handling: each calculator instance owns its own entries. */
function useMatrixInput(initial: readonly (readonly Entry[])[]) {
  const [cells, setCells] = useState(() => toCells(initial))
  const [touched, setTouched] = useState(false)
  const parsed = useMemo(() => parseMatrixCells(cells), [cells])
  return { cells, setCells, parsed, touched, setTouched }
}

const n = (r: Rational) => formatNumber(r).text
const paren = (r: Rational) => (r.isNegative() || !r.isInteger() ? `(${n(r)})` : n(r))

function Verdict({ value }: { value: Rational }) {
  return value.isZero() ? (
    <Notice tone="warning" title="det = 0, so the matrix is singular">
      It has no inverse, and its columns are linearly dependent.
    </Notice>
  ) : (
    <Notice tone="success" title="det ≠ 0, so the matrix is invertible">
      Its columns are linearly independent and Ax = b has exactly one solution for every b.
    </Notice>
  )
}

interface CalculatorProps {
  initial?: readonly (readonly Entry[])[]
  id?: string
  /** 2 on a tool page, 3 when embedded under a lesson heading. */
  headingLevel?: 2 | 3
}

export function Determinant2x2Calculator({ initial = [[2, 3], [4, 5]], id = 'det2', headingLevel = 3 }: CalculatorProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const input = useMatrixInput(initial)
  const result = input.parsed.ok ? determinant2x2(input.parsed.matrix) : null
  return (
    <section className={styles.calculator} aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className={styles.calcTitle}>
        2×2 determinant
      </Heading>
      <div className={styles.calcBody}>
        <div onBlur={() => input.setTouched(true)}>
          <MatrixEditor
            idPrefix={id}
            label="2 by 2 matrix"
            cells={input.cells}
            errors={input.touched && !input.parsed.ok ? input.parsed.errors : []}
            onCellChange={(r, c, v) => input.setCells(setCell(input.cells, r, c, v))}
            describeCell={(r, c) => ['a', 'b', 'c', 'd'][r * 2 + c]!}
          />
        </div>
        <div className={styles.work} aria-live="polite">
          {result ? (
            <>
              <p className={styles.formula}>det A = ad − bc</p>
              <p className={`${styles.line} num`}>
                = {paren(result.a)}·{paren(result.d)} − {paren(result.b)}·{paren(result.c)}
              </p>
              <p className={`${styles.line} num`}>
                = {n(result.ad)} − {paren(result.bc)}
              </p>
              <p className={styles.answer}>
                det A = <RationalText value={result.value} />
              </p>
              <Verdict value={result.value} />
            </>
          ) : (
            <p className={styles.muted}>Fill in all four entries to see the determinant.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export function Determinant3x3Calculator({ initial = [[1, 2, 3], [0, 4, 5], [1, 0, 6]], id = 'det3', headingLevel = 3 }: CalculatorProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const input = useMatrixInput(initial)
  const m: Matrix | null = input.parsed.ok ? input.parsed.matrix : null
  const expansion = m ? cofactorExpansion(m, 0) : null
  const diagonal = m ? sarrus(m) : null
  return (
    <section className={styles.calculator} aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className={styles.calcTitle}>
        3×3 determinant
      </Heading>
      <div className={styles.calcBody}>
        <div onBlur={() => input.setTouched(true)}>
          <MatrixEditor
            idPrefix={id}
            label="3 by 3 matrix"
            cells={input.cells}
            errors={input.touched && !input.parsed.ok ? input.parsed.errors : []}
            onCellChange={(r, c, v) => input.setCells(setCell(input.cells, r, c, v))}
            describeCell={(r, c) => `a${subscript(r + 1)}${subscript(c + 1)}`}
          />
        </div>
        <div className={styles.work} aria-live="polite">
          {expansion && diagonal && m ? (
            <>
              <p className={styles.formula}>Cofactor expansion along row 1</p>
              <p className={`${styles.line} num`}>
                det A = a₁₁·M₁₁ − a₁₂·M₁₂ + a₁₃·M₁₃
              </p>
              <ol className={styles.terms}>
                {expansion.terms.map((t) => (
                  <li key={t.col}>
                    <span className="num">
                      {t.sign === 1 ? '+' : '−'} {paren(t.entry)} ×
                    </span>
                    <MatrixView
                      matrix={t.minor}
                      label={`Minor M1${t.col + 1}`}
                      size="sm"
                      showRowLabels={false}
                    />
                    <span className="num">
                      = {t.sign === 1 ? '+' : '−'} {paren(t.entry)} × {paren(t.minorDeterminant)} = {n(t.contribution)}
                    </span>
                  </li>
                ))}
              </ol>
              <p className={`${styles.line} num`}>
                = {expansion.terms.map((t) => paren(t.contribution)).join(' + ')}
              </p>
              <p className={styles.answer}>
                det A = <RationalText value={expansion.value} />
              </p>
              <details className={styles.details}>
                <summary>Check with the diagonal rule</summary>
                <p className="num">
                  Down-right diagonals: {diagonal.forward.map((d) => d.factors.map(paren).join('·')).join(' + ')} ={' '}
                  {n(diagonal.forward.reduce((acc, d) => acc.add(d.product), Rational.ZERO))}
                </p>
                <p className="num">
                  Down-left diagonals: {diagonal.backward.map((d) => d.factors.map(paren).join('·')).join(' + ')} ={' '}
                  {n(diagonal.backward.reduce((acc, d) => acc.add(d.product), Rational.ZERO))}
                </p>
                <p className="num">
                  Difference: {n(diagonal.value)}
                  {diagonal.value.equals(expansion.value) ? ', matching the cofactor expansion.' : ' — this disagrees, please report it.'}
                </p>
                <p className={styles.muted}>The diagonal rule only works for 3×3 matrices.</p>
              </details>
              <Verdict value={expansion.value} />
              <p className={styles.muted}>
                <Link href={matrixHref('/tools/matrices/', { A: input.cells }, { op: 'determinant' })}>
                  See the same determinant by row reduction
                </Link>
              </p>
            </>
          ) : (
            <p className={styles.muted}>Fill in all nine entries to see the determinant.</p>
          )}
        </div>
      </div>
    </section>
  )
}
