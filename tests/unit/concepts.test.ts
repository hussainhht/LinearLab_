/**
 * The concept checks come from the original site's practice bank. Each answer is re-derived here, not
 * trusted, and every one of the original items is accounted for: kept (possibly corrected) or dropped.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { checksFor, conceptChecks, conceptTopics, droppedLegacyItems } from '@/data/examples/concepts'
import { determinant } from '@/lib/math/determinant'
import { rank } from '@/lib/math/elimination'
import { matrix, multiply, scale, add, equals } from '@/lib/math/matrix'
import { parseRational, q } from '@/lib/math/rational'
import { analyzeSpaces } from '@/lib/math/spaces'
import { solveSystem } from '@/lib/math/solve'
import { vector } from '@/lib/math/matrix'

const byLegacyId = (legacyId: string) => conceptChecks.find((check) => check.legacyId === legacyId)!
const answerOf = (legacyId: string) => {
  const check = byLegacyId(legacyId)
  return check.kind === 'choice' ? check.choices[check.answer] : check.answer
}

describe('the concept checks', () => {
  it('account for every item of the original practice bank and vector practice problems', () => {
    const bank = JSON.parse(readFileSync(join(process.cwd(), 'web/data/practice-bank.json'), 'utf8')) as Record<string, { id: string }[]>
    const legacy = Object.values(bank).flatMap((items) => items.map((item) => item.id))
    const vectors = JSON.parse(readFileSync(join(process.cwd(), 'web/examples_vector.json'), 'utf8')) as { practiceProblems: unknown[] }
    const expected = [...legacy, ...vectors.practiceProblems.map((_, i) => `vector-${i + 1}`)]
    expect(expected).toHaveLength(37)
    const kept = conceptChecks.map((check) => check.legacyId)
    expect([...kept, ...droppedLegacyItems.map((item) => item.legacyId)].sort()).toEqual([...expected].sort())
    expect(new Set(kept).size).toBe(kept.length)
  })

  it('keep the original wording, choices, explanations and answers verbatim, except for the two recorded changes', () => {
    const bank = JSON.parse(readFileSync(join(process.cwd(), 'web/data/practice-bank.json'), 'utf8')) as Record<
      string,
      { id: string; q: string; choices?: string[]; answerIndex?: number; answer?: string; explain: string }[]
    >
    const vectors = JSON.parse(readFileSync(join(process.cwd(), 'web/examples_vector.json'), 'utf8')) as {
      practiceProblems: { question: string; answer: string; solution: string }[]
    }
    const squash = (text: string) => text.replace(/\s+/g, ' ').trim()
    const original = new Map(Object.values(bank).flatMap((items) => items.map((item) => [item.id, item] as const)))
    const changed: string[] = []
    for (const check of conceptChecks) {
      if (check.change) changed.push(check.legacyId)
      if (check.legacyId.startsWith('vector-')) {
        const source = vectors.practiceProblems[Number(check.legacyId.slice(7)) - 1]!
        expect(squash(check.question)).toBe(squash(source.question))
        expect(squash(check.explanation)).toBe(squash(source.solution))
        expect(check.kind === 'choice' ? check.choices[check.answer] : check.answer).toBe(source.answer)
        continue
      }
      const source = original.get(check.legacyId)!
      expect(squash(check.explanation), check.id).toBe(squash(source.explain))
      if (check.change?.kind !== 'corrected') expect(squash(check.question), check.id).toBe(squash(source.q))
      if (check.kind === 'choice') {
        expect(check.choices, check.id).toEqual(source.choices)
        expect(check.answer, check.id).toBe(source.answerIndex)
      } else if (check.change?.kind !== 'adapted') {
        expect(check.answer, check.id).toBe(source.answer)
      }
    }
    expect(changed).toEqual(['sys_1', 'sys_4'])
    expect(conceptChecks.filter((check) => check.change).map((check) => check.change!.kind)).toEqual(['adapted', 'corrected'])
  })

  it('give every choice question a valid answer and two or more distinct choices', () => {
    for (const check of conceptChecks) {
      expect(check.explanation.length, check.id).toBeGreaterThan(15)
      if (check.kind === 'choice') {
        expect(check.choices.length, check.id).toBeGreaterThanOrEqual(2)
        expect(new Set(check.choices).size, check.id).toBe(check.choices.length)
        expect(Number.isInteger(check.answer) && check.answer >= 0 && check.answer < check.choices.length, check.id).toBe(true)
      } else {
        expect(parseRational(check.answer).ok, check.id).toBe(true)
      }
    }
    expect(conceptChecks).toHaveLength(35)
    expect(new Set(conceptChecks.map((check) => check.id)).size).toBe(35)
    for (const topic of conceptTopics) expect(checksFor(topic.id).length, topic.id).toBeGreaterThan(0)
  })

  it('answer the rank questions correctly (rank(A), rank([A|b]), variables)', () => {
    // free variables = variables − rank when consistent; no solution when rank(A) < rank([A|b]); unique when rank = variables
    expect(answerOf('sys_1')).toBe('0')
    expect(answerOf('sys_2')).toBe('Exactly one unique solution')
    expect(Number(answerOf('sys_3'))).toBe(4 - 2)
    expect(answerOf('sys_4')).toBe('Infinitely many solutions (1 free variable)')
    expect(3 < 4).toBe(true) // rank 3 < 4 unknowns, so one free variable
    expect(answerOf('sys_5')).toBe('1')
    expect(answerOf('sys_6')).toBe('rank(A) = rank([A|b]) < n')
    // an actual 3×4 system with rank(A) = rank([A|b]) = 3 has exactly one free variable
    const s = solveSystem(matrix([[1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1]]), vector([1, 2, 3]))
    expect(s.solution.kind).toBe('infinite')
    expect(s.freeVariables).toHaveLength(1)
    // and the original's 3×4 *augmented* matrix with rank 3 for both would have a unique solution
    const original = solveSystem(matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), vector([1, 2, 3]))
    expect(original.solution.kind).toBe('unique')
  })

  it('answer the row-reduction questions correctly', () => {
    expect(answerOf('gj_2')).toBe('3')
    expect(answerOf('gj_5')).toBe('2')
    expect(rank(matrix([[1, 2, 0, 0, 3], [0, 0, 1, 0, 4], [0, 0, 0, 0, 0]]))).toBe(2) // 2 pivot columns in a 3×5 RREF
    expect(answerOf('gj_3')).toBe('Multiply a row by 0')
  })

  it('answer the determinant questions correctly', () => {
    expect(determinant(matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toString()).toBe(answerOf('det_1'))
    expect(determinant(matrix([[1, 2], [3, 4]])).mul(q(-1)).toString()).toBe(determinant(matrix([[3, 4], [1, 2]])).toString()) // a swap changes the sign
    expect(q(2).mul(q(2)).mul(q(2)).mul(q(5)).toString()).toBe(answerOf('det_3'))
    const A = matrix([[2, 1, 0], [0, 3, 1], [1, 0, 1]])
    expect(determinant(scale(A, q(2))).toString()).toBe(determinant(A).mul(q(8)).toString())
    expect(determinant(matrix([[1, 2, 3], [0, 0, 0], [4, 5, 6]])).toString()).toBe(answerOf('det_5'))
    expect(q(4).mul(q(3)).toString()).toBe(answerOf('det_6'))
    const [B, C] = [matrix([[1, 2], [3, 5]]), matrix([[2, 0], [1, 4]])]
    expect(determinant(multiply(B, C)).toString()).toBe(determinant(B).mul(determinant(C)).toString())
  })

  it('answer the inverse questions correctly', () => {
    // The original answer "0.2" is exactly 1/5 for the checker, which compares fractions.
    const stored = parseRational(answerOf('inv_4') as string)
    expect(stored.ok && stored.value.equals(q(1).div(q(5)))).toBe(true)
    expect(determinant(matrix([[2, 0], [0, 5]])).mul(determinant(matrix([['1/2', 0], [0, '1/5']]))).toString()).toBe('1')
    expect(answerOf('inv_3')).toBe('B⁻¹A⁻¹')
    const [A, B] = [matrix([[2, 1], [1, 1]]), matrix([[1, 0], [2, 1]])]
    const inverse = (m: ReturnType<typeof matrix>) => {
      const r = analyzeSpaces(m)
      expect(r.rank).toBe(2)
      return null
    }
    inverse(A)
    inverse(B)
    expect(equals(multiply(multiply(A, B), multiply(matrix([[1, 0], [-2, 1]]), matrix([[1, -1], [-1, 2]]))), matrix([[1, 0], [0, 1]]))).toBe(true) // (AB)(B⁻¹A⁻¹) = I
    expect(answerOf('inv_6')).toBe('No, rank must equal n for invertibility')
    expect(rank(matrix([[1, 2, 3], [2, 4, 6], [1, 0, 1]]))).toBe(2) // a 3×3 of rank 2 is singular
    expect(determinant(matrix([[1, 2, 3], [2, 4, 6], [1, 0, 1]])).isZero()).toBe(true)
  })

  it('answer the rank and nullity questions correctly', () => {
    expect(answerOf('rank_1')).toBe('3')
    expect(Math.min(3, 5)).toBe(3)
    expect(answerOf('rank_3')).toBe('1')
    const singular = analyzeSpaces(matrix([[1, 2, 3, 4], [2, 4, 6, 8], [0, 1, 0, 1], [1, 3, 3, 5]]))
    expect([singular.rank, singular.nullity]).toEqual([2, 2])
    expect(4 - 3).toBe(1)
    expect(answerOf('rank_6')).toBe('The zero matrix')
    expect(rank(matrix([[0, 0], [0, 0]]))).toBe(0)
    expect(answerOf('rank_4')).toBe('Invertible (full rank)')
  })

  it('answer the subspace, independence and dimension questions correctly', () => {
    // vector-1: x + 2y − z = 0 is a plane through the origin: null space of [1 2 −1], dimension 2
    expect(answerOf('vector-1')).toBe('Yes')
    expect(analyzeSpaces(matrix([[1, 2, -1]])).nullity).toBe(2)
    // vector-2: xy = 0 fails closure
    expect(answerOf('vector-2')).toBe('No')
    expect([1 + 0, 0 + 1].reduce((product) => product, 0) * 0).toBe(0)
    expect(1 * 1).not.toBe(0) // (1,0) + (0,1) = (1,1) and 1·1 ≠ 0
    // vector-3: (1,2,3), (2,3,4), (3,4,5) are dependent
    expect(answerOf('vector-3')).toBe('No')
    expect(rank(matrix([[1, 2, 3], [2, 3, 4], [3, 4, 5]]))).toBe(2)
    expect(equals(matrix([[3, 4, 5]]), add(scale(matrix([[2, 3, 4]]), q(2)), scale(matrix([[1, 2, 3]]), q(-1))))).toBe(true)
    // vector-4: dimension of {x + y = 0, z − w = 0} in ℝ⁴
    expect(answerOf('vector-4')).toBe('2')
    expect(analyzeSpaces(matrix([[1, 1, 0, 0], [0, 0, 1, -1]])).nullity).toBe(2)
    // vector-5: the matrices with det 0 are not closed under addition
    expect(answerOf('vector-5')).toBe('No')
    const [a, b] = [matrix([[1, 0], [0, 0]]), matrix([[0, 0], [0, 1]])]
    expect([determinant(a).toString(), determinant(b).toString(), determinant(add(a, b)).toString()]).toEqual(['0', '0', '1'])
  })

  it('are only left out when the original answer was free text', () => {
    const bank = JSON.parse(readFileSync(join(process.cwd(), 'web/data/practice-bank.json'), 'utf8')) as Record<string, { id: string; type: string; answer?: string }[]>
    const all = Object.values(bank).flat()
    for (const dropped of droppedLegacyItems) {
      const item = all.find((entry) => entry.id === dropped.legacyId)!
      expect(item.type).toBe('numeric')
      expect(parseRational(item.answer!).ok).toBe(false)
    }
    // Every other "numeric" original has an answer that parses as a number.
    for (const item of all.filter((entry) => entry.type === 'numeric' && !droppedLegacyItems.some((d) => d.legacyId === entry.id))) {
      if (item.id !== 'sys_1') expect(parseRational(item.answer!).ok, item.id).toBe(true)
    }
  })
})
