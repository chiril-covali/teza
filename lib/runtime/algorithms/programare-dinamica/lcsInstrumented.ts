import { AlgorithmResult, TraceEvent } from "@/lib/algorithms/types";

export function lcsInstrumented(input: {
  text1: string;
  text2: string;
}): AlgorithmResult {
  const { text1, text2 } = input;
  const trace: TraceEvent[] = [];
  const m = text1.length;
  const n = text2.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  trace.push({
    type: "dp_cell",
    row: 0,
    col: 0,
    value: 0,
    table: dp.map((row) => [...row]),
    note: `Inițializez tabelul DP (${m + 1} × ${n + 1}) cu zerouri`,
    vars: { text1, text2 },
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        trace.push({
          type: "dp_cell",
          row: i,
          col: j,
          value: dp[i][j],
          table: dp.map((row) => [...row]),
          note: `text1[${i - 1}]='${text1[i - 1]}' == text2[${j - 1}]='${text2[j - 1]}' → dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
          vars: { i, j, char: text1[i - 1] },
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        trace.push({
          type: "dp_cell",
          row: i,
          col: j,
          value: dp[i][j],
          table: dp.map((row) => [...row]),
          note: `text1[${i - 1}]='${text1[i - 1]}' != text2[${j - 1}]='${text2[j - 1]}' → dp[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
          vars: { i, j },
        });
      }
    }
  }

  // Reconstruct LCS
  let i = m;
  let j = n;
  const lcsChars: string[] = [];
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      lcsChars.unshift(text1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  const lcs = lcsChars.join("");

  trace.push({
    type: "done",
    result: { lcs, length: dp[m][n] },
    note: `LCS găsit: „${lcs}" (lungime ${dp[m][n]})`,
    vars: { lcs, length: dp[m][n] },
  });

  return { trace, result: { lcs, length: dp[m][n] } };
}
