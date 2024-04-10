function maxProfitMemo(prices: number[], fee: number): number {
  const memo = new Map<string, number>();

  function dp(i: number, canBuy: boolean): number {
    let profit = 0;
    if (i === prices.length) return profit;

    const key = `${i}_${canBuy}`;
    if (memo.has(key)) return memo.get(key)!;

    if (canBuy) {
      profit = Math.max(-prices[i] + dp(i + 1, false), dp(i + 1, true));
    } else {
      profit = Math.max(prices[i] - fee + dp(i + 1, true), dp(i + 1, false));
    }

    memo.set(key, profit);
    return profit;
  }

  return dp(0, true);
}

function maxProfit(prices: number[], fee: number): number {
  let free = 0;
  let hold = -prices[0];

  for (let i = 1; i < prices.length; i++) {
    const newFree = Math.max(free, hold + prices[i] - fee);
    const newHold = Math.max(hold, free + -prices[i]);
    free = newFree;
    hold = newHold;
  }

  return free;
}

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));
