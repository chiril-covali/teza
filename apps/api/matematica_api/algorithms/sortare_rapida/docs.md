# Sortarea rapidă

Sortează prin divide-et-impera: alege un pivot, împarte tabloul în elemente mai mici și mai mari decât pivotul, apoi sortează recursiv partițiile.

**Steps**
1. Pick a pivot (here: last element of the current subarray).
2. Partition so that elements < pivot move left and > pivot move right.
3. Recursively sort left and right partitions.

**Pseudocode**
```
quick_sort(a, lo, hi):
  if lo >= hi: return
  p <- partition(a, lo, hi)
  quick_sort(a, lo, p-1)
  quick_sort(a, p+1, hi)
```

**Notes**
- Average time: O(n log n); worst: O(n^2) when pivot choice is poor.
- In-place except for recursion stack.
