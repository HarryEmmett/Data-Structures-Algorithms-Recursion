function fibonacci(n, keys = new Map()) {
  // check if the value has already been calculated
  if (keys.get(n)) {
    return keys.get(n);
  }

  let result;

  // first two numbers are 1 in the sequence
  if (n <= 2) return 1;

  // recursion will add step 1....n-1 steps and then 1....n-2 steps together
  result = fibonacci(n - 1, keys) + fibonacci(n - 2, keys);
  // set the result
  keys.set(n, result);

  return result;
}

console.log(fibonacci(1));
console.log(fibonacci(5));
console.log(fibonacci(10));
console.log(fibonacci(200));
