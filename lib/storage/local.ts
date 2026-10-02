/**
 * localStorage access that never throws: private browsing, disabled storage,
 * quota errors and server rendering all degrade to "nothing stored".
 */

export const STORAGE_PREFIX = 'linearlab:'

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export function readItem(key: string): string | null {
  try {
    return storage()?.getItem(STORAGE_PREFIX + key) ?? null
  } catch {
    return null
  }
}

export function writeItem(key: string, value: string): boolean {
  try {
    const s = storage()
    if (!s) return false
    s.setItem(STORAGE_PREFIX + key, value)
    notify(key)
    return true
  } catch {
    return false
  }
}

export function removeItem(key: string): void {
  try {
    storage()?.removeItem(STORAGE_PREFIX + key)
    notify(key)
  } catch {
    // Nothing to remove when storage is unavailable.
  }
}

const LOCAL_EVENT = 'linearlab-storage'

function notify(key: string): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(LOCAL_EVENT, { detail: key }))
}

/** Subscribes to changes of one key, from this tab or another one. */
export function subscribeItem(key: string, callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_PREFIX + key) callback()
  }
  const onLocal = (event: Event) => {
    if ((event as CustomEvent<string>).detail === key) callback()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener(LOCAL_EVENT, onLocal)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(LOCAL_EVENT, onLocal)
  }
}

export function readJson<T>(key: string, validate: (value: unknown) => value is T): T | null {
  const raw = readItem(key)
  if (raw === null) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    return validate(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function writeJson(key: string, value: unknown): boolean {
  return writeItem(key, JSON.stringify(value))
}

export function isStringGrid(value: unknown): value is string[][] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((row) => Array.isArray(row) && row.length > 0 && row.every((c) => typeof c === 'string'))
  )
}
