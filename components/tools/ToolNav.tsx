'use client'

import Link from 'next/link'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { usePathname } from 'next/navigation'
import { TOOLS } from './catalog'
import styles from './ToolNav.module.css'

/** Switches between tools while keeping each tool's work (state lives in WorkspaceProvider). */
export function ToolNav() {
  const { t } = useI18n()
  const pathname = usePathname() ?? ''
  return (
    <nav aria-label={t('tools.title')} className={`${styles.nav} no-print`}>
      <ul className={styles.list}>
        {TOOLS.map((tool) => {
          const active = pathname.startsWith(tool.href.replace(/\/$/, ''))
          return (
            <li key={tool.href}>
              <Link href={tool.href} className={styles.tab} aria-current={active ? 'page' : undefined}>
                {t(tool.shortNameKey)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
