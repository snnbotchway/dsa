const ternarySearch = (nums: number[], num: number): number => {
  nums.sort();
  console.log(nums, "nums");
  return _ternarySearch(nums, num, 0, nums.length - 1);
};

const _ternarySearch = (nums: number[], num: number, start: number, end: number): number => {
  if (start > end) return -1;

  const size = Math.floor((end - start) / 2);
  const middle1 = start + size;
  const middle2 = end - size;

  if (num < nums[middle1]) return _ternarySearch(nums, num, start, middle1 - 1);
  if (num == nums[middle1]) return middle1;
  if (num > nums[middle2]) return _ternarySearch(nums, num, middle2 + 1, end);
  if (num == nums[middle2]) return middle2;

  return _ternarySearch(nums, num, middle1 + 1, middle2 - 1);
};
console.log(ternarySearch([1, 2, 3, 4, 5, 6, 7], 2));
