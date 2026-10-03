import { LocalizedSpan } from '@/components/i18n/LanguageProvider'
import { type NumberFormat, formatNumber, MINUS } from '@/lib/math/notation'
import type { Rational } from '@/lib/math/rational'
import styles from './RationalText.module.css'

interface RationalTextProps {
  value: Rational
  format?: NumberFormat
  digits?: number
}

/**
 * Renders a rational as a stacked fraction (or a rounded decimal marked ≈).
 * Display formatting only: the underlying value is never rounded.
 */
export function RationalText({ value, format = 'fraction', digits = 4 }: RationalTextProps) {
  if (format === 'decimal' || value.isInteger()) {
    const { text, exact } = formatNumber(value, format, digits)
    return (
      <LocalizedSpan className={`${styles.number} num`} titleKey={exact ? undefined : 'matrix.exact'} params={{ value: value.toString() }}>
        {exact ? null : <span className={styles.approx}>≈</span>}
        {text}
      </LocalizedSpan>
    )
  }
  const negative = value.isNegative()
  const abs = value.abs()
  return (
    <span dir="ltr" className={`${styles.number} num`}>
      <span className="sr-only">{value.toString().replace('-', MINUS)}</span>
      <span className={styles.fraction} aria-hidden="true">
        {negative ? <span className={styles.sign}>{MINUS}</span> : null}
        <span className={styles.stack}>
          <span className={styles.numerator}>{abs.num.toString()}</span>
          <span className={styles.denominator}>{abs.den.toString()}</span>
        </span>
      </span>
    </span>
  )
}
