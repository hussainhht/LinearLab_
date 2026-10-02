/**
 * Independent checks for every number the lessons state. If a lesson is
 * edited, the claim it makes should be re-verified here: the earlier course
 * shipped several wrong worked examples, and this file is the guard.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { chapters, lessons } from '@/content/lessons/catalog'
import { matrixExamples } from '@/data/examples/matrices'
import { systemExamples } from '@/data/examples/systems'
import { cramer } from '@/lib/math/cramer'
import { cofactorExpansion, determinant, sarrus } from '@/lib/math/determinant'
import { isReducedRowEchelon, isRowEchelon } from '@/lib/math/echelon'
import { gaussJordan } from '@/lib/math/elimination'
import { invert } from '@/lib/math/inverse'
import {
  type Matrix,
  add,
  augment,
  equals,
  identity,
  isIdentity,
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
import { applyRowOperation, replaceRow, scaleRow, swapRows } from '@/lib/math/rowOps'
import { solveSystem } from '@/lib/math/solve'
import { analyzeSpaces } from '@/lib/math/spaces'
import { isOperationId } from '@/components/tools/matrices/operations'

const LESSON_DIR = join(process.cwd(), 'content/lessons')
const read = (slug: string) => readFileSync(join(LESSON_DIR, `${slug}.mdx`), 'utf8')
const solves = (a: Matrix, x: (string | number)[], b: (string | number)[]) => vectorsEqual(multiplyVector(a, vector(x)), vector(b))
const inv = (m: Matrix) => {
  const r = invert(m)
  if (!r.invertible) throw new Error('expected an invertible matrix')
  return r.inverse
}

describe('course structure', () => {
  it('has unique ids and slugs, and one MDX file per lesson with no strays', () => {
    const ids = lessons.map((l) => l.id)
    const slugs = lessons.map((l) => l.slug)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(slugs).size).toBe(slugs.length)
    const files = readdirSync(LESSON_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
    expect(files.sort()).toEqual([...slugs].sort())
  })

  it('numbers lessons from the outline order', () => {
    expect(lessons[0]!.number).toBe('1.1')
    expect(lessons.filter((l) => l.chapterId === chapters[1].id).map((l) => l.number)).toEqual(['2.1', '2.2', '2.3', '2.4'])
    lessons.forEach((l, i) => expect(l.index).toBe(i))
  })

  it('only references examples and operations that exist', () => {
    const systemIds = new Set<string>(systemExamples.map((e) => e.id))
    const matrixIds = new Set<string>(matrixExamples.map((e) => e.id))
    for (const { slug } of lessons) {
      const source = read(slug)
      for (const [, id] of source.matchAll(/example="([^"]+)"/g)) expect(systemIds.has(id!), `${slug}: ${id}`).toBe(true)
      for (const [, id] of source.matchAll(/\s[ab]="([^"]+)"/g)) expect(matrixIds.has(id!), `${slug}: ${id}`).toBe(true)
      for (const [, op] of source.matchAll(/op="([^"]+)"/g)) expect(isOperationId(op!), `${slug}: ${op}`).toBe(true)
    }
  })

  it('gives every QuickCheck an answer index inside its choices', () => {
    for (const { slug } of lessons) {
      for (const [block] of read(slug).matchAll(/<QuickCheck[\s\S]*?\/>/g)) {
        const choices = /choices=\{\[([\s\S]*?)\]\}/.exec(block!)![1]!.match(/"[^"]*"/g)!.length
        const answer = Number(/answer=\{(\d+)\}/.exec(block!)![1])
        expect(answer, slug).toBeLessThan(choices)
      }
    }
  })

  it('has a practice opportunity in every lesson', () => {
    for (const { slug } of lessons) expect(read(slug), slug).toMatch(/<(QuickCheck|NumericCheck)/)
  })
})

describe('chapter 1: systems', () => {
  it('solution-sets: the three example systems behave as stated', () => {
    expect(solves(matrix([[1, 1], [1, -1]]), [2, 1], [3, 1])).toBe(true)
    expect(solveSystem(matrix([[1, 1], [2, 2]]), vector([3, 6])).solution.kind).toBe('infinite')
    expect(solveSystem(matrix([[1, 1], [1, 1]]), vector([3, 5])).solution.kind).toBe('inconsistent')
    expect(solveSystem(matrix([[1, 2], [2, 4]]), vector([4, 9])).solution.kind).toBe('inconsistent')
  })

  it('homogeneous-systems: (7, 6, 1) is a solution and the square example has only the trivial one', () => {
    expect(solves(matrix([[2, -3, 4], [1, -1, -1]]), [7, 6, 1], [0, 0])).toBe(true)
    const square = matrix([[1, 1, -1], [1, -2, 0], [1, 0, -1]])
    expect(determinant(square).toString()).toBe('1')
    expect(solveSystem(square, vector([0, 0, 0])).solution.kind).toBe('unique')
  })

  it('augmented-matrices: the first example has the stated solution', () => {
    expect(solves(matrix([[2, -3, 4], [1, -1, 0], [0, -2, 1]]), ['-1/7', '-15/7', '-9/7'], [1, 2, 3])).toBe(true)
  })
})

describe('chapter 2: row reduction', () => {
  it('row-operations: each example produces the matrix shown', () => {
    expect(equals(applyRowOperation(matrix([[1, 0, 2], [0, 0, 0], [0, 3, 1]]), swapRows(1, 2)), matrix([[1, 0, 2], [0, 3, 1], [0, 0, 0]]))).toBe(true)
    expect(
      equals(applyRowOperation(matrix([[1, 2, 0, 1], [0, 4, 0, 1], [0, 0, 0, 0]]), scaleRow(1, q('1/4'))), matrix([[1, 2, 0, 1], [0, 1, 0, '1/4'], [0, 0, 0, 0]])),
    ).toBe(true)
    expect(
      equals(applyRowOperation(matrix([[1, 2, 0, 1], [3, 6, 1, 7], [0, 0, 0, 0]]), replaceRow(1, 0, q(-3))), matrix([[1, 2, 0, 1], [0, 0, 1, 4], [0, 0, 0, 0]])),
    ).toBe(true)
  })

  it('echelon-forms: the classification table is right', () => {
    const cases: [Matrix, 'rref' | 'ref' | 'neither'][] = [
      [matrix([[2, 1, 4], [0, -3, 5], [0, 0, 0]]), 'ref'],
      [matrix([[1, 0, 7], [0, 1, -2], [0, 0, 0]]), 'rref'],
      [matrix([[1, 1, 0, 0], [0, 1, 0, 1], [0, 0, 0, 0]]), 'ref'],
      [matrix([[0, 0, 1, 0, 2], [0, 0, 0, 1, 0], [0, 0, 0, 0, 0]]), 'rref'],
      [matrix([[1, 0, 1], [0, 1, 0], [0, 0, 0]]), 'rref'],
      [matrix([[1, 0, 1], [0, 2, 0], [0, 0, 0]]), 'ref'],
      [matrix([[0, 1, 0, 1], [1, 0, 0, 0], [0, 0, 0, 0]]), 'neither'],
      [matrix([[1, 2], [0, 0], [0, 1]]), 'neither'],
      [matrix([[1, 3, 0, 2], [0, 0, 1, 5], [0, 0, 0, 0]]), 'rref'],
    ]
    for (const [m, kind] of cases) {
      const actual = isReducedRowEchelon(m) ? 'rref' : isRowEchelon(m) ? 'ref' : 'neither'
      expect(actual).toBe(kind)
    }
  })

  it('gauss-jordan-elimination: x + 2y = 5, 3x − y = 4 follows the three steps shown', () => {
    const steps = gaussJordan(matrix([[1, 2, 5], [3, -1, 4]]), { pivotColumnLimit: 2 }).steps
    expect(steps.map((s) => s.after.map((r) => r.map(String)))).toEqual([
      [['1', '2', '5'], ['0', '-7', '-11']],
      [['1', '2', '5'], ['0', '1', '11/7']],
      [['1', '0', '13/7'], ['0', '1', '11/7']],
    ])
    const big = solveSystem(matrix([[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]), vector([8, -11, -3]))
    expect(big.elimination.steps).toHaveLength(9)
    expect(solves(matrix([[2, 3], [1, -1]]), [1, 2], [8, -1])).toBe(true)
  })

  it('general-solutions: RREF, particular solution, direction and the inconsistent row', () => {
    const a = matrix([[1, 2, 3], [2, 4, 6], [1, 1, 1]])
    const reduced = solveSystem(a, vector([6, 12, 3])).elimination.result
    expect(equals(reduced, matrix([[1, 0, -1, 0], [0, 1, 2, 3], [0, 0, 0, 0]]))).toBe(true)
    expect(solves(a, [0, 3, 0], [6, 12, 3])).toBe(true)
    expect(solves(a, [1, -2, 1], [0, 0, 0])).toBe(true)
    expect(solves(a, [1, 1, 1], [6, 12, 3])).toBe(true)
    const none = solveSystem(a, vector([4, 9, 2])).elimination.result
    expect(none[2]!.map(String)).toEqual(['0', '0', '0', '1'])
  })
})

describe('chapter 3: matrix algebra', () => {
  const A = matrix([[1, 2], [3, 4]])
  const B = matrix([[5, 6], [7, 8]])

  it('addition-and-scalar-multiplication', () => {
    expect(equals(add(A, B), matrix([[6, 8], [10, 12]]))).toBe(true)
    expect(equals(subtract(A, B), matrix([[-4, -4], [-4, -4]]))).toBe(true)
    expect(equals(scale(A, q(3)), matrix([[3, 6], [9, 12]]))).toBe(true)
    expect(equals(subtract(scale(A, q(2)), scale(B, q(3))), matrix([[-13, -14], [-15, -16]]))).toBe(true)
  })

  it('matrix-multiplication', () => {
    expect(equals(multiply(A, B), matrix([[19, 22], [43, 50]]))).toBe(true)
    expect(equals(multiply(matrix([[2, 0, 1], [3, 1, 2]]), matrix([[1, 3], [0, 2], [4, -1]])), matrix([[6, 5], [11, 9]]))).toBe(true)
    expect(equals(multiply(matrix([[1, 2, 3], [4, 5, 6]]), matrix([[1, 0], [2, 1], [3, 2]])), matrix([[14, 8], [32, 17]]))).toBe(true)
    expect(multiply(matrix([[1, -1], [2, 0]]), matrix([[3, 4], [5, 6]]))[1]![0]!.toString()).toBe('6')
  })

  it('multiplication-properties', () => {
    expect(equals(multiply(B, A), matrix([[23, 34], [31, 46]]))).toBe(true)
    const Z = multiply(matrix([[1, -1], [1, -1]]), matrix([[1, 1], [1, 1]]))
    expect(Z.flat().every((v) => v.isZero())).toBe(true)
    const D = matrix([[2, 0], [0, 3]])
    expect(equals(multiply(D, A), matrix([[2, 4], [9, 12]]))).toBe(true)
    expect(equals(multiply(A, D), matrix([[2, 6], [6, 12]]))).toBe(true)
  })

  it('transpose-and-special-matrices: (AB)ᵀ = BᵀAᵀ but not AᵀBᵀ', () => {
    const abT = transpose(multiply(A, B))
    expect(equals(abT, matrix([[19, 43], [22, 50]]))).toBe(true)
    expect(equals(multiply(transpose(B), transpose(A)), abT)).toBe(true)
    expect(equals(multiply(transpose(A), transpose(B)), matrix([[23, 31], [34, 46]]))).toBe(true)
  })

  it('rank-and-null-space: RREF, bases and the check', () => {
    const M = matrix([[1, 2, 0, 3], [2, 4, 1, 4], [3, 6, 1, 7]])
    const s = analyzeSpaces(M)
    expect(equals(s.elimination.result, matrix([[1, 2, 0, 3], [0, 0, 1, -2], [0, 0, 0, 0]]))).toBe(true)
    expect(s.nullSpaceBasis.map((v) => v.vector.map(String))).toEqual([['-2', '1', '0', '0'], ['-3', '0', '2', '1']])
    expect(s.columnSpaceBasis.map((c) => c.column)).toEqual([0, 2])
  })
})

describe('chapter 4: inverses', () => {
  it('matrix-inverse: the verified pair and the quick check', () => {
    expect(isIdentity(multiply(matrix([[3, 4], [2, 3]]), matrix([[3, -4], [-2, 3]])))).toBe(true)
    expect(isIdentity(multiply(matrix([[3, -4], [-2, 3]]), matrix([[3, 4], [2, 3]])))).toBe(true)
    expect(isIdentity(multiply(matrix([[2, 1], [1, 1]]), matrix([[1, -1], [-1, 2]])))).toBe(true)
    expect(invert(matrix([[1, 2], [2, 4]])).invertible).toBe(false)
  })

  it('inverse-2x2', () => {
    expect(equals(inv(matrix([[4, 7], [2, 6]])), matrix([['3/5', '-7/10'], ['-1/5', '2/5']]))).toBe(true)
    expect(equals(inv(matrix([[1, 2], [3, 4]])), matrix([[-2, 1], ['3/2', '-1/2']]))).toBe(true)
    expect(determinant(matrix([[6, 4], [3, 2]])).isZero()).toBe(true)
    expect(equals(inv(matrix([[2, 1], [5, 3]])), matrix([[3, -1], [-5, 2]]))).toBe(true)
  })

  it('inverse-by-row-reduction: the 2×2 steps, the 3×3 inverse in five steps, and the singular case', () => {
    const steps = gaussJordan(augment(matrix([[1, 2], [3, 4]]), identity(2)), { pivotColumnLimit: 2 }).steps
    expect(steps.map((s) => s.after.map((r) => r.map(String)))).toEqual([
      [['1', '2', '1', '0'], ['0', '-2', '-3', '1']],
      [['1', '2', '1', '0'], ['0', '1', '3/2', '-1/2']],
      [['1', '0', '-2', '1'], ['0', '1', '3/2', '-1/2']],
    ])
    const three = invert(matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]))
    expect(three.invertible).toBe(true)
    if (three.invertible) {
      expect(equals(three.inverse, matrix([[-24, 18, 5], [20, -15, -4], [-5, 4, 1]]))).toBe(true)
      expect(three.elimination.steps).toHaveLength(5)
    }
    const singular = applyRowOperation(augment(matrix([[1, 2], [2, 4]]), identity(2)), replaceRow(1, 0, q(-2)))
    expect(singular[1]!.map(String)).toEqual(['0', '0', '-2', '1'])
  })

  it('inverse-properties: both (3A)⁻¹ examples and the product rule', () => {
    const A1 = scale(inv(matrix([[2, -1], [1, 1]])), q('1/3'))
    expect(equals(A1, matrix([['1/9', '1/9'], ['-1/9', '2/9']]))).toBe(true)
    expect(isIdentity(multiply(scale(A1, q(3)), matrix([[2, -1], [1, 1]])))).toBe(true)
    const A2 = scale(inv(matrix([[-1, 5], [1, -2]])), q('1/3'))
    expect(equals(A2, matrix([['2/9', '5/9'], ['1/9', '1/9']]))).toBe(true)
    const Ainv = matrix([[2, 1], [1, 1]])
    const Binv = matrix([[1, 0], [2, 1]])
    const AB = multiply(inv(Ainv), inv(Binv))
    expect(equals(inv(AB), multiply(Binv, Ainv))).toBe(true)
    expect(equals(multiply(Binv, Ainv), matrix([[2, 1], [5, 3]]))).toBe(true)
    expect(equals(multiply(Ainv, Binv), matrix([[4, 1], [3, 1]]))).toBe(true)
  })

  it('invertibility-and-systems: X = A⁻¹B and the a = 2b condition', () => {
    const A = matrix([[1, 2, 3], [2, 5, 3], [1, 0, 8]])
    expect(equals(inv(A), matrix([[-40, 16, 9], [13, -5, -3], [5, -2, -1]]))).toBe(true)
    expect(vectorsEqual(multiplyVector(inv(A), vector([5, 3, 17])), vector([1, -1, 2]))).toBe(true)
    const S = matrix([[6, -4], [3, -2]])
    expect(determinant(S).isZero()).toBe(true)
    expect(solveSystem(S, vector([4, 2])).solution.kind).toBe('infinite')
    expect(solveSystem(S, vector([4, 1])).solution.kind).toBe('inconsistent')
  })
})

describe('chapter 5: determinants', () => {
  const D = matrix([[1, 2, 3], [0, 4, 5], [1, 0, 6]])

  it('determinants: formula, minors, both expansions, Sarrus and the exercise', () => {
    expect(determinant(matrix([[2, 3], [4, 5]])).toString()).toBe('-2')
    expect(cofactorExpansion(D, 0).terms.map((t) => t.minorDeterminant.toString())).toEqual(['24', '-5', '-4'])
    expect(cofactorExpansion(transpose(D), 0).value.toString()).toBe('22') // expansion down column 1
    const s = sarrus(D)
    expect(s.forward.map((d) => d.product.toString())).toEqual(['24', '10', '0'])
    expect(s.backward.map((d) => d.product.toString())).toEqual(['12', '0', '0'])
    expect(determinant(matrix([[2, -1, 0], [1, 3, 2], [0, 1, 4]])).toString()).toBe('24')
  })

  it('determinant-properties: the elimination shown, the tiny matrix, and the quick checks', () => {
    const step1 = applyRowOperation(D, replaceRow(2, 0, q(-1)))
    expect(equals(step1, matrix([[1, 2, 3], [0, 4, 5], [0, -2, 3]]))).toBe(true)
    const step2 = applyRowOperation(step1, replaceRow(2, 1, q('1/2')))
    expect(step2[2]!.map(String)).toEqual(['0', '0', '11/2'])
    expect(determinant(matrix([['0.000001', 0], [0, '0.000001']])).toString()).toBe('1/1000000000000')
    expect(determinant(scale(D, q(2))).equals(determinant(D).mul(q(8)))).toBe(true)
    const B = matrix([[2, 0, 1], [1, 3, 0], [0, 1, 2]])
    const changed = applyRowOperation(applyRowOperation(B, swapRows(0, 1)), scaleRow(2, q(3)))
    expect(determinant(changed).equals(determinant(B).mul(q(-3)))).toBe(true)
  })

  it('cramers-rule: both examples, the singular system and the exercise', () => {
    const two = cramer(matrix([[2, 3], [4, -1]]), vector([8, 2]))
    expect(two.applicable && two.determinant.toString()).toBe('-14')
    expect(two.applicable && two.solution.map(String)).toEqual(['1', '2'])
    const three = cramer(matrix([[1, 2, 1], [2, -1, 2], [3, 1, -1]]), vector([9, 6, 2]))
    expect(three.applicable && three.columns.map((c) => c.determinant.toString())).toEqual(['19', '48', '65'])
    const singular = matrix([[6, -4], [3, -2]])
    expect(cramer(singular, vector([2, 1])).applicable).toBe(false)
    expect(solveSystem(singular, vector([2, 1])).solution.kind).toBe('infinite')
    const easy = cramer(matrix([[1, 1], [1, -1]]), vector([3, 1]))
    expect(easy.applicable && easy.solution.map(String)).toEqual(['2', '1'])
  })
})
