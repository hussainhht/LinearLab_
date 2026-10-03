import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
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
        title={<T k="practice.conceptChecks" />}
        lede={<T k="practice.conceptsLede" />}
      />
      <nav aria-labelledby="practice-topics-label">
        <h2 id="practice-topics-label" className="sr-only"><T k="practice.topics" /></h2>
        <ul className={styles.topics}>
          {conceptTopics.map((topic) => (
            <li key={topic.id}>
              <a href={`#${topic.id}`} lang="en" dir="ltr">{topic.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      {conceptTopics.map((topic) => (
        <section key={topic.id} className={styles.topic} aria-labelledby={`${topic.id}-title`}>
          <h2 id={topic.id} lang="en" dir="ltr">
            <span id={`${topic.id}-title`} lang="en" dir="ltr">{topic.title}</span>
          </h2>
          <p lang="en" dir="ltr">{topic.description}</p>
          <ol className={styles.checks} lang="en" dir="ltr">
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
                {check.change ? <p className={styles.changed}><T k="practice.changed" /> <span lang="en" dir="ltr">{check.change.note}</span></p> : null}
              </li>
            ))}
          </ol>
        </section>
      ))}
      <p className={styles.source}>
        <T k="practice.source" params={{ count: conceptChecks.length, dropped: droppedLegacyItems.length }} />
      </p>
    </Page>
  )
}
