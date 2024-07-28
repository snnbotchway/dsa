function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    const leaves1:number[] = []
    const leaves2:number[] = []

    getLeaves(root1, leaves1)
    getLeaves(root2, leaves2)
    return leaves1.toString() === leaves2.toString()
};

function isLeaf(node:TreeNode):boolean{
    return !node.left && !node.right
}

function getLeaves(node:TreeNode|null, leaves:number[]){
    if(!node) return
    if(isLeaf(node)) leaves.push(node.val)

    getLeaves(node.left, leaves)
    getLeaves(node.right, leaves)
}
