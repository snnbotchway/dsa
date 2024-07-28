import { Node_, tree } from "./binary.search.tree";

const siblings = (first: number, second: number, node?: Node_): boolean => {
  if (!node) return false;

  if (
    (node.left?.value == first && node.right?.value == second) ||
    (node.left?.value == second && node.right?.value == first)
  )
    return true;

  return siblings(first, second, node.left) || siblings(first, second, node.right);
};

console.log(siblings(1, 6, tree.root!));
