import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function parseNestedBracketsInstrumented(input: {
  text?: string;
  openBrackets?: string;
  closingBrackets?: string;
}): AlgorithmResult {
  const text = String(input?.text ?? "<MAIN hoge><MAIN2 fuga>");
  const openBrackets = String(input?.openBrackets ?? "<");
  const closingBrackets = String(input?.closingBrackets ?? ">");

  const trace: TraceEvent[] = [];
  const stack: number[] = [];
  const tags: string[] = [];

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (ch === openBrackets) {
      stack.push(i);
      trace.push({
        type: "compare",
        note: `Am întâlnit paranteză de deschidere la index ${i}.` ,
        vars: { index: i, char: ch, action: "push", depth: stack.length, stack: [...stack] },
      });
      continue;
    }

    if (ch === closingBrackets) {
      const start = stack.pop();
      if (start === undefined) {
        trace.push({
          type: "done",
          note: `Paranteză de închidere neasociată la index ${i}.`,
          vars: { index: i, char: ch, balanced: false, stack: [...stack] },
          result: { balanced: false, tags },
        });
        return { trace, result: { balanced: false, tags } };
      }

      const token = text.slice(start, i + 1);
      tags.push(token);
      trace.push({
        type: "set",
        index: i,
        value: tags.length,
        array: tags.map((t) => t.length),
        note: `Am închis secvența ${token}.`,
        vars: { index: i, char: ch, action: "pop", depth: stack.length, token, tags: [...tags] },
      });
    }
  }

  const balanced = stack.length === 0;
  trace.push({
    type: "done",
    note: balanced
      ? "Parantezele sunt echilibrate și toate secvențele au fost extrase."
      : "Parantezele nu sunt echilibrate: există deschideri fără închidere.",
    vars: { balanced, remainingOpen: [...stack], tags: [...tags] },
    result: { balanced, tags },
  });

  return { trace, result: { balanced, tags } };
}
