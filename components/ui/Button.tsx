import Link from 'next/link'
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'quiet'
type Size = 'sm' | 'md'

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: IconName
  children?: ReactNode
}

function classes(variant: Variant, size: Size, iconOnly: boolean, extra?: string) {
  return [styles.button, styles[variant], styles[size], iconOnly ? styles.iconOnly : '', extra ?? '']
    .filter(Boolean)
    .join(' ')
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, !children, className)} {...rest}>
      {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 18} /> : null}
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  className,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes(variant, size, !children, className)} {...rest}>
      {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 18} /> : null}
      {children}
    </Link>
  )
}
