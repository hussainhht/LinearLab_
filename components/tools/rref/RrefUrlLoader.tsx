'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { findSystemExample } from '@/data/examples/systems'
import { LIMITS, decodeSystem, joinAugmented, toCells } from '@/lib/url/problem'
import { useWorkspace } from '../WorkspaceProvider'

/**
 * Loads a problem from ?A=…&b=… or ?example=… once per distinct URL. Edits made
 * afterwards are kept when the learner navigates away and comes back.
 */
export function RrefUrlLoader() {
  const params = useSearchParams()
  const { rref, updateRref } = useWorkspace()
  const signature = params.toString()

  useEffect(() => {
    if (!signature || signature === rref.loadedParams) return
    const example = findSystemExample(params.get('example') ?? '')
    const cells = example
      ? joinAugmented(toCells(example.a), example.b.map(String))
      : decodeSystem(params, Math.max(LIMITS.rref.maxRows, LIMITS.rref.maxCols))
    if (!cells) {
      updateRref({ loadedParams: signature })
      return
    }
    updateRref({
      cells,
      variables: (cells[0]?.length ?? 2) - 1,
      solvedKey: null,
      stepIndex: 0,
      mode: 'edit',
      loadedParams: signature,
      ...(example ? { exampleId: example.id } : {}),
    })
  }, [signature, params, rref.loadedParams, updateRref])

  return null
}
