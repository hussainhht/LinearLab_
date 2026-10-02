'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { resetProgress, setLessonComplete, useCompletedLessons } from '@/lib/storage/progress'
import styles from './learning.module.css'

export function MarkComplete({ lessonId, title }: { lessonId: string; title: string }) {
  const completed = useCompletedLessons()
  const done = completed.has(lessonId)
  return (
    <div className={styles.markComplete}>
      <Button
        variant={done ? 'secondary' : 'primary'}
        icon={done ? 'check' : undefined}
        aria-pressed={done}
        onClick={() => setLessonComplete(lessonId, !done)}
      >
        {done ? 'Completed' : 'Mark lesson complete'}
      </Button>
      <p className={styles.muted} aria-live="polite">
        {done ? `“${title}” is marked complete in this browser. Select the button again to undo.` : 'Progress is saved in this browser only.'}
      </p>
    </div>
  )
}

export function ProgressSummary({ lessonIds }: { lessonIds: readonly string[] }) {
  const completed = useCompletedLessons()
  const [confirming, setConfirming] = useState(false)
  const done = lessonIds.filter((id) => completed.has(id)).length
  const percent = lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0

  return (
    <div className={styles.progressSummary}>
      <div className={styles.progressBar} role="progressbar" aria-valuemin={0} aria-valuemax={lessonIds.length} aria-valuenow={done} aria-label="Lessons completed">
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>
        <strong className="num">{done}</strong> of {lessonIds.length} lessons complete
      </p>
      {done > 0 ? (
        confirming ? (
          <div className={styles.confirm} role="group" aria-label="Confirm reset">
            <span>Clear progress for every lesson?</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                resetProgress()
                setConfirming(false)
              }}
            >
              Reset progress
            </Button>
            <Button size="sm" variant="quiet" onClick={() => setConfirming(false)}>
              Keep it
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="quiet" icon="reset" onClick={() => setConfirming(true)}>
            Reset progress
          </Button>
        )
      ) : null}
    </div>
  )
}

export function CompletionMark({ lessonId }: { lessonId: string }) {
  const completed = useCompletedLessons()
  if (!completed.has(lessonId)) return null
  return (
    <span className={styles.doneMark}>
      <Icon name="check" size={14} />
      <span className="sr-only">Completed</span>
    </span>
  )
}
