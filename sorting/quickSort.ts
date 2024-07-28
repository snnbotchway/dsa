const swap = (nums: number[], index1: number, index2: number) => {
  [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
};

const quickSort = (nums: number[]): number[] => {
  _quickSort(nums, 0, nums.length - 1);
  return nums;
};

const _quickSort = (nums: number[], start: number, pivot: number) => {
  let boundary = start - 1;
  if (start >= pivot) return;

  for (let i = start; i <= pivot; i++) {
    if (nums[i] <= nums[pivot]) {
      swap(nums, i, ++boundary);
    }
  }

  _quickSort(nums, 0, boundary - 1);
  _quickSort(nums, boundary + 1, pivot);
};

console.log(quickSort([8, 4, 2, 1, 3, 9, 8, 7, 6, 6, 6, 5, 5, 3, 3, 16]).toString());
console.log(quickSort([1, 6, 3]).toString());
// i = 2 // i = 2
// j = 1 // j = 0
// console.log(swap([1, 2, 3, 4], 2, 0));
