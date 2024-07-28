const mergeSort = (nums: number[]): number[] => {
  if (nums.length < 2) return nums;
  const midIndex = Math.floor(nums.length / 2);

  let first: number[] = [];
  let second: number[] = [];

  for (let i = 0; i < midIndex; i++) first.push(nums[i]);
  for (let i = midIndex; i < nums.length; i++) second.push(nums[i]);

  first = mergeSort(first);
  second = mergeSort(second);

  let firstIndex = 0;
  let secondIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    const currentFirst = first[firstIndex];
    const currentSecond = second[secondIndex];

    if (secondIndex == second.length || currentFirst < currentSecond) {
      nums[i] = currentFirst;
      firstIndex++;
    } else {
      nums[i] = currentSecond;
      secondIndex++;
    }
  }

  return nums;
};

console.log(mergeSort([8, 4, 2, 1, 3, 9, 8, 7, 6, 6, 6, 5, 5, 3, 3, 16]).toString());
// i = 2 // i = 2
// j = 1 // j = 0
