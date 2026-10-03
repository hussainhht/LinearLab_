import { T } from '@/components/i18n/LanguageProvider'
import Link from 'next/link'
import { HeroDemo } from '@/components/home/HeroDemo'
import { ButtonLink } from '@/components/ui/Button'
import { PageLink } from '@/components/learning/PageLink'
import { chapterList, lessons, pageHref } from '@/content/lessons/catalog'
import styles from '@/components/home/home.module.css'

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={styles.heroTitle}>
            <T k="home.title" />
          </h1>
          <p className={styles.heroLede}>
            <T k="home.lede" />
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/tools/rref/" variant="primary" icon="steps">
              <T k="home.solve" />
            </ButtonLink>
            <ButtonLink href={pageHref(chapterList[0]!.notes)} prefetch={false}>
              <T k="home.startCourse" />
            </ButtonLink>
          </div>
        </div>
        <HeroDemo />
      </section>

      <section className={styles.paths} aria-labelledby="paths-title">
        <h2 id="paths-title" className="sr-only">
          <T k="home.where" />
        </h2>
        <div className={styles.path}>
          <h3><T k="nav.learn" /></h3>
          <p>
            <T k="home.learnDescription" params={{ chapters: chapterList.length, lessons: lessons.length }} />
          </p>
          <Link href="/learn/"><T k="home.outline" /></Link>
        </div>
        <div className={styles.path}>
          <h3><T k="home.solveTitle" /></h3>
          <p>
            <T k="home.toolsDescription" />
          </p>
          <Link href="/tools/"><T k="home.allTools" /></Link>
        </div>
        <div className={styles.path}>
          <h3><T k="nav.practice" /></h3>
          <p>
            <T k="home.practiceDescription" />
          </p>
          <Link href="/practice/"><T k="home.problems" /></Link>
        </div>
      </section>

      <section className={styles.course} aria-labelledby="course-title">
        <div className={styles.courseIntro}>
          <h2 id="course-title"><T k="home.covers" /></h2>
          <p><T k="home.courseDescription" /></p>
        </div>
        <ol className={styles.chapters}>
          {chapterList.map((chapter) => (
            <li key={chapter.id}>
              <PageLink page={chapter.notes} className={styles.chapterLink}>
                <span lang="en" dir="ltr" className={styles.chapterTitle}>{chapter.title}</span>
                <span lang="en" dir="ltr" className={styles.chapterSummary}>{chapter.summary}</span>
                <span className={styles.chapterCount}>
                  {chapter.lessons.length > 0
                    ? <T k={chapter.lessons.length === 1 ? 'home.notesOne' : 'home.notesMany'} params={{ count: chapter.lessons.length }} />
                    : <T k="home.notes" />}
                </span>
              </PageLink>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.exact} aria-labelledby="exact-title">
        <h2 id="exact-title"><T k="home.exact" /></h2>
        <div className={styles.exactBody}>
          <p>
            <T k="home.exactDescription" />
          </p>
          <p lang="en" dir="ltr">
            That also means no guessing about “almost zero”: the matrix with 0.000001 on its diagonal has determinant
            10<sup>−12</sup>, so it is invertible, and LinearLab inverts it. Answers are checked by substituting them back,
            not just reported.
          </p>
        </div>
      </section>
    </div>
  )
}
