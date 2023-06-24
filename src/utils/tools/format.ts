/*
 * @Date: 2023-03-29 11:32:27
 * @LastEditTime: 2023-06-24 18:21:33

 * 介绍:格式化
 */

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
export function formatDecimal(req: any, decimals: number = 4) {
  let number = toNumber(req);
  if (isNaN(number)) return "--";
  let _number = normalNumber(number);
  const [intStr, floatStr] = _number.split(".");
  //如果实际小数位不大于要求小数位
  if (!floatStr || floatStr.length <= decimals)
    return formatNumber(req, decimals);
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
 * * 格式化数字
 * @param number 要格式化的小数
 * @param decimals 保留小数位
 * @returns string 结果
 */
export function formatNumber(req: any, decimals: number = 2): string {
  if (Number.isNaN(toNumber(req))) return "--";
  const numStr = req.toString();
  let [int, dec = ""] = numStr.split(".");
  let rep = decimals - dec.length;
  if (rep > 0) dec += "0".repeat(rep);
  dec = dec.slice(0, decimals);
  return `${int}.${dec}`;
}
/**
 * * 小数精度修正
 * @param number 要修正的小数
 * @param decimals 保留小数位
 * @returns string 结果
 */
export function parseNumber(req: any, decimals: number = 8): string {
  let number = toNumber(req);
  if (isNaN(number)) return "--";
  let floatStr = (
    Math.round(
      (parseFloat(number.toString()) + Number.EPSILON) * Math.pow(10, decimals)
    ) / Math.pow(10, decimals)
  ).toFixed(decimals);
  return floatStr;
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
