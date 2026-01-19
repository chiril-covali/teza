# Sortarea cu bule

Parcurge repetat tabloul și interschimbă elementele adiacente când sunt în ordine greșită. Fiecare trecere mută spre final cel mai mare element rămas.

**Steps**
1. Start at the first pair and compare adjacent elements.
2. Swap if the left element is greater than the right.
3. Repeat for the rest of the array; after each pass, the tail is sorted.
4. Stop early if no swaps occur in a pass.

**Pseudocode**
```
repeat
  swapped <- false
  for i from 0 to n-2
    if a[i] > a[i+1]
      swap a[i], a[i+1]
      swapped <- true
until not swapped
```

**Use it when**
- Teaching basic comparison sorts.
- Small datasets or nearly-sorted arrays when simplicity matters more than speed.
