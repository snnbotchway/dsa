import { tree, Node_ } from "./binary.search.tree";

const validate = (node?: Node_, min = -Infinity, max = Infinity): boolean => {
  if (!node) return true;

  console.log(node.value, min, max);

  if (node.value < min || node.value > max) return false;

  return validate(node.left, min, node.value - 1) && validate(node.right, node.value + 1, max);
};

tree.root!.right!.value = 5;
console.log(validate(tree.root));
