function findPeakElement(nums: number[]): number {
  let l = 0;
  let r = nums.length - 1;

  while (true) {
    const middleIndex = Math.floor((l + r) / 2);
    const middle = nums[middleIndex];
    const leftNeighbor = nums[middleIndex - 1] || -Infinity;
    const rightNeighbor = nums[middleIndex + 1] || -Infinity;

    if (leftNeighbor > middle) {
      r = middleIndex - 1;
    } else if (rightNeighbor > middle) {
      l = middleIndex + 1;
    } else {
      return middleIndex;
    }
  }
}
