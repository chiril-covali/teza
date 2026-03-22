import { AlgorithmMeta, AlgorithmResult } from "./types";
import { bubbleSort } from "./sortare/bubbleSort";
import { insertionSort } from "./sortare/insertionSort";
import { selectionSort } from "./sortare/selectionSort";
import { quickSort } from "./sortare/quickSort";
import { mergeSort } from "./sortare/mergeSort";
import { binarySearch } from "./cautare/binarySearch";
import { bfs } from "./grafuri/bfs";
import { dfs } from "./grafuri/dfs";
import { dijkstra } from "./grafuri/dijkstra";
// New search algorithms
import { linearSearchInstrumented } from "./cautare/linearSearch";
import { exponentialSearchInstrumented } from "./cautare/exponentialSearchInstrumented";
import { jumpSearchInstrumented } from "./cautare/jumpSearchInstrumented";
import { interpolationSearchInstrumented } from "./cautare/interpolationSearchInstrumented";
import { fibonacciSearchInstrumented } from "./cautare/fibonacciSearchInstrumented";
import { sentinelSearchInstrumented } from "./cautare/sentinelSearchInstrumented";
// New sorting algorithms
import { countingSortInstrumented } from "./sortare/countingSortInstrumented";
import { gnomeSortInstrumented } from "./sortare/gnomeSortInstrumented";
import { heapSortInstrumented } from "./sortare/heapSortInstrumented";
import { shellSortInstrumented } from "./sortare/shellSortInstrumented";
import { cycleSortInstrumented } from "./sortare/cycleSortInstrumented";
import { quickSelectInstrumented } from "./sortare/quickSelectInstrumented";
// New graph algorithms
import { bellmanFordInstrumented } from "./grafuri/bellmanFordInstrumented";
import { primInstrumented } from "./grafuri/primInstrumented";
import { kruskalInstrumented } from "./grafuri/kruskalInstrumented";
import { floydWarshallInstrumented } from "./grafuri/floydWarshallInstrumented";
// New DP algorithms
import { lcsInstrumented } from "./programare-dinamica/lcsInstrumented";
import { coinChangeInstrumented } from "./programare-dinamica/coinChangeInstrumented";
import { knapsackInstrumented } from "./programare-dinamica/knapsackInstrumented";
// New generic algorithms
import { fibonacciInstrumented } from "./matematica/fibonacciInstrumented";
import { factorialInstrumented } from "./matematica/factorialInstrumented";
import { sieveInstrumented } from "./matematica/sieveInstrumented";
import { addBinaryInstrumented } from "./manipulare-biti/addBinaryInstrumented";
import { shuffleArrayInstrumented } from "./diverse/shuffleArrayInstrumented";
import registry from "./algorithms-registry.json";

export * from "./types";

// Map slugs to instrumented implementations
export const algorithms: Record<string, (input: any) => AlgorithmResult> = {
  // Original
  sortare_bubbleSort: bubbleSort,
  sortare_insertionSort: insertionSort,
  sortare_selectionSort: selectionSort,
  sortare_quickSort: quickSort,
  sortare_mergeSort: mergeSort,
  cautare_binarySearch: binarySearch,
  grafuri_bfs: bfs,
  grafuri_dfs: dfs,
  grafuri_dijkstra: dijkstra,
  // New search
  cautare_linear_search: linearSearchInstrumented,
  cautare_exponential_search: exponentialSearchInstrumented,
  cautare_jump_search: jumpSearchInstrumented,
  cautare_interpolation_search: interpolationSearchInstrumented,
  cautare_fibonacci_search: fibonacciSearchInstrumented,
  cautare_sentinel_search: sentinelSearchInstrumented,
  // New sorting
  sortare_counting_sort: countingSortInstrumented,
  sortare_gnome_sort: gnomeSortInstrumented,
  sortare_heap_sort: heapSortInstrumented,
  sortare_shell_sort: shellSortInstrumented,
  sortare_cycle_sort: cycleSortInstrumented,
  sortare_quick_select: quickSelectInstrumented,
  // New graph
  grafuri_bellman_ford: bellmanFordInstrumented,
  grafuri_prim: primInstrumented,
  grafuri_kruskal: kruskalInstrumented,
  grafuri_floyd_warshall: floydWarshallInstrumented,
  // New DP
  "programare-dinamica_lcs": lcsInstrumented,
  "programare-dinamica_coin_change": coinChangeInstrumented,
  "programare-dinamica_knapsack": knapsackInstrumented,
  // New generic
  matematica_fibonacci: fibonacciInstrumented,
  matematica_factorial: factorialInstrumented,
  matematica_sieve_of_eratosthenes: sieveInstrumented,
  "manipulare-biti_add_binary": addBinaryInstrumented,
  diverse_shuffle_array: shuffleArrayInstrumented,
};

// All algorithms sourced from the canonical JSON registry
export const allAlgorithms: AlgorithmMeta[] = registry as AlgorithmMeta[];

export const allAlgorithmsList: Array<Omit<AlgorithmMeta, "source">> =
  allAlgorithms.map(({ source, ...rest }) => rest);

export function runAlgorithm(slug: string, input: any): AlgorithmResult {
  const algo = algorithms[slug];
  if (!algo) {
    return {
      trace: [
        {
          type: "done",
          note: "Acest algoritm nu are încă o vizualizare pas-cu-pas, dar poți vedea codul sursă.",
          vars: { status: "Finalizat" },
        },
      ],
      result: { message: "Execuție finalizată" },
    };
  }
  return algo(input);
}
