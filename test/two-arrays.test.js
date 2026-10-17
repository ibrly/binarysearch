'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { kthOfTwoSorted, medianOfTwoSorted } = require('../src/two-arrays');

const randomSorted = () =>
  Array.from({ length: Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 30)).sort((x, y) => x - y);

test('medianOfTwoSorted on known cases', () => {
  assert.equal(medianOfTwoSorted([1, 3], [2]), 2);
  assert.equal(medianOfTwoSorted([1, 2], [3, 4]), 2.5);
  assert.equal(medianOfTwoSorted([], [5]), 5);
  assert.equal(medianOfTwoSorted([1, 1, 1], [1, 1]), 1);
  assert.throws(() => medianOfTwoSorted([], []), RangeError);
});

test('kthOfTwoSorted rejects out-of-range k', () => {
  for (const k of [-1, 3, 1.5]) assert.throws(() => kthOfTwoSorted([1], [2, 3], k), RangeError);
});

test('kthOfTwoSorted and medianOfTwoSorted agree with merging on random arrays', () => {
  for (let run = 0; run < 1000; run++) {
    const a = randomSorted();
    const b = randomSorted();
    const merged = [...a, ...b].sort((x, y) => x - y);
    merged.forEach((value, k) => assert.equal(kthOfTwoSorted(a, b, k), value, `k=${k} a=${a} b=${b}`));
    if (merged.length > 0) {
      const mid = merged.length >>> 1;
      const expected = merged.length % 2 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;
      assert.equal(medianOfTwoSorted(a, b), expected);
    }
  }
});
