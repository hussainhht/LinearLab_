import Link from 'next/link'
import { T } from '@/components/i18n/LanguageProvider'
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
            <Link href="/learn/"><T k="learning.course" /></Link> / <T k="learning.chapter" params={{ number: lesson.chapterNumber }} /><bdi lang="en" dir="ltr">{lesson.chapterTitle}</bdi>
          </p>
          <h1 className={styles.lessonTitle} lang="en" dir="ltr">
            <span className="num">{lesson.number}</span> {lesson.title}
          </h1>
          <div className={styles.objective}>
            <p><T k="learning.lessonObjective" /></p>
            <p lang="en" dir="ltr">{lesson.objective.charAt(0).toLowerCase() + lesson.objective.slice(1)}</p>
          </div>
          <p className={styles.muted}>
            <T k="learning.notesIntroBefore" /><PageLink page={chapter.notes}><T k="learning.notesIntroLink" /></PageLink><T k="learning.notesIntroAfter" />
          </p>
        </header>
        <div className={styles.prose} lang="en" dir="ltr">
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
