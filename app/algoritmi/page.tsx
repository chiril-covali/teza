"use client";

import { useState, useEffect, useMemo } from "react";
import { api } from "@/lib/api";
import { AlgorithmMeta, allAlgorithms } from "@/lib/algorithms";
import Link from "next/link";
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

export default function AlgorithmsPage() {
	const [algorithms, setAlgorithms] = useState<AlgorithmMeta[]>([]);
	const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

	useEffect(() => {
        // Use the generated registry as the base
        setAlgorithms(allAlgorithms);
        setLoading(false);
	}, []);

    const filteredAlgorithms = useMemo(() => {
        if (!search.trim()) return algorithms;
        const s = search.toLowerCase();
        return algorithms.filter(a => 
            a.name.toLowerCase().includes(s) || 
            a.category.toLowerCase().includes(s)
        );
    }, [algorithms, search]);

	const byCategory = filteredAlgorithms.reduce(
		(acc, algo) => {
			if (!acc[algo.category]) acc[algo.category] = [];
			acc[algo.category].push(algo);
			return acc;
		},
		{} as Record<string, AlgorithmMeta[]>
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
					<h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Catalog Algoritmi</h1>
					
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
                            {filteredAlgorithms.length} Algoritmi
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
						{Object.entries(byCategory).map(([category, algos]) => (
							<div key={category} className="space-y-8">
								<div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
                                        {categoryIcons[category.toLowerCase()] || <StackIcon />}
                                    </div>
									<h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">{category.replace(/_/g, ' ')}</h2>
									<div className="h-px flex-1 bg-slate-200/60" />
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{algos.length} itemi</span>
								</div>
								<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{algos.map((algo) => (
										<Link
											key={algo.slug}
											href={`/algoritmi/${algo.slug}`}
											className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-100/30 hover:border-indigo-200 hover:-translate-y-1 flex items-center justify-between"
										>
											<h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug pr-4">
												{algo.name}
											</h3>
                                            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                                <ChevronLeftIcon className="rotate-180" size={20} />
                                            </div>
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
