function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return root;

  if (root.val == val) return root;

  if (val < root.val) return searchBST(root.left, val);

  return searchBST(root.right, val);
}
