import Link from "next/link";
import { allAlgorithms } from "@/lib/algorithms";
import P5HeroBackground from "./components/P5HeroBackground";
import LandingAlgorithmShowcaseNoSSR from "./components/LandingAlgorithmShowcaseNoSSR";

const CATEGORY_DETAILS: Record<string, string> = {
  sortare: "Algoritmi de ordonare pentru performanta pe seturi mici si mari de date.",
  cautare: "Metode eficiente pentru identificare rapida in colectii ordonate sau neordonate.",
  grafuri: "Parcurgeri, drumuri minime, flux maxim si probleme clasice pe retele.",
  matematica: "Operatii numerice, factorizari si functii de baza folosite in multiple domenii.",
  "programare-dinamica": "Strategii de optimizare bazate pe subprobleme si memoizare.",
  backtracking: "Explorare controlata a spatiului de solutii pentru probleme combinatoriale.",
  "structuri-de-date": "Stive, cozi, arbori si structuri avansate pentru modelarea datelor.",
  "manipulare-biti": "Tehnici rapide cu operatii pe biti pentru calcule eficiente.",
  cifru: "Algoritmi introductivi de criptare si transformari bitwise.",
  cifrare: "Algoritmi introductivi de criptare si transformari bitwise.",
  diverse: "Probleme utile in practica: validari, parsare si utilitare generale.",
};

const CATEGORY_COLORS = [
  "from-sky-500/20 to-cyan-500/20 border-sky-400/40 text-sky-100",
  "from-emerald-500/20 to-lime-500/20 border-emerald-400/40 text-emerald-100",
  "from-rose-500/20 to-orange-500/20 border-rose-400/40 text-rose-100",
  "from-fuchsia-500/20 to-violet-500/20 border-fuchsia-400/40 text-fuchsia-100",
  "from-amber-500/20 to-yellow-500/20 border-amber-400/40 text-amber-100",
  "from-indigo-500/20 to-blue-500/20 border-indigo-400/40 text-indigo-100",
];

function categoryKey(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function IconProject({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 16l8-12 8 12-8 4-8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconCpu({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h2m14 0h2M3 15h2m14 0h2M9 3v2m0 14v2M15 3v2m0 14v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconGraph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7l8 0.5M7 8l2 8M12 17l4-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconComment({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconBulb({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M8 14a6 6 0 1 1 8 0c-1 0.8-1.5 1.7-1.5 3H9.5c0-1.3-.5-2.2-1.5-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconRocket({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M14 4c3 0 6 3 6 6-2 2-4 3-6 3l-3 3-2-2 3-3c0-2 1-4 3-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" />
      <path d="M7 17l-2 3 3-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const totalAlgoritmi = allAlgorithms.length;
  const categories = Array.from(new Set(allAlgorithms.map((algo) => algo.category)))
    .map((category) => ({
      category,
      count: allAlgorithms.filter((algo) => algo.category === category).length,
    }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, "ro"));

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <img src="/favicon.svg" alt="Logo proiect" className="h-7 w-7" />
            </div>
            <span className="hidden text-sm font-semibold text-slate-700 sm:inline">Laborator Algoritmi</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition-colors hover:text-indigo-600">Funcționalități</a>
            <a href="#algoritmi" className="transition-colors hover:text-indigo-600">Catalog</a>
            <a href="#about" className="transition-colors hover:text-indigo-600">Despre</a>
          </div>
          <Link
            href="/algoritmi"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Începe acum
          </Link>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <P5HeroBackground />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-600">
                Proiect de licență 2026 • Platformă Educatională
              </div>
              <h1 className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Laborator virtual bazat pe <span className="text-indigo-600">inteligență artificială</span> pentru simularea algoritmilor matematici
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Lucrare de licență orientată spre învățare interactivă, unde algoritmii sunt explicați vizual,
                pas cu pas, cu suport inteligent pentru înțelegerea conceptelor matematice.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/algoritmi"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-700"
                >
                  Explorează {totalAlgoritmi} algoritmi
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  Vezi detalii
                </a>
              </div>
            </div>

            <div className="group relative mx-auto mt-20 aspect-video max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                <LandingAlgorithmShowcaseNoSSR />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-slate-50/50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">Beneficii</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Tot ce ai nevoie pentru a stăpâni algoritmii
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Vizualizare Step-by-Step",
                  description: "Vezi in timp real fiecare decizie a algoritmului: comparatii, actualizari de stare si rezultate intermediare.",
                  icon: <IconCpu className="h-6 w-6" />,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Asistență AI Integrată",
                  description: "Pentru orice pas neclar, asistentul AI ofera explicatii contextuale in limba romana, direct langa simulare.",
                  icon: <img src="/githubcopilot.svg" alt="Copilot" className="h-6 w-6 object-contain" />,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  title: "Descriere Clară pentru Fiecare Algoritm",
                  description: "Fiecare algoritm are descrierea sa: explicatie pe inteles, context de utilizare si observatii practice.",
                  icon: <IconComment className="h-6 w-6" />,
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  title: "Categorii Diverse",
                  description: "Parcurgi un catalog complet: sortari, cautari, grafuri, programare dinamica, backtracking si multe altele.",
                  icon: <IconGraph className="h-6 w-6" />,
                  color: "bg-amber-100 text-amber-600",
                },
                {
                  title: "Interfață Intuitivă",
                  description: "Interfata curata si focusata pe invatare, cu accent pe claritate, contrast bun si ritm vizual usor de urmarit.",
                  icon: <IconBulb className="h-6 w-6" />,
                  color: "bg-rose-100 text-rose-600",
                },
                {
                  title: "Căutare Rapidă",
                  description: "Filtrezi instant algoritmii doriti dupa nume si categorie, fara sa pierzi contextul paginii curente.",
                  icon: <IconSearch className="h-6 w-6" />,
                  color: "bg-cyan-100 text-cyan-600",
                },
                {
                  title: "Documentatie Unificata",
                  description: "Fiecare pagina combina explicatie teoretica, cod sursa si simulare interactiva in acelasi flux de invatare.",
                  icon: <IconProject className="h-6 w-6" />,
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  title: "Exemple Pregatite",
                  description: "Seturile de date predefinite accelereaza invatarea, iar parametrii se pot ajusta pentru scenarii proprii.",
                  icon: <IconRocket className="h-6 w-6" />,
                  color: "bg-lime-100 text-lime-700",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section 1 */}
        <section className="py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                          Arhitectura scalabila, orientata pe invatare
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                          Platforma foloseste o arhitectura modulara in care fiecare algoritm are metadata, cod sursa,
                          runner instrumentat si vizualizare proprie. Rezultatul este un flux coerent: explicatie, executie,
                          analiza de complexitate si observabilitate pas cu pas.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {[
                            "Next.js 16 (App Router) pentru randare rapida si rutare clara",
                            "TypeScript + tipuri comune pentru algoritmi, trace-uri si inputuri",
                            "Componente React reutilizabile pentru animatii, formule si panouri vizuale",
                            "Tailwind CSS pentru design consistent si responsive",
                            "p5.js pentru fundal interactiv in Hero",
                            "KaTeX + React Markdown pentru redare corecta a formulelor si documentatiei"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-indigo-50/50 blur-2xl" />
                      <div className="relative aspect-square sm:aspect-video rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                        <div className="h-full w-full bg-slate-950 text-slate-100 p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-auto">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <span className="ml-2 text-slate-400">lib/algorithms/matematica/factorial.ts</span>
                          </div>
                          <pre className="whitespace-pre-wrap">
                            <span className="text-slate-400">/**</span>{"\n"}
                            <span className="text-slate-400"> * @function factorial</span>{"\n"}
                            <span className="text-slate-400"> * @description Calculeaza factorialul unui numar natural.</span>{"\n"}
                            <span className="text-slate-400"> */</span>{"\n"}
                            <span className="text-fuchsia-300">export</span> <span className="text-fuchsia-300">const</span> <span className="text-cyan-300">factorial</span> <span className="text-slate-100">= (num: number): number =&gt; {'{'}</span>{"\n"}
                            <span className="text-fuchsia-300">  if</span> <span className="text-slate-100">(num &lt; 0 || !Number.isInteger(num)) {'{'}</span>{"\n"}
                            <span className="text-fuchsia-300">    throw</span> <span className="text-fuchsia-300">new</span> <span className="text-cyan-300">Error</span><span className="text-slate-100">(</span><span className="text-amber-300">'only natural numbers are supported'</span><span className="text-slate-100">)</span>{"\n"}
                            <span className="text-slate-100">  {'}'}</span>{"\n\n"}
                            <span className="text-fuchsia-300">  return</span> <span className="text-slate-100">num === 0 ? 1 : num * factorial(num - 1)</span>{"\n"}
                            <span className="text-slate-100">{'}'}</span>
                          </pre>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Catalog Preview */}
        <section id="algoritmi" className="py-24 bg-slate-900 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl">Catalogul de algoritmi</h2>
                <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                    Exploreaza toate categoriile disponibile, fiecare cu rol clar in invatarea algoritmilor.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((entry, idx) => {
                      const key = categoryKey(entry.category);
                      const count = entry.count;
                      const description = CATEGORY_DETAILS[key] ?? "Colectie de algoritmi explicati vizual, cu exemple si scenarii de rulare.";
                      const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];

                      return (
                        <Link
                          key={entry.category}
                          href={`/algoritmi?categorie=${encodeURIComponent(entry.category)}`}
                          className={`group rounded-2xl border bg-gradient-to-br p-6 text-left transition-all hover:-translate-y-1 hover:shadow-xl ${color}`}
                        >
                          <div className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-white/90">
                            {count} {count === 1 ? "algoritm" : "algoritmi"}
                          </div>
                          <h3 className="text-xl font-black text-white">{entry.category}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-white/80">{description}</p>
                        </Link>
                      );
                    })}
                </div>
                <div className="mt-12">
                    <Link href="/algoritmi" className="text-indigo-400 font-bold hover:text-indigo-300 inline-flex items-center gap-2">
                      Vezi tot catalogul <IconRocket className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>

        {/* About Team */}
        <section id="about" className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Despre proiect</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Oamenii din spatele proiectului
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              <article className="mx-auto flex w-full max-w-xl gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 sm:h-36 sm:w-36">
                  <img
                    src="/images/team/covali-chiril.jpg"
                    alt="Covali Chiril"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Student</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">CHIRIL COVALI</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">Grupa I-LA231F</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Student pasionat de informatică și inteligență artificială, concentrat pe dezvoltarea unui laborator
                    virtual pentru învățare practică și intuitivă.
                  </p>
                </div>
              </article>

              <article className="mx-auto flex w-full max-w-xl gap-4 rounded-3xl border border-indigo-200 bg-white p-4 shadow-sm">
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/40 sm:h-36 sm:w-36">
                  <img
                    src="/images/team/ala-gasnas.jpg"
                    alt="Ala Gasnas"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Coordonator academic</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">ALA GASNAȘ</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">Doctor conferențiar universitar</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Coordonează academic lucrarea și oferă direcție metodologică pentru claritatea și rigoarea
                    conținutului tehnic.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        {/* CTA */}
        <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-indigo-600 px-8 py-12 text-center text-white shadow-2xl shadow-indigo-200 sm:px-16 sm:py-20">
                    <h2 className="text-3xl font-extrabold sm:text-5xl">Gata să începi explorarea?</h2>
                    <p className="mt-6 text-lg text-indigo-100">
                        Accesează acum platforma și descoperă frumusețea algoritmilor vizualizați.
                    </p>
                    <div className="mt-10">
                        <Link 
                            href="/algoritmi" 
                            className="rounded-full bg-white px-10 py-4 text-lg font-bold text-indigo-600 shadow-lg transition-all hover:bg-slate-50 hover:scale-105"
                        >
                            Deschide Laboratorul
                        </Link>
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white">
                      <img src="/favicon.svg" alt="Logo proiect" className="h-5 w-5" />
                    </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Un proiect academic dedicat facilitării procesului de învățare a informaticii prin tehnologie web modernă.
                </p>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 mb-6">Tehnologii</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js 16",
                    "React 19",
                    "TypeScript",
                    "Tailwind CSS",
                    "p5.js",
                    "KaTeX",
                    "React Markdown",
                    "Remark Math",
                    "Rehype KaTeX",
                    "Turbopack"
                  ].map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
