/**
 * * 获取资源路径
 * @param path 从src开始键入
 * @returns
 */
export function _require(path: string) {
  return path.replace(/^src/, "");
}
export function setType<D>(d?: D): D | undefined;
export function setType<D>(d: D): D;
export function setType<D>(d: D) {
  return d;
}
