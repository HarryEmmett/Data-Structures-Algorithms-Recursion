// const powerLoop = (x, n) => {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }

//   return result;
// };

// const powerRecursive = (x, n) => {
//   if (n === 1) {
//     return x;
//   } else {
//     return x * powerRecursive(x, n - 1);
//   }
// };

// console.log(powerLoop(4, 2));
// console.log(powerRecursive(4, 2));

// // Recursive traversal
// let company = {
//   sales: [
//     { name: "John", salary: 1000 },
//     { name: "Alice", salary: 1600 },
//   ],
//   development: {
//     sites: [
//       { name: "Peter", salary: 2000 },
//       { name: "Alex", salary: 1800 },
//     ],
//     new: [{ name: "Bob", salary: 300 }],
//     internals: [{ name: "Jack", salary: 1300 }],
//   },
// };

// const sumSalaries = (companies) => {
//   if (Array.isArray(companies)) {
//     return companies.reduce((prev, curr) => prev + curr.salary, 0);
//   } else {
//     let sum = 0;
//     for (let department of Object.values(companies)) {
//       sum += sumSalaries(department);
//     }
//     return sum;
//   }
// };

// console.log(sumSalaries(company));

// const sumTo = (number) => {
//   if (number === 1) return number;

//   return number + sumTo(number - 1);
// };

// console.log(sumTo(1), sumTo(2), sumTo(3), sumTo(4), sumTo(100));

// const factorial = (number) => {
//   if (number === 1) return number;

//   return number * factorial(number - 1);
// };

// console.log(
//   factorial(1),
//   factorial(2),
//   factorial(3),
//   factorial(4),
//   factorial(5)
// );

// function fibonacci(n) {
//   let a = 1;
//   let b = 1;
//   for (let i = 3; i <= n; i++) {
//     let c = a + b;
//     a = b;
//     b = c;
//   }
//   return b;
// }

// console.log(fibonacci(3), fibonacci(77));

// let list = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value: 3,
//       next: {
//         value: 4,
//         next: null,
//       },
//     },
//   },
// };

// const printListRecursion = (list) => {
//   console.log(list.value);
//   if (list.next === null) return;

//   return printListRecursion(list.next);
// };

// printListRecursion(list);

// const printListLoop = (listItem) => {
//   let temp = listItem;

//   while (temp) {
//     console.log(temp.value);
//     temp = temp.next;
//   }
// };

// printListLoop(list);

// const reverseLinkedListRecursion = (linkedList) => {
//   if (linkedList.next) reverseLinkedListRecursion(linkedList.next);

//   console.log(linkedList.value);
// };

// reverseLinkedListRecursion(list);

// const reverseLinkedListLeep = (linkedList) => {
//   const items = [];
//   let temp = linkedList;

//   while (temp) {
//     items.push(temp.value);
//     temp = temp.next;
//   }

//   for (let i = items.length - 1; i >= 0; i--) {
//     console.log(items[i]);
//   }
// };

// reverseLinkedListLeep(list);

// const sumRange = (number) => {
//   if (number === 1) return 1;

//   console.log(number);
//   return number + sumRange(number - 1);
// };

// sumRange(3);

// const allAreLessThanSeven = (array) => {
//   const newArray = [...array];

//   if (newArray.length === 0) return;
//   if (newArray[newArray.length - 1] > 7) return false;

//   newArray.pop();
//   allAreLessThanSeven(newArray);
//   return true;
// };

// console.log(allAreLessThanSeven([1, 5, 1, 3, 4, 3, 2, 7]));

// const allAreLessThanSevenCallback = (array, callback) => {
//   const newArray = [...array];

//   all elements poped so everyone is < 7 return true
//   if (newArray.length === 0) return true;

//   if (callback(newArray[newArray.length - 1])) {
//     newArray.pop();
//     return allAreLessThanSevenCallback(newArray, callback);
//   } else {
//     element > 7 found exit case
//     newArray.length = 0;
//     return false;
//   }
// };

// const value = allAreLessThanSevenCallback(
//   [1, 5, 1, 3, 4, 8, 2, 6, 6],
//   (val) => {
//     return val < 7;
//   }
// );

// console.log(value);

// const productOfArray = (array) => {
//   const currentArray = [...array];

//   if (currentArray.length === 1) return currentArray.pop();

//   const value = currentArray.pop();
//   return value * productOfArray(currentArray);
// };

// console.log(productOfArray([1, 2, 3]));
// console.log(productOfArray([1, 2, 3, 10]));

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
