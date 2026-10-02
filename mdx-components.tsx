import type { MDXComponents } from 'mdx/types'
import { lessonComponents } from '@/components/learning/mdx'

export function useMDXComponents(): MDXComponents {
  return lessonComponents
}
