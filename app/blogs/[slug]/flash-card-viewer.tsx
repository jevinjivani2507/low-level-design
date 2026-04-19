"use client"

import { useState } from "react"
import Link from "next/link"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { FlashCardTopic } from "@/lib/topics-data"
import { TopicCodeBlock } from "@/components/topics/topic-code-block"

export function FlashCardViewer({ topic }: { topic: FlashCardTopic }) {
  const [index, setIndex] = useState(0)
  const card = topic.cards[index]
  const total = topic.cards.length

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col">
      {/* Header — always visible */}
      <div className="shrink-0 px-6 pt-10 pb-0">
        <Link
          href="/blogs"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; All topics
        </Link>
        <h1 className="mt-3 text-lg font-semibold tracking-tight">
          {topic.title}
        </h1>
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
        <hr className="mt-6 border-border" />
      </div>

      {/* Card title + counter — always visible */}
      <div className="shrink-0 px-6 pt-5 pb-0">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-base font-semibold">{card.title}</h2>
          <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
            {index + 1} / {total}
          </span>
        </div>
        <hr className="mt-4 border-border" />
      </div>

      {/* Scrollable content: bullets + code */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <ul className="space-y-2">
          {card.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="mt-[3px] shrink-0 text-muted-foreground">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {card.code && (
          <div className="mt-6 pb-2">
            <TopicCodeBlock code={card.code} language={card.language} />
          </div>
        )}
      </div>

      {/* Navigation — always visible at bottom */}
      <div className="shrink-0 flex items-center justify-between gap-3 border-t border-border bg-background px-6 py-4">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => setIndex((i) => i - 1)}
          aria-label="Previous card"
          className={cn(
            "inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium",
            "hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <CaretLeftIcon className="size-4" aria-hidden />
          Previous
        </button>
        <button
          type="button"
          disabled={index >= total - 1}
          onClick={() => setIndex((i) => i + 1)}
          aria-label="Next card"
          className={cn(
            "inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium",
            "hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          Next
          <CaretRightIcon className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
