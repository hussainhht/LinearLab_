import type { ReactNode } from 'react'
import { Page } from '@/components/layout/Page'
import { ToolNav } from '@/components/tools/ToolNav'

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <Page>
      <ToolNav />
      {children}
    </Page>
  )
}
