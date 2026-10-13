// Type-level checks only: compiled with `tsc --noEmit`, never executed.
import { binarySearch, lowerBound, exponentialSearch, isqrt, firstTrue, findPeak, searchSortedMatrix, interpolationSearch, Comparator } from '../../index';

const nums: number[] = [1, 3, 5];
const i: number = binarySearch(nums, 3);

type Person = { name: string; age: number };
const people: readonly Person[] = [{ name: 'a', age: 18 }];
const byAge: Comparator<Person, number> = (p, age) => p.age - age;
const j: number = lowerBound(people, 18, byAge);
const k: number = exponentialSearch(people, 18, byAge);

const r: number = isqrt(10);
const f: number = firstTrue(0, 10, x => x > 5);
const p: number = findPeak([1, 3, 2]);
const g: number = interpolationSearch(nums, 5);
const cell: [number, number] | null = searchSortedMatrix([[1, 2], [3, 4]], 3);

// @ts-expect-error comparator must return a number
binarySearch(nums, 3, () => 'nope');

export { i, j, k, r, f, p, g, cell };
