import type { Metadata } from 'next'
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
      <PageHeader title="Practice your system" lede="Reduce the system you sent from the solver, one row operation at a time." />
      <Suspense fallback={<p>Loading your system…</p>}>
        <CustomPractice />
      </Suspense>
    </Page>
  )
}
