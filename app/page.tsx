import Link from "next/link";
import { allAlgorithms } from "@/lib/algorithms";
import P5HeroBackground from "./components/P5HeroBackground";
import ComplexityFormula from "./components/ComplexityFormula";

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

function IconCode({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <img src="/favicon.svg" alt="Logo proiect" className="h-7 w-7" />
            </div>
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
              <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-6">
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
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-1"
                >
                  Explorează {totalAlgoritmi} algoritmi
                </Link>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  Vezi detalii
                </a>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl overflow-hidden aspect-video group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
                <div className="h-full w-full rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                              <IconRocket className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Interfață Vizuală Modernă</h3>
                        <p className="text-slate-500 mt-2">Loc pentru preview video sau imagine din aplicație</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32 bg-slate-50/50">
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
                  description: "Urmărește fiecare schimbare în date, de la comparații la interschimbări, în timp real.",
                  icon: <IconCpu className="h-6 w-6" />,
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  title: "Asistență IA Integrată",
                  description: "Nu înțelegi un pas? Întreabă asistentul virtual pentru o explicație clară în limba română.",
                  icon: <IconComment className="h-6 w-6" />,
                  color: "bg-purple-100 text-purple-600"
                },
                {
                  title: "Complexitate Analizată",
                  description: (
                    <>
                      Fiecare algoritm vine cu detalii despre performanță: <ComplexityFormula value="O(n)" className="text-slate-700" />,{" "}
                      <ComplexityFormula value="O(log n)" className="text-slate-700" /> și cazurile de utilizare.
                    </>
                  ),
                  icon: <IconCode className="h-6 w-6" />,
                  color: "bg-emerald-100 text-emerald-600"
                },
                {
                    title: "Categorii Diverse",
                    description: "De la sortări clasice la algoritmi pe grafuri și căutări avansate.",
                    icon: <IconGraph className="h-6 w-6" />,
                    color: "bg-amber-100 text-amber-600"
                },
                {
                    title: "Interfață Intuitivă",
                    description: "Design minimalist care pune accentul pe conținutul educațional și lizibilitate.",
                    icon: <IconBulb className="h-6 w-6" />,
                    color: "bg-rose-100 text-rose-600"
                },
                {
                    title: "Căutare Rapidă",
                    description: "Găsește instantaneu algoritmul de care ai nevoie prin sistemul de indexare.",
                    icon: <IconSearch className="h-6 w-6" />,
                    color: "bg-cyan-100 text-cyan-600"
                }
              ].map((feature, idx) => (
                <div key={idx} className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
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
                            Arhitectură Modulară și Modernă
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            Proiectul este structurat pentru a fi ușor de extins. Algoritmii sunt organizați pe categorii, 
                            fiecare având propriul său sistem de vizualizare și logică de execuție.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {[
                                "Cod TypeScript tipizat pentru siguranță",
                                "Componente React reutilizabile",
                                "Stilizare precisă cu Tailwind CSS",
                                "Animații fluide cu p5.js"
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
                        <div className="relative aspect-square sm:aspect-video rounded-3xl border border-slate-200 bg-white shadow-xl flex items-center justify-center overflow-hidden">
                            <div className="text-center p-8">
                                <IconCode className="mx-auto mb-4 h-12 w-12 text-slate-200" />
                                <p className="text-slate-400 font-mono text-sm">PLACEHOLDER: CODE SNIPPET VISUAL</p>
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
                    Alege dintr-o varietate de algoritmi fundamentali și începe simularea lor interactivă.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {allAlgorithms.slice(0, 4).map((algo) => (
                        <Link 
                            key={algo.slug} 
                            href={`/algoritmi/${algo.slug}`}
                            className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500 transition-all"
                        >
                            <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">{algo.name}</h3>
                            <p className="mt-2 text-sm text-slate-500">{algo.category}</p>
                        </Link>
                    ))}
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
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Despre proiect</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Covali Chiril
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Student pasionat de informatică și inteligență artificială, concentrat pe dezvoltarea unui laborator
                  virtual care transformă teoria algoritmilor matematici într-o experiență practică și intuitivă.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-500">
                  Această platformă face parte din lucrarea de teză și are ca scop facilitarea învățării prin
                  simulări interactive, explicații clare și un flux modern de explorare a algoritmilor.
                </p>
                <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Conducător de practică</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">Nume Conducător Practică</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Numele poate fi actualizat aici cu varianta finală.
                  </p>
                </div>
              </div>
              <div className="mx-auto w-full max-w-md">
                <div className="grid gap-6">
                  <div className="aspect-[4/5] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 shadow-sm">
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
                          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p className="text-base font-semibold text-slate-700">Loc pentru fotografia autorului</p>
                      <p className="mt-2 px-6 text-sm text-slate-500">
                        Poza ta poate fi adăugată ulterior aici.
                      </p>
                    </div>
                  </div>

                  <div className="aspect-[4/5] rounded-3xl border-2 border-dashed border-indigo-300 bg-indigo-50/60 p-6 shadow-sm">
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
                          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p className="text-base font-semibold text-slate-700">Loc pentru fotografia conducătorului</p>
                      <p className="mt-2 px-6 text-sm text-slate-500">
                        Imaginea conducătorului de practică poate fi adăugată aici.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
          <div className="grid gap-12 lg:grid-cols-3">
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
                <h4 className="font-bold text-slate-900 mb-6">Resurse</h4>
                <ul className="space-y-4 text-sm text-slate-600">
                    <li><Link href="/algoritmi" className="hover:text-indigo-600">Catalog Algoritmi</Link></li>
                    <li><a href="#" className="hover:text-indigo-600">Documentație Tehnica</a></li>
                    <li><a href="#" className="hover:text-indigo-600">Ghid Utilizare</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 mb-6">Tehnologii</h4>
                <div className="flex flex-wrap gap-2">
                    {["Next.js", "TypeScript", "Tailwind", "p5.js", "OpenAI"].map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
          </div>
          <div className="mt-16 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
            © 2026 Proiect de Teză. Toate drepturile rezervate.
          </div>
        </div>
      </footer>
    </div>
  );
}
