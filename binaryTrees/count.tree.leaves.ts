import { tree, Node_ } from "./binary.search.tree";

const countLeaves = (node?: Node_): number => {
  if (!node) return 0;

  if (!node.left && !node.right) return 1;

  return countLeaves(node.left) + countLeaves(node.right);
};

console.log(countLeaves(tree.root));
