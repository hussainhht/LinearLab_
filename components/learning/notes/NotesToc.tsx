import type { TocEntry } from '@/lib/course/markdown'
import { T } from '@/components/i18n/LanguageProvider'
import { LearningUi } from '../LearningUi'
import { renderInline } from './noteComponents'
import styles from './notes.module.css'

const KIND_LABELS = {
  core: null,
  'source-version': 'learning.toc.source',
  supplementary: 'learning.toc.supplementary',
  ledger: 'learning.toc.ledger',
} as const

/**
 * "On this page": a link to every section (level 2) and subsection (level 3) of the chapter. Plain
 * links to the headings' ids, so it works without JavaScript. Always open beside the article on wide
 * screens, a collapsed disclosure above it on narrow ones.
 */
export function NotesToc({ entries }: { entries: readonly TocEntry[] }) {
  return (
    <LearningUi as="nav" labelKey="learning.toc.title" className={styles.toc}>
      <details className={styles.tocDetails}>
        <summary className={styles.tocSummary}><T k="learning.toc.title" /></summary>
        <ol className={styles.tocList}>
          {entries.map((entry) => (
            <li key={entry.id} data-depth={entry.depth}>
              <a href={`#${entry.id}`}>
                {entry.depth === 2 && KIND_LABELS[entry.kind] ? <span className={styles.tocKind}><T k={KIND_LABELS[entry.kind]!} /></span> : null}
                <span lang="en" dir="ltr" className={styles.tocText}>{renderInline(entry.content)}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </LearningUi>
  )
}
