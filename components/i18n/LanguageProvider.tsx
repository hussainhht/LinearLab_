'use client'

import { createContext, use, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import { translate, type Language, type TranslationKey, type TranslationParams, type Translator } from '@/lib/i18n/dictionaries'
import { getLanguage, setLanguage, subscribeLanguage } from '@/lib/i18n/language'
import { translateError } from '@/lib/i18n/errors'

interface I18nApi {
  language: Language
  setLanguage: (language: Language) => void
  t: Translator
  error: (message: string) => string
}
const englishApi: I18nApi = { language: 'en', setLanguage, t: (key, params) => translate('en', key, params), error: (message) => translateError(message, (key, params) => translate('en', key, params)) }
const I18nContext = createContext<I18nApi>(englishApi)
const serverLanguage = (): Language => 'en'

/** A shared preference above the routes; changing it updates text without replacing page state. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribeLanguage, getLanguage, serverLanguage)
  const value = useMemo<I18nApi>(() => {
    const t: Translator = (key, params) => translate(language, key, params)
    return { language, setLanguage, t, error: (message) => translateError(message, t) }
  }, [language])
  return <I18nContext value={value}>{children}</I18nContext>
}

export function useI18n(): I18nApi {
  const value = use(I18nContext)
  return value
}

/** Client text leaves let server-rendered course pages retain their existing content tree. */
export function T({ k, params }: { k: TranslationKey; params?: TranslationParams }) {
  const { t, language } = useI18n()
  return <span lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(k, params)}</span>
}

export function SkipLink() {
  const { t } = useI18n()
  return <a href="#main" className="skip-link">{t('nav.skip')}</a>
}

/** Localized attributes for server-rendered number and content leaves. Props stay serializable. */
export function LocalizedSpan({ titleKey, labelKey, params, children, className }: { titleKey?: TranslationKey; labelKey?: TranslationKey; params?: TranslationParams; children: ReactNode; className?: string }) {
  const { t } = useI18n()
  return <span dir="ltr" className={className} title={titleKey ? t(titleKey, params) : undefined} aria-label={labelKey ? t(labelKey, params) : undefined}>{children}</span>
}
