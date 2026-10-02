import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CourseNav } from '@/components/learning/CourseNav'
import { MarkComplete } from '@/components/learning/LessonProgress'
import { lessonBodies } from '@/content/lessons/bodies'
import { findLesson, lessons, neighbors, outline } from '@/content/lessons/catalog'
import styles from '@/components/learning/learning.module.css'

export const dynamicParams = false

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: PageProps<'/learn/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const lesson = findLesson(slug)
  return lesson ? { title: `${lesson.number} ${lesson.title}`, description: lesson.objective } : {}
}

export default async function LessonPage({ params }: PageProps<'/learn/[slug]'>) {
  const { slug } = await params
  const lesson = findLesson(slug)
  if (!lesson) notFound()
  const { default: Body } = await lessonBodies[lesson.slug]()
  const { previous, next } = neighbors(lesson)

  return (
    <div className={styles.layout}>
      <CourseNav outline={outline} />
      <article className={styles.article}>
        <header className={styles.lessonHeader}>
          <p className={styles.chapterLine}>
            <Link href="/learn/">Course</Link> / Chapter {lesson.chapterNumber}: {lesson.chapterTitle}
          </p>
          <h1 className={styles.lessonTitle}>
            <span className="num">{lesson.number}</span> {lesson.title}
          </h1>
          <div className={styles.objective}>
            <p>By the end of this lesson you can</p>
            <p>{lesson.objective.charAt(0).toLowerCase() + lesson.objective.slice(1)}</p>
          </div>
        </header>
        <div className={styles.prose}>
          <Body />
        </div>
        <footer className={styles.lessonFooter}>
          <MarkComplete lessonId={lesson.id} title={lesson.title} />
          <nav aria-label="Lesson navigation" className={styles.pager}>
            {previous ? (
              <Link href={`/learn/${previous.slug}/`} className={styles.pagerLink} rel="prev">
                <span>Previous: {previous.number}</span>
                <span>{previous.title}</span>
              </Link>
            ) : null}
            {next ? (
              <Link href={`/learn/${next.slug}/`} className={`${styles.pagerLink} ${styles.pagerNext}`} rel="next">
                <span>Next: {next.number}</span>
                <span>{next.title}</span>
              </Link>
            ) : (
              <Link href="/practice/" className={`${styles.pagerLink} ${styles.pagerNext}`}>
                <span>Course finished</span>
                <span>Practice row reduction</span>
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </div>
  )
}
