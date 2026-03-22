"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { AlgorithmMeta, TraceEvent, allAlgorithms } from "@/lib/algorithms";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { 
  PlayIcon, 
  PauseIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  ProjectIcon,
  CodeIcon,
  CommentDiscussionIcon,
  GearIcon,
  EyeIcon
} from "@primer/octicons-react";

function getCategoryTheme(category: string) {
    const value = category.toLowerCase();

    if (value.includes("backtracking")) {
        return {
            badge: "bg-amber-100 text-amber-800",
            iconWrap: "bg-amber-600 text-white",
            icon: <GearIcon size={16} />,
        };
    }

    if (value.includes("sort")) {
        return {
            badge: "bg-rose-100 text-rose-800",
            iconWrap: "bg-rose-600 text-white",
            icon: <ProjectIcon size={16} />,
        };
    }

    if (value.includes("cautare")) {
        return {
            badge: "bg-cyan-100 text-cyan-800",
            iconWrap: "bg-cyan-600 text-white",
            icon: <EyeIcon size={16} />,
        };
    }

    if (value.includes("graf")) {
        return {
            badge: "bg-indigo-100 text-indigo-800",
            iconWrap: "bg-indigo-600 text-white",
            icon: <ProjectIcon size={16} />,
        };
    }

    if (value.includes("dinamic")) {
        return {
            badge: "bg-emerald-100 text-emerald-800",
            iconWrap: "bg-emerald-600 text-white",
            icon: <CodeIcon size={16} />,
        };
    }

    if (value.includes("structuri")) {
        return {
            badge: "bg-sky-100 text-sky-800",
            iconWrap: "bg-sky-600 text-white",
            icon: <CodeIcon size={16} />,
        };
    }

    if (value.includes("matemat")) {
        return {
            badge: "bg-lime-100 text-lime-800",
            iconWrap: "bg-lime-600 text-white",
            icon: <CodeIcon size={16} />,
        };
    }

    if (value.includes("bit")) {
        return {
            badge: "bg-violet-100 text-violet-800",
            iconWrap: "bg-violet-600 text-white",
            icon: <CodeIcon size={16} />,
        };
    }

    if (value.includes("cifr")) {
        return {
            badge: "bg-fuchsia-100 text-fuchsia-800",
            iconWrap: "bg-fuchsia-600 text-white",
            icon: <CommentDiscussionIcon size={16} />,
        };
    }

    if (value.includes("diverse")) {
        return {
            badge: "bg-orange-100 text-orange-800",
            iconWrap: "bg-orange-600 text-white",
            icon: <GearIcon size={16} />,
        };
    }

    return {
        badge: "bg-slate-100 text-slate-700",
        iconWrap: "bg-slate-700 text-white",
        icon: <ProjectIcon size={16} />,
    };
}

interface AlgorithmPlayerProps {
	meta: AlgorithmMeta;
    docMarkdown: string;
}

function getSourceFileName(slug: string) {
    const fileBase = slug.split("_").slice(1).join("_") || slug;
    return `${fileBase}.ts`;
}

function SortingVisualizer({ event, input, slug }: { event: TraceEvent; input: any; slug: string }) {
    const array = (event as any).array || input.array || [];
    const highlightIndices = (event as any).indices || [];
    const currentIndex = (event as any).index !== undefined ? [(event as any).index] : [];
    const vars = (event as any).vars || {};
    
    const lo = vars.lo !== undefined ? vars.lo : -1;
    const hi = vars.hi !== undefined ? vars.hi : -1;
    const mid = vars.mid !== undefined ? vars.mid : -1;

    const maxVal = Math.max(...array, 1);

    return (
        <div className="w-full flex items-end justify-center gap-1.5 h-[400px] px-2">
            {array.map((val: number, idx: number) => {
                let color = "bg-slate-200";
                let shadow = "";
                const isHighlighted = highlightIndices.includes(idx) || currentIndex.includes(idx) || idx === mid;
                const isInRange = lo !== -1 && hi !== -1 && idx >= lo && idx <= hi;

                if (isHighlighted) {
                    color = "bg-gradient-to-t from-indigo-600 to-indigo-400 ring-2 ring-indigo-500 ring-offset-2";
                    shadow = "shadow-[0_-4px_20px_rgba(79,70,229,0.4)]";
                } else if (isInRange) {
                    color = "bg-indigo-100";
                }

                return (
                    <div key={idx} className="flex flex-col items-center flex-1 max-w-[60px] relative group">
                        <div 
                            className={`w-full rounded-t-xl transition-all duration-500 ease-out ${color} ${shadow}`}
                            style={{ height: `${(val / maxVal) * 100}%` }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-md transition-opacity pointer-events-none font-bold">
                                {val}
                            </div>
                        </div>
                        <span className="mt-3 text-[11px] font-black text-slate-400 font-mono">{val}</span>
                        <div className="h-6 flex items-center justify-center">
                            {idx === mid && <span className="text-[9px] font-black text-indigo-700 uppercase tracking-tighter">mid</span>}
                            {idx === lo && idx !== mid && <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">lo</span>}
                            {idx === hi && idx !== mid && <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">hi</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function SearchVisualizer({ event, input }: { event: TraceEvent; input: any }) {
    const array = (event as any).array || input.array || [];
    const vars = (event as any).vars || {};
    const lo = vars.lo !== undefined ? vars.lo : -1;
    const hi = vars.hi !== undefined ? vars.hi : -1;
    const mid = vars.mid !== undefined ? vars.mid : -1;
    const current = vars.current !== undefined ? vars.current : -1;
    const activeIdx = mid !== -1 ? mid : current;
    const isFound = (event as any).type === "mark_found" && (event as any).found === true;
    const isNotFound = (event as any).type === "mark_found" && (event as any).found === false;

    return (
        <div className="w-full overflow-x-auto pb-6">
            <div className="flex items-stretch justify-center gap-2 min-w-max mx-auto px-4">
                {array.map((val: number, idx: number) => {
                    const isActive = idx === activeIdx;
                    const inRange = lo !== -1 && hi !== -1 && idx >= lo && idx <= hi;
                    const isFoundIdx = isFound && isActive;
                    const isOutRange = (lo !== -1 && idx < lo) || (hi !== -1 && idx > hi);

                    let cellClass = "bg-slate-100 text-slate-500";
                    if (isFoundIdx) cellClass = "bg-emerald-500 text-white ring-4 ring-emerald-300 scale-110";
                    else if (isActive) cellClass = "bg-indigo-600 text-white ring-4 ring-indigo-300 scale-110";
                    else if (isNotFound && inRange) cellClass = "bg-rose-100 text-rose-500";
                    else if (inRange) cellClass = "bg-indigo-100 text-indigo-700";
                    else if (isOutRange) cellClass = "bg-slate-50 text-slate-300";

                    return (
                        <div key={idx} className="flex flex-col items-center gap-1">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-mono font-black text-sm transition-all duration-300 ${cellClass}`}>
                                {val}
                            </div>
                            <div className="h-5 flex items-center justify-center gap-0.5">
                                {idx === lo && <span className="text-[9px] font-black text-sky-600 uppercase">lo</span>}
                                {idx === hi && <span className="text-[9px] font-black text-amber-600 uppercase">hi</span>}
                                {idx === mid && <span className="text-[9px] font-black text-indigo-700 uppercase">mid</span>}
                                {idx === current && mid === -1 && <span className="text-[9px] font-black text-indigo-700 uppercase">cur</span>}
                            </div>
                            <span className="text-[9px] text-slate-300 font-mono">{idx}</span>
                        </div>
                    );
                })}
            </div>
            {isFound && (
                <p className="text-center mt-4 text-emerald-600 font-black text-sm">✓ Elementul a fost găsit</p>
            )}
            {isNotFound && (
                <p className="text-center mt-4 text-rose-500 font-black text-sm">✗ Elementul nu a fost găsit</p>
            )}
        </div>
    );
}

function GraphVisualizer({ event, input }: { event: TraceEvent; input: any }) {
    const nodes: string[] = input.nodes || [];
    const edges: { from: string; to: string; weight?: number }[] = input.edges || [];
    const vars = (event as any).vars || {};

    // Build visited set and queue from vars
    const visited: Set<string> = new Set(
        Array.isArray(vars.visited) ? vars.visited : vars.visited ? [vars.visited] : []
    );
    const inQueue: Set<string> = new Set(
        Array.isArray(vars.queue) ? vars.queue : vars.queue ? [vars.queue] : []
    );
    const distances: Record<string, number> = vars.distances || {};
    const currentNode: string = (event as any).node || vars.current || "";

    // Simple circular layout
    const cx = 240, cy = 200, r = 140;
    const nodeCount = nodes.length;
    const nodePositions: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n, i) => {
        const angle = (i / nodeCount) * 2 * Math.PI - Math.PI / 2;
        nodePositions[n] = {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle),
        };
    });

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <svg width="480" height="400" viewBox="0 0 480 400" className="overflow-visible max-w-full">
                {/* Edges */}
                {edges.map((e, i) => {
                    const from = nodePositions[e.from];
                    const to = nodePositions[e.to];
                    if (!from || !to) return null;
                    const isActive =
                        (e.from === currentNode || e.to === currentNode) &&
                        (visited.has(e.from) || visited.has(e.to));
                    return (
                        <g key={i}>
                            <line
                                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                stroke={isActive ? "#6366f1" : "#e2e8f0"}
                                strokeWidth={isActive ? 2.5 : 1.5}
                                strokeLinecap="round"
                            />
                            {e.weight !== undefined && (
                                <text
                                    x={(from.x + to.x) / 2}
                                    y={(from.y + to.y) / 2 - 6}
                                    fontSize="10"
                                    fill="#94a3b8"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                >
                                    {e.weight}
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((n) => {
                    const pos = nodePositions[n];
                    if (!pos) return null;
                    const isCurrent = n === currentNode;
                    const isVisited = visited.has(n);
                    const isQueued = inQueue.has(n);

                    let fill = "#f8fafc";
                    let stroke = "#cbd5e1";
                    let textFill = "#64748b";
                    if (isCurrent) { fill = "#6366f1"; stroke = "#4338ca"; textFill = "#fff"; }
                    else if (isVisited) { fill = "#a5b4fc"; stroke = "#6366f1"; textFill = "#3730a3"; }
                    else if (isQueued) { fill = "#fef3c7"; stroke = "#f59e0b"; textFill = "#92400e"; }

                    const dist = distances[n];

                    return (
                        <g key={n}>
                            <circle
                                cx={pos.x} cy={pos.y} r={22}
                                fill={fill} stroke={stroke} strokeWidth={2}
                                className="transition-all duration-300"
                            />
                            <text
                                x={pos.x} y={pos.y + 1}
                                textAnchor="middle" dominantBaseline="middle"
                                fontSize="12" fontWeight="900" fill={textFill}
                            >
                                {n}
                            </text>
                            {dist !== undefined && (
                                <text
                                    x={pos.x} y={pos.y + 34}
                                    textAnchor="middle"
                                    fontSize="10" fontWeight="700" fill="#6366f1"
                                >
                                    d={dist === Infinity ? "∞" : dist}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            <div className="flex flex-wrap justify-center gap-3 text-xs font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Curent</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-200 inline-block" /> Vizitat</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-400 inline-block" /> În coadă</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300 inline-block" /> Nevizitat</span>
            </div>
        </div>
    );
}

function DPVisualizer({ event, input }: { event: TraceEvent; input: any }) {
    const ev = event as any;
    const table: number[][] = ev.table || [];
    const currentRow: number = ev.row !== undefined ? ev.row : -1;
    const currentCol: number = ev.col !== undefined ? ev.col : -1;

    if (table.length === 0) {
        return (
            <div className="text-slate-400 text-sm font-medium py-8 text-center">
                Tabelul DP va apărea odată ce algoritmul începe execuția.
            </div>
        );
    }

    const maxRows = Math.min(table.length, 12);
    const maxCols = Math.min(table[0]?.length ?? 0, 16);

    return (
        <div className="w-full overflow-x-auto pb-4">
            <table className="mx-auto border-collapse text-xs font-mono">
                <tbody>
                    {table.slice(0, maxRows).map((row, ri) => (
                        <tr key={ri}>
                            {row.slice(0, maxCols).map((cell, ci) => {
                                const isCurrent = ri === currentRow && ci === currentCol;
                                const isCurrentRow = ri === currentRow;
                                return (
                                    <td
                                        key={ci}
                                        className={`w-9 h-9 text-center border transition-all duration-300 font-black ${
                                            isCurrent
                                                ? "bg-indigo-600 text-white border-indigo-700 scale-105 z-10 relative shadow-lg"
                                                : isCurrentRow
                                                ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                                : "bg-white text-slate-600 border-slate-200"
                                        }`}
                                    >
                                        {cell}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentRow >= 0 && (
                <p className="text-center mt-3 text-xs text-slate-500 font-medium">
                    Calculez dp[{currentRow}][{currentCol}] = {ev.value}
                </p>
            )}
        </div>
    );
}

function GenericVisualizer({ event }: { event: TraceEvent }) {
    const ev = event as any;
    const array: number[] = ev.array || [];

    const renderValue = (val: any): string => {
        if (Array.isArray(val)) return `[${val.join(", ")}]`;
        if (typeof val === "object" && val !== null) return JSON.stringify(val);
        return String(val);
    };

    return (
        <div className="w-full space-y-6">
            {array.length > 0 && (
                <div className="overflow-x-auto pb-4">
                    <div className="flex items-stretch justify-center gap-2 min-w-max mx-auto px-4">
                        {array.map((val, idx) => {
                            const isCurrent = ev.index === idx;
                            return (
                                <div key={idx} className="flex flex-col items-center gap-1">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-mono font-black text-sm transition-all duration-300 ${
                                        isCurrent ? "bg-indigo-600 text-white ring-4 ring-indigo-300 scale-110" : "bg-slate-100 text-slate-600"
                                    }`}>
                                        {val}
                                    </div>
                                    <span className="text-[9px] text-slate-300 font-mono">{idx}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {ev.vars && Object.keys(ev.vars).length > 0 && (
                <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(ev.vars).map(([key, val]) => (
                        <div key={key} className="px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-left min-w-[100px] max-w-[200px]">
                            <div className="text-[9px] font-black text-indigo-400 uppercase mb-1 tracking-wider">{key}</div>
                            <div className="font-mono text-sm font-black text-indigo-700 truncate">
                                {renderValue(val)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



function AlgorithmPlayer({ meta, docMarkdown }: AlgorithmPlayerProps) {
	const [input, setInput] = useState<Record<string, any>>({});
    const [rawInput, setRawInput] = useState<string>("");
	const [trace, setTrace] = useState<TraceEvent[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [delay, setDelay] = useState(800);
	const [explanation, setExplanation] = useState<string>("");
	const [question, setQuestion] = useState<string>("");
	const [chat, setChat] = useState<Array<{ role: string; content: string }>>(
		[]
	);
    const [chatLoading, setChatLoading] = useState(false);
    const [tab, setTab] = useState<"descriere" | "viz" | "input" | "chat" | "code">("descriere");
    const [sourceCode, setSourceCode] = useState<string>("");
    const [sourceFile, setSourceFile] = useState<string>("");

    // Keyboard navigation: ← previous step, → next step, Space toggle play
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
            if (e.key === "ArrowRight") {
                e.preventDefault();
                setCurrentStep((s) => Math.min(s + 1, trace.length - 1));
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                setCurrentStep((s) => Math.max(s - 1, 0));
            } else if (e.key === " ") {
                e.preventDefault();
                setPlaying((p) => !p);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [trace.length]);

	useEffect(() => {
        const vizType = meta.visualizerType || "none";
        const slug = meta.slug;
		if (vizType === "sorting") {
            const defaultArray = [64, 34, 25, 12, 22, 11, 90];
			setInput({ array: defaultArray });
            setRawInput(defaultArray.join(", "));
		} else if (vizType === "search") {
            const defaultArray = [11, 12, 22, 25, 34, 64, 90];
			setInput({ array: defaultArray, target: 22 });
            setRawInput(defaultArray.join(", "));
        } else if (vizType === "graph") {
            const defaultData = {
				nodes: ["A", "B", "C", "D", "E"],
				edges: [
					{ from: "A", to: "B", weight: 4 },
					{ from: "A", to: "C", weight: 2 },
					{ from: "B", to: "D", weight: 3 },
					{ from: "C", to: "D", weight: 1 },
					{ from: "D", to: "E", weight: 5 },
				],
				start: "A",
			};
			setInput(defaultData);
            setRawInput(JSON.stringify(defaultData, null, 2));
        } else if (vizType === "dp") {
            if (slug.includes("lcs")) {
                const defaultData = { text1: "ABCBDAB", text2: "BDCAB" };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("coin_change")) {
                const defaultData = { money: 11, coins: [1, 5, 6, 9] };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("knapsack")) {
                const defaultData = { capacity: 10, weights: [2, 3, 4, 5], values: [3, 4, 5, 6] };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else {
                const defaultData = { capacity: 6, weights: [1, 2, 3], values: [1, 6, 10] };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            }
        } else if (vizType === "generic") {
            if (slug.includes("fibonacci")) {
                const defaultData = { n: 10 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("factorial")) {
                const defaultData = { n: 7 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("sieve")) {
                const defaultData = { n: 50 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("add_binary")) {
                const defaultData = { a: "1010", b: "1011" };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("shuffle")) {
                const defaultData = { array: [1, 2, 3, 4, 5, 6] };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("absolute_value")) {
                const defaultData = { n: -7 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("is_palindrome")) {
                const defaultData = { n: 121 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("greatest_common_factor")) {
                const defaultData = { a: 48, b: 18 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("prime_factorization")) {
                const defaultData = { n: 84 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("log_two")) {
                const defaultData = { n: 16 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("is_power_of")) {
                const defaultData = { n: 16 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("generateparentheses")) {
                const defaultData = { n: 3 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else if (slug.includes("all_combinations")) {
                const defaultData = { n: 5, k: 2 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            } else {
                const defaultData = { n: 10 };
                setInput(defaultData);
                setRawInput(JSON.stringify(defaultData, null, 2));
            }
        } else {
            setInput({});
            setRawInput("{}");
		}
	}, [meta.slug, meta.visualizerType]);

	// Fetch source code from API
	useEffect(() => {
		const fetchSource = async () => {
			try {
				const response = await fetch(`/api/algoritmi/source?slug=${meta.slug}`);
				if (response.ok) {
					const data = await response.json();
					setSourceCode(data.source);
					setSourceFile(data.filePath);
				}
			} catch (error) {
				console.error("Failed to fetch source code:", error);
				setSourceCode("// Codul sursă nu este disponibil");
			}
		};
		
		if (meta.slug) {
			fetchSource();
		}
	}, [meta.slug]);

	const handleRun = async () => {
		try {
            const vizType = meta.visualizerType || "none";
            let finalInput = input;
            if (vizType === "sorting") {
                const arr = rawInput.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                finalInput = { array: arr };
                setInput(finalInput);
            } else if (vizType === "search") {
                const arr = rawInput.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                finalInput = { ...input, array: arr };
                setInput(finalInput);
            } else {
                try {
                    finalInput = JSON.parse(rawInput);
                    setInput(finalInput);
                } catch (e) { }
            }

			const result = await api.run(meta.slug, finalInput);
			setTrace(result.trace);
			setCurrentStep(0);
			setPlaying(true);
            setTab("viz");
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!playing || currentStep >= trace.length - 1) {
			setPlaying(false);
			return;
		}

		const timer = setTimeout(() => {
			setCurrentStep((prev) => prev + 1);
		}, delay);

		return () => clearTimeout(timer);
	}, [playing, currentStep, trace.length, delay]);

	useEffect(() => {
		if (trace.length > 0 && currentStep < trace.length) {
			const event = trace[currentStep];
            if (event.note) {
                setExplanation(event.note);
            } else {
                api
                    .explain(meta.slug, currentStep, event, { ...input, trace })
                    .then((res) => setExplanation(res.answer))
                    .catch(() => setExplanation("Pasul curent al algoritmului."));
            }
		}
	}, [currentStep, trace, meta.slug, input]);

	const handleChat = async () => {
        if (!question.trim() || chatLoading) return;
		const newChat = [...chat, { role: "user", content: question }];
		setChat(newChat);
		setQuestion("");
        setChatLoading(true);
		try {
			const result = await api.chat(meta.slug, question, {
				input,
				currentStepIndex: currentStep,
				currentEvent: trace[currentStep],
			});
            const answer = result.answer || "";
            setChat([...newChat, { role: "assistant", content: answer }]);
            setChatLoading(false);
		} catch (err) {
			console.error(err);
            setChatLoading(false);
            setChat((prev) => [...prev, { role: "assistant", content: "Nu am putut genera răspunsul acum. Reîncearcă, te rog." }]);
		}
	};

	const currentEvent = trace[currentStep];
    const vizType = meta.visualizerType || "none";
    const isArrayAlgo = vizType === "sorting" || vizType === "search";
    const sourceFileName = getSourceFileName(meta.slug);

	return (
		<div className="space-y-8">
            {/* Top Navigation & Info Bar */}
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex justify-center">
                <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1 overflow-x-auto no-scrollbar w-full justify-center">
                    {[
                        { id: "descriere", label: "Descriere", icon: <CommentDiscussionIcon /> },
                        { id: "input", label: "Date Intrare", icon: <GearIcon /> },
                        { id: "viz", label: "Vizualizare", icon: <EyeIcon /> },
                        { id: "chat", label: "Asistent AI", icon: <CommentDiscussionIcon /> },
                        { id: "code", label: "Cod Sursă", icon: <CodeIcon /> }
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id as any)}
                            className={`flex items-center justify-center gap-2 min-w-[150px] px-4 sm:px-6 py-2.5 rounded-xl border font-bold text-sm transition-all whitespace-nowrap ${
                                tab === t.id
                                    ? "bg-white border-slate-200 text-indigo-600 shadow-sm"
                                    : "border-transparent text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </div>
                </div>
            </div>

            <div className="space-y-6 min-h-[640px]">
                {tab === "descriere" && (
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-5">Descriere algoritm</h3>
                        <article className="prose prose-slate max-w-none prose-headings:font-black prose-p:leading-relaxed prose-li:leading-relaxed">
                            <ReactMarkdown>
                                {docMarkdown || `# ${meta.name}\n\nDocumentația markdown nu este disponibilă încă pentru acest algoritm.`}
                            </ReactMarkdown>
                        </article>
                    </div>
                )}

                {tab === "viz" && (
                    <div className="grid gap-6 lg:grid-cols-12">
                        {/* Main Viz Column */}
                        <div className="lg:col-span-8 space-y-4">
                            {/* Controls bar */}
                            <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                        className="h-11 w-11 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 hover:bg-white hover:shadow-sm transition-all"
                                        title="Pasul anterior (←)"
                                    >
                                        <ChevronLeftIcon size={20} />
                                    </button>
                                    <button
                                        onClick={() => setPlaying(!playing)}
                                        className={`h-11 w-11 flex items-center justify-center rounded-full transition-all ${
                                            playing ? "bg-amber-100 text-amber-600" : "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                                        }`}
                                        title="Redă / Pauză (Spațiu)"
                                    >
                                        {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(Math.min(currentStep + 1, trace.length - 1))}
                                        className="h-11 w-11 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 hover:bg-white hover:shadow-sm transition-all"
                                        title="Pasul următor (→)"
                                    >
                                        <ChevronRightIcon size={20} />
                                    </button>
                                    <button 
                                        onClick={handleRun} 
                                        className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
                                    >
                                        Restart
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="min-w-[130px]">
                                        <div className="flex justify-between text-[9px] font-black text-slate-400 mb-1.5 uppercase tracking-widest">
                                            <span>Lent</span>
                                            <span>Rapid</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="100"
                                            max="4000"
                                            step="100"
                                            value={4100 - delay}
                                            onChange={(e) => setDelay(4100 - Number(e.target.value))}
                                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                        />
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pas</div>
                                        <div className="text-base font-black text-slate-900">
                                            {trace.length > 0 ? `${currentStep + 1} / ${trace.length}` : "0 / 0"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visualization box — fixed height, no layout shift */}
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                                 style={{ height: "520px" }}>
                                {currentEvent ? (
                                    <div className="h-full flex flex-col">
                                        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-50 shrink-0">
                                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em]">
                                                Pasul {currentStep + 1} • {currentEvent.type}
                                            </span>
                                            <div className="h-1.5 flex-1 mx-4 bg-slate-50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-400 transition-all duration-300"
                                                    style={{ width: `${trace.length > 0 ? ((currentStep + 1) / trace.length) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                                            {vizType === "sorting" ? (
                                                <SortingVisualizer event={currentEvent} input={input} slug={meta.slug} />
                                            ) : vizType === "search" ? (
                                                <SearchVisualizer event={currentEvent} input={input} />
                                            ) : vizType === "graph" ? (
                                                <GraphVisualizer event={currentEvent} input={input} />
                                            ) : vizType === "dp" ? (
                                                <DPVisualizer event={currentEvent} input={input} />
                                            ) : vizType === "generic" ? (
                                                <GenericVisualizer event={currentEvent} />
                                            ) : (
                                                <div className="py-10 text-center px-6">
                                                    {currentEvent.note && (
                                                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 max-w-xl mx-auto leading-tight">
                                                            {currentEvent.note}
                                                        </h3>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center space-y-5">
                                            <div className="h-20 w-20 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                                <PlayIcon size={36} />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-slate-900 font-black text-xl">Gata de simulare</p>
                                                <p className="text-slate-400 font-medium text-sm">Configurează datele de intrare sau apasă Restart.</p>
                                                <p className="text-slate-300 text-xs mt-1">Tastele ← → pentru pași, Spațiu pentru redare</p>
                                                {meta.status === "source-only" && (
                                                    <p className="text-amber-600 text-xs font-bold mt-2 px-4 py-2 bg-amber-50 rounded-xl inline-block">
                                                        ⚠ Vizualizare pas-cu-pas indisponibilă — cod sursă disponibil în tab-ul "Cod Sursă".
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-4 space-y-4">
                            {/* Explanation */}
                            <div className="p-6 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group" style={{ minHeight: "160px" }}>
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <CommentDiscussionIcon size={100} />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                            <CommentDiscussionIcon size={14} />
                                        </div>
                                        <h4 className="font-black text-base tracking-tight">Explicație pas</h4>
                                    </div>
                                    <p className="text-base leading-relaxed text-indigo-50 font-medium">
                                        {explanation || "Apasă Restart pentru a începe analiza algoritmului pas cu pas."}
                                    </p>
                                </div>
                            </div>

                            {/* Variables panel */}
                            {currentEvent?.vars && Object.keys(currentEvent.vars).length > 0 && (
                                <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                    <h4 className="font-black text-slate-900 mb-4 text-[11px] uppercase tracking-widest border-b border-slate-50 pb-3">Variabile</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(currentEvent.vars).map(([key, val]) => (
                                            <div key={key} className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                                                <div className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider truncate">{key}</div>
                                                <div className="font-mono text-sm font-black text-slate-700 truncate">
                                                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Progress status */}
                            <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="font-black text-slate-900 mb-4 text-[11px] uppercase tracking-widest border-b border-slate-50 pb-3">Status Execuție</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm font-bold">Stare</span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${playing ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"}`}>
                                            {playing ? "În Rulare" : "Pauză"}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-600 transition-all duration-500" 
                                            style={{ width: `${trace.length > 0 ? ((currentStep + 1) / trace.length) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium text-center">← Pas anterior &nbsp;|&nbsp; Spațiu Redă &nbsp;|&nbsp; Pas următor →</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "input" && (
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Configurare Date Intrare</h3>
                            <p className="text-slate-500 text-sm mb-6">
                                {vizType === "sorting"
                                    ? "Introdu numerele separate prin virgulă (ex: 64, 34, 25, 12)."
                                    : vizType === "search"
                                    ? "Introdu un tablou sortat, separate prin virgulă. Specifică și valoarea căutată."
                                    : vizType === "generic"
                                    ? "Modifică parametrii de mai jos și apasă «Aplică și Rulează» pentru a vizualiza execuția."
                                    : vizType === "dp"
                                    ? "Modifică parametrii algoritmului de programare dinamică în formatul JSON."
                                    : "Modifică obiectul JSON de mai jos pentru a schimba datele de test."}
                            </p>
                            
                            {isArrayAlgo ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">
                                            {vizType === "search" ? "Tablou Sortat" : "Elemente Tablou"}
                                        </label>
                                        <input
                                            type="text"
                                            value={rawInput}
                                            onChange={(e) => setRawInput(e.target.value)}
                                            className="w-full font-mono text-lg p-6 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                            placeholder={vizType === "search" ? "ex: 11, 12, 22, 25, 34" : "ex: 10, 5, 20, 15"}
                                        />
                                    </div>
                                    
                                    {vizType === "search" && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Valoare Căutată (Target)</label>
                                            <input
                                                type="number"
                                                value={input.target ?? ""}
                                                onChange={(e) => setInput({ ...input, target: parseInt(e.target.value) })}
                                                className="w-full font-mono text-lg p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                                placeholder="ex: 22"
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    value={rawInput}
                                    onChange={(e) => setRawInput(e.target.value)}
                                    className="w-full font-mono text-sm p-6 bg-slate-900 text-indigo-300 rounded-3xl border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    rows={12}
                                />
                            )}
                        </div>
                        <button 
                            onClick={handleRun} 
                            className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                            Aplică și Rulează
                        </button>
                    </div>
                )}

                {tab === "chat" && (
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[600px]">
                        <div className="flex-1 overflow-y-auto pr-4 space-y-4 mb-6">
                            {chat.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <CommentDiscussionIcon size={48} className="mb-4" />
                                    <p className="max-w-xs font-medium">Pune orice întrebare despre cum funcționează {meta.name} în acest moment.</p>
                                </div>
                            ) : (
                                chat.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`max-w-[80%] p-4 ${
                                            msg.role === "user"
                                                ? "ml-auto rounded-2xl rounded-br-md bg-indigo-600 text-white shadow-md"
                                                : "rounded-2xl rounded-bl-md bg-slate-50 text-slate-700 border border-slate-100"
                                        }`}
                                    >
                                        {msg.role === "assistant" ? (
                                            <article className="prose prose-sm prose-slate max-w-none prose-p:my-2 prose-strong:text-slate-900 prose-em:text-slate-700">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </article>
                                        ) : (
                                            <p className="text-sm font-medium whitespace-pre-wrap">{msg.content}</p>
                                        )}
                                    </div>
                                ))
                            )}

                            {chatLoading ? (
                                <div className="max-w-[80%] p-4 rounded-2xl rounded-bl-md bg-slate-50 text-slate-700 border border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-500">Asistentul scrie</span>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleChat()}
                                placeholder="Scrie întrebarea ta aici..."
                                disabled={chatLoading}
                                className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            <button 
                                onClick={handleChat}
                                disabled={chatLoading}
                                className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                {chatLoading ? <span className="text-xs font-bold">...</span> : <ChevronRightIcon />}
                            </button>
                        </div>
                    </div>
                )}

                {tab === "code" && (
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px]">
                        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="h-3 w-3 rounded-full bg-amber-500" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                <span className="ml-4 text-xs font-bold text-slate-500 font-mono">{sourceFile || "loading..."}</span>
                            </div>
                            <button 
                                onClick={() => navigator.clipboard.writeText(sourceCode || "")}
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Copiază Codul
                            </button>
                        </div>
                        <div className="overflow-x-auto rounded-2xl bg-white border border-slate-200 no-scrollbar">
                            <SyntaxHighlighter
                                language="typescript"
                                style={oneLight}
                                customStyle={{
                                    margin: 0,
                                    padding: "1rem",
                                    background: "#ffffff",
                                    fontSize: "0.875rem",
                                    lineHeight: "1.6",
                                }}
                                showLineNumbers
                                wrapLongLines
                            >
                                {sourceCode || "// Codul sursă se încarcă..."}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                )}
            </div>
        </div>
	);
}

export default function AlgorithmPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [meta, setMeta] = useState<AlgorithmMeta | null>(null);
    const [docMarkdown, setDocMarkdown] = useState("");

	useEffect(() => {
        const found = allAlgorithms.find((a) => a.slug === slug);
        setMeta(found || null);

        api
            .getAlgorithmDoc(slug)
            .then((res) => setDocMarkdown(res.markdown || ""))
            .catch(() => setDocMarkdown(""));
	}, [slug]);

	if (!meta) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
			</div>
		);
	}

    const theme = getCategoryTheme(meta.category);

	return (
		<div className="min-h-screen bg-slate-50">
            {/* Sub Navigation */}
			<nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
					<div className="flex items-center gap-4">
						<Link href="/algoritmi" className="group flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
							<ChevronLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
							<span className="text-sm font-medium">Catalog</span>
						</Link>
						<div className="h-4 w-px bg-slate-200" />
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.iconWrap}`}>
                                {theme.icon}
							</div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${theme.badge}`}>
                                {meta.category}
                            </span>
							<span className="text-base font-bold tracking-tight text-slate-900">{meta.name}</span>
						</div>
					</div>
				</div>
			</nav>

			<main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
                <AlgorithmPlayer meta={meta} docMarkdown={docMarkdown} />
            </main>
		</div>
	);
}
