import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
import { Determinant2x2Calculator, Determinant3x3Calculator } from '@/components/tools/determinant/DeterminantCalculators'
import styles from '../tools.module.css'

export const metadata: Metadata = {
  title: 'Determinant calculators',
  description: '2×2 and 3×3 determinants with every intermediate step: ad − bc, cofactor expansion and the diagonal rule.',
}

export default function DeterminantPage() {
  return (
    <>
      <div className={styles.intro}>
        <h1 className={styles.title}><T k="tools.determinant.short" /></h1>
        <p className={styles.lede}>
          <T k="tools.determinant.intro" />
        </p>
      </div>
      <div className={styles.stack}>
        <Determinant2x2Calculator headingLevel={2} />
        <Determinant3x3Calculator headingLevel={2} />
      </div>
    </>
  )
}
