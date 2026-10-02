'use client'

import type { Matrix, Vector } from '@/lib/math/matrix'
import { formatAffine, formatNumber, rowLabel } from '@/lib/math/notation'
import { Rational } from '@/lib/math/rational'
import type { SystemSolution } from '@/lib/math/solve'
import styles from './LinePlot.module.css'

interface LinePlotProps {
  /** Coefficients of a two-variable system, one row per equation. */
  a: Matrix
  b: Vector
  solution: SystemSolution
}

const SIZE = 320
const DASHES = ['none', '8 5', '2 4', '12 4 2 4', '6 3', '1 3']

/**
 * Each equation a·x + b·y = c is a line in the plane. The plot shows where
 * they meet: one point, nowhere (parallel), or everywhere along one line.
 * Plotting uses floating point; the labels use the exact solution.
 */
export function LinePlot({ a, b, solution }: LinePlotProps) {
  const center =
    solution.kind === 'unique'
      ? { x: solution.values[0]!.toNumber(), y: solution.values[1]!.toNumber() }
      : { x: 0, y: 0 }
  const reach = Math.max(6, Math.ceil(Math.max(Math.abs(center.x), Math.abs(center.y)) * 1.6))
  const min = -reach
  const max = reach
  const scale = SIZE / (max - min)
  const sx = (x: number) => (x - min) * scale
  const sy = (y: number) => SIZE - (y - min) * scale
  const tick = reach > 30 ? 10 : reach > 12 ? 5 : 1

  const lines = a.map((row, i) => lineSegment(row[0]!, row[1]!, b[i]!, min, max))
  const ticks: number[] = []
  for (let t = Math.ceil(min / tick) * tick; t <= max; t += tick) ticks.push(t)

  const description =
    solution.kind === 'unique'
      ? `The lines meet at one point, (${formatNumber(solution.values[0]!).text}, ${formatNumber(solution.values[1]!).text}).`
      : solution.kind === 'inconsistent'
        ? 'The lines never meet: at least two are parallel and distinct, so no point lies on every line.'
        : 'Every equation describes the same line (or the whole plane), so every point on it is a solution.'

  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.svg} role="img" aria-label={`Graph of the equations. ${description}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={sx(t)} x2={sx(t)} y1={0} y2={SIZE} className={t === 0 ? styles.axis : styles.grid} />
            <line y1={sy(t)} y2={sy(t)} x1={0} x2={SIZE} className={t === 0 ? styles.axis : styles.grid} />
          </g>
        ))}
        <text x={SIZE - 6} y={sy(0) - 6} className={styles.axisLabel} textAnchor="end">
          x₁
        </text>
        <text x={sx(0) + 6} y={14} className={styles.axisLabel}>
          x₂
        </text>
        {lines.map((segment, i) =>
          segment ? (
            <line
              key={i}
              x1={sx(segment[0])}
              y1={sy(segment[1])}
              x2={sx(segment[2])}
              y2={sy(segment[3])}
              className={styles.line}
              data-line={i % 6}
              strokeDasharray={DASHES[i % DASHES.length]}
            />
          ) : null,
        )}
        {solution.kind === 'unique' ? (
          <circle cx={sx(center.x)} cy={sy(center.y)} r={5.5} className={styles.point} />
        ) : null}
      </svg>
      <figcaption className={styles.caption}>
        <ul className={styles.legend}>
          {a.map((row, i) => (
            <li key={i}>
              <svg width="28" height="10" aria-hidden="true">
                <line x1="0" y1="5" x2="28" y2="5" className={styles.line} data-line={i % 6} strokeDasharray={DASHES[i % DASHES.length]} />
              </svg>
              {rowLabel(i)}:{' '}
              {formatAffine(Rational.ZERO, [
                { coefficient: row[0]!, variable: 0 },
                { coefficient: row[1]!, variable: 1 },
              ])}{' '}
              = {formatNumber(b[i]!).text}
              {lines[i] ? null : ' (not a line)'}
            </li>
          ))}
        </ul>
        <p>{description}</p>
      </figcaption>
    </figure>
  )
}

function lineSegment(p: Rational, q: Rational, c: Rational, min: number, max: number): [number, number, number, number] | null {
  const a = p.toNumber()
  const b = q.toNumber()
  const k = c.toNumber()
  if (b !== 0) return [min, (k - a * min) / b, max, (k - a * max) / b]
  if (a !== 0) return [k / a, min, k / a, max]
  return null
}
