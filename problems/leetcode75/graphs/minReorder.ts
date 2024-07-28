function minReorder(n: number, connections: number[][]): number {
  const visited = new Set<number>();
  visited.add(0);

  let swaps = 0;
  const neighbors = new Map<number, number[]>();
  const edges = new Set<string>();

  for (const [from, to] of connections) {
    if (!neighbors.has(from)) neighbors.set(from, []);
    if (!neighbors.has(to)) neighbors.set(to, []);

    neighbors.get(from)!.push(to);
    neighbors.get(to)!.push(from);

    edges.add([from, to].toString());
  }

  function dfs(city: number) {
    for (const neighbor of neighbors.get(city)!) {
      if (visited.has(neighbor)) continue;

      if (!edges.has([neighbor, city].toString())) swaps++;
      visited.add(neighbor);
      dfs(neighbor);
    }
  }

  dfs(0);

  return swaps;
}
