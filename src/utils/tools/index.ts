/*
 * @Date: 2022-12-22 11:57:46
 * @LastEditTime: 2023-02-28 23:43:15
 * @FilePath: /my-vue3-project/src/utils/tools/index.ts
 * 介绍:工具函数
 */

/**
 * * 格式化number
 * @param number 要修正的小数
 * @param decimals 保留小数位
 * @returns string 结果
 */
export function formatNumber(
  number: number | string | undefined | null,
  decimals: number = 2
): string {
  if (!number && number != 0) return "--";
  number = Number(number);
  if (isNaN(number)) return "--";
  let numberStr = (
    Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
  ).toFixed(decimals);
  return numberStr;
}

/**
 * * number精度处理
 * @param number 要修正的小数
 * @param decimals 最多保留位数
 * @returns string 结果
 */
export function parseNumber(
  number: number | string | undefined | null,
  decimals: number = 10
): string {
  if (!number && number != 0) return "--";
  if (isNaN(Number(number))) return "--";
  let floatStr = (
    Math.round(
      (parseFloat(number.toString()) + Number.EPSILON) * Math.pow(10, decimals)
    ) / Math.pow(10, decimals)
  ).toFixed(decimals);
  return floatStr;
}
/**
 * * 获取资源路径
 * @param path 从src开始键入
 * @returns
 */
export function _require(path: string) {
  return path.replace(/^src/, "");
}

/**
 * * 生成唯一uuid
 * @return uuid
 */
export function generateUUID(): string {
  if (typeof crypto === "object") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (
      typeof crypto.getRandomValues === "function" &&
      typeof Uint8Array === "function"
    ) {
      const callback = (c: any) => {
        const num = Number(c);
        return (
          num ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))
        ).toString(16);
      };
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let performanceNow =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

/**
 * *  生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return 随机数
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

/**
 * @description: 对象转query串
 * @param {*} obj
 * @param {*} noFilterEmpty 默认false 去除空值再拼接字符串
 * @return {*}
 */
export function objToQuery(obj: object, noFilterEmpty?: boolean): string {
  if (!obj) return "";

  let newObj = { ...obj };
  if (!noFilterEmpty) {
    newObj = filterParams(newObj);
  }
  return new URLSearchParams(Object.entries(newObj)).toString();
}

/**
 * @description: 去除对象中的空值
 * @param {*} obj
 * @return {*}
 */
export function filterParams(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  let newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (
      (obj[key] === 0 || obj[key] === false || obj[key]) &&
      obj[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== ""
    ) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

/**
 * query字符串转对象
 * @param url query
 * @returns 结果
 */
export function queryToObj(url: string) {
  const index = url.indexOf("?");
  const obj: { [key: string]: any } = {};
  if (index === -1) return obj;
  const queryStr = url.slice(index + 1);
  const arr = queryStr.split("&");
  for (let item of arr) {
    const keyValue: Array<string> = item.split("=");
    obj[keyValue[0]] = keyValue[1];
  }
  return obj;
}
/**获取当前地址的query参数 */
export function getCurrentHrefQueryParam() {
  const url = window.location.href;
  const urlArr = url.split("?");
  urlArr.shift();
  const obj: { [key: string]: any } = {};
  urlArr.forEach((val) => {
    Object.assign(obj, queryToObj("?" + val));
  });
  return obj;
}
export function unitPx(pixel: string | undefined | number): string {
  return (pixel || 0) + "px";
}
export function unitRem(pixel: string | undefined | number): string {
  return (pixel || 0) + "rem";
}
export function unitVmax(pixel: string | undefined | number): string {
  return (pixel || 0) + "vmax";
}
export function unitVmin(pixel: string | undefined | number): string {
  return (pixel || 0) + "Vmin";
}
export function unitPercent(pixel: string | undefined | number): string {
  return Number(pixel || 0) * 100 + "%";
}
