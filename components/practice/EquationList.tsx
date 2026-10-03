'use client'

import { useI18n } from '@/components/i18n/LanguageProvider'
import { formatAffine, formatNumber } from '@/lib/math/notation'
import { q } from '@/lib/math/rational'
import styles from './practice.module.css'

type Entry = string | number

/** The practice system written out as equations. */
export function EquationList({ a, b }: { a: readonly (readonly Entry[])[]; b: readonly Entry[] }) {
  const { t } = useI18n()
  return (
    <ol aria-label={t('practice.system')} dir="ltr" className={styles.equations}>
      {a.map((row, i) => (
        <li key={i}>
          {formatAffine(q(0), row.map((v, j) => ({ coefficient: q(v), variable: j })))} = {formatNumber(q(b[i]!)).text}
        </li>
      ))}
    </ol>
  )
}
