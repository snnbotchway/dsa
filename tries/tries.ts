import util from "util";

class TrieNode {
  value?: string;
  children: Map<string, TrieNode>;
  endOfWord: boolean;

  constructor(value?: string) {
    this.value = value;
    this.endOfWord = false;
    this.children = new Map();
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const currentChar = word[i];

      if (!currentNode.children.has(currentChar)) currentNode.children.set(currentChar, new TrieNode(currentChar));
      currentNode = currentNode.children.get(currentChar)!;
    }

    currentNode.endOfWord = true;
  }

  contains(word: string) {
    let currentNode = this.root;

    for (const char of word) {
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char)!;
      } else {
        return false;
      }
    }

    return currentNode.endOfWord;
  }

  traversePreOrder() {
    this._traversePreOrder(this.root);
  }

  private _traversePreOrder(node: TrieNode) {
    console.log(node.value);

    for (const _node of node.children.values()) {
      this._traversePreOrder(_node);
    }
  }

  traversePostOrder() {
    this._traversePostOrder(this.root);
  }

  private _traversePostOrder(node: TrieNode) {
    for (const _node of node.children.values()) {
      this._traversePostOrder(_node);
    }
    console.log(node.value);
  }

  delete(word: string) {
    this._delete(this.root, word, 0);
  }

  private _delete(node: TrieNode, word: string, index: number) {
    if (index == word.length) {
      node.endOfWord = false;
      return;
    }

    const childChar = word[index];
    if (!node.children.has(childChar)) return;

    const childNode = node.children.get(childChar)!;

    this._delete(childNode, word, index + 1);

    if (!childNode.children.size && !childNode.endOfWord) node.children.delete(childChar);
  }

  autoComplete(word: string) {
    const words: string[] = [];
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.children.has(char)) return words;
      currentNode = currentNode.children.get(char)!;
    }

    this._autoComplete(currentNode, word, words);
    return words;
  }
  private _autoComplete(node: TrieNode, word: string, words: string[]) {
    if (node.endOfWord) words.push(word);

    for (const child of node.children.values()) this._autoComplete(child, word + child.value, words);
  }
}

const trie = new Trie();
trie.insert("care");
trie.insert("car");
// trie.insert("ca");
// trie.delete("card");
trie.insert("boy");
trie.insert("book");
trie.insert("border");
trie.insert("cat");
trie.insert("dog");
trie.insert("doctor");
trie.insert("fine");
trie.insert("finest");
trie.insert("figure");
trie.insert("pick");
trie.insert("pickle");
trie.insert("picture");
// logTrieNode(trie.root);
// console.log(trie.contains("picture"));
// trie.traversePreOrder();
// trie.traversePostOrder();
console.log(trie.autoComplete(""));

function logTrieNode(node: TrieNode, depth = 0) {
  const indent = "  ".repeat(depth);
  console.log(`${indent}value: ${node.value}, endOfWord: ${node.endOfWord}`);

  node.children.forEach((childNode, char) => {
    // console.log(`${indent}Child '${char}':`);
    logTrieNode(childNode, depth + 1);
  });
}
