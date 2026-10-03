import { T } from '@/components/i18n/LanguageProvider'
import Link from 'next/link'
import { Page, PageHeader } from '@/components/layout/Page'

export default function NotFound() {
  return (
    <Page width="narrow">
      <PageHeader
        title={<T k="notFound.title" />}
        lede={<T k="notFound.description" />}
      />
      <p>
        <T k="notFound.try" /> <Link href="/learn/"><T k="home.outline" /></Link>, <Link href="/tools/"><T k="notFound.tools" /></Link> <T k="notFound.or" />{' '}
        <Link href="/"><T k="notFound.home" /></Link>.
      </p>
    </Page>
  )
}
