import createMDX from '@next/mdx'

// GitHub Pages serves this project from /<repo>/; local dev and other hosts use the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: { unoptimized: true },
  typedRoutes: false,
}

const withMDX = createMDX({
  options: {
    // Plugins are referenced by name so the config stays serializable for Turbopack.
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true, output: 'htmlAndMathml' }]],
  },
})

export default withMDX(nextConfig)
