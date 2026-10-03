'use client'

import Form from 'next/form'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { Icon } from '@/components/ui/Icon'
import styles from './search.module.css'

/** A GET form to /learn/search/; with JavaScript it navigates client-side, without it the browser does a normal GET. */
export function SearchForm({ id }: { id: string }) {
  const { t } = useI18n()
  return (
    <Form action="/learn/search/" role="search" className={styles.form}>
      <label htmlFor={id} className="sr-only">
        {t('learning.search.title')}
      </label>
      <input id={id} name="q" type="search" className={styles.input} placeholder={t('learning.search.title')} autoComplete="off" />
      <button type="submit" className={styles.submit} aria-label={t('learning.search.submit')}>
        <Icon name="search" />
      </button>
    </Form>
  )
}
