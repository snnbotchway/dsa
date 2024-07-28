const selectionSort = (nums: number[]) => {
  for (let i = 0; i < nums.length; i++) {
    let min = i;

    for (let j = i; j < nums.length; j++) {
      const num = nums[j];
      if (num < nums[min]) min = j;
    }

    const temp = nums[min];
    nums[min] = nums[i];
    nums[i] = temp;
  }

  return nums;
};

console.log(selectionSort([7, 6, 5, 4, 3, 2, 1, 1]));
