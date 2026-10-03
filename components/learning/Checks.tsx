'use client'

import { type FormEvent, useId, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { parseRational } from '@/lib/math/rational'
import { useI18n } from '@/components/i18n/LanguageProvider'
import styles from './learning.module.css'

interface QuickCheckProps {
  question: string
  choices: readonly string[]
  /** Index of the correct choice. */
  answer: number
  explanation: string
}

/** A short multiple-choice check. Feedback explains the answer whether right or wrong. */
export function QuickCheck({ question, choices, answer, explanation }: QuickCheckProps) {
  const { language, t } = useI18n()
  const name = useId()
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const correct = submitted && selected === answer

  return (
    <form
      className={styles.check}
      lang={language}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      onSubmit={(e) => {
        e.preventDefault()
        if (selected !== null) setSubmitted(true)
      }}
    >
      <fieldset className={styles.checkFieldset}>
        <legend className={styles.checkQuestion}>
          <span className={styles.checkLabel}>{t('learning.check.title')}</span>
          <span lang="en" dir="ltr">{question}</span>
        </legend>
        <div className={styles.choices}>
          {choices.map((choice, i) => (
            <label key={i} className={styles.choice} lang="en" dir="ltr" data-state={submitted ? (i === answer ? 'correct' : i === selected ? 'wrong' : undefined) : undefined}>
              <input
                type="radio"
                name={name}
                checked={selected === i}
                onChange={() => {
                  setSelected(i)
                  setSubmitted(false)
                }}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.checkActions}>
        <Button type="submit" size="sm" disabled={selected === null}>
          {t('learning.check.submit')}
        </Button>
      </div>
      <div aria-live="polite">
        {submitted ? (
          <p className={styles.feedback} data-correct={correct}>
            <Icon name={correct ? 'check' : 'x'} size={16} />
            <span>
              <strong>{t(correct ? 'learning.check.correct' : 'learning.check.wrong')}</strong> <span lang="en" dir="ltr" className={styles.englishExplanation}>{explanation}</span>
            </span>
          </p>
        ) : null}
      </div>
    </form>
  )
}

interface NumericCheckProps {
  question: string
  /** One field per requested value; answers are compared exactly as rationals. */
  fields: readonly { label: string; answer: string }[]
  explanation: string
}

export function NumericCheck({ question, fields, explanation }: NumericCheckProps) {
  const { language, t, error } = useI18n()
  const id = useId()
  const [values, setValues] = useState(() => fields.map(() => ''))
  const [result, setResult] = useState<null | { correct: boolean[]; errors: (string | null)[] }>(null)
  const [revealed, setRevealed] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const parsed = values.map((v) => parseRational(v))
    setResult({
      errors: parsed.map((p) => (p.ok ? null : p.error)),
      correct: parsed.map((p, i) => {
        const expected = parseRational(fields[i]!.answer)
        return p.ok && expected.ok && p.value.equals(expected.value)
      }),
    })
  }
  const allCorrect = result?.correct.every(Boolean) ?? false

  return (
    <form className={styles.check} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} onSubmit={submit}>
      <p className={styles.checkQuestion}>
        <span className={styles.checkLabel}>{t('learning.check.title')}</span>
        <span lang="en" dir="ltr">{question}</span>
      </p>
      <div className={styles.numericFields}>
        {fields.map((field, i) => (
          <div key={field.label} className={styles.numericField}>
            <label htmlFor={`${id}-${i}`} className="num" lang="en" dir="ltr">
              {field.label} =
            </label>
            <input
              id={`${id}-${i}`}
              className="num"
              dir="ltr"
              value={values[i]}
              onChange={(e) => {
                setValues(values.map((v, j) => (j === i ? e.target.value : v)))
                setResult(null)
              }}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={result && !result.correct[i] ? true : undefined}
              aria-describedby={result?.errors[i] ? `${id}-${i}-error` : undefined}
            />
            {result?.errors[i] && values[i] !== '' ? (
              <span id={`${id}-${i}-error`} className={styles.fieldError}>
                {error(result.errors[i]!)}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className={styles.checkActions}>
        <Button type="submit" size="sm">
          {t('learning.check.submit')}
        </Button>
        <Button size="sm" variant="quiet" onClick={() => setRevealed((r) => !r)} aria-expanded={revealed}>
          {t(revealed ? 'learning.check.hide' : 'learning.check.show')}
        </Button>
      </div>
      <div aria-live="polite">
        {result ? (
          <p className={styles.feedback} data-correct={allCorrect}>
            <Icon name={allCorrect ? 'check' : 'x'} size={16} />
            <span>
              {allCorrect
                ? t('learning.check.exact')
                : t(fields.filter((_, i) => !result.correct[i]).length === 1 ? 'learning.check.offSingle' : 'learning.check.offMany', {
                    fields: fields.filter((_, i) => !result.correct[i]).map((field) => field.label).join(', '),
                  })}
            </span>
          </p>
        ) : null}
        {revealed ? (
          <p className={styles.reveal} lang="en" dir="ltr">
            <span className="num">{fields.map((f) => `${f.label} = ${f.answer}`).join(', ')}.</span> {explanation}
          </p>
        ) : null}
      </div>
    </form>
  )
}
