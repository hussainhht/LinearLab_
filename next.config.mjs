import createMDX from '@next/mdx'
import { basePath } from './config/deployment.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A fully static site (`out/`): no server is needed to host it.
  output: 'export',
  // "" locally and on root deployments; "/<repo>" on GitHub Pages (see config/deployment.mjs).
  basePath,
  // Every route becomes <route>/index.html, which static hosts serve for direct visits and refreshes.
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // The default image optimizer needs a server. The app has no next/image usage today; this keeps
  // it working if some is added.
  images: { unoptimized: true },
}

const withMDX = createMDX({
  options: {
    // Plugins are referenced by name so the config stays serializable for Turbopack.
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true, output: 'htmlAndMathml' }]],
  },
})

export default withMDX(nextConfig)
