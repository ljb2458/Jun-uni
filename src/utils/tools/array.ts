/*
 * @Date: 2023-03-30 12:06:28
 * @LastEditTime: 2023-03-30 12:11:43
 * @FilePath: /NLK/src/utils/tools/array.ts
 * 介绍:数组方法
 */
/**
 * * 根据索引移除数组某项
 * @param array 数组
 * @param index 索引
 * @param count 删除数量
 * @returns
 */
export function removeByIndex(
  array: any[] | undefined | null | void,
  index: number,
  count = 1
) {
  return array?.splice(index, count);
}
