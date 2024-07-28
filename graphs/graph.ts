import { Queue } from "../queue";

class GraphNode {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  toString() {
    return this.label;
  }
}

class Graph {
  private adjacencyList = new Map<GraphNode, GraphNode[]>();
  private nodes = new Map<string, GraphNode>();

  addNode(label: string) {
    const node = new GraphNode(label);
    this.nodes.set(label, node);
    if (!this.adjacencyList.has(node)) this.adjacencyList.set(node, []);
  }

  addEdge(from: string, to: string) {
    const fromNode = this.nodes.get(from);
    if (!fromNode) throw Error("Invalid from label");

    const toNode = this.nodes.get(to);
    if (!toNode) throw Error("Invalid to label");

    this.adjacencyList.get(fromNode)!.push(toNode);
  }

  print() {
    for (const [source, targets] of this.adjacencyList.entries()) {
      if (!targets.length) continue;
      console.log(source.toString(), "is connected to:", targets.toString());
    }
  }

  removeNode(label: string) {
    const node = this.nodes.get(label);
    if (!node) return;

    for (const targets of this.adjacencyList.values()) {
      const index = targets.indexOf(node);
      if (index != -1) targets.splice(index, 1);
    }

    this.nodes.delete(label);
    this.adjacencyList.delete(node);
  }

  removeEdge(from: string, to: string) {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!toNode || !fromNode) return;

    const targets = this.adjacencyList.get(fromNode)!;
    const indexOfToNode = targets.indexOf(toNode);
    if (indexOfToNode != -1) targets.splice(indexOfToNode, 1);
  }

  depthFirstTraversalRecursive(from: string) {
    const node = this.nodes.get(from);
    if (!node) throw new Error("Invalid label");

    this._depthFirstTraversalRecursive(node, new Set<GraphNode>());
  }

  private _depthFirstTraversalRecursive(node: GraphNode, visited: Set<GraphNode>) {
    console.log(node.toString());
    visited.add(node);

    const targets = this.adjacencyList.get(node)!;

    for (const target of targets) if (!visited.has(node)) this._depthFirstTraversalRecursive(target, visited);
  }

  depthFirstTraversalIterative(from: string) {
    const node = this.nodes.get(from);
    if (!node) throw new Error("Invalid label");

    const visited = new Set<GraphNode>();
    let stack: GraphNode[] = [node];

    while (stack.length) {
      const current = stack.pop()!;
      if (visited.has(current)) continue;

      console.log(current.toString());
      visited.add(current);

      const targets = this.adjacencyList.get(current)!;
      stack = [...stack, ...targets];
    }
  }

  breadthFirstTraversal(from: string) {
    const node = this.nodes.get(from);
    if (!node) throw new Error("Invalid label");

    const visited = new Set<GraphNode>();
    const queue = new Queue<GraphNode>();
    queue.enqueue(node);

    while (queue.size()) {
      const current = queue.dequeue()!;
      if (visited.has(current)) continue;

      console.log(current.toString());
      visited.add(current);

      for (const target of this.adjacencyList.get(current)!) queue.enqueue(target);
    }
  }

  topologicalSort(): string[] {
    const sortedList: string[] = [];
    const visited = new Set<GraphNode>();
    for (const node of this.nodes.values()) this._topologicalSort(node, sortedList, visited);
    return sortedList.reverse();
  }

  private _topologicalSort(node: GraphNode, sortedList: string[], visited: Set<GraphNode>) {
    if (visited.has(node)) return;
    visited.add(node);

    for (const neighbor of this.adjacencyList.get(node)!) this._topologicalSort(neighbor, sortedList, visited);

    sortedList.push(node.toString());
  }

  hasCycle() {
    const all = new Set(this.nodes.values());
    const visiting = new Set<GraphNode>();
    const visited = new Set<GraphNode>();

    while (all.size) if (this._hasCycle(all.values().next().value, all, visiting, visited)) return true;

    return false;
  }

  private _hasCycle(
    current: GraphNode,
    all: Set<GraphNode>,
    visiting: Set<GraphNode>,
    visited: Set<GraphNode>,
  ): boolean {
    all.delete(current);
    visiting.add(current);

    for (const neighbor of this.adjacencyList.get(current)!) {
      if (visited.has(neighbor)) continue;

      if (visiting.has(neighbor)) return true;

      if (this._hasCycle(neighbor, all, visiting, visited)) return true;
    }

    visited.add(current);
    visiting.delete(current);

    return false;
  }
}

const graph = new Graph();

// graph.addNode("A");
// graph.addNode("B");
// graph.addNode("C");
// graph.addNode("D");

// graph.addEdge("A", "B");
// graph.addEdge("B", "D");
// graph.addEdge("D", "C");
// graph.addEdge("A", "C");
// graph.removeNode("cape coast");
// graph.removeEdge("accra", "koforidua");
// graph.print();

// graph.depthFirstTraversalRecursive("A");
// graph.depthFirstTraversalIterative("A");
// graph.breadthFirstTraversal("A");

// graph.addNode("X");
// graph.addNode("A");
// graph.addNode("P");
// graph.addNode("B");

// graph.addEdge("X", "A");
// graph.addEdge("X", "B");
// graph.addEdge("A", "P");
// graph.addEdge("B", "P");
// // graph.addEdge("P", "X");
// graph.print();

// console.log(graph.hasCycle());
