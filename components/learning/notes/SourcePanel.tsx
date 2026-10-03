import type { Notes } from '@/content/lessons/catalog'
import type { ParsedNotes } from '@/lib/course/markdown'
import { T } from '@/components/i18n/LanguageProvider'
import { LedgerNotice } from '../LearningUi'
import styles from './notes.module.css'

/**
 * What the chapter says about its own sources, and what this site has and has not verified. The
 * metadata is shown as supplied; nothing here is inferred or filled in.
 */
export function SourcePanel({ notes, parsed, scanStats }: { notes: Notes; parsed: ParsedNotes; scanStats: { available: number; total: number } }) {
  const { frontmatter } = parsed
  const reviewNotes = notes.reviewNotes ?? []
  return (
    <details className={styles.sources}>
      <summary><T k="learning.source.title" /></summary>
      <div className={styles.sourcesBody}>
        <p className={styles.status}>
          <strong><T k="learning.source.status" /></strong> <T k="learning.source.integrated" />{' '}
          <T k={notes.verification === 'numbers-recomputed' ? 'learning.source.recomputed' : 'learning.source.unchecked'} />
        </p>
        {reviewNotes.length > 0 ? (
          <>
            <h3 className={styles.reviewHeading}><T k="learning.source.review" /></h3>
            <ul className={styles.reviewNotes} lang="en" dir="ltr">
              {reviewNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </>
        ) : null}
        <dl className={styles.facts}>
          {frontmatter.course ? (
            <>
              <dt><T k="learning.course" /></dt>
              <dd lang="en" dir="ltr">{frontmatter.course}</dd>
            </>
          ) : null}
          <dt><T k="learning.source.section" /></dt>
          <dd>
            {notes.sectionLabel ? <bdi lang="en" dir="ltr">{notes.sectionLabel}</bdi> : <T k="learning.source.noSection" />}
            {notes.labelNote ? <> — <bdi lang="en" dir="ltr">{notes.labelNote}</bdi></> : null}
          </dd>
          <dt><T k="learning.source.documents" /></dt>
          <dd>
            {frontmatter.sourceIds.length === 0 ? (
              <T k="learning.source.noneListed" />
            ) : (
              <>
                <T k="learning.source.listed" params={{ count: frontmatter.sourceIds.length }} />
                {frontmatter.sourcePageCount !== null ? <bdi dir="ltr">{` (source_page_count: ${frontmatter.sourcePageCount})`}</bdi> : null}:{' '}
                {frontmatter.sourceIds.map((id, i) => (
                  <span key={id}>
                    {i > 0 ? ', ' : ''}
                    <code dir="ltr">{id}</code>
                  </span>
                ))}
              </>
            )}
          </dd>
          {frontmatter.contentFormat ? (
            <>
              <dt><T k="learning.source.format" /></dt>
              <dd dir="ltr">
                <code>{frontmatter.contentFormat}</code>
              </dd>
            </>
          ) : null}
          {frontmatter.sourceCoverage ? (
            <>
              <dt><T k="learning.source.coverage" /></dt>
              <dd lang="en" dir="ltr">{frontmatter.sourceCoverage}</dd>
            </>
          ) : null}
          <dt><T k="learning.source.scans" /></dt>
          <dd><LedgerNotice {...scanStats} /></dd>
          <dt><T k="learning.source.file" /></dt>
          <dd dir="ltr">
            <code>{notes.source}</code>
          </dd>
        </dl>
      </div>
    </details>
  )
}
