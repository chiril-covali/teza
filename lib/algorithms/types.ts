export type TraceEvent =
  | CompareEvent
  | SwapEvent
  | SetEvent
  | VisitNodeEvent
  | QueueEvent
  | UpdateDistanceEvent
  | DoneEvent;

export interface CompareEvent {
  type: "compare";
  indices?: [number, number];
  values?: [number, number];
  array?: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface SwapEvent {
  type: "swap";
  indices: [number, number];
  array: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface SetEvent {
  type: "set";
  index: number;
  value: number;
  array: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface VisitNodeEvent {
  type: "visit_node";
  node: string;
  array?: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface QueueEvent {
  type: "queue";
  action: "enqueue" | "dequeue";
  node: string;
  array?: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface UpdateDistanceEvent {
  type: "update_distance";
  node: string;
  distance: number;
  array?: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface DoneEvent {
  type: "done";
  result?: Record<string, any>;
  array?: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface AlgorithmResult {
  trace: TraceEvent[];
  result: Record<string, any>;
}

export interface AlgorithmMeta {
  slug: string;
  name: string;
  complexity: string;
  description: string;
  category: string;
  source?: string;
}
