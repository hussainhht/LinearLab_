import Link from 'next/link'
import { T } from '@/components/i18n/LanguageProvider'
import { type CoursePage, neighbors } from '@/content/lessons/catalog'
import { LearningUi } from './LearningUi'
import { PageLink } from './PageLink'
import styles from './learning.module.css'

/** Previous and next page in reading order: each chapter's lecture notes, then its interactive lessons. */
export function Pager({ page }: { page: CoursePage }) {
  const kicker = (item: CoursePage) => item.kind === 'lesson'
    ? <bdi dir="ltr">{item.number}</bdi>
    : <T k="learning.pager.chapterNotes" params={{ number: item.chapterNumber }} />
  const { previous, next } = neighbors(page)
  return (
    <LearningUi as="nav" labelKey={page.kind === 'notes' ? 'learning.pager.chapter' : 'learning.pager.lesson'} className={styles.pager}>
      {previous ? (
        <PageLink page={previous} className={styles.pagerLink} rel="prev">
          <span><T k="learning.pager.previous" />{kicker(previous)}</span>
          <span lang="en" dir="ltr">{previous.title}</span>
        </PageLink>
      ) : null}
      {next ? (
        <PageLink page={next} className={`${styles.pagerLink} ${styles.pagerNext}`} rel="next">
          <span><T k="learning.pager.next" />{kicker(next)}</span>
          <span lang="en" dir="ltr">{next.title}</span>
        </PageLink>
      ) : (
        <Link href="/practice/" className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span><T k="learning.pager.finished" /></span>
          <span><T k="learning.pager.practice" /></span>
        </Link>
      )}
    </LearningUi>
  )
}
