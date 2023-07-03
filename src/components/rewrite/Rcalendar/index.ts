export interface CustomListItem {
  /**底部信息 */
  bottomInfo: string;
  /**时间 */
  date: Date;
  /**天 */
  day: number;
  /**点 */
  dot: boolean;
  /**禁用 */
  disabled: boolean;
  /**月 */
  month: number;
  /**周 */
  week: number;
}
export type Mode = "single" | "multiple" | "range";
