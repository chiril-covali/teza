"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CopyIcon, CheckIcon } from "@primer/octicons-react";
import { api } from "@lib/api";
import { AlgorithmMeta } from "@lib/algorithm-meta";

// ─── Python tokenizer ───────────────────────────────────────────────────────

type TokenKind =
  | "keyword"
  | "builtin"
  | "string"
  | "comment"
  | "number"
  | "operator"
  | "decorator"
  | "funcname"
  | "classname"
  | "punctuation"
  | "plain";

interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  "def","class","return","if","elif","else","for","while","in","not","and","or",
  "True","False","None","pass","break","continue","import","from","as","try",
  "except","finally","with","lambda","yield","raise","del","is","global",
  "nonlocal","assert","async","await",
]);

const BUILTINS = new Set([
  "print","len","range","list","dict","set","tuple","str","int","float","bool",
  "type","isinstance","hasattr","getattr","setattr","enumerate","zip","map",
  "filter","sorted","reversed","sum","min","max","abs","round","open","input",
  "append","extend","pop","remove","get","items","keys","values","update",
  "format","join","split","strip","lower","upper","replace","find","index",
  "super","staticmethod","classmethod","property","object",
]);

// Ordered: longer/more-specific patterns first
const TOKEN_RE = new RegExp(
  [
    /(#.*)/.source,                                                     // comment
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|"""[\s\S]*?"""|'''[\s\S]*?''')/.source, // string
    /\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/.source,     // number
    /(@[\w.]+)/.source,                                                 // decorator
    /\b(def)\s+([a-zA-Z_]\w*)/.source,                                 // def funcname
    /\b(class)\s+([a-zA-Z_]\w*)/.source,                               // class classname
    /([+\-*/%=<>!&|^~:,;.]+)/.source,                                  // operators/punct
    /([(){}\[\]])/.source,                                              // brackets
    /\b([a-zA-Z_]\w*)\b/.source,                                        // identifier
  ].join("|"),
  "g"
);

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    if (match.index > lastIdx) {
      tokens.push({ kind: "plain", text: line.slice(lastIdx, match.index) });
    }

    const [full, comment, str, num, deco, defKw, funcName, classKw, className, op, bracket, ident] = match;

    if (comment)    tokens.push({ kind: "comment",   text: comment });
    else if (str)   tokens.push({ kind: "string",    text: str });
    else if (num)   tokens.push({ kind: "number",    text: num });
    else if (deco)  tokens.push({ kind: "decorator", text: deco });
    else if (defKw && funcName) {
      tokens.push({ kind: "keyword",   text: defKw });
      tokens.push({ kind: "plain",     text: full.slice(defKw.length, full.length - funcName.length) });
      tokens.push({ kind: "funcname",  text: funcName });
    } else if (classKw && className) {
      tokens.push({ kind: "keyword",   text: classKw });
      tokens.push({ kind: "plain",     text: full.slice(classKw.length, full.length - className.length) });
      tokens.push({ kind: "classname", text: className });
    } else if (op)      tokens.push({ kind: "operator",    text: op });
    else if (bracket)   tokens.push({ kind: "punctuation", text: bracket });
    else if (ident) {
      if (KEYWORDS.has(ident))       tokens.push({ kind: "keyword", text: ident });
      else if (BUILTINS.has(ident))  tokens.push({ kind: "builtin", text: ident });
      else                           tokens.push({ kind: "plain",   text: ident });
    } else {
      tokens.push({ kind: "plain", text: full });
    }

    lastIdx = match.index + full.length;
  }

  if (lastIdx < line.length) {
    tokens.push({ kind: "plain", text: line.slice(lastIdx) });
  }

  return tokens;
}

// ─── Token colour map ────────────────────────────────────────────────────────

const TOKEN_COLOR: Record<TokenKind, string> = {
  keyword:     "text-fuchsia-400 font-semibold",
  builtin:     "text-cyan-300",
  string:      "text-emerald-300",
  comment:     "text-slate-500 italic",
  number:      "text-amber-300",
  operator:    "text-sky-400",
  decorator:   "text-yellow-400",
  funcname:    "text-blue-300 font-semibold",
  classname:   "text-teal-300 font-semibold",
  punctuation: "text-slate-400",
  plain:       "text-slate-200",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AlgorithmCodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [meta, setMeta] = useState<AlgorithmMeta | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([api.listAlgorithms(), api.code(slug)])
      .then(([list, codeRes]) => {
        if (!mounted) return;
        setMeta(list.find((a) => a.slug === slug) || null);
        setCode(codeRes.code);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || "Nu am putut încărca codul");
      });
    return () => { mounted = false; };
  }, [slug]);

  const lines = useMemo(() => code?.split("\n") ?? [], [code]);

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href={`/algorithms/${slug}`}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 text-sm text-slate-600"
        >
          <ArrowLeftIcon size={16} />
          Înapoi la algoritm
        </Link>
      </div>

      {meta && (
        <div className="card">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{meta.category}</p>
          <h1 className="text-2xl font-semibold text-slate-900 mt-1">{meta.name} — Cod sursă</h1>
          <p className="text-sm text-slate-600 mt-1">{meta.summary}</p>
        </div>
      )}

      {error && (
        <div className="card text-sm text-amber-700 bg-amber-50 border border-amber-200">{error}</div>
      )}

      {!code && !error && (
        <div className="card text-sm text-slate-500 animate-pulse">Se încarcă codul...</div>
      )}

      {code && (
        <div className="rounded-2xl border border-slate-700 bg-[#0d1117] shadow-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-slate-400 text-xs font-mono ml-3">{slug}.py</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{lines.length} linii</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded hover:bg-slate-700"
              >
                {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                {copied ? "Copiat!" : "Copiază"}
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 py-2 border-b border-slate-800 bg-[#0d1117]">
            {([
              ["keyword",   "Cuvânt cheie"],
              ["builtin",   "Built-in"],
              ["string",    "Șir de caractere"],
              ["number",    "Număr"],
              ["funcname",  "Funcție"],
              ["comment",   "Comentariu"],
            ] as [TokenKind, string][]).map(([kind, label]) => (
              <span key={kind} className={`text-[10px] font-mono ${TOKEN_COLOR[kind]}`}>
                {label}
              </span>
            ))}
          </div>

          {/* Code */}
          <pre className="overflow-auto p-0 max-h-[80vh] text-sm leading-6">
            <code>
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className="flex hover:bg-slate-800/40 transition-colors group"
                >
                  <span className="w-12 shrink-0 text-right select-none text-slate-600 group-hover:text-slate-500 px-3 py-0.5 text-xs border-r border-slate-800">
                    {idx + 1}
                  </span>
                  <span className="px-4 py-0.5 whitespace-pre font-mono">
                    {tokenizeLine(line).map((tok, ti) => (
                      <span key={ti} className={TOKEN_COLOR[tok.kind]}>
                        {tok.text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </main>
  );
}
