"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
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
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet"
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { tags } from "@/lib/dsa-data"
import { dsaTopics, type DsaQuestion, type DsaTopic } from "@/lib/dsa-data"
import {
  ArrowSquareOutIcon,
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { useDsaSelectedTags } from "@/hooks/use-dsa-selected-tags"
import { DsaQuestionDetail } from "./dsa-question-detail"
import { useMediaQuery } from "@/hooks/use-media-query"

const filterTopics = (
  topics: DsaTopic[],
  selectedTags: string[],
  query: string
): DsaTopic[] => {
  if (selectedTags.length === 0 && !query) {
    return topics
  }
  const selected = new Set(selectedTags)
  return topics
    .map((topic) => ({
      ...topic,
      questions: topic.questions.filter((q) => {
        if (selectedTags.length > 0) {
          const tags = q.tags ?? []
          if (!tags.some((t) => selected.has(t.toString()))) return false
        }
        if (query) {
          const haystack = [q.title, ...(q.tags ?? []), q.difficulty ?? ""]
            .join(" ")
            .toLowerCase()
          if (!haystack.includes(query)) return false
        }
        return true
      }),
    }))
    .filter((topic) => topic.questions.length > 0)
}

/** Wrap the first case-insensitive match of `query` in `text` with a highlight. */
function highlight(text: string, query: string): ReactNode {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-[2px] bg-yellow-200/80 text-yellow-950 dark:bg-yellow-300/25 dark:text-yellow-100">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

/** A question flattened with its topic and position, for cross-category nav. */
type FlatQuestion = {
  q: DsaQuestion
  topicLabel: string
  indexInTopic: number
  topicLength: number
}

/** Flatten topics into one list (same order as the table) so navigation can
 * continue past the end of a category into the next one. */
function flattenTopics(topics: DsaTopic[]): FlatQuestion[] {
  const out: FlatQuestion[] = []
  for (const topic of topics) {
    topic.questions.forEach((q, i) =>
      out.push({
        q,
        topicLabel: topic.topic,
        indexInTopic: i,
        topicLength: topic.questions.length,
      })
    )
  }
  return out
}

const DsaPage = () => {
  const [selected, setSelected] = useState<DsaQuestion | null>(null)
  const [selectedTags, setSelectedTags] = useDsaSelectedTags()
  const [query, setQuery] = useState("")
  const [openTopics, setOpenTopics] = useState<string[]>([])
  const isMdUp = useMediaQuery("(min-width: 768px)")

  const normalizedQuery = query.trim().toLowerCase()

  const filteredTopics = useMemo(
    () => filterTopics(dsaTopics, selectedTags, normalizedQuery),
    [selectedTags, normalizedQuery]
  )

  const flatQuestions = useMemo(
    () => flattenTopics(filteredTopics),
    [filteredTopics]
  )

  // While searching, force every matching topic open so results are visible;
  // otherwise the accordion stays user-controlled.
  const accordionValue = normalizedQuery
    ? filteredTopics.map((t) => t.topic)
    : openTopics

  const nav = useMemo(() => {
    if (!selected) return null
    const i = flatQuestions.findIndex((f) => f.q.id === selected.id)
    if (i === -1) return null
    return {
      current: flatQuestions[i],
      prev: flatQuestions[i - 1] ?? null,
      next: flatQuestions[i + 1] ?? null,
    }
  }, [selected, flatQuestions])

  // Move to the sibling problem `offset` positions away, crossing categories.
  const go = useCallback(
    (offset: number) => {
      setSelected((cur) => {
        if (!cur) return cur
        const i = flatQuestions.findIndex((f) => f.q.id === cur.id)
        if (i === -1) return cur
        return flatQuestions[i + offset]?.q ?? cur
      })
    },
    [flatQuestions]
  )

  // Left/right arrows navigate between problems while a detail view is open.
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        go(-1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        go(1)
      }
    }
    // Capture phase: the Sheet/Drawer trap focus and stop keydown from
    // bubbling to window, so listen on the way down instead.
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [selected, go])

  const toggleTag = (tag: string) => {
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

        <div className="relative mt-6">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems by title, tag, or difficulty…"
            aria-label="Search problems"
            className="w-full rounded-md border border-border bg-muted/40 py-2 pr-8 pl-8 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => {
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

        {normalizedQuery && (
          <p className="mt-4 text-xs text-muted-foreground">
            {flatQuestions.length}{" "}
            {flatQuestions.length === 1 ? "problem" : "problems"} found
          </p>
        )}

        <div className="mt-8">
          {filteredTopics.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No problems match your search.
            </p>
          ) : (
            <Accordion
              multiple
              value={accordionValue}
              onValueChange={(value) => setOpenTopics(value as string[])}
            >
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
                              {i}
                            </TableCell>
                            <TableCell>
                              <QuestionTitleCell
                                q={q}
                                query={normalizedQuery}
                                onOpen={() => setSelected(q)}
                              />
                            </TableCell>
                            {q.difficulty && (
                              <TableCell>
                                <DifficultyBadge difficulty={q.difficulty} />
                              </TableCell>
                            )}
                            {q.leetcodeUrl && (
                              <TableCell className="text-center">
                                <a
                                  href={q.leetcodeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                                >
                                  <ArrowSquareOutIcon className="size-3.5" />
                                </a>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {isMdUp ? (
          <Sheet
            open={!!selected}
            onOpenChange={(open) => !open && setSelected(null)}
          >
            <SheetContent side="right" className="flex max-w-2xl flex-col p-0">
              {selected && (
                <>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <DsaQuestionDetail selected={selected} variant="sheet" />
                  </div>
                  {nav && (
                    <SheetFooter className="shrink-0 border-t border-border p-3">
                      <QuestionNav
                        nav={nav}
                        onPrev={() => go(-1)}
                        onNext={() => go(1)}
                      />
                    </SheetFooter>
                  )}
                </>
              )}
            </SheetContent>
          </Sheet>
        ) : (
          <Drawer
            open={!!selected}
            onOpenChange={(open) => !open && setSelected(null)}
            repositionInputs={false}
          >
            <DrawerContent className="flex max-h-[92vh] flex-col overflow-hidden p-0">
              {selected && (
                <>
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                    <DsaQuestionDetail selected={selected} variant="drawer" />
                  </div>
                  {nav && (
                    <DrawerFooter className="shrink-0 border-t border-border py-3">
                      <QuestionNav
                        nav={nav}
                        onPrev={() => go(-1)}
                        onNext={() => go(1)}
                      />
                    </DrawerFooter>
                  )}
                </>
              )}
            </DrawerContent>
          </Drawer>
        )}

        <div className="mt-6 text-[11px] text-muted-foreground">
          Press <kbd>d</kbd> to toggle dark mode
          {selected && (
            <>
              {" · "}
              <kbd>←</kbd> <kbd>→</kbd> to navigate problems
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
export default DsaPage

const QuestionNav = ({
  nav,
  onPrev,
  onNext,
}: {
  nav: {
    current: FlatQuestion
    prev: FlatQuestion | null
    next: FlatQuestion | null
  }
  onPrev: () => void
  onNext: () => void
}) => {
  const { current, prev, next } = nav
  const nextIsNewTopic = !!next && next.topicLabel !== current.topicLabel

  return (
    <div className="flex flex-col gap-2">
      {nextIsNewTopic && (
        <p className="text-center text-[11px] text-muted-foreground">
          End of {current.topicLabel} — next up{" "}
          <span className="font-medium text-foreground">{next.topicLabel}</span>
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={!prev}
          onClick={onPrev}
          aria-label="Previous problem"
          title="Previous (←)"
          className={cn(
            "inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium",
            "hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <CaretLeftIcon className="size-4" aria-hidden />
          Previous
        </button>
        <span
          className="flex min-w-0 flex-col items-center text-center"
          aria-live="polite"
        >
          <span className="max-w-[8rem] truncate text-[11px] font-medium text-foreground">
            {current.topicLabel}
          </span>
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {current.indexInTopic + 1} / {current.topicLength}
          </span>
        </span>
        <button
          type="button"
          disabled={!next}
          onClick={onNext}
          aria-label={
            nextIsNewTopic ? `Next: ${next.topicLabel}` : "Next problem"
          }
          title="Next (→)"
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

const QuestionTitleCell = ({
  q,
  query,
  onOpen,
}: {
  q: DsaQuestion
  query: string
  onOpen: () => void
}) => {
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
        {highlight(q.title, query)}
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
              <TooltipContent side="top">{hidden.join(", ")}</TooltipContent>
            </Tooltip>
          )}
        </span>
      )}
    </div>
  )
}

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const getColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 dark:text-green-400"
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "Hard":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }
  return <span className={getColor(difficulty)}>{difficulty}</span>
}
