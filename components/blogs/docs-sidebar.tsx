"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CaretRightIcon, ListIcon, XIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { flashCardTopics, docHref } from "@/lib/topics-data"

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate: () => void
}) {
  const activeTopicSlug = flashCardTopics.find((t) =>
    t.cards.some((c) => pathname === docHref(t.slug, c.id))
  )?.slug

  // Per-topic open state; unset topics default to open only when active.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const isOpen = (slug: string) => overrides[slug] ?? slug === activeTopicSlug

  return (
    <nav className="flex flex-col gap-2">
      {flashCardTopics.map((topic) => {
        const open = isOpen(topic.slug)
        return (
          <div key={topic.slug}>
            <button
              type="button"
              onClick={() =>
                setOverrides((o) => ({ ...o, [topic.slug]: !open }))
              }
              aria-expanded={open}
              className="flex w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase hover:text-foreground"
            >
              <CaretRightIcon
                className={cn(
                  "mt-0.5 size-3 shrink-0 transition-transform",
                  open && "rotate-90"
                )}
                aria-hidden
              />
              <span>{topic.title}</span>
            </button>
            {open && (
              <ul className="mt-0.5 mb-1 flex flex-col gap-0.5">
                {topic.cards.map((card) => {
                  const href = docHref(topic.slug, card.id)
                  const active = pathname === href
                  return (
                    <li key={card.id}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-md py-1.5 pr-2 pl-[26px] text-[13px] leading-snug transition-colors",
                          active
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        {card.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const header = (
    <div className="mb-6">
      <p className="text-sm font-semibold tracking-tight">Interview Docs</p>
      <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          LLD
        </Link>
        <Link href="/dsa" className="hover:text-foreground">
          DSA
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="inline-flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted"
        >
          <ListIcon className="size-4" />
        </button>
        <span className="text-sm font-medium">Docs</span>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-border bg-background px-4 py-6 transition-transform",
          "md:sticky md:top-0 md:z-0 md:h-[100dvh] md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="text-sm font-semibold">Docs</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="inline-flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        {header}
        <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
      </aside>
    </>
  )
}
