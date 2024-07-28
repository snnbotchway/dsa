import { tree, Node_ } from "./binary.search.tree";

const traversePreOrder = (node?: Node_) => {
  if (!node) return;

  console.log(node.value);
  traversePreOrder(node.left);
  traversePreOrder(node.right);
};

const traverseInOrder = (node?: Node_) => {
  if (!node) return;

  traverseInOrder(node.left);
  console.log(node.value);
  traverseInOrder(node.right);
};

const traversePostOrder = (node?: Node_) => {
  if (!node) return;

  traversePostOrder(node.left);
  traversePostOrder(node.right);
  console.log(node.value);
};

traversePreOrder(tree.root!);
traverseInOrder(tree.root!);
traversePostOrder(tree.root!);
