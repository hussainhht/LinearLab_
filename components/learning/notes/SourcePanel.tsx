import type { Notes } from '@/content/lessons/catalog'
import type { ParsedNotes } from '@/lib/course/markdown'
import styles from './notes.module.css'

/**
 * What the chapter says about its own sources, and what this site has and has not verified. The
 * metadata is shown as supplied; nothing here is inferred or filled in.
 */
export function SourcePanel({ notes, parsed, ledgerNote }: { notes: Notes; parsed: ParsedNotes; ledgerNote: string }) {
  const { frontmatter } = parsed
  const reviewNotes = notes.reviewNotes ?? []
  return (
    <details className={styles.sources}>
      <summary>About these notes: sources and verification status</summary>
      <div className={styles.sourcesBody}>
        <p className={styles.status}>
          <strong>Status.</strong> Integrated exactly as supplied.{' '}
          {notes.verification === 'numbers-recomputed'
            ? 'The numerical results of its worked examples and exercises, and their key intermediate matrices, were recomputed independently with exact arithmetic and agree with the text, except where the review notes below say otherwise. Every printed intermediate step, the proofs and the explanations were not checked, and the transcription could not be checked against the original scans.'
            : 'This site has not independently checked the mathematics of this chapter (it states definitions and conversions rather than computed results), and could not check the transcription against the original scans.'}
        </p>
        {reviewNotes.length > 0 ? (
          <>
            <h3 className={styles.reviewHeading}>Review notes</h3>
            <ul className={styles.reviewNotes}>
              {reviewNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </>
        ) : null}
        <dl className={styles.facts}>
          {frontmatter.course ? (
            <>
              <dt>Course</dt>
              <dd>{frontmatter.course}</dd>
            </>
          ) : null}
          <dt>Section label</dt>
          <dd>
            {notes.sectionLabel ?? 'None in the supplied document'}
            {notes.labelNote ? <> — {notes.labelNote}</> : null}
          </dd>
          <dt>Source documents</dt>
          <dd>
            {frontmatter.sourceIds.length === 0 ? (
              'None listed'
            ) : (
              <>
                {frontmatter.sourceIds.length} listed
                {frontmatter.sourcePageCount !== null ? ` (source_page_count: ${frontmatter.sourcePageCount})` : ''}:{' '}
                {frontmatter.sourceIds.map((id, i) => (
                  <span key={id}>
                    {i > 0 ? ', ' : ''}
                    <code>{id}</code>
                  </span>
                ))}
              </>
            )}
          </dd>
          {frontmatter.contentFormat ? (
            <>
              <dt>Content format</dt>
              <dd>
                <code>{frontmatter.contentFormat}</code>
              </dd>
            </>
          ) : null}
          {frontmatter.sourceCoverage ? (
            <>
              <dt>Coverage, as stated</dt>
              <dd>{frontmatter.sourceCoverage}</dd>
            </>
          ) : null}
          <dt>Source scans</dt>
          <dd>{ledgerNote || 'This chapter cites no scan files by path.'}</dd>
          <dt>File</dt>
          <dd>
            <code>{notes.source}</code>
          </dd>
        </dl>
      </div>
    </details>
  )
}
