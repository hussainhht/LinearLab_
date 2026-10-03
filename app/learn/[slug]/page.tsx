import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LessonView } from '@/components/learning/LessonView'
import { NotesView } from '@/components/learning/NotesView'
import { findPage, pages } from '@/content/lessons/catalog'

export const dynamicParams = false

/** One route serves both kinds of page; the registry guarantees their slugs never collide. */
export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps<'/learn/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const page = findPage(slug)
  if (!page) return {}
  return page.kind === 'lesson'
    ? { title: `${page.number} ${page.title}`, description: page.objective }
    : { title: `Chapter ${page.chapterNumber}: ${page.title}, lecture notes`, description: page.intro }
}

export default async function LearnPage({ params }: PageProps<'/learn/[slug]'>) {
  const { slug } = await params
  const page = findPage(slug)
  if (!page) notFound()
  return page.kind === 'lesson' ? <LessonView lesson={page} /> : <NotesView notes={page} />
}
