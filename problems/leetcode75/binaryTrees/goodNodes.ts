function goodNodes(root: TreeNode | null, max=-Infinity): number {
    let count = 0
    if(!root) return count

    if(root.val >= max){
        count++
        max = root.val
    }

    return count + goodNodes(root.left, max) + goodNodes(root.right, max)
};