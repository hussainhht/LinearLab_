import type { Element, ElementContent, Root } from 'hast'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import Link from 'next/link'
import { Children, type ComponentProps, type CSSProperties, type ReactNode, isValidElement } from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { SCAN_PATTERN, type SectionKind, isSvgSource, preText } from '@/lib/course/markdown'
import { T } from '@/components/i18n/LanguageProvider'
import { LearningImage, LearningUi, LedgerNotice } from '../LearningUi'
import type { learningEn } from '@/lib/i18n/learning'
import styles from './notes.module.css'

/** What the lecture-notes renderer needs to know about the rest of the site. */
export interface NoteRenderContext {
  /** Slugs of the interactive lessons, so `row-operations.mdx` in a chapter links to /learn/row-operations/. */
  readonly lessonSlugs: ReadonlySet<string>
  /** Targets for in-document links the source writes to headings that do not exist (see the registry). */
  readonly anchorAliases: Readonly<Record<string, string>>
  /** Public URL of a cited source scan if the file is in this repository, otherwise null. */
  readonly scanHref: (reference: string) => string | null
  /** One sentence on whether the scans cited by the source ledger are available. */
  readonly ledgerNote: string
  /** Counts are provided by the page so site-generated source notices can be localized. */
  readonly scanStats?: { available: number; total: number }
}

type WithNode<P> = P & { node?: Element }

const KIND_LABELS: Partial<Record<SectionKind, keyof typeof learningEn>> = {
  'source-version': 'learning.source.version',
  supplementary: 'learning.source.supplementary',
}

const ENTITIES: Record<string, string> = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&apos;': "'" }

/** The labels written inside an SVG, as a text alternative: the words the figure itself shows. */
function svgLabels(svg: string): string {
  return [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)]
    .map((match) => match[1]!.replace(/&(?:lt|gt|amp|quot|apos);/g, (entity) => ENTITIES[entity] ?? entity).trim())
    .filter(Boolean)
    .join('; ')
}

/** Room added around every figure: the supplied drawings put their last labels on the very edge of their viewBox, which clips descenders. */
const DIAGRAM_PADDING = 10

/** A figure the chapter supplies as inline SVG. Shown through <img>, so it can never run script. */
function SvgFigure({ svg }: { svg: string }) {
  const box = /viewBox="\s*([-\d.]+)\s+([-\d.]+)\s+([\d.]+)\s+([\d.]+)\s*"/.exec(svg)
  const [x, y, w, h] = box ? box.slice(1).map(Number) : [0, 0, 600, 300]
  const width = w! + 2 * DIAGRAM_PADDING
  const height = h! + 2 * DIAGRAM_PADDING
  const padded = box
    ? svg.replace(box[0], `viewBox="${x! - DIAGRAM_PADDING} ${y! - DIAGRAM_PADDING} ${width} ${height}"`)
    : svg
  return (
    <figure className={styles.diagram}>
      <LearningUi className={styles.diagramScroll} role="group" tabIndex={0} labelKey="learning.diagram.label" dir="ltr">
        {/* An SVG data URI cannot be optimized by next/image, and the export has no image server anyway. */}
        <LearningImage
          src={`data:image/svg+xml,${encodeURIComponent(padded)}`}
          alt={svgLabels(svg)}
          width={width}
          height={height}
          style={{ '--w': `${width}px` } as CSSProperties}
        />
      </LearningUi>
    </figure>
  )
}

function heading(Tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  return function Heading({ node: _node, children, id, ...props }: WithNode<ComponentProps<'h2'>>) {
    return (
      <Tag id={id} {...props}>
        {children}
        {id ? (
          <a className={styles.anchor} href={`#${id}`} aria-hidden="true" tabIndex={-1}>
            #
          </a>
        ) : null}
      </Tag>
    )
  }
}

export function createNoteComponents(context: NoteRenderContext) {
  function Section({ node: _node, children, ...props }: WithNode<ComponentProps<'section'>>) {
    const kind = ((props as Record<string, unknown>)['data-kind'] ?? 'core') as SectionKind
    const sectionId = String((props as Record<string, unknown>)['data-section'] ?? '')
    const items = Children.toArray(children)
    const headingIndex = items.findIndex((item) => isValidElement(item))
    const head = headingIndex >= 0 ? items[headingIndex] : null
    const rest = items.filter((_, i) => i !== headingIndex)

    if (kind === 'ledger') {
      return (
        <details className={styles.ledger}>
          <summary>{head}</summary>
          <div className={styles.ledgerBody}>
            {context.scanStats ? <LearningUi as="p" className={styles.ledgerNote}><LedgerNotice {...context.scanStats} /></LearningUi> : context.ledgerNote ? <p className={styles.ledgerNote}>{context.ledgerNote}</p> : null}
            {rest}
          </div>
        </details>
      )
    }
    return (
      <section className={styles.section} data-kind={kind} aria-labelledby={sectionId || undefined}>
        {KIND_LABELS[kind] ? <LearningUi as="p" className={styles.kindLabel}><T k={KIND_LABELS[kind]} /></LearningUi> : null}
        {children}
      </section>
    )
  }

  function Anchor({ node: _node, href = '', children, ...props }: WithNode<ComponentProps<'a'>>) {
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1))
      return (
        <a href={`#${context.anchorAliases[id] ?? id}`} {...props}>
          {children}
        </a>
      )
    }
    if (href.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  /** Inline code only: fenced blocks are drawn by `pre` below. */
  function InlineCode({ node: _node, children, ...props }: WithNode<ComponentProps<'code'>>) {
    const text = typeof children === 'string' ? children : ''
    const lesson = /^([a-z0-9-]+)\.mdx$/.exec(text)
    if (lesson && context.lessonSlugs.has(lesson[1]!)) {
      return (
        <Link href={`/learn/${lesson[1]}/`}>
          <code {...props}>{children}</code>
        </Link>
      )
    }
    if (SCAN_PATTERN.test(text)) {
      const href = context.scanHref(text)
      if (href) {
        return (
          <a href={href}>
            <code {...props}>{children}</code>
          </a>
        )
      }
    }
    return <code {...props}>{children}</code>
  }

  /** A paragraph is plain unless the pipeline marked it as a note about the source. */
  function Paragraph({ node: _node, children, ...props }: WithNode<ComponentProps<'p'>>) {
    return <p {...props}>{children}</p>
  }

  function Pre({ node }: WithNode<ComponentProps<'pre'>>) {
    const text = node ? preText(node) : null
    if (text === null) return null
    if (isSvgSource(text)) return <SvgFigure svg={text.trim()} />
    return (
      <pre className={styles.textBlock} tabIndex={0}>
        <code>{text}</code>
      </pre>
    )
  }

  function Table({ node: _node, children, ...props }: WithNode<ComponentProps<'table'>>) {
    return (
      <LearningUi className={styles.tableWrap} role="group" tabIndex={0} labelKey="learning.table.label">
        <table {...props} lang="en" dir="ltr">{children}</table>
      </LearningUi>
    )
  }

  /**
   * Inline mathematics cannot wrap: a matrix sum or a boxed theorem inside a sentence can be wider than a
   * phone. The item's content therefore sits in a box that scrolls sideways, so the page never does.
   * (Not `overflow` on the <li> itself, which would clip its bullet.)
   */
  function ListItem({ node: _node, children, ...props }: WithNode<ComponentProps<'li'>>) {
    return (
      <li {...props}>
        <div className={styles.itemBody}>{children}</div>
      </li>
    )
  }

  return {
    section: Section,
    li: ListItem,
    p: Paragraph,
    a: Anchor,
    code: InlineCode,
    pre: Pre,
    table: Table,
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    h5: heading('h5'),
    h6: heading('h6'),
  }
}

/** The processed document as React elements. Runs on the server during the build. */
export function renderNotes(tree: Root, context: NoteRenderContext): ReactNode {
  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    passNode: true,
    components: createNoteComponents(context),
  })
}

/** Typeset heading content (a few headings contain mathematics) for the contents list. */
export function renderInline(content: readonly ElementContent[]): ReactNode {
  return toJsxRuntime({ type: 'root', children: [...content] }, { Fragment, jsx, jsxs })
}
