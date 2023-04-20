/*
 * @Date: 2023-03-23 15:11:16
 * @LastEditTime: 2023-04-20 18:51:00
 * @FilePath: /music-client/src/utils/tools/object.ts
 * 介绍:
 */

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
