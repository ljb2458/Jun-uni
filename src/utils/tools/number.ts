import { multiply, divide } from "mathjs";
/**
 * * 任意数据转number，' '将不被视为0
 * @param req 原数据
 * @returns
 */
export function toNumber(req: any): number {
  let str = String(req).replace(/\s*/g, "");
  const num = Number(str);
  if (!str || Number.isNaN(num)) return NaN;
  return num;
}
/**
 * 自定义精度的向上取整
 * @param _num 源数据
 * @param decimals 小数位
 * @returns
 */
export function ceilDecimal(_num: any, decimals: number = 4): number {
  const num = toNumber(_num);
  if (Number.isNaN(num)) return NaN;
  const temp = Math.pow(10, decimals);
  return divide(Math.ceil(multiply(num, temp)), temp);
}
