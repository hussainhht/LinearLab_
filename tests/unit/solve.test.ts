import { describe, expect, it } from 'vitest'
import { gaussJordan } from '@/lib/math/elimination'
import { isReducedRowEchelon } from '@/lib/math/echelon'
import { explainStep } from '@/lib/math/explain'
import { type Matrix, type Vector, augment, columnVector, equals, matrix, multiplyVector, vector, vectorsEqual } from '@/lib/math/matrix'
import { solutionLines } from '@/lib/math/notation'
import { Rational, q } from '@/lib/math/rational'
import { applyRowOperation } from '@/lib/math/rowOps'
import { solveAugmented, solveSystem } from '@/lib/math/solve'

/** Independent check: substitute into the ORIGINAL equations with plain matrix–vector multiplication. */
function satisfies(a: Matrix, x: Vector, b: Vector): boolean {
  return vectorsEqual(multiplyVector(a, x), b)
}

describe('Gauss–Jordan elimination', () => {
  it('reduces the classic 3×3 system and every snapshot follows from its operation', () => {
    const m = matrix([
      [2, 1, -1, 8],
      [-3, -1, 2, -11],
      [-2, 1, 2, -3],
    ])
    const result = gaussJordan(m, { pivotColumnLimit: 3 })
    expect(equals(result.result, matrix([[1, 0, 0, 2], [0, 1, 0, 3], [0, 0, 1, -1]]))).toBe(true)
    expect(result.rank).toBe(3)

    let current = m
    for (const step of result.steps) {
      expect(equals(step.before, current)).toBe(true)
      expect(equals(applyRowOperation(step.before, step.operation), step.after)).toBe(true)
      current = step.after
    }
    expect(equals(current, result.result)).toBe(true)
  })

  it('does not modify its input', () => {
    const m = matrix([[0, 1], [1, 0]])
    const copy = matrix([[0, 1], [1, 0]])
    gaussJordan(m)
    expect(equals(m, copy)).toBe(true)
  })

  it('swaps rows when the pivot position holds zero', () => {
    const result = gaussJordan(matrix([[0, 2, 4], [3, 6, 9]]), { pivotColumnLimit: 2 })
    const first = result.steps[0]!
    expect(first.operation).toEqual({ kind: 'swap', rowA: 0, rowB: 1 })
    expect(first.purpose.kind).toBe('swap')
    const explanation = explainStep(first, { kind: 'system' })
    expect(explanation.operation).toBe('R₁ ↔ R₂')
    expect(explanation.reason).toMatch(/holds 0/)
  })

  it('skips a column with no pivot and continues to the next', () => {
    const result = gaussJordan(matrix([[0, 1, 2], [0, 3, 4]]))
    expect(result.pivotColumns).toEqual([1, 2])
    expect(result.columnsWithoutPivot).toEqual([0])
    expect(isReducedRowEchelon(result.result)).toBe(true)
  })

  it('handles wide and tall rectangular matrices', () => {
    const wide = gaussJordan(matrix([[1, 2, 3, 4], [2, 4, 6, 9]]))
    expect(wide.rank).toBe(2)
    expect(isReducedRowEchelon(wide.result)).toBe(true)
    const tall = gaussJordan(matrix([[1, 2], [2, 4], [3, 7]]))
    expect(tall.rank).toBe(2)
    expect(equals(tall.result, matrix([[1, 0], [0, 1], [0, 0]]))).toBe(true)
  })

  it('reduces a zero matrix in zero steps', () => {
    const result = gaussJordan(matrix([[0, 0], [0, 0]]))
    expect(result.steps).toHaveLength(0)
    expect(result.rank).toBe(0)
  })

  it('describes eliminations with the arithmetic that makes the entry zero', () => {
    const result = gaussJordan(matrix([[1, 2, 5], [3, -1, 4]]), { pivotColumnLimit: 2 })
    const elimination = result.steps.find((s) => s.purpose.kind === 'eliminate')!
    const text = explainStep(elimination, { kind: 'system' })
    expect(text.operation).toBe('R₂ ← R₂ − 3R₁')
    expect(text.reason).toContain('3 − 3·1 = 0')
    expect(text.title).toBe('Eliminate x₁ from R₂')
  })
})

describe('solveSystem', () => {
  it('finds x = 13/7, y = 11/7 for x + 2y = 5, 3x − y = 4 (the old lesson claimed x = 1, y = 2)', () => {
    const a = matrix([[1, 2], [3, -1]])
    const b = vector([5, 4])
    const analysis = solveSystem(a, b)
    expect(analysis.solution.kind).toBe('unique')
    if (analysis.solution.kind !== 'unique') return
    expect(analysis.solution.values.map(String)).toEqual(['13/7', '11/7'])
    expect(satisfies(a, analysis.solution.values, b)).toBe(true)
    expect(satisfies(a, vector([1, 2]), b)).toBe(false)
  })

  it('finds x = 19/20, y = 12/5, z = 13/4 for the Cramer example (the old lesson claimed 1, 3, 2)', () => {
    const a = matrix([[1, 2, 1], [2, -1, 2], [3, 1, -1]])
    const b = vector([9, 6, 2])
    const analysis = solveSystem(a, b)
    expect(analysis.solution.kind).toBe('unique')
    if (analysis.solution.kind !== 'unique') return
    expect(analysis.solution.values.map(String)).toEqual(['19/20', '12/5', '13/4'])
    expect(satisfies(a, analysis.solution.values, b)).toBe(true)
    expect(satisfies(a, vector([1, 3, 2]), b)).toBe(false)
  })

  it('classifies a dependent system and returns a complete parametric solution', () => {
    const a = matrix([[1, 2, 3], [2, 4, 6], [1, 1, 1]])
    const b = vector([6, 12, 3])
    const analysis = solveSystem(a, b)
    expect(analysis.solution.kind).toBe('infinite')
    if (analysis.solution.kind !== 'infinite') return
    const { particular, directions, freeVariables } = analysis.solution
    expect(freeVariables).toEqual([2])
    expect(satisfies(a, particular, b)).toBe(true)
    const zero = vector([0, 0, 0])
    for (const d of directions) expect(satisfies(a, d.vector, zero)).toBe(true)
    // Any parameter value gives a solution: try t = −7/3.
    const t = q('-7/3')
    const x = particular.map((p, i) => p.add(t.mul(directions[0]!.vector[i]!)))
    expect(satisfies(a, x, b)).toBe(true)
    expect(solutionLines(analysis.solution)).toEqual(['x₁ = x₃', 'x₂ = 3 − 2x₃', 'x₃ is free'])
  })

  it('handles two free variables', () => {
    const a = matrix([[1, 2, -1, 3]])
    const b = vector([4])
    const analysis = solveSystem(a, b)
    expect(analysis.solution.kind).toBe('infinite')
    if (analysis.solution.kind !== 'infinite') return
    expect(analysis.solution.freeVariables).toEqual([1, 2, 3])
    expect(analysis.solution.directions).toHaveLength(3)
    for (const d of analysis.solution.directions) expect(satisfies(a, d.vector, vector([0]))).toBe(true)
  })

  it('detects an inconsistent system and reports the contradictory row', () => {
    const analysis = solveSystem(matrix([[1, 2, 3], [2, 4, 6], [1, 1, 1]]), vector([4, 9, 2]))
    expect(analysis.solution.kind).toBe('inconsistent')
    if (analysis.solution.kind !== 'inconsistent') return
    const row = analysis.elimination.result[analysis.solution.row]!
    expect(row.slice(0, 3).every((v) => v.isZero())).toBe(true)
    expect(row[3]!.equals(analysis.solution.value)).toBe(true)
    expect(analysis.solution.value.isZero()).toBe(false)
    expect(analysis.rankAugmented).toBe(analysis.rankA + 1)
  })

  it('treats parallel lines as inconsistent and coincident lines as infinite', () => {
    expect(solveSystem(matrix([[1, 1], [1, 1]]), vector([3, 5])).solution.kind).toBe('inconsistent')
    expect(solveSystem(matrix([[1, 1], [2, 2]]), vector([3, 6])).solution.kind).toBe('infinite')
  })

  it('solves fractions and decimals exactly', () => {
    const a = matrix([['1/2', '0.25'], ['-1/3', 2]])
    const b = vector(['1.5', '-2/3'])
    const analysis = solveSystem(a, b)
    expect(analysis.solution.kind).toBe('unique')
    if (analysis.solution.kind === 'unique') expect(satisfies(a, analysis.solution.values, b)).toBe(true)
  })

  it('solves every example system that ships with the app', async () => {
    const { systemExamples } = await import('@/data/examples/systems')
    for (const example of systemExamples) {
      const a = matrix(example.a)
      const b = vector(example.b)
      const analysis = solveSystem(a, b)
      expect(analysis.solution.kind, example.id).toBe(example.expected.kind)
      if (analysis.solution.kind === 'unique' && example.expected.kind === 'unique') {
        expect(analysis.solution.values.map(String), example.id).toEqual(example.expected.values)
        expect(satisfies(a, analysis.solution.values, b), example.id).toBe(true)
      }
    }
  })

  it('rejects a right-hand side of the wrong length', () => {
    expect(() => solveSystem(matrix([[1, 2], [3, 4]]), vector([1]))).toThrow(/one entry per equation/)
    expect(() => solveAugmented(augment(matrix([[1]]), columnVector([Rational.ONE])), 2)).toThrow()
  })
})
