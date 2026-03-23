import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";
import { aliquotSum } from "@/lib/algorithms/matematica/aliquot_sum";
import { armstrongNumber } from "@/lib/algorithms/matematica/armstrong_number";
import { binomialCoefficient } from "@/lib/algorithms/matematica/binomial_coefficient";
import { calculateMean } from "@/lib/algorithms/matematica/calculate_mean";
import { calculateMedian } from "@/lib/algorithms/matematica/calculate_median";
import { degreesToRadians } from "@/lib/algorithms/matematica/degrees_to_radians";
import { digitSum } from "@/lib/algorithms/matematica/digit_sum";
import { DoubleFactorialIterative } from "@/lib/algorithms/matematica/double_factorial_iterative";
import { phi } from "@/lib/algorithms/matematica/euler_totient";
import { findFactors } from "@/lib/algorithms/matematica/factors";
import { findMin } from "@/lib/algorithms/matematica/find_min";
import { gaussianElimination } from "@/lib/algorithms/matematica/gaussian_elimination";
import { hammingDistance } from "@/lib/algorithms/matematica/hamming_distance";
import { HexagonalNumbers } from "@/lib/algorithms/matematica/series/hexagonal_numbers";
import { isDivisible } from "@/lib/algorithms/matematica/is_divisible";
import { isEven } from "@/lib/algorithms/matematica/is_even";
import { isLeapYear } from "@/lib/algorithms/matematica/is_leap_year";
import { isOdd } from "@/lib/algorithms/matematica/is_odd";
import { isSquareFree } from "@/lib/algorithms/matematica/is_square_free";
import { jugglerSequence } from "@/lib/algorithms/matematica/juggler_sequence";
import { matrixMultiplication } from "@/lib/algorithms/matematica/matrix_multiplication";
import { numberOfDigits } from "@/lib/algorithms/matematica/number_of_digits";
import { pascalsTriangle } from "@/lib/algorithms/matematica/pascals_triangle";
import { perfectCube } from "@/lib/algorithms/matematica/perfect_cube";
import { isPerfectNumber } from "@/lib/algorithms/matematica/perfect_number";
import { perfectSquare } from "@/lib/algorithms/matematica/perfect_square";
import { sieveOfEratosthenes as primesUpToLimit } from "@/lib/algorithms/matematica/primes";
import { pronicNumber } from "@/lib/algorithms/matematica/pronic_number";
import { radiansToDegrees } from "@/lib/algorithms/matematica/radians_to_degrees";
import { signum } from "@/lib/algorithms/matematica/signum";
import { squareRoot } from "@/lib/algorithms/matematica/square_root";
import { uglyNumbers } from "@/lib/algorithms/matematica/ugly_numbers";
import { Calendar, getWeekday } from "@/lib/algorithms/matematica/zellers_congruence";

type Runner = (input: any) => AlgorithmResult;

function toPlainValue(value: any): any {
  if (value instanceof Map) {
    return Object.fromEntries(Array.from(value.entries()).map(([k, v]) => [String(k), toPlainValue(v)]));
  }
  if (value instanceof Set) {
    return Array.from(value.values()).map((item) => toPlainValue(item));
  }
  if (Array.isArray(value)) {
    return value.map((item) => toPlainValue(item));
  }
  if (value && typeof value === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = toPlainValue(v);
    }
    return out;
  }
  return value;
}

function toPreviewArray(value: any): number[] | undefined {
  if (Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item))) {
    return value.slice(0, 80);
  }

  if (value && typeof value === "object") {
    if (Array.isArray(value.primes) && value.primes.every((item: unknown) => typeof item === "number")) {
      return value.primes.slice(0, 80);
    }
    if (Array.isArray(value.result) && value.result.every((item: unknown) => typeof item === "number")) {
      return value.result.slice(0, 80);
    }
    if (Array.isArray(value.rezultat) && value.rezultat.every((item: unknown) => typeof item === "number")) {
      return value.rezultat.slice(0, 80);
    }
  }

  return undefined;
}

function toResultRecord(result: any): Record<string, any> {
  if (result && typeof result === "object" && !Array.isArray(result)) {
    return result;
  }
  return { value: result };
}

function buildStepTrace(name: string, input: any, result: any): TraceEvent[] {
  const trace: TraceEvent[] = [];
  const normalizedInput = toPlainValue(input ?? {});
  const inputEntries = Object.entries(normalizedInput);

  if (inputEntries.length === 0) {
    trace.push({
      type: "done",
      note: `Pornim ${name}. Algoritmul nu are parametri expliciti de intrare.`,
      vars: { input: normalizedInput },
    });
  } else {
    trace.push({
      type: "done",
      note: `Pornim ${name} cu ${inputEntries.length} parametri de intrare.`,
      vars: { input: normalizedInput },
    });

    inputEntries.slice(0, 8).forEach(([key, value], index) => {
      trace.push({
        type: "done",
        note: `Parametrul ${index + 1}: ${key}`,
        vars: { parametru: key, valoare: value },
      });
    });
  }

  if (Array.isArray(result)) {
    const preview = result.slice(0, 20);
    preview.forEach((value, index) => {
      const numericPrefix = preview
        .slice(0, index + 1)
        .filter((v) => typeof v === "number" && Number.isFinite(v));

      trace.push({
        type: "done",
        note: `Rezultat parțial (${index + 1}/${preview.length})`,
        vars: { index, valoare: value },
        ...(numericPrefix.length > 0 ? { array: numericPrefix as number[] } : {}),
      });
    });
  } else if (result && typeof result === "object") {
    const entries = Object.entries(result).slice(0, 12);
    entries.forEach(([key, value], index) => {
      trace.push({
        type: "done",
        note: `Câmp rezultat ${index + 1}: ${key}`,
        vars: { cheie: key, valoare: value },
      });
    });
  } else {
    trace.push({
      type: "done",
      note: "Rezultat scalar obținut.",
      vars: { valoare: result },
    });
  }

  const previewArray = toPreviewArray(result);
  trace.push({
    type: "done",
    note: `${name} a fost executat cu succes.`,
    vars: { rezultat: result },
    ...(previewArray ? { array: previewArray } : {}),
  });

  return trace;
}

function safeMathRunner(name: string, compute: (input: any) => any): Runner {
  return (input: any) => {
    try {
      const result = toPlainValue(compute(input));
      const trace = buildStepTrace(name, input, result);

      return {
        trace,
        result: toResultRecord(result),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Eroare necunoscuta";
      return {
        trace: [
          {
            type: "done",
            note: `Eroare la executia algoritmului: ${message}`,
            vars: { error: message },
          },
        ],
        result: { error: message },
      };
    }
  };
}

function getUglyNumberPrefix(n: number): number[] {
  const seq = uglyNumbers();
  const out: number[] = [];
  const count = Math.max(0, Math.floor(n));
  for (let i = 0; i < count; i += 1) {
    const step = seq.next();
    if (step.done) break;
    out.push(step.value);
  }
  return out;
}

function resolveCalendar(value: unknown): Calendar {
  if (value === Calendar.Julian || value === "Julian" || value === "julian") {
    return Calendar.Julian;
  }
  return Calendar.Gregorian;
}

function euclidGcd(a: number, b: number): number {
  let x = Math.abs(Math.floor(a));
  let y = Math.abs(Math.floor(b));
  while (y !== 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
}

function binaryConvertRunner(input: any): AlgorithmResult {
  const original = Math.abs(Math.floor(Number(input?.n ?? 0)));
  let n = original;
  const bits: number[] = [];
  const trace: TraceEvent[] = [];

  trace.push({
    type: "done",
    note: `Pornim conversia în baza 2 pentru ${original}.`,
    vars: { n_initial: original },
  });

  if (n === 0) {
    trace.push({
      type: "done",
      note: "0 în baza 2 rămâne 0.",
      vars: { bit: 0, bits: "0" },
      array: [0],
    });
    return { trace, result: { binary: "0", bits: [0], decimal: 0 } };
  }

  while (n > 0) {
    const bit = n % 2;
    const quotient = Math.floor(n / 2);
    bits.unshift(bit);

    trace.push({
      type: "done",
      note: `${n} ÷ 2 => cat ${quotient}, rest ${bit}.`,
      vars: {
        n_curent: n,
        cat: quotient,
        rest: bit,
        bits_partial: bits.join(""),
      },
      array: [...bits],
    });

    n = quotient;
  }

  trace.push({
    type: "done",
    note: `Rezultat final: ${original} = ${bits.join("")}_2`,
    vars: { decimal: original, binary: bits.join("") },
    array: [...bits],
  });

  return {
    trace,
    result: { binary: bits.join(""), bits, decimal: original },
  };
}

function lowestCommonMultipleRunner(input: any): AlgorithmResult {
  const numbers = Array.isArray(input?.numbers)
    ? input.numbers.map((n: unknown) => Math.abs(Math.floor(Number(n)))).filter((n: number) => Number.isFinite(n) && n > 0)
    : [];

  if (numbers.length === 0) {
    return {
      trace: [
        {
          type: "done",
          note: "Eroare la executia algoritmului: este necesară o listă de numere naturale pozitive.",
          vars: { error: "numbers invalid" },
        },
      ],
      result: { error: "numbers invalid" },
    };
  }

  const trace: TraceEvent[] = [];
  let currentLcm = numbers[0];

  trace.push({
    type: "done",
    note: `Pornim calculul CMMC pentru: ${numbers.join(", ")}.`,
    vars: { numbers, currentLcm },
    array: [currentLcm],
  });

  for (let i = 1; i < numbers.length; i += 1) {
    const value = numbers[i];
    const gcd = euclidGcd(currentLcm, value);
    const nextLcm = (currentLcm * value) / gcd;

    trace.push({
      type: "done",
      note: `Combinăm ${currentLcm} și ${value}: CMMC = (${currentLcm} × ${value}) / CMMDC(${currentLcm}, ${value}) = ${nextLcm}`,
      vars: {
        pas: i,
        a: currentLcm,
        b: value,
        cmmdc: gcd,
        cmmc_partial: nextLcm,
      },
      array: [currentLcm, value, gcd, nextLcm],
    });

    currentLcm = nextLcm;
  }

  trace.push({
    type: "done",
    note: `CMMC final pentru (${numbers.join(", ")}) este ${currentLcm}.`,
    vars: { numbers, cmmc: currentLcm },
    array: [currentLcm],
  });

  return {
    trace,
    result: { lcm: currentLcm, numbers },
  };
}

export const sourceOnlyMathAlgorithms: Record<string, Runner> = {
  matematica_aliquot_sum: safeMathRunner("Aliquot Sum", ({ n }) => aliquotSum(Number(n))),
  matematica_armstrong_number: safeMathRunner("Armstrong Number", ({ n }) => armstrongNumber(Number(n))),
  matematica_binary_convert: binaryConvertRunner,
  matematica_binomial_coefficient: safeMathRunner("Binomial Coefficient", ({ n, k }) => binomialCoefficient(Number(n), Number(k))),
  matematica_calculate_mean: safeMathRunner("Calculate Mean", ({ numbers }) => calculateMean(Array.isArray(numbers) ? numbers.map(Number) : [])),
  matematica_calculate_median: safeMathRunner("Calculate Median", ({ numbers }) => calculateMedian(Array.isArray(numbers) ? numbers.map(Number) : [])),
  matematica_degrees_to_radians: safeMathRunner("Degrees to Radians", ({ degrees }) => degreesToRadians(Number(degrees))),
  matematica_digit_sum: safeMathRunner("Digit Sum", ({ n }) => digitSum(Number(n))),
  matematica_double_factorial_iterative: safeMathRunner("Double Factorial", ({ n }) => DoubleFactorialIterative(Number(n))),
  matematica_euler_totient: safeMathRunner("Euler Totient", ({ n }) => phi(Number(n))),
  matematica_factors: safeMathRunner("Factors", ({ n }) => findFactors(Number(n))),
  matematica_find_min: safeMathRunner("Find Min", ({ numbers }) => findMin(Array.isArray(numbers) ? numbers.map(Number) : [])),
  matematica_gaussian_elimination: safeMathRunner("Gaussian Elimination", ({ matrix }) => gaussianElimination(Array.isArray(matrix) ? matrix.map((row: number[]) => [...row]) : [])),
  matematica_hamming_distance: safeMathRunner("Hamming Distance", ({ str1, str2 }) => hammingDistance(String(str1 ?? ""), String(str2 ?? ""))),
  matematica_series_hexagonal_numbers: safeMathRunner("Hexagonal Numbers", ({ n }) => HexagonalNumbers(Number(n))),
  matematica_is_divisible: safeMathRunner("Is Divisible", ({ num1, num2 }) => isDivisible(Number(num1), Number(num2))),
  matematica_is_even: safeMathRunner("Is Even", ({ n }) => isEven(Number(n))),
  matematica_is_leap_year: safeMathRunner("Is Leap Year", ({ year }) => isLeapYear(Number(year))),
  matematica_is_odd: safeMathRunner("Is Odd", ({ n }) => isOdd(Number(n))),
  matematica_is_square_free: safeMathRunner("Is Square Free", ({ n }) => isSquareFree(Number(n))),
  matematica_juggler_sequence: safeMathRunner("Juggler Sequence", ({ a, n }) => jugglerSequence(Number(a), Number(n))),
  matematica_lowest_common_multiple: lowestCommonMultipleRunner,
  matematica_matrix_multiplication: safeMathRunner("Matrix Multiplication", ({ matrixA, matrixB, vector, scalar }) => {
    const scalarNumber = Number(scalar);
    if (!Number.isNaN(scalarNumber) && scalar !== undefined && scalar !== null && scalar !== "") {
      return matrixMultiplication(matrixA, scalarNumber);
    }
    if (Array.isArray(vector)) {
      return matrixMultiplication(matrixA, vector);
    }
    return matrixMultiplication(matrixA, matrixB);
  }),
  matematica_number_of_digits: safeMathRunner("Number of Digits", ({ n }) => numberOfDigits(Number(n))),
  matematica_pascals_triangle: safeMathRunner("Pascal Triangle", ({ n }) => pascalsTriangle(Number(n))),
  matematica_perfect_cube: safeMathRunner("Perfect Cube", ({ n }) => perfectCube(Number(n))),
  matematica_perfect_number: safeMathRunner("Perfect Number", ({ n }) => isPerfectNumber(Number(n))),
  matematica_perfect_square: safeMathRunner("Perfect Square", ({ n }) => perfectSquare(Number(n))),
  matematica_primes: safeMathRunner("Primes", ({ n }) => primesUpToLimit(Number(n))),
  matematica_pronic_number: safeMathRunner("Pronic Number", ({ n }) => pronicNumber(Number(n))),
  matematica_radians_to_degrees: safeMathRunner("Radians to Degrees", ({ radians }) => radiansToDegrees(Number(radians))),
  matematica_signum: safeMathRunner("Signum", ({ n }) => signum(Number(n))),
  matematica_square_root: safeMathRunner("Square Root", ({ n, precision }) => {
    if (precision !== undefined && precision !== null && precision !== "") {
      return squareRoot(Number(n), Number(precision));
    }
    return squareRoot(Number(n));
  }),
  matematica_ugly_numbers: safeMathRunner("Ugly Numbers", ({ n }) => getUglyNumberPrefix(Number(n))),
  matematica_zellers_congruence: safeMathRunner("Zeller Congruence", ({ year, month, day, calendar }) => {
    const weekday = getWeekday(Number(year), Number(month), Number(day), resolveCalendar(calendar));
    const names = ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
    return { index: weekday, weekday: names[weekday] };
  }),
};
