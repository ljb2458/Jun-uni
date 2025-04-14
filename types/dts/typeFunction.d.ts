/**数组(元组)类型转联合类型 */
type ArrayToUnion<T extends any[]> = keyof {
  [Key in T[number]]: Key;
};

/**对象的值转联合类型 */
type ObjectToUnion<T extends AnyObject> = keyof {
  [key in T[keyof T]]: key;
};

/**获取promise中的类型*/
type UnPromise<T> = T extends Promise<infer U> ? UnPromise<U> : T;

/**将T中的部分属性变为可选 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**将T中的部分属性变为必选 */
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**将T中的部分属性变为可选 */
type PartialFlipBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

/**将T中的部分属性变为必选 */
type RequiredFlipBy<T, K extends keyof T> = Pick<T, K> & Required<Omit<T, K>>;

/**生成方法类型 */
type Fun<P extends any[] = any[], R = any> = (...p: P) => R;

/**字符串数字 */
type StrNumber = string | number;

/**任意对象 */
interface AnyObject<T = any> {
  [key: string]: T;
}

/**联合类型转交叉类型 */
type UnionToIntersect<T> = (T extends any ? (p: T) => any : never) extends (
  v: infer R
) => any
  ? R
  : never;
