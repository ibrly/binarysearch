'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { searchRotated, findRotationPivot } = require('../src/rotated');

const rotate = (arr, k) => arr.slice(k).concat(arr.slice(0, k));

test('searchRotated finds every element in every rotation', () => {
  const sorted = [-5, -1, 0, 2, 4, 7, 9, 12];
  for (let k = 0; k < sorted.length; k++) {
    const arr = rotate(sorted, k);
    arr.forEach((value, index) => assert.equal(searchRotated(arr, value), index));
    for (const missing of [-6, 1, 8, 13]) assert.equal(searchRotated(arr, missing), -1);
  }
});

test('searchRotated handles empty and tiny arrays', () => {
  assert.equal(searchRotated([], 1), -1);
  assert.equal(searchRotated([3], 3), 0);
  assert.equal(searchRotated([3, 1], 1), 1);
});

test('findRotationPivot returns the index of the minimum', () => {
  const sorted = [1, 3, 5, 8, 10];
  for (let k = 0; k < sorted.length; k++) {
    const arr = rotate(sorted, k);
    assert.equal(arr[findRotationPivot(arr)], 1);
  }
});
