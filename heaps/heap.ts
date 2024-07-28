class Heap {
  heap: number[] = [];

  insert(number: number) {
    const heap = this.heap;
    // console.log("Heap: ", heap);
    // console.log("Inserting", number);
    heap.push(number);

    const heapLength = heap.length;

    if (heapLength < 3) return;

    let currentIndex = heapLength - 1;
    const isMaxHeap = heap[0] > heap[1];

    while (true) {
      const currentNode = heap[currentIndex];
      const currentNodeParentIndex = Math.floor((currentIndex - 1) / 2);
      const currentNodeParent = heap[currentNodeParentIndex];

      if (isMaxHeap) {
        if (currentNode > currentNodeParent) {
          heap[currentNodeParentIndex] = currentNode;
          heap[currentIndex] = currentNodeParent;
        } else {
          break;
        }
      } else {
        if (currentNodeParent > currentNode) {
          heap[currentNodeParentIndex] = currentNode;
          heap[currentIndex] = currentNodeParent;
        } else {
          break;
        }
      }

      currentIndex = currentNodeParentIndex;
    }

    // console.log("Heap after inserting:", heap);
  }

  remove(): number | undefined {
    const heap = this.heap;
    const isMaxHeap = heap.length > 1 ? heap[0] > heap[1] : true;
    const lastNumber = heap.pop();

    if (heap.length === 0) return;
    heap[0] = lastNumber as number;

    let currentIndex = 0;
    console.log("heap before bubling", heap);
    while (true) {
      const currentNode = heap[currentIndex];
      const currentNodeLeftIndex = currentIndex * 2 + 1;
      const currentNodeRightIndex = currentNodeLeftIndex + 1;
      const currentNodeLeft = heap[currentNodeLeftIndex];
      const currentNodeRight = heap[currentNodeRightIndex];
      console.log(currentNode, "current");
      console.log(currentNodeLeft, "left");
      console.log(currentNodeRight, "right");

      if (isMaxHeap) {
        const biggerChild = Math.max(currentNodeLeft, currentNodeRight);
        console.log(biggerChild, "biggerChild");

        if (currentNode < biggerChild) {
          heap[currentIndex] = biggerChild;

          if (biggerChild === currentNodeLeft) {
            heap[currentNodeLeftIndex] = currentNode;
            currentIndex = currentNodeLeftIndex;
          } else {
            heap[currentNodeRightIndex] = currentNode;
            currentIndex = currentNodeRightIndex;
          }
        } else {
          break;
        }
      } else {
        const smallerChild = Math.min(currentNodeLeft, currentNodeRight);

        if (currentNode > smallerChild) {
          heap[currentIndex] = smallerChild;

          if (smallerChild === currentNodeLeft) {
            heap[currentNodeLeftIndex] = currentNode;
            currentIndex = currentNodeLeftIndex;
          } else {
            heap[currentNodeRightIndex] = currentNode;
            currentIndex = currentNodeRightIndex;
          }
        } else {
          break;
        }
      }
    }
  }

  parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  leftIndex(index: number) {
    return index * 2 + 1;
  }

  rightIndex(index: number) {
    return index * 2 + 2;
  }

  heapify(heap: number[]) {
    // let i = Math.floor(heap.length / 2 - 1); i >= 0; i--
    for (let i = Math.floor(heap.length / 2 - 1); i >= 0; i--) {
      // console.log(i);
      this.heapifyIndex(heap, i);
      // console.log(heap);
    }

    return heap;
  }

  heapifyIndex(heap: number[], index: number) {
    let largerIndex = index;

    const leftIndex = this.leftIndex(index);
    const rightIndex = this.rightIndex(index);

    if (leftIndex < heap.length && heap[leftIndex] > heap[largerIndex]) largerIndex = leftIndex;
    if (rightIndex < heap.length && heap[rightIndex] > heap[largerIndex]) largerIndex = rightIndex;

    if (index == largerIndex) return;

    this.swap(heap, index, largerIndex);
    this.heapifyIndex(heap, largerIndex);
  }

  swap(heap: number[], firstIndex: number, secondIndex: number): void {
    [heap[firstIndex], heap[secondIndex]] = [heap[secondIndex], heap[firstIndex]];
  }
}

const heap = new Heap();
heap.insert(15);
heap.insert(10);
heap.insert(3);
heap.insert(8);
heap.insert(12);
heap.insert(9);
heap.insert(4);
// heap.insert(1);
heap.insert(24);
// heap.insert(10);
// heap.insert(5);
// heap.insert(17);
// heap.insert(4);
// heap.insert(5);
// console.log(heap.heap);
// heap.remove();
// console.log(heap.heap);
console.log(heap.heapify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
// console.log(heap.heapify([5, 3, 8, 4, 1, 2]));
