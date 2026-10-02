import { Rational, q } from './rational'

/** A rectangular, immutable grid of exact rationals. Rows are the outer array. */
export type Matrix = readonly (readonly Rational[])[]
export type Vector = readonly Rational[]

export interface Position {
  readonly row: number
  readonly col: number
}

export interface Shape {
  readonly rows: number
  readonly cols: number
}

/** Thrown when an operation receives matrices whose sizes make it undefined. */
export class MatrixDimensionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MatrixDimensionError'
  }
}

export function shapeOf(m: Matrix): Shape {
  return { rows: m.length, cols: m[0]?.length ?? 0 }
}

export function plural(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

export function formatShape(shape: Shape): string {
  return `${shape.rows}×${shape.cols}`
}

export function isRectangular(m: Matrix): boolean {
  const cols = m[0]?.length ?? 0
  return m.length > 0 && cols > 0 && m.every((row) => row.length === cols)
}

export function isSquare(m: Matrix): boolean {
  const { rows, cols } = shapeOf(m)
  return rows === cols
}

export function assertRectangular(m: Matrix, name = 'Matrix'): void {
  if (!isRectangular(m)) throw new MatrixDimensionError(`${name} must be a non-empty rectangular grid.`)
}

/** Reads entry (row, col); throws on out-of-range access instead of returning undefined. */
export function entry(m: Matrix, row: number, col: number): Rational {
  const value = m[row]?.[col]
  if (value === undefined) throw new RangeError(`Entry (${row + 1}, ${col + 1}) is outside the matrix`)
  return value
}

export function rowOf(m: Matrix, row: number): Vector {
  const value = m[row]
  if (value === undefined) throw new RangeError(`Row ${row + 1} is outside the matrix`)
  return value
}

export function columnOf(m: Matrix, col: number): Vector {
  return m.map((row, i) => {
    const value = row[col]
    if (value === undefined) throw new RangeError(`Entry (${i + 1}, ${col + 1}) is outside the matrix`)
    return value
  })
}

export function build(rows: number, cols: number, fill: (row: number, col: number) => Rational): Matrix {
  return Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => fill(i, j)))
}

export function zeroMatrix(rows: number, cols: number): Matrix {
  return build(rows, cols, () => Rational.ZERO)
}

export function identity(n: number): Matrix {
  return build(n, n, (i, j) => (i === j ? Rational.ONE : Rational.ZERO))
}

/** Builds a matrix from trusted literals such as [[1, '1/2'], [0, -3]]. */
export function matrix(values: readonly (readonly (string | number)[])[]): Matrix {
  const m = values.map((row) => row.map((v) => q(v)))
  assertRectangular(m)
  return m
}

export function vector(values: readonly (string | number)[]): Vector {
  return values.map((v) => q(v))
}

export function equals(a: Matrix, b: Matrix): boolean {
  if (a.length !== b.length) return false
  return a.every((row, i) => {
    const other = b[i]
    return other !== undefined && row.length === other.length && row.every((v, j) => v.equals(other[j] as Rational))
  })
}

export function vectorsEqual(a: Vector, b: Vector): boolean {
  return a.length === b.length && a.every((v, i) => v.equals(b[i] as Rational))
}

export function isIdentity(m: Matrix): boolean {
  return isSquare(m) && m.every((row, i) => row.every((v, j) => (i === j ? v.isOne() : v.isZero())))
}

export function isZeroMatrix(m: Matrix): boolean {
  return m.every((row) => row.every((v) => v.isZero()))
}

export function isZeroVector(v: Vector): boolean {
  return v.every((x) => x.isZero())
}

export function transpose(m: Matrix): Matrix {
  const { rows, cols } = shapeOf(m)
  return build(cols, rows, (i, j) => entry(m, j, i))
}

function requireSameShape(a: Matrix, b: Matrix, operation: string): void {
  const sa = shapeOf(a)
  const sb = shapeOf(b)
  if (sa.rows !== sb.rows || sa.cols !== sb.cols) {
    throw new MatrixDimensionError(
      `${operation} needs matrices of the same size, but A is ${formatShape(sa)} and B is ${formatShape(sb)}.`,
    )
  }
}

export function add(a: Matrix, b: Matrix): Matrix {
  requireSameShape(a, b, 'Addition')
  return a.map((row, i) => row.map((v, j) => v.add(entry(b, i, j))))
}

export function subtract(a: Matrix, b: Matrix): Matrix {
  requireSameShape(a, b, 'Subtraction')
  return a.map((row, i) => row.map((v, j) => v.sub(entry(b, i, j))))
}

export function scale(m: Matrix, k: Rational): Matrix {
  return m.map((row) => row.map((v) => v.mul(k)))
}

/** Explains why A×B is undefined, or returns null when it is defined. */
export function multiplicationIssue(a: Matrix, b: Matrix): string | null {
  const sa = shapeOf(a)
  const sb = shapeOf(b)
  if (sa.cols === sb.rows) return null
  return `A×B needs columns of A to equal rows of B, but A is ${formatShape(sa)} (${plural(sa.cols, 'column')}) and B is ${formatShape(sb)} (${plural(sb.rows, 'row')}).`
}

export interface ProductTerm {
  /** Shared index k in a_ik · b_kj. */
  readonly k: number
  readonly a: Rational
  readonly b: Rational
  readonly product: Rational
}

/** The individual products a_ik·b_kj that sum to entry (i, j) of A×B. */
export function productTerms(a: Matrix, b: Matrix, i: number, j: number): ProductTerm[] {
  const issue = multiplicationIssue(a, b)
  if (issue) throw new MatrixDimensionError(issue)
  return rowOf(a, i).map((aik, k) => {
    const bkj = entry(b, k, j)
    return { k, a: aik, b: bkj, product: aik.mul(bkj) }
  })
}

export function sum(values: readonly Rational[]): Rational {
  return values.reduce((acc, v) => acc.add(v), Rational.ZERO)
}

export function multiply(a: Matrix, b: Matrix): Matrix {
  const issue = multiplicationIssue(a, b)
  if (issue) throw new MatrixDimensionError(issue)
  const { rows } = shapeOf(a)
  const { cols } = shapeOf(b)
  return build(rows, cols, (i, j) => sum(productTerms(a, b, i, j).map((t) => t.product)))
}

export function multiplyVector(a: Matrix, v: Vector): Vector {
  const column = v.map((x) => [x])
  return multiply(a, column).map((row) => row[0] as Rational)
}

/** Places B to the right of A: [A | B]. */
export function augment(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length) {
    throw new MatrixDimensionError(`Cannot augment: A has ${a.length} rows but B has ${b.length}.`)
  }
  return a.map((row, i) => [...row, ...rowOf(b, i)])
}

export function columnVector(v: Vector): Matrix {
  return v.map((x) => [x])
}

/** Splits [L | R] after column `at`. */
export function splitColumns(m: Matrix, at: number): { left: Matrix; right: Matrix } {
  return {
    left: m.map((row) => row.slice(0, at)),
    right: m.map((row) => row.slice(at)),
  }
}

export function selectColumns(m: Matrix, columns: readonly number[]): Matrix {
  return m.map((row) => columns.map((c) => row[c] as Rational))
}
