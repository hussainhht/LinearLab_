import Link from 'next/link'
import { type Chapter, pageHref } from '@/content/lessons/catalog'
import styles from './notes.module.css'

/** The interactive lessons, tools and practice that go with a chapter. Renders nothing for a chapter with none. */
export function RelatedPanel({ chapter }: { chapter: Chapter }) {
  const { lessons, tools, practice } = chapter
  if (lessons.length + tools.length + practice.length === 0) return null
  return (
    <aside className={styles.related} id="study-this-chapter" aria-labelledby="study-this-chapter-title">
      <h2 id="study-this-chapter-title">Study this chapter</h2>
      {lessons.length > 0 ? (
        <div className={styles.relatedGroup}>
          <h3>Interactive lessons</h3>
          <ul className={styles.relatedList}>
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <span className={`${styles.num} num`}>{lesson.number}</span>
                <Link href={pageHref(lesson)}>{lesson.title}</Link> <span>{lesson.objective}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {tools.length > 0 ? (
        <div className={styles.relatedGroup}>
          <h3>Tools</h3>
          <ul className={styles.relatedList}>
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href}>{tool.label}</Link> <span>{tool.why}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {practice.length > 0 ? (
        <div className={styles.relatedGroup}>
          <h3>Practice</h3>
          <ul className={styles.relatedList}>
            {practice.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link> <span>{item.why}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  )
}
