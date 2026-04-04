import { slidingWindow } from "./dsa/sliding-window"
import { binarySearch } from "./dsa/binary-search"
import { binaryTree } from "./dsa/binary-tree"
import { binarySearchTree } from "./dsa/binary-search-tree"

export const tags: string[] = ["striver-a2z", "neetcode-150"]

/** Extra UI on the DSA sheet (e.g. diagram from level-order array) */
export type DsaQuestionDisplayType = "TREE"

export interface TestCase {
  input: string
  output: string
  explanation?: string
  /** One or more level-order trees for `BinaryTreeDiagram`; not shown as text */
  diagrams?: (number | null)[][]
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
  tags?: typeof tags
  /** Optional marker for tree problems; diagrams use `testCases[].diagrams` */
  type?: DsaQuestionDisplayType
  codeLineHighlights?: { line: number; tone: "green" | "red" }[]
}

export interface DsaTopic {
  topic: string
  questions: DsaQuestion[]
}

export const dsaTopics: DsaTopic[] = [
  slidingWindow,
  binarySearch,
  binaryTree,
  binarySearchTree,
]
