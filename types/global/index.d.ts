/*
 * @Date: 2023-04-20 18:38:28
 * @LastEditTime: 2023-06-23 21:20:43
 * @FilePath: /music-client/types/global/index.d.ts
 * 介绍:全局ts变量
 */
/**string类型的number数据 */
/**字符串数字 */
type StrNumber = string | number;
/**任意对象 */
interface AnyObject<T = any> {
  [key: string]: T;
}
/**未知对象 */
interface UnknownObjectDeep {
  [key: string]: UnknownObjectDeep | undefined;
}
/**未知对象 */
interface UnknownObject {
  [key: string]: unknown | undefined;
}
/**元组类型转联合类型 */
type TupleToUnion<T extends any[]> = keyof {
  [Key in T[number]]: Key;
};
/**获取promise中的类型*/
type UnPromise<T> = T extends Promise<infer U> ? U : never;
