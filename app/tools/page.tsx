import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { TOOLS } from '@/components/tools/catalog'
import styles from './tools.module.css'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Interactive linear algebra tools that show their work with exact fractions.',
}

export default function ToolsPage() {
  return (
    <>
      <div className={styles.intro}>
        <h1 className={styles.title}>Tools</h1>
        <p className={styles.lede}>
          Each tool works with exact fractions and explains its steps. Your input stays put while you switch between tools
          and lessons.
        </p>
      </div>
      <ul className={styles.toolList}>
        {TOOLS.map((tool) => (
          <li key={tool.href} className={styles.toolItem}>
            <h2 className={styles.toolName}>
              <Link href={tool.href}>{tool.name}</Link>
            </h2>
            <p className={styles.toolDescription}>{tool.description}</p>
            <ButtonLink href={tool.href} size="sm" aria-label={`Open ${tool.name}`}>
              Open
            </ButtonLink>
          </li>
        ))}
      </ul>
    </>
  )
}
