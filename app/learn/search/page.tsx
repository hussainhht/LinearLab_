import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Page, PageHeader } from '@/components/layout/Page'
import { CourseSearch } from '@/components/learning/CourseSearch'
import { buildSearchDocs } from '@/lib/course/searchIndex'

export const metadata: Metadata = {
  title: 'Search the course',
  description: 'Search every chapter of the lecture notes and every interactive lesson.',
}

export default async function SearchPage() {
  // Built once, while the site is exported; the browser only filters it.
  const docs = await buildSearchDocs()
  return (
    <Page>
      <PageHeader title="Search the course" lede="Find a definition, a theorem, a worked example or an exercise anywhere in the lecture notes or the lessons." />
      <Suspense fallback={<p>Loading search…</p>}>
        <CourseSearch docs={docs} />
      </Suspense>
      <noscript>
        <p>Search runs in your browser and needs JavaScript. Without it, use the course outline to find a chapter.</p>
      </noscript>
    </Page>
  )
}
