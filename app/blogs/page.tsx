import { redirect } from "next/navigation"
import { flashCardTopics, docHref } from "@/lib/topics-data"

// The docs experience always opens on a specific doc — send /blogs to the first one.
export default function BlogsIndex() {
  const topic = flashCardTopics[0]
  redirect(docHref(topic.slug, topic.cards[0].id))
}
