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
}

export interface DsaTopic {
  topic: string
  questions: DsaQuestion[]
}

export const dsaTopics: DsaTopic[] = [slidingWindow, binarySearch, binaryTree]
