export type TraceEvent =
  | { type: "compare"; indices: [number, number]; values?: [number, number]; note?: string }
  | { type: "swap"; indices: [number, number]; array: number[]; note?: string }
  | { type: "set"; index: number; value: number; array: number[]; note?: string }
  | { type: "visit_node"; node: string; note?: string }
  | { type: "queue"; action: "enqueue" | "dequeue"; node: string; note?: string }
  | { type: "update_distance"; node: string; distance: number; note?: string }
  | { type: "done"; result?: unknown; note?: string };
