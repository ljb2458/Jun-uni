/*
 * @Date: 2023-04-20 18:49:50
 * @LastEditTime: 2023-04-20 18:50:13
 * @FilePath: /music-client/src/utils/tools/index.ts
 * 介绍:
 */
/**
 * * 获取资源路径
 * @param path 从src开始键入
 * @returns
 */
export function _require(path: string) {
  return path.replace(/^src/, "");
}
