import Link from 'next/link'
import { type Notes, chapterList, lessons, outline } from '@/content/lessons/catalog'
import { ledgerNote, loadNotes, scanHref } from '@/lib/course/notes'
import { CourseNav } from './CourseNav'
import { MarkComplete } from './LessonProgress'
import { Pager } from './Pager'
import { NotesToc } from './notes/NotesToc'
import { RelatedPanel } from './notes/RelatedPanel'
import { SourcePanel } from './notes/SourcePanel'
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
  const context: NoteRenderContext = {
    lessonSlugs,
    anchorAliases: notes.anchorAliases ?? {},
    scanHref,
    ledgerNote: note,
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
            <Link href="/learn/">Course</Link> / Chapter {chapter.number} of {chapterList.length}: {chapter.title}
          </p>
          <h1 className={styles.title}>{parsed.title}</h1>
          <ul className={styles.chips} aria-label="About this page">
            <li className={styles.chip}>Lecture notes</li>
            {notes.sectionLabel ? (
              <li className={styles.chip}>
                {course ? `${course} · ` : ''}section {notes.sectionLabel}
              </li>
            ) : null}
          </ul>
          <div className={styles.intro}>
            <p>About this chapter</p>
            <p>{notes.intro}</p>
          </div>
          {hasRelated ? (
            <p className={styles.jump}>
              <a href="#study-this-chapter">Related lessons, tools and practice</a>
            </p>
          ) : null}
          <SourcePanel notes={notes} parsed={parsed} ledgerNote={note} />
        </header>
        <div className={styles.prose}>{renderNotes(parsed.hast, context)}</div>
        <RelatedPanel chapter={chapter} />
        <footer className={learning.lessonFooter}>
          <MarkComplete lessonId={notes.progressId} title={chapter.title} label="Mark chapter complete" />
          <Pager page={notes} label="Chapter navigation" />
        </footer>
      </article>
    </div>
  )
}
