import { Node_, tree } from "./binary.search.tree";

const height = (node?: Node_): number => {
  if (!node?.left && !node?.right) return 0;

  return 1 + Math.max(height(node.left), height(node.right));
};

console.log(height(tree.root));
