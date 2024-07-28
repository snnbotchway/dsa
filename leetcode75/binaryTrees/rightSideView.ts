/**
 * First In First Out (FIFO)
 * with time complexity of O(1) for key operations
 */
class MyQueue<T> {
  private data: { [index: number]: T } = Object.create(null);
  private nextEnqueueIndex = 0;
  private lastDequeuedIndex = 0;

  /** Enqueues the item in O(1) */
  enqueue(item: T): void {
    this.data[this.nextEnqueueIndex] = item;
    this.nextEnqueueIndex++;
  }

  /**
   * Dequeues the first inserted item in O(1)
   * If there are no more items it returns `undefined`
   */
  dequeue(): T | undefined {
    if (this.lastDequeuedIndex !== this.nextEnqueueIndex) {
      const dequeued = this.data[this.lastDequeuedIndex];
      delete this.data[this.lastDequeuedIndex];
      this.lastDequeuedIndex++;
      return dequeued;
    }
  }

  /**
   * Returns the number of elements in the queue
   */
  size(): number {
    return this.nextEnqueueIndex - this.lastDequeuedIndex;
  }
}

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  const queue = new MyQueue<TreeNode>();
  queue.enqueue(root);
  const res: number[] = [];

  while (true) {
    const size = queue.size();
    if (!size) break;

    let right: TreeNode;

    for (let i = 1; i <= size; i++) {
      right = queue.dequeue()!;
      if (right.left) queue.enqueue(right.left);
      if (right.right) queue.enqueue(right.right);
    }

    res.push(right!.val);
  }

  return res;
}
