import Link from 'next/link'
import { type Chapter, pageHref } from '@/content/lessons/catalog'
import { T } from '@/components/i18n/LanguageProvider'
import styles from './notes.module.css'

const LINK_LABELS = {
  'System solver': 'learning.related.solver',
  'Matrix operations': 'learning.related.matrices',
  'Determinant calculators': 'learning.related.determinants',
  'Cramer’s rule': 'learning.related.cramer',
  'Practice row reduction': 'learning.related.rowPractice',
  'Concept checks: systems and ranks': 'learning.related.systemChecks',
  'Concept checks: row reduction': 'learning.related.rowChecks',
  'Concept checks: inverses': 'learning.related.inverseChecks',
  'Concept checks: determinants': 'learning.related.determinantChecks',
  'Concept checks: subspaces': 'learning.related.subspaceChecks',
  'Concept checks: dependent vectors': 'learning.related.dependenceChecks',
  'Concept checks: dimension': 'learning.related.dimensionChecks',
  'Concept checks: rank and nullity': 'learning.related.rankChecks',
} as const

function linkLabel(label: string) {
  const key = LINK_LABELS[label as keyof typeof LINK_LABELS]
  return key ? <T k={key} /> : label
}

/** The interactive lessons, tools and practice that go with a chapter. Renders nothing for a chapter with none. */
export function RelatedPanel({ chapter }: { chapter: Chapter }) {
  const { lessons, tools, practice } = chapter
  if (lessons.length + tools.length + practice.length === 0) return null
  return (
    <aside className={styles.related} id="study-this-chapter" aria-labelledby="study-this-chapter-title">
      <h2 id="study-this-chapter-title"><T k="learning.related.title" /></h2>
      {lessons.length > 0 ? (
        <div className={styles.relatedGroup}>
          <h3><T k="learning.related.lessons" /></h3>
          <ul className={styles.relatedList}>
            {lessons.map((lesson) => (
              <li key={lesson.id} lang="en" dir="ltr">
                <span className={`${styles.num} num`}>{lesson.number}</span>
                <Link href={pageHref(lesson)}>{lesson.title}</Link> <span>{lesson.objective}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {tools.length > 0 ? (
        <div className={styles.relatedGroup}>
          <h3><T k="learning.related.tools" /></h3>
          <ul className={styles.relatedList}>
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href}>{linkLabel(tool.label)}</Link> <span lang="en" dir="ltr" className={styles.relatedExplanation}>{tool.why}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {practice.length > 0 ? (
        <div className={styles.relatedGroup}>
          <h3><T k="learning.related.practice" /></h3>
          <ul className={styles.relatedList}>
            {practice.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{linkLabel(item.label)}</Link> <span lang="en" dir="ltr" className={styles.relatedExplanation}>{item.why}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  )
}
