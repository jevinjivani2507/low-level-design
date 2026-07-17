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
