import { describe, expect, it } from 'vitest'
import { isReducedRowEchelon, isRowEchelon } from '@/lib/math/echelon'
import { matrix } from '@/lib/math/matrix'
import { formatAffine, formatRowOperation, matrixToLatex, matrixToText } from '@/lib/math/notation'
import { parseMatrixCells, splitPastedMatrix } from '@/lib/math/parse'
import { q } from '@/lib/math/rational'
import { replaceRow, rowOperationIssue, scaleRow, swapRows } from '@/lib/math/rowOps'
import { parseRowOperation } from '@/lib/math/rowOpNotation'

describe('parseMatrixCells', () => {
  it('parses a grid of mixed numeric formats', () => {
    const result = parseMatrixCells([['1', '-2/3'], ['0.5', '1e-6']])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.matrix.map((r) => r.map(String))).toEqual([['1', '-2/3'], ['1/2', '1/1000000']])
  })

  it('reports every invalid or empty cell by position', () => {
    const result = parseMatrixCells([['1', ''], ['x', '2']])
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.map((e) => [e.row, e.col])).toEqual([[0, 1], [1, 0]])
    }
  })
})

describe('splitPastedMatrix', () => {
  it.each([
    ['1\t2\t3\n4\t5\t6', [['1', '2', '3'], ['4', '5', '6']]],
    ['1,2\n3,4', [['1', '2'], ['3', '4']]],
    ['1 2\n3 4\n', [['1', '2'], ['3', '4']]],
    ['[1 2; 3 4]', [['1', '2'], ['3', '4']]],
    ['[[1, -1/2], [3, 4]]', [['1', '-1/2'], ['3', '4']]],
    ['1 2 | 5\n3 4 | 6', [['1', '2', '5'], ['3', '4', '6']]],
  ])('splits %j', (text, cells) => {
    const result = splitPastedMatrix(text)
    expect(result).toEqual({ ok: true, cells })
  })

  it('rejects ragged rows and empty clipboards', () => {
    const ragged = splitPastedMatrix('1 2 3\n4 5')
    expect(ragged.ok).toBe(false)
    if (!ragged.ok) expect(ragged.error).toMatch(/Row 2 has 2 entries but row 1 has 3/)
    expect(splitPastedMatrix('   ').ok).toBe(false)
  })
})

describe('row operation notation', () => {
  it('formats operations in textbook notation', () => {
    expect(formatRowOperation(swapRows(0, 1))).toBe('R₁ ↔ R₂')
    expect(formatRowOperation(scaleRow(0, q('1/2')))).toBe('R₁ ← (1/2)R₁')
    expect(formatRowOperation(scaleRow(2, q(-1)))).toBe('R₃ ← −R₃')
    expect(formatRowOperation(replaceRow(1, 0, q(-3)))).toBe('R₂ ← R₂ − 3R₁')
    expect(formatRowOperation(replaceRow(1, 0, q(1)))).toBe('R₂ ← R₂ + R₁')
    expect(formatRowOperation(replaceRow(1, 0, q('-1/3')), true)).toBe('R2 <- R2 - (1/3)*R1')
  })

  it.each([
    ['R1 <-> R2', swapRows(0, 1)],
    ['r1↔r3', swapRows(0, 2)],
    ['swap R2 and R3', swapRows(1, 2)],
    ['R2 ← R2 − 3R1', replaceRow(1, 0, q(-3))],
    ['R2 = R2 + (-1/2)R1', replaceRow(1, 0, q('-1/2'))],
    ['R2 -> R2 - 3*R1', replaceRow(1, 0, q(-3))],
    ['R3 + 2R1 → R3', replaceRow(2, 0, q(2))],
    ['R1 <- (1/2)R1', scaleRow(0, q('1/2'))],
    ['R1 <- R1/2', scaleRow(0, q('1/2'))],
    ['1/4 R2 -> R2', scaleRow(1, q('1/4'))],
    ['R2 → ¼R2'.replace('¼', '1/4'), scaleRow(1, q('1/4'))],
    ['R3 <- -R3', scaleRow(2, q(-1))],
    ['R2 <- -2R1 + R2', replaceRow(1, 0, q(-2))],
  ])('reads %j', (text, expected) => {
    expect(parseRowOperation(text, 3)).toEqual({ ok: true, value: expected })
  })

  it.each([
    ['', /Write an operation/],
    ['R1 <- 0R1', /overwrite|nonzero|0/],
    ['R2 <- 3R1', /overwrite R2/],
    ['R2 <- 2R2 + R1', /combines scaling and replacement/],
    ['R1 <- R1 + R2 + R3', /at most two rows/],
    ['R1 <-> R1', /itself/],
    ['R1 <-> R5', /between 1 and 3/],
    ['R1 <- R1', /unchanged/],
    ['R2 R1', /arrow/],
    ['R2 <- R2 + xR1', /Could not read/],
  ])('rejects %j', (text, message) => {
    const result = parseRowOperation(text, 3)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toMatch(message)
  })

  it('refuses scaling by zero and replacing a row with itself', () => {
    expect(rowOperationIssue(scaleRow(0, q(0)), 2)).toMatch(/0/)
    expect(rowOperationIssue(replaceRow(1, 1, q(2)), 2)).toMatch(/different row/)
  })
})

describe('exports', () => {
  it('writes aligned text and LaTeX with an augmentation bar', () => {
    const m = matrix([[1, '-1/2', 3], [10, 0, '2/3']])
    expect(matrixToText(m, 2)).toBe('[  1  -1/2  |    3 ]\n[ 10     0  |  2/3 ]')
    expect(matrixToLatex(m, 2)).toBe('\\left[\\begin{array}{cc|c} 1 & -\\frac{1}{2} & 3 \\\\ 10 & 0 & \\frac{2}{3} \\end{array}\\right]')
  })

  it('formats affine expressions without stray signs', () => {
    expect(formatAffine(q(0), [{ coefficient: q(-1), variable: 2 }])).toBe('−x₃')
    expect(formatAffine(q(4), [{ coefficient: q(-2), variable: 2 }, { coefficient: q('1/2'), variable: 3 }])).toBe('4 − 2x₃ + (1/2)x₄')
    expect(formatAffine(q(0), [])).toBe('0')
  })
})

describe('echelon form checks', () => {
  it('distinguishes REF, RREF and neither', () => {
    const rref = matrix([[1, 0, 2], [0, 1, 3], [0, 0, 0]])
    const ref = matrix([[1, 4, 2], [0, 1, 3], [0, 0, 0]])
    const neither = matrix([[0, 1, 0], [1, 0, 0]])
    const zeroRowNotAtBottom = matrix([[1, 2], [0, 0], [0, 1]])
    expect(isReducedRowEchelon(rref)).toBe(true)
    expect(isRowEchelon(ref)).toBe(true)
    expect(isReducedRowEchelon(ref)).toBe(false)
    expect(isRowEchelon(neither)).toBe(false)
    expect(isRowEchelon(zeroRowNotAtBottom)).toBe(false)
    expect(isRowEchelon(matrix([[2, 1], [0, 3]]))).toBe(true)
    expect(isRowEchelon(matrix([[2, 1], [0, 3]]), { requireLeadingOnes: true })).toBe(false)
  })
})
