'use client'

import { type ReactNode, useId } from 'react'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { Icon } from './Icon'
import styles from './controls.module.css'

interface StepperProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  /** Noun used in button labels, e.g. "rows" → "Fewer rows". */
  noun: string
}

/** Compact −/+ control for small integer settings such as matrix dimensions. */
export function Stepper({ label, value, min, max, onChange, noun }: StepperProps) {
  const { t } = useI18n()
  const localizedNoun = noun === 'rows' ? t('ui.rows') : noun === 'columns' ? t('ui.columns') : noun === 'variables' ? t('ui.variables') : noun
  const id = useId()
  return (
    <div className={styles.stepper} role="group" aria-labelledby={id}>
      <span id={id} className={styles.stepperLabel}>
        {label}
      </span>
      <div className={styles.stepperBox}>
        <button
          type="button"
          className={styles.stepperButton}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={t('ui.fewer', { noun: localizedNoun })}
        >
          −
        </button>
        <output dir="ltr" className={`${styles.stepperValue} num`} aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          className={styles.stepperButton}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={t('ui.more', { noun: localizedNoun })}
        >
          +
        </button>
      </div>
    </div>
  )
}

interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
  disabled?: boolean
}

interface SegmentedProps<T extends string> {
  label: string
  value: T
  options: readonly SegmentedOption<T>[]
  onChange: (value: T) => void
  hideLabel?: boolean
  size?: 'sm' | 'md'
}

/** A radio group styled as a segmented control; arrow keys move between options natively. */
export function Segmented<T extends string>({ label, value, options, onChange, hideLabel, size = 'md' }: SegmentedProps<T>) {
  const name = useId()
  return (
    <fieldset className={`${styles.segmented} ${size === 'sm' ? styles.segmentedSm : ''}`}>
      <legend className={hideLabel ? 'sr-only' : styles.legend}>{label}</legend>
      <div className={styles.segments}>
        {options.map((option) => (
          <label key={option.value} className={styles.segment} data-disabled={option.disabled || undefined}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  children: ReactNode
  hint?: ReactNode
}

export function Select({ label, value, onChange, children, hint }: SelectProps) {
  const id = useId()
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
          {children}
        </select>
        <Icon name="next" directional={false} size={16} className={styles.selectIcon} />
      </div>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  )
}

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string | null
  hint?: ReactNode
  placeholder?: string
  inputMode?: 'text' | 'decimal'
  className?: string
  onEnter?: () => void
}

export function TextField({ label, value, onChange, error, hint, placeholder, inputMode = 'text', className, onEnter }: TextFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={`${styles.field} ${className ?? ''}`}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </label>
      <input
        id={id}
        dir="ltr"
        className={`${styles.input} num`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) {
            e.preventDefault()
            onEnter()
          }
        }}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error}>
          <Icon name="alert" size={14} /> {error}
        </p>
      ) : null}
    </div>
  )
}
