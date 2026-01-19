# Căutare binară

Caută un element într-un tablou sortat prin înjumătățirea repetată a intervalului de căutare.

**Steps**
1. Set low/high pointers to the array bounds.
2. Check the middle element; if it matches, return.
3. If target < mid, search the left half; otherwise search the right half.
4. Stop when low > high (not found).

**Pseudocode**
```
lo <- 0; hi <- n-1
while lo <= hi:
  mid <- (lo + hi) // 2
  if a[mid] == target: return mid
  if a[mid] < target: lo <- mid + 1 else hi <- mid - 1
return -1
```

**Assumptions**
- Input array is sorted ascending.
