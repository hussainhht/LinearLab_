import Link from 'next/link'
import { lessonBodies } from '@/content/lessons/bodies'
import { type Lesson, chapterList, outline } from '@/content/lessons/catalog'
import { CourseNav } from './CourseNav'
import { MarkComplete } from './LessonProgress'
import { Pager } from './Pager'
import { PageLink } from './PageLink'
import styles from './learning.module.css'

/** An interactive lesson (MDX) with the course navigation beside it. */
export async function LessonView({ lesson }: { lesson: Lesson }) {
  const { default: Body } = await lessonBodies[lesson.slug]()
  const chapter = chapterList[lesson.chapterNumber - 1]!

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
          <p className={styles.muted}>
            The <PageLink page={chapter.notes}>lecture notes for this chapter</PageLink> cover it in full, with more worked
            examples and exercises.
          </p>
        </header>
        <div className={styles.prose}>
          <Body />
        </div>
        <footer className={styles.lessonFooter}>
          <MarkComplete lessonId={lesson.id} title={lesson.title} />
          <Pager page={lesson} />
        </footer>
      </article>
    </div>
  )
}
