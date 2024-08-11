import LinkedList from "./linkedList.js";

class HashMap {
  bucketLength = 16;
  loadFacor = 0.75;
  buckets = Array(this.bucketLength).fill({});
  size = 0;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  resize() {
    const oldBuckets = structuredClone(this.buckets);
    this.buckets = new Array(this.buckets.length * 2).fill({});
    this.size = 0;
    this.bucketLength = this.buckets.length;

    for (let bucket of oldBuckets) {
      const b = structuredClone(bucket[Object.keys(bucket)[0]]);
      if (b) {
        let current = b.node.next;
        while (current) {
          this.set(current.value.key, current.value.value);
          current = current.next;
        }
      }
    }
  }

  set(keyValue, value) {
    const k = this.hash(keyValue);
    if (!Object.keys(this.buckets[k]).length) {
      {
        const linkedList = new LinkedList();
        linkedList.append({ key: keyValue, value });

        this.buckets[k] = { [k]: linkedList };
        this.size = this.size + 1;
      }
    }

    if (this.size / this.buckets.length >= this.loadFacor) {
      this.resize();
      return;
    }

    if (Object.keys(this.buckets[k]).length) {
      const hasSameKey = this.buckets[k][k]
        .getArrayList()
        .filter(({ key }) => key === keyValue).length;

      if (hasSameKey) {
        const index = this.buckets[k][k].contains(
          { key: keyValue, value },
          true
        );

        this.buckets[k][k].replaceAt({ key: keyValue, value }, index);
      } else {
        this.buckets[k][k].append({ key: keyValue, value });
      }
    }
  }

  get(value) {
    const k = this.hash(value);
    return this.buckets[k];
  }

  remove(value) {
    const k = this.hash(value);
    this.buckets[k] = {};
    this.size = this.size - 1;
  }

  has(value) {
    const k = this.hash(value);
    return !!this.buckets[k];
  }

  length() {
    return this.buckets.filter((b) => b && Object.keys(b)).length;
  }

  values() {
    const results = [];
    const presentValues = this.buckets.filter((b) => b && Object.keys(b));

    presentValues.forEach((value) => {
      let current = value;

      if (current.next) {
        while (current) {
          results.push(current.value);
          current = current.next;
        }
      } else {
        results.push(value.value);
      }
    });

    return results;
  }

  getValues() {
    const buckets = this.buckets.filter((e) => Object.keys(e).length);
    const results = [];
    buckets.forEach((b) => {
      results.push(b[0].getArrayList());
    });

    return results
      .flat()
      .map(({ key, value }) => {
        return key ? [key, value] : undefined;
      })
      .filter((res) => res);
  }

  clear() {
    this.buckets = Array(this.bucketLength).fill({});
    this.size = 0;
  }

  all() {
    console.log("total buckets: ", this.buckets.length);
    console.dir(
      this.buckets.filter((e) => Object.keys(e).length),
      { depth: null }
    );
  }
}

const a = new HashMap();
// a.set("Carla", "carlson");
// a.set("Carla", "2");
// a.set("Carlos", "carlson2");
// a.set("Carlos", "2");
// a.set("Carlos", "emd");
// a.set("Carlos", "emq");
// a.set("Carlos", "emw");
// a.set("Carlos", "final");
// a.set("Carla", "final");
// a.set("new", "///");
// a.set("bob", "///");
// a.set("aaaaa", "///");
// a.clear();

// console.log(a.getValues());

a.set("apple", "red");
a.set("banana", "yellow");
a.set("carrot", "orange");
a.set("dog", "brown");
a.set("elephant", "gray");
a.set("frog", "green");
a.set("grape", "purple");
a.set("hat", "black");
a.set("ice cream", "white");
a.set("jacket", "blue");
a.set("kite", "pink");
a.set("lion", "golden");
a.set("moon", "silver");
a.set("moonasdas", "silver");
a.set("mowerwer", "silver");
a.set("axxxxx", "silver");

a.all();
