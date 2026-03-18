import Link from "next/link";
import { algorithmsMeta } from "@/lib/algorithms";
import P5HeroBackground from "./components/P5HeroBackground";

export default function HomePage() {
  const totalAlgoritmi = algorithmsMeta.length;
  const categorii = ["Sortare", "Căutare", "Grafuri"];

  return (
    <main className="space-y-12 pb-10 sm:space-y-16">
      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm">
        <div className="bg-slate-950 px-5 py-2 text-center text-xs font-medium tracking-wide text-slate-100">
          Actualizare proiect teză: landing nou, animație de fundal p5.js și vizualizare per algoritm.
        </div>

        <div className="relative px-6 py-8 sm:px-10 sm:py-12">
          <div className="absolute inset-0 opacity-75 pointer-events-none">
            <P5HeroBackground />
          </div>
          <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-teal-100/30 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-100/35 blur-3xl" />

          <div className="relative z-10 mb-10 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M4 16l8-12 8 12-8 4-8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              Teza Algoritmi Vizuali
            </div>
            <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
              <a href="#sectiuni" className="hover:text-slate-950">Secțiuni</a>
              <a href="#algoritmi" className="hover:text-slate-950">Algoritmi</a>
              <a href="#despre" className="hover:text-slate-950">Despre teză</a>
            </div>
            <Link href="/algoritmi" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              Deschide catalogul
            </Link>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              Stil inspirat de landing-urile moderne, adaptat conținutului academic
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Platformă pentru învățarea algoritmilor
              <span className="block text-indigo-600">prin vizualizare, simulare și explicații IA</span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Construit pentru lucrarea de teză: arhitectură clară, experiență elegantă și feedback în timp real.
              Ai acces la execuție pas cu pas, întrebări către asistent și reprezentare vizuală pentru fiecare algoritm.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/algoritmi" className="button-primary rounded-full px-8 py-3.5">
                Explorează algoritmi
              </Link>
              <a href="#despre" className="btn btn-secondary rounded-full px-8 py-3.5">
                Află mai mult
              </a>
            </div>

            <div id="algoritmi" className="mt-10">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-600">
                Câte un cerc pentru fiecare algoritm ({totalAlgoritmi})
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {algorithmsMeta.map((algorithm, index) => (
                  <div
                    key={algorithm.slug}
                    className="algorithm-dot"
                    style={{
                      animationDuration: `${12 + (index % 5) * 2}s`,
                      animationDelay: `${index * 0.35}s`,
                    }}
                  >
                    <span className="algorithm-dot-title">{algorithm.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sectiuni" className="grid gap-5 md:grid-cols-3">
        {[
          {
            titlu: "Execută și observă",
            text: "Rulezi algoritmii și urmărești fiecare transformare de date în secvență clară.",
          },
          {
            titlu: "Întreabă asistentul",
            text: "Primești explicații contextualizate în limba română, direct din pasul curent.",
          },
          {
            titlu: "Pregătit de prezentare",
            text: "Landing structurat pentru impact vizual și argumentare tehnică în cadrul tezei.",
          },
        ].map((feature) => (
          <article key={feature.titlu} className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">{feature.titlu}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="card p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Structură inspirată de Astrowind</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Landing-ul urmează aceeași filozofie: hero puternic, CTA clar, blocuri de beneficii,
              conținut lizibil și secțiuni care ghidează utilizatorul spre acțiunea principală.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categorii.map((cat) => (
              <div key={cat} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm font-semibold text-slate-800">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="despre" className="card border-amber-200/70 bg-white/90 p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <h4 className="text-base font-semibold text-slate-900">Titlu teză</h4>
            <p className="mt-1 text-sm text-slate-700">Vizualizarea algoritmilor și suport didactic asistat de IA.</p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">Tehnologii</h4>
            <p className="mt-1 text-sm text-slate-700">TypeScript, React, Next.js, Tailwind CSS, p5.js.</p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">Motivație</h4>
            <p className="mt-1 text-sm text-slate-700">Tipizare sigură, rutare rapidă și un fundal interactiv care susține componenta educațională.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
