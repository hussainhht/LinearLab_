import { determinant } from './determinant'
import { type Matrix, type Vector, build, multiplyVector } from './matrix'
import { Rational } from './rational'

/** Small deterministic PRNG (mulberry32) so generated problems are reproducible in tests. */
export function createRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randomInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

export function randomMatrix(rows: number, cols: number, rng: () => number = Math.random, range = 9): Matrix {
  return build(rows, cols, () => Rational.of(randomInt(rng, -range, range)))
}

/**
 * A square system with integer coefficients and a unique integer solution,
 * built as b = A·x for a random x and an A whose determinant is nonzero.
 */
export function randomSolvableSystem(
  size: number,
  rng: () => number = Math.random,
  range = 6,
): { a: Matrix; b: Vector; solution: Vector } {
  for (let attempt = 0; attempt < 200; attempt++) {
    const a = randomMatrix(size, size, rng, range)
    if (determinant(a).isZero()) continue
    const solution = Array.from({ length: size }, () => Rational.of(randomInt(rng, -5, 5)))
    return { a, b: multiplyVector(a, solution), solution }
  }
  // 200 singular draws in a row is practically impossible; fall back to a known-good system.
  const a = build(size, size, (i, j) => Rational.of(i === j ? 2 : i < j ? 1 : 0))
  const solution = Array.from({ length: size }, (_, i) => Rational.of(i + 1))
  return { a, b: multiplyVector(a, solution), solution }
}
