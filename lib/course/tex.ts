/**
 * A readable plain-text rendering of a TeX formula, for search results and text alternatives, where
 * `3 \times 4` should read "3 × 4" and `\mathbb{R}^3` should read "ℝ^3". It is a convenience for
 * reading and matching, never used to typeset anything: KaTeX does that.
 */
const SYMBOLS: Record<string, string> = {
  times: '×',
  cdot: '·',
  cdots: '⋯',
  ldots: '…',
  dots: '…',
  le: '≤',
  leq: '≤',
  ge: '≥',
  geq: '≥',
  ne: '≠',
  neq: '≠',
  approx: '≈',
  sim: '~',
  pm: '±',
  infty: '∞',
  emptyset: '∅',
  to: '→',
  rightarrow: '→',
  longrightarrow: '→',
  Rightarrow: '⇒',
  implies: '⇒',
  iff: '⇔',
  in: '∈',
  notin: '∉',
  subset: '⊂',
  subseteq: '⊆',
  perp: '⊥',
  forall: '∀',
  sum: 'Σ',
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  Delta: 'Δ',
  epsilon: 'ε',
  theta: 'θ',
  lambda: 'λ',
  mu: 'μ',
  pi: 'π',
  sigma: 'σ',
  phi: 'φ',
  omega: 'ω',
  quad: ' ',
  qquad: ' ',
}

const BLACKBOARD: Record<string, string> = { R: 'ℝ', C: 'ℂ', Q: 'ℚ', Z: 'ℤ', N: 'ℕ' }
const OPEN_BRACE = '\u0001'
const CLOSE_BRACE = '\u0002'

export function plainTex(tex: string): string {
  let text = tex
  // Fractions of simple parts read as a/b; repeat so nested ones unwrap from the inside.
  for (let i = 0; i < 3; i++) text = text.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)')
  return text
    .replace(/\\\{/g, OPEN_BRACE)
    .replace(/\\\}/g, CLOSE_BRACE)
    .replace(/\\mathbb\{([A-Za-z])\}/g, (_, letter: string) => BLACKBOARD[letter] ?? letter)
    .replace(/\\(?:text|textbf|textit|mathbf|mathrm|mathit|operatorname|boldsymbol|vec)\{([^{}]*)\}/g, '$1')
    .replace(/\\(?:left|right|bigl|bigr|Bigl|Bigr|big|Big)(?![A-Za-z])/g, '')
    .replace(/\\([A-Za-z]+)/g, (_, name: string) => SYMBOLS[name] ?? name)
    .replace(/\\[,;:! ]/g, ' ')
    .replace(/[{}]/g, '')
    .replace(new RegExp(OPEN_BRACE, 'g'), '{')
    .replace(new RegExp(CLOSE_BRACE, 'g'), '}')
    .replace(/\s+/g, ' ')
    .trim()
}
