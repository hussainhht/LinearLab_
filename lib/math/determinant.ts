import { type EliminationResult, eliminate } from './elimination'
import { type Matrix, entry, isSquare, shapeOf, MatrixDimensionError, formatShape } from './matrix'
import { Rational } from './rational'
import { determinantFactor } from './rowOps'

function requireSquare(m: Matrix, what: string): void {
  if (!isSquare(m)) {
    throw new MatrixDimensionError(`${what} is only defined for square matrices; this one is ${formatShape(shapeOf(m))}.`)
  }
}

export interface EliminationDeterminant {
  readonly value: Rational
  readonly elimination: EliminationResult
  readonly swaps: number
  /** Diagonal of the upper-triangular result; their product times (−1)^swaps is the determinant. */
  readonly diagonal: readonly Rational[]
  /** First column that has no pivot, which forces the determinant to 0. */
  readonly zeroColumn: number | null
}

/**
 * Determinant by forward elimination: replacements keep the determinant,
 * each swap flips its sign, and a triangular matrix's determinant is the
 * product of its diagonal. Exact, so no tolerance is involved.
 */
export function determinantByElimination(m: Matrix): EliminationDeterminant {
  requireSquare(m, 'The determinant')
  const elimination = eliminate(m, { mode: 'forward' })
  const n = m.length
  const swaps = elimination.steps.filter((s) => s.operation.kind === 'swap').length
  const diagonal = Array.from({ length: n }, (_, i) => entry(elimination.result, i, i))
  const zeroColumn = elimination.columnsWithoutPivot[0] ?? null

  // Forward mode only swaps and replaces, so the determinant changes only by sign.
  const sign = elimination.steps.reduce((acc, s) => acc.mul(determinantFactor(s.operation)), Rational.ONE)
  const product = diagonal.reduce((acc, d) => acc.mul(d), Rational.ONE)
  const value = zeroColumn === null ? product.div(sign) : Rational.ZERO

  return { value, elimination, swaps, diagonal, zeroColumn }
}

export function determinant(m: Matrix): Rational {
  return determinantByElimination(m).value
}

/** Removes row i and column j. */
export function minorMatrix(m: Matrix, i: number, j: number): Matrix {
  return m.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j))
}

export interface CofactorTerm {
  readonly col: number
  readonly entry: Rational
  readonly sign: 1 | -1
  readonly minor: Matrix
  readonly minorDeterminant: Rational
  /** sign · entry · minorDeterminant */
  readonly contribution: Rational
}

export interface CofactorExpansion {
  readonly row: number
  readonly terms: readonly CofactorTerm[]
  readonly value: Rational
}

/** Laplace expansion along one row, with each minor evaluated exactly. */
export function cofactorExpansion(m: Matrix, row = 0): CofactorExpansion {
  requireSquare(m, 'Cofactor expansion')
  if (m.length < 2) throw new MatrixDimensionError('Cofactor expansion needs at least a 2×2 matrix.')
  const terms = m[row]!.map((value, col): CofactorTerm => {
    const sign = (row + col) % 2 === 0 ? 1 : -1
    const minor = minorMatrix(m, row, col)
    const minorDeterminant = determinant(minor)
    const signed = sign === 1 ? value : value.neg()
    return { col, entry: value, sign, minor, minorDeterminant, contribution: signed.mul(minorDeterminant) }
  })
  const value = terms.reduce((acc, t) => acc.add(t.contribution), Rational.ZERO)
  return { row, terms, value }
}

export interface DiagonalProduct {
  readonly factors: readonly [Rational, Rational, Rational]
  readonly product: Rational
}

export interface SarrusResult {
  readonly forward: readonly DiagonalProduct[]
  readonly backward: readonly DiagonalProduct[]
  readonly value: Rational
}

/** Rule of Sarrus (diagonal method). Valid for 3×3 matrices only. */
export function sarrus(m: Matrix): SarrusResult {
  const { rows, cols } = shapeOf(m)
  if (rows !== 3 || cols !== 3) throw new MatrixDimensionError('The diagonal method only works for 3×3 matrices.')
  const at = (r: number, c: number) => entry(m, r, ((c % 3) + 3) % 3)
  const diag = (cells: [number, number][]): DiagonalProduct => {
    const factors = cells.map(([r, c]) => at(r, c)) as [Rational, Rational, Rational]
    return { factors, product: factors[0].mul(factors[1]).mul(factors[2]) }
  }
  const forward = [0, 1, 2].map((s) => diag([[0, s], [1, s + 1], [2, s + 2]]))
  const backward = [2, 3, 4].map((s) => diag([[0, s], [1, s - 1], [2, s - 2]]))
  const total = (list: DiagonalProduct[]) => list.reduce((acc, d) => acc.add(d.product), Rational.ZERO)
  return { forward, backward, value: total(forward).sub(total(backward)) }
}

export interface TwoByTwoDeterminant {
  readonly a: Rational
  readonly b: Rational
  readonly c: Rational
  readonly d: Rational
  readonly ad: Rational
  readonly bc: Rational
  readonly value: Rational
}

export function determinant2x2(m: Matrix): TwoByTwoDeterminant {
  const { rows, cols } = shapeOf(m)
  if (rows !== 2 || cols !== 2) throw new MatrixDimensionError('This formula is for 2×2 matrices.')
  const a = entry(m, 0, 0)
  const b = entry(m, 0, 1)
  const c = entry(m, 1, 0)
  const d = entry(m, 1, 1)
  const ad = a.mul(d)
  const bc = b.mul(c)
  return { a, b, c, d, ad, bc, value: ad.sub(bc) }
}
