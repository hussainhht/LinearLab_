'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { TranslationKey } from '@/lib/i18n/dictionaries'
import { useI18n } from './LanguageProvider'

const titles: Readonly<Record<string, TranslationKey>> = {
  '/': 'page.home',
  '/learn': 'page.course',
  '/learn/search': 'page.search',
  '/tools': 'page.tools',
  '/tools/rref': 'page.solver',
  '/tools/matrices': 'page.matrices',
  '/tools/determinant': 'page.determinant',
  '/tools/cramer': 'page.cramer',
  '/practice': 'page.practice',
  '/practice/custom': 'page.customPractice',
  '/practice/concepts': 'page.concepts',
}

/** Localize browser titles for interface pages; course/problem titles retain their source metadata. */
export function InterfaceTitle() {
  const pathname = usePathname()
  const { t } = useI18n()
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const key = titles[path]
    if (key) document.title = path === '/' ? t(key) : `${t(key)} · LinearLab`
  }, [pathname, t])
  return null
}
