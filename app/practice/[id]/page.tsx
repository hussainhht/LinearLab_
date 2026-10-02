import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Page, PageHeader } from '@/components/layout/Page'
import { PracticeProblem } from '@/components/practice/PracticeProblem'
import { EquationList } from '@/components/practice/EquationList'
import { findPracticeProblem, practiceProblems } from '@/data/examples/practice'

export const dynamicParams = false

export function generateStaticParams() {
  return practiceProblems.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps<'/practice/[id]'>): Promise<Metadata> {
  const { id } = await params
  const problem = findPracticeProblem(id)
  return problem ? { title: `Practice: ${problem.title}`, description: problem.description } : {}
}

export default async function PracticeProblemPage({ params }: PageProps<'/practice/[id]'>) {
  const { id } = await params
  const problem = findPracticeProblem(id)
  if (!problem) notFound()
  return (
    <Page>
      <PageHeader title={problem.title} lede={problem.description}>
        <EquationList a={problem.a} b={problem.b} />
        <p>
          <Link href="/practice/">All practice problems</Link>
        </p>
      </PageHeader>
      <PracticeProblem a={problem.a} b={problem.b} />
    </Page>
  )
}
