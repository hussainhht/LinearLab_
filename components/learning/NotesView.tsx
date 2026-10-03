import Link from 'next/link'
import { T } from '@/components/i18n/LanguageProvider'
import { type Notes, chapterList, lessons, outline } from '@/content/lessons/catalog'
import { ledgerNote, loadNotes, scanHref } from '@/lib/course/notes'
import { CourseNav } from './CourseNav'
import { MarkComplete } from './LessonProgress'
import { Pager } from './Pager'
import { NotesToc } from './notes/NotesToc'
import { RelatedPanel } from './notes/RelatedPanel'
import { SourcePanel } from './notes/SourcePanel'
import { LearningUi } from './LearningUi'
import { type NoteRenderContext, renderNotes } from './notes/noteComponents'
import learning from './learning.module.css'
import styles from './notes/notes.module.css'

const lessonSlugs: ReadonlySet<string> = new Set(lessons.map((lesson) => lesson.slug))

/**
 * A chapter's lecture notes: the Markdown file typeset at build time, with the course navigation, a
 * contents list, the chapter's sources and status, related lessons and tools, and previous/next links.
 */
export async function NotesView({ notes }: { notes: Notes }) {
  const parsed = await loadNotes(notes)
  const chapter = chapterList[notes.chapterNumber - 1]!
  const note = ledgerNote(parsed.scans)
  const scanStats = { available: parsed.scans.filter((scan) => scanHref(scan) !== null).length, total: parsed.scans.length }
  const context: NoteRenderContext = {
    lessonSlugs,
    anchorAliases: notes.anchorAliases ?? {},
    scanHref,
    ledgerNote: note,
    scanStats,
  }
  const hasRelated = chapter.lessons.length + chapter.tools.length + chapter.practice.length > 0
  const course = parsed.frontmatter.course

  return (
    <div className={styles.layout}>
      <div className={styles.navArea}>
        <CourseNav outline={outline} />
      </div>
      <div className={styles.tocArea}>
        <NotesToc entries={parsed.toc} />
      </div>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.crumbs}>
            <Link href="/learn/"><T k="learning.course" /></Link> / <T k="learning.chapterOf" params={{ number: chapter.number, total: chapterList.length }} /><bdi lang="en" dir="ltr">{chapter.title}</bdi>
          </p>
          <h1 className={styles.title} lang="en" dir="ltr">{parsed.title}</h1>
          <LearningUi as="ul" className={styles.chips} labelKey="learning.aboutPage">
            <li className={styles.chip}><T k="learning.lectureNotes" /></li>
            {notes.sectionLabel ? (
              <li className={styles.chip}>
                {course ? <><bdi lang="en" dir="ltr">{course}</bdi> · </> : null}<T k="learning.section" params={{ section: notes.sectionLabel }} />
              </li>
            ) : null}
          </LearningUi>
          <div className={styles.intro}>
            <p><T k="learning.aboutChapter" /></p>
            <p lang="en" dir="ltr">{notes.intro}</p>
          </div>
          {hasRelated ? (
            <p className={styles.jump}>
              <a href="#study-this-chapter"><T k="learning.related.jump" /></a>
            </p>
          ) : null}
          <SourcePanel notes={notes} parsed={parsed} scanStats={scanStats} />
        </header>
        <div className={styles.prose} lang="en" dir="ltr">{renderNotes(parsed.hast, context)}</div>
        <RelatedPanel chapter={chapter} />
        <footer className={learning.lessonFooter}>
          <MarkComplete lessonId={notes.progressId} title={chapter.title} kind="chapter" />
          <Pager page={notes} />
        </footer>
      </article>
    </div>
  )
}
