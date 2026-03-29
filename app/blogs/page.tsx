import Link from "next/link"
import { getAllBlogs } from "@/lib/blogs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Blogs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Notes and write-ups.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            LLD
          </Link>
          <Link
            href="/dsa"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            DSA
          </Link>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          No blogs yet. Add a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">.md</code> file under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">blogs/</code> to get
          started.
        </div>
      ) : (
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((b, i) => (
                <TableRow key={b.slug}>
                  <TableCell className="text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/blogs/${b.slug}`}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      {b.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {b.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {b.tags.map((tag) => (
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
