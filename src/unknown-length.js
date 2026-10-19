'use strict';

const { defaultCompare } = require('./binary-search');

/**
 * Search a sorted source whose length is unknown or too expensive to ask for
 * (a paged API, a file read by offset, an infinite sequence).
 * `get(i)` returns the i-th value, or `undefined` past the end.
 * Doubles an upper bound until it passes target or the end, then binary searches,
 * so it makes O(log i) calls to `get`, where i is the target's index.
 */
function searchUnknownLength(get, target, compare = defaultCompare) {
  let high = 1;
  while (get(high) !== undefined && compare(get(high), target) < 0) high *= 2;

  let low = high >>> 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    const value = get(mid);
    const order = value === undefined ? 1 : compare(value, target); // past the end counts as too big
    if (order === 0) return mid;
    if (order < 0) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

module.exports = { searchUnknownLength };
