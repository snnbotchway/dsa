import { Node_, Tree, tree, tree2 } from "./binary.search.tree";

const equal = (root1?: Node_, root2?: Node_): boolean => {
  if (!root1 && !root2) return true;

  if ((!root1?.left && !root1?.right) || (!root2?.left && !root2?.right)) return root1?.value == root2?.value;

  return equal(root1.left, root2.left) && equal(root1.right, root2.right);
};

console.log(equal(tree.root, tree2.root));
