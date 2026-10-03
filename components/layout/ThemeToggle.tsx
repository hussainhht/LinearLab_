'use client'

import { useSyncExternalStore } from 'react'
import { Icon } from '@/components/ui/Icon'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import { useI18n } from '@/components/i18n/LanguageProvider'
import styles from './SiteHeader.module.css'

const QUERY = '(prefers-color-scheme: dark)'
const EVENT = 'linearlab-theme'

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', callback)
  window.addEventListener(EVENT, callback)
  return () => {
    media.removeEventListener('change', callback)
    window.removeEventListener(EVENT, callback)
  }
}

function resolvedTheme(): 'light' | 'dark' {
  const explicit = document.documentElement.dataset.theme
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia(QUERY).matches ? 'dark' : 'light'
}

/** Switches between the paper (light) and chalkboard (dark) themes; the choice is remembered. */
export function ThemeToggle() {
  const { t } = useI18n()
  const theme = useSyncExternalStore(subscribe, resolvedTheme, () => null)
  const next = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // The choice still applies for this visit.
    }
    window.dispatchEvent(new Event(EVENT))
  }

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggle}
      aria-label={theme ? t(next === 'light' ? 'theme.light' : 'theme.dark') : t('theme.switch')}
      title={theme ? t(next === 'light' ? 'theme.light' : 'theme.dark') : undefined}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
    </button>
  )
}
