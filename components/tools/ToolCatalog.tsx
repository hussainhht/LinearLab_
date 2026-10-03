'use client'

import Link from 'next/link'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { ButtonLink } from '@/components/ui/Button'
import { TOOLS } from './catalog'
import styles from '@/app/tools/tools.module.css'

export function ToolCatalog() {
  const { t } = useI18n()
  return (
    <ul className={styles.toolList}>
      {TOOLS.map((tool) => (
        <li key={tool.href} className={styles.toolItem}>
          <h2 className={styles.toolName}><Link href={tool.href}>{t(tool.nameKey)}</Link></h2>
          <p className={styles.toolDescription}>{t(tool.descriptionKey)}</p>
          <ButtonLink href={tool.href} size="sm" aria-label={t('tools.openNamed', { name: t(tool.nameKey) })}>
            {t('tools.open')}
          </ButtonLink>
        </li>
      ))}
    </ul>
  )
}
