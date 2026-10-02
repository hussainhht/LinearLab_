'use client'

import { type ReactNode, createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from './Icon'
import styles from './Toaster.module.css'

type ToastTone = 'success' | 'info' | 'danger'

interface Toast {
  id: number
  message: string
  tone: ToastTone
}

interface ToastApi {
  notify: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastApi | null>(null)

/**
 * Brief confirmations ("Copied", "Saved") live in their own polite live
 * region, so they never replace or shift the workspace they describe.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const notify = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = nextId.current++
    setToasts((current) => [...current.slice(-2), { id, message, tone }])
  }, [])

  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((t) => t.id !== id)), [])
  const api = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext value={api}>
      {children}
      <div className={`${styles.region} no-print`} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext>
  )
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), 3500)
    return () => window.clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <div className={`${styles.toast} ${styles[toast.tone]}`}>
      <Icon name={toast.tone === 'danger' ? 'alert' : toast.tone === 'info' ? 'info' : 'check'} size={18} />
      <span>{toast.message}</span>
      <button type="button" className={styles.close} onClick={() => onDismiss(toast.id)} aria-label="Dismiss">
        <Icon name="x" size={14} />
      </button>
    </div>
  )
}

export function useToast(): ToastApi {
  const api = use(ToastContext)
  if (!api) throw new Error('useToast must be used inside ToastProvider')
  return api
}
