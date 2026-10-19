'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { searchSortedMatrix, searchRowColSortedMatrix } = require('../src/matrix');

const contains = (matrix, target) => matrix.some(row => row.includes(target));

test('searchSortedMatrix finds every cell of a row-major sorted matrix', () => {
  const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
  matrix.forEach((row, r) => row.forEach((value, c) => assert.deepEqual(searchSortedMatrix(matrix, value), [r, c])));
  for (const missing of [0, 2, 21, 61]) assert.equal(searchSortedMatrix(matrix, missing), null);
  assert.equal(searchSortedMatrix([], 1), null);
  assert.equal(searchSortedMatrix([[]], 1), null);
});

test('searchRowColSortedMatrix finds every cell when rows and columns are sorted', () => {
  const matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]];
  matrix.forEach((row, r) => row.forEach((value, c) => assert.deepEqual(searchRowColSortedMatrix(matrix, value), [r, c])));
  for (const missing of [0, 15, 18]) assert.equal(searchRowColSortedMatrix(matrix, missing), null);
  assert.equal(searchRowColSortedMatrix([], 1), null);
  assert.equal(searchRowColSortedMatrix([[]], 1), null);
});

test('searchRowColSortedMatrix agrees with a linear scan on random matrices', () => {
  for (let run = 0; run < 300; run++) {
    const rows = 1 + Math.floor(Math.random() * 6);
    const cols = 1 + Math.floor(Math.random() * 6);
    // 2 * (row + col) plus 0 or 1 keeps every row and column strictly ascending
    const matrix = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => 2 * (r + c)));
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) matrix[r][c] += Math.random() < 0.5 ? 1 : 0;
    for (let target = -1; target <= 2 * (rows + cols); target++) {
      const found = searchRowColSortedMatrix(matrix, target);
      if (found) assert.equal(matrix[found[0]][found[1]], target);
      else assert.equal(contains(matrix, target), false);
    }
  }
});
