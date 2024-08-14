class Node {
  constructor(d) {
    this.left = null;
    this.right = null;
    this.data = d;
  }
}

class Tree {
  array;

  constructor(a) {
    this.array =
      a && Array.isArray(a)
        ? [
            ...new Set(
              a.filter((val) => typeof val === "number").sort((a, b) => a - b)
            ),
          ]
        : [];
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const midPoint = Math.floor((array.length - 1) / 2);
    const node = new Node(array[midPoint]);
    node.left = this.buildTree(array.slice(0, midPoint));
    node.right = this.buildTree(array.slice(midPoint + 1));

    return node;
  }

  root() {
    this.array = this.buildTree(this.array);
    return this.array;
  }

  insert(value) {
    if (typeof value !== "number") return "Invalid input";
    this.array = this.i(value, this.array);
  }

  // need a separate recursive function to insert as if the base case gets to undefined the default parameter will be used instead of undefined
  i(value, node) {
    if (node === null) {
      return new Node(value);
    }
    if (value > node.data) {
      node.right = this.i(value, node.right);
    } else if (value < node.data) {
      node.left = this.i(value, node.left);
    }
    return node;
  }

  delete(value) {
    if (typeof value !== "number") return "Invalid input";
    this.array = this.d(value, this.array);
  }

  d(value, node) {
    if (node === null) {
      return node;
    }

    if (value > node.data) {
      node.right = this.d(value, node.right);
    } else if (value < node.data) {
      node.left = this.d(value, node.left);
    } else {
      // if this block gets hit it means that an equal value has been hit.
      // a high value that is not in the tree will just hit the recursion on 69 until returning undefined
      if (node.left || node.right) {
        // One child node
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        // more than one child

        // in order sucessor is the smallest node in the right node of the one you want to delete
        let temp = node.right;
        while (temp.left !== null) {
          temp = temp.left;
        }

        node.data = temp.data;
        node.right = this.d(temp.data, node.right);
        return node;
      } else {
        // no children so return undefined
        return undefined;
      }
    }

    return node;
  }

  find(value, node = this.array) {
    if (node === null) {
      return undefined;
    }

    if (node.data === value) return node;

    if (value > node.data) {
      return this.find(value, node.right);
    } else if (value < node.data) {
      return this.find(value, node.left);
    }
  }
  levelOrder(callback) {
    if (typeof callback !== "function")
      return "Please provide a callback function";

    const bst = this.array;
    const queue = [];

    queue[0] = bst.data;

    while (queue.length > 0) {
      const value = queue.pop();
      const node = this.find(value);
    }
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

// const a = new Tree();
const a = new Tree([2]);
const tree = a.root();
a.insert(10);
a.insert(5);
a.insert(1);
a.insert(20);
a.insert(15);
a.prettyPrint(tree);
a.levelOrder((callback) => console.log("my callback", callback));
