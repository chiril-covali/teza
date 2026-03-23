import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function addBinaryInstrumented(input: { a: string; b: string }): AlgorithmResult {
  const a = (input.a || "1010").replace(/[^01]/g, "") || "0";
  const b = (input.b || "1011").replace(/[^01]/g, "") || "0";
  const trace: TraceEvent[] = [];

  trace.push({ type: "set", index: 0, value: 0, array: [], note: `Adunăm numerele binare: ${a} + ${b}`, vars: { a, b } });

  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const bits: number[] = [];

  while (i >= 0 || j >= 0 || carry) {
    const bitA = i >= 0 ? parseInt(a[i]) : 0;
    const bitB = j >= 0 ? parseInt(b[j]) : 0;
    const sum = bitA + bitB + carry;
    const bit = sum % 2;
    const prevCarry = carry;
    carry = Math.floor(sum / 2);
    bits.unshift(bit);

    trace.push({
      type: "set",
      index: bits.length - 1,
      value: bit,
      array: [...bits],
      note: `Bit poziția ${bits.length - 1}: ${bitA} + ${bitB} + carry(${prevCarry}) = ${sum} → bit=${bit}, carry=${carry}`,
      vars: { bitA, bitB, sum, bit, carry, partial: bits.join("") },
    });
    i--;
    j--;
  }

  const result = bits.join("");
  trace.push({
    type: "done",
    array: [...bits],
    note: `${a} + ${b} = ${result} (zecimal: ${parseInt(result, 2)})`,
    vars: { result, decimal: parseInt(result, 2) },
  });
  return { trace, result: { binary: result, decimal: parseInt(result, 2) } };
}
