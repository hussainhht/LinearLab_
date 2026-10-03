import Link from 'next/link'
import { type CoursePage, neighbors } from '@/content/lessons/catalog'
import { PageLink } from './PageLink'
import styles from './learning.module.css'

function describe(page: CoursePage): { kicker: string; title: string } {
  return page.kind === 'lesson'
    ? { kicker: page.number, title: page.title }
    : { kicker: `Chapter ${page.chapterNumber} lecture notes`, title: page.title }
}

/** Previous and next page in reading order: each chapter's lecture notes, then its interactive lessons. */
export function Pager({ page, label = 'Lesson navigation' }: { page: CoursePage; label?: string }) {
  const { previous, next } = neighbors(page)
  return (
    <nav aria-label={label} className={styles.pager}>
      {previous ? (
        <PageLink page={previous} className={styles.pagerLink} rel="prev">
          <span>Previous: {describe(previous).kicker}</span>
          <span>{describe(previous).title}</span>
        </PageLink>
      ) : null}
      {next ? (
        <PageLink page={next} className={`${styles.pagerLink} ${styles.pagerNext}`} rel="next">
          <span>Next: {describe(next).kicker}</span>
          <span>{describe(next).title}</span>
        </PageLink>
      ) : (
        <Link href="/practice/" className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span>Course finished</span>
          <span>Practice row reduction</span>
        </Link>
      )}
    </nav>
  )
}
