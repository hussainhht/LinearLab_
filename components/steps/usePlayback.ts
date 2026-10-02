'use client'

import { useEffect, useState } from 'react'

export const SPEEDS = [
  { value: 'slow', label: 'Slow', ms: 2600 },
  { value: 'normal', label: 'Normal', ms: 1500 },
  { value: 'fast', label: 'Fast', ms: 700 },
] as const

export type Speed = (typeof SPEEDS)[number]['value']

export interface Playback {
  index: number
  /** Last valid index (the number of steps). */
  last: number
  playing: boolean
  speed: Speed
  goTo: (index: number) => void
  next: () => void
  previous: () => void
  first: () => void
  end: () => void
  toggle: () => void
  pause: () => void
  setSpeed: (speed: Speed) => void
}

interface PlaybackOptions {
  last: number
  /** Changing this (a new problem or a reset) stops playback and returns to step 0. */
  resetKey: string
  /** Optional controlled index, e.g. kept in a provider so it survives navigation. */
  index?: number
  onIndexChange?: (index: number) => void
}

/**
 * Index-based stepping with optional autoplay. The only timer lives in an
 * effect keyed on the current index and resetKey, so pausing, resetting,
 * loading another problem, navigating away or unmounting cancels it, and a
 * stale timer can never advance a newer problem.
 */
export function usePlayback({ last, resetKey, index: controlled, onIndexChange }: PlaybackOptions): Playback {
  const [local, setLocal] = useState({ key: resetKey, index: 0 })
  const [play, setPlay] = useState({ key: resetKey, playing: false })
  const [speed, setSpeed] = useState<Speed>('normal')

  const localIndex = local.key === resetKey ? local.index : 0
  const rawIndex = controlled ?? localIndex
  const index = Math.max(0, Math.min(rawIndex, last))
  const playing = play.key === resetKey && play.playing && index < last

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, last))
    setLocal({ key: resetKey, index: clamped })
    onIndexChange?.(clamped)
  }

  useEffect(() => {
    if (!playing) return
    const ms = SPEEDS.find((s) => s.value === speed)?.ms ?? 1500
    const timer = window.setTimeout(() => {
      const nextIndex = Math.min(index + 1, last)
      setLocal({ key: resetKey, index: nextIndex })
      onIndexChange?.(nextIndex)
    }, ms)
    return () => window.clearTimeout(timer)
  }, [playing, index, speed, last, resetKey, onIndexChange])

  const stop = () => setPlay({ key: resetKey, playing: false })

  return {
    index,
    last,
    playing,
    speed,
    goTo: (i) => {
      stop()
      goTo(i)
    },
    next: () => {
      stop()
      goTo(index + 1)
    },
    previous: () => {
      stop()
      goTo(index - 1)
    },
    first: () => {
      stop()
      goTo(0)
    },
    end: () => {
      stop()
      goTo(last)
    },
    toggle: () => {
      if (playing) return stop()
      if (index >= last) goTo(0)
      setPlay({ key: resetKey, playing: true })
    },
    pause: stop,
    setSpeed,
  }
}
