function maxLevelSum(root: TreeNode): number {
  const queue: TreeNode[] = [];
  queue.push(root);

  let maxLevel = 1;
  let currentLevel = 1;
  let max = root.val;

  while (queue.length) {
    const currentLength = queue.length;
    let currentSum = 0;

    for (let i = 1; i <= currentLength; i++) {
      const node = queue.shift()!;
      currentSum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (currentSum > max) {
      max = currentSum;
      maxLevel = currentLevel;
    }

    currentLevel++;
  }

  return maxLevel;
}
