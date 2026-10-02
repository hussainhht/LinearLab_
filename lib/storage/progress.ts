import { useMemo, useSyncExternalStore } from 'react'
import { readItem, removeItem, subscribeItem, writeJson } from './local'

const KEY = 'progress:v1'

interface ProgressData {
  readonly version: 1
  readonly completed: readonly string[]
}

function parse(raw: string | null): ProgressData {
  if (!raw) return { version: 1, completed: [] }
  try {
    const value: unknown = JSON.parse(raw)
    if (
      typeof value === 'object' &&
      value !== null &&
      (value as ProgressData).version === 1 &&
      Array.isArray((value as ProgressData).completed) &&
      (value as ProgressData).completed.every((id) => typeof id === 'string')
    ) {
      return value as ProgressData
    }
  } catch {
    // Corrupt data is treated as no progress.
  }
  return { version: 1, completed: [] }
}

const subscribe = (callback: () => void) => subscribeItem(KEY, callback)
const getSnapshot = () => readItem(KEY)
const getServerSnapshot = () => null

/** Lesson ids the learner has marked complete. Empty during server rendering and hydration. */
export function useCompletedLessons(): ReadonlySet<string> {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return useMemo(() => new Set(parse(raw).completed), [raw])
}

export function setLessonComplete(id: string, complete: boolean): void {
  const current = new Set(parse(readItem(KEY)).completed)
  if (complete) current.add(id)
  else current.delete(id)
  writeJson(KEY, { version: 1, completed: [...current] } satisfies ProgressData)
}

export function resetProgress(): void {
  removeItem(KEY)
}
