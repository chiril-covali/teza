import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function isPalindromeInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.abs(Math.floor(input.n ?? 121));
  const trace: TraceEvent[] = [];
  const s = String(n);

  trace.push({
    type: "set", index: 0, value: n, array: [],
    note: `Verificăm dacă ${n} este palindrom. Reprezentare: "${s}"`,
    vars: { n, sir: s, lungime: s.length },
  });

  let left = 0;
  let right = s.length - 1;
  let isPalin = true;

  while (left < right) {
    const charLeft = s[left];
    const charRight = s[right];
    trace.push({
      type: "compare", indices: [left, right], values: [parseInt(charLeft), parseInt(charRight)],
      note: `Comparăm pozițiile ${left} și ${right}: '${charLeft}' vs '${charRight}'`,
      vars: { stanga: left, dreapta: right, "s[stanga]": charLeft, "s[dreapta]": charRight, egal: charLeft === charRight },
    });
    if (charLeft !== charRight) {
      isPalin = false;
      break;
    }
    left++;
    right--;
  }

  trace.push({
    type: "done", array: [],
    note: isPalin ? `${n} ESTE palindrom.` : `${n} NU este palindrom.`,
    vars: { n, rezultat: isPalin },
  });

  return { trace, result: { isPalindrome: isPalin } };
}
