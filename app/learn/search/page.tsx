import type { Metadata } from 'next'
import { Suspense } from 'react'
import { T } from '@/components/i18n/LanguageProvider'
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
      <PageHeader title={<T k="learning.search.title" />} lede={<T k="learning.search.lede" />} />
      <Suspense fallback={<p><T k="learning.search.loading" /></p>}>
        <CourseSearch docs={docs} />
      </Suspense>
      <noscript>
        <p><T k="learning.search.noScript" /></p>
      </noscript>
    </Page>
  )
}
