# binarysearch

Binary search variants in plain JavaScript, with no dependencies and a test suite.

| Function | Returns | Use it for |
|----------|---------|------------|
| `binarySearch(arr, target, compare?)` | index of `target`, or `-1` | exact lookup, iterative |
| `binarySearchRecursive(arr, target, compare?)` | same | the recursive form of the same algorithm |
| `lowerBound(arr, target, compare?)` | first index with `arr[i] >= target` | insertion point, first occurrence |
| `upperBound(arr, target, compare?)` | first index with `arr[i] > target` | end of a run, counting duplicates |

| `searchRotated(arr, target)` | index or `-1` | sorted array rotated at an unknown pivot, e.g. `[4, 5, 6, 0, 1, 2]` |
| `findRotationPivot(arr)` | index of the minimum | where a rotated array wraps around |
| `firstTrue(low, high, predicate)` | smallest `x` with `predicate(x)` true | binary search on the answer for monotonic yes/no questions |
| `isqrt(n)` | `floor(sqrt(n))` using integers only | classic search-on-answer example |
| `minShipCapacity(weights, days)` | smallest capacity that meets the deadline | search-on-answer over a range of capacities |
| `exponentialSearch(arr, target, compare?)` | index or `-1` | targets near the start of very large arrays, O(log i) |

All run in O(log n) time on an array sorted ascending by `compare`, which defaults to `<` / `>`.

## Usage

```js
const { binarySearch, lowerBound, upperBound } = require('binarysearch') // or require('./index');

binarySearch([1, 3, 5, 7, 9], 7);          // 3
binarySearch([1, 3, 5], 4);                // -1

const scores = [1, 2, 2, 2, 5];
upperBound(scores, 2) - lowerBound(scores, 2); // 3 occurrences of 2
lowerBound(scores, 3);                         // 4, where 3 would be inserted

const people = [{ age: 18 }, { age: 25 }, { age: 40 }];
binarySearch(people, { age: 25 }, (a, b) => a.age - b.age); // 1
```

## Notes

- `mid` is computed as `(low + high) >>> 1`. In JavaScript this is about intent rather than overflow, but it is the habit that avoids the classic integer overflow bug in fixed-width languages.
- The tests compare every function against a linear scan on 500 random sorted arrays, including empty ones and arrays full of duplicates.

## Tests

```bash
npm test   # node --test, Node 18+
```
