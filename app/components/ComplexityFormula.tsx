
"use client";
import { InlineMath } from "react-katex";

function toLatex(expr: string): string {
  return expr
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/sqrt\s*\(\s*([^\)]+)\s*\)/gi, "\\\\sqrt{$1}")
    .replace(/sqrt\s+([A-Za-z0-9]+)/gi, "\\\\sqrt{$1}")
    .replace(/log\s+([A-Za-z0-9]+)/gi, "\\\\log $1")
    .replace(/([A-Za-z0-9])\^([A-Za-z0-9]+)/g, "$1^{$2}")
    .replace(/\*/g, " \\\\cdot ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSegments(value: string): Array<{ label: string; expr: string; raw: string }> {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((segment) => {
      const m = segment.match(/^([A-Za-z])\s*:\s*(.+)$/);
      if (m) {
        return { label: m[1].toUpperCase(), expr: m[2].trim(), raw: segment };
      }
      return { label: "", expr: segment, raw: segment };
    });
}

export default function ComplexityFormula({ value, className = "" }: { value: string; className?: string }) {
  if (!value?.trim()) return null;
  const segments = parseSegments(value);

  return (
    <span className={`inline-flex flex-col gap-1 font-mono tracking-tight whitespace-nowrap ${className}`} aria-label={`Complexitate ${value}`}>
      {segments.map((segment, idx) => {
        const math = toLatex(segment.expr);

        return (
          <span key={`${segment.raw}-${idx}`} className="inline-flex items-baseline gap-1 whitespace-nowrap leading-tight">
            {segment.label ? <span className="text-[11px] font-black text-slate-500">{segment.label}:</span> : null}
            <InlineMath math={math} renderError={() => <span>{segment.raw}</span>} />
          </span>
        );
      })}
    </span>
  );
}