'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { firstTrue, isqrt, minShipCapacity } = require('../src/on-answer');

test('firstTrue finds the boundary of a monotonic predicate', () => {
  assert.equal(firstTrue(0, 100, x => x >= 37), 37);
  assert.equal(firstTrue(0, 100, () => true), 0);
  assert.equal(firstTrue(0, 100, () => false), 101);
});

test('isqrt matches Math.floor(Math.sqrt(n))', () => {
  for (let n = 0; n <= 2000; n++) assert.equal(isqrt(n), Math.floor(Math.sqrt(n)));
  assert.equal(isqrt(2 ** 40), 2 ** 20);
  assert.throws(() => isqrt(-1), RangeError);
});

test('minShipCapacity finds the smallest capacity that meets the deadline', () => {
  assert.equal(minShipCapacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5), 15);
  assert.equal(minShipCapacity([3, 2, 2, 4, 1, 4], 3), 6);
  assert.equal(minShipCapacity([1, 2, 3, 1, 1], 4), 3);
  assert.equal(minShipCapacity([7], 1), 7);
});
