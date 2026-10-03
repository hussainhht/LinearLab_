'use client'

import Link from 'next/link'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { LanguageSelector } from '@/components/i18n/LanguageSelector'
import { LogoMark } from './Logo'
import { NavLinks } from './NavLinks'
import { ThemeToggle } from './ThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { t } = useI18n()
  return (
    <header className={`${styles.header} no-print`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <LogoMark />
          <span className={styles.wordmark} translate="no">
            LinearLab
          </span>
        </Link>
        <nav aria-label={t('nav.main')} className={styles.nav}>
          <NavLinks />
        </nav>
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  )
}

export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={styles.footerInner}>
        <p>
          {t('footer.about')}
        </p>
        <p>
          <a href="https://github.com/hussainhht">{t('footer.source')}</a>
        </p>
      </div>
    </footer>
  )
}
