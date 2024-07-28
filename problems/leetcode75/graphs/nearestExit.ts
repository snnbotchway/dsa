function nearestExit(maze: string[][], entrance: number[]): number {
  const queue: [number[], number][] = [];
  queue.push([entrance, 0]);
  const visited = new Set<string>();

  while (queue.length) {
    const [cell, distance] = queue.shift()!;
    const [row, col] = cell;
    if (
      (row - 1 === -1 || col - 1 === -1 || col + 1 === maze[0].length || row + 1 === maze.length) &&
      !(row === entrance[0] && col === entrance[1])
    )
      return distance;

    const neighbors = [
      [row - 1, col],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col],
    ];
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      if (!maze[row]?.[col] || !(maze[row][col] === ".") || visited.has(neighbor.toString())) continue;

      visited.add(neighbor.toString());
      queue.push([neighbor, distance + 1]);
    }
  }

  return -1;
}

let maze = [
    ["+", "+", ".", "+"],
    [".", ".", ".", "+"],
    ["+", "+", "+", "."],
  ],
  entrance = [1, 2];
console.log(nearestExit(maze, entrance));

(maze = [
  ["+", "+", "+"],
  [".", ".", "."],
  ["+", "+", "+"],
]),
  (entrance = [1, 0]);
console.log(nearestExit(maze, entrance));

(maze = [[".", "+"]]), (entrance = [0, 0]);
console.log(nearestExit(maze, entrance));
