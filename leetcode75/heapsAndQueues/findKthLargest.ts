function findKthLargest(nums: number[], k: number): number {
  k = nums.length - k;

  function quickSelect(start = 0, end = nums.length - 1): number {
    const pivot = nums[end];
    let p = start;

    for (let i = start; i < end; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        p++;
      }
    }

    [nums[end], nums[p]] = [nums[p], nums[end]];

    if (k === p) return nums[p];

    return k > p ? quickSelect(p + 1, end) : quickSelect(start, p - 1);
  }

  return quickSelect(0, nums.length - 1);
}

console.log(findKthLargest([7, 2, 1, 5, 6, 4], 3));
// console.log(findKthLargest([7], 2));
