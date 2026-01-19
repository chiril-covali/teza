"use client";

import { TraceEvent } from "@lib/trace";

export function GraphVisualizer({
  nodes,
  edges,
  event,
  distances,
}: {
  nodes: string[];
  edges: { from: string; to: string; weight?: number }[];
  event?: TraceEvent;
  distances?: Record<string, number>;
}) {
  const activeNode = event?.type === "visit_node" ? event.node : undefined;
  const queuedNode = event?.type === "queue" ? event.node : undefined;
  const updatedNode = event?.type === "update_distance" ? event.node : undefined;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
        <div className="text-sm text-slate-300 mb-2">Nodes</div>
        <div className="flex flex-wrap gap-2">
          {nodes.map((node) => {
            const isActive = node === activeNode;
            const isQueued = node === queuedNode;
            const isUpdated = node === updatedNode;
            return (
              <span
                key={node}
                className={`rounded-full px-3 py-1 text-sm border ${
                  isActive
                    ? "border-amber-300 text-amber-200"
                    : isUpdated
                      ? "border-emerald-300 text-emerald-200"
                      : isQueued
                        ? "border-sky-300 text-sky-200"
                        : "border-slate-700 text-slate-200"
                }`}
              >
                {node}
                {distances && distances[node] !== undefined && ` · ${distances[node]}`}
              </span>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
        <div className="text-sm text-slate-300 mb-2">Edges</div>
        <div className="space-y-1 text-sm text-slate-200">
          {edges.map((edge, i) => (
            <div key={`${edge.from}-${edge.to}-${i}`} className="flex items-center justify-between">
              <span>
                {edge.from} → {edge.to}
              </span>
              {edge.weight !== undefined && <span className="text-slate-400">w={edge.weight}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
