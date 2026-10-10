'use strict';

/**
 * Search a sorted array of distinct numbers that was rotated at an unknown pivot,
 * e.g. [4, 5, 6, 7, 0, 1, 2]. Returns the index of target or -1. O(log n).
 *
 * At every step one half of [low, high] is sorted; check whether target lies in
 * that half and discard the other one.
 */
function searchRotated(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] === target) return mid;

    if (arr[low] <= arr[mid]) {
      // left half [low, mid] is sorted
      if (arr[low] <= target && target < arr[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      // right half [mid, high] is sorted
      if (arr[mid] < target && target <= arr[high]) low = mid + 1;
      else high = mid - 1;
    }
  }

  return -1;
}

/** Index of the smallest element, i.e. the rotation pivot. O(log n). */
function findRotationPivot(arr) {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] > arr[high]) low = mid + 1;
    else high = mid;
  }

  return low;
}

module.exports = { searchRotated, findRotationPivot };
