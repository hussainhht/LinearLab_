'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TOOLS } from './catalog'
import styles from './ToolNav.module.css'

/** Switches between tools while keeping each tool's work (state lives in WorkspaceProvider). */
export function ToolNav() {
  const pathname = usePathname() ?? ''
  return (
    <nav aria-label="Tools" className={`${styles.nav} no-print`}>
      <ul className={styles.list}>
        {TOOLS.map((tool) => {
          const active = pathname.startsWith(tool.href.replace(/\/$/, ''))
          return (
            <li key={tool.href}>
              <Link href={tool.href} className={styles.tab} aria-current={active ? 'page' : undefined}>
                {tool.shortName}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
