import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllProblems, getProblem } from "@/lib/problems"
import { Markdown } from "@/components/markdown"

export function generateStaticParams() {
  return getAllProblems().map((p) => ({ slug: p.slug }))
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const problem = getProblem(slug)
  if (!problem) notFound()

  return (
    <div className="flex h-svh flex-col overflow-hidden">
      <header className="flex shrink-0 items-center gap-4 border-b px-6 py-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; Back
        </Link>
        <h1 className="text-sm font-semibold">{problem.meta.title}</h1>
        <DifficultyBadge difficulty={problem.meta.difficulty} />
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <div className="overflow-y-auto border-b p-6 md:border-r md:border-b-0">
          <div className="mb-3 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
            Question
          </div>
          <Markdown content={problem.question} />
        </div>
        <div className="overflow-y-auto p-6">
          <div className="mb-3 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
            Solution
          </div>
          <Markdown content={problem.solution} />
        </div>
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

  return <span className={`text-xs ${color}`}>{difficulty}</span>
}
