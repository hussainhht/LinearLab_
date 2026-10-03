'use client'

import { useI18n } from '@/components/i18n/LanguageProvider'
import styles from './StepHistory.module.css'

export interface HistoryItem {
  title: string
  detail?: string
}

interface StepHistoryProps {
  items: readonly HistoryItem[]
  current: number
  onSelect: (index: number) => void
  label?: string
}

/** Ordered list of every step; selecting one jumps to it. */
export function StepHistory({ items, current, onSelect, label }: StepHistoryProps) {
  const { t, language } = useI18n()
  return (
    <nav lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} aria-label={label ?? t('steps.history')} className={styles.history}>
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              className={styles.item}
              aria-current={i === current ? 'step' : undefined}
              data-done={i < current || undefined}
              onClick={() => onSelect(i)}
            >
              <span className={`${styles.number} num`}>{i}</span>
              <span className={styles.text}>
                <span className={styles.title} lang={i > 0 ? "en" : undefined} dir={i > 0 ? "ltr" : undefined}>{item.title}</span>
                {item.detail ? <span className={styles.detail} lang="en" dir="ltr">{item.detail}</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
