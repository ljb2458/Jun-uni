/*
 * @Date: 2023-03-29 11:32:27
 * @LastEditTime: 2023-04-20 00:44:44
 * @FilePath: /atcoin/src/utils/tools/format.ts
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
 * * 合并数字中重复的'0'
 * @param number 数字
 * @param decimals 精度
 * @returns 
 */
export function formatDecimal(
  number: number | string | undefined | null,
  decimals: number = 2
) {
  if (!number && number != 0) return "--";
  //防止空字符
  if (!number.toString().replace(/s+/g, "")) return "--";
  const num = Number(number);
  if (isNaN(num)) return "--";
  let _number = number.toString();
  //去除尾部所有的'0'
  while (_number[_number.length - 1] === "0") {
    _number = _number.slice(0, _number.length - 1);
  }
  const [intStr, floatStr] = _number.split(".");
  //如果实际小数位不大于要求小数位
  if (!floatStr || floatStr.length <= decimals)
    return formatNumber(num, decimals);
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
export function formatNumber(
  number: number | string | undefined | null,
  decimals: number = 2
): string {
  if (!number && number != 0) return "--";
  //防止空字符
  if (!number.toString().replace(/s+/g, "")) return "--";
  number = Number(number);
  if (isNaN(number)) return "--";
  let numberStr = (
    Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
  ).toFixed(decimals);
  return numberStr;
}
/**
 * * 小数精度修正
 * @param number 要修正的小数
 * @param decimals 保留小数位
 * @returns string 结果
 */
export function parseNumber(
  number: number | string | undefined | null,
  decimals: number = 6
): string {
  if (!number && number != 0) return "--";
  //防止空字符
  if (!number.toString().replace(/s+/g, "")) return "--";
  if (isNaN(Number(number))) return "--";
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
 * * 避免数字出现科学计数法
 * @param num_str 原数据
 * @returns
 */
export function toolNumber(num_str: StrNumber) {
  num_str = num_str.toString();
  if (num_str.indexOf("+") != -1) {
    num_str = num_str.replace("+", "");
  }
  if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
    let resValue = "",
      power: StrNumber = "",
      result = null,
      dotIndex = 0,
      resArr: string[] = [],
      sym = "";
    let numStr = num_str.toString();
    if (numStr[0] == "-") {
      // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
      numStr = numStr.slice(1);
      sym = "-";
    }
    if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
      let regExp = new RegExp(
        "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
        "ig"
      );
      result = regExp.exec(numStr);
      if (result != null) {
        resValue = result[2];
        power = result[5];
        result = null;
      }
      if (!resValue && !power) {
        return false;
      }
      dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
      resValue = resValue.replace(".", "");
      resArr = resValue.split("");
      if (Number(power) >= 0) {
        let subres = resValue.slice(dotIndex);
        power = Number(power);
        //幂数大于小数点后面的数字位数时，后面加0
        for (let i = 0; i <= power - subres.length; i++) {
          resArr.push("0");
        }
        if (power - subres.length < 0) {
          resArr.splice(dotIndex + power, 0, ".");
        }
      } else {
        power = power.replace("-", "");
        power = Number(power);
        //幂数大于等于 小数点的index位置, 前面加0
        for (let i = 0; i < power - dotIndex; i++) {
          resArr.unshift("0");
        }
        let n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
        resArr.splice(n, 0, ".");
      }
    }
    resValue = resArr.join("");

    return sym + resValue;
  } else {
    return num_str;
  }
}
