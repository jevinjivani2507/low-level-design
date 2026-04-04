"use client"

import { useMemo, useState } from "react"
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
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { tags } from "@/lib/dsa-data"
import { dsaTopics, type DsaQuestion, type DsaTopic } from "@/lib/dsa-data"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { useDsaSelectedTags } from "@/hooks/use-dsa-selected-tags"
import { DsaQuestionDetail } from "./dsa-question-detail"
import { useMediaQuery } from "@/hooks/use-media-query"

const filterTopics = (
  topics: DsaTopic[],
  selectedTags: string[]
): DsaTopic[] => {
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
        return tags.some((t) => selected.has(t.toString()))
      }),
    }))
    .filter((topic) => topic.questions.length > 0)
}

const DsaPage = () => {
  const [selected, setSelected] = useState<DsaQuestion | null>(null)
  const [selectedTags, setSelectedTags] = useDsaSelectedTags()
  const isMdUp = useMediaQuery("(min-width: 768px)")

  const filteredTopics = useMemo(
    () => filterTopics(dsaTopics, selectedTags),
    [selectedTags]
  )

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

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
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
                              <ArrowSquareOutIcon className="size-3.5" />
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

        {isMdUp ? (
          <Sheet
            open={!!selected}
            onOpenChange={(open) => !open && setSelected(null)}
          >
            <SheetContent side="right" className="max-w-2xl overflow-y-auto">
              {selected && (
                <DsaQuestionDetail selected={selected} variant="sheet" />
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
                <DsaQuestionDetail selected={selected} variant="drawer" />
              )}
            </DrawerContent>
          </Drawer>
        )}

        <div className="mt-6 text-[11px] text-muted-foreground">
          Press <kbd>d</kbd> to toggle dark mode
        </div>
      </div>
    </TooltipProvider>
  )
}
export default DsaPage

const QuestionTitleCell = ({
  q,
  onOpen,
}: {
  q: DsaQuestion
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
