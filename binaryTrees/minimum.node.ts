import { Node_, tree } from "./binary.search.tree";

const minimum = (node?: Node_): number => {
  if (!node) return Infinity;

  if (!node.left && !node.right) return node.value;

  return Math.min(minimum(node.left), minimum(node.right), node.value);
};

console.log(minimum(tree.root));
