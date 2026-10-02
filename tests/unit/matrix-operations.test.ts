import { describe, expect, it } from 'vitest'
import { cramer } from '@/lib/math/cramer'
import { cofactorExpansion, determinant, determinant2x2, determinantByElimination, sarrus } from '@/lib/math/determinant'
import { invert } from '@/lib/math/inverse'
import {
  MatrixDimensionError,
  add,
  equals,
  identity,
  isIdentity,
  matrix,
  multiplicationIssue,
  multiply,
  multiplyVector,
  scale,
  subtract,
  transpose,
  vector,
  vectorsEqual,
  zeroMatrix,
} from '@/lib/math/matrix'
import { traceMultiplication } from '@/lib/math/multiplication'
import { q } from '@/lib/math/rational'
import { applyRowOperation, replaceRow, scaleRow, swapRows } from '@/lib/math/rowOps'
import { analyzeSpaces } from '@/lib/math/spaces'

describe('basic operations', () => {
  const A = matrix([[1, 2], [3, 4]])
  const B = matrix([[5, 6], [7, 8]])

  it('adds, subtracts, scales and transposes', () => {
    expect(equals(add(A, B), matrix([[6, 8], [10, 12]]))).toBe(true)
    expect(equals(subtract(A, B), matrix([[-4, -4], [-4, -4]]))).toBe(true)
    expect(equals(scale(A, q(3)), matrix([[3, 6], [9, 12]]))).toBe(true)
    expect(equals(transpose(matrix([[1, 2, 3], [4, 5, 6]])), matrix([[1, 4], [2, 5], [3, 6]]))).toBe(true)
  })

  it('multiplies compatible matrices, including rectangular ones', () => {
    expect(equals(multiply(A, B), matrix([[19, 22], [43, 50]]))).toBe(true)
    const P = multiply(matrix([[2, 0, 1], [3, 1, 2]]), matrix([[1, 3], [0, 2], [4, -1]]))
    expect(equals(P, matrix([[6, 5], [11, 9]]))).toBe(true)
    expect(equals(multiply(matrix([[1, 2, 3], [4, 5, 6]]), matrix([[1, 0], [2, 1], [3, 2]])), matrix([[14, 8], [32, 17]]))).toBe(true)
  })

  it('shows AB ≠ BA and that AB = 0 does not force A or B to be 0', () => {
    expect(equals(multiply(A, B), multiply(B, A))).toBe(false)
    const Z = multiply(matrix([[1, -1], [1, -1]]), matrix([[1, 1], [1, 1]]))
    expect(equals(Z, zeroMatrix(2, 2))).toBe(true)
  })

  it('rejects incompatible dimensions with an explanation', () => {
    const C = matrix([[1, 2, 3]])
    expect(() => add(A, C)).toThrow(MatrixDimensionError)
    expect(() => subtract(A, C)).toThrow(/same size/)
    expect(() => multiply(C, A)).toThrow(/columns of A to equal rows of B/)
    const R = matrix([[1, 2]])
    expect(multiplicationIssue(R, A)).toBeNull()
    expect(multiplicationIssue(A, R)).toMatch(/A is 2×2 \(2 columns\) and B is 1×2 \(1 row\)/)
  })

  it('traces each multiplication entry with running sums', () => {
    const trace = traceMultiplication(A, B)
    expect(trace.entries).toHaveLength(4)
    const first = trace.entries[0]!
    expect(first.terms.map((t) => t.product.toString())).toEqual(['5', '14'])
    expect(first.partialSums.map(String)).toEqual(['5', '19'])
    expect(trace.entries.map((e) => e.value.toString())).toEqual(['19', '22', '43', '50'])
    expect(() => traceMultiplication(matrix([[1, 2, 3]]), A)).toThrow(MatrixDimensionError)
  })
})

describe('determinants', () => {
  const D = matrix([[1, 2, 3], [0, 4, 5], [1, 0, 6]])

  it('computes det = 22 for the lesson matrix by three independent methods (the old calculator showed 20)', () => {
    expect(determinant(D).toString()).toBe('22')
    expect(cofactorExpansion(D).value.toString()).toBe('22')
    expect(sarrus(D).value.toString()).toBe('22')
  })

  it('gives the cofactor terms the lesson shows', () => {
    const { terms } = cofactorExpansion(D)
    expect(terms.map((t) => t.minorDeterminant.toString())).toEqual(['24', '-5', '-4'])
    expect(terms.map((t) => t.contribution.toString())).toEqual(['24', '10', '-12'])
  })

  it('evaluates 2×2 determinants as ad − bc', () => {
    const d = determinant2x2(matrix([[2, 3], [4, 5]]))
    expect([d.ad, d.bc, d.value].map(String)).toEqual(['10', '12', '-2'])
  })

  it('flips sign on a row swap, scales with a row, and ignores replacements', () => {
    const base = determinant(D)
    expect(determinant(applyRowOperation(D, swapRows(0, 2))).equals(base.neg())).toBe(true)
    expect(determinant(applyRowOperation(D, scaleRow(1, q('-3/2')))).equals(base.mul(q('-3/2')))).toBe(true)
    expect(determinant(applyRowOperation(D, replaceRow(2, 0, q(7)))).equals(base)).toBe(true)
  })

  it('satisfies det(AB) = det(A)det(B) and det(Aᵀ) = det(A)', () => {
    const E = matrix([[2, 0, 1], [1, 3, 0], [0, 1, 2]])
    expect(determinant(multiply(D, E)).equals(determinant(D).mul(determinant(E)))).toBe(true)
    expect(determinant(transpose(D)).equals(determinant(D))).toBe(true)
  })

  it('returns exactly 0 for singular and zero matrices', () => {
    expect(determinant(matrix([[1, 2, 3], [4, 5, 6], [5, 7, 9]])).isZero()).toBe(true)
    expect(determinant(zeroMatrix(3, 3)).isZero()).toBe(true)
    const info = determinantByElimination(matrix([[1, 2], [2, 4]]))
    expect(info.zeroColumn).toBe(1)
  })

  it('needs a pivot swap when the top-left entry is 0', () => {
    const info = determinantByElimination(matrix([[0, 1], [1, 0]]))
    expect(info.swaps).toBe(1)
    expect(info.value.toString()).toBe('-1')
  })

  it('treats a tiny scaled diagonal as invertible: det = 10⁻¹²', () => {
    const tiny = matrix([['0.000001', 0], [0, '0.000001']])
    expect(determinant(tiny).toString()).toBe('1/1000000000000')
  })

  it('rejects non-square input', () => {
    expect(() => determinant(matrix([[1, 2, 3]]))).toThrow(MatrixDimensionError)
    expect(() => sarrus(matrix([[1, 2], [3, 4]]))).toThrow(/3×3/)
  })
})

describe('inverse', () => {
  it('inverts by [A | I] → [I | A⁻¹] and verifies both products', () => {
    const A = matrix([[1, 2, 3], [2, 5, 3], [1, 0, 8]])
    const result = invert(A)
    expect(result.invertible).toBe(true)
    if (!result.invertible) return
    expect(equals(result.inverse, matrix([[-40, 16, 9], [13, -5, -3], [5, -2, -1]]))).toBe(true)
    expect(isIdentity(multiply(A, result.inverse))).toBe(true)
    expect(result.check.passed).toBe(true)
    expect(vectorsEqual(multiplyVector(result.inverse, vector([5, 3, 17])), vector([1, -1, 2]))).toBe(true)
  })

  it('inverts the matrix that a fixed determinant threshold used to reject', () => {
    const result = invert(matrix([['0.000001', 0], [0, '0.000001']]))
    expect(result.invertible).toBe(true)
    if (result.invertible) {
      expect(equals(result.inverse, matrix([[1000000, 0], [0, 1000000]]))).toBe(true)
      expect(result.check.passed).toBe(true)
    }
  })

  it('matches the 2×2 formula, including the parametric lesson example for every tested a', () => {
    expect(invert(matrix([[4, 7], [2, 6]])).invertible && equals(
      (invert(matrix([[4, 7], [2, 6]])) as { inverse: ReturnType<typeof matrix> }).inverse,
      matrix([['0.6', '-0.7'], ['-0.2', '0.4']]),
    )).toBe(true)
    for (const a of ['-1/10', '0', '1', '-1', '7/3']) {
      const A = matrix([[q(2).mul(q(a)).toString(), q(a).add(q(1)).toString()], [4, 2]])
      expect(determinant(A).toString()).toBe('-4')
      const result = invert(A)
      expect(result.invertible).toBe(true)
      if (!result.invertible) continue
      const expected = matrix([['-1/2', q(a).add(q(1)).div(q(4)).toString()], [1, q(a).neg().div(q(2)).toString()]])
      expect(equals(result.inverse, expected)).toBe(true)
    }
  })

  it('reports singular matrices with the missing pivot column', () => {
    const result = invert(matrix([[6, 4], [3, 2]]))
    expect(result.invertible).toBe(false)
    if (!result.invertible) {
      expect(result.rank).toBe(1)
      expect(result.missingPivotColumn).toBe(1)
    }
  })

  it('rejects non-square matrices', () => {
    expect(() => invert(matrix([[1, 2, 3], [4, 5, 6]]))).toThrow(/square/)
  })

  it('keeps the identity fixed', () => {
    const result = invert(identity(4))
    expect(result.invertible && equals(result.inverse, identity(4))).toBe(true)
  })
})

describe('rank, column space and null space', () => {
  it('finds bases whose null vectors satisfy A·v = 0 and obey rank–nullity', () => {
    const A = matrix([[1, 2, 0, 3], [2, 4, 1, 4], [3, 6, 1, 7]])
    const s = analyzeSpaces(A)
    expect(s.rank).toBe(2)
    expect(s.nullity).toBe(2)
    expect(s.rank + s.nullity).toBe(4)
    expect(s.pivotColumns).toEqual([0, 2])
    for (const { vector: v } of s.nullSpaceBasis) {
      expect(multiplyVector(A, v).every((x) => x.isZero())).toBe(true)
    }
    expect(s.columnSpaceBasis.map((c) => c.vector.map(String))).toEqual([['1', '2', '3'], ['0', '1', '1']])
    expect(s.rowSpaceBasis).toHaveLength(2)
  })

  it('reports a trivial null space for invertible matrices and full null space for zero matrices', () => {
    expect(analyzeSpaces(identity(3)).nullSpaceBasis).toHaveLength(0)
    const zero = analyzeSpaces(zeroMatrix(2, 3))
    expect(zero.rank).toBe(0)
    expect(zero.nullity).toBe(3)
    expect(zero.columnSpaceBasis).toHaveLength(0)
  })

  it('satisfies rank–nullity on a range of shapes', () => {
    const cases = [
      [[1, 2], [2, 4], [3, 6]],
      [[0, 0, 1], [0, 0, 2]],
      [[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]],
      [['1/2', '1/3'], ['1/4', '1/6']],
    ]
    for (const values of cases) {
      const A = matrix(values)
      const s = analyzeSpaces(A)
      expect(s.rank + s.nullity).toBe(A[0]!.length)
      for (const { vector: v } of s.nullSpaceBasis) expect(multiplyVector(A, v).every((x) => x.isZero())).toBe(true)
    }
  })
})

describe('Cramer’s rule', () => {
  it('solves the 3×3 lesson example: det(A) = 20, x = 19/20, y = 12/5, z = 13/4', () => {
    const result = cramer(matrix([[1, 2, 1], [2, -1, 2], [3, 1, -1]]), vector([9, 6, 2]))
    expect(result.applicable).toBe(true)
    if (!result.applicable) return
    expect(result.determinant.toString()).toBe('20')
    expect(result.columns.map((c) => c.determinant.toString())).toEqual(['19', '48', '65'])
    expect(result.solution.map(String)).toEqual(['19/20', '12/5', '13/4'])
  })

  it('explains when det(A) = 0 and when A is not square', () => {
    const singular = cramer(matrix([[6, -4], [3, -2]]), vector([2, 1]))
    expect(singular.applicable).toBe(false)
    if (!singular.applicable) expect(singular.reason).toBe('singular')
    const rect = cramer(matrix([[1, 2, 3]]), vector([1]))
    expect(rect.applicable === false && rect.reason).toBe('not-square')
  })
})
