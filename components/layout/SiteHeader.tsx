import Link from 'next/link'
import { LogoMark } from './Logo'
import { NavLinks } from './NavLinks'
import { ThemeToggle } from './ThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  return (
    <header className={`${styles.header} no-print`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <LogoMark />
          <span className={styles.wordmark} translate="no">
            LinearLab
          </span>
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <NavLinks />
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={styles.footerInner}>
        <p>
          LinearLab, by Hussain Ali, University of Bahrain. Every calculation runs in your browser with exact
          fractions.
        </p>
        <p>
          <a href="https://github.com/hussainhht/LinearLab_">Source on GitHub</a>
        </p>
      </div>
    </footer>
  )
}
