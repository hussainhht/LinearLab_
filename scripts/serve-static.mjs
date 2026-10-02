// Serves the static export in ./out for local previews and browser tests.
// Usage: node scripts/serve-static.mjs [port]   (honours NEXT_PUBLIC_BASE_PATH)
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve('out')
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
}

if (!existsSync(root)) {
  console.error('No ./out directory. Run `npm run build` first.')
  process.exit(1)
}

function resolveFile(urlPath) {
  const relative = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '')
  const candidate = join(root, relative)
  if (!candidate.startsWith(root)) return null
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  const index = join(candidate, 'index.html')
  if (existsSync(index)) return index
  if (existsSync(`${candidate}.html`)) return `${candidate}.html`
  return null
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  let path = url.pathname
  if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length) || '/'
  else if (basePath) {
    res.writeHead(302, { location: basePath + '/' }).end()
    return
  }
  // Mirror trailingSlash: true, as GitHub Pages does for directories.
  if (!extname(path) && !path.endsWith('/')) {
    res.writeHead(308, { location: `${basePath}${path}/${url.search}` }).end()
    return
  }
  const file = resolveFile(path)
  const status = file ? 200 : 404
  const target = file ?? join(root, '404.html')
  res.writeHead(status, { 'content-type': types[extname(target)] ?? 'application/octet-stream' })
  createReadStream(target).pipe(res)
}).listen(port, () => console.log(`Serving ./out at http://localhost:${port}${basePath}/`))
