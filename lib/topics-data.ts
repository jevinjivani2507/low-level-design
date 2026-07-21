import { reactInterviewQuestions } from "./topics/react"
import { javascriptInterviewNotes } from "./topics/javascript"
import { jsMachineCoding } from "./topics/js-machine-coding"
import { amazonLpStories } from "./topics/amazon-lp-stories"

export interface FlashCard {
  id: string
  title: string
  bullets: string[]
  code?: string
  language?: string // "js" | "ts" | "tsx" — defaults to "js"
}

export interface FlashCardTopic {
  slug: string
  title: string
  tags: string[]
  cards: FlashCard[]
}

export const flashCardTopics: FlashCardTopic[] = [
  amazonLpStories,
  reactInterviewQuestions,
  javascriptInterviewNotes,
  jsMachineCoding,
]

/** One doc = one card, carrying its parent topic for the docs sidebar/pager. */
export interface DocRef {
  topicSlug: string
  topicTitle: string
  card: FlashCard
}

/** Every card flattened in topic order — drives prev/next and static params. */
export function getFlatDocs(): DocRef[] {
  return flashCardTopics.flatMap((topic) =>
    topic.cards.map((card) => ({
      topicSlug: topic.slug,
      topicTitle: topic.title,
      card,
    }))
  )
}

/** URL for a doc page. */
export function docHref(topicSlug: string, cardId: string): string {
  return `/blogs/${topicSlug}/${cardId}`
}
