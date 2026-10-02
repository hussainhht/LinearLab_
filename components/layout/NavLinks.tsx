'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './SiteHeader.module.css'

const LINKS = [
  { href: '/learn/', label: 'Learn', match: '/learn' },
  { href: '/tools/', label: 'Tools', match: '/tools' },
  { href: '/practice/', label: 'Practice', match: '/practice' },
] as const

export function NavLinks() {
  const pathname = usePathname() ?? '/'
  return (
    <ul className={styles.links}>
      {LINKS.map((link) => {
        const active = pathname.startsWith(link.match)
        return (
          <li key={link.href}>
            <Link href={link.href} className={styles.link} aria-current={active ? 'page' : undefined}>
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
