function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  const left = mergeSort(array.slice(0, Math.ceil(array.length / 2)));
  const right = mergeSort(
    array.slice(Math.ceil(array.length / 2), array.length)
  );
}
console.log(mergeSort([5, 3, 2, 1, 8, 6]));
