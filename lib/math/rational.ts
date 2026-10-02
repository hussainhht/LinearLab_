/**
 * Exact rational numbers backed by BigInt.
 *
 * Every value is stored in lowest terms with a positive denominator, so two
 * equal rationals always have identical fields. Instances are immutable.
 */

function gcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a
  let y = b < 0n ? -b : b
  while (y !== 0n) {
    const t = x % y
    x = y
    y = t
  }
  return x
}

function pow10(exponent: number): bigint {
  return 10n ** BigInt(exponent)
}

export class Rational {
  readonly num: bigint
  readonly den: bigint

  private constructor(num: bigint, den: bigint) {
    this.num = num
    this.den = den
  }

  static readonly ZERO = new Rational(0n, 1n)
  static readonly ONE = new Rational(1n, 1n)
  static readonly MINUS_ONE = new Rational(-1n, 1n)

  /** Builds num/den in lowest terms. Throws if den is zero. */
  static of(num: bigint | number, den: bigint | number = 1n): Rational {
    const n = typeof num === 'bigint' ? num : Rational.integerToBigInt(num)
    const d = typeof den === 'bigint' ? den : Rational.integerToBigInt(den)
    if (d === 0n) throw new RangeError('Denominator cannot be zero')
    if (n === 0n) return Rational.ZERO
    const sign = d < 0n ? -1n : 1n
    const g = gcd(n, d)
    return new Rational((sign * n) / g, (sign * d) / g)
  }

  private static integerToBigInt(value: number): bigint {
    if (!Number.isSafeInteger(value)) {
      throw new RangeError(`Rational.of expects safe integers, received ${value}`)
    }
    return BigInt(value)
  }

  /**
   * Converts a JavaScript number exactly through its shortest decimal
   * representation (so 0.1 becomes 1/10, not the binary approximation).
   */
  static fromNumber(value: number): Rational {
    if (!Number.isFinite(value)) throw new RangeError(`Cannot convert ${value} to a rational`)
    const parsed = parseRational(String(value))
    if (!parsed.ok) throw new RangeError(parsed.error)
    return parsed.value
  }

  isZero(): boolean {
    return this.num === 0n
  }

  isOne(): boolean {
    return this.num === 1n && this.den === 1n
  }

  isInteger(): boolean {
    return this.den === 1n
  }

  isNegative(): boolean {
    return this.num < 0n
  }

  sign(): -1 | 0 | 1 {
    return this.num === 0n ? 0 : this.num < 0n ? -1 : 1
  }

  add(other: Rational): Rational {
    if (this.den === other.den) return Rational.of(this.num + other.num, this.den)
    return Rational.of(this.num * other.den + other.num * this.den, this.den * other.den)
  }

  sub(other: Rational): Rational {
    return this.add(other.neg())
  }

  mul(other: Rational): Rational {
    if (this.isZero() || other.isZero()) return Rational.ZERO
    return Rational.of(this.num * other.num, this.den * other.den)
  }

  div(other: Rational): Rational {
    if (other.isZero()) throw new RangeError('Division by zero')
    return Rational.of(this.num * other.den, this.den * other.num)
  }

  neg(): Rational {
    return this.num === 0n ? this : new Rational(-this.num, this.den)
  }

  abs(): Rational {
    return this.num < 0n ? this.neg() : this
  }

  reciprocal(): Rational {
    if (this.isZero()) throw new RangeError('Zero has no reciprocal')
    return Rational.of(this.den, this.num)
  }

  equals(other: Rational): boolean {
    return this.num === other.num && this.den === other.den
  }

  compare(other: Rational): -1 | 0 | 1 {
    const diff = this.num * other.den - other.num * this.den
    return diff === 0n ? 0 : diff < 0n ? -1 : 1
  }

  /** Floating-point approximation, for plotting only. Never feed it back into exact work. */
  toNumber(): number {
    return Number(this.num) / Number(this.den)
  }

  /** Exact text form: "3", "-13/7". */
  toString(): string {
    return this.den === 1n ? this.num.toString() : `${this.num}/${this.den}`
  }

  /** Safe JSON form (BigInt itself is not JSON-serializable). */
  toJSON(): string {
    return this.toString()
  }

  /**
   * Decimal text rounded half away from zero to at most `maxDigits` places.
   * `exact` is false when rounding discarded information.
   */
  toDecimal(maxDigits = 6): { text: string; exact: boolean } {
    const negative = this.num < 0n
    const absNum = negative ? -this.num : this.num
    const scale = pow10(maxDigits)
    const scaledNumerator = absNum * scale
    let scaled = scaledNumerator / this.den
    const remainder = scaledNumerator % this.den
    const exact = remainder === 0n
    if (remainder * 2n >= this.den) scaled += 1n

    let digits = scaled.toString().padStart(maxDigits + 1, '0')
    let integerPart = digits.slice(0, digits.length - maxDigits)
    let fraction = maxDigits > 0 ? digits.slice(digits.length - maxDigits) : ''
    fraction = fraction.replace(/0+$/, '')
    if (integerPart === '') integerPart = '0'
    digits = fraction ? `${integerPart}.${fraction}` : integerPart
    const isZeroText = /^0(\.0*)?$/.test(digits)
    return { text: negative && !isZeroText ? `-${digits}` : digits, exact }
  }
}

export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string }

const MAX_INPUT_LENGTH = 40
const MAX_EXPONENT = 30

const NUMBER_PATTERN = /^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:e([+-]?\d+))?$/i

function parseDecimal(text: string): Rational | null {
  const match = NUMBER_PATTERN.exec(text)
  if (!match) return null
  const [, sign = '', body = '', exponentText] = match
  const [intPart = '', fracPart = ''] = body.split('.')
  const exponent = exponentText === undefined ? 0 : Number(exponentText)
  if (Math.abs(exponent) > MAX_EXPONENT) return null
  const digits = BigInt(`${intPart || '0'}${fracPart}`)
  const signed = sign === '-' ? -digits : digits
  const shift = exponent - fracPart.length
  return shift >= 0 ? Rational.of(signed * pow10(shift)) : Rational.of(signed, pow10(-shift))
}

/** Normalizes typographic minus signs and stray whitespace from pasted text. */
export function normalizeNumberText(input: string): string {
  return input
    .replace(/[−‒–—﹣－]/g, '-')
    .replace(/⁄/g, '/')
    .replace(/\s+/g, '')
}

/**
 * Parses an integer, decimal, scientific-notation value, or a fraction of
 * those (for example "-3", "0.25", "1e-6", "1/3", "-2.5/4").
 * Empty or malformed input is an error, never silently zero.
 */
export function parseRational(input: string): ParseResult<Rational> {
  const text = normalizeNumberText(input)
  if (text === '') return { ok: false, error: 'Enter a number.' }
  if (text.length > MAX_INPUT_LENGTH) {
    return { ok: false, error: `Use at most ${MAX_INPUT_LENGTH} characters.` }
  }

  const parts = text.split('/')
  if (parts.length > 2) {
    return { ok: false, error: `“${input.trim()}” has more than one “/”. Write a single fraction such as 2/3.` }
  }

  const numerator = parseDecimal(parts[0] ?? '')
  if (numerator === null) return { ok: false, error: describeInvalid(input) }
  if (parts.length === 1) return { ok: true, value: numerator }

  const denominator = parseDecimal(parts[1] ?? '')
  if (denominator === null) return { ok: false, error: describeInvalid(input) }
  if (denominator.isZero()) return { ok: false, error: 'The denominator cannot be 0.' }
  return { ok: true, value: numerator.div(denominator) }
}

function describeInvalid(input: string): string {
  return `“${input.trim()}” is not a number. Use an integer, decimal, or fraction such as -3, 0.25, or 1/3.`
}

/** Convenience for trusted literals in data files and tests. Throws on invalid input. */
export function q(value: string | number): Rational {
  if (typeof value === 'number') return Rational.fromNumber(value)
  const parsed = parseRational(value)
  if (!parsed.ok) throw new RangeError(parsed.error)
  return parsed.value
}
