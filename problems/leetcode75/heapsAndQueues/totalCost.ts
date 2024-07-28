type Comparator<T> = (a: T, b: T) => number;
type IsEqual<T> = (e: T, o: T) => boolean;

const toInt = (n: number): number => ~~n;

/**
 * MyHeap
 * @type {Class}
 */
class MyHeap<T> implements Iterable<T> {
  heapArray: Array<T> = [];
  _limit = 0;

  /**
   * Alias of {@link add}
   * @see add
   */
  offer = this.add;

  /**
   * Alias of {@link peek}
   * @see peek
   */
  element = this.peek;

  /**
   * Alias of {@link pop}
   * @see pop
   */
  poll = this.pop;

  /**
   * Alias of {@link clear}
   * @see clear
   */
  removeAll = this.clear;

  /**
   * MyHeap instance constructor.
   * @param  {Function} compare Optional comparison function, defaults to MyHeap.minComparator<number>
   */
  constructor(public compare: Comparator<T> = MyHeap.minComparator) {}

  /*
            Static methods
   */

  /**
   * Gets children indices for given index.
   * @param  {Number} idx     Parent index
   * @return {Array(Number)}  Array of children indices
   */
  static getChildrenIndexOf(idx: number): Array<number> {
    return [idx * 2 + 1, idx * 2 + 2];
  }

  /**
   * Gets parent index for given index.
   * @param  {Number} idx  Children index
   * @return {Number | undefined}      Parent index, -1 if idx is 0
   */
  static getParentIndexOf(idx: number): number {
    if (idx <= 0) {
      return -1;
    }
    const whichChildren = idx % 2 ? 1 : 2;
    return Math.floor((idx - whichChildren) / 2);
  }

  /**
   * Gets sibling index for given index.
   * @param  {Number} idx  Children index
   * @return {Number | undefined}      Sibling index, -1 if idx is 0
   */
  static getSiblingIndexOf(idx: number): number {
    if (idx <= 0) {
      return -1;
    }
    const whichChildren = idx % 2 ? 1 : -1;
    return idx + whichChildren;
  }

  /**
   * Min heap comparison function, default.
   * @param  {any} a     First element
   * @param  {any} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static minComparator<N>(a: N, b: N): number {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Max heap comparison function.
   * @param  {any} a     First element
   * @param  {any} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static maxComparator<N>(a: N, b: N): number {
    if (b > a) {
      return 1;
    } else if (b < a) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Min number heap comparison function, default.
   * @param  {Number} a     First element
   * @param  {Number} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static minComparatorNumber(a: number, b: number): number {
    return a - b;
  }

  /**
   * Max number heap comparison function.
   * @param  {Number} a     First element
   * @param  {Number} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static maxComparatorNumber(a: number, b: number): number {
    return b - a;
  }

  /**
   * Default equality function.
   * @param  {any} a    First element
   * @param  {any} b    Second element
   * @return {Boolean}  True if equal, false otherwise
   */
  static defaultIsEqual<N>(a: N, b: N): boolean {
    return a === b;
  }

  /**
   * Prints a heap.
   * @param  {MyHeap} heap MyHeap to be printed
   * @returns {String}
   */
  static print<N>(heap: MyHeap<N>): string {
    function deep(i: number) {
      const pi = MyHeap.getParentIndexOf(i);
      return Math.floor(Math.log2(pi + 1));
    }

    function repeat(str: string, times: number) {
      let out = "";
      for (; times > 0; --times) {
        out += str;
      }
      return out;
    }

    let node = 0;
    const lines: Array<Array<string>> = [];
    const maxLines = deep(heap.length - 1) + 2;
    let maxLength = 0;

    while (node < heap.length) {
      let i = deep(node) + 1;
      if (node === 0) {
        i = 0;
      }
      // Text representation
      const nodeText = String(heap.get(node));
      if (nodeText.length > maxLength) {
        maxLength = nodeText.length;
      }
      // Add to line
      lines[i] = lines[i] || [];
      lines[i].push(nodeText);
      node += 1;
    }

    return lines
      .map((line, i) => {
        const times = Math.pow(2, maxLines - i) - 1;
        return (
          repeat(" ", Math.floor(times / 2) * maxLength) +
          line
            .map((el) => {
              // centered
              const half = (maxLength - el.length) / 2;
              return repeat(" ", Math.ceil(half)) + el + repeat(" ", Math.floor(half));
            })
            .join(repeat(" ", times * maxLength))
        );
      })
      .join("\n");
  }

  /*
            Python style
   */
  /**
   * Converts an array into an array-heap, in place
   * @param  {Array}    arr      Array to be modified
   * @param  {Function} compare  Optional compare function
   * @return {MyHeap}              For convenience, it returns a MyHeap instance
   */
  static heapify<N>(arr: Array<N>, compare?: Comparator<N>): MyHeap<N> {
    const heap = new MyHeap(compare);
    heap.heapArray = arr;
    heap.init();
    return heap;
  }
  /**
   * Extract the peek of an array-heap
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {Function} compare  Optional compare function
   * @return {any}               Returns the extracted peek
   */
  static heappop<N>(heapArr: Array<N>, compare?: Comparator<N>): N | undefined {
    const heap = new MyHeap(compare);
    heap.heapArray = heapArr;
    return heap.pop();
  }
  /**
   * Pushes a item into an array-heap
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {any}      item     Item to push
   * @param  {Function} compare  Optional compare function
   */
  static heappush<N>(heapArr: Array<N>, item: N, compare?: Comparator<N>): void {
    const heap = new MyHeap(compare);
    heap.heapArray = heapArr;
    heap.push(item);
  }
  /**
   * Push followed by pop, faster
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {any}      item     Item to push
   * @param  {Function} compare  Optional compare function
   * @return {any}               Returns the extracted peek
   */
  static heappushpop<N>(heapArr: Array<N>, item: N, compare?: Comparator<N>): N {
    const heap = new MyHeap(compare);
    heap.heapArray = heapArr;
    return heap.pushpop(item);
  }
  /**
   * Replace peek with item
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {any}      item     Item as replacement
   * @param  {Function} compare  Optional compare function
   * @return {any}               Returns the extracted peek
   */
  static heapreplace<N>(heapArr: Array<N>, item: N, compare?: Comparator<N>): N {
    const heap = new MyHeap(compare);
    heap.heapArray = heapArr;
    return heap.replace(item);
  }

  /**
   * Return the `n` most valuable elements of a heap-like Array
   * @param  {Array}    heapArr  Array, should be an array-heap
   * @param  {number}   n        Max number of elements
   * @param  {Function} compare  Optional compare function
   * @return {any}               Elements
   */
  static heaptop<N>(heapArr: Array<N>, n = 1, compare?: Comparator<N>): Array<N> {
    const heap = new MyHeap(compare);
    heap.heapArray = heapArr;
    return heap.top(n);
  }

  /**
   * Return the `n` least valuable elements of a heap-like Array
   * @param  {Array}    heapArr  Array, should be an array-heap
   * @param  {number}   n        Max number of elements
   * @param  {Function} compare  Optional compare function
   * @return {any}               Elements
   */
  static heapbottom<N>(heapArr: Array<N>, n = 1, compare?: Comparator<N>): Array<N> {
    const heap = new MyHeap(compare);
    heap.heapArray = heapArr;
    return heap.bottom(n);
  }

  /**
   * Return the `n` most valuable elements of an iterable
   * @param  {number}   n        Max number of elements
   * @param  {Iterable} Iterable Iterable list of elements
   * @param  {Function} compare  Optional compare function
   * @return {any}               Elements
   */
  static nlargest<N>(n: number, iterable: Iterable<N>, compare?: Comparator<N>): Array<N> {
    const heap = new MyHeap(compare);
    heap.heapArray = [...iterable];
    heap.init();
    return heap.top(n);
  }

  /**
   * Return the `n` least valuable elements of an iterable
   * @param  {number}   n        Max number of elements
   * @param  {Iterable} Iterable Iterable list of elements
   * @param  {Function} compare  Optional compare function
   * @return {any}               Elements
   */
  static nsmallest<N>(n: number, iterable: Iterable<N>, compare?: Comparator<N>): Array<N> {
    const heap = new MyHeap(compare);
    heap.heapArray = [...iterable];
    heap.init();
    return heap.bottom(n);
  }

  /*
            Instance methods
   */

  /**
   * Adds an element to the heap. Aliases: {@link offer}.
   * Same as: {@link push}(element).
   * @param {any} element Element to be added
   * @return {Boolean} true
   */
  add(element: T): boolean {
    this._sortNodeUp(this.heapArray.push(element) - 1);
    this._applyLimit();
    return true;
  }

  /**
   * Adds an array of elements to the heap.
   * Similar as: {@link push}(element, element, ...).
   * @param {Array} elements Elements to be added
   * @return {Boolean} true
   */
  addAll(elements: Array<T>): boolean {
    let i = this.length;
    this.heapArray.push(...elements);
    for (const l = this.length; i < l; ++i) {
      this._sortNodeUp(i);
    }
    this._applyLimit();
    return true;
  }

  /**
   * Return the bottom (lowest value) N elements of the heap.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  bottom(n = 1): Array<T> {
    if (this.heapArray.length === 0 || n <= 0) {
      // Nothing to do
      return [];
    } else if (this.heapArray.length === 1) {
      // Just the peek
      return [this.heapArray[0]];
    } else if (n >= this.heapArray.length) {
      // The whole heap
      return [...this.heapArray];
    } else {
      // Some elements
      return this._bottomN_push(~~n);
    }
  }

  /**
   * Check if the heap is sorted, useful for testing purposes.
   * @return {Undefined | Element}  Returns an element if something wrong is found, otherwise it's undefined
   */
  check(): T | undefined {
    return this.heapArray.find((el: T, j: number) => !!this.getChildrenOf(j).find((ch) => this.compare(el, ch) > 0));
  }

  /**
   * Remove all of the elements from this heap.
   */
  clear(): void {
    this.heapArray = [];
  }

  /**
   * Clone this heap
   * @return {MyHeap}
   */
  clone(): MyHeap<T> {
    const cloned = new MyHeap<T>(this.comparator());
    cloned.heapArray = this.toArray();
    cloned._limit = this._limit;
    return cloned;
  }

  /**
   * Returns the comparison function.
   * @return {Function}
   */
  comparator(): Comparator<T> {
    return this.compare;
  }

  /**
   * Returns true if this queue contains the specified element.
   * @param  {any}      o   Element to be found
   * @param  {Function} callbackFn  Optional comparison function, receives (element, needle)
   * @return {Boolean}
   */
  contains(o: T, callbackFn: IsEqual<T> = MyHeap.defaultIsEqual): boolean {
    return this.indexOf(o, callbackFn) !== -1;
  }

  /**
   * Initialize a heap, sorting nodes
   * @param  {Array} array Optional initial state array
   */
  init(array?: Array<T>): void {
    if (array) {
      this.heapArray = [...array];
    }
    for (let i = Math.floor(this.heapArray.length); i >= 0; --i) {
      this._sortNodeDown(i);
    }
    this._applyLimit();
  }

  /**
   * Test if the heap has no elements.
   * @return {Boolean} True if no elements on the heap
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Get the index of the first occurrence of the element in the heap (using the comparator).
   * @param  {any}      element    Element to be found
   * @param  {Function} callbackFn Optional comparison function, receives (element, needle)
   * @return {Number}              Index or -1 if not found
   */
  indexOf(element: T, callbackFn: IsEqual<T> = MyHeap.defaultIsEqual): number {
    if (this.heapArray.length === 0) {
      return -1;
    }
    const indexes: number[] = [];
    let currentIndex = 0;
    while (currentIndex < this.heapArray.length) {
      const currentElement = this.heapArray[currentIndex];
      if (callbackFn(currentElement, element)) {
        return currentIndex;
      } else if (this.compare(currentElement, element) <= 0) {
        indexes.push(...MyHeap.getChildrenIndexOf(currentIndex));
      }
      currentIndex = indexes.shift() || this.heapArray.length;
    }
    return -1;
  }

  /**
   * Get the indexes of the every occurrence of the element in the heap (using the comparator).
   * @param  {any}      element    Element to be found
   * @param  {Function} callbackFn Optional comparison function, receives (element, needle)
   * @return {Array}               Array of indexes or empty array if not found
   */
  indexOfEvery(element: T, callbackFn: IsEqual<T> = MyHeap.defaultIsEqual): number[] {
    if (this.heapArray.length === 0) {
      return [];
    }
    const indexes: number[] = [];
    const foundIndexes: number[] = [];
    let currentIndex = 0;
    while (currentIndex < this.heapArray.length) {
      const currentElement = this.heapArray[currentIndex];
      if (callbackFn(currentElement, element)) {
        foundIndexes.push(currentIndex);
        indexes.push(...MyHeap.getChildrenIndexOf(currentIndex));
      } else if (this.compare(currentElement, element) <= 0) {
        indexes.push(...MyHeap.getChildrenIndexOf(currentIndex));
      }
      currentIndex = indexes.shift() || this.heapArray.length;
    }
    return foundIndexes;
  }

  /**
   * Get the leafs of the tree (no children nodes).
   * See also: {@link getChildrenOf} and {@link bottom}.
   * @return {Array}
   * @see getChildrenOf
   * @see bottom
   */
  leafs(): Array<T> {
    if (this.heapArray.length === 0) {
      return [];
    }
    const pi = MyHeap.getParentIndexOf(this.heapArray.length - 1);
    return this.heapArray.slice(pi + 1);
  }

  /**
   * Length of the heap. Aliases: {@link size}.
   * @return {Number}
   * @see size
   */
  get length(): number {
    return this.heapArray.length;
  }

  /**
   * Get length limit of the heap.
   * Use {@link setLimit} or {@link limit} to set the limit.
   * @return {Number}
   * @see setLimit
   */
  get limit(): number {
    return this._limit;
  }

  /**
   * Set length limit of the heap. Same as using {@link setLimit}.
   * @description If the heap is longer than the limit, the needed amount of leafs are removed.
   * @param {Number} _l Limit, defaults to 0 (no limit). Negative, Infinity, or NaN values set the limit to 0.
   * @see setLimit
   */
  set limit(_l: number) {
    if (_l < 0 || isNaN(_l)) {
      // NaN, negative, and Infinity are treated as 0
      this._limit = 0;
    } else {
      // truncating a floating-point number to an integer
      this._limit = ~~_l;
    }
    this._applyLimit();
  }

  /**
   * Set length limit of the heap.
   * Same as assigning to {@link limit} but returns NaN if the value was invalid.
   * @param {Number} _l Limit. Negative, Infinity, or NaN values set the limit to 0.
   * @return {Number} The limit or NaN if the value was negative, or NaN.
   * @see limit
   */
  setLimit(_l: number): number {
    this.limit = _l;
    if (_l < 0 || isNaN(_l)) {
      return NaN;
    } else {
      return this._limit;
    }
  }

  /**
   * Top node. Aliases: {@link element}.
   * Same as: {@link top}(1)[0].
   * @return {any} Top node
   * @see top
   */
  peek(): T | undefined {
    return this.heapArray[0];
  }

  /**
   * Extract the top node (root). Aliases: {@link poll}.
   * @return {any} Extracted top node, undefined if empty
   */
  pop(): T | undefined {
    const last = this.heapArray.pop();
    if (this.length > 0 && last !== undefined) {
      return this.replace(last);
    }
    return last;
  }

  /**
   * Pushes element(s) to the heap.
   * See also: {@link add} and {@link addAll}.
   * @param  {...any} elements Elements to insert
   * @return {Boolean} True if elements are present
   */
  push(...elements: Array<T>): boolean {
    if (elements.length < 1) {
      return false;
    } else if (elements.length === 1) {
      return this.add(elements[0]);
    } else {
      return this.addAll(elements);
    }
  }

  /**
   * Same as push & pop in sequence, but faster
   * @param  {any} element Element to insert
   * @return {any}  Extracted top node
   */
  pushpop(element: T): T {
    if (this.compare(this.heapArray[0], element) < 0) {
      [element, this.heapArray[0]] = [this.heapArray[0], element];
      this._sortNodeDown(0);
    }
    return element;
  }

  /**
   * Remove the first occurrence of an element from the heap.
   * @param  {any}   o      Element to be found
   * @param  {Function} callbackFn  Optional equality function, receives (element, needle)
   * @return {Boolean}      True if the heap was modified
   */
  remove(o?: T, callbackFn: IsEqual<T> = MyHeap.defaultIsEqual): boolean {
    if (this.length > 0) {
      if (o === undefined) {
        this.pop();
        return true;
      } else {
        const idx = this.indexOf(o, callbackFn);
        if (idx >= 0) {
          if (idx === 0) {
            this.pop();
          } else if (idx === this.length - 1) {
            this.heapArray.pop();
          } else {
            this.heapArray.splice(idx, 1, this.heapArray.pop() as T);
            this._sortNodeUp(idx);
            this._sortNodeDown(idx);
          }
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Pop the current peek value, and add the new item.
   * @param  {any} element  Element to replace peek
   * @return {any}         Old peek
   */
  replace(element: T): T {
    const peek = this.heapArray[0];
    this.heapArray[0] = element;
    this._sortNodeDown(0);
    return peek;
  }

  /**
   * Size of the heap
   * @return {Number}
   */
  size(): number {
    return this.length;
  }

  /**
   * Return the top (highest value) N elements of the heap.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}    Array of length <= N.
   */
  top(n = 1): Array<T> {
    if (this.heapArray.length === 0 || n <= 0) {
      // Nothing to do
      return [];
    } else if (this.heapArray.length === 1 || n === 1) {
      // Just the peek
      return [this.heapArray[0]];
    } else if (n >= this.heapArray.length) {
      // The whole peek
      return [...this.heapArray];
    } else {
      // Some elements
      return this._topN_push(~~n);
    }
  }

  /**
   * Clone the heap's internal array
   * @return {Array}
   */
  toArray(): Array<T> {
    return [...this.heapArray];
  }

  /**
   * String output, call to Array.prototype.toString()
   * @return {String}
   */
  toString(): string {
    return this.heapArray.toString();
  }

  /**
   * Get the element at the given index.
   * @param  {Number} i Index to get
   * @return {any}       Element at that index
   */
  get(i: number): T {
    return this.heapArray[i];
  }

  /**
   * Get the elements of these node's children
   * @param  {Number} idx Node index
   * @return {Array(any)}  Children elements
   */
  getChildrenOf(idx: number): Array<T> {
    return MyHeap.getChildrenIndexOf(idx)
      .map((i) => this.heapArray[i])
      .filter((e) => e !== undefined);
  }

  /**
   * Get the element of this node's parent
   * @param  {Number} idx Node index
   * @return {any}     Parent element
   */
  getParentOf(idx: number): T | undefined {
    const pi = MyHeap.getParentIndexOf(idx);
    return this.heapArray[pi];
  }

  /**
   * Iterator interface
   */
  *[Symbol.iterator](): Iterator<T> {
    while (this.length) {
      yield this.pop() as T;
    }
  }

  /**
   * Returns an iterator. To comply with Java interface.
   */
  iterator(): Iterable<T> {
    return this.toArray();
  }

  /**
   * Limit heap size if needed
   */
  _applyLimit(): void {
    if (this._limit > 0 && this._limit < this.heapArray.length) {
      let rm = this.heapArray.length - this._limit;
      // It's much faster than splice
      while (rm) {
        this.heapArray.pop();
        --rm;
      }
    }
  }

  /**
   * Return the bottom (lowest value) N elements of the heap, without corner cases, unsorted
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  _bottomN_push(n: number): Array<T> {
    // Use an inverted heap
    const bottomHeap = new MyHeap(this.compare);
    bottomHeap.limit = n;
    bottomHeap.heapArray = this.heapArray.slice(-n);
    bottomHeap.init();
    const startAt = this.heapArray.length - 1 - n;
    const parentStartAt = MyHeap.getParentIndexOf(startAt);
    const indices = [];
    for (let i = startAt; i > parentStartAt; --i) {
      indices.push(i);
    }
    const arr = this.heapArray;
    while (indices.length) {
      const i = indices.shift() as number;
      if (this.compare(arr[i], bottomHeap.peek() as T) > 0) {
        bottomHeap.replace(arr[i]);
        if (i % 2) {
          indices.push(MyHeap.getParentIndexOf(i));
        }
      }
    }
    return bottomHeap.toArray();
  }

  /**
   * Returns the inverse to the comparison function.
   * @return {Function}
   */
  _invertedCompare = (a: T, b: T): number => {
    return -1 * this.compare(a, b);
  };

  /**
   * Move a node to a new index, switching places
   * @param  {Number} j First node index
   * @param  {Number} k Another node index
   */
  _moveNode(j: number, k: number): void {
    [this.heapArray[j], this.heapArray[k]] = [this.heapArray[k], this.heapArray[j]];
  }

  /**
   * Move a node down the tree (to the leaves) to find a place where the heap is sorted.
   * @param  {Number} i Index of the node
   */
  _sortNodeDown(i: number): void {
    let moveIt = i < this.heapArray.length - 1;
    const self = this.heapArray[i];

    const getPotentialParent = (best: number, j: number) => {
      if (this.heapArray.length > j && this.compare(this.heapArray[j], this.heapArray[best]) < 0) {
        best = j;
      }
      return best;
    };

    while (moveIt) {
      const childrenIdx = MyHeap.getChildrenIndexOf(i);
      const bestChildIndex = childrenIdx.reduce(getPotentialParent, childrenIdx[0]);
      const bestChild = this.heapArray[bestChildIndex];
      if (typeof bestChild !== "undefined" && this.compare(self, bestChild) > 0) {
        this._moveNode(i, bestChildIndex);
        i = bestChildIndex;
      } else {
        moveIt = false;
      }
    }
  }

  /**
   * Move a node up the tree (to the root) to find a place where the heap is sorted.
   * @param  {Number} i Index of the node
   */
  _sortNodeUp(i: number): void {
    let moveIt = i > 0;
    while (moveIt) {
      const pi = MyHeap.getParentIndexOf(i);
      if (pi >= 0 && this.compare(this.heapArray[pi], this.heapArray[i]) > 0) {
        this._moveNode(i, pi);
        i = pi;
      } else {
        moveIt = false;
      }
    }
  }

  /**
   * Return the top (highest value) N elements of the heap, without corner cases, unsorted
   * Implementation: push.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  _topN_push(n: number): Array<T> {
    // Use an inverted heap
    const topHeap = new MyHeap(this._invertedCompare);
    topHeap.limit = n;
    const indices = [0];
    const arr = this.heapArray;
    while (indices.length) {
      const i = indices.shift() as number;
      if (i < arr.length) {
        if (topHeap.length < n) {
          topHeap.push(arr[i]);
          indices.push(...MyHeap.getChildrenIndexOf(i));
        } else if (this.compare(arr[i], topHeap.peek() as T) < 0) {
          topHeap.replace(arr[i]);
          indices.push(...MyHeap.getChildrenIndexOf(i));
        }
      }
    }
    return topHeap.toArray();
  }

  /**
   * Return the top (highest value) N elements of the heap, without corner cases, unsorted
   * Implementation: init + push.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  _topN_fill(n: number): Array<T> {
    // Use an inverted heap
    const { heapArray } = this;
    const topHeap = new MyHeap(this._invertedCompare);
    topHeap.limit = n;
    topHeap.heapArray = heapArray.slice(0, n);
    topHeap.init();
    const branch = MyHeap.getParentIndexOf(n - 1) + 1;
    const indices = [];
    for (let i = branch; i < n; ++i) {
      indices.push(...MyHeap.getChildrenIndexOf(i).filter((l) => l < heapArray.length));
    }
    if ((n - 1) % 2) {
      indices.push(n);
    }
    while (indices.length) {
      const i = indices.shift() as number;
      if (i < heapArray.length) {
        if (this.compare(heapArray[i], topHeap.peek() as T) < 0) {
          topHeap.replace(heapArray[i]);
          indices.push(...MyHeap.getChildrenIndexOf(i));
        }
      }
    }
    return topHeap.toArray();
  }

  /**
   * Return the top (highest value) N elements of the heap, without corner cases, unsorted
   * Implementation: heap.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  _topN_heap(n: number): Array<T> {
    const topHeap = this.clone();
    const result: Array<T> = [];
    for (let i = 0; i < n; ++i) {
      result.push(topHeap.pop() as T);
    }
    return result;
  }

  /**
   * Return index of the top element
   * @param list
   */
  _topIdxOf(list: Array<T>): number {
    if (!list.length) {
      return -1;
    }
    let idx = 0;
    let top = list[idx];
    for (let i = 1; i < list.length; ++i) {
      const comp = this.compare(list[i], top);
      if (comp < 0) {
        idx = i;
        top = list[i];
      }
    }
    return idx;
  }

  /**
   * Return the top element
   * @param list
   */
  _topOf(...list: Array<T>): T | undefined {
    const heap = new MyHeap(this.compare);
    heap.init(list);
    return heap.peek();
  }
}

function totalCost(costs: number[], k: number, candidates: number): number {
  const leftHeap = new MyHeap<number>();
  const rightHeap = new MyHeap<number>();
  let left = 0;
  let right = costs.length - 1;

  while (left < candidates && right >= costs.length - candidates && left <= right) {
    const n1 = costs[left++];
    leftHeap.push(n1);
    console.log(`pushed ${n1} on left heap`);

    if (left > right) break;

    const n2 = costs[right--];
    rightHeap.push(n2);
    console.log(`pushed ${n2} on right heap`);
  }

  let res = 0;
  for (let i = 0; i < k; i++) {
    if (leftHeap.peek()! <= (rightHeap.peek() || Infinity)) {
      console.log(`popped ${leftHeap.peek()} on left heap`);
      res += leftHeap.pop()!;
      if (left <= right) {
        console.log(`pushed ${costs[left]} on left heap`);
        leftHeap.push(costs[left++]);
      }
    } else {
      const nextRight = rightHeap.pop();
      if (!nextRight) break;
      console.log(`popped ${rightHeap.peek()} on right heap`);
      res += nextRight;
      if (left <= right) {
        console.log(`pushed ${costs[right]} on right heap`);
        rightHeap.push(costs[right--]);
      }
    }
  }

  return res;
}

// console.log(totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4));
// console.log(totalCost([31, 25, 72, 79, 74, 65, 84, 91, 18, 59, 27, 9, 81, 33, 17, 58], 11, 2));
console.log(
  totalCost(
    [
      18, 64, 12, 21, 21, 78, 36, 58, 88, 58, 99, 26, 92, 91, 53, 10, 24, 25, 20, 92, 73, 63, 51, 65, 87, 6, 17, 32, 14,
      42, 46, 65, 43, 9, 75,
    ],
    13,
    23,
  ),
);
console.log(totalCost([48], 1, 1));
