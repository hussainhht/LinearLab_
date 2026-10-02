'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { gridKey } from '@/lib/grid'
import { LIMITS, decodeCells } from '@/lib/url/problem'
import { useWorkspace } from '../WorkspaceProvider'
import { isOperationId } from './operations'

/** Loads ?A=…&B=…&k=…&op=… once per distinct URL, optionally running the operation. */
export function MatricesUrlLoader() {
  const params = useSearchParams()
  const { matrices, updateMatrices } = useWorkspace()
  const signature = params.toString()

  useEffect(() => {
    if (!signature || signature === matrices.loadedParams) return
    const a = decodeCells(params.get('A'), LIMITS.matrix) ?? matrices.a
    const b = decodeCells(params.get('B'), LIMITS.matrix) ?? matrices.b
    const scalar = params.get('k') ?? matrices.scalar
    const target = params.get('target') === 'B' ? 'B' : 'A'
    const op = params.get('op')
    updateMatrices({
      a,
      b,
      scalar,
      target,
      loadedParams: signature,
      lastRun: isOperationId(op) ? { op, target, key: `${gridKey(a)}|${gridKey(b)}|${scalar}|${target}` } : null,
    })
  }, [signature, params, matrices.loadedParams, matrices.a, matrices.b, matrices.scalar, updateMatrices])

  return null
}
