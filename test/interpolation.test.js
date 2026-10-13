'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { interpolationSearch } = require('../src/interpolation');

test('interpolationSearch finds every element and misses absent ones', () => {
  const arr = Array.from({ length: 100 }, (_, i) => i * 7);
  arr.forEach((value, index) => assert.equal(interpolationSearch(arr, value), index));
  for (const missing of [-5, 3, 351, 1000]) assert.equal(interpolationSearch(arr, missing), -1);
});

test('interpolationSearch handles empty, single-value and all-equal arrays', () => {
  assert.equal(interpolationSearch([], 1), -1);
  assert.equal(interpolationSearch([4], 4), 0);
  assert.equal(interpolationSearch([4], 5), -1);
  assert.equal(interpolationSearch([2, 2, 2], 2), 0);
  assert.equal(interpolationSearch([2, 2, 2], 3), -1);
});

test('interpolationSearch agrees with indexOf on random sorted arrays', () => {
  for (let run = 0; run < 500; run++) {
    const length = Math.floor(Math.random() * 40);
    const arr = Array.from({ length }, () => Math.floor(Math.random() * 60)).sort((a, b) => a - b);
    for (let target = -2; target <= 62; target++) {
      const index = interpolationSearch(arr, target);
      if (arr.includes(target)) assert.equal(arr[index], target);
      else assert.equal(index, -1);
    }
  }
});
