function uniqueOccurrences(arr: number[]): boolean {
  const frequency = new Map<number, number>();

  for (let n of arr) {
    frequency.set(n, (frequency.get(n) || 0) + 1);
  }

  return frequency.size == new Set(frequency.values()).size;
}

console.log(uniqueOccurrences([1, 2, 1, 1, 1, 3]));
