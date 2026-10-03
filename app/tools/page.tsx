import type { Metadata } from 'next'
import { T } from '@/components/i18n/LanguageProvider'
import { ToolCatalog } from '@/components/tools/ToolCatalog'
import styles from './tools.module.css'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Interactive linear algebra tools that show their work with exact fractions.',
}

export default function ToolsPage() {
  return (
    <>
      <div className={styles.intro}>
        <h1 className={styles.title}><T k="tools.title" /></h1>
        <p className={styles.lede}>
          <T k="tools.intro" />
        </p>
      </div>
      <ToolCatalog />
    </>
  )
}
