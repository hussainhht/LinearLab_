'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { resetProgress, setLessonComplete, useCompletedLessons } from '@/lib/storage/progress'
import styles from './learning.module.css'

export function MarkComplete({ lessonId, title, kind = 'lesson' }: { lessonId: string; title: string; kind?: 'lesson' | 'chapter' }) {
  const { t } = useI18n()
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
        {t(done ? 'learning.completed' : kind === 'chapter' ? 'learning.markChapter' : 'learning.markLesson')}
      </Button>
      <p className={styles.muted} aria-live="polite">
        {done ? t('learning.savedComplete', { title }) : t('learning.savedLocally')}
      </p>
    </div>
  )
}

export function ProgressSummary({ lessonIds, scope = 'lessons' }: { lessonIds: readonly string[]; scope?: 'lessons' | 'chaptersLessons' }) {
  const { t } = useI18n()
  const completed = useCompletedLessons()
  const [confirming, setConfirming] = useState(false)
  const done = lessonIds.filter((id) => completed.has(id)).length
  const percent = lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0

  return (
    <div className={styles.progressSummary}>
      <div className={styles.progressBar} role="progressbar" aria-valuemin={0} aria-valuemax={lessonIds.length} aria-valuenow={done} aria-label={t(scope === 'lessons' ? 'learning.progress.lessonsLabel' : 'learning.progress.chaptersLessonsLabel')}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>
        {t(scope === 'lessons' ? 'learning.progress.lessons' : 'learning.progress.chaptersLessons', { done, total: lessonIds.length })}
      </p>
      {done > 0 ? (
        confirming ? (
          <div className={styles.confirm} role="group" aria-label={t('learning.progress.confirm')}>
            <span>{t('learning.progress.clear')}</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                resetProgress()
                setConfirming(false)
              }}
            >
              {t('learning.progress.reset')}
            </Button>
            <Button size="sm" variant="quiet" onClick={() => setConfirming(false)}>
              {t('learning.progress.keep')}
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="quiet" icon="reset" onClick={() => setConfirming(true)}>
            {t('learning.progress.reset')}
          </Button>
        )
      ) : null}
    </div>
  )
}

export function CompletionMark({ lessonId }: { lessonId: string }) {
  const { t } = useI18n()
  const completed = useCompletedLessons()
  if (!completed.has(lessonId)) return null
  return (
    <span className={styles.doneMark}>
      <Icon name="check" size={14} />
      <span className="sr-only">{t('learning.completed')}</span>
    </span>
  )
}
