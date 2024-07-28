function pathSum(root: TreeNode | null, targetSum: number, prefix = new Map<number, number>(), currentSum=0, count = {val:0}): number {
    if(!root) return 0

    currentSum += root.val

    if(currentSum == targetSum) count.val += 1
    if(prefix.get(currentSum - targetSum)) count.val += prefix.get(currentSum - targetSum)!
    prefix.set(currentSum, (prefix.get(currentSum) || 0) + 1)
    
    pathSum(root.left, targetSum, prefix, currentSum, count)
    pathSum(root.right, targetSum, prefix, currentSum, count)

    if(prefix.has(currentSum)) prefix.set(currentSum, prefix.get(currentSum)! - 1)

    return count.val
};

const root = new TreeNode(10, new TreeNode(5, new TreeNode(3, new TreeNode(3), new TreeNode(-2)), new TreeNode(2, null, new TreeNode(1))), new TreeNode(-3, null, new TreeNode(11)))
console.log(pathSum(root, 8))
