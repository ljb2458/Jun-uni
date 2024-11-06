/*
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
 * 过滤对象中的空值（null、undefined、空字符串）
 * @param obj 需要过滤的对象
 * @returns 过滤后的对象
 */
export function filterEmptyValues(
  obj: Record<string, any>
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      return value !== null && value !== undefined && value !== "";
    })
  );
}

/**
 * 将对象转换为查询字符串
 * @param obj 需要转换的对象
 * @param noFilterEmpty 是否保留空值，默认 false（去除空值）
 * @returns 转换后的查询字符串
 */
export function objToQuery(
  obj: Record<string, any>,
  noFilterEmpty: boolean = false
): string {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  // 如果需要过滤空值
  const filteredObj = noFilterEmpty ? obj : filterEmptyValues(obj);

  return Object.entries(filteredObj)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("&");
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
