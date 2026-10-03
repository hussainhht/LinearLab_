'use client'

import { useId } from 'react'
import { useI18n } from './LanguageProvider'
import styles from './LanguageSelector.module.css'

export function LanguageSelector() {
  const id = useId()
  const { language, setLanguage, t } = useI18n()
  return (
    <div className={styles.selector}>
      <label htmlFor={id} className="sr-only">{t('language.label')}</label>
      <select id={id} value={language} onChange={(event) => setLanguage(event.target.value === 'ar' ? 'ar' : 'en')}>
        <option value="en" lang="en" dir="ltr">English</option>
        <option value="ar" lang="ar" dir="rtl">العربية</option>
      </select>
    </div>
  )
}
