"use client";

import { useState, useEffect, useMemo } from "react";
import { AlgorithmMeta } from "@/lib/algorithms";
import { getCategoryDisplayName, getCategoryVisual, normalizeCategoryKey as normalizeThemeCategoryKey } from "@/lib/algorithm-category-theme";
import Link from "next/link";
import { api } from "@/lib/api";
import ScrollReactiveBackground from "../components/ScrollReactiveBackground";
import { 
  ProjectIcon, 
  ChevronLeftIcon, 
  SearchIcon,
  FilterIcon,
} from "@primer/octicons-react";

const tokenMapRo: Record<string, string> = {
	backtracking: "",
	cautare: "",
	matematica: "",
	diverse: "",
	grafuri: "",
	sortare: "",
	"structuri-de-date": "",
	"manipulare-biti": "",
	programare: "",
	dinamica: "",
	all: "toate",
	combinations: "combinațiile",
	of: "de",
	size: "dimensiune",
	k: "K",
	search: "căutare",
	sort: "sortare",
	array: "vector",
	parse: "analiză",
	nested: "paranteze",
	brackets: "imbricate",
	shuffle: "amestecare",
	binarysearch: "căutare binară",
	binary: "binară",
	exponential: "exponențială",
	fibonacci: "fibonacci",
	linear: "liniară",
	interpolation: "prin interpolare",
	jump: "prin salturi",
	sentinel: "cu santinelă",
	generateparentheses: "paranteze valide",
	add: "adunare",
	is: "verificare",
	power: "putere",
	log: "logaritm",
	two: "în baza 2",
	xor: "XOR",
	cipher: "cifru",
	disjoint: "mulțimi disjuncte",
	set: "set",
	heap: "heap",
	doubly: "dublu",
	linked: "înlanțuită",
	list: "listă",
	singly: "simplă",
	hash: "hash",
	map: "hartă",
	queue: "coadă",
	circular: "circulară",
	stack: "stivă",
	binary_search_tree: "arbore de căutare binar",
	tries: "trie",
	coin: "monede",
	change: "rest minim",
	knapsack: "rucsac",
	lcs: "subsecvența comună maximă",
	bellman: "Bellman",
	ford: "Ford",
	bipartite: "bipartit",
	dijkstra: "Dijkstra",
	edmonds: "Edmonds",
	karp: "Karp",
	floyd: "Floyd",
	warshall: "Warshall",
	johnson: "Johnson",
	kosajaru: "Kosaraju",
	kruskal: "Kruskal",
	prim: "Prim",
	tarjan: "Tarjan",
	absolute: "valoare absolută",
	value: "",
	aliquot: "sumă alicotă",
	sum: "",
	armstrong: "număr Armstrong",
	number: "",
	bubble: "cu bule",
	insertion: "prin inserție",
	selection: "prin selecție",
	quick: "rapidă",
	merge: "prin interclasare",
	bfs: "parcurgere în lățime (BFS)",
	dfs: "parcurgere în adâncime (DFS)",
};

type CatalogAlgorithm = AlgorithmMeta & {
	displayNameRo: string;
	categoryRo: string;
	categoryKey: string;
	descriptionRo: string;
};

function normalizeKey(value: string): string {
	return value.toLowerCase().trim().replace(/\s+/g, "_");
}

function titleCaseRo(text: string): string {
	return text
		.split(" ")
		.filter(Boolean)
		.map((w, i) => {
			if (i > 0 && ["de", "și", "în", "din", "la", "cu", "pe"].includes(w)) return w;
			return w.charAt(0).toUpperCase() + w.slice(1);
		})
		.join(" ");
}

function splitCamel(value: string): string[] {
	return value
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.split(/[^a-zA-Z0-9ăâîșțĂÂÎȘȚ-]+/)
		.filter(Boolean);
}

function dedupeWords(text: string): string {
	const out: string[] = [];
	for (const w of text.split(" ").filter(Boolean)) {
		if (out[out.length - 1]?.toLowerCase() === w.toLowerCase()) continue;
		out.push(w);
	}
	return out.join(" ");
}

function isPlaceholderDescription(text?: string): boolean {
	if (!text) return true;
	const t = text.toLowerCase();
	return (
		t.includes("variantă educațională") ||
		t.includes("analizează codul sursă pas cu pas") ||
		t.includes("implementare typescript")
	);
}

function getCategoryRo(category: string): string {
	return getCategoryDisplayName(category) || titleCaseRo(category.replace(/_/g, " "));
}

function translateTechnicalTextToRo(text: string): string {
	const replacements: Array<[RegExp, string]> = [
		[/\bThis algorithm\b/gi, "Acest algoritm"],
		[/\bThis function\b/gi, "Această funcție"],
		[/\bGiven\b/gi, "Dat"],
		[/\bCompute\b/gi, "Calculează"],
		[/\bReturns\b/gi, "Returnează"],
		[/\bReturn\b/gi, "Returnează"],
		[/\bFinds\b/gi, "Găsește"],
		[/\bFind\b/gi, "Găsește"],
		[/\bChecks\b/gi, "Verifică"],
		[/\bCheck\b/gi, "Verifică"],
		[/\bSorts\b/gi, "Sortează"],
		[/\bSort\b/gi, "Sortează"],
		[/\bSearch\b/gi, "Caută"],
		[/\bshortest path\b/gi, "drumul minim"],
		[/\bminimum spanning tree\b/gi, "arborele parțial de cost minim"],
		[/\bgraph\b/gi, "graf"],
		[/\bnodes\b/gi, "noduri"],
		[/\bedges\b/gi, "muchii"],
		[/\bqueue\b/gi, "coadă"],
		[/\bstack\b/gi, "stivă"],
		[/\barray\b/gi, "vector"],
		[/\bstring\b/gi, "șir"],
		[/\bnumber\b/gi, "număr"],
		[/\bdata structure\b/gi, "structură de date"],
		[/\bTime complexity\b/gi, "Complexitate temporală"],
		[/\bSpace complexity\b/gi, "Complexitate spațială"],
		[/\busing\b/gi, "folosind"],
		[/\bwith\b/gi, "cu"],
	];

	let result = text;
	for (const [pattern, replacement] of replacements) {
		result = result.replace(pattern, replacement);
	}
	return result.replace(/\s+/g, " ").trim();
}

function extractDescriptionFromSource(source?: string): string {
	if (!source) return "";

	const docMatch = source.match(/\/\*\*([\s\S]*?)\*\//);
	const docBlock = docMatch?.[1] || "";
	if (!docBlock) return "";

	const descriptionTag = docBlock.match(/@description\s+([^@\n][^\n]*)/i)?.[1]?.trim();
	if (descriptionTag) {
		return descriptionTag;
	}

	const cleanLines = docBlock
		.split("\n")
		.map((line) => line.replace(/^\s*\*\s?/, "").trim())
		.filter((line) => line.length > 0)
		.filter((line) => !line.startsWith("@"))
		.filter((line) => !line.startsWith("http"))
		.filter((line) => !line.startsWith("https"));

	if (!cleanLines.length) return "";

	const paragraph = cleanLines.join(" ").replace(/\s+/g, " ").trim();
	const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(Boolean);
	const firstTwo = sentences.slice(0, 2).join(" ").trim();
	return firstTwo || paragraph;
}

function buildRomanianName(algo: AlgorithmMeta): string {
	const slugParts = normalizeKey(algo.slug).split("_").slice(1);
	const exploded = slugParts.flatMap((part) => splitCamel(part.toLowerCase()));
	const translated = exploded
		.map((part) => tokenMapRo[part] ?? part)
		.filter(Boolean);
	let raw = dedupeWords(translated.join(" ").replace(/\s+/g, " ").trim());

	if (normalizeThemeCategoryKey(algo.category) === "cautare") {
		if (!raw.startsWith("căutare") && raw.length) {
			raw = `căutare ${raw}`;
		}
	}

	if (raw.length > 2) return titleCaseRo(raw);

	const fallback = algo.name.trim();
	if (fallback) return fallback;
	return titleCaseRo(algo.slug.replace(/_/g, " "));
}

function getDescriptionRo(algo: AlgorithmMeta, displayNameRo: string): string {
	const explicitDescription = algo.description?.trim();
	if (explicitDescription && !isPlaceholderDescription(explicitDescription)) {
		return translateTechnicalTextToRo(explicitDescription);
	}

	const sourceDescription = extractDescriptionFromSource(algo.source);
	if (sourceDescription) {
		return translateTechnicalTextToRo(sourceDescription);
	}

	const fallbackName = displayNameRo || titleCaseRo(algo.slug.replace(/_/g, " "));
	return `${fallbackName} rezolvă problema definită în implementare, urmând pașii specifici din codul sursă.`;
}

export default function AlgorithmsPage() {
	const [algorithms, setAlgorithms] = useState<AlgorithmMeta[]>([]);
	const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

	useEffect(() => {
		let mounted = true;
		api
			.listAlgorithms()
			.then((list) => {
				if (!mounted) return;
				setAlgorithms(list);
				setLoading(false);
			})
			.catch(() => {
				if (!mounted) return;
				setAlgorithms([]);
				setLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, []);

	const localizedAlgorithms = useMemo<CatalogAlgorithm[]>(() => {
		return algorithms.map((algo) => {
			const categoryKey = normalizeThemeCategoryKey(algo.category);
			const categoryRo = getCategoryRo(algo.category);
			const displayNameRo = buildRomanianName(algo);
			return {
				...algo,
				displayNameRo,
				categoryRo,
				categoryKey,
				descriptionRo: getDescriptionRo(algo, displayNameRo),
			};
		});
	}, [algorithms]);

    const filteredAlgorithms = useMemo(() => {
		if (!search.trim()) return localizedAlgorithms;
        const s = search.toLowerCase();
		return localizedAlgorithms.filter(a => 
			a.displayNameRo.toLowerCase().includes(s) || 
			a.categoryRo.toLowerCase().includes(s) ||
			a.descriptionRo.toLowerCase().includes(s)
        );
	}, [localizedAlgorithms, search]);

	const byCategory = filteredAlgorithms.reduce(
		(acc, algo) => {
			if (!acc[algo.categoryKey]) {
				acc[algo.categoryKey] = {
					label: algo.categoryRo,
					items: [],
				};
			}
			acc[algo.categoryKey].items.push(algo);
			return acc;
		},
		{} as Record<string, { label: string; items: CatalogAlgorithm[] }>
	);

	// Sort each category's items alphabetically by Romanian display name
	Object.values(byCategory).forEach(({ items }) => {
		items.sort((a, b) => a.displayNameRo.localeCompare(b.displayNameRo, "ro"));
	});

	// Sort categories by descending count (most algorithms first)
	const sortedCategories = Object.entries(byCategory).sort(
		([, a], [, b]) => b.items.length - a.items.length
	);

	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-50">
			<div className="pointer-events-none fixed inset-0 z-0 opacity-90">
				<ScrollReactiveBackground />
			</div>
			<nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
					<div className="flex items-center gap-4">
						<Link href="/" className="group flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
							<ChevronLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
							<span className="text-sm font-medium">Acasă</span>
						</Link>
						<div className="h-4 w-px bg-slate-200" />
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
								<ProjectIcon size={16} />
							</div>
							<span className="text-base font-bold tracking-tight text-slate-900">Bibliotecă</span>
						</div>
					</div>
				</div>
			</nav>

			<main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
				<div className="mb-12 space-y-8">
					<h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Catalogul Algoritmilor</h1>
					
                    {/* Search Bar */}
                    <div className="relative max-w-2xl group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <SearchIcon size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Caută un algoritm sau o categorie..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] text-lg font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                        />
						<div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 hidden sm:block">
							{filteredAlgorithms.length} algoritmi
                        </div>
                    </div>
				</div>

				{loading ? (
					<div className="flex flex-col items-center justify-center py-20 opacity-40">
						<div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
						<span className="mt-4 font-bold uppercase tracking-widest text-[10px]">Încărcare...</span>
					</div>
				) : filteredAlgorithms.length === 0 ? (
                    <div className="py-20 text-center space-y-4 opacity-40">
                        <FilterIcon size={48} className="mx-auto" />
                        <p className="font-bold text-xl text-slate-900">Niciun algoritm găsit</p>
                        <button onClick={() => setSearch("")} className="text-indigo-600 font-bold hover:underline">Resetează căutarea</button>
                    </div>
                ) : (
					<div className="space-y-16 pb-20">
						{sortedCategories.map(([categoryKey, categoryData]) => (
							(() => {
								const categoryTheme = getCategoryVisual(categoryKey);
								return (
								<div key={categoryKey} className="space-y-8">
								<div className="flex items-center gap-4">
									<div className={`p-2.5 rounded-xl shadow-lg ${categoryTheme.iconWrap}`}>
											{categoryTheme.icon}
                                    </div>
									<h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">{categoryData.label}</h2>
									<div className="h-px flex-1 bg-slate-200/60" />
									<span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{categoryData.items.length} algoritmi</span>
								</div>
								<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{categoryData.items.map((algo) => (
										<Link
											key={algo.slug}
											href={`/algoritmi/${algo.slug}`}
											className={`group relative overflow-visible p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${categoryTheme.cardHover}`}
										>
											<div className="flex items-center justify-center text-center">
												<h3 className={`text-base font-bold text-slate-900 transition-colors leading-snug ${categoryTheme.cardAccent}`}>
													{algo.displayNameRo}
												</h3>
											</div>

											<div className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-[min(32rem,92vw)] -translate-x-1/2 translate-y-1 rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
												<p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Detalii algoritm</p>
												<p className="mt-2 text-center text-sm text-slate-600 leading-relaxed">
													{algo.descriptionRo}
												</p>
											</div>
										</Link>
									))}
								</div>
							</div>
								);
							})()
						))}
					</div>
				)}
			</main>
		</div>
	);
}
