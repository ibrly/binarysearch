'use strict';

/**
 * Iterative binary search over a sorted array.
 * Returns the index of `target`, or -1 if it is not present.
 * O(log n) time, O(1) space.
 *
 * @param {Array} arr sorted ascending according to `compare`
 * @param {*} target
 * @param {(a, b) => number} [compare] negative if a < b, 0 if equal, positive if a > b
 */
function binarySearch(arr, target, compare = defaultCompare) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // unsigned shift avoids the classic (low + high) overflow bug in fixed-width languages
    const mid = (low + high) >>> 1;
    const order = compare(arr[mid], target);

    if (order === 0) return mid;
    if (order < 0) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}

/**
 * Recursive variant of binarySearch. Same contract, O(log n) stack depth.
 */
function binarySearchRecursive(arr, target, compare = defaultCompare, low = 0, high = arr.length - 1) {
  if (low > high) return -1;

  const mid = (low + high) >>> 1;
  const order = compare(arr[mid], target);

  if (order === 0) return mid;
  return order < 0
    ? binarySearchRecursive(arr, target, compare, mid + 1, high)
    : binarySearchRecursive(arr, target, compare, low, mid - 1);
}

function defaultCompare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

module.exports = { binarySearch, binarySearchRecursive, defaultCompare };
