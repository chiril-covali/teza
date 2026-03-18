import { AlgorithmMeta, AlgorithmResult } from "./types";
import { bubbleSort } from "./sorting/bubbleSort";
import { insertionSort } from "./sorting/insertionSort";
import { selectionSort } from "./sorting/selectionSort";
import { quickSort } from "./sorting/quickSort";
import { mergeSort } from "./sorting/mergeSort";
import { binarySearch } from "./searching/binarySearch";
import { bfs } from "./graphs/bfs";
import { dfs } from "./graphs/dfs";
import { dijkstra } from "./graphs/dijkstra";
import { allAlgorithmsMeta as generatedMeta } from "./generated-registry";

export * from "./types";

// Map slugs to instrumented implementations
export const algorithms: Record<
  string,
  (input: any) => AlgorithmResult
> = {
  sortare_bule: bubbleSort,
  sortare_insertie: insertionSort,
  selection_sort: selectionSort,
  sortare_rapida: quickSort,
  merge_sort: mergeSort,
  cautare_binara: binarySearch,
  parcurgere_latime: bfs,
  parcurgere_adancime: dfs,
  dijkstra: dijkstra,
  // Add mappings for generated slugs that match our instrumented ones
  sorts_bubble_sort: bubbleSort,
  sorts_insertion_sort: insertionSort,
  sorts_selection_sort: selectionSort,
  sorts_quick_sort: quickSort,
  sorts_merge_sort: mergeSort,
  search_binary_search: binarySearch,
  graph_bfs: bfs,
  graph_dfs: dfs,
  graph_dijkstra: dijkstra,
};

// Instrumented meta for better descriptions
const instrumentedMeta: AlgorithmMeta[] = [
  {
    slug: "sortare_bule",
    name: "Sortare cu bule",
    complexity: "O(n²)",
    description: "Algoritmul Bubble Sort este una dintre cele mai simple metode de sortare. Funcționează prin parcurgerea repetată a listei, comparând elementele adiacente și inversându-le dacă sunt în ordinea greșită.",
    category: "Sortare",
  },
  {
      slug: "merge_sort",
      name: "Sortare prin interclasare",
      complexity: "O(n log n)",
      description: "Merge Sort este un algoritm de sortare bazat pe principiul Divide et Impera.",
      category: "Sortare",
  }
  // ... others are in generatedMeta
];

// Combine all meta, prioritizing instrumented ones but keeping the generated list as the main source
export const allAlgorithms: AlgorithmMeta[] = generatedMeta.map(gen => {
    const inst = instrumentedMeta.find(i => i.slug === gen.slug);
    return inst ? { ...gen, ...inst } : gen;
});

export function runAlgorithm(slug: string, input: any): AlgorithmResult {
  const algo = algorithms[slug];
  if (!algo) {
    // If not instrumented, return a dummy trace with the "done" event
    // This allows the UI to at least show it's "finished"
    return {
        trace: [{ type: "done", note: "Acest algoritm nu are încă o vizualizare pas-cu-pas, dar poți vedea codul sursă.", vars: { status: "Finalizat" } }],
        result: { message: "Execuție finalizată" }
    };
  }
  return algo(input);
}
