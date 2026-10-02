import type { MDXContent } from 'mdx/types'
import type { LessonSlug } from './catalog'

/**
 * Lesson bodies keyed by slug. The Record type makes TypeScript reject a
 * catalog entry without a body, and each import is a static path the
 * bundler can analyze.
 */
export const lessonBodies: Record<LessonSlug, () => Promise<{ default: MDXContent }>> = {
  'linear-systems': () => import('./linear-systems.mdx'),
  'solution-sets': () => import('./solution-sets.mdx'),
  'homogeneous-systems': () => import('./homogeneous-systems.mdx'),
  'augmented-matrices': () => import('./augmented-matrices.mdx'),
  'row-operations': () => import('./row-operations.mdx'),
  'echelon-forms': () => import('./echelon-forms.mdx'),
  'gauss-jordan-elimination': () => import('./gauss-jordan-elimination.mdx'),
  'general-solutions': () => import('./general-solutions.mdx'),
  'matrix-basics': () => import('./matrix-basics.mdx'),
  'addition-and-scalar-multiplication': () => import('./addition-and-scalar-multiplication.mdx'),
  'matrix-multiplication': () => import('./matrix-multiplication.mdx'),
  'multiplication-properties': () => import('./multiplication-properties.mdx'),
  'transpose-and-special-matrices': () => import('./transpose-and-special-matrices.mdx'),
  'rank-and-null-space': () => import('./rank-and-null-space.mdx'),
  'matrix-inverse': () => import('./matrix-inverse.mdx'),
  'inverse-2x2': () => import('./inverse-2x2.mdx'),
  'inverse-by-row-reduction': () => import('./inverse-by-row-reduction.mdx'),
  'inverse-properties': () => import('./inverse-properties.mdx'),
  'invertibility-and-systems': () => import('./invertibility-and-systems.mdx'),
  'determinants': () => import('./determinants.mdx'),
  'determinant-properties': () => import('./determinant-properties.mdx'),
  'cramers-rule': () => import('./cramers-rule.mdx'),
}
