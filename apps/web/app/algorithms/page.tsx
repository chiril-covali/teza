"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { api } from "@lib/api";
import { AlgorithmMeta } from "@lib/algorithm-meta";
import { SearchIcon, NumberIcon, GraphIcon, SidebarExpandIcon } from "@primer/octicons-react";

export default function AlgorithmsPage() {
  const [algorithms, setAlgorithms] = useState<AlgorithmMeta[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("toate");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listAlgorithms()
      .then((list) => setAlgorithms(list))
      .catch((err) => console.error("Failed to load algorithms", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    algorithms.forEach((a) => set.add(a.category));
    return ["toate", ...Array.from(set)];
  }, [algorithms]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return algorithms.filter((a) => {
      const matchesQuery = a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      const matchesCategory = category === "toate" || a.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [algorithms, query, category]);

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Catalog Algoritmi</h1>
          <p className="text-sm text-slate-300">Răsfoiește algoritmii whitelistați disponibili în execuție.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <SearchIcon className="pointer-events-none absolute left-3 top-2.5 text-slate-500" size={14} />
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100"
              placeholder="Caută după nume sau categorie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SidebarExpandIcon className="text-slate-500" size={14} />
            <select
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "toate" ? "Toate categoriile" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card h-32 animate-pulse bg-slate-900/80" />
          ))}
        {!loading &&
          filtered.map((algo) => (
            <Link key={algo.slug} href={`/algorithms/${algo.slug}`} className="card hover:border-slate-600">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="flex items-center gap-1">
                  <GraphIcon size={14} /> {algo.category}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-200">
                  <NumberIcon size={14} /> {algo.difficulty}
                </span>
              </div>
              <div className="mt-3 text-lg font-semibold text-white">{algo.name}</div>
              <p className="mt-2 text-sm text-slate-200">{algo.summary}</p>
            </Link>
          ))}
        {!loading && filtered.length === 0 && (
          <div className="text-sm text-slate-300">Niciun algoritm nu corespunde filtrului.</div>
        )}
      </div>
    </main>
  );
}
