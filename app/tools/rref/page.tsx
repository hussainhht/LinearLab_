import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
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
        <h1 className={styles.title}><T k="tools.rref.name" /></h1>
        <p className={styles.lede}>
          <T k="tools.rref.intro" />
        </p>
      </div>
      <Suspense fallback={null}>
        <RrefUrlLoader />
      </Suspense>
      <RrefWorkspace />
    </>
  )
}
