import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { T } from '@/components/i18n/LanguageProvider'
import { LearningUi } from './LearningUi'
import type { learningEn } from '@/lib/i18n/learning'
import { findMatrixExample } from '@/data/examples/matrices'
import { findSystemExample } from '@/data/examples/systems'
import { matrixHref, systemHref } from '@/lib/url/problem'
import styles from './learning.module.css'

/** Inline math in running UI text, set in the serif math face. */
export function M({ children }: { children: ReactNode }) {
  return <span className={styles.inlineMath} lang="en" dir="ltr">{children}</span>
}

export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <LearningUi as="aside" className={styles.definition} lang="en" dir="ltr" labelKey="learning.block.definitionLabel" labelParams={{ term }}>
      <LearningUi as="p" className={styles.blockLabel}><T k="learning.block.definition" /><bdi lang="en" dir="ltr">{term}</bdi></LearningUi>
      {children}
    </LearningUi>
  )
}

export function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <LearningUi as="section" className={styles.example} lang="en" dir="ltr" labelKey="learning.block.exampleLabel" labelParams={{ title }}>
      <LearningUi as="p" className={styles.blockLabel}><T k="learning.block.example" /></LearningUi>
      <h3 className={styles.exampleTitle}>{title}</h3>
      {children}
    </LearningUi>
  )
}

export function Note({ title, children, tone = 'info' }: { title?: string; children: ReactNode; tone?: 'info' | 'warning' }) {
  return (
    <aside className={styles.note} data-tone={tone} lang="en" dir="ltr">
      <Icon name={tone === 'warning' ? 'alert' : 'lightbulb'} size={18} />
      <div>
        {title ? <p className={styles.noteTitle}>{title}</p> : null}
        {children}
      </div>
    </aside>
  )
}

export function Correction({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.note} data-tone="warning" lang="en" dir="ltr">
      <Icon name="pencil" size={18} />
      <div>
        <LearningUi as="p" className={styles.noteTitle}><T k="learning.block.corrected" /></LearningUi>
        {children}
      </div>
    </aside>
  )
}

type ToolName = 'rref' | 'cramer' | 'practice' | 'matrices'

interface TryInToolProps {
  /** A system from data/examples/systems.ts. */
  example?: string
  /** Matrix example ids from data/examples/matrices.ts. */
  a?: string
  b?: string
  op?: string
  tool?: ToolName
  children?: ReactNode
}

const TOOL_LABELS = {
  rref: 'learning.try.rref',
  cramer: 'learning.try.cramer',
  practice: 'learning.try.practice',
  matrices: 'learning.try.matrices',
} as const satisfies Record<ToolName, keyof typeof learningEn>

const CUSTOM_TOOL_LABELS = {
  'See parallel lines in the system solver': 'learning.try.parallel',
  'See coincident lines in the system solver': 'learning.try.coincident',
  'Apply row operations yourself in practice mode': 'learning.try.rowOperations',
  'Open this inverse with its product check': 'learning.try.inverseCheck',
  'Watch this product entry by entry': 'learning.try.product',
  'Do this one yourself in practice mode': 'learning.try.doPractice',
  'See this elimination in the matrix tool': 'learning.try.elimination',
  'Invert the tiny-but-invertible matrix': 'learning.try.tinyInverse',
} as const

/** Loads the exact problem from the lesson into a tool. */
export function TryInTool({ example, a, b, op, tool = 'rref', children }: TryInToolProps) {
  const customKey = typeof children === 'string' ? CUSTOM_TOOL_LABELS[children as keyof typeof CUSTOM_TOOL_LABELS] : undefined
  let href: string
  if (tool === 'matrices') {
    const A = a ? findMatrixExample(a) : undefined
    const B = b ? findMatrixExample(b) : undefined
    if ((a && !A) || (b && !B)) throw new Error(`Unknown matrix example in TryInTool: ${a} ${b}`)
    href = matrixHref('/tools/matrices/', { A: A?.values, B: B?.values }, op ? { op } : {})
  } else {
    const system = example ? findSystemExample(example) : undefined
    if (!system) throw new Error(`Unknown system example in TryInTool: ${example}`)
    const path = tool === 'cramer' ? '/tools/cramer/' : tool === 'practice' ? '/practice/custom/' : '/tools/rref/'
    href = systemHref(path, system.a, system.b)
  }
  return (
    <LearningUi as="p" className={styles.tryInTool}>
      <Link href={href} className={styles.tryLink}>
        <Icon name="external" size={16} />
        {customKey ? <T k={customKey} /> : children ?? <T k={TOOL_LABELS[tool]} />}
      </Link>
    </LearningUi>
  )
}
