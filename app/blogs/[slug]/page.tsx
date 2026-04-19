import { notFound } from "next/navigation"
import { flashCardTopics } from "@/lib/topics-data"
import { FlashCardViewer } from "./flash-card-viewer"

export function generateStaticParams() {
  return flashCardTopics.map((t) => ({ slug: t.slug }))
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = flashCardTopics.find((t) => t.slug === slug)
  if (!topic) notFound()

  return <FlashCardViewer topic={topic} />
}
