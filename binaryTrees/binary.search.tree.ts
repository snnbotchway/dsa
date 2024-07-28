// @ts-ignore
export class Node_ {
  value: number;
  left?: Node_;
  right?: Node_;

  constructor(value: number, left?: Node_, right?: Node_) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  root?: Node_;

  constructor(root?: Node_) {
    this.root = root;
  }

  find(value: number): boolean {
    // console.log("start find", value);

    if (!this.root) {
      // console.log("not exist");
      return false;
    }

    let current: Node_ | undefined = this.root;
    while (current) {
      // console.log("the subtree now", current);

      if (current.value === value) {
        // console.log("value", value, "found");
        return true;
      }

      if (value > current.value) {
        // console.log("value greater");

        if (!current.right) {
          // console.log("not exist");
          return false;
        } else {
          // console.log(current.right.value, "is on the right of", current.value, ". Going there");
          current = current.right;
        }
      } else {
        // console.log("value less");
        if (!current.left) {
          // console.log("not exist");
          return false;
        } else {
          // console.log(current.left.value, "is on the left of", current.value, ". Going there");
          current = current.left;
        }
      }
    }

    // console.log("not exists[we shouldn't get here?]");
    return false;
  }

  insert(value: number) {
    // console.log("start insert", value);

    if (!this.root) {
      // console.log("setting", value, "as root");
      this.root = new Node_(value);
      return;
    }

    let current: Node_ | undefined = this.root;
    while (current) {
      // console.log("the tree now", this.root);

      if (current.value === value) return; /*console.log("Duplicate value, aborting...");*/

      if (value > current.value) {
        // console.log("value greater");

        if (!current.right) {
          current.right = new Node_(value);
          // console.log("Nothing on the right of", current.value, ". set it to", current.right);
          return;
        } else {
          // console.log(current.right.value, "is on the right of", current.value, ". Going there");
          current = current.right;
        }
      } else {
        // console.log("value less");
        if (!current.left) {
          current.left = new Node_(value);
          // console.log("Nothing on the left of", current.value, ". set it to", current.left);
          return;
        } else {
          // console.log(current.left.value, "is on the left of", current.value, ". Going there");
          current = current.left;
        }
      }
      // console.log("current is now", current);
    }
  }
}

export const tree = new Tree();
tree.insert(7);
tree.insert(9);
tree.insert(4);
tree.insert(10);
tree.insert(8);
tree.insert(6);
tree.insert(1);

export const tree2 = new Tree();
tree2.insert(7);
tree2.insert(9);
tree2.insert(4);
tree2.insert(10);
tree2.insert(8);
tree2.insert(6);
// tree2.insert(1);
