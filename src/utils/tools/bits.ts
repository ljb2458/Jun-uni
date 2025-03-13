/**
 * * 通过二进制鉴权
 * @param state 要匹配的状态 例：0b000100
 * @param status 要被匹配的状态 例：0b010111
 */
export function bitsAuth(state: any, status: any) {
  return (+state & +status) !== 0;
}
/**
 * 拆分组合二进制权限
 * @param n 组合权限，如 1 | 2 | 4 的结果
 * @returns
 */
export function getBitsArray(n: number) {
  const result = [];
  let bitPosition = 0;
  while (n > 0) {
    if (n & 1) {
      // 检查最低位是否为 1
      result.push(2 ** bitPosition);
    }
    n = n >> 1; // 右移一位
    bitPosition++;
  }
  return result;
}
