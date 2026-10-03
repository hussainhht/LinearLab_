/**
 * KaTeX settings, in one place.
 *
 * Both math pipelines read this object: the MDX lessons (through the rehype-katex entry in
 * next.config.mjs) and the Markdown lecture notes (lib/course/markdown.ts). A formula that KaTeX
 * cannot parse fails the build in either, instead of reaching students as raw LaTeX.
 *
 * - strict + throwOnError: unsupported commands and malformed math are build errors, never silent.
 * - htmlAndMathml: the visual rendering plus MathML, so screen readers get real mathematics.
 */
export const katexOptions = {
  strict: true,
  throwOnError: true,
  output: 'htmlAndMathml',
}
