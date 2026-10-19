'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { searchUnknownLength } = require('../src/unknown-length');

const reader = arr => i => arr[i];

test('searchUnknownLength finds every element and misses absent ones', () => {
  for (let length = 0; length <= 40; length++) {
    const arr = Array.from({ length }, (_, i) => i * 2);
    arr.forEach((value, index) => assert.equal(searchUnknownLength(reader(arr), value), index));
    for (const missing of [-1, 1, length * 2, length * 2 + 1]) {
      assert.equal(searchUnknownLength(reader(arr), missing), -1, `missing ${missing} in length ${length}`);
    }
  }
});

test('searchUnknownLength works on an infinite source with O(log i) reads', () => {
  let reads = 0;
  const squares = i => {
    reads++;
    return i * i;
  };
  assert.equal(searchUnknownLength(squares, 1000 * 1000), 1000);
  assert.ok(reads < 50, `${reads} reads`);
  assert.equal(searchUnknownLength(squares, 1000 * 1000 + 1), -1);
});

test('searchUnknownLength accepts a comparator', () => {
  const people = [{ age: 18 }, { age: 25 }, { age: 40 }];
  assert.equal(searchUnknownLength(i => people[i], 25, (p, age) => p.age - age), 1);
});
