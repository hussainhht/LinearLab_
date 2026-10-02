/**
 * Compact, human-readable URL encoding for matrices: rows separated by ";",
 * entries by ",". Entries are kept as typed so "1/3" round-trips exactly.
 */

export type Cells = string[][]

export const LIMITS = {
  rref: { minRows: 1, maxRows: 6, minCols: 1, maxCols: 6 },
  matrix: { minRows: 1, maxRows: 6, minCols: 1, maxCols: 6 },
} as const

function clean(entry: string): string {
  return entry.trim().replace(/[,;]/g, '')
}

export function encodeCells(cells: readonly (readonly string[])[]): string {
  return cells.map((row) => row.map(clean).join(',')).join(';')
}

export function decodeCells(
  value: string | null | undefined,
  limits: { maxRows: number; maxCols: number } = LIMITS.matrix,
): Cells | null {
  if (!value) return null
  const rows = value.split(';').map((row) => row.split(',').map((c) => c.trim()))
  const width = rows[0]?.length ?? 0
  if (rows.length === 0 || width === 0) return null
  if (rows.length > limits.maxRows || width > limits.maxCols) return null
  if (rows.some((row) => row.length !== width)) return null
  if (rows.some((row) => row.some((c) => c.length > 40))) return null
  return rows
}

/** Splits [A | b] cells into the coefficient part and constants. */
export function splitAugmented(cells: Cells): { a: Cells; b: string[] } {
  return {
    a: cells.map((row) => row.slice(0, -1)),
    b: cells.map((row) => row[row.length - 1] ?? ''),
  }
}

export function joinAugmented(a: readonly (readonly string[])[], b: readonly string[]): Cells {
  return a.map((row, i) => [...row, b[i] ?? ''])
}

export function toCells(values: readonly (readonly (string | number)[])[]): Cells {
  return values.map((row) => row.map((v) => String(v)))
}

/** URL for loading a linear system into a tool, e.g. /tools/rref/?A=1,2;3,-1&b=5,4 */
export function systemHref(
  path: '/tools/rref/' | '/tools/cramer/' | '/practice/custom/',
  a: readonly (readonly (string | number)[])[],
  b: readonly (string | number)[],
): string {
  const params = new URLSearchParams({ A: encodeCells(toCells(a)), b: b.map((v) => clean(String(v))).join(',') })
  return `${path}?${params.toString()}`
}

export function matrixHref(
  path: '/tools/matrices/' | '/tools/determinant/',
  matrices: { A?: readonly (readonly (string | number)[])[]; B?: readonly (readonly (string | number)[])[] },
  extra: Record<string, string> = {},
): string {
  const params = new URLSearchParams(extra)
  if (matrices.A) params.set('A', encodeCells(toCells(matrices.A)))
  if (matrices.B) params.set('B', encodeCells(toCells(matrices.B)))
  return `${path}?${params.toString()}`
}

/** Reads A and b from search params into augmented cells, or null when absent/invalid. */
export function decodeSystem(params: { get(name: string): string | null }, maxSize = 6): Cells | null {
  const a = decodeCells(params.get('A'), { maxRows: maxSize, maxCols: maxSize })
  const bRaw = params.get('b')
  if (!a || bRaw === null) return null
  const b = bRaw.split(',').map((c) => c.trim())
  if (b.length !== a.length) return null
  return joinAugmented(a, b)
}
