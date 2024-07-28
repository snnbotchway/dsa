export class AVLNode {
  value: number;
  left?: AVLNode;
  right?: AVLNode;
  height: number;

  constructor(value: number, left?: AVLNode, right?: AVLNode) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.height = 0;
  }
}

export class AVLTree {
  root?: AVLNode;

  constructor(root?: AVLNode) {
    this.root = root;
  }

  insert(value: number) {
    this.root = this._insert(value, this.root);
  }

  private _insert(value: number, root?: AVLNode): AVLNode {
    if (!root) return new AVLNode(value);

    if (value < root.value) {
      root.left = this._insert(value, root.left);
    } else {
      root.right = this._insert(value, root.right);
    }

    root.height = this.calculateHeight(root);

    return this.balance(root);
  }

  private calculateHeight(node: AVLNode) {
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  private balance(node: AVLNode): AVLNode {
    if (this.isLeftHeavy(node)) {
      if (this.balanceFactor(node.left) < 0) node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    } else if (this.isRightHeavy(node)) {
      if (this.balanceFactor(node.right) > 0) node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  private leftRotate(node: AVLNode): AVLNode {
    const newRoot = node.right!;
    node.right = newRoot.left;
    newRoot.left = node;

    node.height = this.calculateHeight(node);
    newRoot.height = this.calculateHeight(newRoot);

    return newRoot;
  }

  private rightRotate(node: AVLNode): AVLNode {
    const newRoot = node.left!;
    node.left = newRoot.right;
    newRoot.right = node;

    node.height = this.calculateHeight(node);
    newRoot.height = this.calculateHeight(newRoot);

    return newRoot;
  }

  private isLeftHeavy(node?: AVLNode): boolean {
    return this.balanceFactor(node) > 1;
  }

  private isRightHeavy(node?: AVLNode): boolean {
    return this.balanceFactor(node) < -1;
  }

  private balanceFactor(node?: AVLNode): number {
    return node ? this._height(node.left) - this._height(node.right) : 0;
  }

  height(): number {
    return this._height(this.root);
  }

  private _height(root?: AVLNode): number {
    return root ? root.height : -1;
  }
}

export const tree = new AVLTree();
// tree.insert(7);
// tree.insert(9);
// tree.insert(4);
// tree.insert(10);
// tree.insert(8);
// tree.insert(6);
// tree.insert(1);
// tree.insert(2);
// console.log(tree.height());

// tree.insert(5);
// tree.insert(10);
// tree.insert(3);
// tree.insert(12);
// tree.insert(15);
// tree.insert(14);

tree.insert(12);
tree.insert(3);
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(2);

console.log(tree.root);

export const tree2 = new AVLTree();
tree2.insert(7);
tree2.insert(9);
tree2.insert(4);
tree2.insert(10);
tree2.insert(8);
tree2.insert(6);
// tree2.insert(1);
