import { multiply, divide } from "lodash";
/**
 * * 任意数据转number，' '将不被视为0
 * @param req 原数据
 * @returns
 */
export function isNumber(req: any): boolean {
  let str = String(req).replace(/\s*/g, "");
  if (!str || Number.isNaN(+str)) return false;
  return true;
}
export function toNumber(req: any): number {
  if (!isNumber(req)) return NaN;
  return Number(req);
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

/**
 * * 将小数中的0折叠显示
 * @param req 数字
 * @param decimals 小数
 * @returns
 */
export function foldDecimal(req: any, decimals: number = 4): string {
  if (!isNumber(req)) return "--";
  let _number = normalNumber(req);
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
  decimals?: number,
  makeUp: boolean = false,
  nanPlaceholder: string = "--"
): string {
  if (!isNumber(num)) return nanPlaceholder;
  const numStr: string = num.toString();
  let tokenIndex = numStr.lastIndexOf(".");
  if (tokenIndex === -1) {
    //如果没有小数点,而且不需要自动补全小数
    if (!makeUp) return numStr;
    tokenIndex = numStr.length;
  }
  /**整数部分 */
  let int = numStr.slice(0, tokenIndex).replace(/^0*/, "") || "0";
  /**小数部分 */
  let dec = numStr.slice(tokenIndex + 1);
  if (makeUp) {
    if (decimals !== undefined) {
      let rep = decimals || 0 - dec.length;
      //补全尾部小数
      if (rep > 0) dec += "0".repeat(rep);
    }
  } else {
    //去除尾部小数
    dec = dec.replace(/0+$/, "");
  }
  dec = dec.slice(0, decimals);
  if (dec.length === 0) return int;
  return int + "." + dec;
}
/**
 * * 固定数字长度
 * @param number 数字
 * @param fixed 固定位数
 * @returns 结果
 */
export function fixedNumber(number: number, fixed = 2): string {
  let strNumber = number.toString();
  const count = fixed - strNumber.length;
  if (count <= 0) return strNumber;
  strNumber = "0".repeat(count) + strNumber;
  return strNumber;
}

/**
 * * 避免数字出现科学计数法
 * @param num 原数据
 * @returns
 */
export function normalNumber(num: StrNumber): string {
  num = num.toString();
  if (!/e/.test(num)) return num.toString();
  // 指数符号 true: 正，false: 负
  let sysbol = !/e-/.test(num);
  // 指数
  let index = Number(num.match(/\d+$/)![0]);
  // 基数
  let basis = num.match(/^[\d\.]+/)![0].replace(/\./, "");
  if (sysbol) {
    return basis.padEnd(index + 1, "0");
  } else {
    return basis.padStart(index + basis.length, "0").replace(/^0/, "0.");
  }
}
/**
 * 数字千分位分割
 * @param num
 * @returns
 */
export function numThousand(num: StrNumber) {
  return num
    .toString()
    .replace(/\d+/, (n) => n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => $1 + ","));
}
