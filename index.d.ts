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

export function exponentialSearch<T, U = T>(arr: readonly T[], target: U, compare?: Comparator<T, U>): number;
