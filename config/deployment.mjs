/**
 * Deployment settings, in one place.
 *
 * LinearLab is a static Next.js export. Hosts that serve it from a sub-path (GitHub Pages project
 * sites live at https://<user>.github.io/<repo>/) need a base path; everything else uses the root.
 * Nothing in the application code knows about this: Next.js prefixes links and assets itself.
 *
 * Set LINEARLAB_BASE_PATH when building, serving or testing, for example:
 *   LINEARLAB_BASE_PATH=/LinearLab_ npm run build
 *
 * To move to another host, change or delete the variable; no application code depends on it.
 */

/**
 * Turns "LinearLab_", "/LinearLab_/" or "/" into a canonical base path ("/LinearLab_" or "").
 * Throws on anything that is not a plain path, so a typo fails the build instead of shipping
 * broken asset URLs.
 *
 * @param {string | undefined} input
 * @returns {string}
 */
export function normalizeBasePath(input) {
  const raw = (input ?? '').trim()
  if (raw === '' || raw === '/') return ''
  const path = (raw.startsWith('/') ? raw : `/${raw}`).replace(/\/+$/, '')
  const segments = path.slice(1).split('/')
  const valid = segments.every((segment) => /^[A-Za-z0-9._~-]+$/.test(segment) && segment !== '.' && segment !== '..')
  if (!valid) {
    throw new Error(
      `Invalid LINEARLAB_BASE_PATH "${input}". Use a plain path such as /LinearLab_ (letters, digits and . _ ~ - only).`,
    )
  }
  return path
}

/** The base path for this process: "" for a root deployment, otherwise "/segment[/segment]". */
export const basePath = normalizeBasePath(process.env.LINEARLAB_BASE_PATH)
