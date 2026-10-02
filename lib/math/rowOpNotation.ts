import { type ParseResult, Rational, normalizeNumberText, parseRational } from './rational'
import { type RowOperation, replaceRow, rowOperationIssue, scaleRow, swapRows } from './rowOps'

interface Term {
  readonly row: number
  readonly coefficient: Rational
}

const BARE_ROW = /^R(\d+)$/

function normalize(input: string): string {
  return normalizeNumberText(input)
    .replace(/[rR]/g, 'R')
    .replace(/[·×*]/g, '')
    .replace(/↔|⇄|⟷|<->|<=>/g, '§')
    .replace(/←|⟵|<-|:=|=/g, '«')
    .replace(/→|⟶|->/g, '»')
}

function splitTerms(expression: string): string[] | null {
  const terms: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < expression.length; i++) {
    const ch = expression[i]
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (depth < 0) return null
    const prev = expression[i - 1]
    if ((ch === '+' || ch === '-') && depth === 0 && i > 0 && prev !== '(' && prev !== '/' && prev !== 'e' && prev !== 'E') {
      terms.push(expression.slice(start, i))
      start = i
    }
  }
  if (depth !== 0) return null
  terms.push(expression.slice(start))
  return terms.filter((t) => t !== '' && t !== '+')
}

function parseCoefficient(text: string): Rational | null {
  let body = text
  let negate = false
  if (body.startsWith('+')) body = body.slice(1)
  else if (body.startsWith('-')) {
    negate = true
    body = body.slice(1)
  }
  if (body === '') return negate ? Rational.MINUS_ONE : Rational.ONE
  if (body.startsWith('(') && body.endsWith(')')) body = body.slice(1, -1)
  const parsed = parseRational(body)
  if (!parsed.ok) return null
  return negate ? parsed.value.neg() : parsed.value
}

function parseTerm(text: string): Term | null {
  const match = /^(.*?)R(\d+)(?:\/(.+))?$/.exec(text)
  if (!match) return null
  const [, coefText = '', rowText = '', divisorText] = match
  let coefficient = parseCoefficient(coefText)
  if (!coefficient) return null
  if (divisorText !== undefined) {
    const divisor = parseCoefficient(divisorText)
    if (!divisor || divisor.isZero()) return null
    coefficient = coefficient.div(divisor)
  }
  return { row: Number(rowText) - 1, coefficient }
}

/**
 * Reads a row operation written in common textbook notations, such as
 * "R1 <-> R2", "R2 ← R2 − 3R1", "R2 = R2/2", "1/2 R1 → R1" or
 * "R3 + 2R1 -> R3". Row numbers are 1-based in the text.
 */
export function parseRowOperation(input: string, rows: number): ParseResult<RowOperation> {
  const text = normalize(input)
  if (text === '') return { ok: false, error: 'Write an operation such as R2 ← R2 − 3R1.' }

  const swap = /^R(\d+)§R(\d+)$/.exec(text) ?? /^swapR(\d+)(?:,|and)?R(\d+)$/i.exec(text)
  if (swap) return finish(swapRows(Number(swap[1]) - 1, Number(swap[2]) - 1), rows)

  let target: string
  let expression: string
  if (text.includes('«')) {
    const parts = text.split('«')
    if (parts.length !== 2) return { ok: false, error: 'Use exactly one arrow or equals sign.' }
    ;[target = '', expression = ''] = parts
  } else if (text.includes('»')) {
    const parts = text.split('»')
    if (parts.length !== 2) return { ok: false, error: 'Use exactly one arrow.' }
    const [left = '', right = ''] = parts
    const leftBare = BARE_ROW.test(left)
    const rightBare = BARE_ROW.test(right)
    if (rightBare && !leftBare) [target, expression] = [right, left]
    else if (leftBare && !rightBare) [target, expression] = [left, right]
    else return { ok: false, error: 'Put the row being replaced on one side of the arrow and its new value on the other.' }
  } else {
    return { ok: false, error: 'Include an arrow, for example R2 ← R2 − 3R1, or ↔ to swap rows.' }
  }

  const targetMatch = BARE_ROW.exec(target)
  if (!targetMatch) return { ok: false, error: 'The row being replaced must be a single row, such as R2.' }
  const targetRow = Number(targetMatch[1]) - 1

  const pieces = splitTerms(expression)
  const parsedTerms = pieces?.map(parseTerm)
  if (!pieces || pieces.length === 0 || !parsedTerms || parsedTerms.some((t) => t === null)) {
    return { ok: false, error: 'Could not read the right-hand side. Write terms like 3R1, (1/2)R2 or R2/4.' }
  }

  const combined = new Map<number, Rational>()
  for (const term of parsedTerms as Term[]) {
    combined.set(term.row, (combined.get(term.row) ?? Rational.ZERO).add(term.coefficient))
  }
  const terms = [...combined.entries()].filter(([, c]) => !c.isZero())
  const targetCoefficient = combined.get(targetRow)

  if (terms.length > 2) return { ok: false, error: 'Use one elementary operation at a time: involve at most two rows.' }
  if (!targetCoefficient || targetCoefficient.isZero()) {
    return {
      ok: false,
      error: `That would overwrite R${targetRow + 1} without keeping it, which can lose an equation. Keep R${targetRow + 1} on the right-hand side.`,
    }
  }
  if (terms.length === 1) {
    if (targetCoefficient.isOne()) return { ok: false, error: `R${targetRow + 1} ← R${targetRow + 1} leaves the matrix unchanged.` }
    return finish(scaleRow(targetRow, targetCoefficient), rows)
  }
  const [sourceRow, factor] = terms.find(([row]) => row !== targetRow) as [number, Rational]
  if (!targetCoefficient.isOne()) {
    return {
      ok: false,
      error: 'That combines scaling and replacement in one step. Scale the row first, then add the multiple as a second operation.',
    }
  }
  return finish(replaceRow(targetRow, sourceRow, factor), rows)
}

function finish(op: RowOperation, rows: number): ParseResult<RowOperation> {
  const issue = rowOperationIssue(op, rows)
  return issue ? { ok: false, error: issue } : { ok: true, value: op }
}
