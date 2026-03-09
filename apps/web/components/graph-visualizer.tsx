"use client";

import { TraceEvent } from "@lib/trace";
import { useMemo } from "react";

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
  const activeNode = event?.type === "visit_node" || event?.type === "visit" ? event.node : undefined;
  const queuedNode = event?.type === "queue" ? event.node : undefined;
  const updatedNode = event?.type === "update_distance" ? event.node : undefined;
  const currentNode = event?.type === "pop_stack" || event?.type === "push_stack" ? (event as any).current || (event as any).node : undefined;

  // Calculăm poziții pentru noduri într-o dispunere circulară
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const centerX = 300;
    const centerY = 200;
    const radius = 120;
    
    nodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
      positions[node] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
    
    return positions;
  }, [nodes]);

  // Determinăm starea fiecărui nod
  const getNodeState = (node: string) => {
    const nodeData = (event as any)?.nodes?.[node];
    if (nodeData) {
      if (nodeData.type === "current" || node === currentNode || node === activeNode) return "current";
      if (nodeData.visited) return "visited";
    }
    if (node === updatedNode) return "updated";
    if (node === queuedNode) return "queued";
    return "default";
  };

  return (
    <div className="space-y-4">
      {/* Vizualizare grafică SVG */}
      <div className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
        <svg width="100%" height="420" viewBox="0 0 600 420" className="mx-auto">
          {/* Desenăm muchiile */}
          <g>
            {edges.map((edge, i) => {
              const from = nodePositions[edge.from];
              const to = nodePositions[edge.to];
              if (!from || !to) return null;
              
              return (
                <g key={`edge-${i}`}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#cbd5e1"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  {edge.weight !== undefined && (
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 8}
                      fill="#475569"
                      fontSize="14"
                      fontWeight="600"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {edge.weight}
                    </text>
                  )}
                  {/* Săgeată pentru direcție */}
                  <polygon
                    points={`${to.x},${to.y} ${to.x - 8},${to.y - 5} ${to.x - 8},${to.y + 5}`}
                    fill="#94a3b8"
                    transform={`rotate(${Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI}, ${to.x}, ${to.y})`}
                  />
                </g>
              );
            })}
          </g>
          
          {/* Desenăm nodurile */}
          <g>
            {nodes.map((node) => {
              const pos = nodePositions[node];
              const state = getNodeState(node);
              
              let fillColor = "#ffffff";
              let strokeColor = "#94a3b8";
              let strokeWidth = "3";
              let scale = 1;
              
              if (state === "current") {
                fillColor = "#fef3c7";
                strokeColor = "#f59e0b";
                strokeWidth = "4";
                scale = 1.15;
              } else if (state === "visited") {
                fillColor = "#d1fae5";
                strokeColor = "#10b981";
                strokeWidth = "3";
              } else if (state === "updated") {
                fillColor = "#dbeafe";
                strokeColor = "#3b82f6";
                strokeWidth = "3";
              } else if (state === "queued") {
                fillColor = "#e0e7ff";
                strokeColor = "#6366f1";
                strokeWidth = "3";
              }
              
              return (
                <g 
                  key={node} 
                  transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}
                  className="transition-all duration-500"
                >
                  {/* Cerc fundal pentru efect de glow */}
                  {state === "current" && (
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      fill={strokeColor}
                      opacity="0.2"
                      className="animate-ping"
                    />
                  )}
                  
                  {/* Nodul principal */}
                  <circle
                    cx="0"
                    cy="0"
                    r="24"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="transition-all duration-300 drop-shadow-lg"
                  />
                  
                  {/* Eticheta nodului */}
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#1e293b"
                    fontSize="18"
                    fontWeight="700"
                    className="pointer-events-none select-none"
                  >
                    {node}
                  </text>
                  
                  {/* Distanța (pentru Dijkstra) */}
                  {distances && distances[node] !== undefined && (
                    <text
                      x="0"
                      y="38"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="12"
                      fontWeight="600"
                      className="pointer-events-none"
                    >
                      d={distances[node] === Infinity ? "∞" : distances[node]}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      
      {/* Legendă */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
          <div className="w-3 h-3 rounded-full bg-amber-100 border-2 border-amber-500"></div>
          <span className="text-amber-900 font-medium">Nod curent</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
          <div className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-500"></div>
          <span className="text-emerald-900 font-medium">Nod vizitat</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="w-3 h-3 rounded-full bg-white border-2 border-slate-400"></div>
          <span className="text-slate-700 font-medium">Nod nevizitat</span>
        </div>
      </div>
    </div>
  );
}
