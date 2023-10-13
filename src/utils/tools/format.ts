/*
 * @Date: 2023-03-29 11:32:27
 * @LastEditTime: 2023-10-13 18:49:56
 * 介绍:格式化
 */
import { toNumber } from "./number";

/**
 * * 省略文本
 * @param text 省略文本
 * @param config 省略配置
 */
export function omitText(
  text: string | null | undefined,
  config: [number, string, number] = [5, "...", 5]
) {
  if (!text) return "----";
  if (text.length <= config[0] + config[2]) return text;
  let res = text.slice(0, config[0]);
  res += config[1];
  res += text.slice(text.length - config[2]);
  return res;
}
/**
 * * 将小数中的0折叠显示
 * @param req 数字
 * @param decimals 小数
 * @returns
 */
export function formatDecimal(req: any, decimals: number = 4): string {
  let number = toNumber(req);
  if (isNaN(number)) return "--";
  let _number = normalNumber(number);
  const [intStr, floatStr] = _number.split(".");
  //如果实际小数位不大于要求小数位
  if (!floatStr || floatStr.length <= decimals)
    return fixedDecimals(req, decimals);
  //对重复数字进行合并
  let floatRes = "",
    count = 1;
  for (let i = 0; i < floatStr.length; i++) {
    //如果小数长度达到(不包括符号'{}')
    if (floatRes.replace(/[\{\}]/g, "").length >= decimals) break;
    const str = floatStr[i];
    const resLast = floatRes[floatRes.length - 1];
    //如果匹配到'0'而且上一次结果的最后一位也是'0'
    if (str == "0" && str == resLast) {
      count++;
      continue;
    }
    //如果数字累加过
    if (count > 1) floatRes = `${floatRes}{${count}}`;
    count = 1;
    floatRes = floatRes + str;
  }
  return `${intStr}.${floatRes}`;
}

/**
 * * 固定数字小数
 * @param num 可能是数字的数据
 * @param decimals 保留小数位数
 * @param makeUp 是否用'0'补全小数位
 * @param nanPlaceholder 出现nan时返回的占位符
 * @returns
 */
export function fixedDecimals(
  num: any,
  decimals: number = 2,
  makeUp: boolean = true,
  nanPlaceholder: string = "--"
): string {
  if (Number.isNaN(toNumber(num))) return nanPlaceholder;
  const numStr: string = num.toString();
  let tokenIndex = numStr.lastIndexOf(".");
  if (tokenIndex === -1) {
    //如果没有小数点,而且不需要自动补全小数
    if (!makeUp) return numStr;
    tokenIndex = numStr.length;
  }
  let int = numStr.slice(0, tokenIndex).replace(/^0*/, "") || "0";
  let dec = numStr.slice(tokenIndex + 1);
  let rep = decimals - dec.length;
  if (rep > 0 && makeUp) dec += "0".repeat(rep);
  dec = dec.slice(0, decimals);
  return int + "." + dec;
}
/**
 * * 固定小数位
 * @param number 数字
 * @param fixed 固定位数
 * @returns 结果
 */
export function fixedNumber(number: number, fixed = 2): string {
  let strNumber = number.toString();
  while (strNumber.length < fixed) strNumber = `0${strNumber}`;
  return strNumber;
}

/**
 * * 避免数字出现科学计数法
 * @param num 原数据
 * @returns
 */
export function normalNumber(num: StrNumber): string {
  return String(num).replace(/(-?)(\d*)\.?(\d+)e([+-]\d+)/, (a, b, c, d, e) => {
    if (!c) e++;
    return e < 0
      ? b + "0." + Array(1 - e - c.length).join("0") + c + d
      : b + c + d + Array(e - d.length + 1).join("0");
  });
}
