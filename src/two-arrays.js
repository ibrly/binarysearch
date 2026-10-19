'use strict';

/**
 * k-th smallest element (0-based) of the union of two ascending arrays, without merging them.
 * Binary search on how many elements to take from `a`: taking i from `a` and k + 1 - i from `b`
 * is right when the largest taken element of each array is <= the smallest untaken one of the other.
 * O(log(min(a.length, b.length))).
 */
function kthOfTwoSorted(a, b, k) {
  if (a.length > b.length) return kthOfTwoSorted(b, a, k);
  const total = a.length + b.length;
  if (!Number.isInteger(k) || k < 0 || k >= total) {
    throw new RangeError(`k must be an integer in [0, ${total - 1}]`);
  }

  const take = k + 1;
  let low = Math.max(0, take - b.length);
  let high = Math.min(take, a.length);
  while (low <= high) {
    const i = (low + high) >>> 1; // elements taken from a
    const j = take - i; // elements taken from b
    const aLeft = i > 0 ? a[i - 1] : -Infinity;
    const aRight = i < a.length ? a[i] : Infinity;
    const bLeft = j > 0 ? b[j - 1] : -Infinity;
    const bRight = j < b.length ? b[j] : Infinity;

    if (aLeft > bRight) high = i - 1;
    else if (bLeft > aRight) low = i + 1;
    else return Math.max(aLeft, bLeft);
  }
  throw new Error('inputs must be sorted ascending');
}

/** Median of the union of two ascending number arrays. */
function medianOfTwoSorted(a, b) {
  const total = a.length + b.length;
  if (total === 0) throw new RangeError('both arrays are empty');
  const mid = total >>> 1;
  if (total % 2 === 1) return kthOfTwoSorted(a, b, mid);
  return (kthOfTwoSorted(a, b, mid - 1) + kthOfTwoSorted(a, b, mid)) / 2;
}

module.exports = { kthOfTwoSorted, medianOfTwoSorted };
