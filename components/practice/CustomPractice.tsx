'use client'

import Link from 'next/link'
import { useI18n } from '@/components/i18n/LanguageProvider'
import { useSearchParams } from 'next/navigation'
import { Notice } from '@/components/ui/Notice'
import { parseMatrixCells } from '@/lib/math/parse'
import { decodeSystem } from '@/lib/url/problem'
import { PracticeSession } from './PracticeSession'

/** Practice on a system passed in the URL, for example from the system solver. */
export function CustomPractice() {
  const { t } = useI18n()
  const params = useSearchParams()
  const cells = decodeSystem(params)
  const parsed = cells ? parseMatrixCells(cells) : null
  if (!cells || !parsed || !parsed.ok) {
    return (
      <Notice tone="info" title={t('practice.noSystem')}>
        {t('practice.noSystemIntro')} <Link href="/tools/rref/">{t('practice.openSolver')}</Link>{t('practice.noSystemSteps')}{' '}
        <Link href="/practice/">{t('practice.problems')}</Link>.
      </Notice>
    )
  }
  return <PracticeSession key={params.toString()} start={parsed.matrix} variables={(cells[0]?.length ?? 2) - 1} />
}
