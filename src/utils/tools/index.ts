/**
 * * 获取资源路径
 * @param path 从src开始键入
 * @returns
 */
export function _require(path: string) {
  return path.replace(/^src/, "");
}
export function setType<D>(): D | undefined;
export function setType<D>(d: D): D;
export function setType<D>(d?: D) {
  return d;
}
/**
 * * 判断状态通过二进制
 * @param state 要匹配的状态 例：0b000100
 * @param status 要被匹配的状态 例：0b010111
 */
export function isStateByBin(state: any, status: any) {
  return (+state & +status) !== 0;
}
