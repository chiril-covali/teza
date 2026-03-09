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
  UnmuteIcon,
  MuteIcon,
  CodeIcon,
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
  const [chatHistory, setChatHistory] = useState<{role: "user" | "ai", content: string}[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
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
    playSound(event.type);
    api
      .explainStep(slug, currentIndex, event, { input: parsedInput || {} })
      .then((res) => setExplanation(res.answer))
      .catch(() => setExplanation("Explicație indisponibilă."));
  }, [trace, currentIndex, slug, parsedInput]); // eslint-disable-line react-hooks/exhaustive-deps

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
      setChatHistory(prev => [...prev, { role: "ai", content: res.answer }]);
    } catch (err: any) {
      const errorMsg = err?.message || "Chat indisponibil";
      setChatHistory(prev => [...prev, { role: "ai", content: errorMsg }]);
    } finally {
      setLoadingChat(false);
    }
  }

  function handleSelectQuestion(question: string) {
    setChatQuestion(question);
    setActiveTab("discutie");
  }
  
  function handleClearChat() {
    setChatHistory([]);
    setChatQuestion("");
  }

  function handleReset() {
    setPlaying(false);
    setCurrentIndex(0);
  }

  function playSound(eventType: string) {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const freqMap: Record<string, number> = {
        compare: 440,
        swap: 660,
        set: 550,
        visit_node: 480,
        queue: 520,
        update_distance: 600,
        done: 880,
      };
      osc.frequency.setValueAtTime(freqMap[eventType] || 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // AudioContext not supported
    }
  }

  function handleStep() {
    if (!trace.length) return;
    setCurrentIndex((idx) => Math.min(idx + 1, trace.length - 1));
  }

  return (
    <>
      <main className="space-y-4">
        {meta ? (
          <div className="card space-y-2">
            <div className="flex items-center gap-3">
              <Link href="/algorithms" className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
                <ArrowLeftIcon size={16} className="text-slate-600" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{meta.category}</p>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] text-sky-700 font-semibold">{meta.difficulty}</span>
                </div>
                <h1 className="text-xl font-semibold text-slate-900">{meta.name}</h1>
                <p className="text-xs text-slate-600">{meta.summary}</p>
              </div>
              <div className="hidden sm:block text-xs text-slate-500 text-right">
                <div>{meta.timeComplexity.best} · {meta.timeComplexity.average} · {meta.timeComplexity.worst}</div>
                <div>Spațiu {meta.spaceComplexity}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-sm text-slate-600">Se încarcă metadatele...</div>
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

      {/* Top row: Input + Visualization */}
      <div
        className={`grid gap-4 lg:grid-cols-[280px_1fr] transition-all duration-700 ${
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
            <button
              onClick={() => setSoundEnabled((s) => !s)}
              className={`p-2 rounded-full transition-colors hover:bg-white ${
                soundEnabled ? "text-sky-600" : "text-slate-400 hover:text-slate-700"
              }`}
              title={soundEnabled ? "Dezactivează sunet" : "Activează sunet"}
            >
              {soundEnabled ? <UnmuteIcon size={18} /> : <MuteIcon size={18} />}
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
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-900">Explicația pasului</div>
              <a
                href={`/algorithms/${slug}/code`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-medium"
              >
                <CodeIcon size={12} />
                Vizualizează cod
              </a>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">{explanation}</div>
            {/* Variabile curente */}
            {currentEvent?.vars && Object.keys(currentEvent.vars).length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="text-xs font-semibold text-indigo-700 mb-2">Variabile</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(currentEvent.vars).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1">
                      <span className="text-xs font-semibold text-indigo-600">{k}</span>
                      <span className="text-xs text-slate-500">=</span>
                      <span className="text-xs font-mono font-bold text-slate-900">{JSON.stringify(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {trace.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                Pas {currentIndex + 1} din {trace.length}
              </div>
            )}
          </div>
        </div>

      </div> {/* End of top grid */}

      {/* Bottom row: AI + Quiz */}
      <div
        className={`grid gap-4 lg:grid-cols-[1fr_340px] transition-all duration-700 ${
          isReady ? "opacity-100 blur-0" : "opacity-30 blur-sm pointer-events-none"
        }`}
      >
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
      </div> {/* End of bottom grid */}

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
          <button
            onClick={() => setSoundEnabled((s) => !s)}
            className={`p-2.5 transition-colors active:scale-95 rounded-full ${
              soundEnabled ? "text-sky-600 bg-sky-50" : "text-slate-500 hover:text-slate-900"
            }`}
            title={soundEnabled ? "Sunet activ" : "Activează sunet"}
          >
            {soundEnabled ? <UnmuteIcon size={18} /> : <MuteIcon size={18} />}
          </button>
          <div className="flex-1 max-w-[100px]">
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
