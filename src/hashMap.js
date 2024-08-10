import LinkedList from "./linkedList";

const bucketLength = 16;

class HashMap {
  loadFacor = 0.75;
  buckets = Array(bucketLength).fill(null);

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  detectCollisions(k, value) {
    if (!this.buckets[12]) return false;
    // the same key provided so override other wise add the new value

    let current = this.buckets[12];

    const results = [];
    while (current.next) {
      results.push(current.key);
      current = current.next;
    }

    return true;
  }

  set(key, value) {
    const k = 12;

    const linkedList = new LinkedList();

    linkedList.contains(k, true);
  }

  get(value) {
    const k = this.hash(value);
    return this.buckets[k];
  }

  remove(value) {
    const k = this.hash(value);
    this.buckets[k] = {};
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

  all() {
    console.log(this.buckets[12]);
  }
}

const a = new HashMap();
// a.set("Carla", "carlson");
a.set("Carlos", "carlson2");
a.set("new", "new");
a.set("Carlos", "emd");
a.set("new", "///");
a.set("Carlos", "carl 36");
a.set("Ca", "carl 36");

// console.log(a.has("Carlaassss"));
// console.log(a.length());
// console.log(a.values());
a.all();
// console.log(a.get("Carla"));
// a.remove("Carla");
// console.log(a.get("Carla"));
