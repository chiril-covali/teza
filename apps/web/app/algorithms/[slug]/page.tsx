"use client";

import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { ArrayVisualizer } from "@components/array-visualizer";
import { GraphVisualizer } from "@components/graph-visualizer";
import { SuggestedQuestions } from "@components/suggested-questions";
import AlgorithmQuiz from "@components/algorithm-quiz";
import {
  CommentDiscussionIcon,
  PlayIcon,
  PauseIcon,
  ChecklistIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SyncIcon,
} from "@primer/octicons-react";
import { api } from "@lib/api";
import { AlgorithmMeta } from "@lib/algorithm-meta";
import { TraceEvent } from "@lib/trace";

export default function AlgorithmPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

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
  const [chatHistory, setChatHistory] = useState<{role: "user" | "ai", content: string}[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [speedPreset, setSpeedPreset] = useState<"turtle" | "hare" | "rocket">("hare");
  const [activeTab, setActiveTab] = useState<"intrare" | "vizualizare" | "discutie" | "test">("vizualizare");

  const userEditedRef = useRef(false);

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

  const handleRun = useCallback(async () => {
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
  }, [meta, parsedInput, slug]);

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

  useEffect(() => {
    if (!meta) return;
    if (!parsedInput) return;
    if (!userEditedRef.current) return;
    const timer = setTimeout(() => {
      handleRun();
    }, 500);
    return () => clearTimeout(timer);
  }, [parsedInput, meta, handleRun]);

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
    
    const userQuestion = chatQuestion.trim();
    setChatHistory(prev => [...prev, { role: "user", content: userQuestion }]);
    setChatQuestion("");
    setLoadingChat(true);
    
    try {
      const res = await api.chat(slug, userQuestion, {
        input: parsedInput,
        currentStepIndex: currentIndex,
        currentEvent,
      });
      setChatAnswer(res.answer);
      setChatHistory(prev => [...prev, { role: "ai", content: res.answer }]);
    } catch (err: any) {
      const errorMsg = err?.message || "Chat indisponibil";
      setChatAnswer(errorMsg);
      setChatHistory(prev => [...prev, { role: "ai", content: errorMsg }]);
    } finally {
      setLoadingChat(false);
    }
  }

  function handleSelectQuestion(question: string) {
    setChatQuestion(question);
    setActiveTab("chat");
  }
  
  function handleClearChat() {
    setChatHistory([]);
    setChatAnswer("");
    setChatQuestion("");
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
    <>
      {/* Header fix cu numele algoritmului */}
      {meta && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/algorithms" className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <ArrowLeftIcon size={18} className="text-slate-600" />
              </Link>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{meta.category}</div>
                <div className="text-sm font-bold text-slate-900">{meta.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Dificultate:</span>
              <span className="px-3 py-1 rounded-full bg-sky-100 text-xs text-sky-700 font-semibold">{meta.difficulty}</span>
            </div>
          </div>
        </div>
      )}
      
      <main className="space-y-6 pt-20">
        {meta ? (
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{meta.category}</p>
                <h1 className="text-2xl font-semibold text-slate-900">{meta.name}</h1>
                <p className="text-sm text-slate-700">{meta.summary}</p>
              </div>
              <div className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700 font-semibold">{meta.difficulty}</div>
            </div>
            <div className="text-xs text-slate-600">
              Cel mai bun {meta.timeComplexity.best} · Medie {meta.timeComplexity.average} · Cel mai rău {meta.timeComplexity.worst} · Spațiu {meta.spaceComplexity}
            </div>
          </div>
        ) : (
          <div className="card text-sm text-slate-600 mt-20">Se încarcă metadatele...</div>
        )}

      {/* Mobile tabs */}
      <div className="lg:hidden bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "vizualizare" ? "active" : ""}`}
            onClick={() => setActiveTab("vizualizare")}
          >
            Vizualizare
          </button>
          <button
            className={`tab ${activeTab === "intrare" ? "active" : ""}`}
            onClick={() => setActiveTab("intrare")}
          >
            Date de intrare
          </button>
          <button
            className={`tab ${activeTab === "discutie" ? "active" : ""}`}
            onClick={() => setActiveTab("discutie")}
          >
            Asistent AI
          </button>
          <button
            className={`tab ${activeTab === "test" ? "active" : ""}`}
            onClick={() => setActiveTab("test")}
          >
            Evaluare
          </button>
        </div>
      </div>

      <div
        className={`grid gap-4 lg:grid-cols-[280px_1fr_340px] transition-all duration-700 ${
          isReady ? "opacity-100 blur-0" : "opacity-30 blur-sm pointer-events-none"
        }`}
      >
        {/* Panel Date de Intrare */}
        <div className={`card space-y-3 ${activeTab !== "intrare" ? "hidden lg:block" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Date de intrare</div>
            <div className="text-xs text-slate-500">{meta?.visualization.kind ?? ""}</div>
          </div>
          {meta?.visualization.kind === "array" ? (
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              value={inputText}
              onChange={(e) => {
                userEditedRef.current = true;
                setInputText(e.target.value);
              }}
              placeholder="Ex: 5, 1, 4, 2, 8"
            />
          ) : (
            <textarea
              className="h-48 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              value={inputText}
              onChange={(e) => {
                userEditedRef.current = true;
                setInputText(e.target.value);
              }}
              placeholder="JSON pentru graf (noduri, muchii, start)"
            />
          )}

          <div className="hidden lg:flex items-center justify-center gap-4 py-4 rounded-xl bg-slate-50 border border-slate-200">
            <button
              onClick={handleReset}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors hover:bg-white rounded-full"
              title="De la început"
            >
              <SyncIcon size={16} />
            </button>
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-white rounded-full"
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
              {playing ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </button>
            <button
              onClick={() => handleStep()}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-white rounded-full"
              title="Înainte"
            >
              <ArrowRightIcon size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2 text-xs text-slate-700">
            <span>Viteză</span>
            <div className="flex gap-2">
              {[
                { key: "turtle" as const, label: "Lent", value: 1400 },
                { key: "hare" as const, label: "Normal", value: 800 },
                { key: "rocket" as const, label: "Rapid", value: 250 },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    setSpeedPreset(option.key);
                    setSpeed(option.value);
                  }}
                  className={`flex-1 rounded-lg border px-2 py-2 text-[11px] font-semibold transition-colors ${
                    speedPreset === option.key
                      ? "border-sky-400 bg-sky-100 text-sky-700"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <ChecklistIcon size={14} />
            Sugestie: folosește controalele player-ului pentru a naviga prin algoritm pas cu pas.
          </div>
          {error && <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{error}</div>}
          <div className="text-xs text-slate-500 break-words bg-slate-50 rounded-lg px-3 py-2">Rezultat: {JSON.stringify(result)}</div>
        </div>

        {/* Panel Vizualizare */}
        <div className={`space-y-3 ${activeTab !== "vizualizare" ? "hidden lg:block" : ""}`}>
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
            <div className="text-sm font-semibold text-slate-900 mb-2">Explicația pasului</div>
            <div className="text-sm text-slate-700 leading-relaxed">{explanation}</div>
            {trace.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                Pas {currentIndex + 1} din {trace.length}
              </div>
            )}
          </div>
          <div className="card space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Vizualizează cod</div>
              <button
                onClick={async () => {
                  setShowCode((v) => !v);
                  if (code || loadingCode) return;
                  setLoadingCode(true);
                  try {
                    const res = await api.code(slug);
                    setCode(res.code);
                    setCodeError(null);
                  } catch (e: any) {
                    setCodeError(e?.message || "Nu am putut încărca codul");
                  } finally {
                    setLoadingCode(false);
                  }
                }}
                className="text-xs text-sky-600 hover:text-sky-700 underline font-medium"
              >
                {showCode ? "Ascunde" : "Arată"}
              </button>
            </div>
            {loadingCode && <div className="text-xs text-slate-500">Încarc codul...</div>}
            {codeError && <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{codeError}</div>}
            {showCode && code && (
              <CodeBlock code={code} currentEvent={currentEvent} />
            )}
          </div>
        </div>

        {/* Panel Asistent AI + Evaluare (stiva pe desktop, tab-uri pe mobil) */}
        <div className="space-y-4">
          {/* Panel Asistent AI */}
          <div className={`card space-y-3 ${activeTab !== "discutie" ? "hidden lg:block" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <CommentDiscussionIcon />
              Întreabă Asistentul AI
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
              >
                Șterge conversație
              </button>
            )}
          </div>
          
          {meta && (
            <SuggestedQuestions
              meta={meta}
              currentStepIndex={currentIndex}
              hasTrace={trace.length > 0}
              onSelectQuestion={handleSelectQuestion}
            />
          )}
          
          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto rounded-lg bg-slate-50 p-3 border border-slate-200">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-sky-50 border border-sky-200 text-sky-900 ml-4"
                      : "bg-white border border-slate-200 text-slate-700 mr-4 shadow-sm"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-60">
                    {msg.role === "user" ? "Tu" : "Asistent AI"}
                  </div>
                  {msg.content}
                </div>
              ))}
              {loadingChat && (
                <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse px-3 py-2">
                  <CommentDiscussionIcon size={14} />
                  AI scrie răspunsul...
                </div>
              )}
            </div>
          )}
          
          <textarea
            className="h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 resize-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
            placeholder="Întreabă despre pasul curent sau algoritm..."
            value={chatQuestion}
            onChange={(e) => setChatQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleChat();
              }
            }}
          />
          <button
            onClick={handleChat}
            className="w-full rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
            disabled={loadingChat || !chatQuestion.trim()}
          >
            {loadingChat ? "AI tastează..." : "Trimite (Ctrl+Enter)"}
          </button>
        </div>

        {/* Panel Evaluare */}
        <div className={`${activeTab !== "test" ? "hidden lg:block" : ""}`}>
          {meta && <AlgorithmQuiz algorithmSlug={meta.slug} currentStep={currentIndex} />}
        </div>
      </div> {/* End of AI Chat + Quiz wrapper */}

      </div> {/* End of main grid */}

      {/* Mobile playback controls - fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 z-50 shadow-lg">
        <div className="flex items-center justify-center gap-3 max-w-6xl mx-auto">
          <button
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-slate-900 transition-colors active:scale-95"
            title="De la început"
          >
            <SyncIcon size={16} />
          </button>
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            className="p-2.5 text-slate-600 hover:text-slate-900 transition-colors active:scale-95"
            title="Înapoi"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-all shadow-lg active:scale-95 ${
              playing
                ? "bg-amber-500 text-white shadow-xl"
                : "bg-sky-500 text-white shadow-xl"
            }`}
            title={playing ? "Pauză" : "Start"}
          >
            {playing ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          </button>
          <button
            onClick={() => handleStep()}
            className="p-2.5 text-slate-600 hover:text-slate-900 transition-colors active:scale-95"
            title="Înainte"
          >
            <ArrowRightIcon size={20} />
          </button>
          <div className="flex-1 max-w-[120px]">
            <select
              value={speedPreset}
              onChange={(e) => {
                const preset = e.target.value as "turtle" | "hare" | "rocket";
                setSpeedPreset(preset);
                setSpeed(preset === "turtle" ? 1400 : preset === "hare" ? 800 : 250);
              }}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2 py-2 text-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="turtle">🐢 Lent</option>
              <option value="hare">🐇 Normal</option>
              <option value="rocket">🚀 Rapid</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Bottom padding for mobile playback bar */}
      <div className="lg:hidden h-20"></div>
    </main>
    </>
  );
}

function CodeBlock({ code, currentEvent }: { code: string; currentEvent?: TraceEvent }) {
  const highlighted = useMemo(() => {
    if (!code || !currentEvent) return new Set<number>();
    const lines = code.split("\n");
    const match = `"type": "${currentEvent.type}"`;
    const set = new Set<number>();
    lines.forEach((line, idx) => {
      if (line.includes(match)) set.add(idx + 1);
    });
    return set;
  }, [code, currentEvent]);

  return (
    <div className="space-y-3">
      {/* Variabile urmărite - afișare proeminentă */}
      {currentEvent?.vars && Object.keys(currentEvent.vars).length > 0 && (
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H4z"/>
              <path d="M6 8a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 8z"/>
            </svg>
            <div className="text-sm font-bold text-indigo-900">Variabile curente în execuție</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(currentEvent.vars).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-indigo-100 shadow-sm">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{k}</span>
                <span className="text-xs text-slate-600">=</span>
                <span className="text-sm text-slate-900 font-mono font-bold">{JSON.stringify(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Cod sursă cu evidențiere dinamică */}
      <div className="rounded-xl border-2 border-slate-200 bg-slate-900 text-xs shadow-lg overflow-hidden">
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-slate-400 text-xs font-mono ml-2">algo.py</span>
        </div>
        <pre className="overflow-auto p-4 max-h-96">
          <code className="language-python">
            {code.split("\n").map((line, idx) => {
              const isHighlighted = highlighted.has(idx + 1);
              return (
                <div
                  key={idx}
                  className={`flex gap-3 py-0.5 transition-all duration-300 ${
                    isHighlighted 
                      ? "bg-amber-500/20 border-l-4 border-amber-400 pl-2 -ml-2" 
                      : ""
                  }`}
                >
                  <span className={`w-10 text-right select-none ${
                    isHighlighted ? "text-amber-400 font-bold" : "text-slate-500"
                  }`}>{idx + 1}</span>
                  <span className={`whitespace-pre font-mono ${
                    isHighlighted ? "text-amber-50 font-semibold" : "text-slate-300"
                  }`}>{line}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
      
      {highlighted.size > 0 && (
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
          <span className="font-medium">Linia evidențiată corespunde operației curente din algoritm</span>
        </div>
      )}
    </div>
  );
}
