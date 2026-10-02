'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { OutlineChapter } from '@/content/lessons/catalog'
import { useCompletedLessons } from '@/lib/storage/progress'
import { Icon } from '@/components/ui/Icon'
import styles from './learning.module.css'

/** Course sidebar generated from the catalog; shows completion from local progress. */
export function CourseNav({ outline }: { outline: readonly OutlineChapter[] }) {
  const pathname = usePathname() ?? ''
  const completed = useCompletedLessons()
  const total = outline.reduce((n, c) => n + c.lessons.length, 0)
  const done = outline.reduce((n, c) => n + c.lessons.filter((l) => completed.has(l.id)).length, 0)

  return (
    <nav aria-label="Course" className={styles.courseNav}>
      <details className={styles.courseDetails} open>
        <summary className={styles.courseSummary}>
          <span>Course contents</span>
          <span className={styles.courseCount}>
            {done} of {total} complete
          </span>
        </summary>
        <ol className={styles.chapterList}>
          {outline.map((chapter) => (
            <li key={chapter.id}>
              <p className={styles.chapterName}>
                <span className="num">{chapter.number}</span> {chapter.title}
              </p>
              <ol className={styles.lessonList}>
                {chapter.lessons.map((lesson) => {
                  const active = pathname.replace(/\/$/, '').endsWith(`/learn/${lesson.slug}`)
                  const isDone = completed.has(lesson.id)
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/learn/${lesson.slug}/`}
                        className={styles.lessonLink}
                        aria-current={active ? 'page' : undefined}
                        data-done={isDone || undefined}
                      >
                        <span className={`${styles.lessonNumber} num`}>{lesson.number}</span>
                        <span>{lesson.title}</span>
                        {isDone ? (
                          <span className={styles.doneMark}>
                            <Icon name="check" size={14} />
                            <span className="sr-only"> (completed)</span>
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  )
}
