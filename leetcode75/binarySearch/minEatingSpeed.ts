function minEatingSpeed(piles: number[], h: number): number {
  let left = Math.ceil(piles.reduce((acc, curr) => acc + curr, 0) / h);
  let right = Math.max(...piles);
  let ans = right;

  while (left <= right) {
    const speed = Math.floor((left + right) / 2);
    const hoursRequired = piles.reduce((acc, curr) => acc + Math.ceil(curr / speed), 0);

    if (h >= hoursRequired) {
      ans = speed;
      right = speed - 1;
    } else {
      left = speed + 1;
    }
  }

  return ans;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8));
console.log(minEatingSpeed([312884470], 312884469));
