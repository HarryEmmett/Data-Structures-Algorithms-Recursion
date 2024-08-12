class Node {
  constructor(d, l = undefined, r = undefined) {
    this.left = l;
    this.right = r;
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
    if (array.length === 0) return;
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
  i(value, array) {
    if (array === undefined) {
      return new Node(value);
    }

    if (value > array.data) {
      array.right = this.i(value, array.right);
    } else if (value < array.data) {
      array.left = this.i(value, array.left);
    }

    return array;
  }

  delete(value) {
    if (typeof value !== "number") return "Invalid input";
    this.array = this.d(value, this.array);
  }

  d(value, array) {
    if (array === undefined) {
      return array;
    }

    if (value > array.data) {
      array.right = this.d(value, array.right);
    } else if (value < array.data) {
      array.left = this.d(value, array.left);
    }

    if (array.data === value) {
      if (array.left || array.right) {
        // One child node
        if (array.left === undefined) return array.right;
        if (array.right === undefined) return array.left;

        // more than one child
        let min;
        let temp = array;
        while (temp.right && temp.left) {
          min = temp.right.data;
          temp = temp.left;
        }

        array.data = min;
        array.right = this.d(min, array.right);
        return array;
      } else {
        array = undefined;
      }
    }

    return array;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === undefined) {
      return;
    }
    if (node.right !== undefined) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== undefined) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

// const a = new Tree();
const a = new Tree([2]);
const tree = a.root();
a.insert(100);
a.insert(90);
a.insert(95);
a.insert(96);
a.insert(98);
a.insert(110);
a.insert(93);
a.insert(91);
a.insert(94);
a.prettyPrint(tree);
// a.delete(95);
a.delete(100);
a.prettyPrint(tree);
