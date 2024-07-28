function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let mins = 0;
  let fresh = 0;
  const queue: number[][] = [];
  const rotten = new Set<string>();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        fresh++;
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
        rotten.add(`${i}${j}`);
      }
    }
  }

  while (queue.length && fresh) {
    // console.log(mins, "mins");

    const currentRotten = queue.length;
    // console.log(queue, "rotting...");

    for (let i = 0; i < currentRotten; i++) {
      const [row, col] = queue.shift()!;
      const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      for (const [row, col] of neighbors) {
        if (rotten.has(`${row}${col}`) || !grid[row]?.[col]) continue;

        rotten.add(`${row}${col}`);
        queue.push([row, col]);
        fresh--;
      }
    }
    mins++;
  }

  return fresh ? -1 : mins;
}

console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]),
);

console.log(
  orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ]),
);

console.log(orangesRotting([[0, 2]]));
console.log(orangesRotting([[0]]));
