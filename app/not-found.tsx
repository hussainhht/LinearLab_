import Link from 'next/link'
import { Page, PageHeader } from '@/components/layout/Page'

export default function NotFound() {
  return (
    <Page width="narrow">
      <PageHeader
        title="This page is not in the course"
        lede="The address may be mistyped, or the page may have moved when LinearLab was rebuilt."
      />
      <p>
        Try the <Link href="/learn/">course outline</Link>, the <Link href="/tools/">tools</Link> or the{' '}
        <Link href="/">home page</Link>.
      </p>
    </Page>
  )
}
