import { tree, Node_ } from "./binary.search.tree";

const nodesAtKDistance = (distance: number, node?: Node_) => {
  if (!node) return;

  if (distance == 0) return console.log(node.value);
  if (!node.left && !node.right) return;

  nodesAtKDistance(distance - 1, node.left);
  nodesAtKDistance(distance - 1, node.right);
};

// tree.root!.right!.value = 5;
console.log(nodesAtKDistance(0, tree.root!));
