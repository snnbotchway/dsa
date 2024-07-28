function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    const right = root.right;
    let lastRight = root.left;
    while (lastRight.right) lastRight = lastRight.right;
    lastRight.right = right;
    return root.left;
  }

  return root;
}
