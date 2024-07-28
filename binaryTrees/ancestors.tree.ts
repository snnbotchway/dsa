import { Node_, tree } from "./binary.search.tree";

const ancestors = (value: number, list: number[], node?: Node_): boolean => {
  if (!node) return false;

  if (node.value == value) return true;

  if (ancestors(value, list, node.left) || ancestors(value, list, node.right)) {
    list.push(node.value);
    return true;
  }

  return false;
};

const list: number[] = [];
ancestors(7, list, tree.root!);
console.log(list);
