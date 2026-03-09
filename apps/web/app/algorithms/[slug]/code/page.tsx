"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { api } from "@lib/api";
import { AlgorithmMeta } from "@lib/algorithm-meta";

export default function AlgorithmCodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [meta, setMeta] = useState<AlgorithmMeta | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([api.listAlgorithms(), api.code(slug)])
      .then(([list, codeRes]) => {
        if (!mounted) return;
        const found = list.find((a) => a.slug === slug) || null;
        setMeta(found);
        setCode(codeRes.code);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || "Nu am putut încărca codul");
      });
    return () => { mounted = false; };
  }, [slug]);

  return (
    <main className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/algorithms/${slug}`}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 text-sm text-slate-600"
        >
          <ArrowLeftIcon size={16} />
          Înapoi la algoritm
        </Link>
      </div>

      {meta && (
        <div className="card">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{meta.category}</p>
          <h1 className="text-2xl font-semibold text-slate-900 mt-1">{meta.name} — Cod sursă</h1>
          <p className="text-sm text-slate-600 mt-1">{meta.summary}</p>
        </div>
      )}

      {error && (
        <div className="card text-sm text-amber-700 bg-amber-50 border border-amber-200">
          {error}
        </div>
      )}

      {!code && !error && (
        <div className="card text-sm text-slate-500 animate-pulse">Se încarcă codul...</div>
      )}

      {code && (
        <div className="card p-0 overflow-hidden">
          <div className="rounded-xl border-2 border-slate-200 bg-slate-900 text-xs shadow-lg overflow-hidden">
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-slate-400 text-xs font-mono ml-2">{slug}.py</span>
            </div>
            <pre className="overflow-auto p-5 max-h-[80vh]">
              <code className="language-python">
                {code.split("\n").map((line, idx) => (
                  <div key={idx} className="flex gap-3 py-0.5">
                    <span className="w-10 text-right select-none text-slate-500">{idx + 1}</span>
                    <span className="whitespace-pre font-mono text-slate-300">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
