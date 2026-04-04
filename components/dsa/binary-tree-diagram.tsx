"use client"

import { useMemo } from "react"
import {
  buildTreeFromLevelOrder,
  layoutBinaryTree,
  treeDepth,
  type TreeVizNode,
  type TreeNodePosition,
} from "@/lib/dsa/tree-visualization"
import { cn } from "@/lib/utils"

const PADDING = 28
const ROW_HEIGHT = 54
const NODE_R = 17

type BinaryTreeDiagramProps = {
  levelOrder: (number | null)[]
  className?: string
}

export function BinaryTreeDiagram({
  levelOrder,
  className,
}: BinaryTreeDiagramProps) {
  const { nodes, edges, width, height } = useMemo(
    () => computeLayout(levelOrder),
    [levelOrder]
  )

  if (nodes.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">Empty tree</p>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full max-w-md text-foreground", className)}
      role="img"
      aria-label="Binary tree diagram"
    >
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="currentColor"
          strokeWidth={1.25}
          className="text-foreground/80"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.px}
            cy={n.py}
            r={NODE_R}
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth={1.25}
            className="text-foreground"
          />
          <text
            x={n.px}
            y={n.py}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-foreground text-[13px] font-medium select-none"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {n.val}
          </text>
        </g>
      ))}
    </svg>
  )
}

function computeLayout(levelOrder: (number | null)[]) {
  const root = buildTreeFromLevelOrder(levelOrder)
  if (!root) {
    return { nodes: [] as PixelNode[], edges: [] as Edge[], width: 0, height: 0 }
  }

  const positions: TreeNodePosition[] = []
  layoutBinaryTree(root, 0, 0, 1, positions)

  const depth = treeDepth(root)
  const innerW = 360
  const width = innerW + PADDING * 2
  const height = PADDING * 2 + Math.max(depth, 1) * ROW_HEIGHT

  const posByNode = new Map<TreeVizNode, TreeNodePosition>()
  for (const p of positions) {
    posByNode.set(p.node, p)
  }

  const toPixel = (xNorm: number, yDepth: number) => ({
    px: PADDING + xNorm * innerW,
    py: PADDING + yDepth * ROW_HEIGHT + NODE_R * 0.35,
  })

  const nodes: PixelNode[] = positions.map((p) => {
    const { px, py } = toPixel(p.x, p.y)
    return { val: p.node.val, px, py }
  })

  const edges: Edge[] = []
  function walk(n: TreeVizNode | null) {
    if (!n) return
    const pa = posByNode.get(n)
    if (!pa) return
    const parent = toPixel(pa.x, pa.y)
    if (n.left) {
      const ca = posByNode.get(n.left)!
      const child = toPixel(ca.x, ca.y)
      edges.push({
        x1: parent.px,
        y1: parent.py + NODE_R,
        x2: child.px,
        y2: child.py - NODE_R,
      })
      walk(n.left)
    }
    if (n.right) {
      const ca = posByNode.get(n.right)!
      const child = toPixel(ca.x, ca.y)
      edges.push({
        x1: parent.px,
        y1: parent.py + NODE_R,
        x2: child.px,
        y2: child.py - NODE_R,
      })
      walk(n.right)
    }
  }
  walk(root)

  return { nodes, edges, width, height }
}

type PixelNode = { val: number; px: number; py: number }
type Edge = { x1: number; y1: number; x2: number; y2: number }
