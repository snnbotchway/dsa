// recursive memo
function robRecMemo(nums: number[]): number {
  const memo = new Array(nums.length);
  const lastIndex = nums.length - 1;
  memo[lastIndex] = nums[lastIndex];
  memo[lastIndex - 1] = nums[lastIndex - 1];

  function dp(i: number): number {
    if (nums[i] === undefined) return 0;
    if (memo[i] !== undefined) return memo[i];
    memo[i] = nums[i] + Math.max(dp(i + 2), dp(i + 3));
    return memo[i];
  }

  return Math.max(dp(0), dp(1));
}

// bottom up
function rob(nums: number[]): number {
  for (let i = nums.length - 1; i >= 0; i--) nums[i] += Math.max(nums[i + 2] || 0, nums[i + 3] || 0);
  return Math.max(nums[0], nums[1] || 0);
}

// 1, 100, 3, 1, 100
console.log(rob([1, 100, 3, 1, 1, 100]));
console.log(rob([1, 2, 3, 1]));
