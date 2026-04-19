"use client"

import { useTheme } from "next-themes"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("tsx", tsx)

const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  tsx: "tsx",
  javascript: "javascript",
  typescript: "typescript",
}

export function TopicCodeBlock({
  code,
  language = "js",
}: {
  code: string
  language?: string
}) {
  const { resolvedTheme } = useTheme()
  const style = resolvedTheme === "dark" ? oneDark : oneLight
  const prismLang = LANGUAGE_MAP[language] ?? "javascript"

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-muted/50">
      <SyntaxHighlighter
        language={prismLang}
        style={style}
        showLineNumbers
        wrapLines
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
