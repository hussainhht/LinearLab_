import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
import { Suspense } from 'react'
import { Page, PageHeader } from '@/components/layout/Page'
import { CustomPractice } from '@/components/practice/CustomPractice'

export const metadata: Metadata = {
  title: 'Practice your system',
  description: 'Row reduce a system of your own with feedback and hints.',
}

export default function CustomPracticePage() {
  return (
    <Page>
      <PageHeader title={<T k="practice.customTitle" />} lede={<T k="practice.customLede" />} />
      <Suspense fallback={<p><T k="practice.loading" /></p>}>
        <CustomPractice />
      </Suspense>
    </Page>
  )
}
