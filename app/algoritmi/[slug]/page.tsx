"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { AlgorithmMeta, TraceEvent, allAlgorithms } from "@/lib/algorithms";
import { getCategoryDisplayName, getCategoryVisual, normalizeCategoryKey as normalizeThemeCategoryKey } from "@/lib/algorithm-category-theme";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function cleanMarkdown(md: string) {
    if (!md) return md;
    let cleaned = md.replace(/<!--\s*custom-doc\s*-->\n?/g, "");
    
    // Fix math delimiters that some LLMs use but KaTeX doesn't like by default
    cleaned = cleaned.replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
    cleaned = cleaned.replace(/\\\(/g, "$").replace(/\\\)/g, "$");

    return cleaned;
}

function cleanDocHtml(html: string) {
    if (!html) return html;
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
}

function cleanAlgorithmName(name: string) {
    if (!name) return name;
    const parts = name.split(' ');
    // Remove duplicates like "Listă Listă"
    if (parts.length >= 2 && parts[0].toLowerCase() === parts[parts.length - 1].toLowerCase()) {
        return parts.slice(0, -1).join(' ');
    }
    return name;
}

function normalizeCategoryKey(value: string) {
    return normalizeThemeCategoryKey(value);
}

function categoryLabel(category: string) {
    return getCategoryDisplayName(category);
}

function sidebarCategoryTheme(category: string) {
    const visual = getCategoryVisual(category);
    return {
        active: visual.sidebarActive,
        hover: visual.sidebarHover,
        heading: visual.sidebarHeading,
        iconWrap: visual.iconWrap,
        icon: visual.icon,
    };
}
import { 
  PlayIcon, 
  PauseIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  ProjectIcon,
  CodeIcon,
  CommentDiscussionIcon,
  GearIcon,
    EyeIcon,
    SearchIcon,
    StackIcon,
    OrganizationIcon,
    PulseIcon,
    ReplyIcon,
    ShieldCheckIcon,
    ChecklistIcon
} from "@primer/octicons-react";

function getCategoryTheme(category: string) {
    const visual = getCategoryVisual(category);
    return {
        badge: visual.badge,
        iconWrap: visual.iconWrap,
        icon: visual.icon,
    };
}

function getAlgorithmAccentTheme(category: string) {
    const key = normalizeCategoryKey(category);
    const themes: Record<string, { button: string; buttonHover: string; buttonShadow: string; panel: string; panelText: string; panelShadow: string; focusRing: string }> = {
        sortare: {
            button: "bg-rose-600",
            buttonHover: "hover:bg-rose-700",
            buttonShadow: "shadow-rose-100",
            panel: "bg-rose-600",
            panelText: "text-rose-50",
            panelShadow: "shadow-rose-200",
            focusRing: "focus:ring-rose-500",
        },
        cautare: {
            button: "bg-cyan-600",
            buttonHover: "hover:bg-cyan-700",
            buttonShadow: "shadow-cyan-100",
            panel: "bg-cyan-600",
            panelText: "text-cyan-50",
            panelShadow: "shadow-cyan-200",
            focusRing: "focus:ring-cyan-500",
        },
        grafuri: {
            button: "bg-indigo-600",
            buttonHover: "hover:bg-indigo-700",
            buttonShadow: "shadow-indigo-100",
            panel: "bg-indigo-600",
            panelText: "text-indigo-50",
            panelShadow: "shadow-indigo-200",
            focusRing: "focus:ring-indigo-500",
        },
        matematica: {
            button: "bg-lime-600",
            buttonHover: "hover:bg-lime-700",
            buttonShadow: "shadow-lime-100",
            panel: "bg-lime-600",
            panelText: "text-lime-50",
            panelShadow: "shadow-lime-200",
            focusRing: "focus:ring-lime-500",
        },
        programare_dinamica: {
            button: "bg-emerald-600",
            buttonHover: "hover:bg-emerald-700",
            buttonShadow: "shadow-emerald-100",
            panel: "bg-emerald-600",
            panelText: "text-emerald-50",
            panelShadow: "shadow-emerald-200",
            focusRing: "focus:ring-emerald-500",
        },
        cifrare: {
            button: "bg-fuchsia-600",
            buttonHover: "hover:bg-fuchsia-700",
            buttonShadow: "shadow-fuchsia-100",
            panel: "bg-fuchsia-600",
            panelText: "text-fuchsia-50",
            panelShadow: "shadow-fuchsia-200",
            focusRing: "focus:ring-fuchsia-500",
        },
        structuri_de_date: {
            button: "bg-sky-600",
            buttonHover: "hover:bg-sky-700",
            buttonShadow: "shadow-sky-100",
            panel: "bg-sky-600",
            panelText: "text-sky-50",
            panelShadow: "shadow-sky-200",
            focusRing: "focus:ring-sky-500",
        },
        manipulare_de_biti: {
            button: "bg-violet-600",
            buttonHover: "hover:bg-violet-700",
            buttonShadow: "shadow-violet-100",
            panel: "bg-violet-600",
            panelText: "text-violet-50",
            panelShadow: "shadow-violet-200",
            focusRing: "focus:ring-violet-500",
        },
        backtracking: {
            button: "bg-amber-600",
            buttonHover: "hover:bg-amber-700",
            buttonShadow: "shadow-amber-100",
            panel: "bg-amber-600",
            panelText: "text-amber-50",
            panelShadow: "shadow-amber-200",
            focusRing: "focus:ring-amber-500",
        },
        diverse: {
            button: "bg-orange-600",
            buttonHover: "hover:bg-orange-700",
            buttonShadow: "shadow-orange-100",
            panel: "bg-orange-600",
            panelText: "text-orange-50",
            panelShadow: "shadow-orange-200",
            focusRing: "focus:ring-orange-500",
        },
    };

    return themes[key] || themes.grafuri;
}

function toInputLabel(key: string) {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatEdgeList(value: Array<{ from?: string; to?: string; weight?: number }>) {
    return value
        .map((edge) => {
            const from = edge.from ?? "";
            const to = edge.to ?? "";
            if (edge.weight === undefined || edge.weight === null || Number.isNaN(edge.weight)) {
                return `${from}, ${to}`;
            }
            return `${from}, ${to}, ${edge.weight}`;
        })
        .join("\n");
}

function parseEdgeList(text: string) {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [from = "", to = "", weightRaw] = line.split(",").map((part) => part.trim());
            const edge: { from: string; to: string; weight?: number } = { from, to };
            if (weightRaw !== undefined && weightRaw !== "") {
                const parsed = Number(weightRaw);
                if (!Number.isNaN(parsed)) {
                    edge.weight = parsed;
                }
            }
            return edge;
        })
        .filter((edge) => edge.from && edge.to);
}

function parsePrimitiveArray(value: string, sample: unknown, key: string) {
    const parts = value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

    const keySuggestsNumeric = /(array|coins|weights|values|numbers|nums)/i.test(key);
    const shouldBeNumeric = typeof sample === "number" || keySuggestsNumeric;

    if (shouldBeNumeric) {
        return parts.map((part) => Number(part)).filter((n) => !Number.isNaN(n));
    }

    return parts;
}

function formatMatrix(matrix: number[][]) {
    return matrix.map((row) => row.join(", ")).join("\n");
}

function parseMatrix(text: string) {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) =>
            line
                .split(",")
                .map((part) => Number(part.trim()))
                .filter((n) => !Number.isNaN(n))
        )
        .filter((row) => row.length > 0);
}

function stringifyVarValue(value: unknown) {
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean" || value === null || value === undefined) {
        return String(value);
    }
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

function toCompactValueLabel(value: unknown, maxLength = 64) {
    const full = stringifyVarValue(value);
    if (full.length <= maxLength) {
        return { full, compact: full, truncated: false };
    }
    return {
        full,
        compact: `${full.slice(0, maxLength - 1)}…`,
        truncated: true,
    };
}

const GENERIC_INPUT_DEFAULTS: Record<string, Record<string, any>> = {
    matematica_absolute_value: { n: -7 },
    matematica_aliquot_sum: { n: 12 },
    matematica_armstrong_number: { n: 153 },
    matematica_binary_convert: { n: 25 },
    matematica_binomial_coefficient: { n: 5, k: 2 },
    matematica_calculate_mean: { numbers: [10, 20, 30, 40] },
    matematica_calculate_median: { numbers: [3, 1, 4, 2, 5] },
    matematica_degrees_to_radians: { degrees: 180 },
    matematica_digit_sum: { n: 928 },
    matematica_double_factorial_iterative: { n: 9 },
    matematica_euler_totient: { n: 36 },
    matematica_factorial: { n: 7 },
    matematica_factors: { n: 24 },
    matematica_fibonacci: { n: 10 },
    matematica_find_min: { numbers: [7, 2, 9, -1, 5] },
    matematica_gaussian_elimination: {
        matrix: [
            [2, 1, -1, 8],
            [-3, -1, 2, -11],
            [-2, 1, 2, -3],
        ],
    },
    matematica_greatest_common_factor: { a: 48, b: 18 },
    matematica_hamming_distance: { str1: "karolin", str2: "kathrin" },
    matematica_series_hexagonal_numbers: { n: 10 },
    matematica_is_divisible: { num1: 24, num2: 6 },
    matematica_is_even: { n: 8 },
    matematica_is_leap_year: { year: 2024 },
    matematica_is_odd: { n: 7 },
    matematica_is_palindrome: { n: 121 },
    matematica_is_square_free: { n: 30 },
    matematica_juggler_sequence: { a: 9, n: 5 },
    matematica_lowest_common_multiple: { numbers: [4, 6, 10] },
    matematica_matrix_multiplication: {
        matrixA: [
            [1, 2],
            [3, 4],
        ],
        matrixB: [
            [5, 6],
            [7, 8],
        ],
    },
    matematica_number_of_digits: { n: 12345 },
    matematica_pascals_triangle: { n: 6 },
    matematica_perfect_cube: { n: 27 },
    matematica_perfect_number: { n: 28 },
    matematica_perfect_square: { n: 49 },
    matematica_prime_factorization: { n: 84 },
    matematica_primes: { n: 50 },
    matematica_pronic_number: { n: 20 },
    matematica_radians_to_degrees: { radians: 3.14159 },
    matematica_sieve_of_eratosthenes: { n: 50 },
    matematica_signum: { n: -12 },
    matematica_square_root: { n: 2, precision: 0.000001 },
    matematica_ugly_numbers: { n: 12 },
    matematica_zellers_congruence: { year: 2024, month: 3, day: 23, calendar: "Gregorian" },
    "manipulare-biti_add_binary": { a: "1010", b: "1011" },
    "manipulare-biti_log_two": { n: 16 },
    "manipulare-biti_is_power_of_2": { n: 16 },
    "manipulare-biti_is_power_of_4": { n: 16 },
    diverse_shuffle_array: { array: [1, 2, 3, 4, 5, 6] },
    backtracking_generateparentheses: { n: 3 },
    backtracking_all_combinations_of_size_k: { n: 5, k: 2 },
};

interface AlgorithmPlayerProps {
	meta: AlgorithmMeta;
    docMarkdown: string;
    docHtml: string;
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
                    {Object.entries(ev.vars).map(([key, val]) => {
                        const rendered = renderValue(val);
                        const compact = toCompactValueLabel(rendered, 70);
                        return (
                            <div key={key} className="px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-left min-w-[100px] max-w-[200px]" title={compact.full}>
                                <div className="text-[9px] font-black text-indigo-400 uppercase mb-1 tracking-wider">{key}</div>
                                <div className="font-mono text-sm font-black text-indigo-700 truncate" aria-label={compact.full}>
                                    {compact.compact}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const CUSTOM_MATH_VISUAL_SLUGS = new Set([
    "matematica_sieve_of_eratosthenes",
    "matematica_greatest_common_factor",
    "matematica_prime_factorization",
    "matematica_binary_convert",
    "matematica_lowest_common_multiple",
]);

function primeFactorsList(value: number) {
    const factors: number[] = [];
    let n = Math.abs(Math.floor(value));
    for (let p = 2; p * p <= n; p += 1) {
        while (n % p === 0) {
            factors.push(p);
            n = Math.floor(n / p);
        }
    }
    if (n > 1) factors.push(n);
    return factors;
}

function uniqueSorted(values: number[]) {
    return Array.from(new Set(values)).sort((a, b) => a - b);
}

function MathOperationsVisualizer({ slug, event, input }: { slug: string; event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};

    if (slug === "matematica_sieve_of_eratosthenes") {
        const n = Math.max(2, Number(input?.n ?? vars?.n ?? 50));
        const state: number[] = Array.isArray(ev.array) ? ev.array : [];
        const limit = Math.min(n, 80);
        const nums = Array.from({ length: limit - 1 }, (_, i) => i + 2);
        const currentPrime = vars.p ?? vars.factor ?? "-";
        const currentMultiple = vars.eliminat ?? ev.index ?? "-";

        return (
            <div className="w-full space-y-4">
                <p className="text-xs text-slate-500 font-semibold text-center">Ciurul lui Eratostene: selectăm un prim p, apoi tăiem multiplii lui.</p>
                <div className="grid md:grid-cols-5 gap-4">
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                            {nums.map((num) => {
                                const flag = state[num] ?? 0;
                                const isCurrent = num === ev.index;
                                const isPivot = num === currentPrime;
                                const cls = flag ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-rose-100 text-rose-700 border-rose-200";
                                return (
                                    <div key={num} className={`h-9 rounded-lg border text-xs font-black flex items-center justify-center transition-all ${cls} ${isCurrent ? "ring-2 ring-indigo-400" : ""} ${isPivot ? "ring-2 ring-amber-400" : ""}`}>
                                        {num}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-3">
                        <table className="w-full text-xs">
                            <tbody>
                                <tr className="border-b border-slate-100">
                                    <td className="py-2 font-black text-slate-500">Selectat p</td>
                                    <td className="py-2 text-right font-black text-amber-600">{currentPrime}</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-2 font-black text-slate-500">Element curent</td>
                                    <td className="py-2 text-right font-black text-indigo-600">{currentMultiple}</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-2 font-black text-slate-500">Operație</td>
                                    <td className="py-2 text-right font-semibold text-slate-700">marcare / eliminare</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-black text-slate-500">Regulă</td>
                                    <td className="py-2 text-right font-semibold text-slate-700">j = p², p²+p, ...</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                            Verde: număr încă posibil prim. Roșu: eliminat pentru că se împarte la un prim anterior.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (slug === "matematica_greatest_common_factor") {
        const a = Number(vars.a ?? 0);
        const b = Number(vars.b ?? 0);
        const rest = Number(vars.rest ?? 0);
        const safeA = Math.max(1, Math.abs(a));
        const safeB = Math.max(1, Math.abs(b));
        const maxAB = Math.max(safeA, safeB, 1);
        const q = safeB > 0 ? Math.floor(safeA / safeB) : 0;

        return (
            <div className="w-full max-w-2xl space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400">a</div>
                        <div className="text-xl font-black text-slate-800">{a || "-"}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400">b</div>
                        <div className="text-xl font-black text-slate-800">{b || "-"}</div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                        <div className="text-[10px] uppercase font-black text-indigo-400">rest</div>
                        <div className="text-xl font-black text-indigo-700">{rest || 0}</div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                    <div>
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-1">Segment A</div>
                        <div className="h-4 rounded bg-slate-100 overflow-hidden">
                            <div className="h-full bg-sky-500" style={{ width: `${(safeA / maxAB) * 100}%` }} />
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-1">Segment B</div>
                        <div className="h-4 rounded bg-slate-100 overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${(safeB / maxAB) * 100}%` }} />
                        </div>
                    </div>
                    <table className="w-full text-xs">
                        <tbody>
                            <tr className="border-b border-slate-100"><td className="py-1.5 font-black text-slate-500">Împărțire</td><td className="py-1.5 text-right font-mono">{safeA} = {safeB} × {q} + {rest}</td></tr>
                            <tr><td className="py-1.5 font-black text-slate-500">Pas următor</td><td className="py-1.5 text-right font-mono">({safeB}, {rest})</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (slug === "matematica_prime_factorization") {
        const factors: number[] = Array.isArray(ev.array) ? ev.array : [];
        const current = vars.n_curent;
        const next = vars.n_nou;
        return (
            <div className="w-full space-y-5">
                <div className="flex flex-wrap justify-center gap-2">
                    {factors.length === 0 ? (
                        <span className="text-slate-400 text-sm font-semibold">Încă nu există factori extrași</span>
                    ) : (
                        factors.map((factor, idx) => (
                            <span key={`${factor}-${idx}`} className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-black text-sm">{factor}</span>
                        ))
                    )}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Ramificare (arbore de împărțire)</div>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <div className="px-3 py-2 rounded-xl bg-slate-900 text-white font-black">{current ?? "n"}</div>
                        <span className="text-slate-300 font-black">÷</span>
                        <div className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-black">{vars.divizor ?? "p"}</div>
                        <span className="text-slate-300 font-black">→</span>
                        <div className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-black">{next ?? "n/p"}</div>
                    </div>
                    {factors.length > 0 && (
                        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                            {factors.map((factor, idx) => (
                                <span key={`${factor}-${idx}`} className="inline-flex items-center gap-2">
                                    {idx > 0 && <span className="text-slate-300 font-black">×</span>}
                                    <span className="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white font-black text-xs">{factor}</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-center text-sm font-semibold text-slate-600">
                    {vars.factori ? `Descompunere: ${vars.factori}` : "Extragem factorii primi prin împărțiri succesive."}
                </div>
            </div>
        );
    }

    if (slug === "matematica_binary_convert") {
        const bits: number[] = Array.isArray(ev.array) ? ev.array : [];
        return (
            <div className="w-full max-w-2xl space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400">n curent</div>
                        <div className="text-xl font-black text-slate-800">{vars.n_curent ?? vars.decimal ?? "-"}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400">cat</div>
                        <div className="text-xl font-black text-slate-800">{vars.cat ?? "-"}</div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                        <div className="text-[10px] uppercase font-black text-indigo-400">rest / bit</div>
                        <div className="text-xl font-black text-indigo-700">{vars.rest ?? vars.bit ?? "-"}</div>
                    </div>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                    {bits.map((bit, idx) => (
                        <span
                            key={`${bit}-${idx}`}
                            className={`h-10 w-10 rounded-xl border font-black flex items-center justify-center ${bit === 1 ? "bg-emerald-500 border-emerald-600 text-white" : "bg-sky-100 border-sky-200 text-sky-700"} ${idx === bits.length - 1 ? "ring-2 ring-indigo-300" : ""}`}
                        >
                            {bit}
                        </span>
                    ))}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <table className="w-full text-xs">
                        <tbody>
                            <tr className="border-b border-slate-100"><td className="py-1.5 font-black text-slate-500">Operație</td><td className="py-1.5 text-right font-mono">n / 2</td></tr>
                            <tr className="border-b border-slate-100"><td className="py-1.5 font-black text-slate-500">Rest (bit nou)</td><td className="py-1.5 text-right font-mono">{vars.rest ?? vars.bit ?? "-"}</td></tr>
                            <tr><td className="py-1.5 font-black text-slate-500">Șir biți</td><td className="py-1.5 text-right font-mono">{(vars.binary ?? vars.bits_partial ?? bits.join("")) || "-"}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (slug === "matematica_lowest_common_multiple") {
        const numbers: number[] = Array.isArray(vars.numbers) ? vars.numbers : Array.isArray(input?.numbers) ? input.numbers : [];
        const a = Number(vars.a ?? numbers[0] ?? 1);
        const b = Number(vars.b ?? numbers[1] ?? 1);
        const af = primeFactorsList(a);
        const bf = primeFactorsList(b);
        const ai = uniqueSorted(af);
        const bi = uniqueSorted(bf);
        const inter = ai.filter((x) => bi.includes(x));
        const onlyA = ai.filter((x) => !inter.includes(x));
        const onlyB = bi.filter((x) => !inter.includes(x));
        return (
            <div className="w-full max-w-3xl space-y-4">
                <div className="flex flex-wrap justify-center gap-2">
                    {numbers.map((num, idx) => (
                        <span key={`${num}-${idx}`} className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-black text-sm">{num}</span>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">a</div>
                        <div className="text-lg font-black text-slate-800">{vars.a ?? "-"}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">b</div>
                        <div className="text-lg font-black text-slate-800">{vars.b ?? "-"}</div>
                    </div>
                    <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">cmmdc</div>
                        <div className="text-lg font-black text-indigo-700">{vars.cmmdc ?? "-"}</div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-emerald-400">cmmc</div>
                        <div className="text-lg font-black text-emerald-700">{vars.cmmc_partial ?? vars.cmmc ?? "-"}</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Diagramă Venn (factori primi unici pentru a și b)</div>
                        <svg viewBox="0 0 300 180" className="w-full h-44">
                            <circle cx="120" cy="90" r="58" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" />
                            <circle cx="180" cy="90" r="58" fill="#ede9fe" stroke="#a78bfa" strokeWidth="2" />
                            <text x="94" y="32" className="fill-sky-700 text-[10px] font-black">a = {a}</text>
                            <text x="188" y="32" className="fill-violet-700 text-[10px] font-black">b = {b}</text>
                            <text x="80" y="92" className="fill-sky-700 text-[10px] font-bold">{onlyA.join(", ") || "-"}</text>
                            <text x="150" y="92" className="fill-indigo-700 text-[10px] font-bold">{inter.join(", ") || "-"}</text>
                            <text x="220" y="92" className="fill-violet-700 text-[10px] font-bold">{onlyB.join(", ") || "-"}</text>
                        </svg>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Flux de calcul</div>
                        <div className="space-y-2 text-xs font-mono">
                            <div className="rounded-lg bg-slate-50 px-3 py-2">1. CMMDC({a}, {b}) = {vars.cmmdc ?? "?"}</div>
                            <div className="rounded-lg bg-slate-50 px-3 py-2">2. CMMC = ({a} × {b}) / CMMDC</div>
                            <div className="rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2 font-black">3. CMMC = {vars.cmmc_partial ?? vars.cmmc ?? "?"}</div>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, ((vars.pas ?? 1) / Math.max(1, numbers.length - 1)) * 100)}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <GenericVisualizer event={event} />;
}



function AlgorithmPlayer({ meta, docMarkdown, docHtml }: AlgorithmPlayerProps) {
	const [input, setInput] = useState<Record<string, any>>({});
    const [rawInput, setRawInput] = useState<string>("");
    const [inputDrafts, setInputDrafts] = useState<Record<string, string>>({});
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
    setInputDrafts({});

        const slugDefaultInput = GENERIC_INPUT_DEFAULTS[slug];
        if (slugDefaultInput && vizType !== "sorting" && vizType !== "search" && vizType !== "graph" && vizType !== "dp") {
            setInput(slugDefaultInput);
            setRawInput(JSON.stringify(slugDefaultInput, null, 2));
            return;
        }

        const isMathCategory = normalizeCategoryKey(meta.category).replace(/-/g, "_") === "matematica";
        if (isMathCategory && vizType !== "sorting" && vizType !== "search" && vizType !== "graph" && vizType !== "dp") {
            const fallbackMathInput = { n: 10 };
            setInput(fallbackMathInput);
            setRawInput(JSON.stringify(fallbackMathInput, null, 2));
            return;
        }

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
            const defaultData = { n: 10 };
            setInput(defaultData);
            setRawInput(JSON.stringify(defaultData, null, 2));
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
    const accentTheme = getAlgorithmAccentTheme(meta.category);

	return (
		<div className="space-y-8">
            {/* Top Navigation & Info Bar */}
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex justify-center">
                <div className="grid grid-cols-2 bg-slate-50 p-1.5 rounded-2xl gap-1 w-full sm:flex sm:flex-nowrap sm:overflow-x-auto sm:no-scrollbar sm:justify-center">
                    {[
                        { id: "descriere", label: "Descriere", icon: <CommentDiscussionIcon /> },
                        { id: "input", label: "Date Intrare", icon: <GearIcon /> },
                        { id: "viz", label: "Vizualizare", icon: <EyeIcon /> },
                        {
                            id: "chat",
                            label: "Asistent AI",
                            icon: (
                                <img
                                    src="/githubcopilot.svg"
                                    alt=""
                                    aria-hidden="true"
                                    className="h-4 w-4 object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ),
                        },
                        { id: "code", label: "Cod Sursă", icon: <CodeIcon /> }
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id as any)}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 min-w-0 sm:min-w-[150px] px-3 sm:px-6 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-all text-center ${
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
                        <article className="prose prose-slate max-w-none prose-headings:font-black prose-p:leading-relaxed prose-li:leading-relaxed">
                            {docHtml ? (
                                <div
                                    className="not-prose"
                                    dangerouslySetInnerHTML={{ __html: cleanDocHtml(docHtml) }}
                                />
                            ) : (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {cleanMarkdown(docMarkdown) || `# ${meta.name}\n\nDocumentația markdown nu este disponibilă încă pentru acest algoritm.`}
                                </ReactMarkdown>
                            )}
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
                                            {CUSTOM_MATH_VISUAL_SLUGS.has(meta.slug) ? (
                                                <MathOperationsVisualizer slug={meta.slug} event={currentEvent} input={input} />
                                            ) : vizType === "sorting" ? (
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
                            <div className={`p-6 ${accentTheme.panel} rounded-[2rem] text-white shadow-2xl ${accentTheme.panelShadow} relative overflow-hidden group`} style={{ minHeight: "160px" }}>
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
                                    <p className={`text-base leading-relaxed ${accentTheme.panelText} font-medium`}>
                                        {explanation || "Apasă Restart pentru a începe analiza algoritmului pas cu pas."}
                                    </p>
                                </div>
                            </div>

                            {/* Variables panel */}
                            {currentEvent?.vars && Object.keys(currentEvent.vars).length > 0 && (
                                <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                    <h4 className="font-black text-slate-900 mb-4 text-[11px] uppercase tracking-widest border-b border-slate-50 pb-3">Variabile</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(currentEvent.vars).map(([key, val]) => {
                                            const compact = toCompactValueLabel(val);
                                            return (
                                                <div key={key} className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden" title={compact.full}>
                                                    <div className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider truncate">{key}</div>
                                                    <div className="font-mono text-sm font-black text-slate-700 truncate" aria-label={compact.full}>
                                                        {compact.compact}
                                                    </div>
                                                </div>
                                            );
                                        })}
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
                                    ? "Modifică parametrii algoritmului de programare dinamică folosind câmpurile de mai jos."
                                    : "Modifică datele de test folosind formularul de mai jos."}
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
                                <div className="space-y-4">
                                    {Object.keys(input).length === 0 ? (
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                            Acest algoritm nu necesită parametri de intrare.
                                        </div>
                                    ) : (
                                        Object.entries(input).map(([key, value]) => {
                                            const label = toInputLabel(key);
                                            if (Array.isArray(value)) {
                                                const isEdgeList = value.every((item) => item && typeof item === "object" && "from" in item && "to" in item);
                                                if (isEdgeList) {
                                                    const edgeDraft = inputDrafts[key] ?? formatEdgeList(value as Array<{ from?: string; to?: string; weight?: number }>);
                                                    return (
                                                        <div key={key} className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                            <textarea
                                                                value={edgeDraft}
                                                                onChange={(e) => setInputDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
                                                                onBlur={() => {
                                                                    const raw = inputDrafts[key] ?? edgeDraft;
                                                                    const parsed = parseEdgeList(raw);
                                                                    setInput((prev) => ({ ...prev, [key]: parsed }));
                                                                    setInputDrafts((prev) => ({ ...prev, [key]: formatEdgeList(parsed) }));
                                                                }}
                                                                className={`w-full font-mono text-sm p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                                rows={6}
                                                                placeholder="ex: A, B, 4&#10;A, C, 2&#10;C, D, 1"
                                                            />
                                                            <p className="text-[11px] text-slate-400">Format: nod_start, nod_final, greutate(opțional)</p>
                                                        </div>
                                                    );
                                                }

                                                const isMatrix = value.every((item) => Array.isArray(item));
                                                if (isMatrix) {
                                                    const matrixDraft = inputDrafts[key] ?? formatMatrix(value as number[][]);
                                                    return (
                                                        <div key={key} className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                            <textarea
                                                                value={matrixDraft}
                                                                onChange={(e) => setInputDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
                                                                onBlur={() => {
                                                                    const raw = inputDrafts[key] ?? matrixDraft;
                                                                    const parsed = parseMatrix(raw);
                                                                    setInput((prev) => ({ ...prev, [key]: parsed }));
                                                                    setInputDrafts((prev) => ({ ...prev, [key]: formatMatrix(parsed) }));
                                                                }}
                                                                className={`w-full font-mono text-sm p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                                rows={6}
                                                                placeholder="Rândurile separate prin Enter, valorile prin virgulă"
                                                            />
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div key={key} className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                        <input
                                                            type="text"
                                                            value={inputDrafts[key] ?? value.join(", ")}
                                                            onChange={(e) => setInputDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
                                                            onBlur={() => {
                                                                const sample = value.length > 0 ? value[0] : undefined;
                                                                const raw = inputDrafts[key] ?? value.join(", ");
                                                                const parsed = parsePrimitiveArray(raw, sample, key);
                                                                setInput((prev) => ({ ...prev, [key]: parsed }));
                                                                setInputDrafts((prev) => ({ ...prev, [key]: parsed.join(", ") }));
                                                            }}
                                                            className={`w-full font-mono text-base p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                            placeholder="Valori separate prin virgulă"
                                                        />
                                                    </div>
                                                );
                                            }

                                            if (typeof value === "number") {
                                                return (
                                                    <div key={key} className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                        <input
                                                            type="number"
                                                            value={inputDrafts[key] ?? (Number.isFinite(value) ? String(value) : "")}
                                                            onChange={(e) => setInputDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
                                                            onBlur={() => {
                                                                const raw = inputDrafts[key] ?? (Number.isFinite(value) ? String(value) : "");
                                                                const parsed = Number(raw);
                                                                if (!Number.isNaN(parsed)) {
                                                                    setInput((prev) => ({ ...prev, [key]: parsed }));
                                                                    setInputDrafts((prev) => ({ ...prev, [key]: String(parsed) }));
                                                                } else {
                                                                    setInputDrafts((prev) => ({ ...prev, [key]: Number.isFinite(value) ? String(value) : "" }));
                                                                }
                                                            }}
                                                            className={`w-full font-mono text-base p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                        />
                                                    </div>
                                                );
                                            }

                                            if (typeof value === "boolean") {
                                                return (
                                                    <label key={key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                                        <span className="text-sm font-semibold text-slate-700">{label}</span>
                                                        <input
                                                            type="checkbox"
                                                            checked={value}
                                                            onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.checked }))}
                                                            className={`h-4 w-4 rounded border-slate-300 text-slate-900 ${accentTheme.focusRing}`}
                                                        />
                                                    </label>
                                                );
                                            }

                                            if (typeof value === "string") {
                                                if (key.toLowerCase() === "calendar") {
                                                    return (
                                                        <div key={key} className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                            <select
                                                                value={value}
                                                                onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.value }))}
                                                                className={`w-full font-mono text-base p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                            >
                                                                <option value="Gregorian">Gregorian</option>
                                                                <option value="Julian">Julian</option>
                                                            </select>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div key={key} className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.value }))}
                                                            className={`w-full font-mono text-base p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                        />
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={key} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                                                    Câmpul „{label}” are un format complex; momentan nu are editor vizual dedicat.
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={handleRun} 
                            className={`w-full py-4 rounded-2xl ${accentTheme.button} text-white font-bold text-lg shadow-xl ${accentTheme.buttonShadow} ${accentTheme.buttonHover} transition-all`}
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
                                                <ReactMarkdown 
                                                    remarkPlugins={[remarkGfm, remarkMath]} 
                                                    rehypePlugins={[rehypeKatex]}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
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
    const [docHtml, setDocHtml] = useState("");
    const [isResolvingSlug, setIsResolvingSlug] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

	useEffect(() => {
        setIsResolvingSlug(true);
        const found = allAlgorithms.find((a) => a.slug === slug);
        setMeta(found || null);

        if (!found) {
            setDocMarkdown("");
            setDocHtml("");
            setIsResolvingSlug(false);
            return;
        }

        api
            .getAlgorithmDoc(slug)

            .then((res) => {
                setDocMarkdown(res.markdown || "");
                setDocHtml(res.html || "");
            })
            .catch(() => {
                setDocMarkdown("");
                setDocHtml("");

            })
            .finally(() => {
                setIsResolvingSlug(false);
            });
	}, [slug]);

    useEffect(() => {
        if (!meta) return;
        const activeKey = normalizeCategoryKey(meta.category).replace(/-/g, "_");
        setOpenCategories((prev) => ({ ...prev, [activeKey]: true }));
    }, [meta, slug]);

    if (isResolvingSlug) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
			</div>
		);
	}

    if (!meta) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-rose-500">Slug invalid</p>
                    <h1 className="mt-2 text-2xl font-black text-slate-900">Algoritmul nu a fost găsit</h1>
                    <p className="mt-3 text-slate-600 leading-relaxed">
                        Nu există un algoritm cu slug-ul <span className="font-mono font-semibold text-slate-800">{slug}</span>.
                         Te rog verifică linkul sau revino în catalog.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/algoritmi"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                        >
                            Înapoi la algoritmi
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            Pagina principală
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const theme = getCategoryTheme(meta.category);
    const groupedAlgorithms = Object.entries(
        allAlgorithms.reduce((acc, algorithm) => {
            const key = normalizeCategoryKey(algorithm.category).replace(/-/g, "_");
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(algorithm);
            return acc;
        }, {} as Record<string, AlgorithmMeta[]>)
    )
        .map(([categoryKey, items]) => ({
            categoryKey,
            label: categoryLabel(categoryKey),
            items: [...items].sort((a, b) => cleanAlgorithmName(a.name).localeCompare(cleanAlgorithmName(b.name), "ro")),
        }))
        .sort((a, b) => (b.items.length - a.items.length) || a.label.localeCompare(b.label, "ro"));

	return (
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Desktop unified sidebar shell */}
            <aside className="hidden lg:flex lg:h-screen lg:sticky lg:top-0 lg:flex-col border-r border-slate-200 bg-white">
                <div className="h-14 border-b border-slate-200 px-5 flex items-center justify-between bg-white">
                    <Link
                        href="/algoritmi"
                        aria-label="Înapoi la catalog"
                        className="group inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                        <ChevronLeftIcon size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </Link>
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-600">Toți algoritmii</h2>
                    <span className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                    <div className="space-y-4">
                        {groupedAlgorithms.map((section) => {
                            const sectionTheme = sidebarCategoryTheme(section.categoryKey);
                            const isCategoryOpen = openCategories[section.categoryKey] ?? section.items.some((algorithm) => algorithm.slug === slug);
                            return (
                                <div key={section.categoryKey} className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setOpenCategories((prev) => ({ ...prev, [section.categoryKey]: !isCategoryOpen }))}
                                        className="flex w-full items-center justify-between px-2"
                                    >
                                        <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-wider ${sectionTheme.heading}`}>
                                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg shadow-sm ${sectionTheme.iconWrap}`}>
                                                {sectionTheme.icon}
                                            </span>
                                            {section.label}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{section.items.length}</span>
                                            <ChevronRightIcon size={14} className={`text-slate-400 transition-transform ${isCategoryOpen ? "rotate-90" : ""}`} />
                                        </div>
                                    </button>
                                    {isCategoryOpen && (
                                        <div className="space-y-1 border-l border-slate-100 pl-5">
                                            {section.items.map((algorithm) => {
                                                const isActive = algorithm.slug === slug;
                                                return (
                                                    <Link
                                                        key={algorithm.slug}
                                                        href={`/algoritmi/${algorithm.slug}`}
                                                        className={`block rounded-xl px-3 py-2 text-sm transition-all ${
                                                            isActive
                                                                ? `${sectionTheme.active} font-bold ring-1`
                                                                : `text-slate-600 ${sectionTheme.hover}`
                                                        }`}
                                                    >
                                                        {cleanAlgorithmName(algorithm.name)}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Main content shell with sticky header */}
            <div className="min-w-0">
                <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
                    <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <button
                                onClick={() => setSidebarOpen((open) => !open)}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:bg-slate-50 lg:hidden"
                            >
                                {sidebarOpen ? "Ascunde" : "Afișează"} sidebar
                            </button>
                            <div className="hidden h-4 w-px bg-slate-200 lg:block" />
                            <div className="flex min-w-0 items-center gap-3">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${theme.iconWrap}`}>
                                    {theme.icon}
                                </div>
                                <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${theme.badge}`}>
                                    {meta.category}
                                </span>
                                <span className="truncate text-sm sm:text-base font-bold tracking-tight text-slate-900">{cleanAlgorithmName(meta.name)}</span>
                            </div>
                        </div>
                    </div>
                </nav>

                {sidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px] lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                            aria-hidden="true"
                        />
                        <aside className="fixed inset-y-0 left-0 z-50 w-[86vw] max-w-[300px] border-r border-slate-200 bg-white shadow-xl lg:hidden">
                            <div className="flex h-full flex-col">
                                <div className="h-14 border-b border-slate-200 px-5 flex items-center justify-between bg-white">
                                    <Link
                                        href="/algoritmi"
                                        aria-label="Înapoi la catalog"
                                        className="group inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                                    >
                                        <ChevronLeftIcon size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                    </Link>
                                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-600">Toți algoritmii</h2>
                                    <span className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div className="flex-1 overflow-y-auto p-3">
                                    <div className="space-y-4">
                                        {groupedAlgorithms.map((section) => {
                                            const sectionTheme = sidebarCategoryTheme(section.categoryKey);
                                            const isCategoryOpen = openCategories[section.categoryKey] ?? section.items.some((algorithm) => algorithm.slug === slug);
                                            return (
                                                <div key={section.categoryKey} className="space-y-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenCategories((prev) => ({ ...prev, [section.categoryKey]: !isCategoryOpen }))}
                                                        className="flex w-full items-center justify-between px-2"
                                                    >
                                                        <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-wider ${sectionTheme.heading}`}>
                                                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg shadow-sm ${sectionTheme.iconWrap}`}>
                                                                {sectionTheme.icon}
                                                            </span>
                                                            {section.label}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{section.items.length}</span>
                                                            <ChevronRightIcon size={14} className={`text-slate-400 transition-transform ${isCategoryOpen ? "rotate-90" : ""}`} />
                                                        </div>
                                                    </button>
                                                    {isCategoryOpen && (
                                                        <div className="space-y-1 border-l border-slate-100 pl-5">
                                                            {section.items.map((algorithm) => {
                                                                const isActive = algorithm.slug === slug;
                                                                return (
                                                                    <Link
                                                                        key={algorithm.slug}
                                                                        href={`/algoritmi/${algorithm.slug}`}
                                                                        onClick={() => setSidebarOpen(false)}
                                                                        className={`block rounded-xl px-3 py-2 text-sm transition-all ${
                                                                            isActive
                                                                                ? `${sectionTheme.active} font-bold ring-1`
                                                                                : `text-slate-600 ${sectionTheme.hover}`
                                                                        }`}
                                                                    >
                                                                        {cleanAlgorithmName(algorithm.name)}
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </>
                )}

                <main className="w-full px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
                    <div className="min-w-0">
                        <AlgorithmPlayer meta={{ ...meta, name: cleanAlgorithmName(meta.name) }} docMarkdown={docMarkdown} docHtml={docHtml} />
                    </div>
                </main>
            </div>
        </div>
	);
}
