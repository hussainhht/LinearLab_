import { describe, expect, it } from 'vitest'
import { gaussJordan } from '@/lib/math/elimination'
import { equals, matrix } from '@/lib/math/matrix'
import { assessOperation, measureProgress, nextHint } from '@/lib/math/practice'
import { createRng, randomMatrix, randomSolvableSystem } from '@/lib/math/random'
import { q } from '@/lib/math/rational'
import { type RowOperation, applyRowOperation, replaceRow, scaleRow, swapRows } from '@/lib/math/rowOps'
import { determinant } from '@/lib/math/determinant'
import { multiplyVector, vectorsEqual } from '@/lib/math/matrix'

const system = matrix([
  [1, 2, 5],
  [3, -1, 4],
])

describe('practice assessment', () => {
  it('accepts different valid orders of operations and reaches the same RREF', () => {
    // Route 1: eliminate first, then scale.
    const route1: RowOperation[] = [replaceRow(1, 0, q(-3)), scaleRow(1, q('-1/7')), replaceRow(0, 1, q(-2))]
    // Route 2: swap first (allowed, though it moves the 1 away), normalize the 3, then continue.
    const route2: RowOperation[] = [
      swapRows(0, 1),
      scaleRow(0, q('1/3')),
      replaceRow(1, 0, q(-1)),
      scaleRow(1, q('3/7')),
      replaceRow(0, 1, q('1/3')),
    ]
    for (const route of [route1, route2]) {
      let m = system
      route.forEach((op, i) => {
        const result = assessOperation(m, op, 2)
        expect(result.valid).toBe(true)
        if (!result.valid) return
        expect(['progress', 'complete', ...(route === route2 && i === 0 ? ['neutral'] : [])]).toContain(result.verdict)
        if (i === route.length - 1) expect(result.verdict).toBe('complete')
        m = result.after
      })
      expect(equals(m, gaussJordan(system, { pivotColumnLimit: 2 }).result)).toBe(true)
    }
  })

  it('flags a valid but unhelpful operation as neutral and a destructive one as a setback', () => {
    const started = applyRowOperation(system, replaceRow(1, 0, q(-3))) // [[1,2,5],[0,-7,-11]]
    const neutral = assessOperation(started, scaleRow(1, q(2)), 2)
    expect(neutral.valid && neutral.verdict).toBe('neutral')
    const setback = assessOperation(started, replaceRow(1, 0, q(1)), 2)
    expect(setback.valid && setback.verdict).toBe('setback')
  })

  it('rejects invalid operations with a reason', () => {
    const result = assessOperation(system, scaleRow(0, q(0)), 2)
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.message).toMatch(/nonzero/)
  })

  it('gives three levels of hints that match the solver’s next step', () => {
    const hint = nextHint(matrix([[0, 1, 2], [2, 4, 6]]), 2)
    expect(hint).not.toBeNull()
    expect(hint!.step.operation).toEqual(swapRows(0, 1))
    expect(hint!.levels[2]).toBe('Try R₁ ↔ R₂.')
    expect(nextHint(matrix([[1, 0, 2], [0, 1, 3]]), 2)).toBeNull()
  })

  it('marks a finished inconsistent system as complete once the coefficient part is reduced', () => {
    const done = matrix([[1, 2, 0], [0, 0, 1]])
    expect(measureProgress(done, 2).complete).toBe(true)
  })
})

describe('random generation', () => {
  it('is reproducible with a seed and stays in range', () => {
    const a = randomMatrix(3, 4, createRng(42), 5)
    const b = randomMatrix(3, 4, createRng(42), 5)
    expect(equals(a, b)).toBe(true)
    expect(a.flat().every((v) => v.isInteger() && Math.abs(v.toNumber()) <= 5)).toBe(true)
  })

  it('builds solvable systems whose stated solution is correct', () => {
    const rng = createRng(7)
    for (let i = 0; i < 20; i++) {
      const { a, b, solution } = randomSolvableSystem(3, rng)
      expect(determinant(a).isZero()).toBe(false)
      expect(vectorsEqual(multiplyVector(a, solution), b)).toBe(true)
    }
  })
})
