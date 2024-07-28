function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const nodes = new Map<string, { to: string; weight: number }[]>();

  for (let i = 0; i < equations.length; i++) {
    const [first, second] = equations[i];
    if (!nodes.has(first)) nodes.set(first, []);
    if (!nodes.has(second)) nodes.set(second, []);

    nodes.get(first)!.push({ to: second, weight: values[i] });
    nodes.get(second)!.push({ to: first, weight: 1 / values[i] });
  }

  // a - [b:2]
  // b - [c:3,a:0.5]
  // c - [b:0.33]

  // [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]

  return queries.map(([from, to]): number => {
    // console.log(`\n\nFrom: ${from}, To: ${to}`);
    if (!nodes.has(from) || !nodes.has(to)) {
      //   console.log(`From or to doesn't exist on graph! "-1" it is!`);
      return -1;
    }

    const visited = new Set<string>();
    const queue: [string, number][] = [];
    queue.push([from, 1]);

    while (queue.length) {
      const [from, multiplier] = queue.shift()!;

      if (from === to) return multiplier;

      for (const { to, weight } of nodes.get(from)!) {
        if (visited.has(to)) continue;

        visited.add(to);
        queue.push([to, weight * multiplier]);
      }
    }

    return -1;
  });
}

// const equations = [
//     ["a", "b"],
//     ["b", "c"],
//   ],
//   values = [2.0, 3.0],
//   queries = [
//     ["a", "c"],
//     ["b", "a"],
//     ["a", "e"],
//     ["a", "a"],
//     ["x", "x"],
//   ];

console.log(
  calcEquation(
    [
      ["x1", "x2"],
      ["x2", "x3"],
      ["x1", "x4"],
      ["x2", "x5"],
    ],
    [3.0, 0.5, 3.4, 5.6],
    [
      ["x2", "x4"],
      ["x1", "x5"],
      ["x1", "x3"],
      ["x5", "x5"],
      ["x5", "x1"],
      ["x3", "x4"],
      ["x4", "x3"],
      ["x6", "x6"],
      ["x0", "x0"],
    ],
  ),
);
