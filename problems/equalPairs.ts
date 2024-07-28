function equalPairs(grid: number[][]): number {
  const columns = new Map<number, Array<number>>();

  for (const row of grid) {
    for (let i = 0; i < grid.length; i++) {
      const column = columns.get(i) || [];
      column.push(row[i]);
      columns.set(i, column);
    }
  }

  const columnFrequency = new Map<string, number>();
  for (let i = 0; i < grid.length; i++) {
    const columnKey = columns.get(i)!.toString();
    columnFrequency.set(columnKey, (columnFrequency.get(columnKey) || 0) + 1);
    columns.delete(i);
  }

  let count = 0;

  for (let i = 0; i < grid.length; i++) count += columnFrequency.get(grid[i].toString()) || 0;

  return count;
}

console.log(
  equalPairs([
    [3, 2, 1],
    [1, 7, 6],
    [2, 7, 7],
  ]),
);

console.log(
  equalPairs([
    [3, 1, 2, 2],
    [1, 4, 4, 4],
    [2, 4, 2, 2],
    [2, 5, 2, 2],
  ]),
);
