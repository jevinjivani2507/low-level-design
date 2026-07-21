"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

type PagerLink = { href: string; title: string } | null

export function DocPager({ prev, next }: { prev: PagerLink; next: PagerLink }) {
  const router = useRouter()

  // Left/right arrows step between docs (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault()
        router.push(prev.href)
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault()
        router.push(next.href)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next, router])

  return (
    <nav className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start gap-1 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted/60"
        >
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <CaretLeftIcon className="size-3" aria-hidden />
            Previous
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-primary">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border p-3 text-right transition-colors hover:bg-muted/60 sm:col-start-2"
        >
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            Next
            <CaretRightIcon className="size-3" aria-hidden />
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
