import Rpicker from "./Rpicker.vue";
export type Column<D = string> = ColumnItem<D>[];
export type ColumnItem<D = string> = D;
export interface ConfirmParam<D = string> {
  /**列索引 */
  columnIndex: number;
  value: D;
  values: D[];
  index: number;
}
export interface ChangeParam<D = string> {
  /**列索引 */
  columnIndex: number;
  value: D;
  values: D[];
  index: number;
}
export function useRpickerRef() {
  //@ts-ignore
  type Instance = InstanceType<typeof Rpicker>;
  return ref<Instance>();
}
