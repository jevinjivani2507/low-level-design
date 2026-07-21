import { DocsSidebar } from "@/components/blogs/docs-sidebar"

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-6xl md:flex md:gap-4">
      <DocsSidebar />
      <main className="min-w-0 flex-1 px-6 py-10 md:px-10 md:py-14">
        {children}
      </main>
    </div>
  )
}
