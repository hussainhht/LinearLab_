import type { Metadata } from 'next'
import { Page, PageHeader } from '@/components/layout/Page'
import { NumericCheck, QuickCheck } from '@/components/learning/Checks'
import { checksFor, conceptChecks, conceptTopics, droppedLegacyItems } from '@/data/examples/concepts'
import styles from '@/components/practice/concepts.module.css'

export const metadata: Metadata = {
  title: 'Concept checks',
  description: 'Short questions on ranks, row reduction, determinants, inverses and subspaces, each with its reasoning.',
}

export default function ConceptChecksPage() {
  return (
    <Page>
      <PageHeader
        title="Concept checks"
        lede="Short questions on the ideas behind the tools and the lecture notes. Check an answer to see the reasoning, whether or not you were right."
      />
      <nav aria-label="Topics">
        <ul className={styles.topics}>
          {conceptTopics.map((topic) => (
            <li key={topic.id}>
              <a href={`#${topic.id}`}>{topic.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      {conceptTopics.map((topic) => (
        <section key={topic.id} className={styles.topic} aria-labelledby={`${topic.id}-title`}>
          <h2 id={topic.id}>
            <span id={`${topic.id}-title`}>{topic.title}</span>
          </h2>
          <p>{topic.description}</p>
          <ol className={styles.checks}>
            {checksFor(topic.id).map((check) => (
              <li key={check.id}>
                {check.kind === 'choice' ? (
                  <QuickCheck question={check.question} choices={check.choices} answer={check.answer} explanation={check.explanation} />
                ) : (
                  <NumericCheck
                    question={check.question}
                    fields={[{ label: check.label, answer: check.answer }]}
                    explanation={check.explanation}
                  />
                )}
                {check.change ? <p className={styles.changed}>Changed from the original question: {check.change.note}</p> : null}
              </li>
            ))}
          </ol>
        </section>
      ))}
      <p className={styles.source}>
        These {conceptChecks.length} questions come from the original LinearLab site, reviewed one by one.{' '}
        {droppedLegacyItems.length} were left out because their answers are free text that cannot be checked fairly.
      </p>
    </Page>
  )
}
