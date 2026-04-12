"use client"

import { cn } from "@/lib/utils"

type MatrixDiagramProps = {
  matrix: number[][]
  className?: string
}

export function MatrixDiagram({ matrix, className }: MatrixDiagramProps) {
  if (matrix.length === 0) {
    return <p className="text-xs text-muted-foreground">Empty matrix</p>
  }

  const cols = Math.max(...matrix.map((row) => row.length), 0)

  return (
    <div
      className={cn(
        "w-fit overflow-x-auto rounded-md border border-border/80 bg-background/80 p-2",
        className
      )}
      role="img"
      aria-label="Matrix grid"
    >
      <table className="text-center font-mono text-xs tabular-nums">
        <tbody>
          {matrix.map((row, r) => (
            <tr key={r}>
              {Array.from({ length: cols }, (_, c) => (
                <td
                  key={c}
                  className="min-w-[2.25rem] border border-border px-1.5 py-1"
                >
                  {row[c] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
