'use client'

import { useI18n, T } from '@/components/i18n/LanguageProvider'
import type { ReactNode } from 'react'
import { MatrixView } from '@/components/matrix/MatrixView'
import { RationalText } from '@/components/matrix/RationalText'
import { EliminationPlayer } from '@/components/steps/EliminationPlayer'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Notice } from '@/components/ui/Notice'
import { determinantByElimination } from '@/lib/math/determinant'
import { invert } from '@/lib/math/inverse'
import {
  type Matrix,
  add,
  formatShape,
  multiplicationIssue,
  scale,
  shapeOf,
  subtract,
  transpose,
  isSquare,
  multiplyVector,
} from '@/lib/math/matrix'
import { type NumberFormat, formatNumber, variableName } from '@/lib/math/notation'
import type { Rational } from '@/lib/math/rational'
import { analyzeSpaces } from '@/lib/math/spaces'
import { type MatrixName, type OperationId } from './operations'
import { MultiplicationVisualizer } from './MultiplicationVisualizer'
import styles from './matrices.module.css'

interface OperationResultProps {
  op: OperationId
  a: Matrix
  b: Matrix
  k: Rational
  target: MatrixName
  format: NumberFormat
  inputKey: string
  onUseResult: (m: Matrix, into: MatrixName) => void
  onCopy: (m: Matrix) => void
}

export function OperationResult(props: OperationResultProps) {
  const { t } = useI18n()
  const { op, a, b, k, target, format } = props
  const x = target === 'A' ? a : b

  switch (op) {
    case 'add':
    case 'subtract': {
      const sa = shapeOf(a)
      const sb = shapeOf(b)
      if (sa.rows !== sb.rows || sa.cols !== sb.cols) {
        return (
          <Notice tone="danger" title={t('tools.addSizeError')} role="alert">
            {t('tools.addSizeDetails', { a: formatShape(sa), b: formatShape(sb) })}{' '}
            <span lang="en" dir="ltr">Addition and subtraction work entry by entry, so both matrices
            need the same number of rows and the same number of columns.</span>
          </Notice>
        )
      }
      const result = op === 'add' ? add(a, b) : subtract(a, b)
      const sign = op === 'add' ? '+' : '−'
      return (
        <ResultFrame {...props} title={`A ${sign} B`} result={result}>
          <p>
            Each entry is (A {sign} B)<sub>ij</sub> = a<sub>ij</sub> {sign} b<sub>ij</sub>. Both matrices are {formatShape(sa)}, so the
            result is too.{' '}
            {op === 'add'
              ? 'Addition is commutative: A + B = B + A.'
              : 'Subtraction is not commutative: B − A = −(A − B).'}
          </p>
        </ResultFrame>
      )
    }
    case 'multiply': {
      const issue = multiplicationIssue(a, b)
      if (issue) {
        return (
          <Notice tone="danger" title={t('tools.multiplySizeError')} role="alert">
            {t('tools.multiplySizeDetails', { a: shapeOf(a).cols, b: shapeOf(b).rows, aShape: formatShape(shapeOf(a)), bShape: formatShape(shapeOf(b)), columnUnit: t(shapeOf(a).cols === 1 ? 'tools.columnOne' : 'tools.columnMany'), rowUnit: t(shapeOf(b).rows === 1 ? 'tools.rowOne' : 'tools.rowMany') })}{' '}
            <span lang="en" dir="ltr">Each entry of AB pairs a row of A with a column of B, so they must have the same length.</span>
          </Notice>
        )
      }
      const sa = shapeOf(a)
      const sb = shapeOf(b)
      return (
        <div className={styles.result} lang="en" dir="ltr">
          <h3 className={styles.resultTitle}>A × B</h3>
          <p className={styles.muted}>
            ({formatShape(sa)}) × ({formatShape(sb)}) gives a {sa.rows}×{sb.cols} matrix. The inner sizes ({sa.cols}) match.
          </p>
          <MultiplicationVisualizer a={a} b={b} format={format} inputKey={props.inputKey} />
        </div>
      )
    }
    case 'scalar':
      return (
        <ResultFrame {...props} title={`${formatNumber(k).text} · ${target}`} result={scale(x, k)}>
          <p>
            Every entry of {target} is multiplied by k = {formatNumber(k).text}. Scalar multiplication distributes:
            k(A + B) = kA + kB, and (km)A = k(mA).
          </p>
        </ResultFrame>
      )
    case 'transpose': {
      const s = shapeOf(x)
      return (
        <ResultFrame {...props} title={`${target}ᵀ`} result={transpose(x)}>
          <p>
            Row i of {target} becomes column i of {target}ᵀ, so a {formatShape(s)} matrix becomes {s.cols}×{s.rows}. Useful facts:
            (Aᵀ)ᵀ = A and (AB)ᵀ = BᵀAᵀ.
          </p>
        </ResultFrame>
      )
    }
    case 'determinant':
      return <DeterminantResult m={x} name={target} format={format} />
    case 'inverse':
      return <InverseResult {...props} m={x} name={target} />
    case 'spaces':
      return <SpacesResult m={x} name={target} format={format} />
  }
}

function ResultFrame({
  title,
  result,
  children,
  format,
  onUseResult,
  onCopy,
}: OperationResultProps & { title: string; result: Matrix; children: ReactNode }) {
  const { t } = useI18n()
  return (
    <div className={styles.result} lang="en" dir="ltr">
      <h3 className={styles.resultTitle} lang="en" dir="ltr">{title}</h3>
      <div className={styles.resultSheet}>
        <MatrixView matrix={result} label={t('tools.resultNamed', { name: title })} format={format} showRowLabels={false} size="lg" />
      </div>
      <div className={styles.explanation} lang="en" dir="ltr">{children}</div>
      <ResultActions result={result} onUseResult={onUseResult} onCopy={onCopy} />
    </div>
  )
}

function ResultActions({ result, onUseResult, onCopy }: { result: Matrix; onUseResult: OperationResultProps['onUseResult']; onCopy: OperationResultProps['onCopy'] }) {
  const { t, language } = useI18n()
  return (
    <div className={styles.buttonRow} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Button size="sm" icon="copy" onClick={() => onCopy(result)}>
        {t('tools.copy')}
      </Button>
      <Button size="sm" onClick={() => onUseResult(result, 'A')}>
        {t('tools.useAs', { name: 'A' })}
      </Button>
      <Button size="sm" onClick={() => onUseResult(result, 'B')}>
        {t('tools.useAs', { name: 'B' })}
      </Button>
    </div>
  )
}

function NotSquare({ name, m, what }: { name: string; m: Matrix; what: 'determinant' | 'inverse' }) {
  const { t } = useI18n()
  return (
    <Notice tone="danger" title={t('tools.squareRequired', { operation: t(what === 'determinant' ? 'tools.op.determinant' : 'tools.op.inverse') })} role="alert">
      {t('tools.matrixShape', { name, shape: formatShape(shapeOf(m)) })}{' '}
      <span lang="en" dir="ltr">Only n×n matrices have a {what}.</span>
    </Notice>
  )
}

function DeterminantResult({ m, name, format }: { m: Matrix; name: MatrixName; format: NumberFormat }) {
  const { t } = useI18n()
  if (!isSquare(m)) return <NotSquare name={name} m={m} what="determinant" />
  const info = determinantByElimination(m)
  const singular = info.value.isZero()
  return (
    <div className={styles.result} lang="en" dir="ltr">
      <h3 className={styles.resultTitle}>
        det {name} = <RationalText value={info.value} format={format} />
      </h3>
      <Notice tone={singular ? 'warning' : 'success'} title={<T k={singular ? 'tools.singular' : 'tools.invertible'} params={{ name }} />}>
        {singular
          ? `det ${name} = 0: the columns are linearly dependent, so ${name} squashes space into a lower dimension and has no inverse.`
          : `det ${name} ≠ 0, so ${name} has an inverse and Ax = b has exactly one solution for every b. This is decided exactly, with no rounding threshold.`}
      </Notice>
      <div className={styles.explanation}>
        <p>
          Method: reduce {name} to an upper-triangular matrix using only row swaps and replacements. Replacements do not change
          the determinant and each swap flips its sign, so det {name} = (−1)<sup>{info.swaps}</sup> × (product of the
          diagonal)
          {info.zeroColumn !== null ? `, and the missing pivot in column ${info.zeroColumn + 1} forces it to 0.` : '.'}
        </p>
        {info.zeroColumn === null ? (
          <p className="num">
            Diagonal: {info.diagonal.map((d) => formatNumber(d).text).join(' × ')}, swaps: {info.swaps}.
          </p>
        ) : null}
      </div>
      <EliminationPlayer
        elimination={info.elimination}
        context={{ kind: 'matrix', mode: 'forward' }}
        label={t('tools.eliminationLabel', { name })}
        format={format}
        intro={<p>Start from {name}. Each step clears one entry below a pivot.</p>}
      />
    </div>
  )
}

function InverseResult({ m, name, format, onUseResult, onCopy }: OperationResultProps & { m: Matrix; name: MatrixName }) {
  const { t } = useI18n()
  if (!isSquare(m)) return <NotSquare name={name} m={m} what="inverse" />
  const n = m.length
  const result = invert(m)
  const player = (
    <EliminationPlayer
      elimination={result.elimination}
      context={{ kind: 'inverse' }}
      label={t('tools.inverseReductionLabel', { name })}
      augmentAt={n}
      format={format}
      intro={
        <p>
          Place the identity beside {name} to form [{name} | I]. Row operations that turn the left half into I turn the right
          half into {name}⁻¹, because together they amount to multiplying by {name}⁻¹.
        </p>
      }
    />
  )
  if (!result.invertible) {
    return (
      <div className={styles.result} lang="en" dir="ltr">
        <h3 className={styles.resultTitle}><T k="tools.noInverse" params={{ name }} /></h3>
        <Notice tone="warning" title={<T k="tools.leftIdentityUnavailable" />}>
          Column {result.missingPivotColumn + 1} has no pivot, so rank {name} = {result.rank} &lt; {n}. A matrix is invertible
          only when it reduces to the identity.
        </Notice>
        {player}
      </div>
    )
  }
  return (
    <div className={styles.result} lang="en" dir="ltr">
      <h3 className={styles.resultTitle}>{name}⁻¹</h3>
      <div className={styles.resultSheet}>
        <MatrixView matrix={result.inverse} label={t('tools.inverseLabel', { name })} format={format} showRowLabels={false} size="lg" />
      </div>
      <p className={styles.check} data-ok={result.check.passed}>
        <Icon name={result.check.passed ? 'check' : 'alert'} size={16} />
        {result.check.passed
          ? `Verified by multiplication: ${name}·${name}⁻¹ and ${name}⁻¹·${name} both equal I exactly.`
          : `The product check failed: ${name}·${name}⁻¹ is not I.`}
      </p>
      <details className={styles.details}>
        <summary><T k="tools.seeProduct" params={{ name }} /></summary>
        <MatrixView matrix={result.check.right} label={t('tools.inverseProductLabel', { name })} format={format} showRowLabels={false} size="sm" />
      </details>
      <ResultActions result={result.inverse} onUseResult={onUseResult} onCopy={onCopy} />
      <h4 className={styles.subheading}>[{name} | I] → [I | {name}⁻¹]</h4>
      {player}
    </div>
  )
}

function SpacesResult({ m, name, format }: { m: Matrix; name: MatrixName; format: NumberFormat }) {
  const { t } = useI18n()
  const s = analyzeSpaces(m)
  return (
    <div className={styles.result} lang="en" dir="ltr">
      <h3 className={styles.resultTitle}>
        rank {name} = {s.rank}, nullity = {s.nullity}
      </h3>
      <p className={styles.muted}>
        Rank–nullity: {s.rank} + {s.nullity} = {s.cols}, the number of columns.
      </p>

      <div className={styles.spaceGrid}>
        <section>
          <h4 className={styles.subheading}><T k="tools.rrefHeading" /></h4>
          <MatrixView
            matrix={s.elimination.result}
            label={t('tools.rrefLabel', { name })}
            format={format}
            size="sm"
            highlight={{ pivots: s.elimination.pivots, freeColumns: s.freeColumns }}
            columnLabels={Array.from({ length: s.cols }, (_, j) => variableName(j))}
          />
          <p className={styles.explanation}>
            Pivot columns: {s.pivotColumns.length ? s.pivotColumns.map((c) => c + 1).join(', ') : 'none'}. Free columns:{' '}
            {s.freeColumns.length ? s.freeColumns.map((c) => c + 1).join(', ') : 'none'}.
          </p>
        </section>

        <section>
          <h4 className={styles.subheading}><T k="tools.columnBasisHeading" /></h4>
          {s.columnSpaceBasis.length ? (
            <div className={styles.vectors}>
              {s.columnSpaceBasis.map((c) => (
                <MatrixView
                  key={c.column}
                  matrix={c.vector.map((v) => [v])}
                  label={t('tools.columnLabel', { column: c.column + 1, name })}
                  caption={`column ${c.column + 1}`}
                  format={format}
                  size="sm"
                  showRowLabels={false}
                />
              ))}
            </div>
          ) : (
            <p>The column space is just the zero vector, so the basis is empty.</p>
          )}
          <p className={styles.explanation}>
            Take the pivot columns of the original {name}, not of its RREF: row operations preserve which columns are independent
            but change the columns themselves.
          </p>
        </section>

        <section>
          <h4 className={styles.subheading}><T k="tools.nullBasisHeading" /></h4>
          {s.nullSpaceBasis.length ? (
            <div className={styles.vectors}>
              {s.nullSpaceBasis.map((v) => (
                <MatrixView
                  key={v.freeVariable}
                  matrix={v.vector.map((x) => [x])}
                  label={t('tools.nullVectorLabel', { variable: variableName(v.freeVariable) })}
                  caption={`${variableName(v.freeVariable)} = 1`}
                  format={format}
                  size="sm"
                  showRowLabels={false}
                />
              ))}
            </div>
          ) : (
            <p>Only x = 0 solves {name}x = 0, so the null space is {'{0}'} and its basis is empty.</p>
          )}
          <p className={styles.explanation}>
            Solve {name}x = 0 from the RREF. Set one free variable to 1 and the others to 0; the pivot variables are then fixed by
            the RREF rows. Each choice gives one basis vector.
          </p>
          {s.nullSpaceBasis.length ? <NullSpaceCheck m={m} name={name} vectors={s.nullSpaceBasis.map((v) => v.vector)} /> : null}
        </section>
      </div>
    </div>
  )
}

function NullSpaceCheck({ m, name, vectors }: { m: Matrix; name: MatrixName; vectors: readonly (readonly Rational[])[] }) {
  const ok = vectors.every((v) => multiplyVector(m, v).every((e) => e.isZero()))
  return (
    <p className={styles.check} data-ok={ok}>
      <Icon name={ok ? 'check' : 'alert'} size={16} />
      {ok ? `Checked: ${name}·v = 0 for every vector above.` : `Check failed: some vector does not satisfy ${name}·v = 0.`}
    </p>
  )
}
