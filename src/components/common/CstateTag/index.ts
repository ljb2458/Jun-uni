/*
 * @Date: 2023-03-06 13:42:55
 * @LastEditTime: 2023-05-18 16:34:26
 * @FilePath: /wkw/src/components/common/CstateTag/index.ts
 * 介绍:
 */
import CstateTag from "./CstateTag.vue";
import type { StyleValue } from "vue";
export interface CstateTagEmunItem {
  /**渲染文本 */
  text: string | number;
  /**类名 */
  class?: string;
  /**对应的值 */
  value: string | number;
  /**样式 */
  style?: StyleValue;
}

export default CstateTag;
export type CstateTagEmun = Array<CstateTagEmunItem>;
