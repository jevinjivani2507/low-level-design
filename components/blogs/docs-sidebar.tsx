"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { flashCardTopics, docHref } from "@/lib/topics-data"

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate: () => void
}) {
  return (
    <nav className="flex flex-col gap-6">
      {flashCardTopics.map((topic) => (
        <div key={topic.slug}>
          <p className="px-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            {topic.title}
          </p>
          <ul className="mt-1.5 flex flex-col gap-0.5">
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
                      "block rounded-md px-2 py-1.5 text-[13px] leading-snug transition-colors",
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
        </div>
      ))}
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
