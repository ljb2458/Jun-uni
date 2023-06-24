/*
 * @Date: 2023-06-24 22:48:33
 * @LastEditTime: 2023-06-24 22:51:36
 * 介绍:
 */
/**元组类型转联合类型 */
type TupleToUnion<T extends any[]> = keyof {
    [Key in T[number]]: Key;
  };
  /**获取promise中的类型*/
  type UnPromise<T> = T extends Promise<infer U> ? U : never;
  /**将T中的部分属性变为可选 */
  type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  /**将T中的部分属性变为必选 */
  type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
  
  /**将T中的部分属性变为可选 */
  type OptionalFlipBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
  /**将T中的部分属性变为必选 */
  type RequiredFlipBy<T, K extends keyof T> = Pick<T, K> & Required<Omit<T, K>>;
  