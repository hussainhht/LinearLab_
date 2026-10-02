import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CramerFromUrl } from '@/components/tools/cramer/CramerFromUrl'
import { CramerSolver } from '@/components/tools/cramer/CramerSolver'
import styles from '../tools.module.css'

export const metadata: Metadata = {
  title: 'Cramer’s rule',
  description: 'Solve 2×2 and 3×3 linear systems with determinants, with every determinant shown.',
}

export default function CramerPage() {
  return (
    <>
      <div className={styles.intro}>
        <h1 className={styles.title}>Cramer’s rule</h1>
        <p className={styles.lede}>
          For a square system with det A ≠ 0, each unknown is xᵢ = det Aᵢ / det A, where Aᵢ is A with column i replaced by
          b. When det A = 0 the rule cannot decide between no solution and infinitely many.
        </p>
      </div>
      <div className={styles.stack}>
        <Suspense fallback={null}>
          <CramerFromUrl />
        </Suspense>
        <CramerSolver size={2} headingLevel={2} />
        <CramerSolver size={3} headingLevel={2} />
      </div>
    </>
  )
}
