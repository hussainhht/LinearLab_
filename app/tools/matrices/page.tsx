import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
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
        <h1 className={styles.title}><T k="tools.matrices.name" /></h1>
        <p className={styles.lede}>
          <T k="tools.matrices.intro" />
        </p>
      </div>
      <Suspense fallback={null}>
        <MatricesUrlLoader />
      </Suspense>
      <MatricesWorkspace />
    </>
  )
}
