import PriorityQueue from "priority-queue-typescript";

class GraphNode {
  label: string;
  edges = new Set<Edge>();

  constructor(label: string) {
    this.label = label;
  }

  toString() {
    return this.label;
  }

  addEdge(toNode: GraphNode, weight: number) {
    this.edges.add(new Edge(this, toNode, weight));
  }

  getEdges() {
    return this.edges.values();
  }
}

class NodeEntry {
  node: GraphNode;
  priority: number;

  constructor(node: GraphNode, priority: number) {
    this.node = node;
    this.priority = priority;
  }
}

class Edge {
  from: GraphNode;
  to: GraphNode;
  weight: number;

  constructor(from: GraphNode, to: GraphNode, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  toString() {
    return `${this.to.label} ${this.weight}`;
  }
}

class WeightedGraph {
  private nodes = new Map<string, GraphNode>();

  addNode(label: string) {
    this.nodes.set(label, new GraphNode(label));
  }

  addEdge(from: string, to: string, weight: number) {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) throw new Error("invalid to or from label");

    fromNode.addEdge(toNode, weight);
    toNode.addEdge(fromNode, weight);
  }

  print() {
    for (const node of this.nodes.values()) {
      const edges = Array.from(node.getEdges());
      if (!edges.length) continue;
      console.log(node.toString(), "is connected to:", edges.toString());
    }
  }

  getShortestPath(from: string, to: string): { path: string[]; distance: number } {
    const nodes = Array.from(this.nodes.values());
    const distances = new Map<GraphNode, number>(nodes.map((node) => [node, Infinity]));
    const previousNodes = new Map<GraphNode, GraphNode>();
    const visited = new Set<GraphNode>();

    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) throw new Error("invalid to or from label");

    const queue = new PriorityQueue<NodeEntry>(undefined, (a: NodeEntry, b: NodeEntry) => a.priority - b.priority);
    queue.add(new NodeEntry(fromNode, 0));
    distances.set(fromNode, 0);

    while (true) {
      const current = queue.poll()?.node;
      if (!current) break;

      for (const edge of current.getEdges()) {
        if (visited.has(edge.to)) continue;

        const newDistance = edge.weight + distances.get(current)!;
        if (newDistance < distances.get(edge.to)!) {
          distances.set(edge.to, newDistance);
          previousNodes.set(edge.to, current);
          queue.add(new NodeEntry(edge.to, newDistance));
        }
      }
      visited.add(current);
    }

    const shortestPath: string[] = [];
    let current: GraphNode | undefined = toNode;

    while (current) {
      shortestPath.push(current.label);
      current = previousNodes.get(current);
    }

    return {
      distance: distances.get(toNode)!,
      path: shortestPath.reverse(),
    };
  }

  hasCycle() {
    const visited = new Set<GraphNode>();
    for (const node of this.nodes.values()) if (!visited.has(node) && this._hasCycle(node, visited)) return true;

    return false;
  }

  private _hasCycle(node: GraphNode, visited: Set<GraphNode>, parent?: GraphNode): boolean {
    visited.add(node);

    for (const edge of node.getEdges()) {
      if (edge.to == parent) continue;

      if (visited.has(edge.to)) return true;

      if (this._hasCycle(edge.to, visited, node)) return true;
    }

    return false;
  }

  minimumSpanningTree() {
    const node = this.nodes.values().next().value as GraphNode;
    const queue = new PriorityQueue<Edge>(undefined, (a: Edge, b: Edge) => a.weight - b.weight);

    const tree = new WeightedGraph();
    let current = node;
    tree.addNode(current.label);

    while (tree.nodes.size < this.nodes.size) {
      for (const edge of current.getEdges()) {
        if (!tree.nodes.has(edge.to.label)) queue.add(edge);
      }

      const closestEdge = queue.poll()!;
      tree.addNode(closestEdge.to.label);
      tree.addEdge(closestEdge.from.label, closestEdge.to.label, closestEdge.weight);
      current = closestEdge.to;
    }

    return tree;
  }
}
const graph = new WeightedGraph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
// graph.addNode("E");

// test shortest path
// graph.addEdge("A", "B", 3);
// graph.addEdge("A", "C", 4);
// graph.addEdge("A", "D", 2);
// graph.addEdge("B", "D", 6);
// graph.addEdge("B", "E", 1);
// graph.addEdge("C", "D", 1);
// graph.addEdge("D", "E", 5);

// console.log(graph.getShortestPath("A", "C"));

// graph.addEdge("A", "B", 3);
// graph.addEdge("B", "C", 4);
// graph.addEdge("C", "D", 2);
// graph.addEdge("D", "E", 6);
// graph.addEdge("E", "C", 6);

graph.addEdge("A", "B", 2);
graph.addEdge("B", "D", 3);
graph.addEdge("A", "D", 4);
graph.addEdge("A", "C", 1);
graph.addEdge("C", "D", 5);
console.log(graph.hasCycle());
console.log(graph.minimumSpanningTree().print());
