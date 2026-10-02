'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Notice } from '@/components/ui/Notice'
import { parseMatrixCells } from '@/lib/math/parse'
import { decodeSystem } from '@/lib/url/problem'
import { PracticeSession } from './PracticeSession'

/** Practice on a system passed in the URL, for example from the system solver. */
export function CustomPractice() {
  const params = useSearchParams()
  const cells = decodeSystem(params)
  const parsed = cells ? parseMatrixCells(cells) : null
  if (!cells || !parsed || !parsed.ok) {
    return (
      <Notice tone="info" title="No system to practice on">
        This page practices on a system sent from the solver. <Link href="/tools/rref/">Open the system solver</Link>, solve
        a system, then choose “Practice this system yourself”, or pick one of the <Link href="/practice/">practice problems</Link>.
      </Notice>
    )
  }
  return <PracticeSession key={params.toString()} start={parsed.matrix} variables={(cells[0]?.length ?? 2) - 1} />
}
