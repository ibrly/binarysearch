'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { findPeak } = require('../src/peak');

const isPeak = (arr, i) =>
  (i === 0 || arr[i] > arr[i - 1]) && (i === arr.length - 1 || arr[i] > arr[i + 1]);

test('findPeak handles small and monotonic inputs', () => {
  assert.equal(findPeak([]), -1);
  assert.equal(findPeak([7]), 0);
  assert.equal(findPeak([1, 2, 3, 4]), 3);
  assert.equal(findPeak([4, 3, 2, 1]), 0);
  assert.ok([1, 5].includes(findPeak([1, 3, 2, 1, 4, 6, 5])));
});

test('findPeak returns a peak on random arrays with distinct neighbours', () => {
  for (let run = 0; run < 500; run++) {
    const length = 1 + Math.floor(Math.random() * 50);
    const arr = [Math.floor(Math.random() * 20)];
    while (arr.length < length) {
      const step = 1 + Math.floor(Math.random() * 5);
      arr.push(arr[arr.length - 1] + (Math.random() < 0.5 ? step : -step));
    }
    assert.ok(isPeak(arr, findPeak(arr)), `no peak at ${findPeak(arr)} in ${arr}`);
  }
});
