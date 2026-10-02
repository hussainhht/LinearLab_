'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Notice } from '@/components/ui/Notice'
import { decodeSystem, splitAugmented } from '@/lib/url/problem'
import { CramerSolver } from './CramerSolver'

/** Shows the system passed in ?A=…&b=… (for example from the system solver) above the standard examples. */
export function CramerFromUrl() {
  const params = useSearchParams()
  const cells = decodeSystem(params)
  if (!cells) return null
  const { a, b } = splitAugmented(cells)
  const size = a.length
  if (size !== a[0]?.length || (size !== 2 && size !== 3)) {
    return (
      <Notice tone="info" title="This page solves 2×2 and 3×3 systems">
        The linked system is {a.length}×{a[0]?.length ?? 0}. <Link href={`/tools/rref/?${params.toString()}`}>Solve it with the system solver</Link>{' '}
        instead.
      </Notice>
    )
  }
  return <CramerSolver key={params.toString()} size={size} initialA={a} initialB={b} id="cramer-link" title="Your system" headingLevel={2} />
}
