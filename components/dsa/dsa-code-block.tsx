"use client"

import { useTheme } from "next-themes"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("cpp", cpp)

type DsaCodeBlockProps = {
  code: string
  codeLineHighlights?: { line: number; tone: "green" | "red" }[]
}

/** Prism themes (e.g. oneLight) use soft greens for strings/comments and reds/pinks for keywords/types. */
export function DsaCodeBlock({ code, codeLineHighlights }: DsaCodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const style = resolvedTheme === "dark" ? oneDark : oneLight

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-muted/50">
      <SyntaxHighlighter
        language="cpp"
        style={style}
        showLineNumbers
        wrapLines
        lineProps={(lineNumber) => ({
          className: codeLineHighlights?.some(
            (highlight) => highlight.line === lineNumber
          )
            ? "block w-full bg-green-400/30 dark:bg-green-600/30"
            : "block w-full",
        })}
        customStyle={{
          margin: 0,
          padding: "0.75rem",
          background: "transparent",
          fontSize: "0.75rem",
          lineHeight: 1.625,
        }}
        codeTagProps={{ className: "font-mono" }}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
