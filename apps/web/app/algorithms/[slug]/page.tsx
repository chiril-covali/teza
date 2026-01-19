"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { ArrayVisualizer } from "@components/array-visualizer";
import { GraphVisualizer } from "@components/graph-visualizer";
import {
  CommentDiscussionIcon,
  PlayIcon,
  StopIcon,
  SkipIcon, // Still useful maybe
  ChecklistIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SyncIcon,
} from "@primer/octicons-react";
import { api } from "@lib/api";
import { AlgorithmMeta } from "@lib/algorithm-meta";
import { TraceEvent } from "@lib/trace";

export default function AlgorithmPlayerPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [meta, setMeta] = useState<AlgorithmMeta | null>(null);
  const [inputText, setInputText] = useState(" ");
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [result, setResult] = useState<Record<string, unknown>>({});
  const [isReady, setIsReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [explanation, setExplanation] = useState("Rulează pentru a vedea explicațiile pas cu pas.");
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsReady(false);

    api
      .listAlgorithms()
      .then(async (list) => {
        if (!mounted) return;
        const found = list.find((item) => item.slug === slug) || null;
        setMeta(found);
        if (found) {
          if (found.visualization.kind === "array") {
            const defaultArray = Array.isArray((found.defaultInput as any).array)
              ? ((found.defaultInput as any).array as number[])
              : [];
            setInputText(defaultArray.join(", "));
          } else {
            setInputText(JSON.stringify(found.defaultInput, null, 2));
          }

          try {
            const runRes = await api.run(slug, found.defaultInput);
            if (mounted) {
              setTrace(runRes.trace);
              setResult(runRes.result);
              setCurrentIndex(0);
              setError(null);
              setTimeout(() => {
                if (mounted) setIsReady(true);
              }, 300);
            }
          } catch (e: any) {
            if (mounted) setIsReady(true);
            // Don't show error immediately on auto-run if strictly valid default
          }
        } else {
          if (mounted) setIsReady(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Nu s-au putut încărca algoritmii");
        if (mounted) setIsReady(true);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const parsedInput = useMemo(() => {
    if (!meta) return null;
    if (meta.visualization.kind === "array") {
      const numbers = inputText
        .split(/[\s,]+/)
        .map((n) => n.trim())
        .filter(Boolean)
        .map((n) => Number(n))
        .filter((n) => Number.isFinite(n));
      return { array: numbers } as Record<string, unknown>;
    }
    try {
      return JSON.parse(inputText) as Record<string, unknown>;
    } catch (err) {
      return null;
    }
  }, [inputText, meta]);

  async function handleRun() {
    if (!meta) {
      setError("Metadate lipsă pentru algoritm");
      return;
    }
    if (!parsedInput) {
      setError(meta.visualization.kind === "graph" ? "JSON invalid pentru graf" : "Completează un input valid");
      return;
    }
    try {
      const response = await api.run(slug, parsedInput);
      setTrace(response.trace);
      setResult(response.result);
      setCurrentIndex(0);
      setPlaying(true);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Execuția a eșuat");
      setPlaying(false);
    }
  }

  useEffect(() => {
    if (!playing) return;
    if (!trace.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((idx) => {
        const next = Math.min(idx + 1, trace.length - 1);
        if (next === idx) {
          setPlaying(false);
        }
        return next;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [playing, speed, trace.length]);

  useEffect(() => {
    if (!trace.length) {
      setExplanation("Rulează pentru a vedea explicațiile pas cu pas.");
      return;
    }
    const event = trace[currentIndex];
    api
      .explainStep(slug, currentIndex, event, { input: parsedInput || {} })
      .then((res) => setExplanation(res.answer))
      .catch(() => setExplanation("Explicație indisponibilă."));
  }, [trace, currentIndex, slug, parsedInput]);

  const currentEvent = trace[currentIndex];

  const currentArray = useMemo(() => {
    if (meta?.visualization.kind !== "array") return [] as number[];
    const initial = (parsedInput as any)?.array as number[] | undefined;
    let snapshot = Array.isArray(initial) ? [...initial] : [];
    for (let i = 0; i <= currentIndex && i < trace.length; i += 1) {
      const event = trace[i];
      if (event.type === "swap" || event.type === "set") {
        snapshot = [...event.array];
      }
    }
    return snapshot;
  }, [meta?.visualization.kind, parsedInput, trace, currentIndex]);

  const distances = useMemo(() => {
    const dist: Record<string, number> = {};
    for (let i = 0; i <= currentIndex && i < trace.length; i += 1) {
      const event = trace[i];
      if (event.type === "update_distance") {
        dist[event.node] = event.distance;
      }
    }
    return dist;
  }, [trace, currentIndex]);

  async function handleChat() {
    if (!meta || !parsedInput || !chatQuestion.trim()) return;
    setLoadingChat(true);
    try {
      const res = await api.chat(slug, chatQuestion, {
        input: parsedInput,
        currentStepIndex: currentIndex,
        currentEvent,
      });
      setChatAnswer(res.answer);
    } catch (err: any) {
      setChatAnswer(err?.message || "Chat indisponibil");
    } finally {
      setLoadingChat(false);
    }
  }

  function handleReset() {
    setPlaying(false);
    setCurrentIndex(0);
  }

  function handleStep() {
    if (!trace.length) return;
    setCurrentIndex((idx) => Math.min(idx + 1, trace.length - 1));
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <ArrowLeftIcon size={14} />
        <Link href="/algorithms" className="hover:text-white">Înapoi la catalog</Link>
      </div>
      {meta ? (
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{meta.category}</p>
              <h1 className="text-2xl font-semibold text-white">{meta.name}</h1>
              <p className="text-sm text-slate-300">{meta.summary}</p>
            </div>
            <div className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">{meta.difficulty}</div>
          </div>
          <div className="text-xs text-slate-400">
            Cel mai bun {meta.timeComplexity.best} · Medie {meta.timeComplexity.average} · Cel mai rău {meta.timeComplexity.worst} · Spațiu {meta.spaceComplexity}
          </div>
        </div>
      ) : (
        <div className="card text-sm text-slate-300">Se încarcă metadatele...</div>
      )}

      <div
        className={`grid gap-4 lg:grid-cols-[280px_1fr_320px] transition-all duration-700 ${
          isReady ? "opacity-100 blur-0" : "opacity-30 blur-sm pointer-events-none"
        }`}
      >
        <div className="card space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">Input</div>
            <div className="text-xs text-slate-400">{meta?.visualization.kind ?? ""}</div>
          </div>
          {meta?.visualization.kind === "array" ? (
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: 5, 1, 4, 2, 8"
            />
          ) : (
            <textarea
              className="h-48 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="JSON pentru graf (noduri, muchii, start)"
            />
          )}
          <div className="flex justify-end">
            <button
              onClick={handleRun}
              className="text-xs text-sky-400 hover:text-sky-300 underline"
            >
              Actualizează datele
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 py-4 rounded-xl bg-slate-800/50">
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-700 rounded-full"
              title="De la început"
            >
              <SyncIcon size={16} />
            </button>
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="p-2 text-slate-300 hover:text-white transition-colors hover:bg-slate-700 rounded-full"
              title="Înapoi"
            >
              <ArrowLeftIcon size={24} />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all shadow-lg ${
                playing
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-sky-500 text-white hover:bg-sky-400"
              }`}
              title={playing ? "Pauză" : "Start"}
            >
              {playing ? <StopIcon size={24} /> : <PlayIcon size={24} />}
            </button>
            <button
              onClick={() => handleStep()}
              className="p-2 text-slate-300 hover:text-white transition-colors hover:bg-slate-700 rounded-full"
              title="Înainte"
            >
              <ArrowRightIcon size={24} />
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-300">
            Viteză
            <input
              type="range"
              min={200}
              max={1500}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="flex-1"
            />
          </label>
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <ChecklistIcon size={14} />
            Sugestie: folosește controalele player-ului pentru a naviga prin algoritm pas cu pas.
          </div>
          {error && <div className="text-xs text-amber-300">{error}</div>}
          <div className="text-xs text-slate-400 break-words">Rezultat: {JSON.stringify(result)}</div>
        </div>

        <div className="space-y-3">
          <div className="card">
            {meta?.visualization.kind === "array" ? (
              <ArrayVisualizer array={currentArray} event={currentEvent} />
            ) : (
              <GraphVisualizer
                nodes={((parsedInput as any)?.nodes as string[]) || []}
                edges={((parsedInput as any)?.edges as { from: string; to: string; weight?: number }[]) || []}
                event={currentEvent}
                distances={distances}
              />
            )}
          </div>
          <div className="card">
            <div className="text-sm font-semibold text-white">Explicația pasului</div>
            <div className="mt-2 text-sm text-slate-200">{explanation}</div>
          </div>
        </div>

        <div className="card space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <CommentDiscussionIcon />
            Întreabă AI
          </div>
          <textarea
            className="h-24 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            placeholder="Întreabă despre pasul curent sau algoritm"
            value={chatQuestion}
            onChange={(e) => setChatQuestion(e.target.value)}
          />
          <button
            onClick={handleChat}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            disabled={loadingChat}
          >
            {loadingChat ? "AI tastează..." : "Trimite"}
          </button>
          <div className="text-xs text-slate-400">Chatul apelează GitHub Models doar la trimitere.</div>
          {loadingChat && <div className="flex items-center gap-2 text-xs text-slate-400"><CommentDiscussionIcon /> AI scrie răspunsul...</div>}
          {chatAnswer && <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-slate-100">{chatAnswer}</div>}
        </div>
      </div>
    </main>
  );
}
