import Link from 'next/link'
import type { ComponentProps } from 'react'
import { type CoursePage, pageHref } from '@/content/lessons/catalog'

/**
 * A link to a course page. Lecture notes are large (each chapter's typeset mathematics is one to
 * three megabytes of HTML), and Next.js prefetches the whole payload of every static route whose link
 * scrolls into view. The notes are therefore fetched when the student opens them, not in the
 * background from every sidebar or overview link; lessons are small and keep the default.
 */
export function PageLink({ page, ...props }: { page: CoursePage } & Omit<ComponentProps<typeof Link>, 'href' | 'prefetch'>) {
  return <Link href={pageHref(page)} prefetch={page.kind === 'notes' ? false : null} {...props} />
}
