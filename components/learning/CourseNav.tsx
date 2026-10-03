'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import type { OutlineChapter } from '@/content/lessons/catalog'
import { useCompletedLessons } from '@/lib/storage/progress'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { SearchForm } from './SearchForm'
import styles from './learning.module.css'

/**
 * The list is long: scrolls the sidebar, not the page, so the link to the current page is in its
 * middle, and marks the sidebar as done. It uses nothing from this module because it is also written
 * into the page as an inline script (see CourseNav).
 */
function centerCurrentPage(nav: HTMLElement) {
  const active = nav.querySelector<HTMLElement>('[aria-current="page"]')
  if (active && nav.scrollHeight > nav.clientHeight) {
    nav.scrollTop = active.offsetTop - (nav.clientHeight - active.offsetHeight) / 2
  }
  nav.setAttribute('data-centered', '')
}

const subscribeNothing = () => () => {}

/** True while the server renders and while the browser first matches that HTML; false for every render after. */
const useRenderedByServer = () => useSyncExternalStore(subscribeNothing, () => false, () => true)

/**
 * Course sidebar generated from the registry: every chapter with its lecture notes and interactive
 * lessons, and completion from local progress. A collapsed disclosure on phones; always open beside
 * the page on wide screens (see learning.module.css).
 */
export function CourseNav({ outline }: { outline: readonly OutlineChapter[] }) {
  const { t } = useI18n()
  const pathname = usePathname() ?? ''
  const completed = useCompletedLessons()
  const navRef = useRef<HTMLElement>(null)
  const renderedByServer = useRenderedByServer()
  const current = pathname.replace(/\/$/, '')
  const items = outline.flatMap((chapter) => chapter.items)
  const done = items.filter((item) => completed.has(item.id)).length

  // Every page makes its own sidebar. When a page is loaded, the inline script below has centred the list
  // while the HTML was parsed, and nothing may move it again: once React takes over, a list that jumps, or
  // that undoes the student's own scrolling, puts the link they are about to click somewhere else. A
  // client-side navigation makes a sidebar that script never ran for; centre that one before it is painted.
  useLayoutEffect(() => {
    const nav = navRef.current
    if (nav && !nav.hasAttribute('data-centered')) centerCurrentPage(nav)
  }, [])

  const count = t('learning.completedCount', { done, total: items.length })

  return (
    <nav aria-label={t('learning.course')} className={styles.courseNav} ref={navRef} suppressHydrationWarning>
      <div className={styles.navSearch}>
        <SearchForm id="course-nav-search" />
      </div>
      <details className={styles.courseDetails}>
        <summary className={styles.courseSummary}>
          <span>{t('learning.contents')}</span>
          <span className={styles.courseCount}>{count}</span>
        </summary>
        <p className={styles.courseHeading}>
          <span>{t('learning.contents')}</span>
          <span className={styles.courseCount}>{count}</span>
        </p>
        <ol className={styles.chapterList}>
          {outline.map((chapter) => (
            <li key={chapter.id}>
              <p className={styles.chapterName} lang="en" dir="ltr">
                <span className="num">{chapter.number}</span> {chapter.title}
              </p>
              <ol className={styles.lessonList}>
                {chapter.items.map((item) => {
                  const active = current.endsWith(`/learn/${item.slug}`)
                  const isDone = completed.has(item.id)
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/learn/${item.slug}/`}
                        prefetch={item.kind === 'notes' ? false : null}
                        className={styles.lessonLink}
                        aria-current={active ? 'page' : undefined}
                        data-done={isDone || undefined}
                      >
                        {item.kind === 'notes' ? (
                          <span className={styles.lessonNumber}>
                            <Icon name="book" size={15} />
                          </span>
                        ) : (
                          <span className={`${styles.lessonNumber} num`}>{item.number}</span>
                        )}
                        {item.kind === 'notes' ? (
                          <span>
                            {t('learning.lectureNotes')}
                            <span className="sr-only">{t('learning.forTitle', { title: chapter.title })}</span>
                          </span>
                        ) : (
                          <span lang="en" dir="ltr">{item.title}</span>
                        )}
                        {isDone ? (
                          <span className={styles.doneMark}>
                            <Icon name="check" size={14} />
                            <span className="sr-only">{t('learning.completedSuffix')}</span>
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
      {renderedByServer ? (
        <script
          // Runs as the browser parses the page, before the list is first painted, and is dropped once React has
          // taken over. A sidebar made in the browser never has it: a script React creates there would not run.
          dangerouslySetInnerHTML={{ __html: `(${centerCurrentPage})(document.currentScript.parentElement)` }}
          suppressHydrationWarning
        />
      ) : null}
    </nav>
  )
}
