const powerLoop = (x, n) => {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
};

// Recursive traversal
let company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    new: [{ name: "Bob", salary: 300 }],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

const sumSalaries = (companies) => {
  if (Array.isArray(companies)) {
    return companies.reduce((prev, curr) => prev + curr.salary, 0);
  } else {
    let sum = 0;
    for (let department of Object.values(companies)) {
      sum += sumSalaries(department);
    }
    return sum;
  }
};

console.log(sumSalaries(company));

const sumTo = (number) => {
  if (number === 1) return number;

  return number + sumTo(number - 1);
};

console.log(sumTo(1), sumTo(2), sumTo(3), sumTo(4), sumTo(100));

function fibonacci(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

console.log(fibonacci(3), fibonacci(77));

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

const printListRecursion = (list) => {
  console.log(list.value);
  if (list.next === null) return;

  return printListRecursion(list.next);
};

printListRecursion(list);

const printListLoop = (listItem) => {
  let temp = listItem;

  while (temp) {
    console.log(temp.value);
    temp = temp.next;
  }
};

printListLoop(list);

const reverseLinkedListRecursion = (linkedList) => {
  if (linkedList.next) reverseLinkedListRecursion(linkedList.next);

  console.log(linkedList.value);
};

reverseLinkedListRecursion(list);

const reverseLinkedListLeep = (linkedList) => {
  const items = [];
  let temp = linkedList;

  while (temp) {
    items.push(temp.value);
    temp = temp.next;
  }

  for (let i = items.length - 1; i >= 0; i--) {
    console.log(items[i]);
  }
};

reverseLinkedListLeep(list);

// Question 1: Sum all numbers

const sumRange = (number) => {
  if (number === 1) return 1;

  console.log(number);
  return number + sumRange(number - 1);
};

sumRange(3);

// Question 2: Power function

const powerRecursive = (x, n) => {
  if (n === 1) {
    return x;
  } else {
    return x * powerRecursive(x, n - 1);
  }
};

console.log(powerLoop(4, 2));
console.log(powerRecursive(4, 2));

// Question 3: Calculate factorial
const factorial = (number) => {
  if (number === 1) return number;

  return number * factorial(number - 1);
};

console.log(
  factorial(1),
  factorial(2),
  factorial(3),
  factorial(4),
  factorial(5)
);

// Question 4: Check all values in an array

const allAreLessThanSeven = (array) => {
  const newArray = [...array];

  if (newArray.length === 0) return;
  if (newArray[newArray.length - 1] > 7) return false;

  newArray.pop();
  allAreLessThanSeven(newArray);
  return true;
};

console.log(allAreLessThanSeven([1, 5, 1, 3, 4, 3, 2, 7]));

const allAreLessThanSevenCallback = (array, callback) => {
  const newArray = [...array];

  // all elements poped so everyone is < 7 return true
  if (newArray.length === 0) return true;

  if (callback(newArray[newArray.length - 1])) {
    newArray.pop();
    return allAreLessThanSevenCallback(newArray, callback);
  } else {
    // element > 7 found exit case
    newArray.length = 0;
    return false;
  }
};

const value = allAreLessThanSevenCallback(
  [1, 5, 1, 3, 4, 8, 2, 6, 6],
  (val) => {
    return val < 7;
  }
);

console.log(value);

const productOfArray = (array) => {
  const currentArray = [...array];

  if (currentArray.length === 1) return currentArray.pop();

  const value = currentArray.pop();
  return value * productOfArray(currentArray);
};

console.log(productOfArray([1, 2, 3]));
console.log(productOfArray([1, 2, 3, 10]));

// Question 6: Search JS object
const nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo2",
            bob: "bob",
          },
        },
      },
    },
  },
};

const contains = (nested, value) => {
  if (typeof nested !== "object" || nested === null) return nested === value;

  for (let k of Object.keys(nested)) {
    const hasValue = contains(nested[k], value);

    if (hasValue) return true;
  }

  return false;
};

console.log(contains(nestedObject, 44));
console.log(contains(nestedObject, "foo"));
console.log(contains(nestedObject, "foo2"));
console.log(contains(nestedObject, "bob"));

// Question 7: Parse a multi-dimensional array

const flatArray = (array) => {
  let temp = array;
  let res = 0;

  if (array.every((e) => typeof e === "number")) return array.length;

  while (Array.isArray(temp[0])) {
    temp = temp.flat();
  }

  for (let a of temp) {
    if (typeof a === "number") res += 1;

    if (Array.isArray(a)) res += flatArray(a);
  }

  return res;
};

const totalIntegers2 = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      sum += flatArray(array[i]);
    }

    if (typeof array[i] === "number") {
      sum += 1;
    }
  }
  return sum;
};

function totalIntegers(array) {
  if (array.length === 0) return 0;

  let total = 0;
  let first = array.shift();
  // shift removes the top level array and returns whatever is in index 0
  // [[["a"]], 2] > first will now equal [["a"]] & the array is [2] so can repeat recursion until array is no more

  if (Array.isArray(first)) {
    total += totalIntegers(first);
  } else if (Number.isInteger(first)) {
    total += 1;
  }

  return total + totalIntegers(array);
}

console.log(totalIntegers([1, [[[[[[[2, 3]]]]]]]])); // 3
console.log(totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]])); // 7
console.log(totalIntegers([[[5, [[[[[[[5, "2"]]]]]]]]]])); // 2
console.log(totalIntegers([1, [[[[[1, 2]]]]], [2], [[[[[[[[[3]]]]]]]]]])); // 5
console.log(totalIntegers2([[[[[[[[[[[[[[[[[5, 6, "asds"]]]]]]]]]]]]]]]]])); // 2

// Question 8: Sum Squares in multi demension Arrays

const sumSquares = (array) => {
  let squareSum = 0;
  if (array.length === 0) return 0;

  const firstEl = array.shift();
  if (typeof firstEl === "number") squareSum += firstEl * firstEl;
  if (Array.isArray(firstEl)) squareSum += sumSquares(firstEl);

  return (squareSum += sumSquares(array));
};

console.log(sumSquares([1, 2, 3])); // 1 + 4 + 9 = 14
console.log(sumSquares([[1, 2], 3])); // 1 + 4 + 9 = 14
console.log(sumSquares([[[[[[[[[1]]]]]]]]])); // 1 = 1
console.log(sumSquares([10, [[10], 10], [10]])); // 100 + 100 + 100 + 100 = 400

// Question 9: function that replicates a number n for x times

const replicate = (times, number) => {
  if (times <= 0) return [];

  return new Array(times).fill(number);
};

const replicateRecursive = (times, number, array = []) => {
  if (times <= 0) return array;

  return replicate(times - 1, number, [...array, number]);
};

console.log(replicate(3, 5)); // [5, 5, 5]
console.log(replicate(1, 69)); // [69]
console.log(replicateRecursive(-2, 6)); // []
