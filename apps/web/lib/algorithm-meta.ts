import { TraceEvent } from "./trace";

export interface Complexity {
  best: string;
  average: string;
  worst: string;
}

export interface VisualizationMeta {
  kind: "array" | "graph";
}

export interface AlgorithmMeta {
  slug: string;
  name: string;
  category: string;
  difficulty: string;
  summary: string;
  timeComplexity: Complexity;
  spaceComplexity: string;
  visualization: VisualizationMeta;
  inputSchema: Record<string, unknown>;
  defaultInput: Record<string, unknown>;
}

export interface RunResponse {
  trace: TraceEvent[];
  result: Record<string, unknown>;
  meta: { steps: number };
}
