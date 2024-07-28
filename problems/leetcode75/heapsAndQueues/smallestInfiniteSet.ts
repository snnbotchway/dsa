class SmallestInfiniteSet {
  min = 1;
  popped = new Set<number>();

  popSmallest(): number {
    let min = this.min;
    this.popped.add(min);
    let next = min + 1;

    while (this.popped.has(next)) next++;
    this.min = next;
    return min;
  }

  addBack(num: number): void {
    if (num < this.min) this.min = num;
    this.popped.delete(num);
  }
}

var obj = new SmallestInfiniteSet();
console.log(obj.popSmallest());
console.log(obj.popSmallest());
console.log(obj.popSmallest());
console.log(obj.popSmallest());
obj.addBack(2);
console.log(obj.popSmallest());
console.log(obj.popSmallest());
console.log(obj.popSmallest());
