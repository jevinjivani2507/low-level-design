"use client"

import { useId, useMemo } from "react"
import { cn } from "@/lib/utils"

const SIZE = 260
const CX = SIZE / 2
const CY = SIZE / 2
const R = 92
const NODE_R = 16
/** Corner inset for n=4: 0 TL, 1 TR, 2 BR, 3 BL (matches typical textbook drawings). */
const CORNER_D = 82
const LABEL_OFFSET = 11

export type GraphEdge = { from: number; to: number; weight?: number }

type GraphDiagramProps = {
  /**
   * Adjacency matrix, adjacency list, or (when `edgeList`) each row is
   * `[from, to]` or `[from, to, weight]` (e.g. LeetCode `flights`).
   */
  adjacency: number[][]
  /** When true, edges follow matrix/list direction and are drawn with arrows. */
  directed?: boolean
  /**
   * When true, `adjacency` is a list of edges (each row `[u,v]` or `[u,v,w]`),
   * not an adjacency matrix/list. Node count is inferred from max endpoint.
   */
  edgeList?: boolean
  className?: string
}

type NodePos = { x: number; y: number; id: number }

type Layout = { nodes: NodePos[]; edges: GraphEdge[]; n: number }

function isSquareMatrix(g: number[][]): boolean {
  const n = g.length
  if (n === 0) return true
  return g.every((row) => row.length === n)
}

function parseEdgeListRows(g: number[][]): { edges: GraphEdge[]; n: number } {
  const edges: GraphEdge[] = []
  let maxNode = -1
  for (const row of g) {
    if (row.length === 2) {
      const [from, to] = row
      edges.push({ from, to })
      maxNode = Math.max(maxNode, from, to)
    } else if (row.length >= 3) {
      const [from, to, w] = row
      edges.push({ from, to, weight: w })
      maxNode = Math.max(maxNode, from, to)
    }
  }
  return { edges, n: maxNode < 0 ? 0 : maxNode + 1 }
}

function edgesFromMatrixUndirected(g: number[][]): GraphEdge[] {
  const n = g.length
  const out: GraphEdge[] = []
  for (let i = 0; i < n; i++) {
    const row = g[i] ?? []
    for (let j = i + 1; j < n; j++) {
      if (row[j]) out.push({ from: i, to: j })
    }
  }
  return out
}

function edgesFromMatrixDirected(g: number[][]): GraphEdge[] {
  const n = g.length
  const out: GraphEdge[] = []
  for (let i = 0; i < n; i++) {
    const row = g[i] ?? []
    for (let j = 0; j < n; j++) {
      if (i !== j && row[j]) out.push({ from: i, to: j })
    }
  }
  return out
}

function edgesFromAdjacencyListUndirected(g: number[][]): GraphEdge[] {
  const seen = new Set<string>()
  const out: GraphEdge[] = []
  for (let u = 0; u < g.length; u++) {
    for (const v of g[u] ?? []) {
      const a = Math.min(u, v)
      const b = Math.max(u, v)
      if (a === b) continue
      const key = `${a},${b}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ from: a, to: b })
    }
  }
  return out
}

function edgesFromAdjacencyListDirected(g: number[][]): GraphEdge[] {
  const out: GraphEdge[] = []
  for (let u = 0; u < g.length; u++) {
    for (const v of g[u] ?? []) {
      if (u === v) continue
      out.push({ from: u, to: v })
    }
  }
  return out
}

function layoutNodes(n: number): NodePos[] {
  if (n === 4) {
    const d = CORNER_D
    return [
      { id: 0, x: CX - d, y: CY - d },
      { id: 1, x: CX + d, y: CY - d },
      { id: 2, x: CX + d, y: CY + d },
      { id: 3, x: CX - d, y: CY + d },
    ]
  }

  const nodes: NodePos[] = []
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    nodes.push({
      id: i,
      x: CX + R * Math.cos(angle),
      y: CY + R * Math.sin(angle),
    })
  }
  return nodes
}

function shortenSegment(
  fx: number,
  fy: number,
  tx: number,
  ty: number,
  rStart: number,
  rEnd: number
): { x1: number; y1: number; x2: number; y2: number } | null {
  const dx = tx - fx
  const dy = ty - fy
  const len = Math.hypot(dx, dy)
  if (len < 1e-6) return null
  const ux = dx / len
  const uy = dy / len
  return {
    x1: fx + ux * rStart,
    y1: fy + uy * rStart,
    x2: tx - ux * rEnd,
    y2: ty - uy * rEnd,
  }
}

function weightLabelPosition(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { lx: number; ly: number } {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  if (len < 1e-6) return { lx: mx, ly: my }
  const ox = (-dy / len) * LABEL_OFFSET
  const oy = (dx / len) * LABEL_OFFSET
  return { lx: mx + ox, ly: my + oy }
}

export function GraphDiagram({
  adjacency,
  directed = false,
  edgeList = false,
  className,
}: GraphDiagramProps) {
  const markerId = useId().replace(/:/g, "")

  const layout = useMemo((): Layout | null => {
    if (adjacency.length === 0) return null

    if (edgeList) {
      const { edges, n } = parseEdgeListRows(adjacency)
      if (n === 0 || edges.length === 0) return null
      return { nodes: layoutNodes(n), edges, n }
    }

    const n = adjacency.length
    const matrix = isSquareMatrix(adjacency)
    let edgeListOut: GraphEdge[]
    if (directed) {
      edgeListOut = matrix
        ? edgesFromMatrixDirected(adjacency)
        : edgesFromAdjacencyListDirected(adjacency)
    } else {
      edgeListOut = matrix
        ? edgesFromMatrixUndirected(adjacency)
        : edgesFromAdjacencyListUndirected(adjacency)
    }

    return { nodes: layoutNodes(n), edges: edgeListOut, n }
  }, [adjacency, directed, edgeList])

  if (layout === null) {
    return (
      <p className="text-xs text-muted-foreground">Empty graph</p>
    )
  }

  const { nodes, edges } = layout
  const showArrows = directed
  const label = edgeList
    ? "Edge list graph diagram"
    : directed
      ? "Directed graph diagram"
      : "Undirected graph diagram"

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={cn("w-full max-w-xs text-foreground", className)}
      role="img"
      aria-label={label}
    >
      {showArrows && (
        <defs>
          <marker
            id={markerId}
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
            markerWidth={8}
            markerHeight={8}
            refX={6}
            refY={4}
            viewBox="0 0 8 8"
          >
            <path
              d="M 0 0 L 8 4 L 0 8 z"
              className="fill-foreground"
              fillOpacity={0.75}
            />
          </marker>
        </defs>
      )}
      {edges.map((e, i) => {
        const nf = nodes[e.from]
        const nt = nodes[e.to]
        if (!nf || !nt) return null
        const seg = shortenSegment(
          nf.x,
          nf.y,
          nt.x,
          nt.y,
          NODE_R,
          showArrows ? NODE_R + 2 : NODE_R
        )
        if (!seg) return null
        const { lx, ly } = weightLabelPosition(seg.x1, seg.y1, seg.x2, seg.y2)
        const showWeight = e.weight !== undefined

        return (
          <g key={i}>
            <line
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x2}
              y2={seg.y2}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeOpacity={showArrows ? 0.75 : 0.55}
              markerEnd={showArrows ? `url(#${markerId})` : undefined}
            />
            {showWeight && (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-foreground font-mono text-[10px] font-medium tabular-nums"
              >
                {String(e.weight)}
              </text>
            )}
          </g>
        )
      })}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={NODE_R}
            className="fill-muted stroke-foreground"
            strokeWidth={1.5}
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-foreground text-[12px] font-medium"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  )
}
