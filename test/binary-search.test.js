'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { binarySearch, binarySearchRecursive, lowerBound, upperBound } = require('../src/binary-search');

const searches = { binarySearch, binarySearchRecursive };

for (const [name, search] of Object.entries(searches)) {
  test(`${name}: finds every element and misses absent ones`, () => {
    const arr = [-7, -2, 0, 3, 8, 13, 21];
    arr.forEach((value, index) => assert.equal(search(arr, value), index));
    for (const missing of [-8, 1, 9, 22]) assert.equal(search(arr, missing), -1);
  });

  test(`${name}: handles empty and single-element arrays`, () => {
    assert.equal(search([], 1), -1);
    assert.equal(search([4], 4), 0);
    assert.equal(search([4], 5), -1);
  });

  test(`${name}: supports a custom comparator`, () => {
    const people = [{ age: 18 }, { age: 25 }, { age: 40 }];
    const byAge = (a, b) => a.age - b.age;
    assert.equal(search(people, { age: 25 }, byAge), 1);
    assert.equal(search(['pear', 'fig', 'apple'], 'fig', (a, b) => b.localeCompare(a)), 1);
  });
}

test('lowerBound and upperBound bracket runs of duplicates', () => {
  const arr = [1, 2, 2, 2, 5];
  assert.equal(lowerBound(arr, 2), 1);
  assert.equal(upperBound(arr, 2), 4);
  assert.equal(upperBound(arr, 2) - lowerBound(arr, 2), 3);
  assert.equal(lowerBound(arr, 0), 0);
  assert.equal(lowerBound(arr, 3), 4);
  assert.equal(upperBound(arr, 9), arr.length);
});

test('all functions agree with a linear scan on random sorted arrays', () => {
  let seed = 42;
  const random = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;

  for (let round = 0; round < 500; round++) {
    const arr = Array.from({ length: Math.floor(random() * 40) }, () => Math.floor(random() * 30)).sort((a, b) => a - b);
    const target = Math.floor(random() * 34) - 2;

    const expectedLower = arr.findIndex(x => x >= target);
    const expectedUpper = arr.findIndex(x => x > target);
    assert.equal(lowerBound(arr, target), expectedLower === -1 ? arr.length : expectedLower);
    assert.equal(upperBound(arr, target), expectedUpper === -1 ? arr.length : expectedUpper);

    for (const search of Object.values(searches)) {
      const index = search(arr, target);
      if (arr.includes(target)) assert.equal(arr[index], target);
      else assert.equal(index, -1);
    }
  }
});
