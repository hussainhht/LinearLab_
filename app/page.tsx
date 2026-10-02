import Link from 'next/link'
import { HeroDemo } from '@/components/home/HeroDemo'
import { ButtonLink } from '@/components/ui/Button'
import { chapters, lessons } from '@/content/lessons/catalog'
import styles from '@/components/home/home.module.css'

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={styles.heroTitle}>
            Linear algebra you can step through
          </h1>
          <p className={styles.heroLede}>
            LinearLab solves linear systems with exact fractions and shows every row operation together with the reason for
            it. Learn the ideas in a short course, test them in the tools, then reduce matrices yourself.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/tools/rref/" variant="primary" icon="steps">
              Solve a system
            </ButtonLink>
            <ButtonLink href={`/learn/${lessons[0]!.slug}/`}>Start the course</ButtonLink>
          </div>
        </div>
        <HeroDemo />
      </section>

      <section className={styles.paths} aria-labelledby="paths-title">
        <h2 id="paths-title" className="sr-only">
          Where to start
        </h2>
        <div className={styles.path}>
          <h3>Learn</h3>
          <p>
            {lessons.length} lessons in {chapters.length} chapters, from a single linear equation to Cramer’s rule. Each has a
            worked example and a quick check.
          </p>
          <Link href="/learn/">Course outline</Link>
        </div>
        <div className={styles.path}>
          <h3>Solve</h3>
          <p>
            The system solver, matrix operations with a multiplication walkthrough, and calculators for determinants and
            Cramer’s rule.
          </p>
          <Link href="/tools/">All tools</Link>
        </div>
        <div className={styles.path}>
          <h3>Practice</h3>
          <p>
            Choose each row operation yourself. Every move is checked, any valid route to the answer counts, and hints are
            there when you are stuck.
          </p>
          <Link href="/practice/">Practice problems</Link>
        </div>
      </section>

      <section className={styles.course} aria-labelledby="course-title">
        <div className={styles.courseIntro}>
          <h2 id="course-title">What the course covers</h2>
          <p>Each chapter builds on the one before it. Lessons link straight into the tools with the same example loaded.</p>
        </div>
        <ol className={styles.chapters}>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link href={`/learn/${chapter.lessons[0].slug}/`} className={styles.chapterLink}>
                <span className={styles.chapterTitle}>{chapter.title}</span>
                <span className={styles.chapterSummary}>{chapter.summary}</span>
                <span className={styles.chapterCount}>
                  {chapter.lessons.length} lessons
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.exact} aria-labelledby="exact-title">
        <h2 id="exact-title">Exact, so you can trust the steps</h2>
        <div className={styles.exactBody}>
          <p>
            Every entry is stored as an exact fraction, so 1/3 stays 1/3 and nothing is rounded between steps. Decimals are only
            a display option.
          </p>
          <p>
            That also means no guessing about “almost zero”: the matrix with 0.000001 on its diagonal has determinant
            10<sup>−12</sup>, so it is invertible, and LinearLab inverts it. Answers are checked by substituting them back,
            not just reported.
          </p>
        </div>
      </section>
    </div>
  )
}
