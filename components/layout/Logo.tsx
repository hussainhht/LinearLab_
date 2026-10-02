/** The echelon "staircase": three leading entries stepping down and to the right. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M5 4v24M27 4v24" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M5 4h3M5 28h3M27 4h-3M27 28h-3" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9.5h4.5v6.5h4.5v6.5h5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.45" />
      <circle cx="11" cy="9.5" r="2.6" fill="var(--pivot-fill)" stroke="var(--pivot-ring)" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="2.6" fill="var(--pivot-fill)" stroke="var(--pivot-ring)" strokeWidth="1.2" />
      <circle cx="21" cy="22.5" r="2.6" fill="var(--pivot-fill)" stroke="var(--pivot-ring)" strokeWidth="1.2" />
    </svg>
  )
}
