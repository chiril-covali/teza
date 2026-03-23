import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function isPowerOfFourInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.floor(input.n ?? 16);
  const trace: TraceEvent[] = [];

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Verificăm dacă ${n} este putere a lui 4.`,
    vars: { n, binary: n > 0 ? n.toString(2) : "—" },
  });

  if (n <= 0) {
    trace.push({
      type: "done", array: [],
      note: `${n} ≤ 0 → Nu este putere a lui 4.`,
      vars: { n, result: false },
    });
    return { trace, result: { isPowerOfFour: false } };
  }

  const andResult = n & (n - 1);
  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Pasul 1: n & (n-1) = ${andResult} — ${andResult === 0 ? "un singur bit setat ✓" : "mai mulți biți, nu este putere a lui 2"}`,
    vars: { n, "n&(n-1)": andResult, "un singur bit": andResult === 0 },
  });

  if (andResult !== 0) {
    trace.push({
      type: "done", array: [],
      note: `${n} NU este putere a lui 4 (nu e nici putere a lui 2).`,
      vars: { n, result: false },
    });
    return { trace, result: { isPowerOfFour: false } };
  }

  const mod3 = n % 3;
  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Pasul 2: n % 3 = ${mod3} — ${mod3 === 1 ? "bitul 1 este pe poziție pară ✓" : "bitul nu este pe poziție pară"}`,
    vars: { n, "n%3": mod3, "pozitie_para": mod3 === 1 },
  });

  const isPow4 = mod3 === 1;
  trace.push({
    type: "done", array: [],
    note: isPow4
      ? `${n} ESTE putere a lui 4.`
      : `${n} NU este putere a lui 4.`,
    vars: { n, result: isPow4 },
  });

  return { trace, result: { isPowerOfFour: isPow4 } };
}
