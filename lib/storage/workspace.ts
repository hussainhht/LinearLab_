import { useSyncExternalStore } from 'react'
import { isStringGrid, readItem, readJson, subscribeItem, writeJson } from './local'

/**
 * Saved tool inputs. Entries are stored as the strings the learner typed,
 * never as BigInt values, so they serialize safely and restore exactly.
 */
export interface SavedSystem {
  readonly version: 1
  readonly savedAt: string
  readonly cells: string[][]
  readonly variables: number
}

export interface SavedMatrices {
  readonly version: 1
  readonly savedAt: string
  readonly a: string[][]
  readonly b: string[][]
  readonly scalar: string
}

const KEYS = { rref: 'workspace:rref:v1', matrices: 'workspace:matrices:v1' } as const

function isSavedSystem(value: unknown): value is SavedSystem {
  const v = value as SavedSystem
  return (
    typeof value === 'object' &&
    value !== null &&
    v.version === 1 &&
    typeof v.savedAt === 'string' &&
    isStringGrid(v.cells) &&
    Number.isInteger(v.variables) &&
    v.cells.every((row) => row.length === v.variables + 1)
  )
}

function isSavedMatrices(value: unknown): value is SavedMatrices {
  const v = value as SavedMatrices
  return (
    typeof value === 'object' &&
    value !== null &&
    v.version === 1 &&
    typeof v.savedAt === 'string' &&
    isStringGrid(v.a) &&
    isStringGrid(v.b) &&
    typeof v.scalar === 'string'
  )
}

export function saveSystem(cells: string[][], variables: number): boolean {
  return writeJson(KEYS.rref, { version: 1, savedAt: new Date().toISOString(), cells, variables } satisfies SavedSystem)
}

export function loadSystem(): SavedSystem | null {
  return readJson(KEYS.rref, isSavedSystem)
}

export function saveMatrices(a: string[][], b: string[][], scalar: string): boolean {
  return writeJson(KEYS.matrices, { version: 1, savedAt: new Date().toISOString(), a, b, scalar } satisfies SavedMatrices)
}

export function loadMatrices(): SavedMatrices | null {
  return readJson(KEYS.matrices, isSavedMatrices)
}

/** Timestamp of the saved workspace for a tool, or null. Null on the server. */
export function useSavedAt(tool: keyof typeof KEYS): string | null {
  const key = KEYS[tool]
  const raw = useSyncExternalStore(
    (cb) => subscribeItem(key, cb),
    () => readItem(key),
    () => null,
  )
  if (!raw) return null
  try {
    const value: unknown = JSON.parse(raw)
    const savedAt = (value as { savedAt?: unknown }).savedAt
    return typeof savedAt === 'string' ? savedAt : null
  } catch {
    return null
  }
}
