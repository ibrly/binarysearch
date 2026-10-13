'use strict';

/**
 * Matrix whose rows are sorted and whose first element of each row is greater
 * than the last element of the previous row: it is one sorted array laid out in
 * rows, so binary search over the flat index. O(log(rows * cols)).
 * Returns [row, col] or null.
 */
function searchSortedMatrix(matrix, target) {
  const rows = matrix.length;
  const cols = rows === 0 ? 0 : matrix[0].length;
  let low = 0;
  let high = rows * cols - 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    const value = matrix[Math.floor(mid / cols)][mid % cols];
    if (value === target) return [Math.floor(mid / cols), mid % cols];
    if (value < target) low = mid + 1;
    else high = mid - 1;
  }
  return null;
}

/**
 * Matrix where every row and every column is sorted ascending, but rows may
 * overlap. Start at the top-right corner: a bigger value rules out its column,
 * a smaller one rules out its row. O(rows + cols). Returns [row, col] or null.
 */
function searchRowColSortedMatrix(matrix, target) {
  let row = 0;
  let col = matrix.length === 0 ? -1 : matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    const value = matrix[row][col];
    if (value === target) return [row, col];
    if (value > target) col--;
    else row++;
  }
  return null;
}

module.exports = { searchSortedMatrix, searchRowColSortedMatrix };
