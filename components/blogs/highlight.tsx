import type { ReactNode } from "react"

/** Render inline `**text**` markers as highlighter-marked text; leaves other text literal. */
export function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(part)
    return m ? (
      <mark
        key={i}
        className="rounded-[3px] bg-yellow-200/80 box-decoration-clone px-1 font-medium text-yellow-950 dark:bg-yellow-300/25 dark:text-yellow-100"
      >
        {m[1]}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  })
}
