"use client"

import { useCallback, useMemo, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { dsaTopics, getAllTags, type DsaQuestion, type DsaTopic } from "@/lib/dsa-data"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "dsa-selected-tags"

const emptyTags: string[] = []

function parseStoredTags(raw: string | null): string[] {
  if (!raw) return emptyTags
  try {
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
      return parsed
    }
  } catch {
    /* ignore */
  }
  return emptyTags
}

let tagStoreEpoch = 0
const tagStoreListeners = new Set<() => void>()

function subscribeTagStore(onChange: () => void) {
  if (typeof window === "undefined") return () => {}
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onChange()
  }
  window.addEventListener("storage", onStorage)
  tagStoreListeners.add(onChange)
  return () => {
    window.removeEventListener("storage", onStorage)
    tagStoreListeners.delete(onChange)
  }
}

function bumpTagStore() {
  tagStoreEpoch += 1
  tagStoreListeners.forEach((l) => l())
}

/** Stable snapshot token: changes when localStorage key or same-tab writes update */
function getTagStoreSnapshot(): string {
  if (typeof window === "undefined") return "0"
  void tagStoreEpoch
  return `${tagStoreEpoch}\0${localStorage.getItem(STORAGE_KEY) ?? ""}`
}

function usePersistedSelectedTags(): [
  string[],
  (u: string[] | ((prev: string[]) => string[])) => void,
] {
  const snapshot = useSyncExternalStore(
    subscribeTagStore,
    getTagStoreSnapshot,
    () => "0"
  )

  const selectedTags = useMemo(() => {
    const raw = snapshot.includes("\0")
      ? snapshot.slice(snapshot.indexOf("\0") + 1)
      : ""
    return parseStoredTags(raw || null)
  }, [snapshot])

  const setSelectedTags = useCallback(
    (update: string[] | ((prev: string[]) => string[])) => {
      if (typeof window === "undefined") return
      const prev = parseStoredTags(localStorage.getItem(STORAGE_KEY))
      const next = typeof update === "function" ? update(prev) : update
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      bumpTagStore()
    },
    []
  )

  return [selectedTags, setSelectedTags]
}

function filterTopics(topics: DsaTopic[], selectedTags: string[]): DsaTopic[] {
  if (selectedTags.length === 0) {
    return topics
  }
  const selected = new Set(selectedTags)
  return topics
    .map((topic) => ({
      ...topic,
      questions: topic.questions.filter((q) => {
        const tags = q.tags ?? []
        if (tags.length === 0) return false
        return tags.some((t) => selected.has(t))
      }),
    }))
    .filter((topic) => topic.questions.length > 0)
}

export default function DsaPage() {
  const [selected, setSelected] = useState<DsaQuestion | null>(null)
  const [selectedTags, setSelectedTags] = usePersistedSelectedTags()

  const allTags = useMemo(() => getAllTags(dsaTopics), [])

  const filteredTopics = useMemo(
    () => filterTopics(dsaTopics, selectedTags),
    [selectedTags]
  )

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <TooltipProvider delay={200} closeDelay={0}>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">DSA Prep</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Practice problems for coding interviews.
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
              href="/blogs"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Blogs
            </Link>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => {
                const on = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={on}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-xs transition-colors",
                      on
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTags([])}
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        )}

        <div className="mt-8">
          <Accordion>
            {filteredTopics.map((topic) => (
              <AccordionItem key={topic.topic} value={topic.topic}>
                <AccordionTrigger>
                  {topic.topic}
                  <span className="ml-2 text-muted-foreground">
                    ({topic.questions.length})
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Problem</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className="w-20 text-center">
                          LeetCode
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topic.questions.map((q, i) => (
                        <TableRow key={q.id}>
                          <TableCell className="text-muted-foreground">
                            {i + 1}
                          </TableCell>
                          <TableCell>
                            <QuestionTitleCell
                              q={q}
                              onOpen={() => setSelected(q)}
                            />
                          </TableCell>
                          <TableCell>
                            <DifficultyBadge difficulty={q.difficulty} />
                          </TableCell>
                          <TableCell className="text-center">
                            <a
                              href={q.leetcodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                            >
                              <ArrowSquareOut className="size-3.5" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Sheet
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <SheetContent side="right" className="max-w-2xl overflow-y-auto">
            {selected && (
              <>
                <SheetHeader>
                  <SheetTitle>{selected.title}</SheetTitle>
                  {(selected.tags?.length ?? 0) > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selected.tags!.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <SheetDescription>
                    <DifficultyBadge difficulty={selected.difficulty} />
                    <span className="ml-2">
                      <a
                        href={selected.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
                      >
                        LeetCode
                        <ArrowSquareOut className="size-3" />
                      </a>
                    </span>
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-5 px-4 pb-6">
                  {selected.question && (
                    <section>
                      <h3 className="mb-1.5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                        Question
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {selected.question}
                      </p>
                    </section>
                  )}

                  {selected.testCases && selected.testCases.length > 0 && (
                    <section>
                      <h3 className="mb-1.5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                        Examples
                      </h3>
                      <div className="flex flex-col gap-2">
                        {selected.testCases.map((tc, i) => (
                          <div
                            key={i}
                            className="rounded-md border bg-muted/50 px-3 py-2 text-xs leading-relaxed"
                          >
                            <div>
                              <span className="text-muted-foreground">
                                Input:{" "}
                              </span>
                              <code>{tc.input}</code>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Output:{" "}
                              </span>
                              <code>{tc.output}</code>
                            </div>
                            {tc.explanation && (
                              <div className="mt-1 text-muted-foreground">
                                <span className="font-medium">
                                  Explanation:{" "}
                                </span>
                                {tc.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h3 className="mb-1.5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                      Complexity
                    </h3>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Time: </span>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                          {selected.timeComplexity}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Space: </span>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                          {selected.spaceComplexity}
                        </code>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-1.5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                      Code
                    </h3>
                    <pre className="overflow-x-auto rounded-md border bg-muted/50 p-3 text-xs leading-relaxed">
                      <code>{selected.code}</code>
                    </pre>
                  </section>

                  <section>
                    <h3 className="mb-1.5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                      Notes
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selected.notes}
                    </p>
                  </section>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>

        <div className="mt-6 text-[11px] text-muted-foreground">
          Press <kbd>d</kbd> to toggle dark mode
        </div>
      </div>
    </TooltipProvider>
  )
}

function QuestionTitleCell({
  q,
  onOpen,
}: {
  q: DsaQuestion
  onOpen: () => void
}) {
  const tags = q.tags ?? []
  const hidden = tags.length > 3 ? tags.slice(3) : []
  const visible = tags.slice(0, 3)

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <button
        type="button"
        onClick={onOpen}
        className="cursor-pointer text-left underline underline-offset-4 hover:text-primary"
      >
        {q.title}
      </button>
      {visible.length > 0 && (
        <span className="inline-flex flex-wrap items-center gap-1">
          {visible.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border bg-muted/50 px-1.5 py-0 text-[10px] leading-tight text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {hidden.length > 0 && (
            <Tooltip>
              <TooltipTrigger
                delay={100}
                render={(props) => (
                  <span
                    {...props}
                    className="cursor-default rounded border border-dashed border-border px-1.5 py-0 text-[10px] leading-tight text-muted-foreground"
                  >
                    +{hidden.length} more
                  </span>
                )}
              />
              <TooltipContent side="top">
                {hidden.join(", ")}
              </TooltipContent>
            </Tooltip>
          )}
        </span>
      )}
    </div>
  )
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const color =
    difficulty === "Easy"
      ? "text-green-600 dark:text-green-400"
      : difficulty === "Medium"
        ? "text-yellow-600 dark:text-yellow-400"
        : difficulty === "Hard"
          ? "text-red-600 dark:text-red-400"
          : "text-muted-foreground"

  return <span className={color}>{difficulty}</span>
}
