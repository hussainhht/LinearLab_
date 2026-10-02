import { findSystemExample, type Entry } from './systems'

export interface PracticeProblem {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly level: 'Warm-up' | 'Core' | 'Challenge'
  readonly a: readonly (readonly Entry[])[]
  readonly b: readonly Entry[]
}

function fromExample(id: string, title: string, description: string, level: PracticeProblem['level']): PracticeProblem {
  const example = findSystemExample(id)
  if (!example) throw new Error(`Unknown example ${id}`)
  return { id, title, description, level, a: example.a, b: example.b }
}

export const practiceProblems: readonly PracticeProblem[] = [
  fromExample('two-by-two', 'Two equations', 'A gentle start: one elimination, two scalings.', 'Warm-up'),
  {
    id: 'needs-a-swap',
    title: 'Start with a swap',
    description: 'The top-left entry is 0, so the first pivot has to come from another row.',
    level: 'Warm-up',
    a: [[0, 2], [1, 1]],
    b: [4, 3],
  },
  fromExample('fraction-answer', 'Fractions appear', 'The answer is not a pair of whole numbers. Keep every fraction exact.', 'Core'),
  fromExample('three-by-three', 'Three equations', 'A full 3×3 reduction with a unique solution.', 'Core'),
  fromExample('infinite-solutions', 'A free variable', 'Reduce it and identify which variable is free.', 'Core'),
  fromExample('no-solution', 'Spot the contradiction', 'Reduce until a row says 0 = something nonzero.', 'Challenge'),
  fromExample('homogeneous-free', 'Homogeneous system', 'More unknowns than equations: expect a free variable.', 'Challenge'),
  fromExample('circuit', 'Circuit currents', 'Kirchhoff’s equations with a fractional answer.', 'Challenge'),
]

export function findPracticeProblem(id: string): PracticeProblem | undefined {
  return practiceProblems.find((p) => p.id === id)
}
