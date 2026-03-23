/**
 * Cauta liniar un element intr-un vector.
 * Returneaza indexul sau -1 daca elementul nu exista.
 */
export const linearSearch = <T>(array: T[], target: T): number => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
};
