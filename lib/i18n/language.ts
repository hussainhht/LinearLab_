import type { Language } from './dictionaries'

export const LANGUAGE_STORAGE_KEY = 'linearlab:language'
const LANGUAGE_EVENT = 'linearlab-language'

export function normalizeLanguage(value: string | null): Language {
  return value === 'ar' ? 'ar' : 'en'
}

export function applyLanguage(language: Language): void {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}

export function getLanguage(): Language {
  return normalizeLanguage(document.documentElement.lang)
}

export function setLanguage(language: Language): void {
  applyLanguage(language)
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // Document state preserves this choice for the visit when storage is unavailable.
  }
  window.dispatchEvent(new Event(LANGUAGE_EVENT))
}

export function subscribeLanguage(callback: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== LANGUAGE_STORAGE_KEY) return
    applyLanguage(normalizeLanguage(event.newValue))
    callback()
  }
  window.addEventListener(LANGUAGE_EVENT, callback)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(LANGUAGE_EVENT, callback)
    window.removeEventListener('storage', onStorage)
  }
}

// Runs before painting; client text still hydrates from the English server snapshot.
export const languageInitScript = `(function(){var l='en';try{l=localStorage.getItem('${LANGUAGE_STORAGE_KEY}')==='ar'?'ar':'en'}catch(e){}document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr'})()`
