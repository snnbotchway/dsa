import { Node_, tree } from "./binary.search.tree";

const find = (value: number, node?: Node_): boolean => {
  if (!node) return false;

  if (node.value == value) return true;

  return find(value, node.left) || find(value, node.right);
};

console.log(find(4, tree.root!));
