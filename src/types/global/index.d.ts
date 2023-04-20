/*
 * @Date: 2023-04-20 18:38:28
 * @LastEditTime: 2023-04-20 18:46:49
 * @FilePath: /music-client/types/global/index.d.ts
 * 介绍:全局ts变量
 */
/**string类型的number数据 */
type StrNumber = string | number;
interface UnknownObj {
  [key: string]: UnknownObj | unknown | void;
}
interface UnknownObjDeep {
  [key: string]: UnknownObjDeep | UnknownObjDeep | void;
}
