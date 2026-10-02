import type { Metadata } from 'next'
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
        <h1 className={styles.title}>Determinants</h1>
        <p className={styles.lede}>
          Two independent calculators that show the hand method. For larger matrices, the matrix operations tool finds the
          determinant by row reduction.
        </p>
      </div>
      <div className={styles.stack}>
        <Determinant2x2Calculator headingLevel={2} />
        <Determinant3x3Calculator headingLevel={2} />
      </div>
    </>
  )
}
