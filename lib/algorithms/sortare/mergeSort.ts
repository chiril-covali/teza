/**
 * Sorteaza elementele folosind metoda Merge Sort.
 */
export const mergeSort = (numbers: number[]): number[] => {
  if (numbers.length <= 1) {
    return [...numbers];
  }

  const mid = Math.floor(numbers.length / 2);
  const left = mergeSort(numbers.slice(0, mid));
  const right = mergeSort(numbers.slice(mid));

  const merged: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      merged.push(left[i]);
      i += 1;
    } else {
      merged.push(right[j]);
      j += 1;
    }
  }

  return [...merged, ...left.slice(i), ...right.slice(j)];
};
