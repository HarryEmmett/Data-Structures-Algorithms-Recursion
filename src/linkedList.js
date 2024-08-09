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
      // log at the top of recursion
      console.log(
        result.reduce((a, b) => {
          return a + `(${b === null ? "Head" : b}) -> `;
        }, "")
      );
    }
    return result;
  }
}

const a = new LinkedList();
// a.append("bob");
// a.append("bill");
// a.append("bo");
// a.append("john");
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
