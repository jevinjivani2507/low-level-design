import Link from "next/link"
import { getAllProblems } from "@/lib/problems"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Page() {
  const problems = getAllProblems()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Low-Level Design Prep
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Practice problems for system design interviews.
          </p>
        </div>
        <Link
          href="/dsa"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          DSA &rarr;
        </Link>
      </div>

      {problems.length === 0 ? (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          No problems yet. Add a folder under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">content/</code> with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">question.md</code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">solution.md</code>{" "}
          to get started.
        </div>
      ) : (
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((p, i) => (
                <TableRow key={p.slug}>
                  <TableCell className="text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/problems/${p.slug}`}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      {p.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DifficultyBadge difficulty={p.difficulty} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

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
