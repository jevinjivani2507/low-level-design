import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogsDir = path.join(process.cwd(), "blogs")

export interface BlogMeta {
  slug: string
  title: string
  date: string
  tags: string[]
}

export interface Blog {
  meta: BlogMeta
  content: string
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(blogsDir)) return []

  const files = fs
    .readdirSync(blogsDir)
    .filter((f) => f.endsWith(".md"))

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(blogsDir, file), "utf-8")
      const { data } = matter(raw)

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        tags: (data.tags as string[]) ?? [],
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getBlog(slug: string): Blog | null {
  const filePath = path.join(blogsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    meta: {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      tags: (data.tags as string[]) ?? [],
    },
    content,
  }
}
