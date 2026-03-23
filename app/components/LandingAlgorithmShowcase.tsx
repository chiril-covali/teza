"use client";

import { useEffect, useMemo, useState } from "react";

type BinarySearchStep = { lo: number; hi: number; mid: number; found?: boolean };
type EdmondsKarpStep = { path: string; delta: number; totalFlow: number; edges: Array<{ edge: string; flow: number; cap: number }> };
type KnapsackStep = { row: number; table: number[][] };
type BinomialStep = { rows: number[][]; n: number; k: number };

type ShowcaseItem = {
  slug: string;
  title: string;
  input: string;
  steps: Array<BinarySearchStep | EdmondsKarpStep | KnapsackStep | BinomialStep>;
};

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    slug: "matematica_binomial_coefficient",
    title: "Coeficient Binomial",
    input: "n = 5, k = 2",
    steps: [
      { rows: [[1]], n: 5, k: 2 },
      { rows: [[1], [1, 1]], n: 5, k: 2 },
      { rows: [[1], [1, 1], [1, 2, 1]], n: 5, k: 2 },
      { rows: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]], n: 5, k: 2 },
      { rows: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], n: 5, k: 2 },
      { rows: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]], n: 5, k: 2 },
    ],
  },
  {
    slug: "grafuri_edmonds_karp",
    title: "Edmonds-Karp",
    input: "source = S, sink = T",
    steps: [
      {
        path: "S -> A -> T",
        delta: 4,
        totalFlow: 4,
        edges: [
          { edge: "S-A", flow: 4, cap: 7 },
          { edge: "A-T", flow: 4, cap: 6 },
          { edge: "S-B", flow: 0, cap: 5 },
          { edge: "B-T", flow: 0, cap: 8 },
        ],
      },
      {
        path: "S -> B -> T",
        delta: 5,
        totalFlow: 9,
        edges: [
          { edge: "S-A", flow: 4, cap: 7 },
          { edge: "A-T", flow: 4, cap: 6 },
          { edge: "S-B", flow: 5, cap: 5 },
          { edge: "B-T", flow: 5, cap: 8 },
        ],
      },
      {
        path: "S -> A -> B -> T",
        delta: 2,
        totalFlow: 11,
        edges: [
          { edge: "S-A", flow: 6, cap: 7 },
          { edge: "A-T", flow: 4, cap: 6 },
          { edge: "A-B", flow: 2, cap: 3 },
          { edge: "B-T", flow: 7, cap: 8 },
        ],
      },
      {
        path: "fara drum de augmentare",
        delta: 0,
        totalFlow: 11,
        edges: [
          { edge: "S-A", flow: 6, cap: 7 },
          { edge: "A-T", flow: 4, cap: 6 },
          { edge: "S-B", flow: 5, cap: 5 },
          { edge: "B-T", flow: 7, cap: 8 },
        ],
      },
    ],
  },
  {
    slug: "cautare_binarySearch",
    title: "Cautare Binara",
    input: "array = [3,8,12,17,23,31,42], target = 23",
    steps: [
      { lo: 0, hi: 6, mid: 3 },
      { lo: 4, hi: 6, mid: 5 },
      { lo: 4, hi: 4, mid: 4, found: true },
    ],
  },
  {
    slug: "programare-dinamica_knapsack",
    title: "Knapsack 0/1",
    input: "capacity = 7, weights = [1,3,4,5], values = [1,4,5,7]",
    steps: [
      {
        row: 1,
        table: [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1],
        ],
      },
      {
        row: 2,
        table: [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 4, 5, 5, 5, 5],
        ],
      },
      {
        row: 3,
        table: [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 4, 5, 5, 5, 5],
          [0, 1, 1, 4, 5, 6, 6, 9],
        ],
      },
      {
        row: 4,
        table: [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 4, 5, 5, 5, 5],
          [0, 1, 1, 4, 5, 6, 6, 9],
          [0, 1, 1, 4, 5, 7, 8, 9],
        ],
      },
    ],
  },
];

function isBinarySearchStep(step: ShowcaseItem["steps"][number]): step is BinarySearchStep {
  return "mid" in step;
}

function isEdmondsKarpStep(step: ShowcaseItem["steps"][number]): step is EdmondsKarpStep {
  return "totalFlow" in step;
}

function isKnapsackStep(step: ShowcaseItem["steps"][number]): step is KnapsackStep {
  return "row" in step;
}

function isBinomialStep(step: ShowcaseItem["steps"][number]): step is BinomialStep {
  return "rows" in step;
}

export default function LandingAlgorithmShowcase() {
  const [algoIndex, setAlgoIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const activeAlgorithm = SHOWCASE_ITEMS[algoIndex];
  const activeStep = activeAlgorithm.steps[stepIndex];

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next < activeAlgorithm.steps.length) return next;
        return 0;
      });
    }, 1400);

    return () => window.clearInterval(stepTimer);
  }, [activeAlgorithm.steps.length]);

  useEffect(() => {
    const algoTimer = window.setInterval(() => {
      setAlgoIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
      setStepIndex(0);
    }, 7000);

    return () => window.clearInterval(algoTimer);
  }, []);

  const progress = useMemo(() => {
    if (activeAlgorithm.steps.length <= 1) return 100;
    return Math.round((stepIndex / (activeAlgorithm.steps.length - 1)) * 100);
  }, [activeAlgorithm.steps.length, stepIndex]);

  return (
    <div className="h-full w-full rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-black text-slate-900 sm:text-lg">{activeAlgorithm.title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">
          {activeAlgorithm.slug}
        </span>
      </div>

      <p className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-600">
        Input standard: {activeAlgorithm.input}
      </p>

      <div className="min-h-[230px] rounded-xl border border-slate-200 bg-slate-50 p-3">
        {isBinarySearchStep(activeStep) && (
          <BinarySearchMini step={activeStep} />
        )}
        {isEdmondsKarpStep(activeStep) && (
          <EdmondsKarpMini step={activeStep} />
        )}
        {isKnapsackStep(activeStep) && (
          <KnapsackMini step={activeStep} />
        )}
        {isBinomialStep(activeStep) && (
          <BinomialMini step={activeStep} />
        )}
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setAlgoIndex(idx);
                setStepIndex(0);
              }}
              className={`rounded-md px-2 py-1 text-[10px] font-black transition-colors ${
                idx === algoIndex ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BinarySearchMini({ step }: { step: BinarySearchStep }) {
  const values = [3, 8, 12, 17, 23, 31, 42];

  return (
    <div>
      <p className="mb-2 text-xs font-bold text-slate-600">target: 23</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value, idx) => {
          const inRange = idx >= step.lo && idx <= step.hi;
          const isMid = idx === step.mid;
          const isFound = isMid && step.found;
          return (
            <div
              key={`${value}-${idx}`}
              className={`h-10 w-10 rounded-lg border text-xs font-black flex items-center justify-center transition-all duration-300 ${
                isFound
                  ? "border-emerald-600 bg-emerald-500 text-white"
                  : isMid
                  ? "border-indigo-600 bg-indigo-500 text-white"
                  : inRange
                  ? "border-sky-200 bg-sky-100 text-sky-700"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EdmondsKarpMini({ step }: { step: EdmondsKarpStep }) {
  const positions: Record<string, { x: number; y: number }> = {
    S: { x: 36, y: 65 },
    A: { x: 112, y: 34 },
    B: { x: 112, y: 96 },
    T: { x: 192, y: 65 },
  };
  const graphEdges = [
    { from: "S", to: "A", cap: 7 },
    { from: "S", to: "B", cap: 5 },
    { from: "A", to: "B", cap: 3 },
    { from: "A", to: "T", cap: 6 },
    { from: "B", to: "T", cap: 8 },
  ];
  const flowMap = new Map(step.edges.map((entry) => [entry.edge, { flow: entry.flow, cap: entry.cap }]));

  const pathNodes = step.path.includes("->")
    ? step.path.split("->").map((token) => token.trim())
    : [];
  const pathPairs = new Set(
    pathNodes.slice(0, -1).map((node, idx) => `${node}-${pathNodes[idx + 1]}`)
  );

  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700">
        Drum augmentare: <span className="font-black">{step.path}</span> | Delta: <span className="font-black">{step.delta}</span>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-black text-indigo-700">
        Flux total: {step.totalFlow}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-2">
        <svg viewBox="0 0 228 130" className="h-[120px] w-full">
          {graphEdges.map((edge) => {
            const id = `${edge.from}-${edge.to}`;
            const info = flowMap.get(id);
            const flow = info?.flow ?? 0;
            const cap = info?.cap ?? edge.cap;
            const active = pathPairs.has(id);
            const from = positions[edge.from];
            const to = positions[edge.to];
            const flowRatio = cap > 0 ? flow / cap : 0;

            return (
              <g key={id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? "#6366f1" : "#94a3b8"}
                  strokeWidth={active ? 4 : 2.5}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#06b6d4"
                  strokeWidth={Math.max(1.2, 5 * flowRatio)}
                  strokeLinecap="round"
                  strokeDasharray={active ? "0" : "3 3"}
                  className="transition-all duration-700"
                />
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 6}
                  textAnchor="middle"
                  className="fill-slate-600 text-[8px] font-bold"
                >
                  {flow}/{cap}
                </text>
              </g>
            );
          })}

          {Object.entries(positions).map(([node, pos]) => (
            <g key={node}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={12}
                className={node === "S" || node === "T" ? "fill-indigo-500" : "fill-slate-700"}
              />
              <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="fill-white text-[9px] font-black">
                {node}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {step.edges.map((entry) => (
          <div key={entry.edge} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600">
            {entry.edge}: <span className="font-black text-slate-800">{entry.flow}/{entry.cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KnapsackMini({ step }: { step: KnapsackStep }) {
  const capacities = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-slate-600">Rand DP curent: {step.row}</p>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[360px] border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="border border-slate-200 px-2 py-1 text-left font-black">i\\W</th>
              {capacities.map((capacity) => (
                <th key={capacity} className="border border-slate-200 px-2 py-1 font-black">{capacity}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {step.table.map((rowValues, rowIndex) => (
              <tr key={rowIndex} className={rowIndex === step.row ? "bg-emerald-50" : "bg-white"}>
                <td className="border border-slate-200 px-2 py-1 font-black text-slate-700">{rowIndex}</td>
                {rowValues.map((value, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`border border-slate-200 px-2 py-1 text-center font-bold ${
                      rowIndex === step.row && colIndex === capacities.length - 1
                        ? "text-emerald-700"
                        : "text-slate-700"
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BinomialMini({ step }: { step: BinomialStep }) {
  return (
    <div className="space-y-1">
      {step.rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((cell, colIndex) => {
            const isTarget = rowIndex === step.n && colIndex === step.k;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-8 min-w-[28px] rounded-md border px-2 text-center text-[11px] font-black leading-8 transition-all ${
                  isTarget ? "border-emerald-600 bg-emerald-500 text-white" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
