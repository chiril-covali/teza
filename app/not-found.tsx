import Link from "next/link";
import Pong404Canvas from "./components/Pong404Canvas";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-[-120px] h-[360px] w-[360px] rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -right-24 bottom-[-160px] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.12),transparent_36%)]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Eroare de rutare
            </p>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Pagina cautata nu exista.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Ai ajuns intr-o zona necunoscuta. Cat timp gasim drumul inapoi, poti juca un mini Pong cu botul din dreapta.
              Primul la 7 puncte castiga runda.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300"
              >
                Inapoi la pagina principala
              </Link>
              <Link
                href="/algoritmi"
                className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-6 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                Vezi algoritmii
              </Link>
            </div>
          </div>

          <div className="relative">
            <Pong404Canvas />
            <p className="mt-3 text-center text-xs uppercase tracking-[0.15em] text-slate-400">
              Paleta ta este in stanga. Misca mouse-ul sau atinge ecranul.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
