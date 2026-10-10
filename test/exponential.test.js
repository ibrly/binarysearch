'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { exponentialSearch } = require('../src/exponential');

test('exponentialSearch finds every element and misses absent ones', () => {
  const arr = Array.from({ length: 100 }, (_, i) => i * 3);
  arr.forEach((value, index) => assert.equal(exponentialSearch(arr, value), index));
  for (const missing of [-1, 1, 151, 300]) assert.equal(exponentialSearch(arr, missing), -1);
});

test('exponentialSearch handles empty and single-element arrays', () => {
  assert.equal(exponentialSearch([], 1), -1);
  assert.equal(exponentialSearch([5], 5), 0);
  assert.equal(exponentialSearch([5], 6), -1);
});
