import type { Matrix } from './matrix'
import { type Rational, parseRational } from './rational'

export interface CellError {
  readonly row: number
  readonly col: number
  readonly message: string
}

export type MatrixParseResult =
  | { readonly ok: true; readonly matrix: Matrix }
  | { readonly ok: false; readonly errors: readonly CellError[] }

/** Parses a grid of typed entries. Every invalid or empty cell is reported; nothing defaults to 0. */
export function parseMatrixCells(cells: readonly (readonly string[])[]): MatrixParseResult {
  const errors: CellError[] = []
  const matrix: Rational[][] = []
  cells.forEach((row, i) => {
    const parsedRow: Rational[] = []
    row.forEach((text, j) => {
      const parsed = parseRational(text)
      if (parsed.ok) parsedRow.push(parsed.value)
      else errors.push({ row: i, col: j, message: parsed.error })
    })
    matrix.push(parsedRow)
  })
  return errors.length > 0 ? { ok: false, errors } : { ok: true, matrix }
}

export type PasteResult =
  | { readonly ok: true; readonly cells: string[][] }
  | { readonly ok: false; readonly error: string }

/**
 * Splits pasted text into a rectangular grid of entry strings. Accepts
 * spreadsheet copies (tabs), CSV, space-separated rows, MATLAB-style
 * "[1 2; 3 4]" and nested brackets "[[1,2],[3,4]]". Entries are not
 * validated here; the editor shows per-cell errors afterward.
 */
export function splitPastedMatrix(text: string): PasteResult {
  let body = text.trim()
  if (body === '') return { ok: false, error: 'The clipboard is empty.' }

  // Nested brackets: [[1,2],[3,4]]
  if (/^\[\s*\[/.test(body)) {
    body = body
      .replace(/^\[\s*/, '')
      .replace(/\s*\]$/, '')
      .replace(/\]\s*,?\s*\[/g, '\n')
      .replace(/[[\]]/g, '')
  } else {
    body = body.replace(/^\[|\]$/g, '').replace(/\|/g, ' ')
  }

  const rows = body
    .split(/\s*[;\n\r]+\s*/)
    .map((line) => line.trim())
    .filter((line) => line !== '')

  const cells = rows.map((line) => {
    // Tabs or commas separate entries when present; otherwise whitespace does.
    if (line.includes('\t')) return line.split('\t').map((c) => c.trim())
    if (line.includes(',')) return line.split(',').map((c) => c.trim())
    return line.split(/\s+/)
  })

  if (cells.length === 0) return { ok: false, error: 'No rows were found in the pasted text.' }
  const width = cells[0]!.length
  const ragged = cells.findIndex((row) => row.length !== width)
  if (ragged !== -1) {
    return {
      ok: false,
      error: `Row ${ragged + 1} has ${cells[ragged]!.length} entries but row 1 has ${width}. Every row needs the same number of entries.`,
    }
  }
  return { ok: true, cells }
}
