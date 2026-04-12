import { slidingWindow } from "./dsa/sliding-window"
import { binarySearch } from "./dsa/binary-search"
import { binaryTree } from "./dsa/binary-tree"
import { binarySearchTree } from "./dsa/binary-search-tree"
import { graph } from "./dsa/graph"
export const tags: string[] = ["striver-a2z", "neetcode-150"]

/** Extra UI on the DSA sheet (e.g. diagram from level-order array) */
export type DsaQuestionDisplayType = "TREE"

export interface TestCase {
  input: string
  output: string
  explanation?: string
  /** One or more level-order trees for `BinaryTreeDiagram`; not shown as text */
  trees?: (number | null)[][]
  /** One or more 2D number grids for `MatrixDiagram` */
  matrices?: number[][][]
  /**
   * Graphs for `GraphDiagram`: either an n×n adjacency matrix (e.g.
   * `isConnected`), a LeetCode-style adjacency list `graph[u] = neighbors`, or
   * (when `graphsAsEdgeList`) each row is `[u, v]` or `[u, v, weight]` (e.g.
   * `flights`).
   * Use `graphsDirected` so matrix/list edges are interpreted and drawn as
   * directed (arrows) vs undirected.
   */
  graphs?: number[][][]
  /** Per-example or per-diagram: pass `true` for directed graphs (arrows). */
  graphsDirected?: boolean | boolean[]
  /**
   * When true, each row of each graph is an edge `[from, to]` or
   * `[from, to, weight]`, not an adjacency matrix/list.
   */
  graphsAsEdgeList?: boolean | boolean[]
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
  /** Optional marker for tree problems; trees use `testCases[].trees` */
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
  graph,
]
