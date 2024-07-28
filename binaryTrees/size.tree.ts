import { tree, Node_ } from "./binary.search.tree";

const size = (node?: Node_): number => {
  if (!node) return 0;

  if (!node.left && !node.right) return 1;

  return 1 + size(node.left) + size(node.right);
};

console.log(size(tree.root));
