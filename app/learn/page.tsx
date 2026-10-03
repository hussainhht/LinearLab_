import type { Metadata } from 'next'
import { Page, PageHeader } from '@/components/layout/Page'
import { CompletionMark, ProgressSummary } from '@/components/learning/LessonProgress'
import { PageLink } from '@/components/learning/PageLink'
import { SearchForm } from '@/components/learning/SearchForm'
import { Icon } from '@/components/ui/Icon'
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
        title="Linear algebra, one idea at a time"
        lede={`${chapterList.length} chapters that build on each other, from a single linear equation to orthogonal complements. Every chapter has lecture notes with worked examples and exercises; ${lessons.length} short interactive lessons go with the chapters that have them, and their examples open in the tools.`}
      >
        <ProgressSummary lessonIds={progressIds} noun="chapters and lessons" />
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
              <h2>
                <span className="sr-only">Chapter {chapter.number}: </span>
                {chapter.title}
              </h2>
              <p className={styles.muted}>{chapter.summary}</p>
              {chapter.notes.sectionLabel ? (
                <p className={styles.muted}>Course notes section {chapter.notes.sectionLabel}</p>
              ) : null}
            </div>
            <ol className={styles.overviewLessons}>
              <li className={styles.overviewLesson}>
                <PageLink page={chapter.notes}>
                  <span className={styles.lessonNumber}>
                    <Icon name="book" size={18} />
                  </span>
                  <span className={styles.overviewLessonTitle}>
                    Lecture notes<span className="sr-only"> for {chapter.title}</span>
                  </span>
                  <CompletionMark lessonId={chapter.notes.progressId} />
                  <span className={styles.overviewLessonObjective}>{chapter.notes.intro}</span>
                </PageLink>
              </li>
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id} className={styles.overviewLesson}>
                  <PageLink page={lesson}>
                    <span className={`${styles.lessonNumber} num`}>{lesson.number}</span>
                    <span className={styles.overviewLessonTitle}>{lesson.title}</span>
                    <CompletionMark lessonId={lesson.id} />
                    <span className={styles.overviewLessonObjective}>{lesson.objective}</span>
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
