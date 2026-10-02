import type { Matrix, Vector } from './matrix'
import type { Rational } from './rational'
import type { RowOperation } from './rowOps'
import type { SystemSolution } from './solve'

export type NumberFormat = 'fraction' | 'decimal'

const SUBSCRIPT_DIGITS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
export const MINUS = '−'

export function subscript(n: number): string {
  return String(n)
    .split('')
    .map((d) => SUBSCRIPT_DIGITS[Number(d)] ?? d)
    .join('')
}

/** Display text for a rational. Uses a true minus sign; `exact` is false for rounded decimals. */
export function formatNumber(r: Rational, format: NumberFormat = 'fraction', digits = 4): { text: string; exact: boolean } {
  if (format === 'fraction' || r.isInteger()) return { text: r.toString().replace('-', MINUS), exact: true }
  const { text, exact } = r.toDecimal(digits)
  return { text: text.replace('-', MINUS), exact }
}

/** Plain ASCII text for copying and exports. */
export function formatAscii(r: Rational): string {
  return r.toString()
}

export function rowLabel(row: number, ascii = false): string {
  return ascii ? `R${row + 1}` : `R${subscript(row + 1)}`
}

export function variableName(index: number, ascii = false): string {
  return ascii ? `x${index + 1}` : `x${subscript(index + 1)}`
}

function coefficient(r: Rational, ascii: boolean): string {
  if (r.isOne()) return ''
  if (r.isInteger()) return r.toString()
  return ascii ? `(${r.toString()})*` : `(${r.toString()})`
}

function signed(r: Rational, ascii: boolean): { sign: string; magnitude: Rational } {
  return r.isNegative() ? { sign: ascii ? '-' : MINUS, magnitude: r.neg() } : { sign: '+', magnitude: r }
}

export function formatRowOperation(op: RowOperation, ascii = false): string {
  const arrow = ascii ? '<-' : '←'
  const R = (row: number) => rowLabel(row, ascii)
  const times = ascii ? '*' : ''
  switch (op.kind) {
    case 'swap':
      return `${R(op.rowA)} ${ascii ? '<->' : '↔'} ${R(op.rowB)}`
    case 'scale': {
      const { sign, magnitude } = signed(op.factor, ascii)
      const lead = sign === '+' ? '' : sign
      const coef = coefficient(magnitude, ascii)
      const joiner = coef && magnitude.isInteger() ? times : ''
      return `${R(op.row)} ${arrow} ${lead}${coef}${joiner}${R(op.row)}`
    }
    case 'replace': {
      const { sign, magnitude } = signed(op.factor, ascii)
      const coef = coefficient(magnitude, ascii)
      const joiner = coef && magnitude.isInteger() ? times : ''
      return `${R(op.target)} ${arrow} ${R(op.target)} ${sign} ${coef}${joiner}${R(op.source)}`
    }
  }
}

function columnWidths(cells: string[][]): number[] {
  const widths: number[] = []
  cells.forEach((row) => row.forEach((c, j) => (widths[j] = Math.max(widths[j] ?? 0, c.length))))
  return widths
}

/** Aligned plain-text matrix. `augmentAt` draws a bar before that column. */
export function matrixToText(m: Matrix, augmentAt?: number): string {
  const cells = m.map((row) => row.map((v) => formatAscii(v)))
  const widths = columnWidths(cells)
  return cells
    .map((row) => {
      const parts = row.map((c, j) => c.padStart(widths[j] ?? 0))
      const body =
        augmentAt !== undefined ? `${parts.slice(0, augmentAt).join('  ')}  |  ${parts.slice(augmentAt).join('  ')}` : parts.join('  ')
      return `[ ${body} ]`
    })
    .join('\n')
}

export function rationalToLatex(r: Rational): string {
  if (r.isInteger()) return r.toString()
  const sign = r.isNegative() ? '-' : ''
  const abs = r.abs()
  return `${sign}\\frac{${abs.num}}{${abs.den}}`
}

export function matrixToLatex(m: Matrix, augmentAt?: number): string {
  const cols = m[0]?.length ?? 0
  const spec =
    augmentAt !== undefined ? `${'c'.repeat(augmentAt)}|${'c'.repeat(cols - augmentAt)}` : 'c'.repeat(cols)
  const body = m.map((row) => row.map(rationalToLatex).join(' & ')).join(' \\\\ ')
  return `\\left[\\begin{array}{${spec}} ${body} \\end{array}\\right]`
}

export function matrixToCsv(m: Matrix): string {
  return m.map((row) => row.map((v) => formatAscii(v)).join(',')).join('\n')
}

export function vectorToText(v: Vector): string {
  return `(${v.map((x) => formatAscii(x)).join(', ')})`
}

export interface LinearTerm {
  readonly coefficient: Rational
  readonly variable: number
}

/** Formats c + Σ aₖ·x_k, skipping zero terms ("4 − 2x₃"). */
export function formatAffine(constant: Rational, terms: readonly LinearTerm[], ascii = false): string {
  const minus = ascii ? '-' : MINUS
  const parts: string[] = []
  if (!constant.isZero()) parts.push(constant.toString().replace('-', minus))
  for (const term of terms) {
    if (term.coefficient.isZero()) continue
    const { sign, magnitude } = signed(term.coefficient, ascii)
    const coef = coefficient(magnitude, ascii)
    const joiner = ascii && coef && magnitude.isInteger() ? '*' : ''
    const text = `${coef}${joiner}${variableName(term.variable, ascii)}`
    if (parts.length === 0) parts.push(sign === '+' ? text : `${minus}${text}`)
    else parts.push(`${sign} ${text}`)
  }
  return parts.length === 0 ? '0' : parts.join(' ')
}

/** One line per variable describing the solution set. */
export function solutionLines(solution: SystemSolution, ascii = false): string[] {
  switch (solution.kind) {
    case 'unique':
      return solution.values.map((v, j) => `${variableName(j, ascii)} = ${ascii ? v.toString() : formatNumber(v).text}`)
    case 'inconsistent':
      return [`No solution: row ${solution.row + 1} reduces to 0 = ${ascii ? solution.value.toString() : formatNumber(solution.value).text}.`]
    case 'infinite':
      return solution.particular.map((p, j) => {
        if (solution.freeVariables.includes(j)) return `${variableName(j, ascii)} is free`
        const terms = solution.directions.map((d) => ({ coefficient: d.vector[j] as Rational, variable: d.variable }))
        return `${variableName(j, ascii)} = ${formatAffine(p, terms, ascii)}`
      })
  }
}
