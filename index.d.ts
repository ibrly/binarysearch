/** Negative if a < b, zero if equal, positive if a > b. */
export type Comparator<T, U = T> = (a: T, b: U) => number;

export function defaultCompare<T>(a: T, b: T): -1 | 0 | 1;

export function binarySearch<T, U = T>(arr: readonly T[], target: U, compare?: Comparator<T, U>): number;
export function binarySearchRecursive<T, U = T>(arr: readonly T[], target: U, compare?: Comparator<T, U>): number;
export function lowerBound<T, U = T>(arr: readonly T[], target: U, compare?: Comparator<T, U>): number;
export function upperBound<T, U = T>(arr: readonly T[], target: U, compare?: Comparator<T, U>): number;

export function searchRotated(arr: readonly number[], target: number): number;
export function findRotationPivot(arr: readonly number[]): number;

export function firstTrue(low: number, high: number, predicate: (x: number) => boolean): number;
export function isqrt(n: number): number;
export function minShipCapacity(weights: readonly number[], days: number): number;

export function interpolationSearch(arr: readonly number[], target: number): number;
export function exponentialSearch<T, U = T>(arr: readonly T[], target: U, compare?: Comparator<T, U>): number;

export function findPeak(arr: readonly number[]): number;

export function searchSortedMatrix(matrix: readonly (readonly number[])[], target: number): [number, number] | null;
export function searchRowColSortedMatrix(matrix: readonly (readonly number[])[], target: number): [number, number] | null;

export function kthOfTwoSorted(a: readonly number[], b: readonly number[], k: number): number;
export function medianOfTwoSorted(a: readonly number[], b: readonly number[]): number;
