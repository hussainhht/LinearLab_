import type { Matrix, Vector } from './matrix'

/** Column of the first nonzero entry, or null for a zero row. */
export function leadingColumn(row: Vector, limit = row.length): number | null {
  for (let j = 0; j < limit; j++) if (!row[j]!.isZero()) return j
  return null
}

export interface EchelonOptions {
  /**
   * Textbooks differ: some require each leading entry to be 1 in row echelon
   * form (Anton), others do not (Lay, Strang). Defaults to not requiring it.
   */
  readonly requireLeadingOnes?: boolean
  /** Only consider the first n columns, e.g. the coefficient part of [A | b]. */
  readonly columnLimit?: number
}

export function isRowEchelon(m: Matrix, options: EchelonOptions = {}): boolean {
  let previous = -1
  let seenZeroRow = false
  for (const row of m) {
    const limit = options.columnLimit ?? row.length
    const lead = leadingColumn(row, limit)
    if (lead === null) {
      seenZeroRow = true
      continue
    }
    if (seenZeroRow) return false
    if (lead <= previous) return false
    if (options.requireLeadingOnes && !row[lead]!.isOne()) return false
    previous = lead
  }
  return true
}

export function isReducedRowEchelon(m: Matrix, options: Omit<EchelonOptions, 'requireLeadingOnes'> = {}): boolean {
  if (!isRowEchelon(m, { ...options, requireLeadingOnes: true })) return false
  return m.every((row) => {
    const lead = leadingColumn(row, options.columnLimit ?? row.length)
    return lead === null || m.every((other) => other === row || other[lead]!.isZero())
  })
}
