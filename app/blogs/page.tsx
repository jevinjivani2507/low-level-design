import Link from "next/link"
import { flashCardTopics } from "@/lib/topics-data"

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Topics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Flash card revision for each topic.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            LLD
          </Link>
          <Link
            href="/dsa"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            DSA
          </Link>
        </div>
      </div>

      <div className="mt-8 divide-y divide-border rounded-md border border-border">
        {flashCardTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/blogs/${topic.slug}`}
            className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium">{topic.title}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {topic.cards.length} cards
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-[11px] text-muted-foreground">
        Press <kbd>d</kbd> to toggle dark mode
      </div>
    </div>
  )
}
