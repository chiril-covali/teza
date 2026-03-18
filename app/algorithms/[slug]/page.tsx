"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { AlgorithmMeta, TraceEvent } from "@/lib/algorithms";
import { PlayIcon, PauseIcon, ChevronRightIcon } from "@primer/octicons-react";

interface AlgorithmPlayerProps {
  meta: AlgorithmMeta;
}

export function AlgorithmPlayer({ meta }: AlgorithmPlayerProps) {
  const [input, setInput] = useState<Record<string, any>>({});
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [explanation, setExplanation] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [chat, setChat] = useState<Array<{ role: string; content: string }>>(
    []
  );
  const [tab, setTab] = useState<"viz" | "input" | "chat" | "code">("viz");

  // Default inputs based on algorithm type
  useEffect(() => {
    if (meta.slug.includes("sort") || meta.slug === "cautare_binara") {
      setInput({ array: [64, 34, 25, 12, 22, 11, 90] });
    } else {
      setInput({
        nodes: ["A", "B", "C", "D"],
        edges: [
          { from: "A", to: "B" },
          { from: "B", to: "C" },
          { from: "C", to: "D" },
        ],
        start: "A",
      });
    }
  }, [meta.slug]);

  // Run algorithm
  const handleRun = async () => {
    try {
      const result = await api.run(meta.slug, input);
      setTrace(result.trace);
      setCurrentStep(0);
      setPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-play
  useEffect(() => {
    if (!playing || currentStep >= trace.length) {
      setPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [playing, currentStep, trace.length, speed]);

  // Get explanation
  useEffect(() => {
    if (trace.length > 0 && currentStep < trace.length) {
      const event = trace[currentStep];
      api
        .explain(meta.slug, currentStep, event, { ...input, trace })
        .then((res) => setExplanation(res.answer))
        .catch(() => setExplanation("Nu am putut obține explicația"));
    }
  }, [currentStep, trace, meta.slug, input]);

  // Send chat
  const handleChat = async () => {
    if (!question.trim()) return;

    const newChat = [
      ...chat,
      { role: "user", content: question },
    ];
    setChat(newChat);
    setQuestion("");

    try {
      const result = await api.chat(meta.slug, question, {
        input,
        currentStepIndex: currentStep,
        currentEvent: trace[currentStep],
      });
      setChat([...newChat, { role: "assistant", content: result.answer }]);
    } catch (err) {
      console.error(err);
    }
  };

  const currentEvent = trace[currentStep];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {(["viz", "input", "chat", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              tab === t
                ? "border-sky-500 text-sky-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {t === "viz"
              ? "Vizualizare"
              : t === "input"
                ? "Input"
                : t === "chat"
                  ? "Chat"
                  : "Cod"}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "viz" && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="card p-4 space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setPlaying(!playing)}
                className="btn btn-secondary flex items-center gap-2"
              >
                {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                {playing ? "Pauză" : "Redare"}
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(currentStep + 1, trace.length - 1))}
                className="btn btn-secondary"
              >
                <ChevronRightIcon size={16} />
              </button>
              <button onClick={handleRun} className="btn btn-secondary">
                Restart
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Viteză: {speed}ms
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="text-sm">
              Pasul {currentStep + 1} din {trace.length}
            </div>
          </div>

          {/* Visualization */}
          <div className="card p-6">
            {currentEvent ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  <strong>Event:</strong> {currentEvent.type}
                </p>
                {currentEvent.note && (
                  <p className="text-sm text-slate-700">{currentEvent.note}</p>
                )}
                {currentEvent.vars && (
                  <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
                    {JSON.stringify(currentEvent.vars, null, 2)}
                  </pre>
                )}
                {explanation && (
                  <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded">
                    <p className="text-sm text-sky-900">{explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-600 py-8">
                <p>Apasă "Redare" pentru a porni vizualizarea</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "input" && (
        <div className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Input (JSON)
            </label>
            <textarea
              value={JSON.stringify(input, null, 2)}
              onChange={(e) => {
                try {
                  setInput(JSON.parse(e.target.value));
                } catch {}
              }}
              className="w-full font-mono text-sm p-3 border border-slate-300 rounded"
              rows={10}
            />
          </div>
          <button onClick={handleRun} className="button-primary w-full">
            Rulează
          </button>
        </div>
      )}

      {tab === "chat" && (
        <div className="card p-6 space-y-4">
          <div className="h-64 overflow-y-auto bg-slate-50 rounded p-4 space-y-3">
            {chat.length === 0 ? (
              <p className="text-sm text-slate-500">
                Pun întrebări despre algoritm...
              </p>
            ) : (
              chat.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded ${
                    msg.role === "user"
                      ? "bg-sky-100 text-right"
                      : "bg-emerald-100"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Întreabă despre algoritm..."
              className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
            />
            <button onClick={handleChat} className="btn btn-secondary">
              Trimite
            </button>
          </div>
        </div>
      )}

      {tab === "code" && (
        <div className="card p-6">
          <p className="text-sm text-slate-600">Cod disponibil curând</p>
        </div>
      )}
    </div>
  );
}

export default function AlgorithmPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [meta, setMeta] = useState<AlgorithmMeta | null>(null);

  useEffect(() => {
    api
      .listAlgorithms()
      .then((algos) => {
        const found = algos.find((a) => a.slug === slug);
        setMeta(found || null);
      })
      .catch(console.error);
  }, [slug]);

  if (!meta) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-600">Se încarcă...</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">{meta.name}</h1>
        <p className="text-slate-600">{meta.description}</p>
      </div>
      <AlgorithmPlayer meta={meta} />
    </main>
  );
}
