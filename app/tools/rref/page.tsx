import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RrefUrlLoader } from '@/components/tools/rref/RrefUrlLoader'
import { RrefWorkspace } from '@/components/tools/rref/RrefWorkspace'
import styles from '../tools.module.css'

export const metadata: Metadata = {
  title: 'System solver',
  description: 'Solve a linear system by Gauss–Jordan elimination, one explained row operation at a time.',
}

export default function RrefPage() {
  return (
    <>
      <div className={`${styles.intro} no-print`}>
        <h1 className={styles.title}>System solver</h1>
        <p className={styles.lede}>
          Enter the augmented matrix of a linear system and watch Gauss–Jordan elimination reduce it, with the reason for
          every row operation.
        </p>
      </div>
      <Suspense fallback={null}>
        <RrefUrlLoader />
      </Suspense>
      <RrefWorkspace />
    </>
  )
}
