'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type ReactNode, useId, useMemo, useState } from 'react'
import { type SearchDoc, type Segment, searchDocs } from '@/lib/course/search'
import styles from './search.module.css'

function marked(segments: readonly Segment[]): ReactNode {
  return segments.map((segment, i) => (segment.match ? <mark key={i}>{segment.text}</mark> : <span key={i}>{segment.text}</span>))
}

/**
 * Searches the prebuilt index as the student types. The address keeps the query (?q=...), so a search
 * can be shared or reloaded, and Back and Forward restore it.
 */
export function CourseSearch({ docs }: { docs: readonly SearchDoc[] }) {
  const id = useId()
  const params = useSearchParams()
  const urlQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlQuery)

  // Navigation (Back, Forward, a link with ?q=) changes the address without touching the input.
  if (urlQuery !== seenUrlQuery) {
    setSeenUrlQuery(urlQuery)
    setQuery(urlQuery)
  }

  const hits = useMemo(() => searchDocs(docs, query), [docs, query])
  const trimmed = query.trim()

  const update = (value: string) => {
    setQuery(value)
    setSeenUrlQuery(value.trim())
    const url = new URL(window.location.href)
    if (value.trim()) url.searchParams.set('q', value.trim())
    else url.searchParams.delete('q')
    window.history.replaceState(null, '', url)
  }

  return (
    <div className={`${styles.page} ${styles.big}`}>
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={id} className="sr-only">
          Search the course
        </label>
        <input
          id={id}
          type="search"
          className={styles.input}
          style={{ width: '100%' }}
          value={query}
          onChange={(event) => update(event.target.value)}
          placeholder="Try: rank nullity, Cramer, eigenspace, Wronskian"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
      <p className={styles.count} aria-live="polite">
        {trimmed === ''
          ? 'Searches every heading of the lecture notes and the title, objective and sections of each interactive lesson.'
          : hits.length === 0
            ? `No results for “${trimmed}”. Try fewer or different words.`
            : `${hits.length === 40 ? 'The first 40 results' : hits.length === 1 ? '1 result' : `${hits.length} results`} for “${trimmed}”`}
      </p>
      {hits.length > 0 ? (
        <ol className={styles.results}>
          {hits.map((hit) => (
            <li key={hit.doc.href} className={styles.result}>
              <Link href={hit.doc.href} prefetch={false} className={styles.resultLink}>
                {marked(hit.heading)}
              </Link>
              <span className={styles.resultPage}>{hit.doc.page}</span>
              {hit.doc.text ? <p className={styles.snippet}>{marked(hit.snippet)}</p> : null}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
