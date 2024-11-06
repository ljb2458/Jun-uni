/*
 * 介绍:数组方法
 */
/**
 * * 比较数组项
 * @param arr1 数组1
 * @param arr2 数组2
 * @param callback 比较回调
 * @param sort 是否排序后比较
 * @returns 数组项是否一一对应
 */

export function compareArrays<T1 extends any[], T2 extends any[]>(
  arr1: T1,
  arr2: T2,
  callback?: (
    a: { value: ArrayToUnion<T1>; index: number; array: T1 },
    b: { value: ArrayToUnion<T2>; index: number; array: T2 }
  ) => boolean,
  sort = true
) {
  if (arr1?.length !== arr2?.length) {
    return false;
  }
  if (sort) {
    arr1.sort();
    arr2.sort();
  }
  callback ??= (a1, a2) => a1.value === a2.value;
  for (let i = 0; i < arr1.length; i++) {
    if (
      !callback(
        { array: arr1, index: i, value: arr1[i] },
        { array: arr2, index: i, value: arr2[i] }
      )
    ) {
      return false;
    }
  }
  return true;
}
