import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")

export interface ProblemMeta {
  slug: string
  title: string
  difficulty: string
  tags: string[]
}

export interface Problem {
  meta: ProblemMeta
  question: string
  solution: string
}

export function getAllProblems(): ProblemMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const slugs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  return slugs
    .map((slug) => {
      const questionPath = path.join(contentDir, slug, "question.md")
      if (!fs.existsSync(questionPath)) return null

      const raw = fs.readFileSync(questionPath, "utf-8")
      const { data } = matter(raw)

      return {
        slug,
        title: (data.title as string) ?? slug,
        difficulty: (data.difficulty as string) ?? "—",
        tags: (data.tags as string[]) ?? [],
      }
    })
    .filter((p): p is ProblemMeta => p !== null)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getProblem(slug: string): Problem | null {
  const dir = path.join(contentDir, slug)
  if (!fs.existsSync(dir)) return null

  const questionPath = path.join(dir, "question.md")
  const solutionPath = path.join(dir, "solution.md")

  if (!fs.existsSync(questionPath) || !fs.existsSync(solutionPath)) return null

  const questionRaw = fs.readFileSync(questionPath, "utf-8")
  const solutionRaw = fs.readFileSync(solutionPath, "utf-8")

  const { data, content: question } = matter(questionRaw)
  const { content: solution } = matter(solutionRaw)

  return {
    meta: {
      slug,
      title: (data.title as string) ?? slug,
      difficulty: (data.difficulty as string) ?? "—",
      tags: (data.tags as string[]) ?? [],
    },
    question,
    solution,
  }
}
