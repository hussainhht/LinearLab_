import { parseRational } from '@/lib/math/rational'
import { MINUS, variableName } from '@/lib/math/notation'
import styles from './rref.module.css'

/** Shows the augmented matrix as equations so learners see both forms side by side. */
export function EquationPreview({ cells, variables }: { cells: readonly (readonly string[])[]; variables: number }) {
  return (
    <ol className={styles.equations} aria-label="The system as equations">
      {cells.map((row, i) => (
        <li key={i} className="num">
          {equationText(row, variables) ?? <span className={styles.equationPending}>Row {i + 1} has an entry that is not a number yet</span>}
        </li>
      ))}
    </ol>
  )
}

function equationText(row: readonly string[], variables: number): string | null {
  const parsed = row.map((c) => parseRational(c))
  if (parsed.some((p) => !p.ok)) return null
  const values = parsed.map((p) => (p.ok ? p.value : null))
  const parts: string[] = []
  for (let j = 0; j < variables; j++) {
    const v = values[j]
    if (!v || v.isZero()) continue
    const abs = v.abs()
    const coef = abs.isOne() ? '' : abs.isInteger() ? abs.toString() : `(${abs.toString()})`
    const term = `${coef}${variableName(j)}`
    if (parts.length === 0) parts.push(v.isNegative() ? `${MINUS}${term}` : term)
    else parts.push(v.isNegative() ? `${MINUS} ${term}` : `+ ${term}`)
  }
  const rhs = values[variables]
  return `${parts.length ? parts.join(' ') : '0'} = ${rhs ? rhs.toString().replace('-', MINUS) : '?'}`
}
