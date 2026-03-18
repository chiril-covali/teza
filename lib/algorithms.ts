// Type definitions
export type TraceEvent =
  | CompareEvent
  | SwapEvent
  | SetEvent
  | VisitNodeEvent
  | QueueEvent
  | UpdateDistanceEvent
  | DoneEvent;

export interface CompareEvent {
  type: "compare";
  indices?: [number, number];
  values?: [number, number];
  note?: string;
  vars?: Record<string, any>;
}

export interface SwapEvent {
  type: "swap";
  indices: [number, number];
  array: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface SetEvent {
  type: "set";
  index: number;
  value: number;
  array: number[];
  note?: string;
  vars?: Record<string, any>;
}

export interface VisitNodeEvent {
  type: "visit_node";
  node: string;
  note?: string;
  vars?: Record<string, any>;
}

export interface QueueEvent {
  type: "queue";
  action: "enqueue" | "dequeue";
  node: string;
  note?: string;
  vars?: Record<string, any>;
}

export interface UpdateDistanceEvent {
  type: "update_distance";
  node: string;
  distance: number;
  note?: string;
  vars?: Record<string, any>;
}

export interface DoneEvent {
  type: "done";
  result?: Record<string, any>;
  note?: string;
  vars?: Record<string, any>;
}

export interface AlgorithmResult {
  trace: TraceEvent[];
  result: Record<string, any>;
}

// ============ SORTING ALGORITHMS ============

export function bubbleSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      trace.push({
        type: "compare",
        indices: [j, j + 1],
        values: [arr[j], arr[j + 1]],
        note: "compar elementele adiacente",
        vars: { i, j, n },
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        trace.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr],
          note: "interschimb pentru a plasa elementul mai mic în stânga",
          vars: { i, j, swapped },
        });
      }
    }
    if (!swapped) break;
  }

  trace.push({ type: "done", result: { sorted: arr }, vars: { n } });
  return { trace, result: { sorted: arr } };
}

export function insertionSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [key, key],
      note: `selectez elementul ${key} pentru inserare`,
      vars: { i, key },
    });

    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      trace.push({
        type: "compare",
        indices: [j, j + 1],
        values: [arr[j], key],
        note: `${arr[j]} > ${key}, mut la dreapta`,
        vars: { j, i },
      });

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
    trace.push({
      type: "set",
      index: j + 1,
      value: key,
      array: [...arr],
      note: `inser ${key} la poziția ${j + 1}`,
      vars: { i, key },
    });
  }

  trace.push({ type: "done", result: { sorted: arr }, vars: { n } });
  return { trace, result: { sorted: arr } };
}

export function selectionSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    trace.push({
      type: "compare",
      indices: [i, i],
      values: [arr[i], arr[i]],
      note: `caut minimul pentru poziția ${i}`,
      vars: { i, minIdx },
    });

    for (let j = i + 1; j < n; j++) {
      trace.push({
        type: "compare",
        indices: [minIdx, j],
        values: [arr[minIdx], arr[j]],
        note: `compar ${arr[j]} cu min ${arr[minIdx]}`,
        vars: { j, i },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      trace.push({
        type: "swap",
        indices: [i, minIdx],
        array: [...arr],
        note: `swap: ${arr[i]} și ${arr[minIdx]}`,
        vars: { i, minIdx },
      });
    }
  }

  trace.push({ type: "done", result: { sorted: arr }, vars: { n } });
  return { trace, result: { sorted: arr } };
}

export function quickSort(input: { array: number[] }): AlgorithmResult {
  const arr = [...input.array];
  const trace: TraceEvent[] = [];

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
      trace.push({
        type: "compare",
        indices: [j, high],
        values: [arr[j], pivot],
        note: `compar ${arr[j]} cu pivot ${pivot}`,
        vars: { low, high, pivot, i, j },
      });

      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        trace.push({
          type: "swap",
          indices: [i, j],
          array: [...arr],
          note: "mut element mai mic înaintea pivotului",
          vars: { i, j, pivot },
        });
        i++;
      }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]];
    trace.push({
      type: "swap",
      indices: [i, high],
      array: [...arr],
      note: "plasez pivotul la poziția finală",
      vars: { pivot_index: i, pivot },
    });

    return i;
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  if (arr.length > 1) {
    quickSortHelper(0, arr.length - 1);
  }

  trace.push({ type: "done", result: { sorted: arr }, vars: { n: arr.length } });
  return { trace, result: { sorted: arr } };
}

// ============ SEARCH ALGORITHMS ============

export function binarySearch(input: {
  array: number[];
  target: number;
}): AlgorithmResult {
  const arr = input.array;
  const target = input.target;
  const trace: TraceEvent[] = [];

  let lo = 0,
    hi = arr.length - 1;
  let foundIndex = -1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    trace.push({
      type: "compare",
      indices: [mid, mid],
      values: [arr[mid], target],
      note: "compar elementul din mijloc cu ținta",
      vars: { lo, hi, mid, target },
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      break;
    }

    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  trace.push({
    type: "done",
    result: { found: foundIndex !== -1, index: foundIndex },
    vars: { target },
  });

  return {
    trace,
    result: { found: foundIndex !== -1, index: foundIndex },
  };
}

// ============ GRAPH ALGORITHMS ============

export function bfs(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const adjacency: Record<string, string[]> = {};

  nodes.forEach((node) => {
    adjacency[node] = [];
  });

  edges.forEach((edge) => {
    if (adjacency[edge.from]) {
      adjacency[edge.from].push(edge.to);
    }
  });

  const trace: TraceEvent[] = [];
  const visited = new Set<string>();
  const order: string[] = [];

  if (start && adjacency[start]) {
    const queue = [start];
    visited.add(start);

    trace.push({
      type: "queue",
      action: "enqueue",
      node: start,
      note: "pornesc de la nodul sursă",
      vars: { queue: [...queue], visited: Array.from(visited) },
    });

    while (queue.length > 0) {
      const node = queue.shift()!;

      trace.push({
        type: "queue",
        action: "dequeue",
        node,
        note: "scot din coadă pentru procesare",
        vars: { queue: [...queue], visited: Array.from(visited) },
      });

      trace.push({
        type: "visit_node",
        node,
        note: "vizitez nodul curent",
        vars: { order: [...order, node] },
      });

      order.push(node);

      for (const neighbor of adjacency[node] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);

          trace.push({
            type: "queue",
            action: "enqueue",
            node: neighbor,
            note: "adaug vecinul nevizitat",
            vars: { queue: [...queue], visited: Array.from(visited) },
          });
        }
      }
    }
  }

  trace.push({
    type: "done",
    result: { order },
    vars: { visited: Array.from(visited) },
  });

  return { trace, result: { order } };
}

export function dfs(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const adjacency: Record<string, string[]> = {};

  nodes.forEach((node) => {
    adjacency[node] = [];
  });

  edges.forEach((edge) => {
    if (adjacency[edge.from]) {
      adjacency[edge.from].push(edge.to);
    }
  });

  const trace: TraceEvent[] = [];
  const visited = new Set<string>();
  const order: string[] = [];
  const stack: string[] = [];

  if (start && adjacency[start]) {
    stack.push(start);

    trace.push({
      type: "queue",
      action: "enqueue",
      node: start,
      note: "adaug sursa în stack",
      vars: { stack: [...stack], visited: Array.from(visited) },
    });

    while (stack.length > 0) {
      const node = stack.pop()!;

      if (!visited.has(node)) {
        visited.add(node);
        order.push(node);

        trace.push({
          type: "visit_node",
          node,
          note: "vizitez nodul",
          vars: { stack: [...stack], visited: Array.from(visited), order: [...order] },
        });

        const neighbors = (adjacency[node] || [])
          .filter((n) => !visited.has(n))
          .reverse();

        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }

        if (neighbors.length > 0) {
          trace.push({
            type: "queue",
            action: "enqueue",
            node: neighbors[0],
            note: "adaug vecinii în stack",
            vars: { stack: [...stack], neighbors },
          });
        }
      }
    }
  }

  trace.push({
    type: "done",
    result: { order },
    vars: { visited: Array.from(visited) },
  });

  return { trace, result: { order } };
}

export function dijkstra(input: {
  nodes: string[];
  edges: Array<{ from: string; to: string; weight: number }>;
  start: string;
}): AlgorithmResult {
  const { nodes, edges, start } = input;
  const graph: Record<string, Array<[string, number]>> = {};

  nodes.forEach((node) => {
    graph[node] = [];
  });

  edges.forEach((edge) => {
    if (graph[edge.from]) {
      graph[edge.from].push([edge.to, edge.weight || 1]);
    }
  });

  const distances: Record<string, number> = {};
  nodes.forEach((node) => {
    distances[node] = Infinity;
  });

  if (!distances.hasOwnProperty(start)) {
    return {
      trace: [{ type: "done", result: { distances } }],
      result: { distances },
    };
  }

  distances[start] = 0;
  const trace: TraceEvent[] = [
    {
      type: "update_distance",
      node: start,
      distance: 0,
      note: "inițializez distanța pentru sursă",
      vars: { distances: { ...distances } },
    },
  ];

  const heap: Array<[number, string]> = [[0, start]];

  trace.push({
    type: "queue",
    action: "enqueue",
    node: start,
    note: "adaug sursa în coadă",
    vars: { heap: heap.map((h) => h[1]) },
  });

  while (heap.length > 0) {
    heap.sort((a, b) => a[0] - b[0]);
    const [currentDistance, node] = heap.shift()!;

    trace.push({
      type: "queue",
      action: "dequeue",
      node,
      note: "extrag nodul cu distanța minimă",
      vars: { current_distance: currentDistance },
    });

    if (currentDistance > distances[node]) continue;

    trace.push({
      type: "visit_node",
      node,
      note: "marchez nodul ca procesat",
      vars: { distances: { ...distances } },
    });

    for (const [neighbor, weight] of graph[node] || []) {
      const newDistance = currentDistance + weight;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;

        trace.push({
          type: "update_distance",
          node: neighbor,
          distance: newDistance,
          note: "găsesc drum mai scurt",
          vars: {
            from: node,
            neighbor,
            weight,
            distances: { ...distances },
          },
        });

        heap.push([newDistance, neighbor]);

        trace.push({
          type: "queue",
          action: "enqueue",
          node: neighbor,
          note: "actualizez coada cu noua distanță",
          vars: { heap: heap.map((h) => h[1]) },
        });
      }
    }
  }

  trace.push({
    type: "done",
    result: { distances },
    vars: { nodes },
  });

  return { trace, result: { distances } };
}

// Algorithm registry
export interface AlgorithmMeta {
  slug: string;
  name: string;
  complexity: string;
  description: string;
  category: string;
}

export const algorithms: Record<
  string,
  (input: any) => AlgorithmResult
> = {
  sortare_bule: bubbleSort,
  sortare_insertie: insertionSort,
  selection_sort: selectionSort,
  sortare_rapida: quickSort,
  cautare_binara: binarySearch,
  parcurgere_latime: bfs,
  parcurgere_adancime: dfs,
  dijkstra: dijkstra,
};

export const algorithmsMeta: AlgorithmMeta[] = [
  {
    slug: "sortare_bule",
    name: "Bubble Sort",
    complexity: "O(n²)",
    description: "Sortare prin compararea elementelor adiacente",
    category: "Sortare",
  },
  {
    slug: "sortare_insertie",
    name: "Insertion Sort",
    complexity: "O(n²)",
    description: "Sortare prin inserarea elementelor în poziția corectă",
    category: "Sortare",
  },
  {
    slug: "selection_sort",
    name: "Selection Sort",
    complexity: "O(n²)",
    description: "Sortare prin selecția repetată a minimului",
    category: "Sortare",
  },
  {
    slug: "sortare_rapida",
    name: "Quick Sort",
    complexity: "O(n log n)",
    description: "Sortare divide-and-conquer folosind pivot",
    category: "Sortare",
  },
  {
    slug: "cautare_binara",
    name: "Binary Search",
    complexity: "O(log n)",
    description: "Căutare în array sortat prin înjumătățire",
    category: "Căutare",
  },
  {
    slug: "parcurgere_latime",
    name: "BFS",
    complexity: "O(V + E)",
    description: "Parcurgere în lățime a grafului",
    category: "Grafuri",
  },
  {
    slug: "parcurgere_adancime",
    name: "DFS",
    complexity: "O(V + E)",
    description: "Parcurgere în adâncime a grafului",
    category: "Grafuri",
  },
  {
    slug: "dijkstra",
    name: "Dijkstra",
    complexity: "O((V + E) log V)",
    description: "Găsirea drumurilor cu cost minim",
    category: "Grafuri",
  },
];

export function runAlgorithm(slug: string, input: any): AlgorithmResult {
  const algo = algorithms[slug];
  if (!algo) {
    throw new Error(`Algorithm ${slug} not found`);
  }
  return algo(input);
}
