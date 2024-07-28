const binarySearchRec = (nums: number[], num: number): number => {
  nums.sort();
  console.log(nums, "nums");
  return _binarySearchRec(nums, num, 0, nums.length - 1);
};

const _binarySearchRec = (nums: number[], num: number, start: number, end: number): number => {
  //   console.log(start, "start");
  //   console.log(end, "end");
  const middleIndex = Math.floor((end + start) / 2);
  //   console.log(middleIndex, "middleIndex");

  if (num == nums[middleIndex]) return middleIndex;
  if ([0, nums.length - 1].includes(middleIndex)) return -1;

  return num < nums[middleIndex]
    ? _binarySearchRec(nums, num, start, middleIndex - 1)
    : _binarySearchRec(nums, num, middleIndex + 1, end);
};
// console.log(binarySearchRec([], 7));

const binarySearchIterative = (nums: number[], num: number): number => {
  nums.sort();
  console.log(nums, "nums");

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((left + right) / 2);
    if (num == nums[middleIndex]) return middleIndex;

    if (num < nums[middleIndex]) {
      right = middleIndex - 1;
    } else {
      left = middleIndex + 1;
    }
  }

  return -1;
};

console.log(binarySearchIterative([], 4));
