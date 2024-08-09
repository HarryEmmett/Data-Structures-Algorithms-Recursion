class Node {
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

  createNodes() {
    this.append("bob");
    this.append("bill");
    this.append("bo");
    this.append("john");
  }
}

const a = new LinkedList();
a.createNodes();
a.listString();

// prepend() {}

// size() {}

// head() {}

// tail() {}

// at(index) {}

// pop() {}

// contains(value) {}

// find(value) {}

// listString() {}
