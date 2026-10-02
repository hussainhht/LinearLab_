import type { ReactNode } from 'react'
import styles from './Page.module.css'

/** Standard page frame: a title block followed by content, aligned to the page grid. */
export function Page({ children, width = 'wide' }: { children: ReactNode; width?: 'wide' | 'narrow' }) {
  return <div className={`${styles.page} ${width === 'narrow' ? styles.narrow : ''}`}>{children}</div>
}

export function PageHeader({ title, lede, children }: { title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
      {children}
    </header>
  )
}
