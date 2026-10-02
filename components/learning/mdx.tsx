import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { CramerSolver } from '@/components/tools/cramer/CramerSolver'
import { Determinant2x2Calculator, Determinant3x3Calculator } from '@/components/tools/determinant/DeterminantCalculators'
import { Correction, Definition, Example, M, Note, TryInTool } from './blocks'
import { NumericCheck, QuickCheck } from './Checks'
import { EliminationDemo, LinesExplorer } from './widgets'
import styles from './learning.module.css'

/** Components available inside every lesson file, plus internal links routed through next/link. */
export const lessonComponents: MDXComponents = {
  a: ({ href = '', ...props }: ComponentProps<'a'>) =>
    href.startsWith('/') ? <Link href={href} {...props} /> : <a href={href} {...props} rel="noreferrer" />,
  table: (props: ComponentProps<'table'>) => (
    <div className={styles.tableWrap}>
      <table {...props} />
    </div>
  ),
  Definition,
  Example,
  Note,
  Correction,
  M,
  TryInTool,
  QuickCheck,
  NumericCheck,
  EliminationDemo,
  LinesExplorer,
  Determinant2x2Calculator,
  Determinant3x3Calculator,
  CramerSolver,
}
