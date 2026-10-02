import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MatricesUrlLoader } from '@/components/tools/matrices/MatricesUrlLoader'
import { MatricesWorkspace } from '@/components/tools/matrices/MatricesWorkspace'
import styles from '../tools.module.css'

export const metadata: Metadata = {
  title: 'Matrix operations',
  description: 'Matrix arithmetic, determinants, inverses, rank, column space and null space, with explanations.',
}

export default function MatricesPage() {
  return (
    <>
      <div className={styles.intro}>
        <h1 className={styles.title}>Matrix operations</h1>
        <p className={styles.lede}>
          Edit A and B, then pick an operation. Results are exact, explain how they were found, and can be fed back in as A
          or B.
        </p>
      </div>
      <Suspense fallback={null}>
        <MatricesUrlLoader />
      </Suspense>
      <MatricesWorkspace />
    </>
  )
}
