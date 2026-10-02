import { describe, expect, it } from 'vitest'
import { Rational, parseRational, q } from '@/lib/math/rational'

describe('Rational arithmetic', () => {
  it('stores values in lowest terms with a positive denominator', () => {
    const r = Rational.of(6, -8)
    expect(r.num).toBe(-3n)
    expect(r.den).toBe(4n)
    expect(r.toString()).toBe('-3/4')
  })

  it('adds, subtracts, multiplies and divides exactly', () => {
    expect(q('1/3').add(q('1/6')).toString()).toBe('1/2')
    expect(q('1/3').sub(q('1/2')).toString()).toBe('-1/6')
    expect(q('2/3').mul(q('9/4')).toString()).toBe('3/2')
    expect(q('2/3').div(q('4/9')).toString()).toBe('3/2')
  })

  it('represents decimals exactly instead of as binary floats', () => {
    expect(q('0.1').add(q('0.2')).equals(q('0.3'))).toBe(true)
    expect(Rational.fromNumber(0.1).toString()).toBe('1/10')
  })

  it('rejects division by zero', () => {
    expect(() => q(1).div(Rational.ZERO)).toThrow(RangeError)
    expect(() => Rational.ZERO.reciprocal()).toThrow(RangeError)
  })

  it('compares values', () => {
    expect(q('1/3').compare(q('0.3'))).toBe(1)
    expect(q('-2').compare(q('-1/2'))).toBe(-1)
    expect(q('2/4').compare(q('1/2'))).toBe(0)
  })

  it('formats decimals with rounding and an exactness flag', () => {
    expect(q('1/4').toDecimal(4)).toEqual({ text: '0.25', exact: true })
    expect(q('2/3').toDecimal(4)).toEqual({ text: '0.6667', exact: false })
    expect(q('-1/3').toDecimal(2)).toEqual({ text: '-0.33', exact: false })
    expect(q('-1/1000000').toDecimal(4)).toEqual({ text: '0', exact: false })
    expect(q('13/7').toDecimal(0)).toEqual({ text: '2', exact: false })
  })

  it('serializes to JSON as a string, never a BigInt', () => {
    expect(JSON.stringify({ x: q('-13/7') })).toBe('{"x":"-13/7"}')
  })
})

describe('parseRational', () => {
  it.each([
    ['3', '3'],
    ['-3', '-3'],
    ['+4', '4'],
    ['0.25', '1/4'],
    ['-.5', '-1/2'],
    ['1/3', '1/3'],
    ['-2/6', '-1/3'],
    ['2/-6', '-1/3'],
    ['1.5/2', '3/4'],
    [' 7 ', '7'],
    ['1e-6', '1/1000000'],
    ['2.5E3', '2500'],
    ['−4', '-4'], // typographic minus pasted from a lesson
    ['0.000001', '1/1000000'],
  ])('parses %s as %s', (input, expected) => {
    const parsed = parseRational(input)
    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(parsed.value.toString()).toBe(expected)
  })

  it.each(['', '   ', 'abc', '1/0', '1//2', '2x', '--1', '1/2/3', '1e999', '3.4.5', 'NaN', 'Infinity', '1,5'])(
    'rejects %j with a message instead of returning 0',
    (input) => {
      const parsed = parseRational(input)
      expect(parsed.ok).toBe(false)
      if (!parsed.ok) expect(parsed.error.length).toBeGreaterThan(5)
    },
  )

  it('explains a zero denominator specifically', () => {
    const parsed = parseRational('5/0')
    expect(parsed.ok).toBe(false)
    if (!parsed.ok) expect(parsed.error).toMatch(/denominator/i)
  })
})
