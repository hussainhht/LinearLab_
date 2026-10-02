'use client'

import { PracticeSession } from './PracticeSession'
import { matrix, augment, columnVector, vector } from '@/lib/math/matrix'

type Entry = string | number

/** Builds [A | b] on the client (rationals are not passed across the server boundary). */
export function PracticeProblem({ a, b }: { a: readonly (readonly Entry[])[]; b: readonly Entry[] }) {
  const start = augment(matrix(a), columnVector(vector(b)))
  return <PracticeSession start={start} variables={a[0]!.length} />
}
