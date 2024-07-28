const insertionSort = (nums: number[]) => {
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    let j = i - 1;

    while (j >= 0 && nums[j] > num) {
      nums[j + 1] = nums[j];
      j--;
    }

    nums[j + 1] = num;
  }

  return nums;
};

console.log(insertionSort([6, 7, 5, 4, 3, 2, 1]));
// i = 2 // i = 2
// j = 1 // j = 0
