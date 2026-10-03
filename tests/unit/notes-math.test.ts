/**
 * Independent checks of the numbers in the supplied lecture notes.
 *
 * The chapters are transcriptions, integrated exactly as supplied. This file recomputes, with the exact
 * rational engine, every worked example and exercise answer that has explicit numbers in chapters 2–13:
 * matrix products and inverses, determinants, reduced forms, solution sets, bases, coordinates,
 * eigenvectors and orthogonality claims. It is the whole of what this site can claim to have verified:
 * proofs and prose are not checked, and neither is the match between a transcription and its scans.
 *
 * Where a printed result is wrong, the test states the correct value, shows the printed one failing, and
 * the registry carries a matching review note (content/lessons/catalog.ts). The Markdown is never edited.
 */
import { describe, expect, it } from 'vitest'
import { notes } from '@/content/lessons/catalog'
import { determinant } from '@/lib/math/determinant'
import { isReducedRowEchelon, isRowEchelon } from '@/lib/math/echelon'
import { rank, rref } from '@/lib/math/elimination'
import { invert } from '@/lib/math/inverse'
import {
  type Matrix,
  add,
  equals,
  identity,
  isIdentity,
  isZeroMatrix,
  matrix,
  multiply,
  multiplyVector,
  scale,
  subtract,
  transpose,
  vector,
  vectorsEqual,
} from '@/lib/math/matrix'
import { q } from '@/lib/math/rational'
import { applyRowOperation, replaceRow, scaleRow } from '@/lib/math/rowOps'
import { zeroMatrix } from '@/lib/math/matrix'
import { solveSystem } from '@/lib/math/solve'
import { analyzeSpaces } from '@/lib/math/spaces'

type Rows = (string | number)[][]
type Pairs = [number, number][]
const M = (rows: Rows) => matrix(rows)
const inverseOf = (rows: Rows): Matrix => {
  const result = invert(M(rows))
  if (!result.invertible) throw new Error('expected an invertible matrix')
  return result.inverse
}
const solves = (a: Rows, x: (string | number)[], b: (string | number)[]) => vectorsEqual(multiplyVector(M(a), vector(x)), vector(b))
const det = (rows: Rows) => determinant(M(rows)).toString()
const kind = (a: Rows, b: (string | number)[]) => solveSystem(M(a), vector(b)).solution.kind
const stack = (a: Matrix, b: Matrix): Matrix => [...a, ...b]
const near = (actual: number, expected: number, digits = 9) => expect(actual).toBeCloseTo(expected, digits)
const power = (base: ReturnType<typeof q>, n: number) => Array.from({ length: n }, () => base).reduce((product, factor) => product.mul(factor), q(1))

describe('chapter 2: Gaussian and Gauss–Jordan elimination', () => {
  it('classifies the twelve matrices of the REF/RREF table as the lecture does (leading 1s required)', () => {
    const table: [Rows, 'rref' | 'ref' | 'neither'][] = [
      [[[1, 0, 2, 0], [0, 1, 0, 0], [0, 1, 0, 0]], 'neither'],
      [[[0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 0]], 'rref'],
      [[[1, 0, 1], [0, 2, 0], [0, 0, 0]], 'neither'],
      [[[1, 1], [0, 1], [0, 0]], 'ref'],
      [[[0, 1, 0, 1], [1, 0, 0, 0], [0, 0, 0, 0]], 'neither'],
      [[[0, 1, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]], 'rref'],
      [[[0, 1, 2], [0, 0, 1], [0, 0, 0]], 'ref'],
      [[[1, 0, 1, 2], [0, 1, 0, 1], [0, 0, 0, 0]], 'rref'],
      [[[1, 0, 1, 2], [0, 0, 0, 1], [0, 0, 0, 0]], 'ref'],
      [[[1, 2, 0, 1], [0, 0, 1, 0], [0, 0, 0, 1]], 'ref'],
      [[[0, 1], [0, 0], [0, 0]], 'rref'],
      [[[1, 2, 0, 0, 1], [0, 0, 1, 0, 5]], 'rref'],
    ]
    for (const [rows, expected] of table) {
      const m = M(rows)
      const actual = isReducedRowEchelon(m) ? 'rref' : isRowEchelon(m, { requireLeadingOnes: true }) ? 'ref' : 'neither'
      expect(actual, JSON.stringify(rows)).toBe(expected)
    }
  })

  it('applies the three elementary operations as shown', () => {
    expect(equals(applyRowOperation(M([[1, 0, 2], [0, 0, 0], [0, 3, 1]]), { kind: 'swap', rowA: 1, rowB: 2 }), M([[1, 0, 2], [0, 3, 1], [0, 0, 0]]))).toBe(true)
    expect(equals(applyRowOperation(M([[1, 0, 2, 1], [0, 4, 0, 1], [0, 0, 0, 0]]), scaleRow(1, q('1/4'))), M([[1, 0, 2, 1], [0, 1, 0, '1/4'], [0, 0, 0, 0]]))).toBe(true)
    expect(equals(applyRowOperation(M([[1, 2, 0, 1], [3, 6, 1, 7], [0, 0, 0, 0]]), replaceRow(1, 0, q(-3))), M([[1, 2, 0, 1], [0, 0, 1, 4], [0, 0, 0, 0]]))).toBe(true)
  })

  it('Example 1: reduces the 3×4 matrix to the RREF shown', () => {
    expect(equals(rref(M([[2, 4, 6, 8], [3, 1, 2, 1], [0, 1, 0, 1]])), M([[1, 0, 0, '-4/7'], [0, 1, 0, 1], [0, 0, 1, '6/7']]))).toBe(true)
  })

  it('Example 2: the 3×3 system has the unique solution (1, 2, 3)', () => {
    const a: Rows = [[1, 1, 2], [2, 4, -3], [3, 6, -5]]
    expect(solves(a, [1, 2, 3], [9, 1, 0])).toBe(true)
    expect(kind(a, [9, 1, 0])).toBe('unique')
  })

  it('Example 3: the overdetermined system is inconsistent', () => {
    expect(kind([[2, -3], [2, 1], [3, 2]], [-2, 1, 1])).toBe('inconsistent')
  })

  it('Example 4, both versions: the RREF and the parametric solution are right', () => {
    const v1 = M([[3, -1, 1, -7, 13], [-2, 1, -1, -3, -9], [-2, 1, 0, -7, -8]])
    expect(equals(rref(v1), M([[1, 0, 0, -10, 4], [0, 1, 0, -27, 0], [0, 0, 1, -4, 1]]))).toBe(true)
    const v2 = M([[3, -1, 1, 7, 13], [-2, 1, -1, -3, -9], [-2, 1, 0, -7, -8]])
    expect(equals(rref(v2), M([[1, 0, 0, 4, 4], [0, 1, 0, 1, 0], [0, 0, 1, -4, 1]]))).toBe(true)
    for (const r of [-3, 0, 2, '1/2']) {
      const t = q(r)
      expect(solves([[3, -1, 1, -7], [-2, 1, -1, -3], [-2, 1, 0, -7]], [q(4).add(q(10).mul(t)).toString(), q(27).mul(t).toString(), q(1).add(q(4).mul(t)).toString(), t.toString()], [13, -9, -8])).toBe(true)
      expect(solves([[3, -1, 1, 7], [-2, 1, -1, -3], [-2, 1, 0, -7]], [q(4).sub(q(4).mul(t)).toString(), q(0).sub(t).toString(), q(1).add(q(4).mul(t)).toString(), t.toString()], [13, -9, -8])).toBe(true)
    }
  })

  it('Example 5: two free parameters, S = {(7 − 2r − 3s, r, 1, s, 2)}', () => {
    const a: Rows = [[0, 0, -2, 0, 7], [2, 4, -10, 6, 12], [2, 4, -5, 6, -5]]
    expect(equals(rref(M([...a.map((row, i) => [...row, [12, 28, -1][i]!])])), M([[1, 2, 0, 3, 0, 7], [0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 1, 2]]))).toBe(true)
    for (const [r, s] of [[0, 0], [1, 0], [0, 1], [-2, 5], [3, -4]] as const) {
      expect(solves(a, [7 - 2 * r - 3 * s, r, 1, s, 2], [12, 28, -1])).toBe(true)
    }
  })

  it('Example 6: a·x system is unique for a ≠ ±2, infinite for a = 2 and inconsistent for a = −2', () => {
    const system = (a: number): Rows => [[1, 2, -3, 4], [3, -1, 5, 2], [4, 1, a * a - 2, a + 4]]
    for (const a of [-3, -1, 0, 1, 3, 5]) {
      expect(kind(system(a).map((row) => row.slice(0, 3)), system(a).map((row) => row[3]!)), `a = ${a}`).toBe('unique')
      // The row operations printed in the text give [0 0 a²−4 | a−2] in the last row.
      const step = applyRowOperation(applyRowOperation(applyRowOperation(applyRowOperation(M(system(a)), replaceRow(1, 0, q(-3))), replaceRow(2, 0, q(-4))), replaceRow(2, 1, q(-1))), scaleRow(1, q('-1/7')))
      expect(equals(step, M([[1, 2, -3, 4], [0, 1, -2, '10/7'], [0, 0, a * a - 4, a - 2]])), `a = ${a}`).toBe(true)
    }
    expect(kind(system(2).map((row) => row.slice(0, 3)), system(2).map((row) => row[3]!))).toBe('infinite')
    expect(kind(system(-2).map((row) => row.slice(0, 3)), system(-2).map((row) => row[3]!))).toBe('inconsistent')
  })
})

describe('chapter 3: matrix operations', () => {
  it('equality: a − b = 8, b + c = 1, c + 3d = 7, 2a − 4d = 6 gives (5, −3, 4, 1)', () => {
    const a: Rows = [[1, -1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 3], [2, 0, 0, -4]]
    expect(solves(a, [5, -3, 4, 1], [8, 1, 7, 6])).toBe(true)
    expect(kind(a, [8, 1, 7, 6])).toBe('unique')
  })

  it('addition, subtraction and scalar multiples', () => {
    const A = M([[1, 2, 3, 4], [-1, 4, -1, 4]])
    const B = M([[2, 3, 0, 1], [1, 1, 0, 0]])
    expect(equals(add(A, B), M([[3, 5, 3, 5], [0, 5, -1, 4]]))).toBe(true)
    expect(equals(subtract(A, B), M([[-1, -1, 3, 3], [-2, 3, -1, 4]]))).toBe(true)
    const S = M([[4, 6, 2, 8], [-4, 2, 0, 1], [1, 0, 1, 0]])
    expect(equals(scale(S, q(2)), M([[8, 12, 4, 16], [-8, 4, 0, 2], [2, 0, 2, 0]]))).toBe(true)
    expect(equals(scale(S, q(-3)), M([[-12, -18, -6, -24], [12, -6, 0, -3], [-3, 0, -3, 0]]))).toBe(true)
    expect(equals(scale(S, q('1/2')), M([[2, 3, 1, 4], [-2, 1, 0, '1/2'], ['1/2', 0, '1/2', 0]]))).toBe(true)
  })

  it('AB and BA of the non-commutativity example, and the same-size counterexample', () => {
    const A = M([[1, 2], [3, 0], [-1, 4]])
    const B = M([[2, 3, 1], [0, -1, 0]])
    expect(equals(multiply(A, B), M([[2, 1, 1], [6, 9, 3], [-2, -7, -1]]))).toBe(true)
    expect(equals(multiply(B, A), M([[10, 8], [-3, 0]]))).toBe(true)
    const C = M([[1, 1], [0, 0]])
    const D = M([[1, 0], [1, 0]])
    expect(equals(multiply(C, D), M([[2, 0], [0, 0]]))).toBe(true)
    expect(equals(multiply(D, C), M([[1, 1], [1, 1]]))).toBe(true)
  })

  it('transposes and the trace example', () => {
    expect(equals(transpose(M([[1, 2, 3, 4], [-1, 0, 1, 0], [2, 5, 7, 3]])), M([[1, -1, 2], [2, 0, 5], [3, 1, 7], [4, 0, 3]]))).toBe(true)
    expect(equals(transpose(M([[1, 2, 3], [1, 1, 2], [0, 0, 1]])), M([[1, 1, 0], [2, 1, 0], [3, 2, 1]]))).toBe(true)
    const trace = (rows: Rows) => rows.reduce((sum, row, i) => sum.add(q(row[i]!)), q(0)).toString()
    expect(trace([[1, 4, 5, 0], [-1, 3, 2, 5], [6, 1, 6, 1], [1, 1, 7, -4]])).toBe('6')
  })

  it('Exercise 3: 2E − 3D, −3(D + 2E) and tr(4Eᵀ − D) = 35', () => {
    const D = M([[1, 5, 2], [5, 0, 1], [3, 2, 4]])
    const E = M([[6, 1, 3], [-1, 1, 2], [4, 1, 3]])
    expect(equals(scale(add(D, scale(E, q(2))), q(-3)), M([[-39, -21, -24], [-9, -6, -15], [-33, -12, -30]]))).toBe(true)
    expect(equals(subtract(scale(E, q(2)), scale(D, q(3))), M([[9, -13, 0], [-17, 2, 1], [-1, -4, -6]]))).toBe(true)
    expect(equals(transpose(subtract(scale(transpose(E), q(2)), scale(transpose(D), q(3)))), subtract(scale(E, q(2)), scale(D, q(3))))).toBe(true)
    const trace = (m: Matrix) => m.reduce((sum, row, i) => sum.add(row[i]!), q(0))
    expect(trace(subtract(scale(transpose(E), q(4)), D)).toString()).toBe('35')
  })

  it('Exercise 4: [k 1 1]·M·[k 1 1]ᵀ = [k² + 2k + 1], zero only at k = −1', () => {
    const middle = M([[1, 1, 0], [1, 0, 2], [0, 2, -3]])
    for (const k of [-3, -1, 0, 2, 5]) {
      const value = multiply(multiply(M([[k, 1, 1]]), middle), M([[k], [1], [1]]))
      expect(value[0]![0]!.toString()).toBe(String((k + 1) ** 2))
    }
  })

  it('Exercise 5: the diagonal solutions of AX² + BX + C = O are diag(1, −1) and diag(1, 2), and no others of a small grid', () => {
    const A = M([[0, 1], [-1, 0]])
    const B = M([[0, -1], [2, 0]])
    const C = M([[0, -2], [-1, 0]])
    const residual = (x: number, y: number) => {
      const X = M([[x, 0], [0, y]])
      return add(add(multiply(A, multiply(X, X)), multiply(B, X)), C)
    }
    const solutions: [number, number][] = []
    for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) if (isZeroMatrix(residual(x, y))) solutions.push([x, y])
    expect(solutions).toEqual([[1, -1], [1, 2]])
  })

  it('Exercises 1 and 2: which expressions are defined, and of what size', () => {
    const [A, B, C, D, E] = [zeroMatrix(4, 5), zeroMatrix(4, 5), zeroMatrix(5, 2), zeroMatrix(4, 2), zeroMatrix(5, 4)]
    const defined = (f: () => Matrix) => {
      try {
        const m = f()
        return `${m.length}×${m[0]!.length}`
      } catch {
        return null
      }
    }
    expect(defined(() => multiply(B, A))).toBeNull()
    expect(defined(() => add(multiply(A, C), D))).toBe('4×2')
    expect(defined(() => add(multiply(A, E), D))).toBeNull()
    expect(defined(() => multiply(add(transpose(A), E), D))).toBe('5×2')
    // [(AB)ᵀ + C]A for B of size 4×5: A must be n×4 and C must be 5×n, giving 5×4 whatever n is.
    for (const n of [1, 2, 3, 7]) {
      const [a, b, c] = [zeroMatrix(n, 4), zeroMatrix(4, 5), zeroMatrix(5, n)]
      expect(defined(() => multiply(add(transpose(multiply(a, b)), c), a))).toBe('5×4')
    }
  })

  it('the classification drill: every listed property holds, and the unlisted ones do not', () => {
    const square = (m: Matrix) => m.length === m[0]!.length
    const diagonal = (m: Matrix) => square(m) && m.every((row, i) => row.every((v, j) => i === j || v.isZero()))
    const upper = (m: Matrix) => square(m) && m.every((row, i) => row.every((v, j) => i <= j || v.isZero()))
    const lower = (m: Matrix) => square(m) && m.every((row, i) => row.every((v, j) => i >= j || v.isZero()))
    const symmetric = (m: Matrix) => square(m) && equals(m, transpose(m))
    const drill: [string, Rows, Partial<Record<'square' | 'diagonal' | 'upper' | 'lower' | 'symmetric', boolean>>][] = [
      ['A', [[2]], { square: true, diagonal: true, upper: true, lower: true, symmetric: true }],
      ['B', [[1, 2], [0, 3]], { square: true, upper: true, diagonal: false, lower: false }],
      ['C', [[1, 2, 3], [0, 1, 0]], { square: false }],
      ['D', [[1], [2], [0]], { square: false }],
      ['E', [[1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0]], { square: false }],
      ['F', [[-1, 2, 0]], { square: false }],
      ['G', [[1, 0, 0], [2, 1, 0], [0, 0, 1]], { square: true, lower: true, upper: false, diagonal: false }],
      ['H', [[1, 0], [0, 0]], { square: true, diagonal: true, upper: true, lower: true }],
      ['I', [[1]], { square: true, diagonal: true, symmetric: true }],
      ['J', [[1, 1], [0, 0]], { square: true, upper: true, lower: false, diagonal: false }],
    ]
    const tests = { square, diagonal, upper, lower, symmetric }
    for (const [name, rows, expected] of drill) {
      for (const [property, value] of Object.entries(expected)) {
        expect(tests[property as keyof typeof tests](M(rows)), `${name} ${property}`).toBe(value)
      }
    }
    expect(isIdentity(M([[1]]))).toBe(true)
  })

  it('zero divisors: two nonzero matrices with product O', () => {
    expect(isZeroMatrix(multiply(M([[1, 1], [0, 0]]), M([[1, 0], [-1, 0]])))).toBe(true)
  })
})

describe('chapter 4: inverses', () => {
  it('the verification example and the 2×2 formula examples', () => {
    expect(isIdentity(multiply(M([[1, 1], [3, 4]]), M([[4, -1], [-3, 1]])))).toBe(true)
    expect(isIdentity(multiply(M([[4, -1], [-3, 1]]), M([[1, 1], [3, 4]])))).toBe(true)
    expect(equals(inverseOf([[1, 2], [3, 4]]), M([[-2, 1], ['3/2', '-1/2']]))).toBe(true)
    expect(invert(M([[2, 4], [3, 6]])).invertible).toBe(false)
  })

  it('Example 3: det = 10a + 1 and the inverse formula, for several a', () => {
    for (const a of [0, 1, 2, -3, 7]) {
      const rows: Rows = [[2 * a, -1], [4 * a + 1, 3]]
      expect(det(rows)).toBe(String(10 * a + 1))
      const claimed = scale(M([[3, 1], [-(4 * a + 1), 2 * a]]), q(1).div(q(10 * a + 1)))
      expect(equals(inverseOf(rows), claimed)).toBe(true)
    }
    // At the excluded value a = −1/10 the matrix [[−1/5, −1], [3/5, 3]] is singular.
    expect(invert(M([['-1/5', -1], ['3/5', 3]])).invertible).toBe(false)
  })

  it('Problems 1–4: recovering A from a given inverse expression', () => {
    expect(equals(inverseOf([[2, -1], [3, 5]]), M([['5/13', '1/13'], ['-3/13', '2/13']]))).toBe(true)
    expect(equals(scale(inverseOf([[-3, 7], [1, -2]]), q('1/7')), M([['2/7', 1], ['1/7', '3/7']]))).toBe(true)
    const aT = scale(inverseOf([[-3, -1], [5, 2]]), q(5))
    expect(equals(aT, M([[-10, -5], [25, 15]]))).toBe(true)
    expect(equals(transpose(aT), M([[-10, 25], [-5, 15]]))).toBe(true)
    const twoAT = subtract(inverseOf([[-1, 2], [4, 5]]), identity(2))
    expect(equals(transpose(scale(twoAT, q('1/2'))), M([['-9/13', '2/13'], ['1/13', '-6/13']]))).toBe(true)
  })

  it('the matrix polynomial theorem: A⁻¹ = −⅕A² − ⅗A + ⅖I, shown on the companion matrix of x³ + 3x² − 2x + 5', () => {
    const A = M([[0, 0, -5], [1, 0, 2], [0, 1, -3]])
    const A2 = multiply(A, A)
    const A3 = multiply(A2, A)
    expect(isZeroMatrix(add(add(add(A3, scale(A2, q(3))), scale(A, q(-2))), scale(identity(3), q(5))))).toBe(true)
    const claimed = add(add(scale(A2, q('-1/5')), scale(A, q('-3/5'))), scale(identity(3), q('2/5')))
    expect(equals(claimed, inverseOf([[0, 0, -5], [1, 0, 2], [0, 1, -3]]))).toBe(true)
  })

  it('the Gauss–Jordan examples: the 3×3, the second 3×3 and the anti-diagonal 4×4', () => {
    expect(equals(inverseOf([[1, 0, 1], [0, 1, 1], [1, 1, 0]]), M([['1/2', '-1/2', '1/2'], ['-1/2', '1/2', '1/2'], ['1/2', '1/2', '-1/2']]))).toBe(true)
    expect(equals(inverseOf([[3, 4, -1], [1, 0, 3], [2, 5, -4]]), M([['3/2', '-11/10', '-6/5'], [-1, 1, 1], ['-1/2', '7/10', '2/5']]))).toBe(true)
    const [a, b, c, d] = [1, 2, 3, 4]
    const C = M([[0, 0, 0, a], [0, 0, b, 0], [0, c, 0, 0], [d, 0, 0, 0]])
    expect(equals(inverseOf([[0, 0, 0, a], [0, 0, b, 0], [0, c, 0, 0], [d, 0, 0, 0]]), M([[0, 0, 0, '1/4'], [0, 0, '1/3', 0], [0, '1/2', 0, 0], [1, 0, 0, 0]]))).toBe(true)
    expect(isIdentity(multiply(C, inverseOf([[0, 0, 0, a], [0, 0, b, 0], [0, c, 0, 0], [d, 0, 0, 0]])))).toBe(true)
    expect(invert(M([[0, 0, 0, 1], [0, 0, 2, 0], [0, 0, 0, 0], [4, 0, 0, 0]])).invertible).toBe(false)
  })

  it('applications: X = A⁻¹B for the 3×3 system and the 2×2 symbolic one', () => {
    const A: Rows = [[1, 2, 3], [2, 5, 3], [1, 0, 8]]
    expect(equals(inverseOf(A), M([[-40, 16, 9], [13, -5, -3], [5, -2, -1]]))).toBe(true)
    expect(vectorsEqual(multiplyVector(inverseOf(A), vector([5, 3, 17])), vector([1, -1, 2]))).toBe(true)
    expect(det([[2, -3], [4, 5]])).toBe('22')
    expect(equals(inverseOf([[2, -3], [4, 5]]), scale(M([[5, 3], [-4, 2]]), q('1/22')))).toBe(true)
    for (const [a, b] of [[22, 0], [0, 22], [3, 7]] as Pairs) {
      const x = multiplyVector(inverseOf([[2, -3], [4, 5]]), vector([a, b]))
      expect(x[0]!.toString()).toBe(q(5 * a + 3 * b).div(q(22)).toString())
      expect(x[1]!.toString()).toBe(q(-4 * a + 2 * b).div(q(22)).toString())
    }
  })

  it('consistency conditions for singular systems: a = 2b, and a = b + c', () => {
    const first: Rows = [[6, -4], [3, -2]]
    for (const [a, b] of [[4, 2], [0, 0], [-6, -3]] as Pairs) expect(kind(first, [a, b])).toBe('infinite')
    for (const [a, b] of [[4, 1], [1, 0], [0, 3]] as Pairs) expect(kind(first, [a, b])).toBe('inconsistent')
    const second: Rows = [[1, -2, 5], [4, -5, 8], [-3, 3, -3]]
    for (const [b, c] of [[2, 3], [0, 0], [-1, 4]] as Pairs) expect(kind(second, [b + c, b, c])).toBe('infinite')
    for (const [b, c] of [[2, 2], [1, 0]] as Pairs) expect(kind(second, [b + c + 1, b, c])).toBe('inconsistent')
  })
})

describe('chapter 5: determinants', () => {
  it('the 2×2 examples and the parameter equations', () => {
    expect(det([[1, 2], [3, -4]])).toBe('-10')
    expect(det([[1, 2], [4, 5]])).toBe('-3')
    for (const a of [-2, 0, 1, 3]) {
      expect(det([[2 * a, -1], [-1, 3 * a]])).toBe(String(6 * a * a - 1))
      expect(det([[a - 2, 1], [-5, a + 4]])).toBe(String(a * a + 2 * a - 3))
    }
    expect(det([[-1, 1], [-5, 5]])).toBe('0') // a = 1
    expect(det([[-5, 1], [-5, 1]])).toBe('0') // a = −3
  })

  it('3×3 examples: the row-2 expansion, Sarrus with letters, and the roots of (a−4)(a−3)(a+2)', () => {
    expect(det([[1, 2, 3], [-1, 0, 1], [3, 5, 4]])).toBe('-6')
    for (const [a, b] of [[1, 2], [3, -1], [2, 5]] as Pairs) expect(det([[a, b, 0], [0, a, b], [a, 0, b]])).toBe(String(a * b * (a + b)))
    for (const a of [-3, 0, 1, 5]) expect(det([[a - 4, 0, 0], [0, a, 2], [0, 3, a - 1]])).toBe(String((a - 4) * (a - 3) * (a + 2)))
    for (const a of [4, 3, -2]) expect(det([[a - 4, 0, 0], [0, a, 2], [0, 3, a - 1]])).toBe('0')
  })

  it('the 4×4 example: 3', () => {
    expect(det([[1, 2, 3, 4], [-1, 0, 0, 1], [1, 1, 2, 1], [-1, 0, 0, 4]])).toBe('3')
  })

  it('property examples: identical columns, and Exercises 1–6', () => {
    expect(det([[1, 5, 1, 7], [2, 6, 2, 8], [3, 7, 3, 9], [4, 8, 4, 0]])).toBe('0')
    for (const k of [-2, 1, 2, 3]) expect(det([[k * k, 2 * k, 3 * k * k], [k ** 3, k, k * k], [k, 0, k]])).toBe(String(-2 * k ** 5))
    // Exercises 2–4 are arithmetic with the stated determinants.
    expect(q(8).mul(q(2)).mul(power(q('1/4'), 3)).toString()).toBe('1/4')
    for (const n of [2, 3, 4]) expect(power(q(2), n).mul(power(q(12), 2)).mul(q('1/3')).mul(q('1/6')).toString()).toBe(String(2 ** (n + 3)))
    expect(q(1).div(q(-7)).toString()).toBe('-1/7')
    expect(q(8).mul(q(-1).div(q(7))).toString()).toBe('-8/7')
    expect(q(1).div(q(8).mul(q(-7))).toString()).toBe('-1/56')
    const letters: [number, number, number][] = [[1, 2, 3], [2, -1, 5], [0, 4, 7]]
    for (const [a, b, c] of letters) {
      expect(det([[a + b, b + c, c + a], [c, a, b], [1, 1, 1]])).toBe('0')
      expect(det([[a, b, c], [b, c, a], [c, a, b]])).toBe(String(3 * a * b * c - a ** 3 - b ** 3 - c ** 3))
    }
    expect(det([[0, 1, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 0]])).toBe('-3')
  })
})

describe('chapter 6: vector spaces and subspaces', () => {
  it('linear combinations: u = −3v₁ + 2v₂ in ℝ³, p = −2p₁ + p₂ − 2p₃ in P₂, and the matrix that is not one', () => {
    expect(vectorsEqual(vector([9, 2, 7]), vector([-3 * 1 + 2 * 6, -3 * 2 + 2 * 4, -3 * -1 + 2 * 2]))).toBe(true)
    // P₂ as coordinate columns (constant, x, x²).
    const p: Rows = [[2, 1, 3], [1, -1, 2], [4, 3, 5]]
    expect(solves(p, [-2, 1, -2], [-9, -7, -15])).toBe(true)
    expect(kind(p, [-9, -7, -15])).toBe('unique')
    // [[1,2],[-1,3]] against A, B, C in M₂₂, entries read row by row.
    const columns: Rows = [[1, 2, 0], [-1, -1, 1], [0, 2, 2], [0, 0, 1]]
    expect(kind(columns, [1, 2, -1, 3])).toBe('inconsistent')
  })

  it('spanning: {(2,2,2),(0,0,3),(0,1,1)} spans ℝ³ with the stated coefficients; the four polynomials span only a plane of P₂', () => {
    expect(det([[2, 0, 0], [2, 0, 1], [2, 3, 1]])).toBe('-6')
    const targets: [number, number, number][] = [[1, 2, 3], [-2, 5, 0], [4, 4, 4]]
    for (const [x, y, z] of targets) {
      const [a, b, c] = [x / 2, (z - y) / 3, y - x] as [number, number, number]
      near(a * 2, x)
      near(a * 2 + c * 1, y)
      near(a * 2 + b * 3 + c * 1, z)
    }
    const columns = M([[3, 2, 5, 1], [1, -3, -2, 4], [4, 5, 9, -1]])
    expect(rank(columns)).toBe(2)
  })

  it('subspace spanning sets: the P₂ condition p(2) = −p(1) is met by both generators', () => {
    const at = (p: [number, number, number], x: number) => p[0] + p[1] * x + p[2] * x * x
    for (const p of [[1, 0, -2 / 5], [0, 1, -3 / 5]] as [number, number, number][]) near(at(p, 2), -at(p, 1))
  })
})

describe('chapter 7: linear independence', () => {
  it('Example 1 of §2 is independent, Example 2 has the dependency w₁ + w₂ − 2w₃ = 0', () => {
    expect(det([[1, 2, 1], [2, -1, 0], [3, 0, 0]])).not.toBe('0')
    expect(solves([[1, 5, 3], [-2, 6, 2], [3, -1, 1]], [1, 1, -2], [0, 0, 0])).toBe(true)
    expect(det([[1, 5, 3], [-2, 6, 2], [3, -1, 1]])).toBe('0')
  })

  it('the determinant examples: 39, −32, 2 and the parameter −4k + 9', () => {
    expect(det([[-3, 5, 1], [0, -1, 1], [4, 2, 3]])).toBe('39')
    expect(det([[2, 3, 2], [-1, 6, 10], [4, 2, -4]])).toBe('-32')
    expect(det([[1, 2, 1, 0], [0, 1, -1, 1], [0, 0, 0, 1], [1, 0, 1, 1]])).toBe('2')
    for (const k of [-2, 0, 1, 3, 9 / 4]) {
      const expected = q(-4 * 1).mul(q(String(k))).add(q(9)).toString()
      expect(determinantOfRows([[1, 2, 1], [2, String(k), 1], [3, -1, -1]])).toBe(expected)
    }
    expect(determinantOfRows([[1, 2, 1], [2, '9/4', 1], [3, -1, -1]])).toBe('0')
  })

  it('Wronskians: W(1, eˣ, e²ˣ) = 2e³ˣ and W(sin x, cos x, x sin x) = −2cos x', () => {
    for (const x of [-1.3, 0, 0.7, 2]) {
      const e = Math.exp
      near(wronskian3([[1, e(x), e(2 * x)], [0, e(x), 2 * e(2 * x)], [0, e(x), 4 * e(2 * x)]]), 2 * e(3 * x), 7)
      const [s, c] = [Math.sin(x), Math.cos(x)]
      near(wronskian3([[s, c, x * s], [c, -s, s + x * c], [-s, -c, 2 * c - x * s]]), -2 * c, 9)
    }
  })

  it('the two-vector examples', () => {
    expect(vectorsEqual(vector([-2, 2, -8]), vector([-2 * 1, -2 * -1, -2 * 4]))).toBe(true)
    expect(rank(M([[1, -1, 2, 0], [3, -3, 6, 4]]))).toBe(2)
    expect(equals(scale(M([[3, 2], [-1, 4]]), q(-3)), M([[-9, -6], [3, -12]]))).toBe(true)
  })
})

describe('chapter 8: bases and dimension', () => {
  it('{1 + x, 1 + x², x + x²} is a basis of P₂ and the coordinate formulas are right', () => {
    expect(det([[1, 1, 0], [1, 0, 1], [0, 1, 1]])).toBe('-2')
    const triples: [number, number, number][] = [[1, 2, 3], [-4, 0, 5], [2, 2, 2]]
    for (const [a, b, c] of triples) {
      const [alpha, beta, gamma] = [(a + b - c) / 2, (a - b + c) / 2, (-a + b + c) / 2]
      near(alpha + beta, a)
      near(alpha + gamma, b)
      near(beta + gamma, c)
    }
  })

  it('subspace bases: x + 3y − z = 0 and p(1) + p′(1) = 0', () => {
    for (const v of [[-3, 1, 0], [1, 0, 1]]) expect(v[0]! + 3 * v[1]! - v[2]!).toBe(0)
    // p = a + bx + cx²: p(1) + p′(1) = a + 2b + 3c.
    const generators: [number, number, number][] = [[-2, 1, 0], [-3, 0, 1]]
    for (const [a, b, c] of generators) expect(a + 2 * b + 3 * c).toBe(0)
    expect(rank(M([[1, 1, 0, 0], [0, 1, 0, 1], [0, 0, 1, 1]]))).toBe(3)
  })

  it('the three basis tests: determinants −1, 85 and −2(a − 1)', () => {
    expect(det([[1, 2, 3], [2, 9, 3], [1, 0, 4]])).toBe('-1')
    expect(det([[3, 0, 2], [2, 1, -4], [-1, 5, 1]])).toBe('85')
    for (const a of [-2, 0, 1, 4]) expect(det([[1, 1, 1], [2, 0, 1], [1, 1, a]])).toBe(String(-2 * (a - 1)))
  })

  it('coordinates: (1, −1, 3) ↦ 4x + 2x²; (3, 2) ↦ (½, 5⁄2); 1 − 2x + x² ↦ (−21⁄5, 13⁄5, 11⁄5); the M₂₂ example ↦ (3, 0, 0, 1)', () => {
    // (1+x) − (1+x²) + 3(x+x²) = 4x + 2x²
    expect([1 - 1, 1 + 3, -1 + 3]).toEqual([0, 4, 2])
    expect(solves([[1, 1], [-1, 1]], ['1/2', '5/2'], [3, 2])).toBe(true)
    expect(solves([[1, 2, 0], [1, 0, 1], [0, -3, 4]], ['-21/5', '13/5', '11/5'], [1, -2, 1])).toBe(true)
    expect(kind([[1, 2, 0], [1, 0, 1], [0, -3, 4]], [1, -2, 1])).toBe('unique')
    // [[3,-2],[0,1]] against the four matrices of the basis, entries read row by row.
    expect(solves([[1, 0, 1, 0], [-1, 1, 0, 1], [0, 1, 0, 0], [0, 0, 0, 1]], [3, 0, 0, 1], [3, -2, 0, 1])).toBe(true)
    expect(det([[1, 0, 1, 0], [-1, 1, 0, 1], [0, 1, 0, 0], [0, 0, 0, 1]])).not.toBe('0')
  })

  it('the Minus Theorem example: cos²x + sin²x = 1 and W(cos²x, sin²x) = sin 2x', () => {
    for (const x of [-2, 0.3, 1.9]) {
      near(Math.cos(x) ** 2 + Math.sin(x) ** 2, 1)
      const w = Math.cos(x) ** 2 * (2 * Math.sin(x) * Math.cos(x)) - Math.sin(x) ** 2 * (-2 * Math.cos(x) * Math.sin(x))
      near(w, Math.sin(2 * x))
    }
  })
})

describe('chapter 9: fundamental spaces of a matrix', () => {
  it('Example 2: N(A) is spanned by (16, 19, 1)', () => {
    const a: Rows = [[1, -1, 3], [5, -4, -4], [7, -6, 2]]
    expect(equals(rref(M(a)), M([[1, 0, -16], [0, 1, -19], [0, 0, 0]]))).toBe(true)
    expect(solves(a, [16, 19, 1], [0, 0, 0])).toBe(true)
    expect(analyzeSpaces(M(a)).nullity).toBe(1)
  })

  it('Example 3: the 3×4 RREF, nullity 2 and its null-space basis', () => {
    const a: Rows = [[1, 4, 5, 2], [2, 1, 3, 0], [-1, 3, 2, 2]]
    expect(equals(rref(M(a)), M([[1, 0, 1, '-2/7'], [0, 1, 1, '4/7'], [0, 0, 0, 0]]))).toBe(true)
    expect(solves(a, [-1, -1, 1, 0], [0, 0, 0])).toBe(true)
    expect(solves(a, ['2/7', '-4/7', 0, 1], [0, 0, 0])).toBe(true)
    expect(solves(a, [2, -4, 0, 7], [0, 0, 0])).toBe(true)
    expect(analyzeSpaces(M(a)).nullity).toBe(2)
  })

  it('the row-space example: rank 3, and the printed echelon rows lie in the row space', () => {
    const a = M([[1, 2, 3, 4], [-1, 1, 0, 1], [1, 2, 1, 0]])
    expect(rank(a)).toBe(3)
    const echelon = M([[1, 2, 3, 4], [0, 1, 1, '5/3'], [0, 0, 1, 2]])
    expect(rank(stack(a, echelon))).toBe(3)
  })

  it('the 4×4 example has rank 4, nullity 0', () => {
    const analysis = analyzeSpaces(M([[1, 2, -1, 4], [0, 1, 1, 1], [2, 1, 3, 2], [1, -1, 1, -1]]))
    expect([analysis.rank, analysis.nullity]).toEqual([4, 0])
  })

  it('the parameter examples: rank of [[1,1,t],[1,t,1],[t,1,1]] and of [[t,3,−1],[3,6,−2],[−1,−3,t]]', () => {
    const first = (t: string | number): Rows => [[1, 1, t], [1, t, 1], [t, 1, 1]]
    for (const t of [0, 2, 3, '1/2', -1]) expect(rank(M(first(t)))).toBe(3)
    expect(rank(M(first(-2)))).toBe(2)
    expect(rank(M(first(1)))).toBe(1)
    const second = (t: string | number): Rows => [[t, 3, -1], [3, 6, -2], [-1, -3, t]]
    for (const t of [0, 2, -1, '5/2']) expect(rank(M(second(t)))).toBe(3)
    expect(rank(M(second('3/2')))).toBe(2)
    expect(rank(M(second(1)))).toBe(2)
    expect(det(second(0))).toBe('9')
  })

  it('the column-space examples: the 3×4 and the 4×6 have pivot columns 1, 2, 3 and 1, 3, 5, so the bases are the original columns', () => {
    expect(analyzeSpaces(M([[1, 3, 2, -1], [1, 4, 1, 1], [3, 2, -1, 1]])).pivotColumns).toEqual([0, 1, 2])
    const six: Rows = [[1, -3, 4, -2, 5, 4], [2, -6, 9, -1, 8, 2], [2, -6, 9, -1, 9, 7], [-1, 3, -4, 2, -5, -4]]
    const analysis = analyzeSpaces(M(six))
    expect(analysis.pivotColumns).toEqual([0, 2, 4])
    expect(analysis.columnSpaceBasis.map((c) => c.vector.map(String))).toEqual([
      ['1', '2', '2', '-1'],
      ['4', '9', '9', '-4'],
      ['5', '8', '9', '-5'],
    ])
  })

  it('REVIEW NOTE: the echelon matrix printed for the 4×6 example has +3 where the row operations give −3', () => {
    const six = M([[1, -3, 4, -2, 5, 4], [2, -6, 9, -1, 8, 2], [2, -6, 9, -1, 9, 7], [-1, 3, -4, 2, -5, -4]])
    const printed = M([[1, 3, 4, -2, 5, 4], [0, 0, 1, 3, -2, -6], [0, 0, 0, 0, 1, 5], [0, 0, 0, 0, 0, 0]])
    const corrected = M([[1, -3, 4, -2, 5, 4], [0, 0, 1, 3, -2, -6], [0, 0, 0, 0, 1, 5], [0, 0, 0, 0, 0, 0]])
    expect(rank(stack(six, corrected))).toBe(rank(six)) // row-equivalent to A
    expect(rank(stack(six, printed))).toBeGreaterThan(rank(six)) // the printed one is not
    expect(analyzeSpaces(printed).pivotColumns).toEqual(analyzeSpaces(six).pivotColumns) // the conclusion survives
    expect(notes[8]!.reviewNotes?.join(' ')).toMatch(/\+3.*−3|−3.*\+3/)
  })

  it('applications: the spanning sets have bases {v₁, v₂, v₄} (dimension 3) and dimension 2', () => {
    const columns = M([[1, 2, 0, 2, 5], [-2, -5, 1, -1, -8], [0, -3, 3, 4, 1], [3, 6, 0, -7, 2]])
    const analysis = analyzeSpaces(columns)
    expect(analysis.pivotColumns).toEqual([0, 1, 3])
    expect(analysis.rank).toBe(3)
    expect(rank(M([[1, 0, 1, 1], [-3, 3, 7, 1], [-1, 3, 9, 3], [-5, 3, 5, -1]]))).toBe(2)
  })
})

describe('chapter 10: eigenvalues and diagonalization', () => {
  const A2 = M([[3, 0], [8, -1]])
  const A3 = M([[0, 0, -2], [1, 2, 1], [1, 0, 3]])
  const eigen = (m: Matrix, lambda: number, v: (string | number)[]) => vectorsEqual(multiplyVector(m, vector(v)), vector(v.map((x) => q(x).mul(q(lambda)).toString())))

  it('the 2×2 example: eigenvalues 3 and −1 with eigenvectors (1, 2) and (0, 1)', () => {
    expect(eigen(A2, 3, [1, 2])).toBe(true)
    expect(eigen(A2, -1, [0, 1])).toBe(true)
    expect(det([[3 - 3, 0], [-8, 3 + 1]])).toBe('0')
    expect(det([[-1 - 3, 0], [-8, 0]])).toBe('0')
  })

  it('the 3×3 example: eigenvalues 1 and 2 (twice), E₁ = span(−2, 1, 1), E₂ = span{(0, 1, 0), (−1, 0, 1)}', () => {
    expect(eigen(A3, 1, [-2, 1, 1])).toBe(true)
    expect(eigen(A3, 2, [0, 1, 0])).toBe(true)
    expect(eigen(A3, 2, [-1, 0, 1])).toBe(true)
    expect(analyzeSpaces(subtract(scale(identity(3), q(2)), A3)).nullity).toBe(2)
    expect(analyzeSpaces(subtract(identity(3), A3)).nullity).toBe(1)
  })

  it('triangular matrices, and det(A) = (−1)ⁿP(0) for P(λ) = (λ−2)³(λ+2)(λ−1)²', () => {
    const t: Rows = [[1, 0, 0], [2, -2, 0], [3, 1, 4]]
    for (const lambda of [1, -2, 4]) expect(det(t.map((row, i) => row.map((v, j) => (i === j ? lambda - Number(v) : -Number(v)))))).toBe('0')
    expect(power(q(-2), 3).mul(q(2)).mul(power(q(-1), 2)).toString()).toBe('-16')
  })

  it('the distinct-eigenvalue example: characteristic polynomial (λ−1)(λ−2)(λ+2) and its three eigenvectors', () => {
    const A = M([[1, -1, 0], [-1, 1, 2], [1, 1, -1]])
    for (const lambda of [-3, 0, 1, 2, 5]) {
      expect(determinant(subtract(scale(identity(3), q(lambda)), A)).toString()).toBe(String((lambda - 1) * (lambda - 2) * (lambda + 2)))
    }
    expect(eigen(A, 1, [2, 0, 1])).toBe(true)
    expect(eigen(A, 2, [-1, 1, 0])).toBe(true)
    expect(eigen(A, -2, [-1, -3, 4])).toBe(true)
  })

  it('REVIEW NOTE: the third column of P is printed as (−1⁄4, 3⁄4, 1); the eigenvector for λ = −2 is (−1⁄4, −3⁄4, 1)', () => {
    const A = M([[1, -1, 0], [-1, 1, 2], [1, 1, -1]])
    const D = M([[1, 0, 0], [0, 2, 0], [0, 0, -2]])
    const printed = M([[2, -1, '-1/4'], [0, 1, '3/4'], [1, 0, 1]])
    const corrected = M([[2, -1, '-1/4'], [0, 1, '-3/4'], [1, 0, 1]])
    const inverseP = (p: Matrix) => {
      const r = invert(p)
      if (!r.invertible) throw new Error('P is singular')
      return r.inverse
    }
    expect(equals(multiply(multiply(inverseP(corrected), A), corrected), D)).toBe(true)
    expect(equals(multiply(multiply(inverseP(printed), A), printed), D)).toBe(false)
    expect(eigen(A, -2, ['-1/4', '3/4', 1])).toBe(false)
    expect(eigen(A, -2, ['-1/4', '-3/4', 1])).toBe(true)
    expect(notes[9]!.reviewNotes?.join(' ')).toMatch(/3\/4|3⁄4/)
  })

  it('the repeated-eigenvalue example: P⁻¹AP = D, P⁻¹ as printed, and Aⁿ = P Dⁿ P⁻¹ for n = 1…6', () => {
    const A = M([[1, 0, 2], [0, -1, 0], [2, 0, 1]])
    const P = M([[1, 0, -1], [0, 1, 0], [1, 0, 1]])
    const D = M([[3, 0, 0], [0, -1, 0], [0, 0, -1]])
    const Pinv = M([['1/2', 0, '1/2'], [0, 1, 0], ['-1/2', 0, '1/2']])
    expect(isIdentity(multiply(P, Pinv))).toBe(true)
    expect(equals(multiply(multiply(Pinv, A), P), D)).toBe(true)
    expect(analyzeSpaces(subtract(scale(identity(3), q(-1)), A)).nullity).toBe(2)
    let power: Matrix = identity(3)
    for (let n = 1; n <= 6; n++) {
      power = multiply(power, A)
      const [p, m] = [3 ** n, (-1) ** n]
      expect(equals(power, M([[q(p + m).div(q(2)).toString(), 0, q(p - m).div(q(2)).toString()], [0, m, 0], [q(p - m).div(q(2)).toString(), 0, q(p + m).div(q(2)).toString()]])), `n = ${n}`).toBe(true)
    }
  })
})

describe('chapter 11: linear transformations', () => {
  it('Example B: the formula for T(a, b, c) reproduces the three prescribed values', () => {
    const T = (a: number, b: number, c: number) => [(a - b + 3 * c) / 3, (2 * a + b + 3 * c) / 6, (2 * a - 5 * b + 3 * c) / 6]
    expect(T(1, 1, 1)).toEqual([1, 1, 0]) // 1 + x
    expect(T(2, 2, 0)).toEqual([0, 1, -1]) // x − x²
    expect(T(3, 0, 0)).toEqual([1, 1, 1]) // 1 + x + x²
  })

  it('Example C: T(x, y) matches T(1, 2), T(2, −1), the printed T(2, 21) and T(2, 2)', () => {
    const T = (x: number, y: number) => [(-x + 3 * y) / 5, (2 * x - y) / 5, 0, (2 * x + 4 * y) / 5]
    expect(T(1, 2)).toEqual([1, 0, 0, 2])
    expect(T(2, -1)).toEqual([-1, 1, 0, 0])
    expect(T(2, 21).map((v) => v * 5)).toEqual([61, -17, 0, 88])
    expect(T(2, 2).map((v) => v * 5)).toEqual([4, 2, 0, 12])
  })

  it('the kernel and range examples: T(x, y, z) = (x − y, y − z) and T(x, y) = (2x − y, −8x + 4y)', () => {
    const first: Rows = [[1, -1, 0], [0, 1, -1]]
    expect(solves(first, [1, 1, 1], [0, 0])).toBe(true)
    expect(analyzeSpaces(M(first)).rank).toBe(2)
    expect(solves(first, [6, 1, 0], [5, 1])).toBe(true)
    const second: Rows = [[2, -1], [-8, 4]]
    expect(solves(second, [5, 10], [0, 0])).toBe(true)
    expect(kind(second, [5, 0])).toBe('inconsistent')
    expect(analyzeSpaces(M(second)).nullity).toBe(1)
    expect(analyzeSpaces(M(second)).rank).toBe(1)
  })

  it('the counterexample T(x, y) = (2x, xy): T(0, 0) = 0 but T(2·u) ≠ 2·T(u) at u = (2, 5)', () => {
    const T = (x: number, y: number) => [2 * x, x * y]
    expect(T(0, 0)).toEqual([0, 0])
    expect(T(4, 10)).toEqual([8, 40])
    expect(T(2, 5).map((v) => 2 * v)).toEqual([8, 20])
  })
})

describe('chapter 12: the dot product', () => {
  const dot = (u: number[], v: number[]) => u.reduce((sum, x, i) => sum + x * v[i]!, 0)
  const norm2 = (u: number[]) => dot(u, u)
  const combine = (a: number, u: number[], b: number, v: number[]) => u.map((x, i) => a * x + b * v[i]!)

  it('worked examples: u·v, the expansion = −24, ‖2u + 3v‖² = 138', () => {
    expect(dot([1, 2, -3], [-3, 5, 2])).toBe(1)
    const [u, v] = [[1, 2, 0], [-1, 0, 1]]
    expect(dot(combine(2, u, 3, v), combine(-4, u, 1, v))).toBe(-24)
    const [p, r] = [[1, 2, -1], [3, 0, 1]]
    expect(norm2(combine(2, p, 3, r))).toBe(138)
    expect(norm2([1, -1, 4])).toBe(18)
  })

  it('distance, angles and orthogonality: d = 2, θ ≈ 78.9°, the cube diagonals meet at 60°, (1,1,−2) ⊥ (3,1,2)', () => {
    near(Math.sqrt((0 - Math.SQRT2) ** 2 + 1 + 1), 2)
    near((Math.acos(dot([2, 1, -2], [1, 1, 1]) / (3 * Math.sqrt(3))) * 180) / Math.PI, 78.9, 1)
    near((Math.acos(1 / 2) * 180) / Math.PI, 60)
    expect(dot([1, 1, -2], [3, 1, 2])).toBe(0)
  })

  it('Worked Problems 1 and 2: no k, L make (k,3,2), (−3,1,L), (−5,5,1) orthogonal; ±(5,−2,1)/√30 is the unit vector', () => {
    const k = 17 / 5
    const L = -20
    near(dot([k, 3, 2], [-5, 5, 1]), 0)
    near(dot([-3, 1, L], [-5, 5, 1]), 0)
    expect(Math.abs(dot([k, 3, 2], [-3, 1, L]))).toBeGreaterThan(40) // the first equation fails: −47.2
    near(dot([k, 3, 2], [-3, 1, L]), -47.2)
    expect(dot([5, -2, 1], [1, 2, -1])).toBe(0)
    expect(dot([5, -2, 1], [0, 2, 4])).toBe(0)
    expect(norm2([5, -2, 1])).toBe(30)
  })

  it('projections and the review exercises 31, 35, 42, 46, 49, 66', () => {
    const proj = (u: number[], v: number[]) => u.map((x) => (dot(u, v) / norm2(u)) * x)
    proj([-1, 3], [2, 1]).forEach((x, i) => near(x, [-0.1, 0.3][i]!))
    proj([0.5, -0.25, -0.5], [2, 2, -2]).forEach((x, i) => near(x, [4 / 3, -2 / 3, -4 / 3][i]!))
    const [A, B, C] = [[1, 1, -1], [-3, 2, -2], [2, 2, -4]]
    expect(dot(B.map((x, i) => x - A[i]!), C.map((x, i) => x - A[i]!))).toBe(0)
    const [a, b, c] = [[1, 2, 3], [3, 6, -2], [0, 5, -4]]
    expect(b.map((x, i) => x - a[i]!)).toEqual([2, 4, -5])
    expect(c.map((x, i) => x - [-2, 1, 1][i]!)).toEqual([2, 4, -5]) // D = (−2, 1, 1)
    expect(Math.abs(1 * 1 - 3 * 3) / 2).toBe(4) // area of A(1,−1), B(2,2), C(4,0): ½|1·1 − 3·3|
    for (const k of [-2, 3]) expect(dot([1, -1, 2], [k * k, k, -3])).toBe(0)
    expect(4 * 4 + 12 * 1 + 9 * 3).toBe(55)
  })
})

describe('chapter 13: orthogonality', () => {
  const dot = (u: number[], v: number[]) => u.reduce((sum, x, i) => sum + x * v[i]!, 0)

  it('the orthogonal sets and the orthogonal basis of x − y + 2z = 0', () => {
    const [v1, v2, v3] = [[2, 1, -1], [0, 1, 1], [1, -1, 1]]
    expect([dot(v1, v2), dot(v2, v3), dot(v1, v3)]).toEqual([0, 0, 0])
    const [u, w] = [[1, 1, 0], [-1, 1, 1]]
    for (const p of [u, w, [-2, 0, 1]]) expect(p[0]! - p[1]! + 2 * p[2]!).toBe(0)
    expect(dot(u, w)).toBe(0)
    expect(dot(u, [-2, 0, 1])).toBe(-2)
  })

  it('coordinates in an orthogonal basis: (5⁄14, 13⁄21, 5⁄6), and in the orthonormal basis', () => {
    const basis = [[-3, 1, 2], [2, 4, 1], [1, -1, 2]]
    expect([dot(basis[0]!, basis[1]!), dot(basis[1]!, basis[2]!), dot(basis[0]!, basis[2]!)]).toEqual([0, 0, 0])
    const u = [1, 2, 3]
    const coefficients = basis.map((v) => dot(u, v) / dot(v, v))
    near(coefficients[0]!, 5 / 14)
    near(coefficients[1]!, 13 / 21)
    near(coefficients[2]!, 5 / 6)
    u.forEach((x, i) => near(coefficients.reduce((sum, c, k) => sum + c * basis[k]![i]!, 0), x))

    const orthogonal = [[4, 2, -5], [-1, 2, 0], [2, 1, 2]]
    expect([dot(orthogonal[0]!, orthogonal[1]!), dot(orthogonal[0]!, orthogonal[2]!), dot(orthogonal[1]!, orthogonal[2]!)]).toEqual([0, 0, 0])
    const unit = orthogonal.map((v) => v.map((x) => x / Math.sqrt(dot(v, v))))
    const [a, b, c] = unit.map((v) => dot(v, u))
    near(a!, -7 / (3 * Math.sqrt(5)))
    near(b!, 3 / Math.sqrt(5))
    near(c!, 10 / 3)
    u.forEach((x, i) => near(a! * unit[0]![i]! + b! * unit[1]![i]! + c! * unit[2]![i]!, x))
  })

  it('orthogonal matrices: the permutation-like example is not orthogonal; the three-column example has orthonormal columns', () => {
    const A = M([[1, 1, 0], [0, 0, 1], [1, 0, 0]])
    expect(equals(inverseOf([[1, 1, 0], [0, 0, 1], [1, 0, 0]]), M([[0, 0, 1], [1, 0, -1], [0, 1, 0]]))).toBe(true)
    expect(equals(inverseOf([[1, 1, 0], [0, 0, 1], [1, 0, 0]]), transpose(A))).toBe(false)
    expect(isIdentity(multiply(transpose(M([[0, 1, 0], [0, 0, 1], [1, 0, 0]])), M([[0, 1, 0], [0, 0, 1], [1, 0, 0]])))).toBe(true)
    const c = [[Math.sqrt(3) / 3, Math.SQRT2 / 2, 1 / Math.sqrt(6)], [Math.sqrt(3) / 3, -Math.SQRT2 / 2, 1 / Math.sqrt(6)], [-Math.sqrt(3) / 3, 0, 2 / Math.sqrt(6)]]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) near(c.reduce((sum, row) => sum + row[i]! * row[j]!, 0), i === j ? 1 : 0)
    }
  })

  it('orthogonal complements: x + y + z = 0 has W⊥ = span(1, 1, 1); (−1, 10, 4) and the ℝ⁴ pair are orthogonal to the given vectors', () => {
    for (const w of [[1, 0, -1], [0, 1, -1]]) expect(dot(w, [1, 1, 1])).toBe(0)
    for (const w of [[2, 1, -2], [4, 0, 1]]) expect(dot(w, [-1, 10, 4])).toBe(0)
    const rows = M([[2, 1, -2], [4, 0, 1]])
    expect(analyzeSpaces(rows).nullSpaceBasis[0]!.vector.map(String)).toEqual(['-1/4', '5/2', '1'])
    const four = [[2, -1, 6, 3], [-1, 2, -3, -2], [2, 5, 6, 1]]
    for (const complement of [[-3, 0, 1, 0], [-4, 1, 0, 3]]) for (const w of four) expect(dot(w, complement)).toBe(0)
    expect(analyzeSpaces(M(four)).nullity).toBe(2)
    expect(equals(rref(M(four)), M([[1, 0, 3, '4/3'], [0, 1, 0, '-1/3'], [0, 0, 0, 0]]))).toBe(true)
  })
})

/** 3×3 determinant of floating-point entries (for Wronskians, where the entries are not rational). */
function wronskian3(r: number[][]): number {
  const [[a, b, c], [d, e, f], [g, h, i]] = r as [number[], number[], number[]] as [[number, number, number], [number, number, number], [number, number, number]]
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)
}

/** Exact determinant of rows given as strings, so a parameter such as 9/4 stays exact. */
function determinantOfRows(rows: (string | number)[][]): string {
  return determinant(matrix(rows)).toString()
}
