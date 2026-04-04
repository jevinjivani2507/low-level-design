/** LeetCode-style level-order array → linked binary tree for layout */

export type TreeVizNode = {
  val: number
  left: TreeVizNode | null
  right: TreeVizNode | null
}

export function buildTreeFromLevelOrder(
  arr: (number | null)[]
): TreeVizNode | null {
  if (arr.length === 0 || arr[0] === null) return null
  const root: TreeVizNode = {
    val: arr[0]!,
    left: null,
    right: null,
  }
  const queue: TreeVizNode[] = [root]
  let i = 1
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!
    if (i < arr.length) {
      if (arr[i] !== null) {
        node.left = { val: arr[i]!, left: null, right: null }
        queue.push(node.left)
      }
      i++
    }
    if (i < arr.length) {
      if (arr[i] !== null) {
        node.right = { val: arr[i]!, left: null, right: null }
        queue.push(node.right)
      }
      i++
    }
  }
  return root
}

export type TreeNodePosition = {
  node: TreeVizNode
  x: number
  y: number
}

/** x in [0,1], y = depth (0 = root) */
export function layoutBinaryTree(
  root: TreeVizNode | null,
  depth: number,
  left: number,
  right: number,
  out: TreeNodePosition[]
): void {
  if (!root) return
  const x = (left + right) / 2
  out.push({ node: root, x, y: depth })
  const mid = (left + right) / 2
  layoutBinaryTree(root.left, depth + 1, left, mid, out)
  layoutBinaryTree(root.right, depth + 1, mid, right, out)
}

export function treeDepth(root: TreeVizNode | null): number {
  if (!root) return 0
  return 1 + Math.max(treeDepth(root.left), treeDepth(root.right))
}
