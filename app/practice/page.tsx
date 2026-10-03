import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
import Link from 'next/link'
import { Page, PageHeader } from '@/components/layout/Page'
import { conceptChecks } from '@/data/examples/concepts'
import { practiceProblems } from '@/data/examples/practice'
import styles from '@/components/practice/practice.module.css'

export const metadata: Metadata = {
  title: 'Practice',
  description: 'Reduce systems yourself, one row operation at a time, with feedback and hints.',
}

export default function PracticePage() {
  return (
    <Page>
      <PageHeader
        title={<T k="practice.title" />}
        lede={<T k="practice.lede" />}
      />
      <div className={styles.howTo}>
        <p>
          <T k="practice.howTo" />
        </p>
      </div>
      <ol className={styles.problemList}>
        {practiceProblems.map((p) => (
          <li key={p.id} className={styles.problem}>
            <Link href={`/practice/${p.id}/`}>
              <span className={styles.level}><T k={p.level === 'Warm-up' ? 'practice.warmUp' : p.level === 'Core' ? 'practice.core' : 'practice.challenge'} /></span>
              <span className={styles.problemTitle} lang="en" dir="ltr">{p.title}</span>
              <span className={styles.problemDescription} lang="en" dir="ltr">{p.description}</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className={styles.howTo}>
        <h2><T k="practice.conceptChecks" /></h2>
        <p>
          <T k="practice.conceptIntro" params={{ count: conceptChecks.length }} />
        </p>
        <p>
          <Link href="/practice/concepts/"><T k="practice.openConcepts" /></Link>
        </p>
      </div>
    </Page>
  )
}
