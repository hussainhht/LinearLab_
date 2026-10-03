import Form from 'next/form'
import { Icon } from '@/components/ui/Icon'
import styles from './search.module.css'

/** A GET form to /learn/search/; with JavaScript it navigates client-side, without it the browser does a normal GET. */
export function SearchForm({ id }: { id: string }) {
  return (
    <Form action="/learn/search/" role="search" className={styles.form}>
      <label htmlFor={id} className="sr-only">
        Search the course
      </label>
      <input id={id} name="q" type="search" className={styles.input} placeholder="Search the course" autoComplete="off" />
      <button type="submit" className={styles.submit} aria-label="Search">
        <Icon name="search" />
      </button>
    </Form>
  )
}
