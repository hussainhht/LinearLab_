import { parse } from 'yaml'

/**
 * What the supplied chapters say about themselves. The files do not share one schema: the first
 * eight list `transcribed_source_ids` (an array) and `editable_transcription`, the last five list
 * `transcribed_source_id` (one comma-separated string) and `transcribed_source_parts`. Both shapes
 * are normalized here; `raw` keeps every key exactly as supplied.
 */
export interface NotesFrontmatter {
  readonly id: string
  readonly title: string
  readonly course: string | null
  readonly type: string | null
  readonly order: number
  readonly language: string | null
  /** Identifiers of the source documents, as supplied (not verified against any file in this repository). */
  readonly sourceIds: readonly string[]
  readonly sourcePageCount: number | null
  readonly contentFormat: string | null
  readonly sourceCoverage: string | null
  readonly editableTranscription: string | null
  readonly transcribedSourceIds: readonly string[]
  readonly transcribedSourceParts: readonly number[]
  readonly raw: Readonly<Record<string, unknown>>
}

function text(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value : null
}

function strings(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string')
  if (typeof value === 'string') return value.split(',').map((s) => s.trim()).filter(Boolean)
  return []
}

export function parseFrontmatter(source: string, file: string): NotesFrontmatter {
  let data: unknown
  try {
    data = parse(source)
  } catch (error) {
    throw new Error(`${file}: the YAML frontmatter does not parse (${error instanceof Error ? error.message : String(error)})`)
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error(`${file}: the frontmatter must be a YAML mapping`)
  }
  const raw = data as Record<string, unknown>
  const id = text(raw.id)
  const title = text(raw.title)
  if (!id) throw new Error(`${file}: frontmatter has no "id"`)
  if (!title) throw new Error(`${file}: frontmatter has no "title"`)
  if (typeof raw.order !== 'number' || !Number.isInteger(raw.order)) throw new Error(`${file}: frontmatter "order" must be an integer`)

  return {
    id,
    title,
    course: text(raw.course),
    type: text(raw.type),
    order: raw.order,
    language: text(raw.language),
    sourceIds: strings(raw.source_ids),
    sourcePageCount: typeof raw.source_page_count === 'number' ? raw.source_page_count : null,
    contentFormat: text(raw.content_format),
    sourceCoverage: text(raw.source_coverage),
    editableTranscription: text(raw.editable_transcription),
    transcribedSourceIds: strings(raw.transcribed_source_ids ?? raw.transcribed_source_id),
    transcribedSourceParts: Array.isArray(raw.transcribed_source_parts)
      ? raw.transcribed_source_parts.filter((n): n is number => typeof n === 'number')
      : [],
    raw,
  }
}
