"use client"

import { useState } from "react"
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
import { dsaTopics, type DsaQuestion } from "@/lib/dsa-data"
import { ArrowSquareOut } from "@phosphor-icons/react"

export default function DsaPage() {
  const [selected, setSelected] = useState<DsaQuestion | null>(null)

  return (
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

      <div className="mt-8">
        <Accordion>
          {dsaTopics.map((topic) => (
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
                          <button
                            onClick={() => setSelected(q)}
                            className="cursor-pointer text-left underline underline-offset-4 hover:text-primary"
                          >
                            {q.title}
                          </button>
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
                    <p className="whitespace-pre-line text-sm leading-relaxed">
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
                            <span className="text-muted-foreground">Input: </span>
                            <code>{tc.input}</code>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Output: </span>
                            <code>{tc.output}</code>
                          </div>
                          {tc.explanation && (
                            <div className="mt-1 text-muted-foreground">
                              <span className="font-medium">Explanation: </span>
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
