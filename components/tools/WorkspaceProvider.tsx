'use client'

import { type ReactNode, createContext, use, useMemo, useState } from 'react'
import { makeGrid } from '@/lib/grid'
import type { NumberFormat } from '@/lib/math/notation'
import { findSystemExample } from '@/data/examples/systems'
import { toCells, joinAugmented } from '@/lib/url/problem'
import type { MatrixName, OperationId } from './matrices/operations'

export interface RrefState {
  readonly cells: string[][]
  readonly variables: number
  /** Key of the input that was solved; results are shown only while it matches the current input. */
  readonly solvedKey: string | null
  readonly stepIndex: number
  readonly mode: 'edit' | 'steps'
  readonly format: NumberFormat
  /** Search-param signature already loaded, so Back/Forward does not overwrite later edits. */
  readonly loadedParams: string | null
  readonly exampleId: string
}

export interface MatricesState {
  readonly a: string[][]
  readonly b: string[][]
  readonly scalar: string
  readonly target: MatrixName
  readonly lastRun: { readonly op: OperationId; readonly target: MatrixName; readonly key: string } | null
  readonly format: NumberFormat
  readonly loadedParams: string | null
}

type Updater<T> = (update: Partial<T> | ((current: T) => Partial<T>)) => void

interface WorkspaceApi {
  rref: RrefState
  updateRref: Updater<RrefState>
  matrices: MatricesState
  updateMatrices: Updater<MatricesState>
}

const WorkspaceContext = createContext<WorkspaceApi | null>(null)

function initialRref(): RrefState {
  const example = findSystemExample('three-by-three')!
  return {
    cells: joinAugmented(toCells(example.a), example.b.map(String)),
    variables: example.a[0]!.length,
    solvedKey: null,
    stepIndex: 0,
    mode: 'edit',
    format: 'fraction',
    loadedParams: null,
    exampleId: example.id,
  }
}

function initialMatrices(): MatricesState {
  return {
    a: [['1', '2'], ['3', '4']],
    b: [['5', '6'], ['7', '8']],
    scalar: '2',
    target: 'A',
    lastRun: null,
    format: 'fraction',
    loadedParams: null,
  }
}

function useUpdater<T>(initial: () => T): [T, Updater<T>] {
  const [state, setState] = useState(initial)
  const update: Updater<T> = useMemo(
    () => (u) => setState((current) => ({ ...current, ...(typeof u === 'function' ? u(current) : u) })),
    [],
  )
  return [state, update]
}

/**
 * Tool inputs live above the routes, so moving between the solver, lessons
 * and practice keeps work in progress without any storage round-trip.
 */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [rref, updateRref] = useUpdater(initialRref)
  const [matrices, updateMatrices] = useUpdater(initialMatrices)
  const value = useMemo(() => ({ rref, updateRref, matrices, updateMatrices }), [rref, updateRref, matrices, updateMatrices])
  return <WorkspaceContext value={value}>{children}</WorkspaceContext>
}

export function useWorkspace(): WorkspaceApi {
  const api = use(WorkspaceContext)
  if (!api) throw new Error('useWorkspace must be used inside WorkspaceProvider')
  return api
}

export const EMPTY_SYSTEM = (rows: number, variables: number) => makeGrid(rows, variables + 1)
