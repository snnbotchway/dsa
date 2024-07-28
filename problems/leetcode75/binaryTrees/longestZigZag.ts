function longestZigZag(root: TreeNode | null, dir: "l" | "r" | "" = "", currentSum = 0): number {
  if (!root) return currentSum;

  const leftSum = dir === "r" ? currentSum + 1 : 0;
  const rightSum = dir === "l" ? currentSum + 1 : 0;

  return Math.max(longestZigZag(root.left, "l", leftSum), longestZigZag(root.right, "r", rightSum));
}
