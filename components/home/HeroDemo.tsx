'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { MatrixView } from '@/components/matrix/MatrixView'
import { stepView } from '@/components/steps/highlight'
import { Icon } from '@/components/ui/Icon'
import { explainStep } from '@/lib/math/explain'
import { matrix, vector } from '@/lib/math/matrix'
import { solveSystem } from '@/lib/math/solve'
import styles from './home.module.css'

const QUERY = '(prefers-reduced-motion: reduce)'
const subscribe = (cb: () => void) => {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', cb)
  return () => media.removeEventListener('change', cb)
}

/**
 * The page's one piece of ambient motion: a real Gauss–Jordan run that
 * advances by itself. It never autoplays under reduced motion, and it can be
 * paused at any time.
 */
export function HeroDemo() {
  const analysis = useMemo(() => solveSystem(matrix([[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]), vector([8, -11, -3])), [])
  const steps = analysis.elimination.steps
  const reducedMotion = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => true)
  const [userChoice, setUserChoice] = useState<'play' | 'pause' | null>(null)
  const [index, setIndex] = useState(0)
  const playing = userChoice === 'play' || (userChoice === null && !reducedMotion)

  useEffect(() => {
    if (!playing) return
    const atEnd = index >= steps.length
    const timer = window.setTimeout(() => setIndex(atEnd ? 0 : index + 1), atEnd ? 3800 : 1900)
    return () => window.clearTimeout(timer)
  }, [playing, index, steps.length])

  const { matrix: m, highlight } = stepView(analysis.elimination, index)
  const step = index > 0 ? steps[index - 1] : undefined
  const caption = step ? explainStep(step, { kind: 'system' }) : null

  return (
    <figure className={styles.demo}>
      <div className={styles.demoSheet}>
        <MatrixView
          matrix={m}
          label={index === 0 ? 'Example system, starting matrix' : `Example system after step ${index}`}
          augmentAt={3}
          columnLabels={['x₁', 'x₂', 'x₃', 'b']}
          highlight={highlight}
          size="lg"
        />
      </div>
      <figcaption className={styles.demoCaption}>
        <span className={`${styles.demoStep} num`}>{index === 0 ? 'Start' : `Step ${index} of ${steps.length}`}</span>
        <span className={styles.demoOp}>{caption ? caption.operation : '[A | b] for three equations'}</span>
        <span className={styles.demoTitle}>{caption ? caption.title : 'Gauss–Jordan elimination, step by step'}</span>
        <button
          type="button"
          className={styles.demoToggle}
          onClick={() => setUserChoice(playing ? 'pause' : 'play')}
          aria-label={playing ? 'Pause the demonstration' : 'Play the demonstration'}
        >
          <Icon name={playing ? 'pause' : 'play'} size={14} />
        </button>
      </figcaption>
    </figure>
  )
}
