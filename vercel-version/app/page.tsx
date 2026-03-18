import {
  InfinityIcon,
  BeakerIcon,
  ChecklistIcon,
  PlayIcon,
} from "@primer/octicons-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
        <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700">
              <BeakerIcon size={14} />
              <span>Platformă Educațională Interactivă</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              Învață algoritmi prin{" "}
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                vizualizare
              </span>{" "}
              și{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                AI Ajutor
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
              Rulează algoritmi pas cu pas, vizualizează fiecare etapă și
              întreabă AI ajutor pentru explicații detaliate. Învățare
              interactivă, adaptată pentru algoritmi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/algorithms"
                className="button-primary flex items-center justify-center gap-2"
              >
                <PlayIcon size={16} />
                Explorează Algoritmii
              </Link>
              <Link
                href="/algorithms"
                className="btn btn-secondary flex items-center justify-center gap-2"
              >
                <ChecklistIcon size={16} />
                Vezi Player-ul
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-6 shadow-lg">
            <div className="text-sm font-semibold text-slate-800 mb-4">
              ✨ Features Principale
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ChecklistIcon size={12} className="text-emerald-600" />
                </div>
                <span>
                  <strong className="text-slate-900">Execuție pas cu pas</strong> –
                  Controlează viteza și vezi fiecare operație în detaliu
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
                  <BeakerIcon size={12} className="text-sky-600" />
                </div>
                <span>
                  <strong className="text-slate-900">AI Tutor</strong> – Intreabă
                  orice despre algoritmi și obține răspunsuri detaliate
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <InfinityIcon size={12} className="text-purple-600" />
                </div>
                <span>
                  <strong className="text-slate-900">8 Algoritmi</strong> – Sortare,
                  Căutare, Grafuri
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Algorithms preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Algoritmi disponibili</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Sortare cu bule", emoji: "🫧" },
            { name: "Insertion Sort", emoji: "📥" },
            { name: "Selection Sort", emoji: "🎯" },
            { name: "Quick Sort", emoji: "⚡" },
            { name: "Binary Search", emoji: "🔍" },
            { name: "BFS", emoji: "📊" },
            { name: "DFS", emoji: "🕳️" },
            { name: "Dijkstra", emoji: "🛣️" },
          ].map((algo, i) => (
            <div key={i} className="card p-4 text-center">
              <div className="text-3xl mb-2">{algo.emoji}</div>
              <h3 className="font-semibold text-slate-900">{algo.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
