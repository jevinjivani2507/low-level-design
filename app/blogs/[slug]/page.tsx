import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllBlogs, getBlog } from "@/lib/blogs"
import { Markdown } from "@/components/markdown"

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }))
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blogs"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All blogs
      </Link>

      <div className="mt-6 mb-2">
        <h1 className="text-lg font-semibold tracking-tight">
          {blog.meta.title}
        </h1>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{blog.meta.date}</span>
          {blog.meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-1.5 py-0.5 text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <hr className="my-4 border-border" />

      <Markdown content={blog.content} />
    </div>
  )
}
