'use strict';

// Compares binarySearch with a linear scan and Array.prototype.indexOf on sorted arrays.
// Run with `npm run bench`. Numbers depend on the machine; the ratios are what matter.
const { binarySearch } = require('..');

const linearScan = (arr, target) => {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
  return -1;
};

const contestants = {
  binarySearch: (arr, target) => binarySearch(arr, target),
  linearScan,
  indexOf: (arr, target) => arr.indexOf(target),
};

function time(fn, arr, targets) {
  let checksum = 0; // keeps the calls from being optimised away
  const start = process.hrtime.bigint();
  for (const target of targets) checksum += fn(arr, target);
  const nsPerLookup = Number(process.hrtime.bigint() - start) / targets.length;
  return { nsPerLookup, checksum };
}

const rows = [];
for (const size of [10, 100, 1_000, 10_000, 100_000, 1_000_000]) {
  const arr = Array.from({ length: size }, (_, i) => i * 2);
  const targets = Array.from({ length: 2_000 }, () => Math.floor(Math.random() * size) * 2);
  const row = { size };
  let expected;
  for (const [name, fn] of Object.entries(contestants)) {
    time(fn, arr, targets.slice(0, 200)); // warm up
    const { nsPerLookup, checksum } = time(fn, arr, targets);
    if (expected === undefined) expected = checksum;
    else if (checksum !== expected) throw new Error(`${name} returned different indexes`);
    row[name] = `${nsPerLookup.toFixed(0)} ns`;
  }
  rows.push(row);
}
console.table(rows);
