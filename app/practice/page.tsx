import type { Metadata } from 'next'
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
        title="Practice row reduction"
        lede="You choose every row operation. LinearLab checks that each one is legal, tells you whether it moved the matrix toward reduced row echelon form, and gives hints when you ask."
      />
      <div className={styles.howTo}>
        <p>
          There is no single correct order. Any sequence of valid operations that reaches the reduced form is right, and
          feedback is based on that form, not on matching the solver step for step.
        </p>
      </div>
      <ol className={styles.problemList}>
        {practiceProblems.map((p) => (
          <li key={p.id} className={styles.problem}>
            <Link href={`/practice/${p.id}/`}>
              <span className={styles.level}>{p.level}</span>
              <span className={styles.problemTitle}>{p.title}</span>
              <span className={styles.problemDescription}>{p.description}</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className={styles.howTo}>
        <h2>Concept checks</h2>
        <p>
          Not sure the ideas have landed? {conceptChecks.length} short questions on ranks, row reduction, determinants, inverses and
          subspaces, each with its reasoning.
        </p>
        <p>
          <Link href="/practice/concepts/">Open the concept checks</Link>
        </p>
      </div>
    </Page>
  )
}
