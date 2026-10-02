'use client'

import { Button } from '@/components/ui/Button'
import { Segmented } from '@/components/ui/controls'
import { type Playback, SPEEDS } from './usePlayback'
import styles from './StepControls.module.css'

interface StepControlsProps {
  playback: Playback
  /** Name of one unit, e.g. "step" or "product". */
  unit?: string
  label?: string
}

/** Previous/next, play/pause, jump to start/end and playback speed. */
export function StepControls({ playback, unit = 'step', label = 'Step controls' }: StepControlsProps) {
  const { index, last, playing } = playback
  return (
    <div className={styles.controls} role="group" aria-label={label}>
      <div className={styles.buttons}>
        <Button variant="quiet" icon="first" onClick={playback.first} disabled={index === 0} aria-label="Go to the start" />
        <Button variant="secondary" icon="prev" onClick={playback.previous} disabled={index === 0} aria-label={`Previous ${unit}`} />
        <Button
          variant="primary"
          icon={playing ? 'pause' : 'play'}
          onClick={playback.toggle}
          disabled={last === 0}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Button variant="secondary" icon="next" onClick={playback.next} disabled={index >= last} aria-label={`Next ${unit}`} />
        <Button variant="quiet" icon="last" onClick={playback.end} disabled={index >= last} aria-label="Go to the end" />
      </div>
      <p className={`${styles.counter} num`} aria-live="polite">
        {index === 0 ? 'Start' : `${capitalize(unit)} ${index}`} <span className={styles.of}>of {last}</span>
      </p>
      <Segmented
        label="Playback speed"
        hideLabel
        size="sm"
        value={playback.speed}
        onChange={playback.setSpeed}
        options={SPEEDS.map((s) => ({ value: s.value, label: s.label }))}
      />
    </div>
  )
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
