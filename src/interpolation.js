'use strict';

/**
 * Interpolation search: guess the position from the value, like opening a phone
 * book near "S" for "Smith". O(log log n) on uniformly distributed numbers,
 * but O(n) in the worst case (e.g. exponentially growing values).
 * Numbers only, sorted ascending. Returns an index of target, or -1.
 */
function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (arr[high] === arr[low]) return arr[low] === target ? low : -1;
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}

module.exports = { interpolationSearch };
