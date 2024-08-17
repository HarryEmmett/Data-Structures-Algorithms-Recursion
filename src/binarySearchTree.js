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

    queue.push(bst);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node && node.left) {
        queue.push(node.left);
      }
      if (node && node.right) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback, node = this.array) {
    if (typeof callback !== "function")
      return "Please provide a callback function";

    if (node === null) return;

    this.inOrder(callback, node.left);

    callback(node.data);

    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.array) {
    if (typeof callback !== "function")
      return "Please provide a callback function";

    if (node === null) return;

    callback(node.data);

    this.preOrder(callback, node.left);

    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.array) {
    if (typeof callback !== "function")
      return "Please provide a callback function";

    if (node === null) return;

    this.postOrder(callback, node.left);

    this.postOrder(callback, node.right);

    callback(node.data);
  }

  height(node = this.array) {
    if (node === null) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, node = this.array, depth = 0) {
    if (node === null) return -1;

    if (node.data === value) return depth;

    if (value < node.data) {
      return this.depth(value, node.left, depth + 1);
    }

    return this.depth(value, node.right, depth + 1);
  }

  isBalanced(node = this.array) {
    if (node === null) return 0;

    const leftHeight = this.isBalanced(node.left);
    if (leftHeight === -1) {
      return -1;
    }

    const rightHeight = this.isBalanced(node.right);
    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
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
// a.levelOrder((callback) => console.log("my callback", callback));
// a.inOrder((callback) => console.log("my callback", callback));
// a.preOrder((callback) => console.log("my callback", callback));
// a.postOrder((callback) => console.log("my callback", callback));
// console.log(a.height());
// console.log(a.depth(20));
console.log(a.isBalanced());
