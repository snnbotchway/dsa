const countingSort = (nums: number[]): number[] => {
  const countsArray = new Array<number>(Math.max(...nums) + 1);
  countsArray.fill(0);

  for (const num of nums) {
    countsArray[num]++;
  }

  let index = 0;

  for (const countIndex in countsArray) {
    const num = countsArray[countIndex];
    for (let i = 1; i <= num; i++) {
      nums[index++] = Number(countIndex);
    }
  }

  console.log(countsArray, "counts array");

  return nums;
};

console.log(countingSort([8, 4, 2, 1, 3, 9, 8, 7, 6, 6, 6, 5, 5, 3, 3, 16]).toString());
console.log(countingSort([1, 6, 3]).toString());
// i = 2 // i = 2
// j = 1 // j = 0
// console.log(swap([1, 2, 3, 4], 2, 0));
