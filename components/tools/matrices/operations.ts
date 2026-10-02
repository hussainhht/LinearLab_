export type OperationId = 'add' | 'subtract' | 'multiply' | 'scalar' | 'transpose' | 'determinant' | 'inverse' | 'spaces'

export type MatrixName = 'A' | 'B'

export interface OperationInfo {
  readonly id: OperationId
  readonly label: string
  /** Short notation shown on the button, e.g. "A + B". `X` stands for the selected matrix. */
  readonly notation: string
  readonly group: 'combine' | 'transform' | 'analyze'
  /** Binary operations always use A and B in that order. */
  readonly binary: boolean
}

export const OPERATIONS: readonly OperationInfo[] = [
  { id: 'add', label: 'Add', notation: 'A + B', group: 'combine', binary: true },
  { id: 'subtract', label: 'Subtract', notation: 'A − B', group: 'combine', binary: true },
  { id: 'multiply', label: 'Multiply', notation: 'A × B', group: 'combine', binary: true },
  { id: 'scalar', label: 'Scalar multiple', notation: 'kX', group: 'transform', binary: false },
  { id: 'transpose', label: 'Transpose', notation: 'Xᵀ', group: 'transform', binary: false },
  { id: 'determinant', label: 'Determinant', notation: 'det X', group: 'analyze', binary: false },
  { id: 'inverse', label: 'Inverse', notation: 'X⁻¹', group: 'analyze', binary: false },
  { id: 'spaces', label: 'Rank and spaces', notation: 'rank X', group: 'analyze', binary: false },
]

export const GROUP_LABELS = {
  combine: 'Combine A and B',
  transform: 'Transform one matrix',
  analyze: 'Analyze one matrix',
} as const

export function operationInfo(id: OperationId): OperationInfo {
  const info = OPERATIONS.find((o) => o.id === id)
  if (!info) throw new Error(`Unknown operation ${id}`)
  return info
}

export function isOperationId(value: string | null): value is OperationId {
  return OPERATIONS.some((o) => o.id === value)
}
