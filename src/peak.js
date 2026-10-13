'use strict';

/**
 * Index of a peak: an element strictly greater than its neighbours, where the
 * positions outside the array count as -Infinity. Adjacent elements must differ.
 * Moving towards the larger neighbour always leads to a peak, so half the range
 * can be dropped each step: O(log n) on unsorted input.
 */
function findPeak(arr) {
  if (arr.length === 0) return -1;
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] < arr[mid + 1]) low = mid + 1;
    else high = mid;
  }
  return low;
}

module.exports = { findPeak };
