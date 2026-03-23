import { AlgorithmMeta, AlgorithmResult } from "./types";
import { bubbleSort } from "../runtime/algorithms/sortare/bubbleSort";
import { insertionSort } from "../runtime/algorithms/sortare/insertionSort";
import { selectionSort } from "../runtime/algorithms/sortare/selectionSort";
import { quickSort } from "../runtime/algorithms/sortare/quickSort";
import { mergeSort } from "../runtime/algorithms/sortare/mergeSort";
import { binarySearch } from "../runtime/algorithms/cautare/binarySearch";
import { bfs } from "../runtime/algorithms/grafuri/bfs";
import { dfs } from "../runtime/algorithms/grafuri/dfs";
import { dijkstra } from "../runtime/algorithms/grafuri/dijkstra";
// Search algorithms
import { linearSearchInstrumented } from "../runtime/algorithms/cautare/linearSearch";
import { exponentialSearchInstrumented } from "../runtime/algorithms/cautare/exponentialSearchInstrumented";
import { jumpSearchInstrumented } from "../runtime/algorithms/cautare/jumpSearchInstrumented";
import { interpolationSearchInstrumented } from "../runtime/algorithms/cautare/interpolationSearchInstrumented";
import { fibonacciSearchInstrumented } from "../runtime/algorithms/cautare/fibonacciSearchInstrumented";
import { sentinelSearchInstrumented } from "../runtime/algorithms/cautare/sentinelSearchInstrumented";
// Sorting algorithms
import { countingSortInstrumented } from "../runtime/algorithms/sortare/countingSortInstrumented";
import { gnomeSortInstrumented } from "../runtime/algorithms/sortare/gnomeSortInstrumented";
import { heapSortInstrumented } from "../runtime/algorithms/sortare/heapSortInstrumented";
import { shellSortInstrumented } from "../runtime/algorithms/sortare/shellSortInstrumented";
import { cycleSortInstrumented } from "../runtime/algorithms/sortare/cycleSortInstrumented";
import { quickSelectInstrumented } from "../runtime/algorithms/sortare/quickSelectInstrumented";
import { swapSortInstrumented } from "../runtime/algorithms/sortare/swapSortInstrumented";
import { bogoSortInstrumented } from "../runtime/algorithms/sortare/bogoSortInstrumented";
// Graph algorithms
import { bellmanFordInstrumented } from "../runtime/algorithms/grafuri/bellmanFordInstrumented";
import { primInstrumented } from "../runtime/algorithms/grafuri/primInstrumented";
import { kruskalInstrumented } from "../runtime/algorithms/grafuri/kruskalInstrumented";
import { floydWarshallInstrumented } from "../runtime/algorithms/grafuri/floydWarshallInstrumented";
// DP algorithms
import { lcsInstrumented } from "../runtime/algorithms/programare-dinamica/lcsInstrumented";
import { coinChangeInstrumented } from "../runtime/algorithms/programare-dinamica/coinChangeInstrumented";
import { knapsackInstrumented } from "../runtime/algorithms/programare-dinamica/knapsackInstrumented";
// Math algorithms
import { fibonacciInstrumented } from "../runtime/algorithms/matematica/fibonacciInstrumented";
import { factorialInstrumented } from "../runtime/algorithms/matematica/factorialInstrumented";
import { sieveInstrumented } from "../runtime/algorithms/matematica/sieveInstrumented";
import { absoluteValueInstrumented } from "../runtime/algorithms/matematica/absoluteValueInstrumented";
import { isPalindromeInstrumented } from "../runtime/algorithms/matematica/isPalindromeInstrumented";
import { gcdInstrumented } from "../runtime/algorithms/matematica/gcdInstrumented";
import { primeFactorizationInstrumented } from "../runtime/algorithms/matematica/primeFactorizationInstrumented";
// Bit manipulation
import { addBinaryInstrumented } from "../runtime/algorithms/manipulare-biti/addBinaryInstrumented";
import { logTwoInstrumented } from "../runtime/algorithms/manipulare-biti/logTwoInstrumented";
import { isPowerOfTwoInstrumented } from "../runtime/algorithms/manipulare-biti/isPowerOfTwoInstrumented";
import { isPowerOfFourInstrumented } from "../runtime/algorithms/manipulare-biti/isPowerOfFourInstrumented";
// Diverse
import { shuffleArrayInstrumented } from "../runtime/algorithms/diverse/shuffleArrayInstrumented";
import { isSortedArrayInstrumented } from "../runtime/algorithms/diverse/isSortedArrayInstrumented";
import { parseNestedBracketsInstrumented } from "../runtime/algorithms/diverse/parseNestedBracketsInstrumented";
// Backtracking
import { generateParenthesesInstrumented } from "../runtime/algorithms/backtracking/generateParenthesesInstrumented";
import { allCombinationsInstrumented } from "../runtime/algorithms/backtracking/allCombinationsInstrumented";
import { sourceOnlyMathAlgorithms } from "../runtime/algorithms/matematica/sourceOnlyMathRunners";
import registry from "./algorithms-registry.json";

export * from "./types";

// Map slugs to instrumented implementations
export const algorithms: Record<string, (input: any) => AlgorithmResult> = {
  ...sourceOnlyMathAlgorithms,
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
  sortare_swap_sort: swapSortInstrumented,
  sortare_bogo_sort: bogoSortInstrumented,
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
  matematica_absolute_value: absoluteValueInstrumented,
  matematica_is_palindrome: isPalindromeInstrumented,
  matematica_greatest_common_factor: gcdInstrumented,
  matematica_prime_factorization: primeFactorizationInstrumented,
  "manipulare-biti_add_binary": addBinaryInstrumented,
  "manipulare-biti_log_two": logTwoInstrumented,
  "manipulare-biti_is_power_of_2": isPowerOfTwoInstrumented,
  "manipulare-biti_is_power_of_4": isPowerOfFourInstrumented,
  diverse_shuffle_array: shuffleArrayInstrumented,
  diverse_is_sorted_array: isSortedArrayInstrumented,
  diverse_parse_nested_brackets: parseNestedBracketsInstrumented,
  backtracking_generateparentheses: generateParenthesesInstrumented,
  backtracking_all_combinations_of_size_k: allCombinationsInstrumented,
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
