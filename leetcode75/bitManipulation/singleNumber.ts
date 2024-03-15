function singleNumber(nums: number[]): number {
  let ans = 0;
  for (const num of nums) ans ^= num;
  return ans;
}

console.log(singleNumber([1, 2, 3, 4, 3, 4, 2]));
