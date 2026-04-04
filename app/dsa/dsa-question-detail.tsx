import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { BinaryTreeDiagram } from "@/components/dsa/binary-tree-diagram"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import type { DsaQuestion } from "@/lib/dsa-data"
import { cn } from "@/lib/utils"

type QuestionDetailProps = {
  selected: DsaQuestion
  variant: "sheet" | "drawer"
}

export function DsaQuestionDetail({ selected, variant }: QuestionDetailProps) {
  const isSheet = variant === "sheet"

  const header = (
    <>
      {isSheet ? (
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
                <ArrowSquareOutIcon className="size-3" />
              </a>
            </span>
          </SheetDescription>
        </SheetHeader>
      ) : (
        <DrawerHeader className="border-b border-border text-left">
          <DrawerTitle className="text-base">{selected.title}</DrawerTitle>
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
          <div className="text-xs/relaxed text-muted-foreground">
            <DifficultyBadge difficulty={selected.difficulty} />
            <span className="ml-2">
              <a
                href={selected.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
              >
                LeetCode
                <ArrowSquareOutIcon className="size-3" />
              </a>
            </span>
          </div>
        </DrawerHeader>
      )}
    </>
  )

  return (
    <>
      {header}
      <div
        className={cn(
          "flex flex-col gap-5 pb-6",
          isSheet ? "px-4" : "max-h-[min(72vh,560px)] overflow-y-auto px-4 pt-2"
        )}
      >
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
              {selected.testCases.map((tc, i) => {
                const diagrams = tc.diagrams
                return (
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
                    {diagrams !== undefined && diagrams.length > 0 && (
                      <div className="mt-3 flex flex-col gap-4 rounded-md border border-border/60 bg-background/50 px-2 py-3">
                        {diagrams.map((levelOrder, di) => (
                          <BinaryTreeDiagram
                            key={di}
                            levelOrder={levelOrder}
                          />
                        ))}
                      </div>
                    )}
                    {tc.explanation && (
                      <div className="mt-1 text-muted-foreground">
                        <span className="font-medium">Explanation: </span>
                        {tc.explanation}
                      </div>
                    )}
                  </div>
                )
              })}
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
  )
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const getColor = (d: string) => {
    switch (d) {
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
