import { tree, Node_ } from "./binary.search.tree";

const max = (node?: Node_): number => {
  if (!node) return -Infinity;

  if (!node.left && !node.right) return node.value;

  return Math.max(max(node.left), max(node.right), node.value);
};

console.log(max(tree.root));
