import { notFound, redirect } from "next/navigation"
import { flashCardTopics, docHref } from "@/lib/topics-data"

export function generateStaticParams() {
  return flashCardTopics.map((t) => ({ slug: t.slug }))
}

// A topic has no page of its own — open its first doc.
export default async function TopicIndex({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = flashCardTopics.find((t) => t.slug === slug)
  if (!topic) notFound()

  redirect(docHref(topic.slug, topic.cards[0].id))
}
