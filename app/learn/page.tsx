import type { Metadata } from 'next'
import Link from 'next/link'
import { Page, PageHeader } from '@/components/layout/Page'
import { CompletionMark, ProgressSummary } from '@/components/learning/LessonProgress'
import { chapters, lessons } from '@/content/lessons/catalog'
import styles from '@/components/learning/learning.module.css'

export const metadata: Metadata = {
  title: 'Course',
  description: 'A linear algebra course from linear systems to determinants, with worked examples and interactive checks.',
}

export default function LearnPage() {
  return (
    <Page>
      <PageHeader
        title="Linear algebra, one idea at a time"
        lede="Five chapters that build on each other: from a single linear equation to row reduction, matrix algebra, inverses and determinants. Every worked example opens in the tools."
      >
        <ProgressSummary lessonIds={lessons.map((l) => l.id)} />
      </PageHeader>
      <ol className={styles.overviewChapters}>
        {chapters.map((chapter, c) => (
          <li key={chapter.id} className={styles.overviewChapter}>
            <div className={styles.overviewChapterHead}>
              <span className={styles.overviewChapterNumber} aria-hidden="true">
                {c + 1}
              </span>
              <h2>
                <span className="sr-only">Chapter {c + 1}: </span>
                {chapter.title}
              </h2>
              <p className={styles.muted}>{chapter.summary}</p>
            </div>
            <ol className={styles.overviewLessons}>
              {lessons
                .filter((l) => l.chapterId === chapter.id)
                .map((lesson) => (
                  <li key={lesson.id} className={styles.overviewLesson}>
                    <Link href={`/learn/${lesson.slug}/`}>
                      <span className={`${styles.lessonNumber} num`}>{lesson.number}</span>
                      <span className={styles.overviewLessonTitle}>{lesson.title}</span>
                      <CompletionMark lessonId={lesson.id} />
                      <span className={styles.overviewLessonObjective}>{lesson.objective}</span>
                    </Link>
                  </li>
                ))}
            </ol>
          </li>
        ))}
      </ol>
    </Page>
  )
}
