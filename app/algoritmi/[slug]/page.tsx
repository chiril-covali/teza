"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { ChatTokenQuota } from "@/lib/api";
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

const algorithmDocCache = new Map<string, { markdown: string; html: string }>();

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

function getCategoryAccentClasses(category: string) {
    const key = normalizeCategoryKey(category);
    const classes: Record<string, {
        tabActive: string;
        softBg: string;
        softText: string;
        solidBg: string;
        solidHover: string;
        ring: string;
        rangeAccent: string;
        codeText: string;
        codeHover: string;
    }> = {
        sortare: {
            tabActive: "bg-rose-50 border-rose-200 text-rose-700 shadow-sm",
            softBg: "bg-rose-50",
            softText: "text-rose-700",
            solidBg: "bg-rose-600",
            solidHover: "hover:bg-rose-700",
            ring: "focus:ring-rose-500",
            rangeAccent: "accent-rose-600",
            codeText: "text-rose-500",
            codeHover: "hover:text-rose-400",
        },
        cautare: {
            tabActive: "bg-cyan-50 border-cyan-200 text-cyan-700 shadow-sm",
            softBg: "bg-cyan-50",
            softText: "text-cyan-700",
            solidBg: "bg-cyan-600",
            solidHover: "hover:bg-cyan-700",
            ring: "focus:ring-cyan-500",
            rangeAccent: "accent-cyan-600",
            codeText: "text-cyan-500",
            codeHover: "hover:text-cyan-400",
        },
        grafuri: {
            tabActive: "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm",
            softBg: "bg-indigo-50",
            softText: "text-indigo-700",
            solidBg: "bg-indigo-600",
            solidHover: "hover:bg-indigo-700",
            ring: "focus:ring-indigo-500",
            rangeAccent: "accent-indigo-600",
            codeText: "text-indigo-500",
            codeHover: "hover:text-indigo-400",
        },
        matematica: {
            tabActive: "bg-lime-50 border-lime-200 text-lime-700 shadow-sm",
            softBg: "bg-lime-50",
            softText: "text-lime-700",
            solidBg: "bg-lime-600",
            solidHover: "hover:bg-lime-700",
            ring: "focus:ring-lime-500",
            rangeAccent: "accent-lime-600",
            codeText: "text-lime-500",
            codeHover: "hover:text-lime-400",
        },
        programare_dinamica: {
            tabActive: "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm",
            softBg: "bg-emerald-50",
            softText: "text-emerald-700",
            solidBg: "bg-emerald-600",
            solidHover: "hover:bg-emerald-700",
            ring: "focus:ring-emerald-500",
            rangeAccent: "accent-emerald-600",
            codeText: "text-emerald-500",
            codeHover: "hover:text-emerald-400",
        },
        cifrare: {
            tabActive: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 shadow-sm",
            softBg: "bg-fuchsia-50",
            softText: "text-fuchsia-700",
            solidBg: "bg-fuchsia-600",
            solidHover: "hover:bg-fuchsia-700",
            ring: "focus:ring-fuchsia-500",
            rangeAccent: "accent-fuchsia-600",
            codeText: "text-fuchsia-500",
            codeHover: "hover:text-fuchsia-400",
        },
        structuri_de_date: {
            tabActive: "bg-sky-50 border-sky-200 text-sky-700 shadow-sm",
            softBg: "bg-sky-50",
            softText: "text-sky-700",
            solidBg: "bg-sky-600",
            solidHover: "hover:bg-sky-700",
            ring: "focus:ring-sky-500",
            rangeAccent: "accent-sky-600",
            codeText: "text-sky-500",
            codeHover: "hover:text-sky-400",
        },
        manipulare_de_biti: {
            tabActive: "bg-violet-50 border-violet-200 text-violet-700 shadow-sm",
            softBg: "bg-violet-50",
            softText: "text-violet-700",
            solidBg: "bg-violet-600",
            solidHover: "hover:bg-violet-700",
            ring: "focus:ring-violet-500",
            rangeAccent: "accent-violet-600",
            codeText: "text-violet-500",
            codeHover: "hover:text-violet-400",
        },
        backtracking: {
            tabActive: "bg-amber-50 border-amber-200 text-amber-700 shadow-sm",
            softBg: "bg-amber-50",
            softText: "text-amber-700",
            solidBg: "bg-amber-600",
            solidHover: "hover:bg-amber-700",
            ring: "focus:ring-amber-500",
            rangeAccent: "accent-amber-600",
            codeText: "text-amber-500",
            codeHover: "hover:text-amber-400",
        },
        diverse: {
            tabActive: "bg-orange-50 border-orange-200 text-orange-700 shadow-sm",
            softBg: "bg-orange-50",
            softText: "text-orange-700",
            solidBg: "bg-orange-600",
            solidHover: "hover:bg-orange-700",
            ring: "focus:ring-orange-500",
            rangeAccent: "accent-orange-600",
            codeText: "text-orange-500",
            codeHover: "hover:text-orange-400",
        },
    };

    return classes[key] || classes.grafuri;
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

function prioritizeExecutionKeys(keys: string[]) {
    const priority = [
        "i", "j", "k", "left", "right", "mid", "pivot", "current", "index",
        "target", "node", "distance", "cost", "sum", "result", "value", "state", "step",
    ];

    const rank = (key: string) => {
        const lower = key.toLowerCase();
        const idx = priority.findIndex((p) => lower.includes(p));
        return idx === -1 ? 999 : idx;
    };

    return [...keys].sort((a, b) => {
        const ra = rank(a);
        const rb = rank(b);
        if (ra !== rb) return ra - rb;
        return a.localeCompare(b);
    });
}

function summarizeInputValue(value: unknown) {
    if (Array.isArray(value)) {
        const full = value.map((v) => stringifyVarValue(v)).join(", ");
        return `[${full}] (${value.length})`;
    }
    if (value && typeof value === "object") {
        const keys = Object.keys(value as Record<string, unknown>);
        return `{${keys.slice(0, 4).join(", ")}${keys.length > 4 ? ", ..." : ""}}`;
    }
    return value;
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
    cifru_xor_cipher: { str: "Hello, Copilot!", key: 42 },
    "manipulare-biti_add_binary": { a: "1010", b: "1011" },
    "manipulare-biti_log_two": { n: 16 },
    "manipulare-biti_is_power_of_2": { n: 16 },
    "manipulare-biti_is_power_of_4": { n: 16 },
    diverse_shuffle_array: { array: [1, 2, 3, 4, 5, 6] },
    diverse_is_sorted_array: { array: [1, 2, 3, 4, 5, 6] },
    diverse_parse_nested_brackets: { text: "<MAIN hoge><MAIN2 fuga>", openBrackets: "<", closingBrackets: ">" },
    backtracking_generateparentheses: { n: 3 },
    backtracking_all_combinations_of_size_k: { n: 5, k: 2 },
    // Data structures (operation-driven)
    "structuri-de-date_stack_stack": { initial: [3, 7, 11], operations: "push 5\npush 9\npeek\npop\npush 4" },
    "structuri-de-date_stack_linked_list_stack": { initial: [3, 7, 11], operations: "push 5\npush 9\npeek\npop\npush 4" },
    "structuri-de-date_queue_queue": { initial: [4, 8, 12], operations: "enqueue 20\nenqueue 24\npeek\ndequeue\nenqueue 30" },
    "structuri-de-date_queue_array_queue": { initial: [4, 8, 12], operations: "enqueue 20\nenqueue 24\npeek\ndequeue\nenqueue 30" },
    "structuri-de-date_queue_circular_queue": { initial: [4, 8, 12], operations: "enqueue 20\nenqueue 24\npeek\ndequeue\nenqueue 30" },
    "structuri-de-date_queue_linked_queue": { initial: [4, 8, 12], operations: "enqueue 20\nenqueue 24\npeek\ndequeue\nenqueue 30" },
    "structuri-de-date_queue_stack_queue": { initial: [4, 8, 12], operations: "enqueue 20\nenqueue 24\npeek\ndequeue\nenqueue 30" },
    "structuri-de-date_list_singly_linked_list": { initial: [10, 20, 30], operations: "append 40\nprepend 5\ninsert 2 15\nfind 30\nremove 1" },
    "structuri-de-date_list_doubly_linked_list": { initial: [10, 20, 30], operations: "append 40\nprepend 5\ninsert 2 15\nfind 30\nremove 1" },
    "structuri-de-date_list_linked_list": { initial: [10, 20, 30], operations: "append 40\nprepend 5\ninsert 2 15\nfind 30\nremove 1" },
    "structuri-de-date_heap_heap": { initial: [20, 15, 10], operations: "insert 30\ninsert 18\ninsert 40" },
    "structuri-de-date_tree_binary_search_tree": { initial: [50, 30, 70, 20, 40, 60, 80], operations: "insert 65\ninsert 10\nfind 40\nfind 99\ninsert 75" },
    "structuri-de-date_map_map": { operations: "set a 1\nset b 2\nget a\ndelete b" },
    "structuri-de-date_map_hash_map": { operations: "set a 1\nset b 2\nget a\ndelete b" },
    "structuri-de-date_set_set": { operations: "add 1\nadd 2\nhas 1\ndelete 2" },
    "structuri-de-date_set_map_set": { operations: "add 1\nadd 2\nhas 1\ndelete 2" },
    "structuri-de-date_set_hash_map_set": { operations: "add 1\nadd 2\nhas 1\ndelete 2" },
    "structuri-de-date_disjoint_set_disjoint_set": { n: 6, operations: "union 0 1\nunion 1 2\nfind 2\nfind 5" },
    "structuri-de-date_tries_tries": { words: ["apple", "app", "apt"], operations: "insert apple\ninsert app\nsearch app\nsearch cat" },
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
    const eventType = String((event as any).type || "").toLowerCase();
    
    const lo = vars.lo !== undefined ? vars.lo : -1;
    const hi = vars.hi !== undefined ? vars.hi : -1;
    const mid = vars.mid !== undefined ? vars.mid : -1;

    const normalizedArray = array.map((v: number) => (Number.isFinite(v) ? Math.max(0, v) : 0));
    const maxVal = Math.max(...normalizedArray, 1);
    const chartHeight = 360;
    const primaryCompareIdx = highlightIndices[0];
    const secondaryCompareIdx = highlightIndices[1];
    const isSwapEvent = eventType.includes("swap");
    const hasCompareLegend = highlightIndices.length > 0;
    const hasSecondCompareLegend = highlightIndices.length > 1;
    const hasIndicatorLegend = mid !== -1 || currentIndex.length > 0;
    const hasSwapLegend = isSwapEvent;

    if (!Array.isArray(array) || array.length === 0) {
        return (
            <div className="w-full h-full min-h-[520px] flex items-center justify-center text-slate-400 font-semibold text-sm">
                Datele pentru sortare nu sunt disponibile. Verifică tab-ul „Date Intrare” și apasă Restart.
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[520px] flex flex-col justify-end gap-3 px-3 pb-4 items-center">
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-slate-500">
                {hasCompareLegend && <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> comparație A</span>}
                {hasSecondCompareLegend && <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> comparație B</span>}
                {hasSwapLegend && <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> swap</span>}
                {hasIndicatorLegend && <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> indicator (mid/index)</span>}
                <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> normal</span>
            </div>
            <div className="w-full flex items-end justify-center gap-2">
            {array.map((val: number, idx: number) => {
                let color = "bg-slate-200";
                let shadow = "";
                const isPrimaryCompare = idx === primaryCompareIdx;
                const isSecondaryCompare = idx === secondaryCompareIdx;
                const isHighlighted = highlightIndices.includes(idx) || currentIndex.includes(idx) || idx === mid;
                const isInRange = lo !== -1 && hi !== -1 && idx >= lo && idx <= hi;
            const normalizedVal = Number.isFinite(val) ? Math.max(0, val) : 0;
            const barHeightPx = Math.min(chartHeight, Math.max(12, (normalizedVal / maxVal) * chartHeight));

                if (isSwapEvent && (isPrimaryCompare || isSecondaryCompare)) {
                    color = "bg-gradient-to-t from-emerald-600 to-emerald-400 ring-2 ring-emerald-500 ring-offset-2";
                    shadow = "shadow-[0_-4px_20px_rgba(16,185,129,0.35)]";
                } else if (isPrimaryCompare) {
                    color = "bg-gradient-to-t from-sky-600 to-sky-400 ring-2 ring-sky-500 ring-offset-2";
                    shadow = "shadow-[0_-4px_20px_rgba(14,165,233,0.35)]";
                } else if (isSecondaryCompare) {
                    color = "bg-gradient-to-t from-rose-600 to-rose-400 ring-2 ring-rose-500 ring-offset-2";
                    shadow = "shadow-[0_-4px_20px_rgba(244,63,94,0.35)]";
                } else if (isHighlighted) {
                    color = "bg-gradient-to-t from-violet-600 to-violet-400 ring-2 ring-violet-500 ring-offset-2";
                    shadow = "shadow-[0_-4px_20px_rgba(124,58,237,0.35)]";
                } else if (isInRange) {
                    color = "bg-sky-100";
                }

                return (
                    <div key={idx} className="flex flex-col items-center flex-1 min-w-[16px] max-w-[96px] relative group">
                        <div className="w-full h-[360px] flex items-end">
                        <div 
                            className={`w-full rounded-t-xl transition-all duration-500 ease-out ${color} ${shadow}`}
                            style={{
                                height: `${barHeightPx}px`,
                            }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-md transition-opacity pointer-events-none font-bold">
                                {val}
                            </div>
                        </div>
                        </div>
                        <span className="mt-2 text-[10px] font-black text-slate-500 font-mono leading-tight">{val}</span>
                        <div className="h-6 flex items-center justify-center">
                            {idx === mid && <span className="text-[9px] font-black text-indigo-700 uppercase tracking-tighter">mid</span>}
                            {idx === lo && idx !== mid && <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">lo</span>}
                            {idx === hi && idx !== mid && <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">hi</span>}
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}

function SearchVisualizer({ event, input }: { event: TraceEvent; input: any }) {
    const array = (event as any).array || input.array || [];
    const vars = (event as any).vars || {};

    const toIndex = (value: unknown) => {
        const n = Number(value);
        return Number.isInteger(n) ? n : -1;
    };

    const loRaw = toIndex(vars.lo);
    const hiRaw = toIndex(vars.hi);
    const mid = toIndex(vars.mid);
    const current = toIndex(vars.current);
    const iIndex = toIndex(vars.i);
    const probeIndex = toIndex(vars.probe ?? vars.index);
    const foundIndex = toIndex(vars.foundIndex);

    const fibM = Number(vars.fibM);
    const offset = Number(vars.offset);
    const nVar = Number(vars.n);
    const nBound = Number.isFinite(nVar) ? nVar - 1 : array.length - 1;
    const fibLo = Number.isFinite(offset) ? Math.max(0, Math.min(nBound, offset + 1)) : -1;
    const fibHi = Number.isFinite(fibM) && Number.isFinite(offset)
        ? Math.max(0, Math.min(nBound, Math.floor(offset + fibM)))
        : -1;

    const lo = loRaw >= 0 ? loRaw : fibLo;
    const hi = hiRaw >= 0 ? hiRaw : fibHi;

    const activeIdxCandidates = [mid, current, iIndex, probeIndex, foundIndex];
    const activeIdx = activeIdxCandidates.find((idx) => idx >= 0 && idx < array.length) ?? -1;
    const target = Number(vars.target ?? input?.target);
    const activeVal = activeIdx >= 0 && activeIdx < array.length ? Number(array[activeIdx]) : NaN;
    const hasComparable = Number.isFinite(target) && Number.isFinite(activeVal);
    const compareText = hasComparable
        ? activeVal === target
            ? "egal"
            : activeVal < target
            ? "mai mic"
            : "mai mare"
        : "—";
    const isFound = ((event as any).type === "mark_found" && (event as any).found === true) || foundIndex >= 0;
    const isNotFound = ((event as any).type === "mark_found" && (event as any).found === false) || ((event as any).type === "done" && foundIndex === -1);

    if (!Array.isArray(array) || array.length === 0) {
        return <GenericVisualizer event={event} />;
    }

    const rangeSize = lo >= 0 && hi >= 0 && hi >= lo ? hi - lo + 1 : 0;
    const coveragePercent = array.length > 0 && rangeSize > 0 ? Math.max(0, Math.min(100, Math.round((rangeSize / array.length) * 100))) : 0;
    const compareHint = hasComparable
        ? activeVal === target
            ? "valoarea este identica cu target-ul"
            : activeVal < target
            ? "valoarea curenta este mai mica, cautarea merge spre dreapta"
            : "valoarea curenta este mai mare, cautarea merge spre stanga"
        : "algoritmul pregateste urmatoarea comparatie";
    const activeLabel = mid >= 0 ? "mid" : current >= 0 ? "cur" : iIndex >= 0 ? "i" : probeIndex >= 0 ? "probe" : "idx";
    const markerLabel = (idx: number) => {
        const labels: string[] = [];
        if (idx === lo) labels.push("lo");
        if (idx === hi) labels.push("hi");
        if (idx === mid) labels.push("mid");
        if (idx === current && mid === -1) labels.push("cur");
        if (idx === iIndex && mid === -1 && current === -1) labels.push("i");
        if (idx === probeIndex && mid === -1 && current === -1 && iIndex === -1) labels.push("probe");
        if (idx === foundIndex && foundIndex >= 0) labels.push("found");
        return labels;
    };

    return (
        <div className="w-full overflow-x-auto pb-6 flex flex-col items-center justify-center gap-6">
            <div className="w-full max-w-4xl rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                        <div className="text-[11px] uppercase font-black text-cyan-500 tracking-wide">Zona de cautare activa</div>
                        <div className="text-sm font-black text-cyan-800">{lo >= 0 && hi >= 0 ? `Interval [${lo}, ${hi}]` : "Interval nedefinit"}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[11px] uppercase font-black text-cyan-500 tracking-wide">Acoperire</div>
                        <div className="text-sm font-black text-cyan-800">{coveragePercent}% din vector</div>
                    </div>
                </div>
                <div className="mt-3 h-3 w-full rounded-full bg-cyan-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-500" style={{ width: `${coveragePercent}%` }} />
                </div>
                <p className="mt-3 text-xs font-semibold text-cyan-900">{compareHint}</p>
            </div>

            <div className="flex items-stretch justify-center gap-4 min-w-max mx-auto px-4 flex-wrap">
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
                            <div className="h-8 flex flex-col items-center justify-end">
                                {isActive && (
                                    <>
                                        <span className="text-[9px] font-black text-indigo-700 uppercase">{activeLabel}</span>
                                        <span className="text-indigo-500 text-xs leading-none">▼</span>
                                    </>
                                )}
                            </div>
                            <div className={`w-20 h-20 flex items-center justify-center rounded-2xl font-mono font-black text-lg transition-all duration-300 ${cellClass}`}>
                                {val}
                            </div>
                            <div className="h-6 flex items-center justify-center gap-1">
                                {markerLabel(idx).map((label) => (
                                    <span
                                        key={label}
                                        className={`text-[10px] font-black uppercase ${
                                            label === "lo"
                                                ? "text-sky-600"
                                                : label === "hi"
                                                ? "text-amber-600"
                                                : label === "found"
                                                ? "text-emerald-600"
                                                : "text-indigo-700"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                            <span className="text-[10px] text-slate-300 font-mono">{idx}</span>
                        </div>
                    );
                })}
            </div>

            <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-black">
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-600 text-center">normal</div>
                <div className="rounded-xl border border-indigo-200 bg-indigo-100 px-3 py-2 text-indigo-700 text-center">in interval</div>
                <div className="rounded-xl border border-indigo-300 bg-indigo-600 px-3 py-2 text-white text-center">pozitie testata</div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-500 px-3 py-2 text-white text-center">gasit</div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400 text-center">eliminat</div>
            </div>

            <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <div className="text-[11px] uppercase font-black text-slate-400">Target</div>
                    <div className="text-base font-black text-slate-700">{Number.isFinite(target) ? target : "—"}</div>
                </div>
                <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center">
                    <div className="text-[11px] uppercase font-black text-indigo-400">Valoare curentă</div>
                    <div className="text-base font-black text-indigo-700">{Number.isFinite(activeVal) ? activeVal : "—"}</div>
                </div>
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center">
                    <div className="text-[11px] uppercase font-black text-rose-400">Comparare</div>
                    <div className="text-base font-black text-rose-700">{compareText}</div>
                </div>
                <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-center">
                    <div className="text-[11px] uppercase font-black text-sky-400">Interval</div>
                    <div className="text-base font-black text-sky-700">{lo >= 0 && hi >= 0 ? `[${lo}, ${hi}]` : "—"}</div>
                </div>
            </div>
            {isFound && (
                <p className="text-center mt-2 text-emerald-600 font-black text-lg">✓ Elementul a fost găsit</p>
            )}
            {isNotFound && (
                <p className="text-center mt-2 text-rose-500 font-black text-lg">✗ Elementul nu a fost găsit</p>
            )}
        </div>
    );
}

function GraphVisualizer({ event, input }: { event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const nodes: string[] = Array.isArray(input?.nodes) ? input.nodes.map(String) : [];
    const edges: { from: string; to: string; weight?: number }[] = Array.isArray(input?.edges)
        ? input.edges.map((edge: any) => ({
              from: String(edge?.from ?? ""),
              to: String(edge?.to ?? ""),
              ...(edge?.weight !== undefined ? { weight: Number(edge.weight) } : {}),
          }))
        : [];

    const visited: Set<string> = new Set(Array.isArray(vars.visited) ? vars.visited.map(String) : vars.visited ? [String(vars.visited)] : []);
    const inQueue: Set<string> = new Set(Array.isArray(vars.queue) ? vars.queue.map(String) : vars.queue ? [String(vars.queue)] : []);
    const inMST = new Set<string>(Array.isArray(vars.inMST) ? vars.inMST.map(String) : []);
    const mstEdges = Array.isArray(vars.mstEdges)
        ? vars.mstEdges
        : Array.isArray(ev?.result?.mstEdges)
        ? ev.result.mstEdges
        : [];
    const mstEdgeSet = new Set<string>(mstEdges.map((edge: any) => `${String(edge.from)}->${String(edge.to)}`));
    const distances: Record<string, number> = vars.distances || {};
    const currentNode: string = String(ev.node || vars.current || vars.intermediar || vars.from || vars.to || "");
    const matrix = Array.isArray(vars.distanta)
        ? vars.distanta
        : Array.isArray(ev?.result?.distances) && Array.isArray(ev.result.distances[0])
        ? ev.result.distances
        : null;
    const negativeCycle = Boolean(vars.hasNegativeCycle ?? ev?.result?.hasNegativeCycle ?? false);
    const currentFrom = String(vars.from ?? vars.currentFrom ?? ev?.edge?.from ?? "");
    const currentTo = String(vars.to ?? vars.currentTo ?? ev?.edge?.to ?? "");
    const currentWeight = Number(vars.weight ?? ev?.edge?.weight);
    const hasCurrentEdge = currentFrom.length > 0 && currentTo.length > 0;
    const comparisons = Number(vars.comparisons ?? vars.comparisonCount ?? vars.relaxations ?? vars.checkedEdges);
    const updates = Number(vars.updates ?? vars.relaxationsDone ?? vars.processed ?? vars.updateCount);
    const distanceEntries = nodes
        .filter((node) => distances[node] !== undefined)
        .map((node) => ({ node, value: distances[node] }));
    const numericVarEntries = Object.entries(vars)
        .filter(([key, value]) => {
            if (key === "distances") return false;
            if (key === "distanta") return false;
            if (key === "queue") return false;
            if (key === "visited") return false;
            if (key === "mstEdges") return false;
            if (key === "inMST") return false;
            if (key === "from") return false;
            if (key === "to") return false;
            if (key === "current") return false;
            return typeof value === "number" && Number.isFinite(value);
        })
        .slice(0, 8);

    const cx = 240;
    const cy = 200;
    const nodeCount = nodes.length;
    const radius = Math.max(110, Math.min(160, 200 - nodeCount * 3));
    const nodePositions: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n, i) => {
        const angle = nodeCount > 0 ? (i / nodeCount) * 2 * Math.PI - Math.PI / 2 : 0;
        nodePositions[n] = {
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle),
        };
    });

    const formatDistance = (value: unknown) => {
        if (value === Infinity) return "∞";
        if (typeof value === "number" && Number.isFinite(value)) return String(value);
        return "—";
    };

    const matrixTable = matrix ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 overflow-x-auto w-full max-w-full">
            <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Matrice distanțe</div>
            <table className="min-w-max text-xs border-collapse">
                <thead>
                    <tr>
                        <th className="p-2 border border-slate-200 bg-slate-50"></th>
                        {nodes.map((node) => (
                            <th key={node} className="p-2 border border-slate-200 bg-slate-50 font-black text-slate-600">{node}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row: number[], rowIndex: number) => {
                        return (
                            <tr key={rowIndex}>
                                <th className="p-2 border border-slate-200 bg-slate-50 font-black text-slate-600">{nodes[rowIndex]}</th>
                                {row.map((value, colIndex) => {
                                    const isInfinite = value === Infinity;
                                    return (
                                        <td
                                            key={colIndex}
                                            className={`p-2 border border-slate-200 text-center font-mono ${isInfinite ? "text-slate-300" : "text-slate-700"}`}
                                        >
                                            {isInfinite ? "∞" : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) : null;

    if (!nodes.length) {
        return <GenericVisualizer event={event} />;
    }

    return (
        <div className="w-full space-y-4">
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-4 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                        <div className="text-[10px] uppercase font-black text-indigo-400">Pas explicat</div>
                        <div className="text-sm font-black text-indigo-800">{String(ev.note || vars.note || ev.type || "step")}</div>
                    </div>
                    {hasCurrentEdge && (
                        <div className="rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-black text-indigo-700">
                            Muchie analizata: {currentFrom} → {currentTo}{Number.isFinite(currentWeight) ? ` (w=${currentWeight})` : ""}
                        </div>
                    )}
                </div>
                <div className="grid gap-2 sm:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Noduri vizitate</div>
                        <div className="text-sm font-black text-slate-700">{visited.size}/{nodes.length}</div>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-amber-500">În coadă</div>
                        <div className="text-sm font-black text-amber-700">{inQueue.size}</div>
                    </div>
                    <div className="rounded-xl border border-indigo-200 bg-white px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Comparații / relaxări</div>
                        <div className="text-sm font-black text-indigo-700">{Number.isFinite(comparisons) ? comparisons : "—"}</div>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-emerald-500">Actualizări</div>
                        <div className="text-sm font-black text-emerald-700">{Number.isFinite(updates) ? updates : "—"}</div>
                    </div>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-slate-400">Nod curent</div>
                    <div className="font-black text-slate-800 text-sm">{currentNode || "—"}</div>
                </div>
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-indigo-400">Pas</div>
                    <div className="font-black text-indigo-700 text-sm">{String(ev.type || "step")}</div>
                </div>
                <div className={`rounded-2xl px-4 py-3 text-center border ${negativeCycle ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}>
                    <div className={`text-[10px] uppercase font-black ${negativeCycle ? "text-rose-400" : "text-emerald-400"}`}>Stare</div>
                    <div className={`font-black text-sm ${negativeCycle ? "text-rose-700" : "text-emerald-700"}`}>{negativeCycle ? "Ciclu negativ" : "OK"}</div>
                </div>
            </div>

            {mstEdges.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <div className="text-[10px] uppercase font-black text-slate-400">APM / muchii selectate</div>
                    <div className="flex flex-wrap gap-2">
                        {mstEdges.map((edge: any, index: number) => (
                            <span key={`${edge.from}-${edge.to}-${index}`} className="px-3 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-700 font-mono text-xs font-black">
                                {edge.from} → {edge.to} ({edge.weight})
                            </span>
                        ))}
                    </div>
                    {vars.mstWeight !== undefined && (
                        <div className="text-sm font-bold text-slate-600">Cost total: <span className="text-emerald-700">{vars.mstWeight}</span></div>
                    )}
                </div>
            )}

            <div className="flex flex-col items-center gap-3">
                <svg width="520" height="420" viewBox="0 0 520 420" className="overflow-visible max-w-full">
                {edges.map((e, i) => {
                    const from = nodePositions[e.from];
                    const to = nodePositions[e.to];
                    if (!from || !to) return null;
                    const edgeKey = `${e.from}->${e.to}`;
                    const reversedKey = `${e.to}->${e.from}`;
                    const isTreeEdge = mstEdgeSet.has(edgeKey) || mstEdgeSet.has(reversedKey);
                    const isActive = (e.from === currentNode || e.to === currentNode) || (visited.has(e.from) || visited.has(e.to));
                    const isCurrentEdge = hasCurrentEdge && ((e.from === currentFrom && e.to === currentTo) || (e.from === currentTo && e.to === currentFrom));
                    return (
                        <g key={i}>
                            <line
                                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                stroke={isCurrentEdge ? "#f59e0b" : isTreeEdge ? "#10b981" : isActive ? "#6366f1" : "#e2e8f0"}
                                strokeWidth={isCurrentEdge ? 4.5 : isTreeEdge ? 3.5 : isActive ? 2.5 : 1.5}
                                strokeDasharray={isCurrentEdge ? "7 5" : "0"}
                                strokeLinecap="round"
                            />
                            {e.weight !== undefined && (
                                <text
                                    x={(from.x + to.x) / 2}
                                    y={(from.y + to.y) / 2 - 6}
                                    fontSize="10"
                                    fill={isCurrentEdge ? "#b45309" : isTreeEdge ? "#047857" : "#94a3b8"}
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
                    const isInMST = inMST.has(n);

                    let fill = "#f8fafc";
                    let stroke = "#cbd5e1";
                    let textFill = "#64748b";
                    if (isCurrent) { fill = "#6366f1"; stroke = "#4338ca"; textFill = "#fff"; }
                    else if (isInMST) { fill = "#d1fae5"; stroke = "#10b981"; textFill = "#065f46"; }
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
                                    d={formatDistance(dist)}
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
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-400 inline-block" /> APM</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Muchie analizată</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300 inline-block" /> Nevizitat</span>
            </div>

            {(distanceEntries.length > 0 || numericVarEntries.length > 0) && (
                <div className="grid gap-3 lg:grid-cols-2">
                    {distanceEntries.length > 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Distanțe curente pe noduri</div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {distanceEntries.map((entry) => (
                                    <div key={entry.node} className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-center">
                                        <div className="text-[10px] font-black text-indigo-400 uppercase">{entry.node}</div>
                                        <div className="text-sm font-black text-indigo-700">{formatDistance(entry.value)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {numericVarEntries.length > 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Valori calculate la pasul curent</div>
                            <div className="grid grid-cols-2 gap-2">
                                {numericVarEntries.map(([key, value]) => (
                                    <div key={key} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                                        <div className="text-[10px] font-black text-slate-400 uppercase">{key}</div>
                                        <div className="text-sm font-black text-slate-700">{String(value)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {matrixTable}
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
        return <GenericVisualizer event={event} />;
    }

    const maxRows = Math.min(table.length, 12);
    const maxCols = Math.min(table[0]?.length ?? 0, 16);

    return (
        <div className="w-full overflow-x-auto pb-4 flex flex-col items-center justify-center gap-4">
            <table className="mx-auto border-collapse text-sm font-mono">
                <tbody>
                    {table.slice(0, maxRows).map((row, ri) => (
                        <tr key={ri}>
                            {row.slice(0, maxCols).map((cell, ci) => {
                                const isCurrent = ri === currentRow && ci === currentCol;
                                const isCurrentRow = ri === currentRow;
                                return (
                                    <td
                                        key={ci}
                                        className={`w-14 h-14 text-center border transition-all duration-300 font-black text-base ${
                                            isCurrent
                                                ? "bg-indigo-600 text-white border-indigo-700 scale-110 z-10 relative shadow-lg"
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
                <p className="text-center mt-2 text-base font-black text-slate-700">
                    Calculez dp[{currentRow}][{currentCol}] = {ev.value}
                </p>
            )}
        </div>
    );
}

function GenericVisualizer({ event }: { event: TraceEvent }) {
    const ev = event as any;
    const array: number[] = ev.array || [];
    const vars = ev.vars || {};
    const rawResultValue = ev.result ?? vars.result ?? vars.rezultat ?? vars.output ?? vars.value;
    const eventType = String(ev.type || "step");

    const unwrapResult = (value: any): any => {
        if (value === null || value === undefined) return value;
        if (typeof value !== "object" || Array.isArray(value)) return value;
        const preferredKeys = ["result", "value", "output", "isValid", "ok", "found", "balanced", "isPrime", "isLeap"];
        for (const key of preferredKeys) {
            if (key in value) return value[key];
        }
        const keys = Object.keys(value);
        if (keys.length === 1) return value[keys[0]];
        return value;
    };

    const resultValue = unwrapResult(rawResultValue);

    const comparePairs: Array<{ label: string; left: unknown; right: unknown; result: string }> = [];
    if (vars.i !== undefined && vars.j !== undefined) {
        comparePairs.push({
            label: "i vs j",
            left: vars.i,
            right: vars.j,
            result: Number(vars.i) === Number(vars.j) ? "=" : Number(vars.i) < Number(vars.j) ? "<" : ">",
        });
    }
    if (vars.left !== undefined && vars.right !== undefined) {
        comparePairs.push({
            label: "left vs right",
            left: vars.left,
            right: vars.right,
            result: Number(vars.left) === Number(vars.right) ? "=" : Number(vars.left) < Number(vars.right) ? "<" : ">",
        });
    }
    if (vars.current !== undefined && vars.target !== undefined) {
        comparePairs.push({
            label: "current vs target",
            left: vars.current,
            right: vars.target,
            result: Number(vars.current) === Number(vars.target) ? "=" : Number(vars.current) < Number(vars.target) ? "<" : ">",
        });
    }

    const renderValue = (val: any): string => {
        if (Array.isArray(val)) return `[${val.join(", ")}]`;
        if (typeof val === "object" && val !== null) return JSON.stringify(val);
        return String(val);
    };

    const showResultCard = !(eventType === "done" && typeof resultValue === "boolean");

    return (
        <div className="w-full h-full min-h-[420px] space-y-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl grid gap-3 sm:grid-cols-1">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-slate-400">Tip pas</div>
                    <div className="text-sm font-black text-slate-800 font-mono">{eventType}</div>
                </div>
            </div>

            {showResultCard && resultValue !== undefined && resultValue !== null && (
                <div className="w-full max-w-4xl rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-emerald-400">Rezultat / stare finală</div>
                    <div className="mt-1 font-mono text-sm font-black text-emerald-700 break-words">
                        {renderValue(resultValue)}
                    </div>
                </div>
            )}

            {array.length > 0 && (
                <div className="overflow-x-auto pb-4 w-full">
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

            {comparePairs.length > 0 && (
                <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {comparePairs.map((pair) => (
                        <div key={pair.label} className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-center">
                            <div className="text-[10px] uppercase font-black text-sky-500">{pair.label}</div>
                            <div className="text-sm font-black text-sky-700 font-mono">
                                {String(pair.left)} {pair.result} {String(pair.right)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {vars && Object.keys(vars).length > 0 && (
                <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(vars).map(([key, val]) => {
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

            {array.length === 0 && (!vars || Object.keys(vars).length === 0) && (
                <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500 text-center">
                    Vizualizarea algoritmului este disponibilă, dar acest pas nu conține date structurate (array/vars).
                </div>
            )}
        </div>
    );
}

function BacktrackingVisualizer({ slug, event, input }: { slug: string; event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const result = ev.result || vars.result || {};
    const combinations = Array.isArray(result?.combinations) ? result.combinations : [];
    const currentString = String(vars.combinatie ?? vars.sir_curent ?? vars.curent ?? vars.exemple ?? "");
    const n = Number(vars.n ?? input?.n ?? 0);
    const k = Number(vars.k ?? input?.k ?? 0);

    return (
        <div className="w-full h-full min-h-[420px] space-y-5 flex flex-col justify-center">
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-amber-400">Algoritm</div>
                    <div className="font-black text-amber-700 text-sm">{slug === "backtracking_generateparentheses" ? "Generare Paranteze" : "Combinații"}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-slate-400">Input</div>
                    <div className="font-mono text-sm font-black text-slate-700">{slug === "backtracking_generateparentheses" ? `n = ${n}` : `n = ${n}, k = ${k}`}</div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-emerald-400">Rezultat</div>
                    <div className="font-mono text-sm font-black text-emerald-700">{Number(vars.total ?? combinations.length ?? 0)} rezultate</div>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="text-[10px] uppercase font-black text-slate-400">Stare curentă</div>
                <div className="flex flex-wrap gap-2">
                    {currentString ? currentString.split("").map((char, index) => (
                        <span key={`${char}-${index}`} className={`min-w-8 px-2.5 py-2 rounded-xl border font-black text-sm text-center ${char === "(" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : char === ")" ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                            {char}
                        </span>
                    )) : <span className="text-sm text-slate-400 font-semibold">Nu există prefix curent în acest pas.</span>}
                </div>
                {slug === "backtracking_generateparentheses" && (
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-black uppercase">
                        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-emerald-700">Deschise: {Number(vars.deschise ?? 0)}</div>
                        <div className="rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-rose-700">Închise: {Number(vars.inchise ?? 0)}</div>
                        <div className="rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 text-sky-700">Total: {Number(vars.total ?? combinations.length ?? 0)}</div>
                    </div>
                )}
                {slug === "backtracking_all_combinations_of_size_k" && (
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-black uppercase">
                        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-emerald-700">Pas: {Number(vars.pozitie ?? 0)}</div>
                        <div className="rounded-xl bg-indigo-50 border border-indigo-200 px-3 py-2 text-indigo-700">Element: {Number(vars.element ?? 0)}</div>
                        <div className="rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 text-sky-700">Găsite: {Number(vars.nr ?? combinations.length ?? 0)}</div>
                    </div>
                )}
            </div>

            {combinations.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Combinații generate</div>
                    <div className="flex flex-wrap gap-2">
                        {combinations.slice(0, 8).map((combo: any, index: number) => (
                            <span key={index} className="rounded-xl bg-white border border-slate-200 px-3 py-2 font-mono text-xs font-black text-slate-700">
                                {Array.isArray(combo) ? `[${combo.join(", ")}]` : String(combo)}
                            </span>
                        ))}
                        {combinations.length > 8 && <span className="rounded-xl bg-white border border-slate-200 px-3 py-2 font-mono text-xs font-black text-slate-500">+{combinations.length - 8} altele</span>}
                    </div>
                </div>
            )}

            <GenericVisualizer event={event} />
        </div>
    );
}

function DiverseVisualizer({ slug, event, input }: { slug: string; event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const result = ev.result || vars.result || {};
    const array: number[] = Array.isArray(ev.array) ? ev.array : Array.isArray(input?.array) ? input.array : [];
    const shuffled: Array<number | string> = Array.isArray(result?.shuffled) ? result.shuffled : [];
    const tags = Array.isArray(result?.tags) ? result.tags : Array.isArray(vars.tags) ? vars.tags : [];
    const balanced = Boolean(vars.balanced ?? result?.balanced ?? false);
    const text = String(input?.text ?? vars.text ?? "");
    const currentIndex = Number(vars.index ?? -1);
    const stackIndices: number[] = Array.isArray(vars.stack) ? vars.stack : [];
    const activeToken = String(vars.token ?? "");

    return (
        <div className="w-full h-full min-h-[420px] space-y-5 flex flex-col justify-center">
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-slate-400">Algoritm</div>
                    <div className="font-black text-slate-800 text-sm">{slug.replace("diverse_", "")}</div>
                </div>
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-indigo-400">Pas</div>
                    <div className="font-black text-indigo-700 text-sm">{String(ev.type || "step")}</div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-emerald-400">Stare</div>
                    <div className="font-black text-emerald-700 text-sm">{slug === "diverse_parse_nested_brackets" ? (balanced ? "Echilibrat" : "Neechilibrat") : "Executare"}</div>
                </div>
            </div>

            {slug === "diverse_shuffle_array" && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-4">
                    {(() => {
                        const activeArray: Array<number | string> = (shuffled.length ? shuffled : array).map((value) =>
                            typeof value === "number" || typeof value === "string" ? value : String(value)
                        );
                        const baseArray: Array<number | string> = (Array.isArray(input?.array) ? input.array : array).map((value: unknown) =>
                            typeof value === "number" || typeof value === "string" ? value : String(value)
                        );
                        const i = Number(vars.i ?? -1);
                        const j = Number(vars.j ?? -1);
                        const ai = vars["arr[i]"] ?? (i >= 0 ? activeArray[i] : undefined);
                        const aj = vars["arr[j]"] ?? (j >= 0 ? activeArray[j] : undefined);
                        const numericValues = activeArray
                            .map((v) => Number(v))
                            .filter((n) => Number.isFinite(n));
                        const maxVal = Math.max(1, ...numericValues);

                        return (
                            <>
                                <div className="grid gap-3 sm:grid-cols-4">
                                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-center">
                                        <div className="text-[10px] uppercase font-black text-indigo-400">Indice i</div>
                                        <div className="text-lg font-black text-indigo-700">{i >= 0 ? i : "—"}</div>
                                    </div>
                                    <div className="rounded-2xl border border-sky-200 bg-sky-50 px-3 py-3 text-center">
                                        <div className="text-[10px] uppercase font-black text-sky-400">Indice j</div>
                                        <div className="text-lg font-black text-sky-700">{j >= 0 ? j : "—"}</div>
                                    </div>
                                    <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-3 py-3 text-center">
                                        <div className="text-[10px] uppercase font-black text-fuchsia-400">arr[i]</div>
                                        <div className="text-lg font-black text-fuchsia-700">{ai !== undefined ? String(ai) : "—"}</div>
                                    </div>
                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-center">
                                        <div className="text-[10px] uppercase font-black text-emerald-400">arr[j]</div>
                                        <div className="text-lg font-black text-emerald-700">{aj !== undefined ? String(aj) : "—"}</div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Swap în execuție</div>
                                    <div className="flex items-center justify-center gap-3 text-sm font-black flex-wrap">
                                        <span className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200">poz {i >= 0 ? i : "?"}</span>
                                        <span className="text-indigo-500 animate-pulse">⇄</span>
                                        <span className="px-3 py-2 rounded-xl bg-sky-100 text-sky-700 border border-sky-200">poz {j >= 0 ? j : "?"}</span>
                                    </div>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                        <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Înainte (input inițial)</div>
                                        <div className="flex flex-wrap gap-2">
                                            {baseArray.map((value: number | string, index: number) => (
                                                <span
                                                    key={`base-${value}-${index}`}
                                                    className={`px-3 py-2 rounded-xl border font-mono text-sm font-black ${index === i ? "bg-indigo-100 border-indigo-300 text-indigo-700" : index === j ? "bg-sky-100 border-sky-300 text-sky-700" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                                >
                                                    {value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                        <div className="text-[10px] uppercase font-black text-slate-400 mb-2">După pasul curent</div>
                                        <div className="flex flex-wrap gap-2">
                                            {activeArray.map((value: number | string, index: number) => (
                                                <span
                                                    key={`current-${value}-${index}`}
                                                    className={`px-3 py-2 rounded-xl border font-mono text-sm font-black transition-all duration-300 ${index === i ? "bg-indigo-600 border-indigo-700 text-white scale-105" : index === j ? "bg-sky-600 border-sky-700 text-white scale-105" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                                >
                                                    {value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Vedere grafică pe valori</div>
                                    <div className="flex items-end gap-2 overflow-x-auto pb-1">
                                        {activeArray.map((value: number | string, index: number) => {
                                            const n = Number(value);
                                            const isNumeric = Number.isFinite(n);
                                            const h = isNumeric ? Math.max(16, Math.round((n / maxVal) * 120)) : 24;
                                            const cls = index === i ? "from-indigo-600 to-indigo-400" : index === j ? "from-sky-600 to-sky-400" : "from-slate-500 to-slate-300";
                                            return (
                                                <div key={`bar-${index}`} className="flex flex-col items-center min-w-[34px] gap-1">
                                                    <div
                                                        className={`w-7 rounded-t-md bg-gradient-to-t ${cls} transition-all duration-500`}
                                                        style={{ height: `${h}px` }}
                                                    />
                                                    <span className="text-[10px] font-black text-slate-500">{String(value)}</span>
                                                    <span className="text-[9px] text-slate-300 font-mono">{index}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}

            {slug === "diverse_is_sorted_array" && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-3">
                    <div className="text-[10px] uppercase font-black text-slate-400">Comparare vecină</div>
                    <div className="flex flex-wrap gap-2">
                        {array.map((value, index) => {
                            const next = array[index + 1];
                            const isFail = next !== undefined && value >= next;
                            return (
                                <span key={`${value}-${index}`} className={`px-3 py-2 rounded-xl border font-mono text-sm font-black ${isFail ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                                    {value}{next !== undefined ? ` ≤ ${next}` : ""}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {slug === "diverse_parse_nested_brackets" && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-4">
                    <div className="text-[10px] uppercase font-black text-slate-400">Stare parser</div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 overflow-x-auto">
                        <div className="flex flex-wrap gap-1 min-w-max">
                            {text.split("").map((ch, idx) => {
                                const isCurrent = idx === currentIndex;
                                const isOpenIdx = stackIndices.includes(idx);
                                return (
                                    <span
                                        key={`${ch}-${idx}`}
                                        className={`h-8 min-w-8 px-2 rounded-lg border text-xs font-black flex items-center justify-center transition-all ${isCurrent ? "bg-indigo-600 border-indigo-700 text-white scale-110" : isOpenIdx ? "bg-amber-100 border-amber-300 text-amber-700" : "bg-white border-slate-200 text-slate-600"}`}
                                        title={`index ${idx}`}
                                    >
                                        {ch === " " ? "·" : ch}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
                            <div className="text-[10px] uppercase font-black text-amber-500 mb-2">Stivă poziții deschise</div>
                            <div className="flex flex-wrap gap-2">
                                {stackIndices.length ? stackIndices.map((idx) => (
                                    <span key={idx} className="px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-700 font-mono text-xs font-black">{idx}</span>
                                )) : <span className="text-xs text-amber-500 font-semibold">Goală</span>}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3">
                            <div className="text-[10px] uppercase font-black text-indigo-500 mb-2">Token curent</div>
                            <div className="font-mono text-sm font-black text-indigo-700 break-words">{activeToken || "—"}</div>
                        </div>
                    </div>

                    <div className="text-[10px] uppercase font-black text-slate-400">Paranteze extrase</div>
                    <div className="flex flex-wrap gap-2">
                        {tags.length ? tags.map((tag: string, index: number) => (
                            <span key={`${tag}-${index}`} className="px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50 font-mono text-sm font-black text-indigo-700">{tag}</span>
                        )) : <span className="text-sm text-slate-400 font-semibold">Nicio secvență extrasă încă.</span>}
                    </div>
                </div>
            )}

            {slug !== "diverse_parse_nested_brackets" && slug !== "diverse_shuffle_array" && <GenericVisualizer event={event} />}
        </div>
    );
}

function CipherVisualizer({ event, input }: { event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const source = String(input?.str ?? input?.text ?? vars.str ?? vars.text ?? "");
    const key = Number(input?.key ?? vars.key ?? 0);
    const output = String((ev.result && (ev.result.value ?? ev.result.output ?? ev.result.result)) ?? vars.rezultat ?? vars.result ?? vars.output ?? "");
    const pairs = Array.from({ length: Math.max(source.length, output.length) }, (_, index) => {
        const src = source[index] ?? "";
        const out = output[index] ?? "";
        return {
            index,
            src,
            out,
            srcCode: src ? src.charCodeAt(0) : null,
            outCode: out ? out.charCodeAt(0) : null,
            xorCode: src ? (src.charCodeAt(0) ^ key) : null,
        };
    }).filter((item) => item.src || item.out);

    return (
        <div className="w-full h-full min-h-[420px] space-y-5 flex flex-col justify-center">
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-fuchsia-400">Text</div>
                    <div className="font-mono text-sm font-black text-fuchsia-700 break-words">{source || "—"}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-slate-400">Cheie</div>
                    <div className="font-mono text-sm font-black text-slate-700">{Number.isFinite(key) ? key : "—"}</div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                    <div className="text-[10px] uppercase font-black text-emerald-400">Ieșire</div>
                    <div className="font-mono text-sm font-black text-emerald-700 break-words">{output || "—"}</div>
                </div>
            </div>

            {pairs.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 overflow-x-auto">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Transformare pe caractere</div>
                    <div className="min-w-max space-y-2">
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(1, pairs.length)}, minmax(48px, 1fr))` }}>
                            {pairs.map((pair) => (
                                <div key={pair.index} className="rounded-xl bg-slate-50 border border-slate-200 px-2 py-3 text-center space-y-1">
                                    <div className="text-[10px] font-black text-slate-400">#{pair.index + 1}</div>
                                    <div className="font-mono font-black text-slate-800">{pair.src || "·"}</div>
                                    <div className="text-[10px] text-slate-400">{pair.srcCode ?? "—"} XOR {Number.isFinite(key) ? key : "—"}</div>
                                    <div className="font-mono font-black text-emerald-700">{pair.out || "·"}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <GenericVisualizer event={event} />
        </div>
    );
}

const CUSTOM_MATH_VISUAL_SLUGS = new Set([
    "matematica_sieve_of_eratosthenes",
    "matematica_greatest_common_factor",
    "matematica_prime_factorization",
    "matematica_binary_convert",
    "matematica_lowest_common_multiple",
    "matematica_binomial_coefficient",
    "matematica_is_leap_year",
    "matematica_zellers_congruence",
    "matematica_double_factorial_iterative",
    "matematica_factorial",
    "matematica_factors",
    "manipulare-biti_add_binary",
]);

const BACKTRACKING_VISUAL_SLUGS = new Set([
    "backtracking_generateparentheses",
    "backtracking_all_combinations_of_size_k",
]);

const DIVERSE_VISUAL_SLUGS = new Set([
    "diverse_is_sorted_array",
    "diverse_parse_nested_brackets",
    "diverse_shuffle_array",
]);

const CIPHER_VISUAL_SLUGS = new Set([
    "cifru_xor_cipher",
]);

const GRAPH_VISUAL_SLUGS = new Set([
    "grafuri_bellman_ford",
    "grafuri_dijkstra",
    "grafuri_bipartite_graph",
    "grafuri_edmonds_karp",
    "grafuri_floyd_warshall",
    "grafuri_johnson",
    "grafuri_kosaraju",
    "grafuri_kruskal",
    "grafuri_dfs",
    "grafuri_bfs",
    "grafuri_prim",
    "grafuri_tarjan",
]);

const DATA_STRUCTURE_SLUGS = new Set([
    "structuri-de-date_stack_stack",
    "structuri-de-date_stack_linked_list_stack",
    "structuri-de-date_queue_queue",
    "structuri-de-date_queue_array_queue",
    "structuri-de-date_queue_circular_queue",
    "structuri-de-date_queue_linked_queue",
    "structuri-de-date_queue_stack_queue",
    "structuri-de-date_list_singly_linked_list",
    "structuri-de-date_list_doubly_linked_list",
    "structuri-de-date_list_linked_list",
    "structuri-de-date_heap_heap",
    "structuri-de-date_tree_binary_search_tree",
    "structuri-de-date_map_map",
    "structuri-de-date_map_hash_map",
    "structuri-de-date_set_set",
    "structuri-de-date_set_map_set",
    "structuri-de-date_set_hash_map_set",
    "structuri-de-date_disjoint_set_disjoint_set",
    "structuri-de-date_tries_tries",
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

function MathCategoryFrame({ slug, event, children }: { slug: string; event: TraceEvent; children: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const readableSlug = slug
        .replace(/^matematica_/, "")
        .replace(/^manipulare-biti_/, "")
        .replace(/_/g, " ");
    const title = readableSlug.charAt(0).toUpperCase() + readableSlug.slice(1);
    const stepLabel = String(ev.note || vars.note || ev.type || "step");
    const numericEntries = Object.entries(vars)
        .filter(([key, value]) => {
            if (key === "triangle") return false;
            if (key === "sequence") return false;
            if (key === "array") return false;
            return typeof value === "number" && Number.isFinite(value);
        })
        .slice(0, 6);
    const rawInput = (vars && typeof vars.input === "object" ? vars.input : null) || {};
    const inputEntries = Object.entries(rawInput).slice(0, 4);
    const rawResult =
        ev?.result?.value ??
        ev?.result?.result ??
        ev?.result?.output ??
        ev?.result?.rezultat ??
        ev?.result ??
        vars.rezultat ??
        vars.result ??
        vars.output ??
        vars.value;
    const compactResult = (() => {
        if (Array.isArray(rawResult)) return `[${rawResult.slice(0, 8).join(", ")}${rawResult.length > 8 ? ", ..." : ""}]`;
        if (typeof rawResult === "object" && rawResult !== null) return JSON.stringify(rawResult);
        return String(rawResult ?? "—");
    })();

    return (
        <div className="w-full h-full min-h-[420px] overflow-x-auto">
            <div className="w-full max-w-5xl mx-auto space-y-4 py-1">
                <div className="rounded-3xl border border-lime-200 bg-gradient-to-br from-lime-50 via-emerald-50 to-cyan-50 p-4 sm:p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                            <div className="text-[10px] uppercase font-black tracking-wider text-lime-600">Matematică vizuală</div>
                            <div className="text-base sm:text-lg font-black text-slate-800">{title}</div>
                        </div>
                        <div className="px-3 py-1.5 rounded-xl border border-lime-200 bg-white text-[11px] font-black text-lime-700">
                            Pas: {String(ev.type || "step")}
                        </div>
                    </div>
                    <div className="mt-3 rounded-2xl border border-lime-100 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700">
                        {stepLabel}
                    </div>
                </div>

                {numericEntries.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {numericEntries.map(([key, value]) => (
                            <div key={key} className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                                <div className="text-[10px] uppercase font-black text-emerald-500">{key}</div>
                                <div className="text-sm font-black text-emerald-800 font-mono">{String(value)}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="rounded-3xl border border-cyan-100 bg-cyan-50/70 px-3 py-3">
                    <div className="text-[10px] uppercase font-black text-cyan-500 mb-2">Flux live: intrare → calcul → rezultat</div>
                    <div className="grid md:grid-cols-3 gap-2 items-stretch">
                        <div className="rounded-2xl border border-cyan-100 bg-white px-3 py-2">
                            <div className="text-[10px] uppercase font-black text-slate-400 mb-1">Intrare</div>
                            <div className="flex flex-wrap gap-1.5">
                                {inputEntries.length > 0 ? (
                                    inputEntries.map(([key, value], idx) => (
                                        <span
                                            key={key}
                                            className="px-2 py-1 rounded-lg bg-cyan-50 border border-cyan-100 text-[11px] font-mono font-black text-cyan-700 animate-pulse"
                                            style={{ animationDelay: `${idx * 120}ms` }}
                                        >
                                            {key}:{typeof value === "object" ? JSON.stringify(value) : String(value)}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs font-semibold text-slate-400">input din context</span>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-cyan-100 bg-white px-3 py-2 flex items-center justify-center">
                            <div className="inline-flex items-center gap-2 text-cyan-700 font-black text-sm">
                                <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-ping" />
                                <span>procesare matematică</span>
                                <span className="text-cyan-400 animate-bounce">→</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-cyan-100 bg-white px-3 py-2">
                            <div className="text-[10px] uppercase font-black text-slate-400 mb-1">Rezultat</div>
                            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-1.5 text-xs font-mono font-black text-emerald-700 break-all animate-pulse">
                                {compactResult}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}

function MathOperationsVisualizer({ slug, event, input }: { slug: string; event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const rawResult =
        ev?.result?.value ??
        ev?.result?.result ??
        ev?.result?.output ??
        ev?.result?.rezultat ??
        ev?.result ??
        vars.rezultat ??
        vars.result ??
        vars.output ??
        vars.value;

    const toNum = (value: unknown) => {
        const n = Number(value);
        return Number.isFinite(n) ? n : NaN;
    };

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

    if (slug === "matematica_binomial_coefficient") {
        const n = Math.max(0, Number(vars.n ?? input?.n ?? 5));
        const k = Math.max(0, Number(vars.k ?? input?.k ?? 2));
        const triangle: number[][] = Array.isArray(vars.triangle)
            ? vars.triangle
            : Array.from({ length: n + 1 }, (_, row) =>
                  Array.from({ length: row + 1 }, (_, col) => {
                      if (col === 0 || col === row) return 1;
                      const prevRow = row > 0 ? Array.from({ length: row }, (_, c) => c) : [];
                      return prevRow.length ? 0 : 1;
                  })
              );

        const value = Number(vars.value ?? triangle[n]?.[k] ?? 0);

        return (
            <div className="w-full max-w-4xl space-y-4 flex flex-col items-center justify-center">
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center">
                    <div className="text-[11px] uppercase font-black text-indigo-400">Coeficient Binomial</div>
                    <div className="text-xl font-black text-indigo-700">C({n}, {k}) = {value}</div>
                </div>
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 overflow-x-auto">
                    <div className="min-w-max space-y-1">
                        {(Array.isArray(vars.triangle) ? vars.triangle : []).map((row: number[], rowIdx: number) => (
                            <div key={rowIdx} className="flex justify-center gap-1.5">
                                {row.map((cell: number, colIdx: number) => {
                                    const isTarget = rowIdx === n && colIdx === k;
                                    return (
                                        <div
                                            key={`${rowIdx}-${colIdx}`}
                                            className={`min-w-[34px] h-8 px-2 rounded-lg text-xs font-black flex items-center justify-center border ${
                                                isTarget
                                                    ? "bg-emerald-500 text-white border-emerald-600"
                                                    : "bg-slate-50 text-slate-700 border-slate-200"
                                            }`}
                                        >
                                            {cell}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (slug === "matematica_is_leap_year") {
        const year = Number(vars.year ?? input?.year ?? 2024);
        const div4 = Boolean(vars.div4 ?? (year % 4 === 0));
        const div100 = Boolean(vars.div100 ?? (year % 100 === 0));
        const div400 = Boolean(vars.div400 ?? (year % 400 === 0));
        const isLeap = Boolean(vars.isLeap ?? (div4 && (!div100 || div400)));

        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center">
                    <div className="text-[11px] uppercase font-black text-slate-400">An analizat</div>
                    <div className="text-2xl font-black text-slate-800">{year}</div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 w-full">
                    <div className={`rounded-xl border px-3 py-3 text-center ${div4 ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                        <div className="text-[10px] font-black uppercase text-slate-500">Divizibil cu 4</div>
                        <div className="text-lg font-black">{div4 ? "DA" : "NU"}</div>
                    </div>
                    <div className={`rounded-xl border px-3 py-3 text-center ${div100 ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}>
                        <div className="text-[10px] font-black uppercase text-slate-500">Divizibil cu 100</div>
                        <div className="text-lg font-black">{div100 ? "DA" : "NU"}</div>
                    </div>
                    <div className={`rounded-xl border px-3 py-3 text-center ${div400 ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                        <div className="text-[10px] font-black uppercase text-slate-500">Divizibil cu 400</div>
                        <div className="text-lg font-black">{div400 ? "DA" : "NU"}</div>
                    </div>
                </div>
                <div className={`rounded-2xl px-5 py-4 text-center font-black text-lg ${isLeap ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"}`}>
                    {isLeap ? "An bisect" : "An obișnuit"}
                </div>
            </div>
        );
    }

    if (slug === "matematica_zellers_congruence") {
        const day = Number(vars.day ?? vars.original?.day ?? input?.day ?? 1);
        const monthTerm = Number(vars.monthTerm ?? 0);
        const K = Number(vars.K ?? 0);
        const yearQuarter = Number(vars.yearQuarter ?? 0);
        const centuryQuarter = Number(vars.centuryQuarter ?? 0);
        const centuryTerm = Number(vars.centuryTerm ?? 0);
        const h = Number(vars.h ?? 0);
        const weekdayName = String(vars.weekdayName ?? "-");

        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 w-full">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Formula Zeller (mod 7)</div>
                    <div className="font-mono text-sm sm:text-base font-black text-slate-700 break-words text-center">
                        h = ({day} + {monthTerm} + {K} + {yearQuarter} + {centuryQuarter} + {centuryTerm}) mod 7 = {h}
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><div className="text-[10px] uppercase font-black text-slate-400">q (zi)</div><div className="font-black">{day}</div></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><div className="text-[10px] uppercase font-black text-slate-400">⌊2.6(m+1)⌋</div><div className="font-black">{monthTerm}</div></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><div className="text-[10px] uppercase font-black text-slate-400">K</div><div className="font-black">{K}</div></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><div className="text-[10px] uppercase font-black text-slate-400">⌊K/4⌋</div><div className="font-black">{yearQuarter}</div></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><div className="text-[10px] uppercase font-black text-slate-400">⌊J/4⌋</div><div className="font-black">{centuryQuarter}</div></div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><div className="text-[10px] uppercase font-black text-slate-400">Termen secol</div><div className="font-black">{centuryTerm}</div></div>
                </div>
                <div className="rounded-2xl bg-indigo-600 text-white px-5 py-4 text-center font-black text-lg w-full max-w-xl">
                    Ziua rezultată: {weekdayName}
                </div>
            </div>
        );
    }

    if (slug === "matematica_double_factorial_iterative") {
        const n = Number(vars.n ?? input?.n ?? 8);
        const sequence: number[] = Array.isArray(vars.sequence)
            ? vars.sequence
            : (() => {
                  const out: number[] = [];
                  for (let i = n; i > 0; i -= 2) out.push(i);
                  return out;
              })();
        const result = Number(vars.result ?? vars.partial ?? sequence.reduce((acc, v) => acc * v, 1));

        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                <div className="flex flex-wrap justify-center gap-2">
                    {sequence.map((x, idx) => (
                        <span key={`${x}-${idx}`} className="px-3 py-2 rounded-xl bg-indigo-100 border border-indigo-200 text-indigo-700 font-black">
                            {x}
                        </span>
                    ))}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 w-full text-center font-mono font-black text-slate-700">
                    {sequence.length ? `${n}!! = ${sequence.join(" * ")} = ${result}` : `${n}!! = 1`}
                </div>
                <div className="grid sm:grid-cols-2 gap-3 w-full">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm">8!! = 8 * 6 * 4 * 2 = 384</div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm">7!! = 7 * 5 * 3 * 1 = 105</div>
                </div>
            </div>
        );
    }

    if (slug === "matematica_factorial") {
        const n = Math.max(0, Math.floor(Number(input?.n ?? 5)));
        const i = Math.max(1, Math.floor(Number(vars.i ?? n)));
        const result = Math.max(1, Math.floor(Number(vars.result ?? 1)));
        const chain = Array.from({ length: n }, (_, idx) => n - idx);
        const recursiveLines = chain.map((v, idx) => `${" ".repeat(idx * 4)}${v}! = ${v}${v > 1 ? ` * ${v - 1}!` : ""}`);

        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                <pre className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-xs sm:text-sm font-mono text-slate-700 overflow-x-auto">
{recursiveLines.join("\n")}
                </pre>
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center w-full font-mono font-black text-indigo-700">
                    {n}! = {chain.join(" * ")} = {result}
                </div>
                <div className="text-xs text-slate-500 font-semibold">Pas curent în execuție: i = {i}</div>
            </div>
        );
    }

    if (slug === "matematica_factors") {
        const n = Math.max(1, Math.floor(Number(vars.n ?? input?.n ?? 36)));
        const i = Math.max(1, Math.floor(Number(vars.i ?? 1)));
        const limit = Math.max(1, Math.floor(Number(vars.limit ?? Math.sqrt(n))));
        const divisible = Boolean(vars.divisible ?? false);
        const pair = vars.pair ?? (divisible ? Math.floor(n / i) : "-");
        const divisors: number[] = Array.isArray(vars.divisors) ? vars.divisors : [];

        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center w-full">
                    <div className="text-[11px] uppercase font-black text-slate-400">Căutare până la sqrt({n}) = {limit}</div>
                    <div className="font-mono text-sm font-black text-slate-700 mt-1">
                        {divisible ? `${i} | ${n} (Pereche: ${i}${pair === i ? " - singur" : `, ${pair}`})` : `${i} nu divide pe ${n}`}
                    </div>
                </div>
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Divizori detectați</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {divisors.length ? divisors.map((d) => (
                            <span key={d} className="px-2.5 py-1.5 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 font-black text-xs">{d}</span>
                        )) : <span className="text-xs text-slate-400">Niciun divizor încă.</span>}
                    </div>
                </div>
            </div>
        );
    }

    if (slug === "manipulare-biti_add_binary") {
        const a = String(vars.a ?? vars.binary_a ?? input?.a ?? "1011").replace(/[^01]/g, "") || "0";
        const b = String(vars.b ?? vars.binary_b ?? input?.b ?? "0110").replace(/[^01]/g, "") || "0";
        const bits: number[] = Array.isArray(ev.array) ? ev.array : [];
        const carryTrace = Array.isArray(vars.carries)
            ? vars.carries.map((c: any) => Number(c) || 0)
            : Array.isArray(vars.carry)
            ? vars.carry.map((c: any) => Number(c) || 0)
            : [];
        const partial = String(vars.partial ?? vars.result ?? vars.sum ?? "").replace(/[^01]/g, "");
        const resultSource = vars.result ?? vars.sum ?? partial ?? bits.join("") ?? "0";
        const result = String(resultSource).replace(/[^01]/g, "") || "0";
        
        // Pad numbers to same length
        const maxLen = Math.max(a.length, b.length, result.length, partial.length || 0);
        const aPadded = a.padStart(maxLen, "0");
        const bPadded = b.padStart(maxLen, "0");
        const carryPadded = carryTrace.length > 0 ? [...Array(Math.max(0, maxLen - carryTrace.length)).fill(0), ...carryTrace] : Array(maxLen).fill(0);
        const processed = bits.length || partial.length;
        const activeCol = processed > 0 ? maxLen - processed : -1;
        const partialPadded = (partial || result).padStart(maxLen, "·");
        
        const parsedA = parseInt(a, 2);
        const parsedB = parseInt(b, 2);
        const parsedSum = parseInt(result, 2);
        const aNum = Number.isFinite(parsedA) ? parsedA : null;
        const bNum = Number.isFinite(parsedB) ? parsedB : null;
        const sumNum = Number.isFinite(parsedSum) ? parsedSum : null;

        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 w-full">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Adunare Binară</div>
                    <div className="font-mono text-sm space-y-1 overflow-x-auto">
                        <div className="flex justify-center gap-1">
                            <span className="w-16 text-right">Carry:</span>
                            <div className="flex gap-1">
                                {carryPadded.map((c: number, idx: number) => (
                                    <span key={`carry-${idx}`} className={`w-6 h-6 rounded text-center text-xs font-black flex items-center justify-center border ${idx === activeCol ? "ring-2 ring-indigo-300" : ""} ${c === 1 ? "bg-orange-200 border-orange-300 text-orange-700" : "bg-gray-100 border-gray-300 text-gray-500"}`}>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center gap-1">
                            <span className="w-16 text-right">Num 1:</span>
                            <div className="flex gap-1">
                                {aPadded.split("").map((bit: string, idx: number) => (
                                    <span key={`a-${idx}`} className={`w-6 h-6 rounded text-center text-xs font-black flex items-center justify-center border ${idx === activeCol ? "ring-2 ring-indigo-300" : ""} ${bit === "1" ? "bg-emerald-200 border-emerald-300 text-emerald-700" : "bg-sky-100 border-sky-200 text-sky-700"}`}>
                                        {bit}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center gap-1">
                            <span className="w-16 text-right">Num 2:</span>
                            <div className="flex gap-1 items-center">
                                <span className="text-slate-600 font-black">+</span>
                                <div className="flex gap-1">
                                    {bPadded.split("").map((bit: string, idx: number) => (
                                        <span key={`b-${idx}`} className={`w-6 h-6 rounded text-center text-xs font-black flex items-center justify-center border ${idx === activeCol ? "ring-2 ring-indigo-300" : ""} ${bit === "1" ? "bg-blue-200 border-blue-300 text-blue-700" : "bg-slate-100 border-slate-300 text-slate-600"}`}>
                                            {bit}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 border-slate-400 pt-1 flex justify-center gap-1">
                            <span className="w-16 text-right">Parțial:</span>
                            <div className="flex gap-1">
                                {partialPadded.split("").map((bit: string, idx: number) => (
                                    <span key={`sum-${idx}`} className={`w-6 h-6 rounded text-center text-xs font-black flex items-center justify-center border ${idx === activeCol ? "ring-2 ring-indigo-300" : ""} ${bit === "1" ? "bg-indigo-300 border-indigo-400 text-indigo-700" : bit === "0" ? "bg-purple-100 border-purple-200 text-purple-600" : "bg-slate-50 border-slate-200 text-slate-300"}`}>
                                        {bit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-xs font-semibold text-slate-500 text-center">
                        {activeCol >= 0 ? `Procesăm coloana ${maxLen - activeCol} de la dreapta la stânga.` : "Rulare inițială."}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Num 1 (zecimal)</div>
                        <div className="font-black text-lg text-slate-800">{aNum ?? "-"}</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Num 2 (zecimal)</div>
                        <div className="font-black text-lg text-slate-800">{bNum ?? "-"}</div>
                    </div>
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Suma (zecimal)</div>
                        <div className="font-black text-lg text-indigo-700">{sumNum ?? "-"}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (slug === "matematica_hamming_distance") {
        const str1 = String(input?.str1 ?? vars.str1 ?? "");
        const str2 = String(input?.str2 ?? vars.str2 ?? "");
        const maxLen = Math.max(str1.length, str2.length, 1);
        const pairs = Array.from({ length: maxLen }, (_, index) => {
            const c1 = str1[index] ?? "";
            const c2 = str2[index] ?? "";
            const same = c1 === c2 && c1 !== "";
            const missing = c1 === "" || c2 === "";
            return { index, c1, c2, same, missing };
        });
        const mismatches = pairs.filter((p) => !p.same).length;
        const distance = Number.isFinite(toNum(rawResult)) ? Number(rawResult) : mismatches;

        return (
            <div className="w-full max-w-4xl space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Text 1</div>
                        <div className="font-mono text-sm font-black text-slate-800 break-all">{str1 || "—"}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Text 2</div>
                        <div className="font-mono text-sm font-black text-slate-800 break-all">{str2 || "—"}</div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Distanță Hamming</div>
                        <div className="text-2xl font-black text-indigo-700">{distance}</div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 overflow-x-auto">
                    <div className="min-w-max space-y-2">
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${maxLen}, minmax(36px, 1fr))` }}>
                            {pairs.map((pair) => (
                                <div key={`a-${pair.index}`} className={`h-10 rounded-lg border flex items-center justify-center font-mono font-black text-sm ${pair.same ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                                    {pair.c1 || "·"}
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${maxLen}, minmax(36px, 1fr))` }}>
                            {pairs.map((pair) => (
                                <div key={`b-${pair.index}`} className={`h-10 rounded-lg border flex items-center justify-center font-mono font-black text-sm ${pair.same ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                                    {pair.c2 || "·"}
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${maxLen}, minmax(36px, 1fr))` }}>
                            {pairs.map((pair) => (
                                <div key={`d-${pair.index}`} className={`h-8 rounded-lg border flex items-center justify-center text-xs font-black ${pair.same ? "bg-emerald-100 border-emerald-200 text-emerald-700" : "bg-rose-100 border-rose-200 text-rose-700"}`}>
                                    {pair.same ? "0" : "1"}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-xs font-semibold text-slate-600 text-center">
                    Comparația este caracter cu caracter; fiecare diferență contribuie cu 1 la distanța totală.
                </div>
            </div>
        );
    }

    if (slug === "matematica_armstrong_number") {
        const n = Math.max(0, Math.floor(Number(input?.n ?? vars.n ?? 0)));
        const digits = String(n).split("").map((d) => Number(d));
        const p = digits.length;
        const powered = digits.map((d) => d ** p);
        const partials = powered.reduce<number[]>((acc, value) => {
            const prev = acc.length ? acc[acc.length - 1] : 0;
            acc.push(prev + value);
            return acc;
        }, []);
        const sum = partials.length ? partials[partials.length - 1] : 0;
        const boolResult = typeof rawResult === "boolean" ? rawResult : sum === n;

        return (
            <div className="w-full max-w-4xl space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Număr</div>
                        <div className="text-xl font-black text-slate-800 font-mono">{n}</div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Putere folosită</div>
                        <div className="text-xl font-black text-indigo-700">p = {p}</div>
                    </div>
                    <div className={`rounded-2xl border p-3 text-center ${boolResult ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
                        <div className={`text-[10px] uppercase font-black ${boolResult ? "text-emerald-500" : "text-rose-500"}`}>Rezultat</div>
                        <div className={`text-xl font-black ${boolResult ? "text-emerald-700" : "text-rose-700"}`}>{boolResult ? "Armstrong" : "Nu este Armstrong"}</div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 overflow-x-auto">
                    <div className="min-w-max grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(digits.length, 1)}, minmax(62px, 1fr))` }}>
                        {digits.map((digit, idx) => (
                            <div key={`d-${idx}`} className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-center animate-pulse" style={{ animationDelay: `${idx * 120}ms` }}>
                                <div className="text-[10px] uppercase font-black text-slate-400">cifră</div>
                                <div className="text-lg font-black text-slate-800">{digit}</div>
                            </div>
                        ))}
                        {digits.map((digit, idx) => (
                            <div key={`p-${idx}`} className="rounded-xl border border-indigo-200 bg-indigo-50 px-2 py-2 text-center" style={{ transform: "translateY(0)", transition: "all 420ms ease" }}>
                                <div className="text-[10px] uppercase font-black text-indigo-400">{digit}^{p}</div>
                                <div className="text-lg font-black text-indigo-700">{powered[idx]}</div>
                            </div>
                        ))}
                        {digits.map((_, idx) => (
                            <div key={`s-${idx}`} className="rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-2 text-center">
                                <div className="text-[10px] uppercase font-black text-emerald-400">sumă parțială</div>
                                <div className="text-lg font-black text-emerald-700">{partials[idx]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center font-mono font-black text-slate-700">
                    {digits.join(`^${p} + `)}^{p} = {sum} {sum === n ? "=" : "≠"} {n}
                </div>
            </div>
        );
    }

    if (slug === "matematica_calculate_mean" || slug === "matematica_calculate_median" || slug === "matematica_find_min") {
        const numbers: number[] = Array.isArray(input?.numbers)
            ? input.numbers.map((v: unknown) => Number(v)).filter((v: number) => Number.isFinite(v))
            : [];
        const sorted = [...numbers].sort((a, b) => a - b);
        const value = Number.isFinite(toNum(rawResult)) ? Number(rawResult) : NaN;
        const sum = numbers.reduce((acc, v) => acc + v, 0);
        const midLeft = sorted.length ? sorted[Math.floor((sorted.length - 1) / 2)] : NaN;
        const midRight = sorted.length ? sorted[Math.ceil((sorted.length - 1) / 2)] : NaN;

        return (
            <div className="w-full max-w-4xl space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Date de intrare</div>
                    <div className="flex flex-wrap gap-2">
                        {numbers.length ? numbers.map((n, idx) => (
                            <span key={`${n}-${idx}`} className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-black text-slate-700">{n}</span>
                        )) : <span className="text-sm text-slate-400 font-semibold">Nu există valori numerice.</span>}
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Sumă</div>
                        <div className="text-lg font-black text-slate-800">{sum}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Număr elemente</div>
                        <div className="text-lg font-black text-slate-800">{numbers.length}</div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Rezultat</div>
                        <div className="text-lg font-black text-indigo-700">{Number.isFinite(value) ? value : "—"}</div>
                    </div>
                </div>

                {slug === "matematica_calculate_median" && sorted.length > 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Mediană pe șir sortat</div>
                        <div className="flex flex-wrap gap-2">
                            {sorted.map((n, idx) => {
                                const isMedian = n === midLeft || n === midRight;
                                return (
                                    <span key={`${n}-${idx}`} className={`px-3 py-2 rounded-xl border font-mono font-black ${isMedian ? "bg-indigo-600 border-indigo-700 text-white" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                                        {n}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (
        slug === "matematica_is_even" ||
        slug === "matematica_is_odd" ||
        slug === "matematica_is_divisible" ||
        slug === "matematica_perfect_square" ||
        slug === "matematica_perfect_cube" ||
        slug === "matematica_pronic_number" ||
        slug === "matematica_perfect_number" ||
        slug === "matematica_is_square_free"
    ) {
        const n = Number(input?.n ?? input?.num1 ?? 0);
        const num2 = Number(input?.num2 ?? 0);
        const boolResult = typeof rawResult === "boolean" ? rawResult : String(rawResult).toLowerCase() === "true";
        const titleMap: Record<string, string> = {
            matematica_is_even: `${n} % 2 = ${Math.abs(n % 2)}`,
            matematica_is_odd: `${n} % 2 = ${Math.abs(n % 2)}`,
            matematica_is_divisible: `${n} % ${num2} = ${num2 !== 0 ? n % num2 : "nedefinit"}`,
            matematica_perfect_square: `sqrt(${n}) = ${Math.sqrt(Math.abs(n)).toFixed(4)}`,
            matematica_perfect_cube: `cuberoot(${n}) ≈ ${Math.cbrt(n).toFixed(4)}`,
            matematica_pronic_number: `n = k(k+1) ?`,
            matematica_perfect_number: `sum(divizori proprii) ? n`,
            matematica_is_square_free: `fără factori pătrați primi`,
            matematica_armstrong_number: `sum(cifre^p) ? n`,
        };

        return (
            <div className="w-full max-w-3xl space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Verificare</div>
                        <div className="text-sm font-black text-slate-700">{titleMap[slug] || "Condiție numerică"}</div>
                    </div>
                    <div className={`rounded-2xl border p-4 text-center ${boolResult ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
                        <div className={`text-[10px] uppercase font-black ${boolResult ? "text-emerald-500" : "text-rose-500"}`}>Rezultat</div>
                        <div className={`text-2xl font-black ${boolResult ? "text-emerald-700" : "text-rose-700"}`}>{boolResult ? "Adevărat" : "Fals"}</div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-700 text-center">
                    Intrare: {slug === "matematica_is_divisible" ? `${n}, ${num2}` : `${n}`}
                </div>
            </div>
        );
    }

    if (slug === "matematica_digit_sum" || slug === "matematica_number_of_digits") {
        const n = Math.floor(Math.abs(Number(input?.n ?? 0)));
        const digits = String(n).split("").map((d) => Number(d));
        const value = Number.isFinite(toNum(rawResult)) ? Number(rawResult) : NaN;

        return (
            <div className="w-full max-w-3xl space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Cifre extrase</div>
                    <div className="flex flex-wrap gap-2">
                        {digits.map((d, idx) => (
                            <span key={`${d}-${idx}`} className="h-10 w-10 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 font-black flex items-center justify-center">
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-center">
                    <div className="text-[10px] uppercase font-black text-indigo-400">Rezultat</div>
                    <div className="text-xl font-black text-indigo-700">
                        {slug === "matematica_digit_sum" ? `Suma cifrelor = ${Number.isFinite(value) ? value : "—"}` : `Număr cifre = ${Number.isFinite(value) ? value : "—"}`}
                    </div>
                </div>
            </div>
        );
    }

    if (slug === "matematica_degrees_to_radians" || slug === "matematica_radians_to_degrees") {
        const inVal = Number(input?.degrees ?? input?.radians ?? 0);
        const outVal = Number.isFinite(toNum(rawResult)) ? Number(rawResult) : NaN;
        const formula = slug === "matematica_degrees_to_radians" ? `${inVal} * pi / 180` : `${inVal} * 180 / pi`;

        return (
            <div className="w-full max-w-3xl space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                        <div className="text-[10px] uppercase font-black text-slate-400">Formula</div>
                        <div className="font-mono text-sm font-black text-slate-700">{formula}</div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Rezultat</div>
                        <div className="text-xl font-black text-indigo-700">{Number.isFinite(outVal) ? outVal.toFixed(6) : "—"}</div>
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-600 text-center">
                    Conversie {slug === "matematica_degrees_to_radians" ? "grade → radiani" : "radiani → grade"}
                </div>
            </div>
        );
    }

    if (
        slug === "matematica_primes" ||
        slug === "matematica_series_hexagonal_numbers" ||
        slug === "matematica_juggler_sequence" ||
        slug === "matematica_ugly_numbers" ||
        slug === "matematica_pascals_triangle"
    ) {
        const seq = Array.isArray(rawResult)
            ? rawResult
            : Array.isArray((rawResult as any)?.result)
            ? (rawResult as any).result
            : Array.isArray((rawResult as any)?.primes)
            ? (rawResult as any).primes
            : [];
        const numbers = seq.filter((v: unknown) => typeof v === "number" && Number.isFinite(v)) as number[];
        const maxVal = Math.max(1, ...numbers);

        if (numbers.length > 0) {
            return (
                <div className="w-full max-w-4xl space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Secvență generată</div>
                        <div className="flex items-end gap-1.5 overflow-x-auto pb-2">
                            {numbers.slice(0, 80).map((v, idx) => (
                                <div key={`${v}-${idx}`} className="flex flex-col items-center gap-1 min-w-[28px]">
                                    <div className="w-6 rounded-t-md bg-gradient-to-t from-cyan-500 to-emerald-400" style={{ height: `${Math.max(8, (v / maxVal) * 90)}px` }} />
                                    <span className="text-[9px] font-black text-slate-500 font-mono">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-center">
                        <div className="text-[10px] uppercase font-black text-indigo-400">Total elemente</div>
                        <div className="text-xl font-black text-indigo-700">{numbers.length}</div>
                    </div>
                </div>
            );
        }
    }

    if (slug === "matematica_matrix_multiplication") {
        const matrix = Array.isArray(rawResult)
            ? rawResult
            : Array.isArray((rawResult as any)?.result)
            ? (rawResult as any).result
            : [];
        const rows = Array.isArray(matrix) ? matrix : [];

        if (rows.length > 0 && Array.isArray(rows[0])) {
            return (
                <div className="w-full max-w-4xl space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 overflow-x-auto">
                        <div className="text-[10px] uppercase font-black text-slate-400 mb-3">Matrice rezultat</div>
                        <table className="min-w-max text-sm border-collapse mx-auto">
                            <tbody>
                                {rows.map((row: any[], ri: number) => (
                                    <tr key={ri}>
                                        {row.map((cell: any, ci: number) => (
                                            <td key={`${ri}-${ci}`} className="px-3 py-2 border border-slate-200 text-center font-mono font-black text-slate-700 bg-slate-50">
                                                {String(cell)}
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
    }

    const inputEntries = Object.entries(input || {}).slice(0, 10);
    const isBoolResult = typeof rawResult === "boolean";
    const isNumberResult = typeof rawResult === "number" && Number.isFinite(rawResult);
    const isArrayResult = Array.isArray(rawResult);

    return (
        <div className="w-full max-w-4xl space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-[10px] uppercase font-black text-slate-400 mb-2">Parametri algoritm</div>
                    <div className="grid gap-2">
                        {inputEntries.length > 0 ? (
                            inputEntries.map(([key, value]) => (
                                <div key={key} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm flex items-center justify-between gap-3">
                                    <span className="font-black text-slate-500 uppercase text-[10px]">{key}</span>
                                    <span className="font-mono font-semibold text-slate-700 text-right break-all">{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 font-semibold">Fără parametri expliciți.</div>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                    <div className="text-[10px] uppercase font-black text-indigo-400 mb-2">Rezultat calculat</div>
                    <div className={`rounded-xl px-4 py-4 text-center font-black ${isBoolResult ? ((rawResult as boolean) ? "bg-emerald-500 text-white" : "bg-rose-500 text-white") : "bg-white border border-indigo-200 text-indigo-700"}`}>
                        {isArrayResult
                            ? `[${(rawResult as any[]).slice(0, 20).join(", ")}${(rawResult as any[]).length > 20 ? ", ..." : ""}]`
                            : typeof rawResult === "object" && rawResult !== null
                            ? JSON.stringify(rawResult)
                            : String(rawResult ?? "—")}
                    </div>
                    <div className="mt-3 text-xs font-semibold text-indigo-700">
                        {isBoolResult
                            ? "Rezultat logic: condiția numerică a fost verificată."
                            : isNumberResult
                            ? "Rezultat numeric final obținut prin evaluarea formulei algoritmului."
                            : isArrayResult
                            ? "Rezultat secvențial: valorile sunt generate în ordinea calculului."
                            : "Rezultat final returnat de funcția matematică."}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-600">
                {String(ev.note || "Algoritmul a fost executat; vizualizarea prezintă datele de intrare și ieșirea calculată.")}
            </div>
        </div>
    );
}

function DataStructureVisualizer({ slug, event, input }: { slug: string; event: TraceEvent; input: any }) {
    const ev = event as any;
    const vars = ev.vars || {};
    const dsType = slug.split("_")[1] || "";
    const operation = String(vars.operation || vars.action || "—");
    const highlightIndices: number[] = Array.isArray(vars.highlightIndices) ? vars.highlightIndices : [];

    const commonHeader = (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 w-full text-center">
            <div className="text-[10px] uppercase font-black text-slate-400">Structură de Date Dinamică</div>
            <div className="text-xs text-slate-700 font-bold">Operație curentă: {operation}</div>
        </div>
    );

    if (dsType.includes("stack")) {
        const elements: any[] = Array.isArray(vars.stack) ? vars.stack : Array.isArray(input?.initial) ? input.initial : [];
        return (
            <div className="w-full max-w-2xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Top</div>
                <div className="flex flex-col-reverse gap-2 items-center">
                    {elements.length ? elements.map((el, idx) => {
                        const isTop = idx === elements.length - 1;
                        const isHot = highlightIndices.includes(idx) || (isTop && operation !== "init");
                        return (
                            <div key={`${el}-${idx}`} className={`w-32 h-12 rounded-xl border-2 flex items-center justify-between px-3 font-black text-lg transition-all duration-300 ${isHot ? "bg-emerald-500 border-emerald-600 text-white shadow-lg scale-105" : "bg-white border-slate-200 text-slate-700"}`}>
                                <span>{el}</span>
                                {isTop ? <span className="text-[9px] uppercase tracking-widest opacity-90">top</span> : <span className="text-[9px] opacity-40">•</span>}
                            </div>
                        );
                    }) : <div className="text-xs text-slate-400 font-bold">Stiva este goală</div>}
                </div>
            </div>
        );
    }

    if (dsType.includes("queue") || dsType === "coada") {
        const elements: any[] = Array.isArray(vars.queue) ? vars.queue : Array.isArray(input?.initial) ? input.initial : [];
        const frontIndex = elements.length ? 0 : -1;
        const rearIndex = elements.length ? elements.length - 1 : -1;
        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="w-full text-[10px] uppercase font-black text-slate-400 tracking-widest flex justify-between px-2">
                    <span>Front</span><span>Rear</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    {elements.length ? elements.map((el, idx) => {
                        const isFront = idx === 0;
                        const isRear = idx === elements.length - 1;
                        const isHot = highlightIndices.includes(idx) || (isFront && operation.includes("dequeue")) || (isRear && operation.includes("enqueue"));
                        return (
                            <div key={`${el}-${idx}`} className={`h-12 px-4 rounded-xl border-2 flex items-center justify-center font-black transition-all duration-300 relative ${isHot ? "bg-sky-600 border-sky-700 text-white shadow-md scale-105" : "bg-white border-slate-200 text-slate-700"}`}>
                                {el}
                                {idx === frontIndex && <span className="absolute -top-4 text-[9px] font-black uppercase tracking-widest text-sky-500">F</span>}
                                {idx === rearIndex && <span className="absolute -bottom-4 text-[9px] font-black uppercase tracking-widest text-indigo-500">R</span>}
                            </div>
                        );
                    }) : <div className="text-xs text-slate-400 font-bold">Coada este goală</div>}
                </div>
            </div>
        );
    }

    if (dsType.includes("linked_list") || dsType === "lista") {
        const nodes: any[] = Array.isArray(vars.nodes) ? vars.nodes : Array.isArray(input?.initial) ? input.initial : [];
        return (
            <div className="w-full max-w-4xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    {nodes.length ? nodes.map((el, idx) => {
                        const isHot = highlightIndices.includes(idx);
                        const isHead = idx === 0;
                        const isTail = idx === nodes.length - 1;
                        return (
                            <div key={`${el}-${idx}`} className="flex items-center gap-2">
                                <div className={`h-12 w-12 rounded-lg border-2 flex items-center justify-center font-black transition-all duration-300 relative ${isHot ? "border-indigo-700 bg-indigo-600 text-white scale-110" : "border-indigo-300 bg-indigo-50 text-indigo-700"}`}>
                                    {el}
                                    {isHead && <span className="absolute -top-4 text-[9px] uppercase font-black tracking-widest text-indigo-500">Head</span>}
                                    {isTail && <span className="absolute -bottom-4 text-[9px] uppercase font-black tracking-widest text-emerald-500">Tail</span>}
                                </div>
                                {idx < nodes.length - 1 && <div className="w-5 h-0.5 bg-indigo-400" />}
                            </div>
                        );
                    }) : <div className="text-xs text-slate-400 font-bold">Lista este goală</div>}
                    {nodes.length > 0 && <span className="text-xs font-black text-slate-400">NULL</span>}
                </div>
            </div>
        );
    }

    if (dsType.includes("tree") || dsType === "arbore") {
        const nodes: number[] = Array.isArray(vars.nodes) ? vars.nodes : Array.isArray(input?.initial) ? input.initial : [];
        const sortedNodes: number[] = Array.isArray(vars.inOrder) ? vars.inOrder : [...nodes].sort((a, b) => a - b);
        const highlightValue = vars.highlightValue;
        return (
            <div className="w-full max-w-4xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="rounded-xl border border-slate-200 bg-white p-4 w-full">
                    <div className="text-[11px] font-black text-slate-500 mb-2 uppercase">Nivel BST (ordine inserare)</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {nodes.map((val, idx) => (
                            <span key={`${val}-${idx}`} className={`h-11 w-11 rounded-full border-2 flex items-center justify-center font-black ${val === highlightValue ? "bg-purple-600 border-purple-700 text-white" : "bg-purple-50 border-purple-200 text-purple-700"}`}>
                                {val}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 w-full text-center font-mono text-sm">
                    In-order: {sortedNodes.join(" -> ") || "—"}
                </div>
            </div>
        );
    }

    if (dsType.includes("heap")) {
        const heap: number[] = Array.isArray(vars.heap) ? vars.heap : Array.isArray(input?.initial) ? input.initial : [];
        const highlightValue = vars.highlightValue;
        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {heap.map((val, idx) => (
                        <div key={`${val}-${idx}`} className={`h-10 rounded-lg border flex items-center justify-center font-bold text-sm ${val === highlightValue ? "bg-amber-500 border-amber-600 text-white" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
                            {val}
                        </div>
                    ))}
                </div>
                <div className="text-xs font-semibold text-slate-500">Rădăcină max-heap: <span className="font-black text-slate-700">{heap[0] ?? "—"}</span></div>
            </div>
        );
    }

    if (dsType.includes("map")) {
        const entries: Array<[string, any]> = Array.isArray(vars.entries) ? vars.entries : Object.entries(vars.map || {});
        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="rounded-xl border border-slate-200 bg-white p-4 w-full">
                    <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase text-slate-400 mb-2">
                        <div>Cheie</div><div>Valoare</div>
                    </div>
                    <div className="space-y-1">
                        {entries.length ? entries.map(([k, v], idx) => (
                            <div key={`${k}-${idx}`} className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1 font-mono">{k}</div>
                                <div className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1 font-mono">{String(v)}</div>
                            </div>
                        )) : <div className="text-xs text-slate-400">Map gol</div>}
                    </div>
                </div>
            </div>
        );
    }

    if (dsType.includes("set")) {
        const values: any[] = Array.isArray(vars.values) ? vars.values : [];
        return (
            <div className="w-full max-w-2xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="flex flex-wrap gap-2 justify-center">
                    {values.length ? values.map((value, idx) => (
                        <span key={`${value}-${idx}`} className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold text-sm">
                            {String(value)}
                        </span>
                    )) : <span className="text-xs text-slate-400">Set gol</span>}
                </div>
            </div>
        );
    }

    if (dsType.includes("tries") || dsType.includes("trie")) {
        const words: string[] = Array.isArray(vars.words) ? vars.words : Array.isArray(input?.words) ? input.words : [];
        return (
            <div className="w-full max-w-2xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="flex flex-wrap gap-2 justify-center">
                    {words.length ? words.map((word, idx) => (
                        <span key={`${word}-${idx}`} className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm">{word}</span>
                    )) : <span className="text-xs text-slate-400">Trie gol</span>}
                </div>
            </div>
        );
    }

    if (dsType.includes("disjoint")) {
        const parent: number[] = Array.isArray(vars.parent) ? vars.parent : [];
        return (
            <div className="w-full max-w-3xl space-y-4 flex flex-col items-center justify-center">
                {commonHeader}
                <div className="rounded-xl border border-slate-200 bg-white p-4 w-full">
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                        {parent.map((p, idx) => (
                            <div key={`${idx}-${p}`} className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-center">
                                <div className="text-[10px] text-slate-400 font-black">{idx}</div>
                                <div className="text-sm font-black text-slate-700">{p}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const elements: any[] = Array.isArray(vars.elements) ? vars.elements : [];
    return (
        <div className="w-full max-w-2xl space-y-4 flex flex-col items-center justify-center">
            {commonHeader}
            <div className="rounded-xl border border-slate-200 bg-white p-4 w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                    {elements.length ? elements.map((el, idx) => (
                        <span key={`${el}-${idx}`} className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm">{el}</span>
                    )) : <span className="text-slate-400 text-xs font-bold">Gol</span>}
                </div>
            </div>
        </div>
    );
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
    const [hasExecuted, setHasExecuted] = useState(false);
	const [chat, setChat] = useState<Array<{ role: string; content: string }>>(
		[]
	);
    const [chatTokenQuota, setChatTokenQuota] = useState<ChatTokenQuota | null>(null);
    const [chatLoading, setChatLoading] = useState(false);
    const [tab, setTab] = useState<"descriere" | "viz" | "input" | "chat" | "code">("descriere");
    const [sourceCode, setSourceCode] = useState<string>("");
    const [sourceFile, setSourceFile] = useState<string>("");
    const autoRunSlugRef = useRef<string | null>(null);
    const chatInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (tab !== "chat") return;
        const id = window.requestAnimationFrame(() => {
            chatInputRef.current?.focus();
        });
        return () => window.cancelAnimationFrame(id);
    }, [tab, chatLoading]);

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
        const baseVizType = meta.visualizerType || "none";
        const isDataStructure = DATA_STRUCTURE_SLUGS.has(meta.slug);
    const isGraphCategory = normalizeCategoryKey(meta.category) === "grafuri";
        const vizType = isDataStructure ? "datastructure" : baseVizType;
    const isSortingCategory = normalizeCategoryKey(meta.category) === "sortare";
        const slug = meta.slug;
    setTrace([]);
    setCurrentStep(0);
    setPlaying(false);
    setExplanation("");
    setHasExecuted(false);
    autoRunSlugRef.current = null;
    setInputDrafts({});

        const slugDefaultInput = GENERIC_INPUT_DEFAULTS[slug];
        if (slugDefaultInput && vizType !== "sorting" && vizType !== "search" && vizType !== "graph" && vizType !== "dp" && !isGraphCategory) {
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

        if (vizType === "sorting" || isSortingCategory) {
            const defaultArray = [64, 34, 25, 12, 22, 11, 90];
			setInput({ array: defaultArray });
            setRawInput(defaultArray.join(", "));
		} else if (vizType === "search") {
            const defaultArray = [11, 12, 22, 25, 34, 64, 90];
			setInput({ array: defaultArray, target: 22 });
            setRawInput(defaultArray.join(", "));
        } else if (vizType === "graph" || isGraphCategory) {
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

    const runAlgorithm = async (
        overrideInput?: Record<string, any>,
        options?: { autoplay?: boolean; switchTab?: boolean }
    ) => {
        try {
            const baseVizType = meta.visualizerType || "none";
            const isDataStructure = DATA_STRUCTURE_SLUGS.has(meta.slug);
            const isGraphCategory = normalizeCategoryKey(meta.category) === "grafuri";
            const vizType = isDataStructure ? "datastructure" : baseVizType;
            let finalInput = overrideInput ?? input;

            const isSortingCategory = normalizeCategoryKey(meta.category) === "sortare";

            if (!overrideInput && (vizType === "sorting" || isSortingCategory)) {
                const arr = rawInput
                    .split(",")
                    .map((n) => parseInt(n.trim()))
                    .filter((n) => !isNaN(n));
                finalInput = { array: arr };
                setInput(finalInput);
            } else if (!overrideInput && vizType === "search") {
                const arr = rawInput
                    .split(",")
                    .map((n) => parseInt(n.trim()))
                    .filter((n) => !isNaN(n));
                finalInput = { ...input, array: arr };
                setInput(finalInput);
            } else if (!overrideInput && (vizType === "graph" || isGraphCategory)) {
                if (!finalInput?.nodes || !finalInput?.edges) {
                    finalInput = {
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
                    setInput(finalInput);
                }
            }

            const result = await api.run(meta.slug, finalInput);
            const newTrace = Array.isArray(result.trace) ? result.trace : [];
            const shouldAutoplay = options?.autoplay ?? true;

            setTrace(newTrace);
            setCurrentStep(0);
            setPlaying(shouldAutoplay && newTrace.length > 1);
            setHasExecuted(true);
            if (options?.switchTab ?? true) {
                setTab("viz");
            }
        } catch (err) {
            console.error(err);
            setTrace([]);
            setCurrentStep(0);
            setPlaying(false);
            setHasExecuted(true);
        }
    };

    useEffect(() => {
        if (autoRunSlugRef.current === meta.slug) return;
        if (!input || Object.keys(input).length === 0) return;

        const baseVizType = meta.visualizerType || "none";
        const isDataStructure = DATA_STRUCTURE_SLUGS.has(meta.slug);
        const isGraphCategory = normalizeCategoryKey(meta.category) === "grafuri";
        const vizType = isDataStructure ? "datastructure" : baseVizType;
        const isSortingCategory = normalizeCategoryKey(meta.category) === "sortare";
        const needsRawInput = (vizType === "sorting" || vizType === "search" || isSortingCategory) && !rawInput.trim();
        if (needsRawInput) return;

        if ((vizType === "graph" || isGraphCategory) && (!input?.nodes || !input?.edges)) return;

        autoRunSlugRef.current = meta.slug;
        runAlgorithm(input, { autoplay: false, switchTab: false });
    }, [meta.slug, meta.status, meta.visualizerType, input, rawInput]);

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
        await runAlgorithm(undefined, { autoplay: true, switchTab: true });
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
        window.requestAnimationFrame(() => {
            chatInputRef.current?.focus();
        });
        setChatLoading(true);
		try {
			const result = await api.chat(meta.slug, question, {
				input,
				currentStepIndex: currentStep,
				currentEvent: trace[currentStep],
			});
            const answer = result.answer || "";
            if (result.tokenQuota) {
                setChatTokenQuota(result.tokenQuota);
            }
            setChat([...newChat, { role: "assistant", content: answer }]);
            setChatLoading(false);
		} catch (err) {
			console.error(err);
            setChatLoading(false);
            setChat((prev) => [...prev, { role: "assistant", content: "Nu am putut genera răspunsul acum. Reîncearcă, te rog." }]);
		}

        window.requestAnimationFrame(() => {
            chatInputRef.current?.focus();
        });
	};

	const currentEvent = trace[currentStep];
    const visualEvent = useMemo(() => {
        if (!currentEvent) return null;
        if (currentEvent.type !== "done") return currentEvent;
        if (currentStep <= 0) return currentEvent;

        const prev = trace[currentStep - 1];
        if (!prev) return currentEvent;

        return {
            ...prev,
            // Keep the final summary/result from done, but preserve the last visual state.
            result: (currentEvent as any).result ?? (prev as any).result,
            note: currentEvent.note ?? prev.note,
            vars: {
                ...((prev as any).vars || {}),
                ...((currentEvent as any).vars || {}),
            },
        } as TraceEvent;
    }, [currentEvent, currentStep, trace]);
    const baseVizType = meta.visualizerType || "none";
    const isDataStructure = DATA_STRUCTURE_SLUGS.has(meta.slug);
    const isGraphCategory = normalizeCategoryKey(meta.category) === "grafuri";
    const categoryKey = normalizeCategoryKey(meta.category);
    const isMathCategory = categoryKey === "matematica";
    const isBitCategory = categoryKey === "manipulare_biti";
    const vizType = isDataStructure ? "datastructure" : baseVizType;
    const isSortingCategory = normalizeCategoryKey(meta.category) === "sortare";
    const isArrayAlgo = vizType === "sorting" || vizType === "search" || isSortingCategory;
    const sourceFileName = getSourceFileName(meta.slug);
    const accentTheme = getAlgorithmAccentTheme(meta.category);
    const accentClasses = getCategoryAccentClasses(meta.category);
    const executionVarKeys = useMemo(() => {
        const allKeys = new Set<string>();

        trace.forEach((event) => {
            const vars = event?.vars;
            if (!vars || typeof vars !== "object") return;
            Object.keys(vars).forEach((key) => allKeys.add(key));
        });

        return prioritizeExecutionKeys(Array.from(allKeys)).slice(0, 12);
    }, [trace]);

    const executionVars = useMemo(() => {
        const latestValues: Record<string, unknown> = {};

        for (let idx = 0; idx <= currentStep && idx < trace.length; idx += 1) {
            const stepVars = trace[idx]?.vars;
            if (!stepVars || typeof stepVars !== "object") continue;
            Object.entries(stepVars).forEach(([key, value]) => {
                latestValues[key] = value;
            });
        }

        return executionVarKeys.map((key) => [key, latestValues[key] ?? "—"] as const);
    }, [executionVarKeys, trace, currentStep]);

    const inputVars = useMemo(() => {
        return Object.entries(input || {})
            .filter(([key]) => key !== "trace")
            .slice(0, 8)
            .map(([key, value]) => [key, summarizeInputValue(value)] as const);
    }, [input]);

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
                                    ? accentClasses.tabActive
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
                    <div className="space-y-4">
                        <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
                            {/* Main Viz Column (desktop right) */}
                            <div className="lg:col-span-9 lg:order-2 lg:flex">
                            {/* Visualization box — dynamic height to match left column */}
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full min-h-[420px] w-full">
                                {currentEvent ? (
                                    <div className="h-full flex flex-col">
                                        <div className="flex-1 overflow-auto flex items-stretch justify-center p-3 sm:p-4">
                                            {CIPHER_VISUAL_SLUGS.has(meta.slug) ? (
                                                <CipherVisualizer event={visualEvent || currentEvent} input={input} />
                                            ) : BACKTRACKING_VISUAL_SLUGS.has(meta.slug) ? (
                                                <BacktrackingVisualizer slug={meta.slug} event={visualEvent || currentEvent} input={input} />
                                            ) : DIVERSE_VISUAL_SLUGS.has(meta.slug) ? (
                                                <DiverseVisualizer slug={meta.slug} event={visualEvent || currentEvent} input={input} />
                                            ) : GRAPH_VISUAL_SLUGS.has(meta.slug) ? (
                                                <GraphVisualizer event={visualEvent || currentEvent} input={input} />
                                            ) : isMathCategory || isBitCategory || CUSTOM_MATH_VISUAL_SLUGS.has(meta.slug) ? (
                                                <MathCategoryFrame slug={meta.slug} event={visualEvent || currentEvent}>
                                                    <MathOperationsVisualizer slug={meta.slug} event={visualEvent || currentEvent} input={input} />
                                                </MathCategoryFrame>
                                            ) : vizType === "sorting" || isSortingCategory ? (
                                                <SortingVisualizer event={visualEvent || currentEvent} input={input} slug={meta.slug} />
                                            ) : vizType === "search" ? (
                                                <SearchVisualizer event={visualEvent || currentEvent} input={input} />
                                            ) : vizType === "graph" || isGraphCategory ? (
                                                <GraphVisualizer event={visualEvent || currentEvent} input={input} />
                                            ) : vizType === "dp" ? (
                                                <DPVisualizer event={visualEvent || currentEvent} input={input} />
                                            ) : vizType === "datastructure" ? (
                                                <DataStructureVisualizer slug={meta.slug} event={visualEvent || currentEvent} input={input} />
                                            ) : vizType === "generic" ? (
                                                <GenericVisualizer event={visualEvent || currentEvent} />
                                            ) : (
                                                <GenericVisualizer event={visualEvent || currentEvent} />
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
                                                {hasExecuted && trace.length === 0 && meta.status === "source-only" ? (
                                                    <p className="text-amber-600 text-xs font-bold mt-2 px-4 py-2 bg-amber-50 rounded-xl inline-block">
                                                        ⚠ Vizualizare pas-cu-pas indisponibilă — cod sursă disponibil în tab-ul "Cod Sursă".
                                                    </p>
                                                ) : !hasExecuted ? (
                                                    <>
                                                        <p className="text-slate-900 font-black text-xl">Inițializare simulare</p>
                                                        <p className="text-slate-400 font-medium text-sm">Pregătim rularea automată de la pasul 0 cu datele implicite.</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-slate-900 font-black text-xl">Nu există pași de redat</p>
                                                        <p className="text-slate-400 font-medium text-sm">Apasă Restart pentru a rula din nou cu datele curente.</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                            {/* Sidebar with 3 monitor boxes (desktop left) */}
                            <div className="lg:col-span-3 lg:order-1 space-y-3 h-full">
                            {/* Step & Start/Stop box */}
                            <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm font-bold">Stare</span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${playing ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"}`}>
                                            {playing ? "În rulare" : "Pauză"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm font-bold">Pas curent</span>
                                        <span className="font-black text-slate-900 text-sm">{trace.length > 0 ? `${currentStep + 1} / ${trace.length}` : "0 / 0"}</span>
                                    </div>
                                    <div className={`px-2.5 py-2 rounded-xl ${accentClasses.softBg} ${accentClasses.softText} text-[11px] font-black uppercase tracking-[0.16em] truncate`}>
                                        {trace.length > 0 ? `Pasul ${currentStep + 1} • ${currentEvent?.type || "—"}` : "Pasul 0 • —"}
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${accentClasses.solidBg} transition-all duration-500`}
                                            style={{ width: `${trace.length > 0 ? ((currentStep + 1) / trace.length) * 100 : 0}%` }}
                                        />
                                    </div>
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
                                            className={`w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer ${accentClasses.rangeAccent}`}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                            className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 hover:bg-white"
                                            title="Pasul anterior"
                                        >
                                            <ChevronLeftIcon size={16} />
                                        </button>
                                        <button
                                            onClick={() => setPlaying(!playing)}
                                            className={`h-9 w-9 flex items-center justify-center rounded-full ${playing ? "bg-amber-100 text-amber-600" : `${accentClasses.solidBg} text-white`}`}
                                            title="Start / Stop"
                                        >
                                            {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep(Math.min(currentStep + 1, trace.length - 1))}
                                            className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 hover:bg-white"
                                            title="Pasul următor"
                                        >
                                            <ChevronRightIcon size={16} />
                                        </button>
                                        <button
                                            onClick={handleRun}
                                            className="ml-auto px-3 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                                        >
                                            Restart
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold flex-wrap">
                                        <kbd className="px-2 py-1 rounded-md border border-slate-200 bg-slate-50 font-mono">←</kbd>
                                        <span className="text-slate-300">|</span>
                                        <kbd className="px-2 py-1 rounded-md border border-slate-200 bg-slate-50 font-mono">Space</kbd>
                                        <span className="text-slate-300">|</span>
                                        <kbd className="px-2 py-1 rounded-md border border-slate-200 bg-slate-50 font-mono">→</kbd>
                                    </div>
                                </div>
                            </div>

                            {/* Variables panel (always visible) */}
                            <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="font-black text-slate-900 mb-4 text-[11px] uppercase tracking-widest border-b border-slate-50 pb-3">Variabile</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Execuție</div>
                                        {executionVars.length === 0 ? (
                                            <p className="text-xs text-slate-400">Variabilele de execuție vor apărea după primul pas.</p>
                                        ) : (
                                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-1.5">
                                                {executionVars.map(([key, val]) => {
                                                    const compact = toCompactValueLabel(val);
                                                    return (
                                                        <div key={`exec-${key}`} className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden min-h-[50px]" title={compact.full}>
                                                            <div className="text-[8px] font-black text-slate-400 uppercase mb-0.5 tracking-wider truncate">{key}</div>
                                                            <div className="font-mono text-xs font-black text-slate-700 truncate" aria-label={compact.full}>
                                                                {compact.compact}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Input</div>
                                        {inputVars.length === 0 ? (
                                            <p className="text-xs text-slate-400">Nu există variabile de input configurate.</p>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-1.5">
                                                {inputVars.map(([key, val]) => {
                                                    const compact = toCompactValueLabel(val, 110);
                                                    return (
                                                        <div key={`input-${key}`} className="px-2.5 py-2 rounded-lg bg-white border border-slate-100 overflow-hidden min-h-[56px]">
                                                            <div className="text-[8px] font-black text-slate-400 uppercase mb-0.5 tracking-wider truncate">{key}</div>
                                                            <div className="font-mono text-xs font-black text-slate-700 whitespace-normal break-words leading-tight" aria-label={compact.full}>
                                                                {compact.compact}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        </div>

                        {/* Full-width bottom explanation */}
                        <div className={`p-6 ${accentTheme.panel} rounded-[2rem] text-white shadow-2xl ${accentTheme.panelShadow} relative overflow-hidden group`}>
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
                                    : vizType === "graph" || isGraphCategory
                                    ? "Configurează nodurile și muchiile în format JSON pentru a vizualiza graful pas cu pas."
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
                                                value={Number.isFinite(Number(input.target)) ? Number(input.target) : ""}
                                                onChange={(e) => {
                                                    const raw = e.target.value;
                                                    setInput({ ...input, target: raw === "" ? undefined : Number(raw) });
                                                }}
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

                                                const isOperationsField = /operations?/i.test(key);
                                                const isLongTextField = key.toLowerCase() === "text" || value.includes("\n") || value.length > 70;
                                                if (isOperationsField || isLongTextField) {
                                                    return (
                                                        <div key={key} className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
                                                            <textarea
                                                                value={value}
                                                                onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.value }))}
                                                                className={`w-full font-mono text-sm p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 ${accentTheme.focusRing} focus:ring-2 transition-all outline-none`}
                                                                rows={Math.max(4, Math.min(10, value.split("\n").length + 1))}
                                                            />
                                                            {isOperationsField && (
                                                                <p className="text-[11px] text-slate-400">O operație pe linie (ex: <span className="font-mono">enqueue 20</span>).</p>
                                                            )}
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
                        <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-500">Tokeni liberi azi</p>
                            <p className="text-base font-black text-slate-900">
                                {chatTokenQuota ? chatTokenQuota.todayRemaining.toLocaleString("ro-RO") : "—"}
                            </p>
                            {chatTokenQuota ? (
                                <p className="w-full text-[11px] text-slate-500">
                                    Folosiți azi: {chatTokenQuota.todayUsed.toLocaleString("ro-RO")} / {chatTokenQuota.dailyLimit.toLocaleString("ro-RO")} tokeni
                                </p>
                            ) : chat.length > 0 ? (
                                <p className="w-full text-[11px] text-amber-600">Cota zilnică nu a fost primită de la server. Repornește serverul pentru a activa afișarea tokenilor rămași.</p>
                            ) : (
                                <p className="w-full text-[11px] text-slate-400">Valoarea apare după primul răspuns AI.</p>
                            )}
                        </div>
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
                                                ? `ml-auto rounded-2xl rounded-br-md ${accentClasses.solidBg} text-white shadow-md`
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
                                ref={chatInputRef}
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleChat()}
                                placeholder="Scrie întrebarea ta aici..."
                                className={`w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 ${accentClasses.ring} transition-all`}
                            />
                            <button 
                                onClick={handleChat}
                                disabled={chatLoading}
                                className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl ${accentClasses.solidBg} text-white ${accentClasses.solidHover} transition-colors`}
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
                                className={`text-xs font-bold ${accentClasses.codeText} ${accentClasses.codeHover} transition-colors`}
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
    const router = useRouter();
	const slug = params.slug as string;
    const meta = useMemo(
        () => allAlgorithms.find((algorithm) => algorithm.slug === slug) || null,
        [slug]
    );
    const [docMarkdown, setDocMarkdown] = useState("");
    const [docHtml, setDocHtml] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [hasLoadedOpenCategories, setHasLoadedOpenCategories] = useState(false);
    const desktopSidebarScrollRef = useRef<HTMLDivElement | null>(null);
    const mobileSidebarScrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.sessionStorage.getItem("alg-sidebar-open-categories");
            const parsed = raw ? JSON.parse(raw) : {};
            if (parsed && typeof parsed === "object") {
                setOpenCategories(parsed as Record<string, boolean>);
            }
        } catch {
            // Ignore malformed storage values.
        } finally {
            setHasLoadedOpenCategories(true);
        }
    }, []);

	useEffect(() => {
    if (!meta) {
            setDocMarkdown("");
            setDocHtml("");
            return;
        }

        let cancelled = false;

        const cachedDoc = algorithmDocCache.get(slug);
        if (cachedDoc) {
            setDocMarkdown(cachedDoc.markdown);
            setDocHtml(cachedDoc.html);
            return () => {
                cancelled = true;
            };
        }

        api
            .getAlgorithmDoc(slug)

            .then((res) => {
                if (cancelled) return;
                const nextDoc = {
                    markdown: res.markdown || "",
                    html: res.html || "",
                };
                algorithmDocCache.set(slug, nextDoc);
                setDocMarkdown(nextDoc.markdown);
                setDocHtml(nextDoc.html);
            })
            .catch(() => {
                if (cancelled) return;
                setDocMarkdown("");
                setDocHtml("");
            });

		return () => {
            cancelled = true;
        };
    }, [slug, meta]);

    useEffect(() => {
        if (!meta) return;

        const activeKey = normalizeCategoryKey(meta.category).replace(/-/g, "_");
        const peers = allAlgorithms
            .filter((algorithm) => normalizeCategoryKey(algorithm.category).replace(/-/g, "_") === activeKey)
            .sort((a, b) => cleanAlgorithmName(a.name).localeCompare(cleanAlgorithmName(b.name), "ro"));

        const currentIndex = peers.findIndex((algorithm) => algorithm.slug === slug);
        if (currentIndex === -1) return;

        const start = Math.max(0, currentIndex - 6);
        const end = Math.min(peers.length, currentIndex + 7);
        const nearby = peers.slice(start, end).filter((algorithm) => algorithm.slug !== slug);

        nearby.forEach((algorithm) => {
            const href = `/algoritmi/${algorithm.slug}`;
            router.prefetch(href);

            if (!algorithmDocCache.has(algorithm.slug)) {
                api
                    .getAlgorithmDoc(algorithm.slug)
                    .then((res) => {
                        algorithmDocCache.set(algorithm.slug, {
                            markdown: res.markdown || "",
                            html: res.html || "",
                        });
                    })
                    .catch(() => {
                        // Ignore prefetch errors for non-critical warm-up.
                    });
            }
        });
    }, [meta, slug, router]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!hasLoadedOpenCategories) return;
        try {
            window.sessionStorage.setItem("alg-sidebar-open-categories", JSON.stringify(openCategories));
        } catch {
            // Ignore storage write errors.
        }
    }, [openCategories, hasLoadedOpenCategories]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const raw = window.sessionStorage.getItem("alg-sidebar-scroll");
        const scrollTop = raw ? Number(raw) : 0;
        if (!Number.isFinite(scrollTop)) return;

        requestAnimationFrame(() => {
            if (desktopSidebarScrollRef.current) desktopSidebarScrollRef.current.scrollTop = scrollTop;
            if (mobileSidebarScrollRef.current) mobileSidebarScrollRef.current.scrollTop = scrollTop;
        });
    }, []);

    const persistSidebarScroll = (value: number) => {
        if (typeof window === "undefined") return;
        try {
            window.sessionStorage.setItem("alg-sidebar-scroll", String(value));
        } catch {
            // Ignore storage write errors.
        }
    };

    useEffect(() => {
        if (!meta) return;
        const activeKey = normalizeCategoryKey(meta.category).replace(/-/g, "_");
        setOpenCategories((prev) => ({ ...prev, [activeKey]: true }));
    }, [meta, slug]);

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
                <div
                    ref={desktopSidebarScrollRef}
                    onScroll={(event) => persistSidebarScroll(event.currentTarget.scrollTop)}
                    className="flex-1 overflow-y-auto p-3"
                >
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
                                                        scroll={false}
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
                                <div
                                    ref={mobileSidebarScrollRef}
                                    onScroll={(event) => persistSidebarScroll(event.currentTarget.scrollTop)}
                                    className="flex-1 overflow-y-auto p-3"
                                >
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
                                                                        scroll={false}
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
