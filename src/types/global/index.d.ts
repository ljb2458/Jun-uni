/**string类型的number数据 */
type StrNumber = string | number;
interface UnknownObj {
  [key: string]: UnknownObj | unknown | void;
}
