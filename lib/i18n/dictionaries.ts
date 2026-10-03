import { commonEn, commonAr } from './common'
import { errorsEn, errorsAr } from './errors'
import { learningEn, learningAr } from './learning'
import { toolsEn, toolsAr } from './tools'
import { practiceEn, practiceAr } from './practice'

export const en = { ...commonEn, ...errorsEn, ...learningEn, ...toolsEn, ...practiceEn }
export const ar = { ...commonAr, ...errorsAr, ...learningAr, ...toolsAr, ...practiceAr } satisfies Record<keyof typeof en, string>
export type TranslationKey = keyof typeof en
export type Language = 'en' | 'ar'
export type TranslationParams = Readonly<Record<string, string | number>>
export type Translator = (key: TranslationKey, params?: TranslationParams) => string

/** English is also the runtime fallback for incomplete dictionaries received by older clients. */
export function translate(language: Language, key: TranslationKey, params: TranslationParams = {}): string {
  const text = (language === 'ar' ? ar[key] : en[key]) || en[key]
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = params[name]
    if (value === undefined) return placeholder
    // Isolate Latin identifiers/numbers in Arabic sentences without changing their stored values.
    return language === 'ar' ? `\u2068${value}\u2069` : String(value)
  })
}
