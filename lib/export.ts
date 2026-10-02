import { explainStep } from './math/explain'
import { type Matrix, type Vector, multiplyVector, splitColumns, vectorsEqual } from './math/matrix'
import { matrixToLatex, matrixToText, rationalToLatex, solutionLines, variableName } from './math/notation'
import type { SystemAnalysis } from './math/solve'

/** Plain-text report of a solved system: input, every step, and the answer. */
export function systemReportText(analysis: SystemAnalysis): string {
  const n = analysis.variables
  const lines: string[] = ['LinearLab: Gauss–Jordan solution', '', 'Augmented matrix [A | b]:', matrixToText(analysis.elimination.input, n), '']
  analysis.elimination.steps.forEach((step) => {
    const e = explainStep(step, { kind: 'system' })
    lines.push(`Step ${step.number}: ${e.operation}  (${e.title})`, matrixToText(step.after, n), '')
  })
  lines.push('Result:', ...solutionLines(analysis.solution, true))
  return lines.join('\n')
}

export function solutionLatex(analysis: SystemAnalysis): string {
  const s = analysis.solution
  switch (s.kind) {
    case 'unique':
      return s.values.map((v, j) => `x_{${j + 1}} = ${rationalToLatex(v)}`).join(',\\quad ')
    case 'inconsistent':
      return `\\text{No solution: row ${s.row + 1} reads } 0 = ${rationalToLatex(s.value)}`
    case 'infinite': {
      const vec = (values: Vector) => `\\begin{bmatrix} ${values.map(rationalToLatex).join(' \\\\ ')} \\end{bmatrix}`
      const terms = s.directions.map((d) => `x_{${d.variable + 1}} ${vec(d.vector)}`)
      return `\\mathbf{x} = ${vec(s.particular)} + ${terms.join(' + ')}`
    }
  }
}

export function reducedLatex(analysis: SystemAnalysis): string {
  return matrixToLatex(analysis.elimination.result, analysis.variables)
}

/** Independently confirms the reported solution by substituting into the ORIGINAL equations. */
export function verifySolution(analysis: SystemAnalysis): boolean | null {
  const { left: a, right: bColumn } = splitColumns(analysis.elimination.input, analysis.variables)
  const b = bColumn.map((r) => r[0]!)
  const s = analysis.solution
  if (s.kind === 'inconsistent') return null
  if (s.kind === 'unique') return vectorsEqual(multiplyVector(a, s.values), b)
  const zero = b.map((v) => v.sub(v))
  return vectorsEqual(multiplyVector(a, s.particular), b) && s.directions.every((d) => vectorsEqual(multiplyVector(a, d.vector), zero))
}

export function coefficientPart(analysis: SystemAnalysis): Matrix {
  return splitColumns(analysis.elimination.input, analysis.variables).left
}

export function variableList(count: number): string[] {
  return Array.from({ length: count }, (_, j) => variableName(j))
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
