/**
 * Sorteaza elementele folosind metoda Quick Sort.
 */
export const quickSort = (numbers: number[]): number[] => {
  if (numbers.length <= 1) {
    return [...numbers];
  }

  const [pivot, ...rest] = numbers;
  const left = rest.filter((n) => n <= pivot);
  const right = rest.filter((n) => n > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
};
