'use strict';

const { binarySearch, defaultCompare } = require('./binary-search');

/**
 * Exponential (galloping) search: double an upper bound until it passes target,
 * then binary search inside that range. O(log i) where i is the target's index,
 * so it beats plain binary search when the target is near the start, and it works
 * when only element access is cheap but the length is huge or unknown.
 */
function exponentialSearch(arr, target, compare = defaultCompare) {
  if (arr.length === 0) return -1;
  if (compare(arr[0], target) === 0) return 0;

  let bound = 1;
  while (bound < arr.length && compare(arr[bound], target) < 0) bound *= 2;

  const low = bound >>> 1;
  const high = Math.min(bound, arr.length - 1);
  const index = binarySearch(arr.slice(low, high + 1), target, compare);
  return index === -1 ? -1 : low + index;
}

module.exports = { exponentialSearch };
