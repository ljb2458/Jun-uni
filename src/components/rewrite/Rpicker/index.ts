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
