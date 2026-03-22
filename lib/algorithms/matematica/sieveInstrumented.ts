import { AlgorithmResult, TraceEvent } from "../types";

export function sieveInstrumented(input: { n: number }): AlgorithmResult {
  const n = Math.max(2, Math.min(input.n ?? 50, 100));
  const trace: TraceEvent[] = [];

  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  const primes: number[] = [];

  trace.push({
    type: "set",
    index: 0,
    value: 0,
    array: isPrime.map(Number),
    note: `Inițializăm ciurul pentru numerele de la 2 la ${n}. Presupunem că toate sunt prime.`,
    vars: { n },
  });

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      trace.push({
        type: "set",
        index: i,
        value: 1,
        array: isPrime.map(Number),
        note: `${i} este număr prim. Eliminăm toți multiplii lui ${i} începând cu ${i}² = ${i * i}.`,
        vars: { p: i, "p²": i * i },
      });
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
        trace.push({
          type: "set",
          index: j,
          value: 0,
          array: isPrime.map(Number),
          note: `Eliminăm ${j} deoarece este multiplu de ${i} (${j} = ${i} × ${j / i}).`,
          vars: { eliminat: j, factor: i },
        });
      }
    }
  }

  for (let i = 2; i <= n; i++) if (isPrime[i]) primes.push(i);

  trace.push({
    type: "done",
    array: isPrime.map(Number),
    note: `S-au găsit ${primes.length} numere prime: ${primes.slice(0, 10).join(", ")}${primes.length > 10 ? "..." : ""}`,
    vars: { primes: primes.slice(0, 20) },
  });
  return { trace, result: { primes, count: primes.length } };
}
