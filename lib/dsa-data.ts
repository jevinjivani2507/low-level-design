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

import { slidingWindow } from "./dsa/sliding-window"

export const dsaTopics: DsaTopic[] = [slidingWindow]
