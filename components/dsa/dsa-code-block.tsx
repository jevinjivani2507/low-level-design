"use client"

import { useTheme } from "next-themes"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("cpp", cpp)

type DsaCodeBlockProps = {
  code: string
}

/** Prism themes (e.g. oneLight) use soft greens for strings/comments and reds/pinks for keywords/types. */
export function DsaCodeBlock({ code }: DsaCodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const style = resolvedTheme === "dark" ? oneDark : oneLight

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-muted/50">
      <SyntaxHighlighter
        language="cpp"
        style={style}
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
