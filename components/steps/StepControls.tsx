'use client'

import { useI18n } from '@/components/i18n/LanguageProvider'
import { Button } from '@/components/ui/Button'
import { Segmented } from '@/components/ui/controls'
import { type Playback, SPEEDS } from './usePlayback'
import styles from './StepControls.module.css'

interface StepControlsProps {
  playback: Playback
  /** Name of one unit, e.g. "step" or "product". */
  unit?: 'step' | 'product'
  label?: string
}

/** Previous/next, play/pause, jump to start/end and playback speed. */
export function StepControls({ playback, unit = 'step', label }: StepControlsProps) {
  const { t, language } = useI18n()
  const { index, last, playing } = playback
  return (
    <div lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} className={styles.controls} role="group" aria-label={label ?? t('steps.controls')}>
      <div className={styles.buttons}>
        <Button variant="quiet" icon="first" onClick={playback.first} disabled={index === 0} aria-label={t('steps.goStart')} />
        <Button variant="secondary" icon="prev" onClick={playback.previous} disabled={index === 0} aria-label={t(unit === 'product' ? 'steps.previousProduct' : 'steps.previousStep')} />
        <Button
          variant="primary"
          icon={playing ? 'pause' : 'play'}
          onClick={playback.toggle}
          disabled={last === 0}
          aria-label={t(playing ? 'steps.pause' : 'steps.play')}
        >
          {t(playing ? 'steps.pause' : 'steps.play')}
        </Button>
        <Button variant="secondary" icon="next" onClick={playback.next} disabled={index >= last} aria-label={t(unit === 'product' ? 'steps.nextProduct' : 'steps.nextStep')} />
        <Button variant="quiet" icon="last" onClick={playback.end} disabled={index >= last} aria-label={t('steps.goEnd')} />
      </div>
      <p className={styles.counter} aria-live="polite">
        {index === 0 ? t('steps.start') : t(unit === 'product' ? 'steps.productCounter' : 'steps.stepCounter', { index })} <span className={styles.of}>{t('steps.of', { count: last })}</span>
      </p>
      <Segmented
        label={t('steps.speed')}
        hideLabel
        size="sm"
        value={playback.speed}
        onChange={playback.setSpeed}
        options={SPEEDS.map((s) => ({ value: s.value, label: t(`steps.${s.value}`) }))}
      />
    </div>
  )
}
