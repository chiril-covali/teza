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
import registry from "./algorithms-registry.json";

export * from "./types";

// Map slugs to instrumented implementations
export const algorithms: Record<string, (input: any) => AlgorithmResult> = {
  sortare_bubbleSort: bubbleSort,
  sortare_insertionSort: insertionSort,
  sortare_selectionSort: selectionSort,
  sortare_quickSort: quickSort,
  sortare_mergeSort: mergeSort,
  cautare_binarySearch: binarySearch,
  grafuri_bfs: bfs,
  grafuri_dfs: dfs,
  grafuri_dijkstra: dijkstra,
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
