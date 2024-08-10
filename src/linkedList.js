export class Node {
  constructor(name = null, next = null) {
    this.name = name;
    this.next = next;
  }
}

class LinkedList {
  node;
  constructor() {
    this.node = new Node();
  }

  append(value, node = this.node) {
    if (node.next === null) return (node.next = new Node(value));

    this.append(value, node.next);
  }

  prepend(value) {
    const n = new Node(value);

    if (this.node.next === null) return (this.node.next = n);
    // set n next to be the value of all the current linked list
    n.next = this.node.next;
    // set the new value keeping the original head as null
    this.node.next = n;
  }

  getArrayList(size = false) {
    if (this.node.next === null) return [];
    let current = this.node;
    const results = [];
    while (current) {
      results.push(current.name === null ? "Head" : current.name);
      current = current.next;
    }

    return size ? results.length : results;
  }

  getHead() {
    if (this.node.next === null) return null;
    return this.node.next.name;
  }

  getTail() {
    if (this.node.next === null) return null;
    const values = this.getArrayList();
    return values[values.length - 1];
  }

  atIndex(index) {
    if (index < 0) return "Out of bounds";
    if (this.node.next === null) return "Not found";
    let current = this.node;
    let count = 0;

    while (current.next && count < index) {
      current = current.next;
      count++;
      if (count === index) break;
    }

    if (index === count) {
      return current.name;
    } else {
      return false;
    }
  }

  pop() {
    if (this.node.next === null) return;
    let tail = this.node.next;
    let last = this.node;
    while (tail.next) {
      tail = tail.next;
      last = last.next;
    }

    last.next = null;
  }

  contains(value, index = false) {
    if (this.node.next === null) return false;

    let count = 0;
    let current = this.node;
    while (current.next) {
      current = current.next;
      count++;
      if (current.name === value) return index ? count : true;
    }

    return false;
  }

  insertAt(value, index) {
    if (index < 0) return false;

    let count = 0;
    let current = this.node;
    let last = this.node.next;
    while (current.next && count < index) {
      current = current.next;
      last = last.next;
      count++;
      if (count === index) break;
    }

    if (index === count) {
      current.next = new Node(value);
      current.next.next = last;
    } else {
      return false;
    }
  }

  listString(node = this.node) {
    let result;
    if (node.next === null) return [node.name];
    result = [node.name, ...this.listString(node.next)];

    if (node.name === null) {
      const list = result.reduce((a, b) => {
        return a + `(${b === null ? "Head" : b}) -> `;
      }, "");
      // log at the top of recursion
      console.log(list + "(End)");
    }
    return result;
  }

  listStringLoop() {
    const results = this.getArrayList();

    console.log(`(${results.join(") -> (")}`, ") -> (End)");
  }

  createNodes() {
    this.append("bob");
    this.append("bill");
  }
}

const a = new LinkedList();
a.createNodes();
a.prepend("frank");
a.listStringLoop();
a.insertAt("new one", 10);
a.insertAt("new one", 1);
a.insertAt("new one 2", 1);
a.insertAt("new one 3", 5);
console.log(a.contains("tim"));
console.log(a.contains("frank"));
a.listString();
a.pop();
a.listString();
console.log(a.getHead(), a.getTail());
console.log(a.getArrayList(), a.getArrayList(true));
console.log(a.atIndex(0));
console.log(a.atIndex(1));
console.log(a.atIndex(2));
console.log(a.atIndex(3));
console.log(a.atIndex(4));
console.log(a.atIndex(5));
console.log(a.atIndex(6));
console.log(a.atIndex(7));

export { LinkedList };
