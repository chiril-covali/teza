"use client";

import { useState, useEffect, useMemo } from "react";
import { AlgorithmMeta } from "@/lib/algorithms";
import Link from "next/link";
import { api } from "@/lib/api";
import { 
  ProjectIcon, 
  ChevronLeftIcon, 
  SearchIcon,
  FilterIcon,
  StackIcon,
  CodeSquareIcon,
  OrganizationIcon,
	ReplyIcon,
  ShieldCheckIcon,
  ChecklistIcon,
  PulseIcon
} from "@primer/octicons-react";

const categoryIcons: Record<string, any> = {
	"sortare": <StackIcon />,
	"căutare": <SearchIcon />,
	"grafuri": <OrganizationIcon />,
	"matematică": <PulseIcon />,
	"programare_dinamică": <CodeSquareIcon />,
	"cifrare": <ShieldCheckIcon />,
	"structuri_de_date": <ChecklistIcon />,
	"manipulare_de_biți": <ProjectIcon />,
	"altele": <ProjectIcon />,
	"diverse": <ProjectIcon />,
  "sorts": <StackIcon />,
  "search": <SearchIcon />,
  "graph": <OrganizationIcon />,
  "maths": <PulseIcon />,
	"backtracking": <ReplyIcon />,
  "dynamic_programming": <CodeSquareIcon />,
  "ciphers": <ShieldCheckIcon />,
  "data_structures": <ChecklistIcon />,
  "bit_manipulation": <ProjectIcon />,
  "other": <ProjectIcon />,
};

const categoryThemes: Record<string, { iconWrap: string; cardAccent: string; chevronWrap: string; cardHover: string }> = {
	backtracking: {
		iconWrap: "bg-amber-500 text-white shadow-amber-100",
		cardAccent: "group-hover:text-amber-600",
		chevronWrap: "group-hover:bg-amber-50 group-hover:text-amber-600",
		cardHover: "hover:border-amber-200 hover:shadow-amber-100/40",
	},
	sortare: {
		iconWrap: "bg-rose-500 text-white shadow-rose-100",
		cardAccent: "group-hover:text-rose-600",
		chevronWrap: "group-hover:bg-rose-50 group-hover:text-rose-600",
		cardHover: "hover:border-rose-200 hover:shadow-rose-100/40",
	},
	sorts: {
		iconWrap: "bg-rose-500 text-white shadow-rose-100",
		cardAccent: "group-hover:text-rose-600",
		chevronWrap: "group-hover:bg-rose-50 group-hover:text-rose-600",
		cardHover: "hover:border-rose-200 hover:shadow-rose-100/40",
	},
	cautare: {
		iconWrap: "bg-cyan-500 text-white shadow-cyan-100",
		cardAccent: "group-hover:text-cyan-600",
		chevronWrap: "group-hover:bg-cyan-50 group-hover:text-cyan-600",
		cardHover: "hover:border-cyan-200 hover:shadow-cyan-100/40",
	},
	search: {
		iconWrap: "bg-cyan-500 text-white shadow-cyan-100",
		cardAccent: "group-hover:text-cyan-600",
		chevronWrap: "group-hover:bg-cyan-50 group-hover:text-cyan-600",
		cardHover: "hover:border-cyan-200 hover:shadow-cyan-100/40",
	},
	grafuri: {
		iconWrap: "bg-indigo-500 text-white shadow-indigo-100",
		cardAccent: "group-hover:text-indigo-600",
		chevronWrap: "group-hover:bg-indigo-50 group-hover:text-indigo-600",
		cardHover: "hover:border-indigo-200 hover:shadow-indigo-100/40",
	},
	graph: {
		iconWrap: "bg-indigo-500 text-white shadow-indigo-100",
		cardAccent: "group-hover:text-indigo-600",
		chevronWrap: "group-hover:bg-indigo-50 group-hover:text-indigo-600",
		cardHover: "hover:border-indigo-200 hover:shadow-indigo-100/40",
	},
	matematica: {
		iconWrap: "bg-lime-500 text-white shadow-lime-100",
		cardAccent: "group-hover:text-lime-700",
		chevronWrap: "group-hover:bg-lime-50 group-hover:text-lime-700",
		cardHover: "hover:border-lime-200 hover:shadow-lime-100/40",
	},
	maths: {
		iconWrap: "bg-lime-500 text-white shadow-lime-100",
		cardAccent: "group-hover:text-lime-700",
		chevronWrap: "group-hover:bg-lime-50 group-hover:text-lime-700",
		cardHover: "hover:border-lime-200 hover:shadow-lime-100/40",
	},
	programare_dinamica: {
		iconWrap: "bg-emerald-500 text-white shadow-emerald-100",
		cardAccent: "group-hover:text-emerald-600",
		chevronWrap: "group-hover:bg-emerald-50 group-hover:text-emerald-600",
		cardHover: "hover:border-emerald-200 hover:shadow-emerald-100/40",
	},
	dynamic_programming: {
		iconWrap: "bg-emerald-500 text-white shadow-emerald-100",
		cardAccent: "group-hover:text-emerald-600",
		chevronWrap: "group-hover:bg-emerald-50 group-hover:text-emerald-600",
		cardHover: "hover:border-emerald-200 hover:shadow-emerald-100/40",
	},
	cifrare: {
		iconWrap: "bg-fuchsia-500 text-white shadow-fuchsia-100",
		cardAccent: "group-hover:text-fuchsia-600",
		chevronWrap: "group-hover:bg-fuchsia-50 group-hover:text-fuchsia-600",
		cardHover: "hover:border-fuchsia-200 hover:shadow-fuchsia-100/40",
	},
	ciphers: {
		iconWrap: "bg-fuchsia-500 text-white shadow-fuchsia-100",
		cardAccent: "group-hover:text-fuchsia-600",
		chevronWrap: "group-hover:bg-fuchsia-50 group-hover:text-fuchsia-600",
		cardHover: "hover:border-fuchsia-200 hover:shadow-fuchsia-100/40",
	},
	structuri_de_date: {
		iconWrap: "bg-sky-500 text-white shadow-sky-100",
		cardAccent: "group-hover:text-sky-600",
		chevronWrap: "group-hover:bg-sky-50 group-hover:text-sky-600",
		cardHover: "hover:border-sky-200 hover:shadow-sky-100/40",
	},
	data_structures: {
		iconWrap: "bg-sky-500 text-white shadow-sky-100",
		cardAccent: "group-hover:text-sky-600",
		chevronWrap: "group-hover:bg-sky-50 group-hover:text-sky-600",
		cardHover: "hover:border-sky-200 hover:shadow-sky-100/40",
	},
	manipulare_de_biti: {
		iconWrap: "bg-violet-500 text-white shadow-violet-100",
		cardAccent: "group-hover:text-violet-600",
		chevronWrap: "group-hover:bg-violet-50 group-hover:text-violet-600",
		cardHover: "hover:border-violet-200 hover:shadow-violet-100/40",
	},
	bit_manipulation: {
		iconWrap: "bg-violet-500 text-white shadow-violet-100",
		cardAccent: "group-hover:text-violet-600",
		chevronWrap: "group-hover:bg-violet-50 group-hover:text-violet-600",
		cardHover: "hover:border-violet-200 hover:shadow-violet-100/40",
	},
	diverse: {
		iconWrap: "bg-orange-500 text-white shadow-orange-100",
		cardAccent: "group-hover:text-orange-600",
		chevronWrap: "group-hover:bg-orange-50 group-hover:text-orange-600",
		cardHover: "hover:border-orange-200 hover:shadow-orange-100/40",
	},
	altele: {
		iconWrap: "bg-slate-500 text-white shadow-slate-100",
		cardAccent: "group-hover:text-slate-700",
		chevronWrap: "group-hover:bg-slate-100 group-hover:text-slate-700",
		cardHover: "hover:border-slate-300 hover:shadow-slate-100/40",
	},
	other: {
		iconWrap: "bg-slate-500 text-white shadow-slate-100",
		cardAccent: "group-hover:text-slate-700",
		chevronWrap: "group-hover:bg-slate-100 group-hover:text-slate-700",
		cardHover: "hover:border-slate-300 hover:shadow-slate-100/40",
	},
};

function getCategoryTheme(categoryKey: string) {
	return (
		categoryThemes[categoryKey] || {
			iconWrap: "bg-slate-600 text-white shadow-slate-100",
			cardAccent: "group-hover:text-slate-900",
			chevronWrap: "group-hover:bg-slate-100 group-hover:text-slate-700",
			cardHover: "hover:border-slate-300 hover:shadow-slate-100/40",
		}
	);
}

const categoryLabelsRo: Record<string, string> = {
	sorts: "Sortare",
	search: "Căutare",
	graph: "Grafuri",
	maths: "Matematică",
	backtracking: "Backtracking",
	dynamic_programming: "Programare Dinamică",
	ciphers: "Criptografie",
	data_structures: "Structuri de Date",
	bit_manipulation: "Manipulare de Biți",
	other: "Altele",
};

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
	const key = normalizeKey(category);
	return categoryLabelsRo[key] || titleCaseRo(category.replace(/_/g, " "));
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

	if (normalizeKey(algo.category) === "căutare" || normalizeKey(algo.category) === "search") {
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
			const categoryKey = normalizeKey(algo.category);
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

	return (
		<div className="min-h-screen bg-slate-50">
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

			<main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
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
						{Object.entries(byCategory).map(([categoryKey, categoryData]) => (
							(() => {
								const categoryTheme = getCategoryTheme(categoryKey);
								return (
								<div key={categoryKey} className="space-y-8">
								<div className="flex items-center gap-4">
									<div className={`p-2.5 rounded-xl shadow-lg ${categoryTheme.iconWrap}`}>
											{categoryIcons[categoryKey] || <StackIcon />}
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
											className={`group relative overflow-hidden p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${categoryTheme.cardHover}`}
										>
											<div className="flex items-start justify-between gap-3">
												<h3 className={`text-base font-bold text-slate-900 transition-colors leading-snug ${categoryTheme.cardAccent}`}>
													{algo.displayNameRo}
												</h3>
												<div className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-300 transition-all ${categoryTheme.chevronWrap}`}>
													<ChevronLeftIcon className="rotate-180" size={20} />
												</div>
											</div>

											<div className="mt-4 space-y-2 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40">
												<p className="text-sm text-slate-600 leading-relaxed">
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
