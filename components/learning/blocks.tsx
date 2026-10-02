import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { findMatrixExample } from '@/data/examples/matrices'
import { findSystemExample } from '@/data/examples/systems'
import { matrixHref, systemHref } from '@/lib/url/problem'
import styles from './learning.module.css'

/** Inline math in running UI text, set in the serif math face. */
export function M({ children }: { children: ReactNode }) {
  return <span className={styles.inlineMath}>{children}</span>
}

export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <aside className={styles.definition} aria-label={`Definition: ${term}`}>
      <p className={styles.blockLabel}>Definition: {term}</p>
      {children}
    </aside>
  )
}

export function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.example} aria-label={`Worked example: ${title}`}>
      <p className={styles.blockLabel}>Worked example</p>
      <h3 className={styles.exampleTitle}>{title}</h3>
      {children}
    </section>
  )
}

export function Note({ title, children, tone = 'info' }: { title?: string; children: ReactNode; tone?: 'info' | 'warning' }) {
  return (
    <aside className={styles.note} data-tone={tone}>
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
    <aside className={styles.note} data-tone="warning">
      <Icon name="pencil" size={18} />
      <div>
        <p className={styles.noteTitle}>Corrected in this edition</p>
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

const TOOL_LABELS: Record<ToolName, string> = {
  rref: 'Open this system in the solver',
  cramer: 'Solve it with Cramer’s rule',
  practice: 'Reduce it yourself in practice mode',
  matrices: 'Open in matrix operations',
}

/** Loads the exact problem from the lesson into a tool. */
export function TryInTool({ example, a, b, op, tool = 'rref', children }: TryInToolProps) {
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
    <p className={styles.tryInTool}>
      <Link href={href} className={styles.tryLink}>
        <Icon name="external" size={16} />
        {children ?? TOOL_LABELS[tool]}
      </Link>
    </p>
  )
}
