'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/components/i18n/LanguageProvider'
import styles from './SiteHeader.module.css'

const LINKS = [
  { href: '/learn/', label: 'nav.learn', match: '/learn' },
  { href: '/tools/', label: 'nav.tools', match: '/tools' },
  { href: '/practice/', label: 'nav.practice', match: '/practice' },
] as const

export function NavLinks() {
  const { t } = useI18n()
  const pathname = usePathname() ?? '/'
  return (
    <ul className={styles.links}>
      {LINKS.map((link) => {
        const active = pathname.startsWith(link.match)
        return (
          <li key={link.href}>
            <Link href={link.href} className={styles.link} aria-current={active ? 'page' : undefined}>
              {t(link.label)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
