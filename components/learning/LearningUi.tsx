'use client'

import { createElement, type ComponentProps, type HTMLAttributes } from 'react'
import { useI18n, T } from '@/components/i18n/LanguageProvider'
import type { learningEn } from '@/lib/i18n/learning'

type LearningKey = keyof typeof learningEn

/** Keeps interface controls in the selected direction inside the English lesson reader. */
export function LearningUi({ as = 'div', labelKey, labelParams, ...props }: HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'nav' | 'ul' | 'aside' | 'section' | 'p' | 'span'
  labelKey?: LearningKey
  labelParams?: Record<string, string | number>
}) {
  const { language, t } = useI18n()
  const { 'aria-label': suppliedLabel, ...attributes } = props
  return createElement(as, {
    'aria-label': labelKey ? t(labelKey, labelParams) : suppliedLabel,
    ...attributes,
    lang: props.lang ?? language,
    dir: props.dir ?? (language === 'ar' ? 'rtl' : 'ltr'),
  })
}

/** SVG text alternatives stay as supplied; only the generic fallback is interface text. */
export function LearningImage({ alt, ...props }: ComponentProps<'img'>) {
  const { t } = useI18n()
  // A data URI drawn from the source has no image-server representation.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt || t('learning.diagram.alt')} />
}

export function LedgerNotice({ available, total }: { available: number; total: number }) {
  return total === 0 ? <T k="learning.source.noScans" /> : available === 0
    ? <T k="learning.source.missingScans" />
    : <T k="learning.source.availableScans" params={{ available, total }} />
}
