import { describe, expect, it } from 'vitest'
import { ar, en, translate, type TranslationKey } from '../../lib/i18n/dictionaries'
import { normalizeLanguage, languageInitScript } from '../../lib/i18n/language'
import { translateError } from '../../lib/i18n/errors'
import { parseRational } from '../../lib/math/rational'
import { parseRowOperation } from '../../lib/math/rowOpNotation'
import { splitPastedMatrix } from '../../lib/math/parse'

describe('interface localization', () => {
  it('keeps nonempty English and Arabic dictionaries synchronized', () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort())
    for (const key of Object.keys(en) as TranslationKey[]) {
      expect(en[key].trim(), key).not.toBe('')
      expect(ar[key].trim(), key).not.toBe('')
      const names = [...ar[key].matchAll(/\{(\w+)\}/g)].map((match) => match[1])
      for (const name of names) expect(en[key], `${key}: ${name}`).toContain(`{${name}}`)
    }
  })

  it('defaults to English without inferring a browser language', () => {
    expect(normalizeLanguage(null)).toBe('en')
    expect(normalizeLanguage('fr')).toBe('en')
    expect(normalizeLanguage('ar')).toBe('ar')
    expect(languageInitScript).not.toContain('navigator')
  })

  it('interpolates English faithfully and isolates mixed Arabic parameters', () => {
    expect(translate('en', 'demo.step', { index: 2, count: 9 })).toBe('Step 2 of 9')
    expect(translate('ar', 'demo.step', { index: 2, count: 9 })).toBe('الخطوة ⁨2⁩ من ⁨9⁩')
  })

  it('falls back to English if an Arabic entry is unavailable at runtime', () => {
    const original = ar['nav.tools']
    try {
      ar['nav.tools'] = ''
      expect(translate('ar', 'nav.tools')).toBe('Tools')
    } finally {
      ar['nav.tools'] = original
    }
  })

  it('translates real parser validation while preserving engine messages', () => {
    const messages = [parseRational(''), parseRational('1/0'), parseRational('abc'), parseRational('1/2/3'), parseRational('1'.repeat(41)), splitPastedMatrix('1 2;3'), parseRowOperation('R9 <-> R1', 3), parseRowOperation('R1 <- R1', 3), parseRowOperation('R1 <- R2', 3)]
    for (const result of messages) {
      expect(result.ok).toBe(false)
      if (result.ok) continue
      expect(translateError(result.error, (key, params) => translate('en', key, params))).toBe(result.error)
      expect(translateError(result.error, (key, params) => translate('ar', key, params))).toMatch(/[\u0600-\u06ff]/)
    }
    expect(translateError('Unrecognized engine message', (key, params) => translate('ar', key, params))).toBe('Unrecognized engine message')
  })
})
