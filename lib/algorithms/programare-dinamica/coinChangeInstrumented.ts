import { AlgorithmResult, TraceEvent } from "../types";

export function coinChangeInstrumented(input: {
  money: number;
  coins: number[];
}): AlgorithmResult {
  const { money, coins } = input;
  const trace: TraceEvent[] = [];

  if (money === 0) {
    trace.push({ type: "done", result: { minCoins: 0, selectedCoins: [] }, note: "Suma este 0, nu sunt necesare monede." });
    return { trace, result: { minCoins: 0, selectedCoins: [] } };
  }

  const numCoins = coins.length;
  // 2D table: rows = coin index (0 = no coins used), cols = amount 0..money
  const table: number[][] = Array.from({ length: numCoins + 1 }, () =>
    Array(money + 1).fill(Infinity)
  );
  // Base case: 0 amount needs 0 coins
  for (let r = 0; r <= numCoins; r++) table[r][0] = 0;

  trace.push({
    type: "dp_cell",
    row: 0,
    col: 0,
    value: 0,
    table: table.map((row) => row.map((v) => (v === Infinity ? -1 : v))),
    note: `Inițializez tabelul DP. Coloana 0 = 0 monede (suma 0). Infinity = imposibil.`,
    vars: { coins: coins, money: money },
  });

  for (let i = 1; i <= numCoins; i++) {
    const coin = coins[i - 1];
    for (let j = 1; j <= money; j++) {
      // Option 1: don't use this coin
      table[i][j] = table[i - 1][j];

      // Option 2: use this coin (if it fits)
      if (coin <= j && table[i][j - coin] !== Infinity) {
        const withCoin = table[i][j - coin] + 1;
        if (withCoin < table[i][j]) {
          table[i][j] = withCoin;
        }
      }

      trace.push({
        type: "dp_cell",
        row: i,
        col: j,
        value: table[i][j] === Infinity ? -1 : table[i][j],
        table: table.map((row) => row.map((v) => (v === Infinity ? -1 : v))),
        note:
          table[i][j] === Infinity
            ? `dp[${i}][${j}]: imposibil să formezi suma ${j} cu monedele 1..${i}`
            : `dp[${i}][${j}] = ${table[i][j]} monede pentru suma ${j} (moneda curentă: ${coin})`,
        vars: { monedaCurenta: coin, sumaJ: j, valoare: table[i][j] === Infinity ? -1 : table[i][j] },
      });
    }
  }

  const minCoins = table[numCoins][money] === Infinity ? -1 : table[numCoins][money];

  // Reconstruct selected coins
  const selectedCoins: number[] = [];
  if (minCoins !== -1) {
    let i = numCoins;
    let j = money;
    while (i > 0 && j > 0) {
      if (table[i][j] !== table[i - 1][j]) {
        selectedCoins.push(coins[i - 1]);
        j -= coins[i - 1];
      } else {
        i--;
      }
    }
  }

  trace.push({
    type: "done",
    result: { minCoins, selectedCoins },
    note:
      minCoins === -1
        ? `Suma ${money} nu poate fi formată cu monedele disponibile.`
        : `Suma ${money} poate fi formată cu ${minCoins} monede: [${selectedCoins.join(", ")}]`,
    vars: { minCoins, selectedCoins },
  });

  return { trace, result: { minCoins, selectedCoins } };
}
