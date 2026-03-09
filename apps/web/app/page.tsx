import { InfinityIcon, BeakerIcon, ChecklistIcon, GraphIcon, DeviceMobileIcon, CommentDiscussionIcon, PlayIcon } from "@primer/octicons-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
        <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
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
                AI tutor
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
              Rulează algoritmi pas cu pas, vizualizează fiecare etapă și întreabă AI tutorul pentru explicații detaliate. Învățare interactivă similară cu Duolingo, adaptată pentru algoritmi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/algorithms" className="button-primary flex items-center justify-center gap-2">
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
            <div className="text-sm font-semibold text-slate-800 mb-4">✨ Features Principale</div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ChecklistIcon size={12} className="text-emerald-600" />
                </div>
                <span><strong className="text-slate-900">Execuție pas cu pas</strong> – Controlează viteza și vezi fiecare operație în detaliu</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
                  <GraphIcon size={12} className="text-sky-600" />
                </div>
                <span><strong className="text-slate-900">Vizualizări interactive</strong> – Array-uri, grafuri și arbori animați în timp real</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <CommentDiscussionIcon size={12} className="text-amber-600" />
                </div>
                <span>                <strong className="text-slate-900">Asistent AI inteligent</strong> – Întrebări sugerate și răspunsuri contextuale instant</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <DeviceMobileIcon size={12} className="text-purple-600" />
                </div>
                <span><strong className="text-slate-900">Responsive & Mobile</strong> – Experiență optimizată pe telefon, tabletă și desktop</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Algorithm Categories Quick View */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Categori de Algoritmi</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explorează algoritmi fundamentali organizați pe categorii de dificultate
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Sortare",
              icon: <GraphIcon size={20} />,
              description: "Bubble Sort, Quick Sort și mai multe algoritmi de sortare clasici",
              count: "2 algoritmi",
              color: "sky",
            },
            {
              title: "Căutare",
              icon: <ChecklistIcon size={20} />,
              description: "Căutare binară și tehnici eficiente de căutare în structuri de date",
              count: "1 algoritm",
              color: "emerald",
            },
            {
              title: "Grafuri",
              icon: <InfinityIcon size={20} />,
              description: "BFS, Dijkstra și algoritmi pentru parcurgerea și analiza grafurilor",
              count: "2 algoritmi",
              color: "amber",
            },
          ].map((category) => (
            <Link
              key={category.title}
              href="/algorithms"
              className="card group hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <div className={`inline-flex p-2 rounded-lg bg-${category.color}-100 text-${category.color}-700 mb-3 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{category.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{category.description}</p>
              <div className="text-xs text-slate-500">{category.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Cum Funcționează</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Trei pași simpli pentru a învăța algoritmi eficient
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: "1",
              title: "Alege un Algoritm",
              body: "Navighează prin catalogul de algoritmi și selectează unul care te interesează. Fiecare algoritm include complexitate, explicații și exemple.",
              icon: <GraphIcon size={20} />,
            },
            {
              step: "2",
              title: "Vizualizează Execuția",
              body: "Rulează algoritmul cu input personalizat și urmărește fiecare pas în timp real. Controlează viteza și navighează înainte și înapoi.",
              icon: <PlayIcon size={20} />,
            },
            {
              step: "3",
              title: "Întreabă Asistentul AI",
              body: "Ai întrebări? Asistentul AI îți explică detaliat fiecare pas, compară algoritmi și te ajută să înțelegi complexitatea.",
              icon: <CommentDiscussionIcon size={20} />,
            },
          ].map((item) => (
            <div key={item.step} className="card space-y-3 relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                {item.step}
              </div>
              <div className="inline-flex p-2 rounded-lg bg-sky-100 text-sky-700 mt-2">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="card bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Stack Tehnologic</h2>
          <p className="text-sm text-slate-600">Construit cu tehnologii moderne pentru performanță maximă</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { name: "Next.js 15", desc: "App Router" },
            { name: "FastAPI", desc: "Python Backend" },
            { name: "GitHub Models", desc: "AI Chat" },
            { name: "Tailwind CSS", desc: "Styling" },
          ].map((tech) => (
            <div key={tech.name} className="space-y-1">
              <div className="text-sm font-semibold text-slate-900">{tech.name}</div>
              <div className="text-xs text-slate-600">{tech.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
