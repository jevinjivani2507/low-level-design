import { slidingWindow } from "./dsa/sliding-window"
import { binarySearch } from "./dsa/binary-search"
import { binaryTree } from "./dsa/binary-tree"

export interface TestCase {
  input: string
  output: string
  explanation?: string
}

export interface DsaQuestion {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  leetcodeUrl: string
  question: string
  testCases?: TestCase[]
  code: string
  timeComplexity: string
  spaceComplexity: string
  notes: string
  /** Curated lists (e.g. striver-a2z, neetcode-150); omit or [] if none */
  tags?: string[]
}

export interface DsaTopic {
  topic: string
  questions: DsaQuestion[]
}

export const dsaTopics: DsaTopic[] = [slidingWindow, binarySearch, binaryTree]

/** Distinct tag strings across all questions, sorted for stable UI */
export function getAllTags(topics: DsaTopic[]): string[] {
  const seen = new Set<string>()
  for (const t of topics) {
    for (const q of t.questions) {
      for (const tag of q.tags ?? []) {
        seen.add(tag)
      }
    }
  }
  return [...seen].sort((a, b) => a.localeCompare(b))
}
