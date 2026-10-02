/** Helpers for editing grids of typed (string) matrix entries. */

export type Grid = string[][]

export function makeGrid(rows: number, cols: number, fill = '0'): Grid {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill))
}

/** Resizes while keeping every existing entry that still fits. New entries start at "0". */
export function resizeGrid(cells: readonly (readonly string[])[], rows: number, cols: number, fill = '0'): Grid {
  return Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => cells[i]?.[j] ?? fill))
}

export function setCell(cells: readonly (readonly string[])[], row: number, col: number, value: string): Grid {
  return cells.map((r, i) => (i === row ? r.map((v, j) => (j === col ? value : v)) : [...r]))
}

/**
 * Writes a pasted block into the grid. Pasting at the top-left corner adopts
 * the block's size (within limits); elsewhere the block is clipped to fit.
 */
export function pasteGrid(
  cells: readonly (readonly string[])[],
  block: readonly (readonly string[])[],
  at: { row: number; col: number },
  limits: { maxRows: number; maxCols: number },
): { cells: Grid; clipped: boolean } {
  const blockRows = block.length
  const blockCols = block[0]?.length ?? 0
  let target: Grid = cells.map((r) => [...r])
  if (at.row === 0 && at.col === 0) {
    target = resizeGrid(cells, Math.min(blockRows, limits.maxRows), Math.min(blockCols, limits.maxCols))
  }
  let clipped = false
  block.forEach((row, i) =>
    row.forEach((value, j) => {
      const r = at.row + i
      const c = at.col + j
      if (target[r] && c < (target[r]?.length ?? 0)) target[r]![c] = value
      else clipped = true
    }),
  )
  return { cells: target, clipped }
}

export function gridKey(cells: readonly (readonly string[])[]): string {
  return cells.map((r) => r.map((v) => v.trim()).join(',')).join(';')
}
