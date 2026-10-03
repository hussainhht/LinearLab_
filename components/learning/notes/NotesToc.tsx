import type { TocEntry } from '@/lib/course/markdown'
import { renderInline } from './noteComponents'
import styles from './notes.module.css'

const KIND_LABELS = {
  core: null,
  'source-version': 'source version',
  supplementary: 'supplementary',
  ledger: 'source ledger',
} as const

/**
 * "On this page": a link to every section (level 2) and subsection (level 3) of the chapter. Plain
 * links to the headings' ids, so it works without JavaScript. Always open beside the article on wide
 * screens, a collapsed disclosure above it on narrow ones.
 */
export function NotesToc({ entries }: { entries: readonly TocEntry[] }) {
  return (
    <nav aria-label="On this page" className={styles.toc}>
      <details className={styles.tocDetails}>
        <summary className={styles.tocSummary}>On this page</summary>
        <ol className={styles.tocList}>
          {entries.map((entry) => (
            <li key={entry.id} data-depth={entry.depth}>
              <a href={`#${entry.id}`}>
                {entry.depth === 2 && KIND_LABELS[entry.kind] ? <span className={styles.tocKind}>{KIND_LABELS[entry.kind]}</span> : null}
                {renderInline(entry.content)}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  )
}
