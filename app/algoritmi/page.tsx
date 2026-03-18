"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { AlgorithmMeta } from "@/lib/algorithms";
import Link from "next/link";

export default function AlgorithmsPage() {
	const [algorithms, setAlgorithms] = useState<AlgorithmMeta[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api
			.listAlgorithms()
			.then(setAlgorithms)
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-slate-600">Se încarcă algoritmi...</p>
			</div>
		);
	}

	const byCategory = algorithms.reduce(
		(acc, algo) => {
			if (!acc[algo.category]) acc[algo.category] = [];
			acc[algo.category].push(algo);
			return acc;
		},
		{} as Record<string, AlgorithmMeta[]>
	);

	return (
		<main className="space-y-8">
			<div>
				<h1 className="text-4xl font-bold text-slate-900 mb-2">Bibliotecă de algoritmi</h1>
				<p className="text-slate-600">
					Selectează un algoritm pentru a vedea vizualizarea și a primi asistență IA
				</p>
			</div>

			{Object.entries(byCategory).map(([category, algos]) => (
				<div key={category} className="space-y-4">
					<h2 className="text-2xl font-semibold text-slate-900">{category}</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{algos.map((algo) => (
							<Link
								key={algo.slug}
								href={`/algoritmi/${algo.slug}`}
								className="card p-6 hover:shadow-md transition-shadow cursor-pointer"
							>
								<h3 className="font-semibold text-slate-900 mb-2">
									{algo.name}
								</h3>
								<p className="text-sm text-slate-600 mb-3">
									{algo.description}
								</p>
								<div className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded w-fit">
									{algo.complexity}
								</div>
							</Link>
						))}
					</div>
				</div>
			))}
		</main>
	);
}
