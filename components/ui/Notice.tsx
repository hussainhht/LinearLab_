import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './Notice.module.css'

export type Tone = 'info' | 'success' | 'warning' | 'danger'

const icons: Record<Tone, IconName> = { info: 'info', success: 'check', warning: 'alert', danger: 'alert' }

interface NoticeProps {
  tone?: Tone
  title?: ReactNode
  children?: ReactNode
  /** Use 'alert' for errors that need immediate attention, 'status' for updates. */
  role?: 'alert' | 'status'
  actions?: ReactNode
  className?: string
}

/** Inline feedback. Tone is conveyed by icon and title text as well as color. */
export function Notice({ tone = 'info', title, children, role, actions, className }: NoticeProps) {
  return (
    <div className={`${styles.notice} ${styles[tone]} ${className ?? ''}`} role={role}>
      <Icon name={icons[tone]} size={20} className={styles.icon} />
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.text}>{children}</div> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  )
}
