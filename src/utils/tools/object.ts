/*
 * @Date: 2023-03-23 15:11:16
 * @LastEditTime: 2023-10-13 18:50:33
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
    newObj = filterObject(newObj);
  }
  return new URLSearchParams(Object.entries(newObj)).toString();
}

type Callback<D extends object = AnyObject> = (
  value: ObjectToUnion<D>,
  key: keyof D
) => boolean;
/**
 * * 过滤对象
 * @param object 对象
 * @param includes 要被过滤掉的值
 */
export function filterObject<D extends object = AnyObject>(
  object: D,
  includes?: any[]
): Partial<D>;
/**
 * * 过滤对象
 * @param object 对象
 * @param callback 遍历回调
 */
export function filterObject<D extends object = AnyObject>(
  object: D,
  callback?: Callback
): Partial<D>;
export function filterObject<D extends object = AnyObject>(
  object: D,
  includes: any[] | Callback = [undefined, null, ""]
): Partial<D> {
  let callback: Callback;
  if (typeof includes !== "function") callback = (v) => includes.includes(v);
  else callback = includes;
  const newObj: Partial<D> = {};
  for (const key in object) {
    const value = object[key];
    if (!callback(value, key)) {
      newObj[key] = object[key];
    }
  }
  return newObj;
}
