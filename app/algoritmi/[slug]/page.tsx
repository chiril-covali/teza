"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { AlgorithmMeta, TraceEvent, allAlgorithms } from "@/lib/algorithms";
import Link from "next/link";
import { 
  PlayIcon, 
  PauseIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  ProjectIcon,
  CodeIcon,
  CommentDiscussionIcon,
  GearIcon,
  EyeIcon
} from "@primer/octicons-react";

interface AlgorithmPlayerProps {
	meta: AlgorithmMeta;
}

function SortingVisualizer({ event, input, slug }: { event: TraceEvent; input: any; slug: string }) {
    const array = (event as any).array || input.array || [];
    const highlightIndices = (event as any).indices || [];
    const currentIndex = (event as any).index !== undefined ? [(event as any).index] : [];
    const vars = (event as any).vars || {};
    
    const lo = vars.lo !== undefined ? vars.lo : -1;
    const hi = vars.hi !== undefined ? vars.hi : -1;
    const mid = vars.mid !== undefined ? vars.mid : -1;

    const maxVal = Math.max(...array, 1);

    return (
        <div className="w-full flex items-end justify-center gap-1.5 h-[400px] px-2">
            {array.map((val: number, idx: number) => {
                let color = "bg-slate-200";
                let shadow = "";
                const isHighlighted = highlightIndices.includes(idx) || currentIndex.includes(idx) || idx === mid;
                const isInRange = lo !== -1 && hi !== -1 && idx >= lo && idx <= hi;

                if (isHighlighted) {
                    color = "bg-gradient-to-t from-indigo-600 to-indigo-400 ring-2 ring-indigo-500 ring-offset-2";
                    shadow = "shadow-[0_-4px_20px_rgba(79,70,229,0.4)]";
                } else if (isInRange) {
                    color = "bg-indigo-100";
                }

                return (
                    <div key={idx} className="flex flex-col items-center flex-1 max-w-[60px] relative group">
                        <div 
                            className={`w-full rounded-t-xl transition-all duration-500 ease-out ${color} ${shadow}`}
                            style={{ height: `${(val / maxVal) * 100}%` }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-md transition-opacity pointer-events-none font-bold">
                                {val}
                            </div>
                        </div>
                        <span className="mt-3 text-[11px] font-black text-slate-400 font-mono">{val}</span>
                        <div className="h-6 flex items-center justify-center">
                            {idx === mid && <span className="text-[9px] font-black text-indigo-700 uppercase tracking-tighter">mid</span>}
                            {idx === lo && idx !== mid && <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">lo</span>}
                            {idx === hi && idx !== mid && <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">hi</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Typewriter({ text, speed = 15, onStart }: { text: string; speed?: number; onStart?: () => void }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setDisplayedText("");
        setIsTyping(true);
        if (onStart) onStart();
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                setIsTyping(false);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed, onStart]);

    return (
        <div className="relative min-h-[4em]">
            <p className="text-lg leading-relaxed text-indigo-50 font-medium">
                {displayedText}
                {isTyping && <span className="inline-block w-1 h-5 ml-1 bg-white animate-pulse align-middle" />}
            </p>
        </div>
    );
}

function ThinkingAI() {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl w-fit">
            <span className="text-xs font-bold text-indigo-100 animate-pulse">AI-ul analizează pasul</span>
            <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full animate-bounce" />
            </div>
        </div>
    );
}

function AlgorithmPlayer({ meta }: AlgorithmPlayerProps) {
	const [input, setInput] = useState<Record<string, any>>({});
    const [rawInput, setRawInput] = useState<string>("");
	const [trace, setTrace] = useState<TraceEvent[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [delay, setDelay] = useState(800);
	const [explanation, setExplanation] = useState<string>("");
    const [isThinking, setIsThinking] = useState(false);
	const [question, setQuestion] = useState<string>("");
	const [chat, setChat] = useState<Array<{ role: string; content: string }>>(
		[]
	);
	const [tab, setTab] = useState<"viz" | "input" | "chat" | "code">("viz");

	useEffect(() => {
		if (meta.slug.includes("sort") || meta.slug.includes("binara") || meta.slug.includes("search")) {
            const defaultArray = [64, 34, 25, 12, 22, 11, 90];
			setInput({ array: defaultArray, target: 22 });
            setRawInput(defaultArray.join(", "));
		} else {
            const defaultData = {
				nodes: ["A", "B", "C", "D"],
				edges: [
					{ from: "A", to: "B" },
					{ from: "B", to: "C" },
					{ from: "C", to: "D" },
				],
				start: "A",
			};
			setInput(defaultData);
            setRawInput(JSON.stringify(defaultData, null, 2));
		}
	}, [meta.slug]);

	const handleRun = async () => {
		try {
            let finalInput = input;
            if (meta.slug.includes("sort") || meta.slug.includes("binara") || meta.slug.includes("search")) {
                const arr = rawInput.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                finalInput = { ...input, array: arr };
                setInput(finalInput);
            } else {
                try {
                    finalInput = JSON.parse(rawInput);
                    setInput(finalInput);
                } catch (e) { }
            }

			const result = await api.run(meta.slug, finalInput);
			setTrace(result.trace);
			setCurrentStep(0);
			setPlaying(true);
            setTab("viz");
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!playing || currentStep >= trace.length - 1) {
			setPlaying(false);
			return;
		}

		const timer = setTimeout(() => {
			setCurrentStep((prev) => prev + 1);
		}, delay);

		return () => clearTimeout(timer);
	}, [playing, currentStep, trace.length, delay]);

	useEffect(() => {
		if (trace.length > 0 && currentStep < trace.length) {
			const event = trace[currentStep];
            setIsThinking(true);
            if (event.note) {
                // Short artificial delay for "thinking" feel even with local notes
                setTimeout(() => {
                    setExplanation(event.note!);
                    setIsThinking(false);
                }, 400);
            } else {
                api
                    .explain(meta.slug, currentStep, event, { ...input, trace })
                    .then((res) => {
                        setExplanation(res.answer);
                        setIsThinking(false);
                    })
                    .catch(() => {
                        setExplanation("Nu am putut obține explicația");
                        setIsThinking(false);
                    });
            }
		}
	}, [currentStep, trace, meta.slug, input]);

	const handleChat = async () => {
		if (!question.trim()) return;
		const newChat = [...chat, { role: "user", content: question }];
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
    const isArrayAlgo = meta.slug.includes("sort") || meta.slug.includes("binara") || meta.slug.includes("search");

	return (
		<div className="space-y-8">
            {/* Top Navigation & Info Bar */}
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-6 overflow-hidden">
                <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                    {[
                        { id: "viz", label: "Vizualizare", icon: <EyeIcon /> },
                        { id: "input", label: "Date Intrare", icon: <GearIcon /> },
                        { id: "chat", label: "Asistent AI", icon: <CommentDiscussionIcon /> },
                        { id: "code", label: "Cod Sursă", icon: <CodeIcon /> }
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id as any)}
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                                tab === t.id
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-8 pr-4 sm:border-l border-slate-100 sm:pl-8">
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Complexitate</div>
                        <div className="text-sm font-bold text-indigo-600 font-mono">{meta.complexity}</div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {tab === "viz" && (
                    <div className="grid gap-6 lg:grid-cols-12">
                        {/* Player Controls & Main Viz */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setPlaying(!playing)}
                                        className={`h-12 w-12 flex items-center justify-center rounded-full transition-all ${
                                            playing ? "bg-amber-100 text-amber-600" : "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                                        }`}
                                    >
                                        {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                                    </button>
                                    <div className="flex bg-slate-50 p-1 rounded-full border border-slate-100">
                                        <button
                                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                            className="h-10 w-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <ChevronLeftIcon size={20} />
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep(Math.min(currentStep + 1, trace.length - 1))}
                                            className="h-10 w-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <ChevronRightIcon size={20} />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={handleRun} 
                                        className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
                                    >
                                        Restart
                                    </button>
                                </div>

                                <div className="flex-1 min-w-[150px] max-w-[200px]">
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
                                        <span>Lent</span>
                                        <span>Rapid</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100"
                                        max="4000"
                                        step="100"
                                        value={4100 - delay}
                                        onChange={(e) => setDelay(4100 - Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                </div>

                                <div className="text-right">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progres</div>
                                    <div className="text-lg font-black text-slate-900">
                                        {trace.length > 0 ? `${currentStep + 1} / ${trace.length}` : "0 / 0"}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[400px] sm:min-h-[500px] flex items-center justify-center relative overflow-hidden">
                                {currentEvent ? (
                                    <div className="w-full space-y-12 text-center">
                                        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em]">
                                            Pasul {currentStep + 1} • {currentEvent.type}
                                        </div>
                                        
                                        <div className="overflow-x-auto w-full pb-4 no-scrollbar">
                                            {isArrayAlgo ? (
                                                <SortingVisualizer event={currentEvent} input={input} slug={meta.slug} />
                                            ) : (
                                                <div className="py-20">
                                                    {currentEvent.note && (
                                                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 max-w-xl mx-auto leading-tight">
                                                            {currentEvent.note}
                                                        </h3>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-3">
                                            {currentEvent.vars && Object.entries(currentEvent.vars).map(([key, val]) => (
                                                <div key={key} className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-left min-w-[100px]">
                                                    <div className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider">{key}</div>
                                                    <div className="font-mono text-sm font-black text-slate-700">
                                                        {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-6">
                                        <div className="h-24 w-24 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                            <PlayIcon size={40} />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-slate-900 font-black text-xl">Gata de simulare</p>
                                            <p className="text-slate-400 font-medium">Configurează datele de intrare sau apasă Restart.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Explanations */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group min-h-[300px]">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <CommentDiscussionIcon size={120} />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <CommentDiscussionIcon />
                                        </div>
                                        <h4 className="font-black text-lg tracking-tight">Explicație pas</h4>
                                    </div>
                                    
                                    {isThinking ? (
                                        <ThinkingAI />
                                    ) : (
                                        <Typewriter text={explanation || "Apasă Restart pentru a începe analiza algoritmului pas cu pas."} />
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="font-black text-slate-900 mb-6 text-sm uppercase tracking-widest border-b border-slate-50 pb-4">Status Execuție</h4>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm font-bold">Stare</span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${playing ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"}`}>
                                            {playing ? "În Rulare" : "Pauză"}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-600 transition-all duration-500" 
                                            style={{ width: `${trace.length > 0 ? ((currentStep + 1) / trace.length) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "input" && (
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Configurare Date Intrare</h3>
                            <p className="text-slate-500 text-sm mb-6">
                                {isArrayAlgo 
                                    ? "Introdu numerele separate prin virgulă (ex: 5, 2, 9, 1)." 
                                    : "Modifică obiectul JSON de mai jos pentru a schimba datele de test."}
                            </p>
                            
                            {isArrayAlgo ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Elemente Tablou</label>
                                        <input
                                            type="text"
                                            value={rawInput}
                                            onChange={(e) => setRawInput(e.target.value)}
                                            className="w-full font-mono text-lg p-6 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                            placeholder="ex: 10, 5, 20, 15"
                                        />
                                    </div>
                                    
                                    {(meta.slug.includes("binara") || meta.slug.includes("search")) && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Valoare Căutată (Target)</label>
                                            <input
                                                type="number"
                                                value={input.target || ""}
                                                onChange={(e) => setInput({ ...input, target: parseInt(e.target.value) })}
                                                className="w-full font-mono text-lg p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                                placeholder="ex: 34"
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    value={rawInput}
                                    onChange={(e) => setRawInput(e.target.value)}
                                    className="w-full font-mono text-sm p-6 bg-slate-900 text-indigo-300 rounded-3xl border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    rows={12}
                                />
                            )}
                        </div>
                        <button 
                            onClick={handleRun} 
                            className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                            Aplică și Rulează
                        </button>
                    </div>
                )}

                {tab === "chat" && (
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[600px]">
                        <div className="flex-1 overflow-y-auto pr-4 space-y-4 mb-6">
                            {chat.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <CommentDiscussionIcon size={48} className="mb-4" />
                                    <p className="max-w-xs font-medium">Pune orice întrebare despre cum funcționează {meta.name} în acest moment.</p>
                                </div>
                            ) : (
                                chat.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`max-w-[80%] p-4 rounded-2xl ${
                                            msg.role === "user"
                                                ? "ml-auto bg-indigo-600 text-white shadow-md"
                                                : "bg-slate-50 text-slate-700 border border-slate-100"
                                        }`}
                                    >
                                        <p className="text-sm font-medium">{msg.content}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleChat()}
                                placeholder="Scrie întrebarea ta aici..."
                                className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            <button 
                                onClick={handleChat}
                                className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                )}

                {tab === "code" && (
                    <div className="p-4 sm:p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="h-3 w-3 rounded-full bg-amber-500" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                <span className="ml-4 text-xs font-bold text-slate-500 font-mono">implementation.ts</span>
                            </div>
                            <button 
                                onClick={() => navigator.clipboard.writeText(meta.source || "")}
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Copiază Codul
                            </button>
                        </div>
                        <pre className="font-mono text-sm text-indigo-300 overflow-x-auto p-4 bg-slate-950 rounded-2xl leading-relaxed no-scrollbar">
                            <code>{meta.source || "// Codul sursă nu este disponibil pentru acest algoritm."}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
	);
}

export default function AlgorithmPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [meta, setMeta] = useState<AlgorithmMeta | null>(null);

	useEffect(() => {
        const found = allAlgorithms.find((a) => a.slug === slug);
        setMeta(found || null);
	}, [slug]);

	if (!meta) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50">
            {/* Sub Navigation */}
			<nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
					<div className="flex items-center gap-4">
						<Link href="/algoritmi" className="group flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
							<ChevronLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
							<span className="text-sm font-medium">Catalog</span>
						</Link>
						<div className="h-4 w-px bg-slate-200" />
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
								<ProjectIcon size={16} />
							</div>
							<span className="text-base font-bold tracking-tight text-slate-900">{meta.name}</span>
						</div>
					</div>
				</div>
			</nav>

			<main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-4">
                        {meta.category}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">{meta.name}</h1>
                    <p className="text-lg text-slate-600 max-w-3xl leading-relaxed font-medium">
                        {meta.description || `Implementare TypeScript pentru algoritmul ${meta.name}. Poți vizualiza codul sursă și, pentru algoritmii suportați, poți rula o simulare interactivă.`}
                    </p>
                </div>

                <AlgorithmPlayer meta={meta} />
            </main>
		</div>
	);
}
