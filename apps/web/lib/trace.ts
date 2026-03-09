export type TraceEvent =
  | { type: "compare"; indices: [number, number]; values?: [number, number]; note?: string; vars?: Record<string, unknown> }
  | { type: "swap"; indices: [number, number]; array: number[]; note?: string; vars?: Record<string, unknown> }
  | { type: "set"; index: number; value: number; array: number[]; note?: string; vars?: Record<string, unknown> }
  | { type: "visit_node"; node: string; note?: string; vars?: Record<string, unknown> }
  | { type: "queue"; action: "enqueue" | "dequeue"; node: string; note?: string; vars?: Record<string, unknown> }
  | { type: "update_distance"; node: string; distance: number; note?: string; vars?: Record<string, unknown> }
  | { type: "done"; result?: unknown; note?: string; vars?: Record<string, unknown> };
