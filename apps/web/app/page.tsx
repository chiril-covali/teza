import { InfinityIcon, BeakerIcon, ChecklistIcon, GraphIcon, DeviceMobileIcon } from "@primer/octicons-react";

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="card grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Matematica Vizuală Asistată</p>
          <h1 className="text-4xl font-semibold leading-tight text-white">
            Învață algoritmi cu urme live și un AI care răspunde doar când îl întrebi.
          </h1>
          <p className="text-slate-200 max-w-xl">
            Rulează implementările Python local, vizualizează fiecare pas și cere clarificări prin endpoint-ul de chat GitHub Models doar la cerere.
          </p>
          <div className="flex gap-3">
            <a href="/algorithms" className="button-primary">
              <InfinityIcon size={16} /> Vezi algoritmii
            </a>
            <a
              href="/algorithms"
              className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-slate-500"
            >
              <ChecklistIcon size={16} /> Vezi playerul pas cu pas
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
          <div className="text-sm text-slate-300">Cuprins MVP</div>
          <ul className="mt-4 space-y-2 text-slate-100">
            <li className="flex items-center gap-2"><GraphIcon size={16} /> 5 algoritmi: sortare cu bule, sortare rapidă, căutare binară, parcurgere în lățime, algoritmul lui Dijkstra</li>
            <li className="flex items-center gap-2"><BeakerIcon size={16} /> Scheamă TraceEvent comună</li>
            <li className="flex items-center gap-2"><ChecklistIcon size={16} /> Explicații deterministe pe pași</li>
            <li className="flex items-center gap-2"><InfinityIcon size={16} /> Chat cu GitHub Models doar la cerere</li>
            <li className="flex items-center gap-2"><GraphIcon size={16} /> Limită free-tier GitHub afișată live</li>
          </ul>
        </div>
      </section>
      <section className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
          <ChecklistIcon size={16} />
          Pași explicați vizual
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
          <GraphIcon size={16} />
          Grafice și tabele animate
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
          <DeviceMobileIcon size={16} />
          Optimizat pentru mobil
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Executor Python",
            body: "FastAPI trimite către folderele whitelisted și emite urmele pentru UI.",
          },
          {
            title: "UI App Router",
            body: "Next.js + Tailwind construiesc catalogul și playerul cu vizualizări listă/graf.",
          },
          {
            title: "Întreabă tutorul",
            body: "Endpoint-ul de chat combină contextul din docs, metadate și pasul curent.",
          },
        ].map((item) => (
          <div key={item.title} className="card space-y-2">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-slate-200 text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
