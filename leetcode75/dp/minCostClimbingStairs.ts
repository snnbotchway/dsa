// bottom up 1
function minCostClimbingStairsBU1(cost: number[]): number {
  // 10, 15, 20
  // [1,100,1,1,1,100,1,1,100,1]
  //  0,  1,2,3,4,  5,6,7,  8,9

  let topCost = 0; // 0, 1, 100, 2, 3, 102, 4, 5, 5, 105
  let lastStairCost = cost[cost.length - 1]; // 1, 100, 2, 3, 102, 4, 5, 5, 105, 6

  let i = cost.length - 2; // 8, 7, 6, 5, 4, 3, 2, 1, 0

  while (i >= 0) {
    const currentCost = cost[i--] + Math.min(topCost, lastStairCost); // 100+0, 1+1, 1+2, 100+2, 1+3, 1+4, 1+4, 100+5, 1+5
    topCost = lastStairCost;
    lastStairCost = currentCost;
  }

  return Math.min(topCost, lastStairCost);
}

// bottom up 2
function minCostClimbingStairsBU2(cost: number[]): number {
  cost.push(0);
  for (let i = cost.length - 3; i >= 0; i--) cost[i] += Math.min(cost[i + 1], cost[i + 2]);
  return Math.min(cost[0], cost[1]);
}

// recursive memoized
function minCostClimbingStairsRecMemo(cost: number[]): number {
  const memo = new Array(cost.length + 1);
  memo[cost.length - 1] = cost[cost.length - 1];
  memo[cost.length] = 0;

  function dp(i: number): number {
    if (memo[i] !== undefined) return memo[i];
    memo[i] = cost[i] + Math.min(dp(i + 1), dp(i + 2));
    return memo[i];
  }

  return Math.min(dp(0), dp(1));
}

console.log(minCostClimbingStairsRecMemo([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));
