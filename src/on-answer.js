'use strict';

/**
 * "Binary search on the answer": when a yes/no question is monotonic in x
 * (false, false, ..., true, true), find the smallest integer x in [low, high]
 * for which predicate(x) is true. Returns high + 1 if none is.
 */
function firstTrue(low, high, predicate) {
  let lo = low;
  let hi = high + 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (predicate(mid)) hi = mid;
    else lo = mid + 1;
  }

  return lo;
}

/** Integer square root: largest r with r * r <= n. */
function isqrt(n) {
  if (n < 0) throw new RangeError('n must be non-negative');
  // first r whose square exceeds n, minus one
  return firstTrue(0, n, r => r * r > n) - 1;
}

/**
 * Smallest ship capacity that delivers all packages, in order, within `days`.
 * Classic example: the answer space is [max weight, total weight].
 */
function minShipCapacity(weights, days) {
  const fits = capacity => {
    let neededDays = 1;
    let load = 0;
    for (const w of weights) {
      if (load + w > capacity) {
        neededDays++;
        load = 0;
      }
      load += w;
    }
    return neededDays <= days;
  };

  const heaviest = Math.max(...weights);
  const total = weights.reduce((sum, w) => sum + w, 0);
  return firstTrue(heaviest, total, fits);
}

module.exports = { firstTrue, isqrt, minShipCapacity };
