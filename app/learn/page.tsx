import type { Metadata } from 'next'
import { Page, PageHeader } from '@/components/layout/Page'
import { CompletionMark, ProgressSummary } from '@/components/learning/LessonProgress'
import { PageLink } from '@/components/learning/PageLink'
import { SearchForm } from '@/components/learning/SearchForm'
import { Icon } from '@/components/ui/Icon'
import { T } from '@/components/i18n/LanguageProvider'
import { chapterList, lessons, progressIds } from '@/content/lessons/catalog'
import styles from '@/components/learning/learning.module.css'

export const metadata: Metadata = {
  title: 'Course',
  description: `A linear algebra course in ${chapterList.length} chapters, from linear systems to orthogonality: lecture notes with worked examples, interactive lessons and exact tools.`,
}

export default function LearnPage() {
  return (
    <Page>
      <PageHeader
        title={<T k="learning.overview.title" />}
        lede={<T k="learning.overview.lede" params={{ chapters: chapterList.length, lessons: lessons.length }} />}
      >
        <ProgressSummary lessonIds={progressIds} scope="chaptersLessons" />
        <div className={styles.overviewSearch}>
          <SearchForm id="overview-search" />
        </div>
      </PageHeader>
      <ol className={styles.overviewChapters}>
        {chapterList.map((chapter) => (
          <li key={chapter.id} className={styles.overviewChapter}>
            <div className={styles.overviewChapterHead}>
              <span className={styles.overviewChapterNumber} aria-hidden="true">
                {chapter.number}
              </span>
              <h2 lang="en" dir="ltr">
                <span className="sr-only"><T k="learning.chapter" params={{ number: chapter.number }} /></span>
                <span>{chapter.title}</span>
              </h2>
              <p className={styles.muted} lang="en" dir="ltr">{chapter.summary}</p>
              {chapter.notes.sectionLabel ? (
                <p className={styles.muted}><T k="learning.notesSection" params={{ section: chapter.notes.sectionLabel }} /></p>
              ) : null}
            </div>
            <ol className={styles.overviewLessons}>
              <li className={styles.overviewLesson}>
                <PageLink page={chapter.notes}>
                  <span className={styles.lessonNumber}>
                    <Icon name="book" size={18} />
                  </span>
                  <span className={styles.overviewLessonTitle}>
                    <T k="learning.lectureNotes" /><span className="sr-only"><T k="learning.forTitle" params={{ title: chapter.title }} /></span>
                  </span>
                  <CompletionMark lessonId={chapter.notes.progressId} />
                  <span className={styles.overviewLessonObjective} lang="en" dir="ltr">{chapter.notes.intro}</span>
                </PageLink>
              </li>
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id} className={styles.overviewLesson}>
                  <PageLink page={lesson}>
                    <span className={`${styles.lessonNumber} num`}>{lesson.number}</span>
                    <span className={styles.overviewLessonTitle} lang="en" dir="ltr">{lesson.title}</span>
                    <CompletionMark lessonId={lesson.id} />
                    <span className={styles.overviewLessonObjective} lang="en" dir="ltr">{lesson.objective}</span>
                  </PageLink>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </Page>
  )
}
