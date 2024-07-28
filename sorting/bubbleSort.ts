const bubbleSort = (nums: number[]) => {
  let sorted = true;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      // console.log(i, "i");
      //   console.log(nums.length - i - 1, "limit");
      //   console.log(nums, "nums");
      const num = nums[j];

      if (nums[j] > nums[j + 1]) {
        nums[j] = nums[j + 1];
        nums[j + 1] = num;
        sorted = false;
      }
    }
    if (sorted) break;
  }

  return nums;
};

console.log(bubbleSort([7, 6, 5, 4, 3, 2, 1]));
