function merge(left, right) {
  let result = [];

  let rightCount = 0;
  let leftCount = 0;

  while (leftCount < left.length && rightCount < right.length) {
    if (left[leftCount] > right[rightCount]) {
      result.push(right[rightCount]);
      rightCount++;
    } else {
      result.push(left[leftCount]);
      leftCount++;
    }
  }

  const leftRemaining = left.slice(leftCount, leftCount.length);
  const rightRemaining = right.slice(rightCount, rightCount.length);

  return [...result, ...leftRemaining, ...rightRemaining];
}

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1]));
console.log(mergeSort([3, 5, 7, 6, 2, 2]));
console.log(mergeSort([2, 1, 1, 1, 1, 12]));
console.log(mergeSort([100, 750, 80, 3, 999, 60000]));
